import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
if (!existsSync(join(root, 'story.md'))) {
  console.error('No story.md found. Initialize first with: npm run init-story -- "Your Novel"');
  process.exit(1);
}

const lock = JSON.parse(readFileSync(join(root, 'config/upstreams.json'), 'utf8'));
const spec = `github:${lock.storySkills.repo}#${lock.storySkills.commit}`;
const commands = [
  ['validate', '.'],
  ['links', '.'],
  ['continuity', '.']
];

for (const command of commands) {
  console.log(`\n> story ${command.join(' ')}`);
  execFileSync('npx', ['--yes', '--package', spec, 'story', ...command], {
    cwd: root,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
}
