import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runStory } from './lib/story-cli.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
if (!existsSync(join(root, 'story.md'))) {
  console.error('No story.md found. Initialize first with: npm run init-story -- "Your Novel"');
  process.exit(1);
}

for (const command of [['validate', '.'], ['links', '.'], ['continuity', '.']]) {
  console.log(`\n> story ${command.join(' ')}`);
  try {
    runStory(root, command);
  } catch (error) {
    if (error.code === 'NOVEL_OS_STORY_CLI_MISSING') console.error(error.message);
    process.exit(error.status ?? 1);
  }
}
