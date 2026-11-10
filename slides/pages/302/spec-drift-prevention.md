---
layout: default
section: Spec Validation
---

# Preventing Spec Drift - The Refinement Loop

## The Loop

```
Spec
  ↓ implement
Code
  ↓ validate
Δ (delta between spec and implementation)
  ↓ decide
Update spec   OR   Fix implementation
  ↓
Repeat
```

## Practices That Prevent Drift

1. **Treat specs as living documents** - update them when requirements change
2. **Validate after each task** - don't wait until the end
3. **Use specs as test anchors** - if the spec says X, a test asserts X
4. **Re-run `/speckit.clarify`** - surface new gaps after partial implementation

<div class="mt-3 text-sm opacity-70">

The spec is not a one-time artifact. It's the evolving contract between intent and output.

</div>

<!--
Preventing drift requires ongoing discipline:

- Version the spec alongside the code
- Review spec changes with the same rigor as code changes
- After each implementation task, check: does the output still match the spec?
- If not: decide deliberately whether to update the spec or fix the code

The refinement loop is continuous. It doesn't end when "v1 ships."
-->
