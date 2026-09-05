# Session Operations

Novel OS separates three kinds of memory:

1. **Canon** — Story Skills-owned files. Highest authority.
2. **Author decisions** — `author/decisions.md` and explicit approved plans/diffs.
3. **Session memory** — `author/session-state.md`. Operational only; never canon.

## Start a session

Use `prompts/session/start-session.md`. The Agent should establish current state and a context manifest before creative work.

## Planning

Use `prompts/session/plan-next-chapter.md`. New plans end `AUTHOR GATE: PENDING`. The author changes the gate to approved; the Agent does not self-approve.

## Drafting

Use `prompts/roles/writer.md` only against an approved plan for canonical-intended prose. Exploratory prose must be labeled provisional.

## Review

Use `prompts/session/review-current-chapter.md`. Deterministic failures and artistic/craft judgments stay separate.

## Canonization

Use `prompts/session/canonize-approved.md` only after a canon diff has been shown and explicitly approved.

## End a session

Use `prompts/session/end-session.md`. Keep session-state concise and link-oriented so it does not become a second story database.
