---
layout: default
section: Plan Agent
---

# Plan-to-Implementation Handoff

<img src="/302/plan-agent-start-implementation-cli.png" class="mx-auto rounded shadow-lg" style="max-height: 420px;" />

<div class="mt-4 text-center text-sm opacity-70">

Once the plan is approved, hand it off to the coding agent or Copilot CLI for task-by-task execution. Each task traces back to a plan step.

</div>

<!--
The handoff is where planning connects to implementation:

Options after plan approval:
1. Continue in the same session - the agent implements step by step
2. Open in Copilot CLI - run implementation in the background
3. Save to memory - review later, implement in a new session

Implementation traceability:
- Every code change maps to a plan step
- Every plan step maps to a requirement
- If output doesn't match the plan → fix the implementation
- If the plan doesn't match requirements → fix the plan first

This is the same discipline as TDD elevated to the feature level:
- TDD: test defines correctness → implementation satisfies the test
- SDD: plan defines correctness → implementation satisfies the plan
-->
