# Agent Role Prompts

These are reusable role contracts for Antigravity sessions/subagents. They are not a second rules system: `.agents/rules/` remains authoritative.

Use the smallest role that matches the task:

- [`director.md`](roles/director.md) — orchestrate, inspect state, merge feedback
- [`planner.md`](roles/planner.md) — plan arcs/chapters/scenes without drafting prose
- [`writer.md`](roles/writer.md) — execute an approved scene plan
- [`reviewer.md`](roles/reviewer.md) — diagnose without immediately rewriting
- [`researcher.md`](roles/researcher.md) — gather evidence without canonizing it

Recommended pattern:

`Director -> Planner -> Author approval -> Writer -> Reviewer(s) -> Director synthesis -> Author approval -> Revision -> Canon diff -> Author approval`

Do not let parallel subagents write canonical state concurrently.
