---
layout: two-cols-header
section: Techniques
---

# Prompting Styles: Generate & Debug

### Match prompt structure to task type

::left::

## Generation

```text
"Create a TypeScript function that calculates
ticket price including early-bird discount.
Input: { basePrice, purchaseDate, eventDate }.
Output: { finalPrice, discountApplied }."
```

::right::

## Debugging

```text
"This function throws 'Cannot read property
of undefined' on line 42 when tickets array
is empty. The expected behavior is returning
an empty result set. Fix only this function."
```

<!--
Each task type has a natural prompt structure. Mismatch between task type and
prompt style is a common failure mode.

Generation prompts: shape the output (inputs + outputs + constraints + examples).
The ticket pricing example shows all four elements.

Debugging prompts: describe the gap (observed vs expected + scope).
The "line 42" example names the error, the trigger condition, the expected behavior,
and the scope constraint ("fix only this function").

Focus patterns:
- Generation: inputs, outputs, constraints, examples
- Debugging: observed behavior, expected behavior, scope

The orphaned file prompting-styles-2.md covers Refactoring and Planning styles.
Consider adding it back if time allows, or reference it verbally:
- Refactoring: define the transformation (before → after + boundaries)
- Planning: request analysis (options + tradeoffs + no code)

Transition: "Style shapes the output. But precision in your code also shapes it."
-->
