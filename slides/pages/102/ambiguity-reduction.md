---
layout: two-cols-header
section: Techniques
---

# Ambiguity Reduction

### Ambiguous prompts force Copilot to guess

::left::

```text
"Add a test"
```

```text
"Add a unit test for calculateDiscount().
Verify it returns null when the cart is empty."
```

One target. One behavior.

::right::

## The Ambiguity Test

Before sending a prompt, ask:

> "Could two senior engineers interpret this differently?"

If yes:

* name the target
* describe the behavior
* add the constraint

<!--
The Ambiguity Test is the unique takeaway from this slide.

This complements the Specificity Checklist from the previous slide.
Specificity is about adding detail. Ambiguity reduction is about removing
alternative interpretations.

Example to share:
- "Add a test" -> unit or integration? which function? which edge case?
- "Add a unit test for calculateDiscount(). Verify it returns null when cart is empty."
  -> one target, one behavior.

The insight: ambiguity creates branching interpretations. The model picks one.
Not always the one you wanted.

Transition: "Now let's look at how examples can guide the model even further."
-->