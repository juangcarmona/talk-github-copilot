---
layout: default
section: Techniques
---

# Divide and Conquer

### One prompt, one responsibility

<div class="grid grid-cols-2 gap-8">
<div class="leading-snug">

**Why It Works**

- Iterative validation at each step
- Reduces hallucination surface area

</div>
<div class="leading-snug">

**The Pattern**

1. **Audit** — understand what exists
2. **Design** — define the target before coding
3. **Implement** — build one focused module
4. **Migrate** — update consumers one at a time
5. **Verify** — check for remaining references

</div>
</div>

<!--
This replaces both prompt-decomposition and divide-and-conquer-2 as the single
slide on staged prompting.

The pattern: Audit → Design → Implement → Migrate → Verify.
Each step produces a verifiable artifact before you move to the next.

Why it works:
- Fits within context limits (each step is small)
- Allows iterative validation at each step
- Reduces hallucination surface area
- Each step can be verified before the next begins

Rule of thumb: one prompt, one responsibility.

This is proto-orchestration — sequential prompting with validation gates.
Not agents, not Spec Kit — just disciplined human-in-the-loop workflow.
Modules 202 and 302 extend this into true orchestration.

Applied example (use if time permits):
Pricing consolidation migration:
1. Audit: list all pricing calculations
2. Design: define priceService.js signature (don't implement)
3. Implement: write calculatePrice()
4. Migrate: update BookingForm.jsx to import from priceService.js
5. Verify: search for remaining imports of old modules

The audit step is critical: Copilot cannot reliably audit a codebase in one pass
if it contains competing implementations. Do the audit first, validate it, then proceed.

Transition: "Different tasks need different prompt structures. Let's look at prompting styles."
-->