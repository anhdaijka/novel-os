# Optional Stack Activation Guide

Optional tools are **not milestones**. Add one only when a concrete problem appears. Novel OS remains valid without every item on this page.

Run:

```bash
npm run capabilities
```

to see which optional CLI tools are already available on the current machine. GUI applications and MCP integrations are reported as manual because Novel OS should not launch desktop apps merely to detect them.

## Decision table

| Problem | Activate | Do not activate when |
|---|---|---|
| Large source/research library | Zotero | a handful of web notes are enough |
| Markdown prose editing feels awkward | novelWriter | Antigravity/Obsidian editing is comfortable |
| Need advanced DOCX/EPUB conversion | Pandoc | Story Skills `build` already meets delivery needs |
| Need final DOCX visual formatting | LibreOffice | no DOCX delivery is required |
| Need EPUB inspection/conversion | Calibre | EPUB is not a target deliverable |
| Need private/offline/batch model | Ollama | Gemini already satisfies the task |
| Want alternate local fiction prose | KoboldCpp | there is no model-comparison need |
| Chronology becomes genuinely complex | Aeon Timeline | Story Skills timeline remains understandable |
| Need a remote service bridge | MCP | Antigravity/browser/filesystem already solves it |

## Invariant

No optional tool becomes a second source of truth.

- Zotero owns source-library metadata, not story canon.
- novelWriter may edit manuscript prose, not maintain an alternate Story Bible.
- local models generate candidates, not canonical state.
- Aeon Timeline is a specialized view/working tool; accepted chronology must still be reflected in canonical Story Skills files.
- MCP is transport/integration, not memory.

## Cost policy

Prefer free/open-source choices. A paid tool is justified only if a concrete bottleneck remains after the free core is working. Aeon Timeline is therefore a special-case option rather than a default dependency.
