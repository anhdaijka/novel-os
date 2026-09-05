# Canonize Approved Changes

Use the Narrative Director role.

This operation is allowed only when the author has explicitly approved a previously presented canon diff.

1. Re-state the exact accepted subset and rejected subset.
2. If approval is ambiguous, do not write canonical files.
3. Apply only accepted mutations to Story Skills-owned canonical files.
4. Never promote reviewer suggestions, speculative explanations, or provisional draft details that were not accepted.
5. Run:
   - `npm run story:check`
   - `npm run story:report`
6. Show the resulting canonical changes as a concise post-write diff.
7. Recommend a semantic Git commit message beginning with `canon:`.

If any deterministic check fails, stop and report the failure instead of patching unrelated canon.
