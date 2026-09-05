# Phase 3 Lifecycle Fixture — The Dead Frequency

This directory contains **golden operational artifacts**, not a second Story Skills database.

The actual Story Skills project is generated in a temporary directory by `npm run lifecycle:test` using the pinned upstream CLI. It is deleted after the test. These files exist only so Novel OS can regression-test the author/agent handoff format without committing a fake canonical schema.

## What the fixture proves

1. Story Skills creates the canonical story project.
2. A chapter plan can pass through an explicit author gate.
3. Draft prose is written without immediately mutating canon.
4. Review is issue-oriented rather than an opaque numeric score.
5. Canon changes are proposed as a diff.
6. Only after simulated author approval are supported Story Skills fields changed.
7. Final `validate`, `links`, `continuity`, and `report` all pass.

## Synthetic story

**The Dead Frequency** is a public-safe near-future mystery used only for regression testing. A courier hears an inactive maintenance channel predicting her route one minute ahead.

## Run

```bash
npm run bootstrap
npm run lifecycle:test
```

The test never writes into the repository's own story state.
