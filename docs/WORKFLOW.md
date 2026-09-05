# Editorial Workflow

## State machine

```text
idea
  ↓
plan
  ↓
deterministic check
  ↓
author approval
  ↓
draft
  ↓
review
  ↓
revision plan
  ↓
author approval
  ↓
revise
  ↓
canon diff
  ↓
author approval
  ↓
state update
  ↓
final check
  ↓
accept chapter
  ↓
git commit
```

## Planning gate

Do not move into prose until the chapter has enough information to constrain it safely:

- purpose
- POV
- starting state
- ending state
- scene order
- causal progression
- character movement
- revelations/information movement
- active promises/questions
- forbidden reveals
- continuity risks

Use `templates/chapter-brief.md`.

## Deterministic gate

Before and after accepted state changes:

```bash
npm run story:check
```

For diagnostics:

```bash
npm run story:doctor
npm run story:next
npm run story:report
```

## Drafting

Give the writer minimum sufficient context. Prefer structured current state over old prose. The writer can creatively realize the approved scene but cannot silently change its durable outcome.

## Review

Use fresh review context where practical. Separate:

1. structure / causality / pacing
2. character / agency / arc
3. dialogue / subtext / voice
4. prose / specificity / rhythm
5. continuity
6. genre expectations

Use `templates/review-report.md`. Review first; rewrite second.

## Canon diff

After revision, list proposed durable changes with `templates/canon-diff.md`. Author chooses accept all, accept selected, or reject. Only then update Story Skills state.

## Commit discipline

Recommended sequence:

```text
plan: approve chapter 08
draft: chapter 08 first pass
revise: tighten chapter 08 confrontation
canon: accept chapter 08 state transition
```

You do not need a commit for every agent action. Commits should correspond to meaningful recoverable states.

## Research lifecycle

```text
external source
  ↓
research/inbox
  ↓
verification
  ↓
research/verified
  ↓
author decision
  ↓
canonical Story Skills file
```

Never let external research bypass author interpretation and become story canon automatically.
