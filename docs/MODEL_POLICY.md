# Model / Thinking Policy

Novel OS does not depend on a specific model, but the default operational assumption is Antigravity with a fast Gemini model as the primary Agent.

## Recommended effort by task

| Task | Reasoning / effort | Why |
|---|---|---|
| Metadata / YAML / reindex interpretation | Low | Deterministic and bounded |
| Session startup / summarization | Low–Medium | Mostly state synthesis |
| Scene/chapter planning | Medium–High | Causality and constraints matter |
| Mystery logic / timeline diagnosis | High | Long-range dependency reasoning |
| Drafting prose | Medium | Avoid over-reasoning every sentence |
| Dialogue pass | Medium | Character voice + subtext |
| Independent review | High | Needs adversarial diagnosis |
| Targeted revision | Medium | Execute an accepted intervention |
| Canon diff | High | Must distinguish durable facts from prose realization |
| Canon write | Medium | Apply only approved structured changes |

## Model routing principle

Use the strongest reasoning only where mistakes are expensive. Do not spend high reasoning on YAML edits or bulk summarization.

## Context principle

A large context window is capacity, not a target. Prefer minimum sufficient context and expand only when a concrete dependency requires more evidence.

## Fallback/local models

Ollama/KoboldCpp may be used for experiments, metadata extraction, or alternative prose candidates. Their output never bypasses the same plan/review/canon gates.
