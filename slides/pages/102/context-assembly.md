---
layout: list
section: Context
---

# What Copilot Actually Sees

Every response is generated from what fits in the **context window**:

- `System instructions` Built-in behavior rules
- `Custom instructions` Repository and project-level guidance
- `User message` The current prompt you're sending
- `Conversation history` Earlier messages in this session
- `Implicit context` Active file, selection, visible errors, git state
- `Explicit references` Files, symbols, and URLs you attach with #-mentions
- `Tool outputs` Results from searches, terminal, and file reads

<!--
This is the "mental model" slide. Every attendee should leave with this picture.

Key insight: everything outside the context window is invisible to the model.
Copilot has zero memory between sessions and no access to files it hasn't been given.

Custom instructions = repository-level guidance files that are always loaded.
Covered in more depth in Modules 201 and 203 — for now, just know they exist
as a context layer.

Referencing a specific file with #file always beats hoping the model "knows" about it.

The three-step context engineering workflow (curate → plan → implement) is a more
advanced pattern covered in Modules 202 and 302. The core lesson here:
most prompt failures are context failures.

Demo idea: show the same prompt producing different output with and without an
explicit #file attachment. The difference is always the context.

Transition: "Now that you know what Copilot sees, let's talk about how to control it."
-->
