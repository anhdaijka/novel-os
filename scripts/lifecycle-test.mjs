import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync
} from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join } from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';
import { runStory } from './lib/story-cli.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const goldenRoot = join(root, 'examples', 'phase3-lifecycle');
const temp = mkdtempSync(join(tmpdir(), 'novel-os-lifecycle-'));

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

function golden(name) {
  return readFileSync(join(goldenRoot, name), 'utf8');
}

function setChapterText(file, prose) {
  const source = readFileSync(file, 'utf8');
  const marker = '## Chapter Text';
  const index = source.indexOf(marker);
  if (index === -1) throw new Error(`Missing Chapter Text section in ${file}`);
  writeFileSync(file, `${source.slice(0, index)}${marker}\n\n${prose.trim()}\n`, 'utf8');
}

function replaceFrontmatterScalar(file, key, value) {
  const source = readFileSync(file, 'utf8');
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`^${escaped}:\\s*.*$`, 'm');
  if (!pattern.test(source)) throw new Error(`Missing frontmatter field ${key} in ${file}`);
  writeFileSync(file, source.replace(pattern, `${key}: ${value}`), 'utf8');
}

function assertContains(file, values) {
  const source = readFileSync(file, 'utf8');
  for (const value of values) {
    if (!source.includes(value)) throw new Error(`${file} does not contain expected value: ${value}`);
  }
}

