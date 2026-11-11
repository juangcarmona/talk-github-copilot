---
layout: default
section: Spec Validation
---

# From Spec to Tests - Implementation Traceability

<img src="/302/tdd-implementation-diagram.png" class="mx-auto rounded shadow-lg" style="max-height: 380px;" />

<div class="mt-6 text-sm opacity-70">

Every acceptance criterion becomes a test. Every test validates a spec requirement. Failing tests mean spec deviation - fix the implementation, not the test.

</div>

<!--
The traceability chain:
  Spec requirement → Acceptance criterion → Test case → Implementation

This is Module 103's TDD discipline applied at the feature level:
- Module 103: function-level tests validate function behavior
- Module 302: spec-level tests validate feature behavior

With Copilot, the workflow becomes:
1. Write spec with acceptance criteria
2. Generate tests FROM the spec criteria
3. Implement until tests pass
4. If behavior differs from spec → implementation bug
5. If spec no longer matches reality → spec update (deliberate, reviewed)

The spec is the authority. Tests enforce the spec. Implementation satisfies the tests.
-->
