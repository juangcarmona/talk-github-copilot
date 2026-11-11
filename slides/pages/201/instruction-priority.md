---
layout: center
section: Instruction Hierarchy
---

# Instruction Priority

```mermaid
graph LR
    U["🧑 Personal Instructions<br/>(user-level, highest priority)"]
    R["📁 Repository Instructions<br/>(.github/copilot-instructions.md, AGENTS.md)"]
    O["🏢 Organization Instructions<br/>(GitHub org-level, lowest priority)"]

    U --> R --> O

    style U fill:#4f46e5,color:#fff
    style R fill:#7c3aed,color:#fff
    style O fill:#a78bfa,color:#fff
```

<div class="mt-6 text-center">

Higher priority wins on conflict. All layers compose when they don't conflict.

</div>

<div class="mt-4 grid grid-cols-3 gap-4 text-sm">
<div class="border rounded p-3">

**Personal** - developer preferences, editor behavior, personal style

</div>
<div class="border rounded p-3">

**Repository** - team standards, architecture rules, conventions

</div>
<div class="border rounded p-3">

**Organization** - security policies, compliance, shared libraries

</div>
</div>

<!--
Three layers, explicit precedence.

Most teams focus on Repository-level instructions - that's where engineering standards live.

Organization-level instructions are useful for security policies that apply everywhere
("never log PII", "always parameterize SQL").

Personal instructions are for individual workflow preferences ("I prefer verbose comments")
and should never contradict repository or org instructions.

The key rule: layers ADD to each other when compatible.
Higher priority OVERRIDES lower when there's a direct conflict.
-->
