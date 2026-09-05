import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
JSON.parse(readFileSync(join(root, 'config/upstreams.json'), 'utf8'));
JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

for (const file of readdirSync(join(root, 'scripts')).filter((x) => x.endsWith('.mjs'))) {
  execFileSync(process.execPath, ['--check', join(root, 'scripts', file)], { stdio: 'inherit' });
}

console.log('Novel OS tooling syntax/config check passed.');
