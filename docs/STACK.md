# Full Stack Reference

Novel OS is **free-first** and deliberately layered. Core tools are small; optional tools activate only when they solve a concrete problem.

| Layer | Tool | Priority | Purpose |
|---|---|---:|---|
| Agent runtime | Antigravity + Gemini | Core | director, planner, writer, reviewer, researcher |
| Story system | Story Skills | Core | structured story state + deterministic continuity |
| Craft | selected jwynia fiction skills | Core | story diagnosis, character, dialogue, scenes, prose, revision |
| Canon format | Markdown + YAML | Core | portable source of truth |
| Versioning | Git | Core | history, diff, rollback |
| Human UI | Obsidian | Recommended | story bible navigation and visual thinking |
| Metadata views | Dataview | Recommended | query YAML/frontmatter dashboards |
| Visual boards | Obsidian Canvas | Recommended | relationships, clues, plot mapping |
| Tasks | Obsidian Tasks | Optional | editorial backlog |
| Git UI | Obsidian Git | Optional | Git convenience inside Obsidian |
| Obsidian automation | Advanced URI | Later | deep links / commands |
| Research | Zotero | Optional | source-heavy historical/scientific research |
| Manuscript editor | novelWriter | Optional | ergonomic long-form prose editing |
| Export | Story Skills build / Pandoc | Later | DOCX/EPUB/HTML |
| DOCX finishing | LibreOffice | Optional | final formatting/proofing |
| EPUB QA | Calibre | Optional | ebook inspection/conversion |
| Diagrams | Mermaid | Optional | machine-readable diagrams |
| Local LLM | Ollama | Fallback | privacy/quota/batch work |
| Fiction local LLM | KoboldCpp | Laboratory | alternate local prose generation |
| Complex chronology | Aeon Timeline | Special case | only when markdown timeline is insufficient |
| External integrations | MCP | Later | only for justified external services |

Run `npm run capabilities` to detect optional CLI capabilities already available on the machine. Missing optional tools do not affect core readiness. See [`OPTIONAL_STACK.md`](OPTIONAL_STACK.md).

## Core skill selection

Installed from jwynia by default:

- story-sense
- story-analysis
- character-arc
- dialogue
- scene-sequencing
- drafting
- prose-style
- revision
- genre-conventions

`story-zoom` is intentionally disabled because it can introduce a separate persisted story-state layer. Story Skills remains the single structured state owner.

## Better Writing

Optional. Use for prose-quality passes when source facts and voice are already controlled. Install with:

```bash
npm run bootstrap -- --with-better-writing
```

## Optional activation rules

- Use Story Skills build before adding Pandoc.
- Use plain research Markdown before adding Zotero.
- Use Story Skills timeline before adding a specialized chronology app.
- Use Gemini before adding a local model unless privacy/quota/experimentation creates a real need.
- Use Antigravity filesystem/browser capabilities before adding MCP.

## Excluded from the default path

These are not bad tools; they duplicate responsibilities in an Antigravity-first authoring workspace:

- SillyTavern
- DeepLore
- AnythingLLM
- Dify
- Flowise
- LangGraph
- CrewAI
- custom RAG / vector DB
- custom agent orchestration

Add such systems only if Novel OS evolves into a software product rather than an authoring workspace.
