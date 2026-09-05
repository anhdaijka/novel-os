# Novel OS

A free-first, agent-native operating system for writing long-form fiction with **Antigravity + Gemini**, **Story Skills**, selected fiction craft skills, **Markdown/YAML**, **Obsidian**, and **Git**.

Novel OS is intentionally **not** a custom agent framework. It composes existing open tools and keeps the novel itself portable.

> **Privacy:** this repository is currently public. For an unpublished manuscript, prefer creating a separate private repository from this template (or change visibility before adding story content). See [`docs/PRIVACY.md`](docs/PRIVACY.md).

## Core principles

- **Author decides.** AI can propose, draft, review, and recommend; it cannot silently canonize or retcon.
- **One source of truth.** Canon lives in the repository, not in chat memory or a second app database.
- **Draft is not canon.** Drafted details become canon only after author approval and state update.
- **Deterministic checks first.** Story Skills validates machine-checkable constraints before LLM interpretation.
- **Model agnostic.** The work remains Markdown/YAML + Git even if the agent/model changes later.

## Provenance

Core third-party skills are pulled directly from their source repositories at pinned commits; Novel OS contributes only the integration layer (rules, scripts, prompts, templates, dashboards and CI). See [`docs/SUPPLY_CHAIN.md`](docs/SUPPLY_CHAIN.md).

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

`bootstrap` copies pinned upstream Story Skills and selected jwynia fiction skills into `.agents/skills/`. Generated skill files are git-ignored; pins live in `config/upstreams.json`. The bundled upstream `story-maintenance/scripts/story.js` becomes the local CLI, so normal story commands do not repeatedly download packages.

Initialize a story into this repository root:

```bash
npm run init-story -- "My Novel" --genre mystery --pov third-person-limited --tense past --theme truth
```

Then run:

```bash
npm run tooling:check
npm run story:check
npm run story:doctor
npm run story:next
```

Open the repository root as both your Antigravity workspace and Obsidian vault. Pin [`Home.md`](Home.md) in Obsidian.

## Agent roles

Reusable bounded role prompts live under [`prompts/`](prompts/README.md): Director, Planner, Writer, Reviewer and Researcher. These complement rather than replace `.agents/rules/`.

## Optional Better Writing skill

```bash
npm run bootstrap -- --with-better-writing
```

Use it selectively for prose polish after story/continuity issues are resolved.

## Daily chapter loop

1. Plan chapter purpose, POV, start/end state, scenes, promises/questions and forbidden reveals.
2. Run deterministic checks.
3. Author approves plan.
4. Draft using minimum sufficient context.
5. Review structure, character, dialogue, prose and continuity separately.
6. Approve revision plan.
7. Revise only required scope.
8. Present canon diff.
9. Author accepts all/selected/rejects.
10. Update story state.
11. Validate again.
12. Commit accepted transition.

Full workflow: [`docs/WORKFLOW.md`](docs/WORKFLOW.md).

## Performance / stress testing

Novel OS does not claim to control Gemini latency or guarantee prose quality. The deterministic/core layer is measurable and runs locally after bootstrap. See [`docs/PERFORMANCE.md`](docs/PERFORMANCE.md).

```bash
npm run stress:test
npm run perf:check  # after a real story has been initialized
```

## Story CLI

All normal CLI commands use the pinned local Story Skills fallback installed by bootstrap:

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

After initialization Story Skills owns its standard schema paths:

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

Novel OS adds complementary authoring layers only:

```text
author/       creative constitution, style, boundaries, decisions
research/     non-canonical evidence and source notes
rejected/     ideas agents must not resurrect
revisions/    review/revision working material
templates/    operational and genre overlay templates
prompts/      bounded agent role prompts
exports/      disposable generated outputs
.agents/      Antigravity rules + locally installed upstream skills
```

Do not create a second character, lore, or continuity database in another app.

## First Antigravity prompt

```text
Act as the Narrative Director for this repository.
Read AGENTS.md, applicable workspace rules, story.md, and current Story Skills state.
Run deterministic story checks before making narrative recommendations.
Do not draft prose yet.
Tell me the current project state, unresolved setup work, and safest next authoring action.
```

## Upstream updates

```bash
npm run upstreams:check
```

Do not auto-upgrade during active drafting. Review changes, update `config/upstreams.json`, rerun `npm run bootstrap -- --clean`, then run tooling/stress/story checks.

## CI

- `story-checks.yml` bootstraps the pinned local CLI and validates initialized stories on pushes/PRs.
- `tooling-smoke.yml` verifies pinned skill installation on Ubuntu and Windows.
- `novel-os-stress.yml` bootstraps and creates a temporary linked three-chapter project before running the maintenance pipeline.

## Where to start reading

1. [`AGENTS.md`](AGENTS.md)
2. [`Home.md`](Home.md)
3. [`docs/GETTING_STARTED.md`](docs/GETTING_STARTED.md)
4. [`docs/WORKFLOW.md`](docs/WORKFLOW.md)
5. [`docs/AUTHOR_UX.md`](docs/AUTHOR_UX.md)
6. [`docs/PERFORMANCE.md`](docs/PERFORMANCE.md)
7. [`docs/SUPPLY_CHAIN.md`](docs/SUPPLY_CHAIN.md)
8. [`docs/STACK.md`](docs/STACK.md)
9. [`docs/OBSIDIAN.md`](docs/OBSIDIAN.md)
10. [`docs/ANTIGRAVITY.md`](docs/ANTIGRAVITY.md)
11. [`docs/PRIVACY.md`](docs/PRIVACY.md)

## Philosophy

**The repository remembers.  
The CLI verifies.  
The agent reasons.  
The skills guide.  
Obsidian visualizes.  
Git preserves history.  
The author decides.**
