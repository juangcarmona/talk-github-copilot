---
layout: default
section: Spec Validation
---

# From Spec to Tests

Spec criteria become test cases directly:

```markdown
# Spec: User registration
Acceptance criteria:
- Email must be validated on submission
- Password must be at least 12 characters
- Duplicate emails must return a 409 response
- Successful registration sends a confirmation email
```

Generate tests from the spec:

```
/tests Generate tests for the user registration
endpoint that validate all acceptance criteria
in #file:docs/specs/user-registration.spec.md
```

<div class="mt-4 text-sm opacity-70">

Each acceptance criterion maps 1:1 to a test case. The spec is the authority - tests enforce it.

</div>

<!--
This is the practical "how" of spec-driven validation.

The workflow:
1. Write spec with acceptance criteria
2. Use Copilot to generate tests FROM the spec
3. Run tests - failures indicate spec deviation
4. Fix implementation to match the spec (not the other way around)

The spec stays authoritative. Tests are the enforcement mechanism.
-->
