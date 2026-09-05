import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { storyCliPath, runStory } from './lib/story-cli.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const checks = [];

function record(name, ok, severity, detail) {
  checks.push({ name, ok, severity, detail });
}

const major = Number(process.versions.node.split('.')[0]);
record('node', major >= 18, 'error', `Node ${process.versions.node}; requires >=18`);

try {
  const git = execFileSync('git', ['--version'], { encoding: 'utf8' }).trim();
  record('git', true, 'error', git);
} catch {
  record('git', false, 'error', 'Git executable not found');
}

try {
  const upstreams = JSON.parse(readFileSync(join(root, 'config', 'upstreams.json'), 'utf8'));
  const pins = [upstreams.storySkills?.commit, upstreams.jwynia?.commit];
  record('upstream-pins', pins.every((x) => typeof x === 'string' && /^[0-9a-f]{40}$/i.test(x)), 'error', 'Story Skills and jwynia pins are 40-char commit SHAs');
} catch (error) {
  record('upstream-pins', false, 'error', `Cannot parse config/upstreams.json: ${error.message}`);
}

const requiredFiles = [
  'AGENTS.md',
  '.agents/rules/00-authority.md',
  '.agents/rules/01-canon.md',
  '.agents/rules/02-context.md',
  'prompts/roles/director.md',
  'prompts/roles/writer.md',
  'prompts/roles/reviewer.md',
  'prompts/session/start-session.md',
  'prompts/session/canonize-approved.md',
  'templates/context-manifest.md',
  'author/session-state.md'
];

for (const path of requiredFiles) {
  record(`file:${path}`, existsSync(join(root, path)), 'error', existsSync(join(root, path)) ? 'present' : 'missing');
}

const cli = storyCliPath(root);
record('local-story-cli', existsSync(cli), existsSync(join(root, 'story.md')) ? 'error' : 'warning', existsSync(cli) ? cli : 'Run `npm run bootstrap` to install pinned skills locally');

if (existsSync(join(root, 'story.md')) && existsSync(cli)) {
  try {
    runStory(root, ['validate', '.'], { stdio: 'ignore' });
    runStory(root, ['links', '.'], { stdio: 'ignore' });
    runStory(root, ['continuity', '.'], { stdio: 'ignore' });
    record('story-health', true, 'error', 'validate + links + continuity passed');
  } catch (error) {
    record('story-health', false, 'error', `Story checks failed with exit ${error.status ?? 'unknown'}`);
  }
} else if (!existsSync(join(root, 'story.md'))) {
  record('story-health', true, 'info', 'Template mode: story.md not initialized yet');
}

const errors = checks.filter((x) => !x.ok && x.severity === 'error');
const warnings = checks.filter((x) => !x.ok && x.severity === 'warning');
console.log(JSON.stringify({
  mode: existsSync(join(root, 'story.md')) ? 'story' : 'template',
  status: errors.length ? 'fail' : warnings.length ? 'ready-with-warnings' : 'ready',
  errors: errors.length,
  warnings: warnings.length,
  checks
}, null, 2));

if (errors.length) process.exit(1);
