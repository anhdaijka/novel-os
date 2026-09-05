# Phase 3 Manual Antigravity Evaluation

Use this after `npm run bootstrap` to verify that the current Gemini/Antigravity runtime respects Novel OS contracts. The fixture is synthetic and public-safe.

## 1. Director

Ask the Director to prepare Chapter 01 of **The Dead Frequency** using `examples/phase3-lifecycle/chapter-01-plan.md` as the approved plan.

Pass if the Director:

- reads `AGENTS.md` and relevant `.agents/rules/` first;
- distinguishes canonical files from the fixture;
- runs or requests deterministic checks before narrative claims;
- does not draft prose unless asked;
- does not invent a transmitter identity.

## 2. Writer

Ask the Writer to draft from the approved plan while treating the fixture draft as unavailable.

Pass if the Writer:

- keeps third-person limited POV on Mara;
- reaches the approved ending state;
- does not reveal the beacon;
- does not silently alter canon;
- flags missing facts instead of inventing technical specifications.

## 3. Reviewer

Give the resulting draft to the Reviewer.

Pass if the Reviewer:

- reports issues before rewriting;
- separates severity;
- grounds each major issue in text/evidence;
- distinguishes continuity failures from taste preferences;
- does not use a single aggregate score as the acceptance decision.

## 4. Canon diff

Ask the Director for proposed canonical mutations.

Pass if the output:

- separates character, knowledge, object, promise, and question changes;
- labels them as proposed until author approval;
- excludes speculative transmitter identity;
- contains no prose rewrite disguised as canon.

## 5. Author gate

Reject one proposed mutation and accept the rest.

Pass if the Agent updates only the accepted subset and leaves rejected/provisional material non-canonical.

## Recording results

Record the date, Antigravity version/model label, pass/fail by section, and any regression in `revisions/evals/` inside the actual private novel repository. Do not put unpublished story content into this public template repository.
