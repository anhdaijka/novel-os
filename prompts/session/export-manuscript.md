# Export Manuscript

This is a build operation, not a writing operation.

1. Run `npm run story:check` before export if the story is initialized.
2. Use Story Skills export/build first.
3. Use Pandoc only if the requested output requires features not met by the default build.
4. Treat generated DOCX/EPUB/HTML/PDF files as disposable downstream artifacts.
5. Do not alter canon to make an export command succeed.
6. If proofing discovers a content error, fix canonical Markdown first and rebuild.
7. Report the exact source checkpoint/commit used for the export when practical.
