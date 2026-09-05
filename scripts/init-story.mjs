import { cpSync, existsSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runStory } from './lib/story-cli.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
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
try {
  runStory(root, ['init', title, ...argv], { cwd: temp });

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
    cpSync(source, destination, { recursive: item.isDirectory() });
  }

  console.log('\nStory Skills scaffold merged into Novel OS root.');
  console.log('Next: fill author/ files, then run npm run story:check.');
} catch (error) {
  if (error.code === 'NOVEL_OS_STORY_CLI_MISSING') console.error(error.message);
  process.exitCode = 1;
} finally {
  rmSync(temp, { recursive: true, force: true });
}
