# Novel OS Dashboard

> Open this repository root as an Obsidian vault. The plain Markdown links work without plugins; Dataview blocks become live dashboards when Dataview is installed.

## Command Center

- [[story|Story Bible]]
- [[author/creative-constitution|Creative Constitution]]
- [[author/style-bible|Style Bible]]
- [[author/boundaries|Boundaries]]
- [[author/decisions|Author Decisions]]
- [[author/session-state|Session State (non-canonical)]]
- [[continuity/state|Continuity State]]
- [[plot/timeline|Timeline]]
- [[docs/WORKFLOW|Chapter Workflow]]
- [[docs/QUALITY_GATES|Quality Gates]]
- [[docs/SESSION_OPERATIONS|Session Operations]]
- [[docs/MODEL_POLICY|Model Policy]]
- [[prompts/README|Agent Role Prompts]]
- [[prompts/session/README|Session Prompts]]

## Characters

```dataview
TABLE role AS Role, status AS Status, arc AS Arc
FROM "characters"
WHERE file.name != "_index"
SORT file.name ASC
```

## Open promises

```dataview
TABLE status AS Status, planted AS Planted, payoff AS Payoff
FROM "continuity/promises"
WHERE file.name != "_index" AND status != "paid-off"
SORT planted ASC
```

## Open questions

```dataview
TABLE status AS Status, introduced AS Introduced, resolved AS Resolved
FROM "continuity/questions"
WHERE file.name != "_index" AND status != "resolved"
SORT introduced ASC
```

## Chapters

```dataview
TABLE number AS No, pov AS POV, word_count AS Words, status AS Status
FROM "chapters"
WHERE file.name != "_index"
SORT number ASC
```

## Current arcs

```dataview
TABLE type AS Type, status AS Status, characters AS Characters
FROM "plot/arcs"
WHERE file.name != "_index"
SORT file.name ASC
```

## Editorial queue

```dataview
TASK
FROM "revisions" OR "research" OR "author"
WHERE !completed
SORT file.mtime DESC
```

## Health commands

```bash
npm run os:doctor
npm run story:check
npm run story:doctor
npm run story:next
npm run perf:check
```

The repository is canonical. This dashboard is only a projection of the files below it.
