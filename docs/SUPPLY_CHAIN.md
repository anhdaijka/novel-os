# Supply Chain & Provenance

Novel OS deliberately avoids hidden forks and custom reimplementations of story engines.

## What comes directly from upstream

| Component | Source | Integration | Modification policy |
|---|---|---|---|
| Story Skills | `danjdewhurst/story-skills` | pinned Git commit copied into `.agents/skills/` by bootstrap | do not patch vendored skill content in place |
| Fiction craft skills | `jwynia/agent-skills` | selected skill folders copied from a pinned Git commit | do not patch in place; change selection or pin deliberately |
| Better Writing | `forjd/better-writing` | optional pinned Git checkout copied into `.agents/skills/better-writing` | optional; do not patch in place |
| Antigravity / Gemini | Google product | external runtime; no code vendored here | configure via workspace files only |
| Obsidian | Obsidian product | opens the same repository as a vault | optional UI, never source of truth |
| Git | Git | repository history | canonical history mechanism |
| Pandoc / LibreOffice / Calibre / Zotero / Ollama / KoboldCpp | respective upstream projects | optional external tools | installed separately when needed |

Exact Git pins live in [`config/upstreams.json`](../config/upstreams.json).

## What Novel OS adds

Novel OS owns only the integration layer:

- `.agents/rules/` — author/canon/context/review policies
- `scripts/` — reproducible bootstrap and CLI wrappers
- `prompts/` — role contracts for Antigravity subagents
- `author/` — creative constitution, style, boundaries, decisions
- `templates/` — operational templates and genre overlays
- `Home.md` — Obsidian projection/dashboard
- `.github/workflows/` — smoke, continuity, and stress checks
- `docs/` — operating documentation

This glue code is intentionally small. It does not replace Story Skills continuity logic, create a custom database, create a custom RAG layer, or create another agent framework.

## License caution

Story Skills and Better Writing advertise MIT licensing in their source repositories. The selected `jwynia/agent-skills` skill files commonly declare `license: MIT` in their own frontmatter, but the pinned repository commit does not expose a root `LICENSE` file. Treat licensing at the selected-skill level and re-check upstream before redistributing a packaged copy outside your own workspace.

## Updating upstreams

1. Run `npm run upstreams:check`.
2. Review upstream changes, especially schema or skill behavior.
3. Update the SHA in `config/upstreams.json` deliberately.
4. Run `npm run bootstrap -- --clean`.
5. Run `npm run tooling:check` and `npm run stress:test`.
6. If a story is initialized, run `npm run story:check` before continuing work.

Never auto-follow `main` during active drafting. Reproducibility is more valuable than silent upgrades.
