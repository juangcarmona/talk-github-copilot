---
layout: comparison
section: Efficiency
beforeTitle: Suboptimal
afterTitle: Optimized
---

# Same Subscription. Very Different Outcomes.

::before::

- Use reasoning models for routine boilerplate
- Accept suggestions without understanding them
- Default to premium models for everything
- Launch Agent with no architecture or constraints
- Run code review on every trivial PR
- Retry without refining the prompt

::after::

- Use lightweight models for quick edits and boilerplate
- Be specific: describe inputs, outputs, and expected patterns
- Match model tier to task complexity
- Feed Agent real architecture, then let it execute
- Always validate output before committing
- Review selectively: large PRs, unfamiliar code, security

<!--
This slide contrasts two ways of using the same subscription.
The difference in credit consumption can be 5–10x.

The point is not judgment - it’s awareness.
Once you see the pattern, you can optimize.

Check current model pricing:
https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing
-->