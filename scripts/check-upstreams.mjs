import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const lock = JSON.parse(readFileSync(join(root, 'config/upstreams.json'), 'utf8'));

for (const [name, entry] of Object.entries(lock)) {
  const output = execFileSync('git', ['ls-remote', entry.url, 'HEAD'], { encoding: 'utf8' }).trim();
  const head = output.split(/\s+/)[0];
  const status = head === entry.commit ? 'CURRENT' : 'UPDATE AVAILABLE';
  console.log(`${name}: ${status}`);
  console.log(`  pinned: ${entry.commit}`);
  console.log(`  HEAD:   ${head}`);
}

console.log('\nDo not auto-upgrade in the middle of an accepted chapter lifecycle.');
console.log('Review upstream changes, update config/upstreams.json intentionally, bootstrap --clean, then run story checks.');
