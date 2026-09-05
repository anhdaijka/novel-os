import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const lock = JSON.parse(readFileSync(join(root, 'config/upstreams.json'), 'utf8'));
const argv = process.argv.slice(2);
const forceIndex = argv.indexOf('--force');
const force = forceIndex !== -1;
if (force) argv.splice(forceIndex, 1);
const title = argv.shift();

if (!title) {
  console.error('Usage: npm run init-story -- "Title" [Story Skills init flags] [--force]');
  process.exit(1);
}

if (existsSync(join(root, 'story.md')) && !force) {
  console.error('story.md already exists. Refusing to overwrite an initialized story.');
  console.error('Use --force only if you intentionally want to replace generated Story Skills scaffold paths.');
  process.exit(1);
}

const temp = mkdtempSync(join(tmpdir(), 'novel-os-init-'));
const spec = `github:${lock.storySkills.repo}#${lock.storySkills.commit}`;

try {
  execFileSync('npx', ['--yes', '--package', spec, 'story', 'init', title, ...argv], {
    cwd: temp,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });

  const dirs = readdirSync(temp, { withFileTypes: true }).filter((x) => x.isDirectory());
  if (dirs.length !== 1) throw new Error(`Expected one generated story directory, found ${dirs.length}.`);
  const generated = join(temp, dirs[0].name);

  for (const item of readdirSync(generated, { withFileTypes: true })) {
    const source = join(generated, item.name);
    const destination = join(root, item.name);
    if (existsSync(destination)) {
      if (!force) throw new Error(`Target already exists: ${item.name}`);
      rmSync(destination, { recursive: true, force: true });
    }
    if (item.isDirectory()) {
      mkdirSync(destination, { recursive: true });
      cpSync(source, destination, { recursive: true });
    } else {
      cpSync(source, destination);
    }
  }

  console.log('\nStory Skills scaffold merged into Novel OS root.');
  console.log('Next: fill author/ files, then run npm run story:check.');
} finally {
  rmSync(temp, { recursive: true, force: true });
}
