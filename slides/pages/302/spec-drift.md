---
layout: default
section: Spec Validation
---

# Spec Drift

<div class="leading-snug">

## What is Spec Drift?

Spec drift occurs when implementation gradually diverges from the original specification - through accumulated small decisions, undocumented trade-offs, or scope adjustments that never update the spec.

**Symptoms:**
- Tests pass but behavior doesn't match the spec
- New features conflict with documented requirements
- Onboarding developers get contradictory information
- Reviews can't assess "correctness" - no source of truth

## Why Agents Amplify Drift

Agents don't remember previous sessions. Each invocation starts fresh. Without a current spec, the agent uses stale context - building on yesterday's assumptions with today's code.

</div>

<!--
Spec drift is the SDD equivalent of technical debt.
It happens silently and compounds over time.

In agentic workflows, drift is more dangerous because:
- Agents trust whatever context they find
- Stale specs become wrong instructions
- The agent implements confidently against outdated requirements

The fix: treat the spec as code - version it, review changes to it, test against it.
-->
