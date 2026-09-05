# Novel OS

A free-first, agent-native operating system for writing long-form fiction with **Antigravity + Gemini**, **Story Skills**, selected fiction craft skills, **Markdown/YAML**, **Obsidian**, and **Git**.

Novel OS is intentionally **not** a custom agent framework. It composes existing open tools and keeps the novel itself portable.

> **Privacy:** this repository is currently public. For an unpublished manuscript, prefer creating a separate private repository from this template (or change visibility before adding story content). See [`docs/PRIVACY.md`](docs/PRIVACY.md).

## Core principles

- **Author decides.** AI can propose, draft, review, and recommend; it cannot silently canonize or retcon.
- **One source of truth.** Canon lives in the repository, not in chat memory or a second app database.
- **Draft is not canon.** Drafted details become canon only after author approval and state update.
- **Deterministic checks first.** Story Skills validates references, continuity, promises, questions, knowledge/object state, and other machine-checkable constraints before LLM interpretation.
- **Model agnostic.** The work remains Markdown/YAML + Git even if the agent/model changes later.

## Stack

### Core

- Google Antigravity / Gemini as the main agent runtime
- [danjdewhurst/story-skills](https://github.com/danjdewhurst/story-skills) for story state + deterministic continuity
- Selected skills from [jwynia/agent-skills](https://github.com/jwynia/agent-skills) for fiction craft
- Markdown + YAML as canonical data
- Git as history and rollback
- Obsidian as the human-facing story-bible UI

### Optional

- Better Writing — prose de-slop / voice preservation
- Obsidian Dataview, Tasks, Canvas, Git, Advanced URI
- Zotero — research-heavy fiction
- novelWriter — long-form manuscript editing
- Pandoc — Markdown → DOCX/EPUB/HTML
- LibreOffice — final DOCX pass
- Calibre — EPUB QA
- Ollama / KoboldCpp — local fallback or prose experiments
- Mermaid — diagrams-as-code
- Aeon Timeline — only for genuinely complex chronology
- MCP integrations — only when a real external service requires them

See [`docs/STACK.md`](docs/STACK.md).

## Requirements

- Git
- Node.js 18+ (20+ recommended)
- Antigravity or another Agent Skills-compatible agent
- Obsidian is recommended but not required

## Quick start

```bash
git clone https://github.com/anhdaijka/novel-os.git
cd novel-os
npm run bootstrap
```

`bootstrap` installs pinned upstream Story Skills and the selected jwynia fiction skills into `.agents/skills/`. These generated skill files are intentionally git-ignored; the pinned versions live in `config/upstreams.json`.

Then initialize a story **into this repository root**. Bash example:

```bash
npm run init-story -- "My Novel" --genre mystery --pov third-person-limited --tense past --theme truth
```

The same one-line command works in PowerShell/Windows Terminal.

The initializer delegates schema creation to the pinned Story Skills CLI, so Novel OS does not duplicate or guess its YAML schema.

Then run:

```bash
npm run tooling:check
npm run story:check
npm run story:doctor
npm run story:next
```

Open the repository root as both:

1. your Antigravity workspace, and
2. your Obsidian vault.

They read and write the same files.

## Optional Better Writing skill

```bash
npm run bootstrap -- --with-better-writing
```

Use it selectively for prose polish after story/continuity issues are already resolved.

## Daily chapter loop

1. **Plan** — chapter purpose, POV, start/end state, scenes, promises/questions, forbidden reveals.
2. **Check** — run deterministic Story Skills checks.
3. **Author approve** the plan.
4. **Draft** using minimum sufficient context.
5. **Review** structure, character, dialogue, prose, continuity separately.
6. **Approve revision plan** before rewriting.
7. **Revise** only the required scope.
8. **Canon diff** — list proposed state changes.
9. **Author approve** all/selected/reject.
10. **Update story state**.
11. **Validate again**.
12. **Commit** the accepted transition.

Full workflow: [`docs/WORKFLOW.md`](docs/WORKFLOW.md).

## Story CLI

The CLI is pinned through `config/upstreams.json` and invoked directly from GitHub; it is not assumed to be globally installed.

```bash
npm run story -- validate .
npm run story -- links .
npm run story -- continuity .
npm run story -- report . --actionable
npm run story -- next .
npm run story -- doctor .
npm run story -- export . --out manuscript.md
npm run story -- build . --format docx
npm run story -- build . --format epub
```

## Repository layers

After story initialization, Story Skills owns its standard schema paths such as:

```text
story.md
characters/
worldbuilding/
plot/
scenes/
continuity/
glossary/
chapters/
```

Novel OS adds only complementary authoring layers:

```text
author/       creative constitution, style, boundaries, decision log
research/     non-canonical evidence and source notes
rejected/     rejected ideas that agents must not resurrect
revisions/    review/revision working material
templates/    chapter/review/canon/research templates
exports/      disposable generated outputs
.agents/      Antigravity rules + locally installed skills
```

Do not create a second character database, lore database, or continuity database in another app.

## First Antigravity prompt

After bootstrap + story initialization:

```text
Act as the Narrative Director for this repository.
Read AGENTS.md, the workspace rules, story.md, and the current Story Skills state.
Run the deterministic story checks before making narrative recommendations.
Do not draft prose yet.
Tell me the current project state, unresolved setup work, and the safest next authoring action.
```

## Upstream updates

Check whether pinned dependencies have newer commits:

```bash
npm run upstreams:check
```

Do not auto-upgrade during active drafting. Review upstream changes, update `config/upstreams.json`, rerun `npm run bootstrap -- --clean`, then run story checks before continuing.

## CI

- `story-checks.yml` runs Story Skills validation on pushes/PRs after `story.md` exists.
- `tooling-smoke.yml` checks the local scripts and verifies pinned skill installation on both Ubuntu and Windows when tooling/config changes.

## Where to start reading

1. [`AGENTS.md`](AGENTS.md)
2. [`docs/GETTING_STARTED.md`](docs/GETTING_STARTED.md)
3. [`docs/WORKFLOW.md`](docs/WORKFLOW.md)
4. [`docs/STACK.md`](docs/STACK.md)
5. [`docs/OBSIDIAN.md`](docs/OBSIDIAN.md)
6. [`docs/ANTIGRAVITY.md`](docs/ANTIGRAVITY.md)
7. [`docs/PRIVACY.md`](docs/PRIVACY.md)

## Philosophy

**The repository remembers.  
The CLI verifies.  
The agent reasons.  
The skills guide.  
Obsidian visualizes.  
Git preserves history.  
The author decides.**
