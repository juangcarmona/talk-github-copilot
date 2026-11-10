---
layout: default
section: Plan Agent
---

# Ambiguity Reduction - The Agent Asks Before Building

<img src="/302/plan-agent-question.png" class="mx-auto rounded shadow-lg" style="max-height: 420px;" />

<div class="mt-4 text-center text-sm opacity-70">

Before planning, the agent identifies gaps in your requirements and asks targeted questions. Every answered question eliminates an assumption from the implementation.

</div>

<!--
This is the alignment phase of the Plan agent.

Why this matters:
- Unanswered questions become silent assumptions in generated code
- The agent surfaces ambiguities you didn't notice in your own requirements
- Each clarification narrows the solution space - fewer valid implementations means more predictable output

Compare with unplanned prompting:
- "Build a user auth system" → agent picks OAuth provider, session strategy, token format, error handling
- Plan agent first asks: "Which OAuth providers? Session or stateless? Access + refresh tokens?"

The result: implementation matches intent because intent was made explicit.
-->
