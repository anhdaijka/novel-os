import { fileURLToPath } from 'node:url';
import { runStory } from './lib/story-cli.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));

try {
  runStory(root, process.argv.slice(2));
} catch (error) {
  if (error.code === 'NOVEL_OS_STORY_CLI_MISSING') {
    console.error(error.message);
    process.exit(2);
  }
  process.exit(error.status ?? 1);
}
