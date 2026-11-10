---
layout: two-cols-header
section: Instruction Hierarchy
---

# When Instructions Conflict

### Contradictory rules produce inconsistent AI behavior

::left::

## Root Instructions

```markdown
Use Result<T> for error handling.
Never throw exceptions for flow control.
```

## Scoped Instructions

```yaml
applyTo: "src/legacy/**"
```

```markdown
Use try/catch everywhere.
Throw on validation failure.
```

<div class="mt-3 text-red-500 font-bold">
⚠ Direct contradiction
</div>

::right::

## What Happens

Copilot receives both rules.

Possible outcomes:

* mixes both patterns
* alternates between styles
* ignores one instruction

## The Rule

> Scoped instructions should specialize the root, not fight it.

**Good:** test-specific assertion style

**Bad:** overriding repository-wide error handling


