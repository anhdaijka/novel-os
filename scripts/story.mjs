import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const lock = JSON.parse(readFileSync(join(root, 'config/upstreams.json'), 'utf8'));
const spec = `github:${lock.storySkills.repo}#${lock.storySkills.commit}`;
const args = process.argv.slice(2);
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';

try {
  execFileSync(npx, ['--yes', '--package', spec, 'story', ...args], {
    cwd: process.cwd(),
    stdio: 'inherit'
  });
} catch (error) {
  process.exit(error.status ?? 1);
}
