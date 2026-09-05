# Getting Started

## 1. Clone

```bash
git clone https://github.com/anhdaijka/novel-os.git
cd novel-os
```

## 2. Install agent skills

```bash
npm run bootstrap
```

Optional prose skill:

```bash
npm run bootstrap -- --with-better-writing
```

The bootstrap uses exact commits from `config/upstreams.json` and copies skills to `.agents/skills/`.

## 3. Initialize the story schema

Example:

```bash
npm run init-story -- "The Tide Room" \
  --genre mystery \
  --sub-genre coastal \
  --setting-era near-future \
  --pov third-person-limited \
  --tense past \
  --theme truth \
  --theme memory \
  --synopsis "A diver finds a sealed room under a storm-damaged harbor."
```

`init-story` runs the pinned Story Skills CLI in a temporary directory and merges its generated canonical paths into this repo root. This deliberately avoids maintaining a second copy of the Story Skills schema in Novel OS.

## 4. Fill the author layer

Complete, at minimum:

- `author/creative-constitution.md`
- `author/style-bible.md`
- `author/boundaries.md`

Record important decisions in `author/decisions.md`.

## 5. Validate

```bash
npm run story:check
npm run story:doctor
npm run story:report
```

## 6. Open the same folder in Obsidian

Use the repository root as the vault. Recommended plugins are documented in `docs/OBSIDIAN.md`.

## 7. Start Antigravity

Open the repository root as the workspace. Ask the agent to read `AGENTS.md`, `GEMINI.md`, and relevant rules before acting.

Recommended first prompt:

```text
Act as Narrative Director. Read the repository contract and current story state. Run deterministic story checks. Do not draft prose. Tell me what is incomplete before we can safely outline the first chapter.
```

## 8. Keep skills updated intentionally

```bash
npm run upstreams:check
```

Do not casually update dependencies during an active revision. Pin changes, reinstall with `npm run bootstrap -- --clean`, then rerun all story checks.
