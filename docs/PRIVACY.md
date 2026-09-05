# Privacy and Unpublished Manuscripts

At the time Novel OS v1 was scaffolded, `anhdaijka/novel-os` is a **public GitHub repository**.

That is convenient for the framework/template itself, but it matters once real unpublished fiction is written into the same repository:

- committed chapters are public
- story bible/canon files are public
- author notes and rejected ideas are public
- Git history can retain content even after later deletion

## Recommended choices

### A. Keep `novel-os` public as a reusable template

Create a **separate private repository per real novel** from this template. This is the cleanest recommendation.

### B. Turn this repository private before adding unpublished content

Do this before committing story material you do not want public.

## Secrets

Never place API keys, credentials, private tokens, or paid-provider secrets in story files, `GEMINI.md`, rules, or committed configuration. Use environment variables / secret stores appropriate to the tool.

## Research material

Do not commit large copyrighted source copies merely because they were used for research. Prefer bibliographic notes, citations, short necessary excerpts, and Zotero/library references.
