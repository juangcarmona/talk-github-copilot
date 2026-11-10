---
layout: two-cols-header
section: Orchestration
---

# More Orchestration Scenarios

::left::

## API Spec → Client → Tests

```
Postman MCP        → Fetch /payments API spec

Copilot Agent      → Generate TypeScript client
                      Match existing patterns
                      Add error handling

Playwright MCP     → Run end-to-end payment flow
                      Validate against live API

GitHub MCP         → Open PR
```

::right::

## Design → Frontend Component

```
Figma MCP          → Read Button component spec
                      Extract design tokens

Copilot Agent      → Generate React component
                      Apply token variables
                      Match component patterns

Playwright MCP     → Screenshot for visual review
```

<div class="mt-4 text-sm opacity-70">Same pattern: source → agent work → verification → delivery.</div>

<!--
These complement the issue-to-PR scenario.
The API spec scenario is common in backend teams.
The design-to-component scenario is common in frontend teams.
Both follow the same orchestration pattern: input → work → validate → deliver.
-->
