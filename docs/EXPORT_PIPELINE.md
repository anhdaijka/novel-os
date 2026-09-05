# Export & Publishing Pipeline

The Markdown/YAML repository remains source of truth. DOCX, EPUB, PDF, and other deliverables are build artifacts.

## Level 1 — Story Skills build (default)

Use upstream functionality first:

```bash
npm run story:export
npm run story:build:docx
npm run story:build:epub
```

This is the preferred path when the generated files are sufficient.

## Level 2 — Pandoc (optional)

Activate Pandoc only when advanced conversion or a custom reference DOCX is required.

Suggested flow:

```text
canonical chapters
      ↓
Story Skills export → manuscript.md
      ↓
Pandoc
      ↓
DOCX / EPUB / HTML
```

Do not edit exported Markdown and copy it back over canonical chapters. Rebuild from source after corrections.

## Level 3 — Human finishing

For DOCX:

```text
DOCX → LibreOffice → visual proof / final styles
```

For EPUB:

```text
EPUB → Calibre → metadata / device inspection / QA
```

These finishing files are downstream artifacts. A typo discovered during proofing should be corrected in canonical chapter Markdown first, then rebuilt.

## Reproducibility

Record non-default export decisions (custom reference DOCX, special stylesheet, publisher requirements) in a project-specific note under `author/` or `revisions/`, not in story canon.
