import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import { runStory } from './lib/story-cli.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
if (!existsSync(join(root, 'story.md'))) {
  console.error('No story.md found. Initialize a story first, or run npm run stress:test for an isolated fixture.');
  process.exit(2);
}

const commands = [
  ['validate', '.'],
  ['links', '.'],
  ['continuity', '.'],
  ['report', '.', '--actionable']
];

const results = [];
const allStart = performance.now();
try {
  for (const args of commands) {
    const start = performance.now();
    runStory(root, args, { stdio: 'ignore' });
    results.push({ command: `story ${args.join(' ')}`, ms: Math.round(performance.now() - start) });
  }
} catch (error) {
  if (error.code === 'NOVEL_OS_STORY_CLI_MISSING') console.error(error.message);
  process.exit(error.status ?? 1);
}

const totalMs = Math.round(performance.now() - allStart);
console.log(JSON.stringify({ project: root, totalMs, checks: results }, null, 2));

const budget = Number(process.env.NOVEL_OS_CHECK_BUDGET_MS || 0);
if (budget > 0 && totalMs > budget) {
  console.error(`Deterministic check budget exceeded: ${totalMs}ms > ${budget}ms`);
  process.exit(1);
}
