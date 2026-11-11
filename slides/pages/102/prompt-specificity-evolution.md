---
layout: two-cols-header
section: Techniques
---

# Prompt Specificity

### Better prompts remove decisions from the model

::left::

## Vague

```text
"Add validation"
```

Copilot must guess:

* Which field?
* Which rules?
* Which response?

## Specific

```text
"Add email validation to registerUser().
Reject emails without @ or domain.
Return:
{ valid: false, error: 'Invalid email' }"
```

Clear target. Clear behavior. Clear output.

::right::

## Specificity Checklist

Before sending a prompt:

* What file/function am I targeting?
* What are the inputs and outputs?
* What happens on error?
* What patterns should I follow or avoid?
* What should the final behavior look like?

<!--
This is the anchor slide for specificity. The cornerstones recap (101) introduced
the concept; this slide operationalizes it with a concrete before/after.

The insight to share verbally: "Every missing detail becomes a model decision."
That's the single sentence that makes specificity click.

The checklist is a reference the audience can take away and use daily.

Walk through the vague→specific transformation:
- "Add validation" → which field? which rules? which response?
- The specific version names the target, describes the behavior, specifies the output.

Transition: "Specificity removes decisions from the model. But what about the
ambiguity already present in your prompts?"
-->