try {
  console.log('Phase 3: creating isolated Story Skills lifecycle fixture...');
  story([
    'init', 'The Dead Frequency',
    '--genre', 'mystery',
    '--sub-genre', 'near-future',
    '--pov', 'third-person-limited',
    '--tense', 'past',
    '--theme', 'trust',
    '--theme', 'memory',
    '--synopsis', 'A transit courier hears a sealed maintenance channel predicting her route one minute before she takes it.'
  ], temp);

  const project = findStoryDir(temp);
  story(['add', 'character', 'Mara Vale', '--role', 'protagonist'], project);
  story(['add', 'character', 'Ilan Reeve', '--role', 'supporting'], project);
  story(['add', 'location', 'North Station', '--type', 'landmark', '--character', 'mara-vale', '--character', 'ilan-reeve'], project);
  story(['add', 'artifact', 'Field Receiver', '--type', 'technology', '--owner', 'mara-vale', '--location', 'north-station'], project);
  story(['add', 'arc', 'Dead Frequency', '--type', 'main', '--character', 'mara-vale', '--character', 'ilan-reeve', '--theme', 'trust'], project);

  const chapters = [
    ['Signal Zero', 'Mara hears a maintenance channel repeat the exact platform change she is about to make.'],
    ['One Minute Early', 'The signal predicts a gate closure before station control announces it, forcing Mara to test whether it is live.'],
    ['Under Platform Nine', 'Mara and Ilan trace the signal to an abandoned route-simulation beacon that has been replaying archived movement models.']
  ];

  chapters.forEach(([title, prose], index) => {
    const number = index + 1;
    const chapterId = `chapter-${String(number).padStart(2, '0')}`;
    story([
      'add', 'chapter', title,
      '--number', String(number),
      '--pov', 'mara-vale',
      '--location', 'north-station',
      '--character', 'mara-vale',
      '--character', 'ilan-reeve',
      '--arc', 'dead-frequency'
    ], project);
    story([
      'add', 'scene', `${title} Main Beat`,
      '--chapter', chapterId,
      '--scene', '1',
      '--pov', 'mara-vale',
      '--location', 'north-station',
      '--character', 'mara-vale',
      '--character', 'ilan-reeve',
      '--arc', 'dead-frequency'
    ], project);
    setChapterText(
      join(project, 'chapters', `${chapterId}.md`),
      number === 1 ? golden('chapter-01-draft.md') : prose
    );
  });

  story(['add', 'promise', 'The Signal Predicts Her Route', '--planted', 'chapter-01', '--arc', 'dead-frequency', '--character', 'mara-vale'], project);
  story(['add', 'question', 'Who Is Transmitting On The Dead Channel', '--introduced', 'chapter-01', '--character', 'mara-vale'], project);

  const operations = join(project, 'revisions', 'phase3');
  mkdirSync(operations, { recursive: true });
  for (const name of ['chapter-01-plan.md', 'chapter-01-review.md', 'chapter-01-canon-diff.md']) {
    writeFileSync(join(operations, name), golden(name), 'utf8');
  }

  const preCanonStart = performance.now();
  story(['wordcount', '.', '--write'], project);
  story(['reindex', '.'], project);
  story(['validate', '.'], project);
  story(['links', '.'], project);
  story(['continuity', '.'], project);
  const preCanonMs = Math.round(performance.now() - preCanonStart);

  assertContains(join(operations, 'chapter-01-plan.md'), ['AUTHOR GATE: APPROVED', 'Forbidden reveal']);
  assertContains(join(operations, 'chapter-01-review.md'), ['Verdict', 'MAJOR']);
  assertContains(join(operations, 'chapter-01-canon-diff.md'), ['AUTHOR DECISION: ACCEPT ALL', 'knowledge-state']);

  const promiseFile = join(project, 'continuity', 'promises', 'the-signal-predicts-her-route.md');
  replaceFrontmatterScalar(promiseFile, 'status', 'paid-off');
  replaceFrontmatterScalar(promiseFile, 'payoff', 'chapter-03');

  const questionFile = join(project, 'continuity', 'questions', 'who-is-transmitting-on-the-dead-channel.md');
  replaceFrontmatterScalar(questionFile, 'status', 'resolved');
  replaceFrontmatterScalar(questionFile, 'resolved', 'chapter-03');

  for (let i = 1; i <= 3; i++) {
    replaceFrontmatterScalar(join(project, 'chapters', `chapter-${String(i).padStart(2, '0')}.md`), 'status', 'final');
  }

  const storyId = basename(project);
  writeFileSync(join(project, 'continuity', 'state.md'), `---\ntype: continuity-state\nstory: ${storyId}\ncurrent-chapter: 3\ncharacter-state:\n  - character: mara-vale\n    location: north-station\n    physical: tired but uninjured\n    emotional: wary and focused\nknowledge-state:\n  - character: mara-vale\n    knows: the dead channel comes from an abandoned route-simulation beacon\n    learned-in: chapter-03\nobject-state:\n  - artifact: field-receiver\n    owner: mara-vale\n    location: north-station\n    status: active\n---\n\n# Continuity State\n\n## Current Story State\n\nMara has traced the dead channel to the abandoned beacon and keeps the receiver. Ilan knows what she found.\n`, 'utf8');

  const postCanonStart = performance.now();
  story(['wordcount', '.', '--write'], project);
  story(['reindex', '.'], project);
  story(['validate', '.'], project);
  story(['links', '.'], project);
  story(['continuity', '.'], project);
  story(['report', '.', '--actionable'], project);
  const postCanonMs = Math.round(performance.now() - postCanonStart);

  assertContains(promiseFile, ['status: paid-off', 'payoff: chapter-03']);
  assertContains(questionFile, ['status: resolved', 'resolved: chapter-03']);
  assertContains(join(project, 'continuity', 'state.md'), ['current-chapter: 3', 'learned-in: chapter-03', 'artifact: field-receiver']);

  const totalMs = preCanonMs + postCanonMs;
  console.log(JSON.stringify({
    fixture: 'The Dead Frequency',
    phases: ['plan', 'draft', 'review', 'canon-diff', 'author-approval', 'state-update', 'final-validation'],
    chapters: 3,
    scenes: 3,
    preCanonChecksMs: preCanonMs,
    postCanonChecksMs: postCanonMs,
    deterministicChecksMs: totalMs,
    result: 'pass'
  }, null, 2));

  const budget = Number(process.env.NOVEL_OS_LIFECYCLE_BUDGET_MS || 0);
  if (budget > 0 && totalMs > budget) {
    throw new Error(`Lifecycle deterministic budget exceeded: ${totalMs}ms > ${budget}ms`);
  }
} finally {
  rmSync(temp, { recursive: true, force: true });
}
