---
layout: default
section: Spec Validation
---

# Specs Enable Automated Validation

## The Validation Loop

```
Spec
  ↓  Define acceptance criteria and expected behaviors
Implementation
  ↓  Build against the spec. Each task has defined scope.
Test against spec
  ↓  Generate tests from spec criteria:
     "Write tests that validate these acceptance criteria"
Iterate
  ↓  Failing test = spec deviation.
     Fix implementation, not the test.
```

<div class="mt-4 text-sm opacity-70">

The spec-driven loop is the TDD loop (Module 103), elevated to the feature level:
Module 103 validates functions. Module 302 validates features.
Both enforce the same discipline - define expected behavior before implementing it.

</div>

<!--
This slide makes the connection between 302 and 103 explicit.

Key insight: SDD is not a different process. It's the same validation discipline applied at a higher level of abstraction.

The spec is the feature-level equivalent of the test. Copilot generates both.
-->
