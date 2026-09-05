# Author UX

## Obsidian

Open the repository root as the vault and pin `Home.md` as the home note.

Recommended community plugins:

- Dataview — metadata dashboards
- Tasks — editorial queue if you use Markdown tasks heavily

Optional:

- Obsidian Git — Git UI/backup convenience
- Advanced URI — later automation

Canvas is built in and is useful for relationship/plot boards, but canonical facts must remain in Markdown/YAML.

## Dashboard design

`Home.md` is intentionally cheap:

- folder-scoped Dataview queries
- no DataviewJS loops
- no duplicate metadata cache created by Novel OS
- no custom plugin dependency for core work

If Dataview is missing, the note remains usable as plain Markdown links and command references.

## Working layout

A practical desktop layout:

1. Antigravity: chapter/scene file in editor.
2. Antigravity: agent conversation beside it.
3. Obsidian: `Home.md` / character / continuity notes.
4. Terminal: `npm run story:check` and Git diff.

## When a dashboard becomes slow

First inspect query scope. Avoid queries like `FROM ""` over the entire vault when a folder path is enough. Split giant dashboards into focused notes before adding caches or databases.
