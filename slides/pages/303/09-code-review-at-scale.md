---
layout: default
section: Code Review
---

# AI Code Review at Scale

<div class="grid grid-cols-2 gap-6 mt-4">
<div>

```mermaid
graph TD
    A[AI generates more code] --> B[PR volume increases]
    B --> C{Capacity?}
    C -->|Same| D[Review depth drops]
    C -->|Adapted| E[Quality maintained]
    D --> F[Silent quality degradation]
    E --> G[Sustainable delivery]
    
    style D fill:#fee2e2,stroke:#ef4444,color:#b91c1c
    style E fill:#d1fae5,stroke:#10b981,color:#047
    style F fill:#fee2e2,stroke:#ef4444,color:#b91c1c
    style E fill:#d1fae5,stroke:#10b981,color:#047
    style G fill:#d1fae5,stroke:#10b981,color:#047
```

</div>
<div>

**AI handles:**
- Mechanical checks (style, formatting)
- Missing tests or docs detection
- Pattern violation flagging

**Humans retain ownership of:**
- Logic and algorithmic correctness
- Architectural fit
- Business correctness
- Production risk assessment

**Warning signals:**
- PRs approved without comments ↑
- Review time drops faster than PR size ↓
- Bug escape rate to production ↑

</div>
</div>

<div class="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200 text-sm text-center">

💬 **Has AI-assisted development changed your team's review patterns? How?**

</div>

<!--
AI code review changes the bottleneck, not just the speed.

When AI generates more code, PR volume increases.
If reviewer capacity stays the same and review time drops,
that's not efficiency — it's a risk indicator.

The approval criteria for AI-generated code must be explicit:
- What constitutes a meaningful review?
- When is human judgment required vs optional?
- What review depth is expected for AI-generated vs human-written code?

AI review should reduce noise, not replace judgment.

Metrics to watch:
- Substantive comment rate per PR
- Rework volume after review
- Bug escape rate trends
-->
