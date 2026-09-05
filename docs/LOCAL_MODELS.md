# Local Model Policy

Gemini/Antigravity remains the default Agent runtime. Local models are optional workers, not alternate story authorities.

## Ollama

Good candidate for:

- private/offline bounded tasks
- metadata extraction
- summarization
- alternative critique
- batch experiments
- fallback when hosted-model quota is inconvenient

## KoboldCpp

Treat as a fiction-generation laboratory when testing GGUF prose models or comparing narrative voice candidates.

## Non-negotiable rule

Local model output follows the same lifecycle:

`candidate -> review -> canon diff -> author approval -> canonical update`

No local model may write continuity state directly merely because it runs on the same machine.

## Comparison experiments

When comparing Gemini and a local fiction model, provide both with the same approved scene specification and canonical context packet. Compare prose/craft results; do not let each model invent a different plot and then mistake model variation for a fair quality comparison.
