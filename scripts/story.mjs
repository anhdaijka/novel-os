import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const lock = JSON.parse(readFileSync(join(root, 'config/upstreams.json'), 'utf8'));
const spec = `github:${lock.storySkills.repo}#${lock.storySkills.commit}`;
const args = process.argv.slice(2);

try {
  execFileSync('npx', ['--yes', '--package', spec, 'story', ...args], {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
} catch (error) {
  process.exit(error.status ?? 1);
}
