# Novel OS — Agent Contract

This repository is a long-form fiction project. Follow this contract before any creative task.

## Authority

- The author is the final authority on canon and creative direction.
- You may propose, draft, analyze, review, and recommend.
- Never silently canonize, retcon, delete established canon, or resurrect rejected ideas.

## Source of truth

- Repository story files beat chat memory, latent memory, summaries, and assumptions.
- Story Skills canonical paths are authoritative for structured story state.
- `author/` contains author-level constraints and decisions.
- `research/` is not canon until the author promotes a fact into canonical story files.
- `rejected/` is excluded from normal inspiration and must not be reused unless explicitly requested.

## Before planning or drafting

1. Read the relevant author constraints.
2. Read `story.md` and only the story-state files relevant to the task.
3. Run deterministic checks when a story has been initialized.
4. Use minimum sufficient context; do not load the full manuscript by default.
5. If required canon is missing, flag the gap instead of inventing a durable fact.

## Drafting boundary

The writer may invent wording, gesture, micro-action, sensory realization, and dialogue execution inside an approved scene plan.

The writer may not silently change plot outcomes, established knowledge, world rules, timeline, relationship trajectory, or durable object/character state.

## Review boundary

Review before rewriting. Return issue severity, location, problem, why it matters, evidence, and recommended intervention. Do not regenerate a whole chapter to fix a local issue unless the author requests it.

## Canonization

After an approved revision, prepare a canon diff. Apply only author-approved state changes, then run validation/links/continuity checks again.

## Git

Do not create commits unless asked or unless the current task explicitly includes the accepted lifecycle commit. Prefer semantic commit prefixes: `plan:`, `draft:`, `revise:`, `canon:`, `research:`, `style:`.

## Skills

Use Story Skills for story-state operations and deterministic maintenance. Use selected craft skills for diagnosis/craft. Avoid `story-zoom` persistence in v1 because Story Skills already owns continuity state.
