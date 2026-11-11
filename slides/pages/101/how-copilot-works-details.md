---
layout: default
section: How It Works
---

# What Copilot Does With Your Request

<div class="text-sm">

| Step | What happens | Time |
|------|-------------|------|
| **Context** | VS Code gathers code, files, history, instructions | Instant |
| **Pre-filters** | Blocks toxic or injection content | < 50ms |
| **LLM** | Generates a response, then **deletes your prompt** | ~200–2000ms |
| **Post-filters** | Security scan, quality check, public code matching | < 100ms |
| **You** | Accept, edit, or reject | ∞ |

</div>

<div class="mt-4">

### Key guarantees

- Your code is **never used to train** the model
- Safety filters run **before and after** the model
- **You** always have the final say

</div>

<!--
This is the companion to the diagram slide.
Separating them keeps both readable on screen.

The timing column helps set realistic expectations about latency.
The guarantees reinforce the trust/privacy message covered later.
-->
