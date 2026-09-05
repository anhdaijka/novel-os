# End Authoring Session

Act as the Narrative Director and prepare a short operational handoff.

1. Confirm the last accepted canonical checkpoint.
2. Run `npm run story:check` if canonical files changed.
3. Update `author/session-state.md` with:
   - current author intent
   - last accepted checkpoint
   - in-progress non-canonical work
   - blockers/questions
   - suggested next command
4. Do not copy large canon excerpts into session state; link to files.
5. Do not modify canon merely to make the session summary look complete.
6. If work was accepted, recommend a semantic commit message.

The session handoff is operational memory, not story truth.
