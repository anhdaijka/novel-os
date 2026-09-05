# Performance & Quality Guarantees

## What can be guaranteed

Novel OS can guarantee architectural properties under repository control:

- no always-on database server
- no vector database or custom RAG service in the core path
- no duplicate canonical store
- deterministic Story Skills checks are separated from LLM review
- upstream skills are pinned, so behavior does not silently change between sessions
- Story Skills CLI runs from the locally bootstrapped pinned skill bundle, not a network `npx` fetch on every command
- continuity CI and tooling smoke tests are reproducible

## What cannot be guaranteed

Novel OS cannot honestly guarantee Gemini latency/quota, prose quality for every genre, zero hallucinations, identical behavior across model releases, or constant response time as a manuscript grows.

## Runtime path

After `npm run bootstrap`, the hot path is:

`Antigravity -> selected Markdown/YAML context -> local pinned story.js -> Markdown/YAML writes`

There is no network hop to a separate application database, embeddings pipeline, package download per story command, or extra agent server. Git and Obsidian operate on the same files.

## Performance policy

1. Load minimum sufficient context; do not feed the whole manuscript by default.
2. Prefer structured current state over old prose for continuity questions.
3. Run deterministic checks before expensive LLM review.
4. Keep Dataview queries folder-scoped instead of vault-wide JavaScript scans.
5. Do not install every craft skill.
6. Do not add MCP, RAG, local model servers, or timeline software until a measured need exists.

## Measure locally

```bash
npm run perf:check
```

This times `validate`, `links`, `continuity`, and actionable `report` against the current repository using the local pinned CLI.

```bash
npm run stress:test
```

The stress test creates a temporary three-chapter Story Skills project, adds linked entities/scenes, and runs the deterministic maintenance pipeline. It never changes your novel.

Optional deterministic-check budget:

```bash
NOVEL_OS_CHECK_BUDGET_MS=10000 npm run perf:check
```

PowerShell:

```powershell
$env:NOVEL_OS_CHECK_BUDGET_MS=10000; npm run perf:check
```

Do not confuse this CLI budget with Gemini generation latency; they are separate systems.

## Creative quality performance

Use high/medium reasoning for planning and diagnosis, medium for drafting/rewrite, independent review context after drafting, author approval before canon mutation, and targeted revisions rather than whole-chapter regeneration.

The target is not maximum context. It is minimum context that preserves correct state and produces the intended scene.
