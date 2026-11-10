---
layout: default
section: Orchestration
---

# Scenario: Issue → Implementation → PR

```
GitHub MCP         → Read issue #142
                      "Add rate limiting to /api/orders"

Copilot Agent      → Analyze existing middleware patterns
                      Implement rate limiting middleware
                      Apply to the route

Playwright MCP     → Run integration tests
                      Verify rate limiting behavior

GitHub MCP         → Open PR with implementation
                      Link to issue #142
```

End-to-end: from GitHub issue to reviewed PR, with tests.

<div class="mt-3 text-sm opacity-70">The pattern: each server handles one capability. Copilot orchestrates the sequence.</div>

<!--
These are real scenarios, not theoretical ones.
Show the flow explicitly - input source → agent work → verification → output.

Each scenario has a clear trigger, a clear output, and a clear validation step.
This is the agentic shift in practice: not "Copilot writes code", but "Copilot drives a workflow".
-->
