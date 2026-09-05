# Phase 3 — Operational Lifecycle

Phase 3 turns the architecture into a reproducible authoring loop.

## Two test layers

### Deterministic lifecycle

`npm run lifecycle:test` creates a temporary Story Skills project with the pinned local upstream CLI and exercises:

`plan -> draft -> review -> canon diff -> simulated author approval -> state update -> final validation`

It also carries a promise and an open question across three chapters, then pays/resolves them in Chapter 03. The test runs `wordcount`, `reindex`, `validate`, `links`, `continuity`, and `report` before and after canonical mutation.

The temporary project is deleted after the test.

### Creative/runtime evaluation

`evals/phase3-antigravity.md` tests the part deterministic CI cannot: whether the current Gemini/Antigravity runtime follows the Director/Writer/Reviewer contracts and produces bounded, evidence-based creative work.

## Why the sample is not committed as a full Story Skills project

A checked-in generated project would become another apparent schema reference and could drift from upstream. Instead:

- upstream Story Skills remains the schema authority;
- the project is generated fresh for every test;
- Novel OS commits only golden operational artifacts used to verify its own layer.

## Performance

The test reports pre-canon and post-canon deterministic check times separately. Set a budget if desired:

```bash
NOVEL_OS_LIFECYCLE_BUDGET_MS=5000 npm run lifecycle:test
```

PowerShell:

```powershell
$env:NOVEL_OS_LIFECYCLE_BUDGET_MS=5000; npm run lifecycle:test
```

This budget measures only the local deterministic layer, not Gemini generation latency.
