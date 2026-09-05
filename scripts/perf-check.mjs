import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
if (!existsSync(join(root, 'story.md'))) {
  console.error('No story.md found. Initialize a story first, or run npm run stress:test for an isolated fixture.');
  process.exit(2);
}

const lock = JSON.parse(readFileSync(join(root, 'config/upstreams.json'), 'utf8'));
const spec = `github:${lock.storySkills.repo}#${lock.storySkills.commit}`;
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
const commands = [
  ['validate', '.'],
  ['links', '.'],
  ['continuity', '.'],
  ['report', '.', '--actionable']
];

const results = [];
const allStart = performance.now();
for (const args of commands) {
  const start = performance.now();
  execFileSync(npx, ['--yes', '--package', spec, 'story', ...args], {
    cwd: root,
    stdio: 'ignore'
  });
  results.push({ command: `story ${args.join(' ')}`, ms: Math.round(performance.now() - start) });
}
const totalMs = Math.round(performance.now() - allStart);
const output = { project: root, totalMs, checks: results };
console.log(JSON.stringify(output, null, 2));

const budget = Number(process.env.NOVEL_OS_CHECK_BUDGET_MS || 0);
if (budget > 0 && totalMs > budget) {
  console.error(`Deterministic check budget exceeded: ${totalMs}ms > ${budget}ms`);
  process.exit(1);
}
