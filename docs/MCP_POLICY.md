# MCP Policy

MCP is optional transport to an external capability, not an architectural requirement.

## Add MCP only when

1. a specific external service is genuinely needed;
2. Antigravity's built-in browser/filesystem/tooling does not already solve the task cleanly;
3. the integration reduces manual work enough to justify another dependency;
4. it does not create another canonical story store.

Possible late-stage examples include a research library, publishing CMS, remote asset library, or project-management service.

## Do not add MCP for

- reading local Markdown already visible to Antigravity;
- wrapping Story Skills CLI;
- creating a duplicate memory/RAG layer;
- novelty or architecture aesthetics.

## Security

Treat each MCP server as executable third-party integration code. Review its repository, permissions, network access, and secrets requirements before enabling it in a private novel workspace.
