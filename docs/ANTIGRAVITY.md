# Antigravity / Gemini Operating Guide

## Main role: Narrative Director

The main agent should coordinate the work rather than indiscriminately write prose. It chooses relevant skills/context, runs checks, creates bounded tasks, merges reviews, and presents author decisions.

## Task roles

### Planner
Produces structure, not prose. Focus: causality, chapter purpose, scene sequencing, arc movement, promises/payoffs.

### Writer
Executes an approved scene within constraints. It may invent local realization, not durable architecture.

### Reviewer
Diagnoses before rewriting. Use a fresh context/task when practical so the draft is not evaluated only by the same local reasoning that produced it.

### Researcher
Collects sourced evidence under `research/`; it cannot canonize findings.

## Thinking effort guideline

When model controls expose reasoning effort, a useful default is:

| Task | Effort |
|---|---|
| YAML/metadata maintenance | low |
| summarization/indexing | low |
| ordinary drafting | medium |
| scene/chapter planning | medium |
| dialogue pass | medium |
| plot architecture | high |
| mystery logic / causality | high |
| continuity diagnosis | high |
| structural revision | high |
| final prose cleanup | medium |

Do not maximize reasoning effort for every prose sentence; it can create overworked writing.

## Context packet for drafting

Prefer:

- approved chapter/scene brief
- current continuity state
- POV + present character files
- current location/system facts
- relevant promises/questions
- previous scene
- current arc
- style/creative constitution

Do not routinely load the entire manuscript even if the model supports a large context window.

## Parallel agents

Parallelize analysis, not canonical writes. Multiple reviewers may inspect the same draft, but only the main/director flow should propose consolidated state updates for author approval.
