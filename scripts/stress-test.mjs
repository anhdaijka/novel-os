import { appendFileSync, existsSync, mkdtempSync, readdirSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import { runStory } from './lib/story-cli.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const temp = mkdtempSync(join(tmpdir(), 'novel-os-stress-'));

function story(args, cwd, quiet = true) {
  return runStory(root, args, { cwd, stdio: quiet ? 'ignore' : 'inherit' });
}

function findStoryDir(parent) {
  if (existsSync(join(parent, 'story.md'))) return parent;
  for (const name of readdirSync(parent)) {
    const candidate = join(parent, name);
    if (statSync(candidate).isDirectory() && existsSync(join(candidate, 'story.md'))) return candidate;
  }
  throw new Error('Story Skills init completed but story.md was not found.');
}

try {
  console.log('Creating temporary Story Skills fixture with local pinned CLI...');
  story([
    'init', 'Novel OS Stress',
    '--genre', 'mystery',
    '--pov', 'third-person-limited',
    '--tense', 'past',
    '--theme', 'truth',
    '--synopsis', 'A courier finds a signal that should not exist.'
  ], temp);

  const project = findStoryDir(temp);
  story(['add', 'character', 'Mara Vale', '--role', 'protagonist'], project);
  story(['add', 'location', 'North Station', '--type', 'landmark', '--character', 'mara-vale'], project);
  story(['add', 'arc', 'Signal Thread', '--type', 'main', '--character', 'mara-vale', '--theme', 'truth'], project);

  for (let i = 1; i <= 3; i++) {
    const chapterId = `chapter-${String(i).padStart(2, '0')}`;
    story([
      'add', 'chapter', `Signal ${i}`,
      '--number', String(i),
      '--pov', 'mara-vale',
      '--location', 'north-station',
      '--character', 'mara-vale',
      '--arc', 'signal-thread'
    ], project);
    story([
      'add', 'scene', `Station Beat ${i}`,
      '--chapter', chapterId,
      '--scene', '1',
      '--pov', 'mara-vale',
      '--location', 'north-station',
      '--character', 'mara-vale',
      '--arc', 'signal-thread'
    ], project);
    appendFileSync(join(project, 'chapters', `${chapterId}.md`), `\nMara crossed the station and noticed signal ${i}.\n`);
  }

  const start = performance.now();
  story(['wordcount', '.', '--write'], project);
  story(['reindex', '.'], project);
  story(['validate', '.'], project);
  story(['links', '.'], project);
  story(['continuity', '.'], project);
  story(['report', '.', '--actionable'], project);
  const checksMs = Math.round(performance.now() - start);

  console.log(JSON.stringify({ fixture: '3 chapters / 3 scenes', deterministicPipelineMs: checksMs, result: 'pass' }, null, 2));

  const budget = Number(process.env.NOVEL_OS_CHECK_BUDGET_MS || 0);
  if (budget > 0 && checksMs > budget) {
    throw new Error(`Deterministic stress budget exceeded: ${checksMs}ms > ${budget}ms`);
  }
} finally {
  rmSync(temp, { recursive: true, force: true });
}
