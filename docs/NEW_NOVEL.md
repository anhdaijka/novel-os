# Starting a Real Novel from Novel OS

`anhdaijka/novel-os` is a public framework/template repository. Unpublished manuscript content should normally live in a separate **private** repository.

## Recommended flow

1. Create a private repository for the novel from this template/codebase.
2. Clone the private repository locally.
3. Run `npm run bootstrap`.
4. Run `npm run os:doctor`.
5. Initialize the Story Skills project with `npm run init-story -- "Title" ...`.
6. Fill `author/creative-constitution.md`, `author/style-bible.md`, and `author/boundaries.md`.
7. Open the repo root in Antigravity and Obsidian.
8. Run the Phase 3 lifecycle test once to verify local tooling.
9. Start the first real session with `prompts/session/start-session.md`.

## Keep public and private responsibilities separate

Public Novel OS should contain framework code, synthetic fixtures, docs, and tests.

Private novel repositories contain manuscript prose, actual character/world canon, research notes, author decisions, and session state.

Do not paste unpublished prose into public regression fixtures.
