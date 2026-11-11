---
layout: default
section: Maturity Model
---

# AI SDLC Maturity Model

<div class="grid grid-cols-5 gap-3 mt-6 text-xs">

<div class="rounded-xl border border-gray-300 p-3 bg-gray-50">
<div class="font-bold text-sm mb-1">1 · No AI</div>
<p>Manual SDLC.</p>
<p class="mt-2 text-red-600 font-semibold">Gap widens.</p>
</div>

<div class="rounded-xl border border-orange-300 p-3 bg-orange-50">
<div class="font-bold text-sm mb-1">2 · Exploratory</div>
<p>Ad hoc usage. Quality depends on individuals.</p>
<p class="mt-2 text-red-600 font-semibold">Shadow AI. No repeatability.</p>
</div>

<div class="rounded-xl border border-yellow-300 p-3 bg-yellow-50">
<div class="font-bold text-sm mb-1">3 · Structured</div>
<p>Instructions, agents, shared patterns.</p>
<p class="mt-2 text-red-600 font-semibold">Works for adopters, not the org.</p>
</div>

<div class="rounded-xl border border-blue-300 p-3 bg-blue-50">
<div class="font-bold text-sm mb-1">4 · Scaled</div>
<p>Baselines, visibility, cross-team standards.</p>
<p class="mt-2 text-red-600 font-semibold">Enforcement gaps.</p>
</div>

<div class="rounded-xl border border-purple-300 p-3 bg-purple-50">
<div class="font-bold text-sm mb-1">5 · Governed</div>
<p>Policy, quality gates, continuous improvement.</p>
<p class="mt-2 text-red-600 font-semibold">Complacency risk.</p>
</div>

</div>

<div class="mt-6">

```mermaid
graph LR
    A["1 No AI"] --> B["2 Exploratory"] --> C["3 Structured"] --> D["4 Scaled"] --> E["5 Governed"]
    style A fill:#f3f4f6,stroke:#2563EB,color:#1E3A8A
    style B fill:#ffedd5,stroke:#FB923C,color:#9A3412
    style C fill:#fef9c3,stroke:#FACC15,color:#78350F
    style D fill:#dbeafe,stroke:#3B82F6,color:#1E40AF
    style E fill:#ede9fe,stroke:#8B5CF6,color:#4C1D95
```

</div>

<div class="mt-3 p-3 rounded-lg bg-blue-50 border border-blue-200 text-sm text-center">

💬 **Where are we on this scale? Where are our different teams?**

</div>

<!--
This is not "how much AI you use." It's how safely and effectively AI is embedded in your SDLC.

Most organizations have teams at different levels simultaneously. That's expected.
The goal: raise the organizational floor, not mandate uniformity.

Key insight: maturity is operational discipline, not tool adoption volume.

Level 2→3 is where the workshop content from modules 201–203 lives.
Level 3→4 is where 301–302 content applies.
Level 4→5 is what this module addresses.

Ask attendees to place their teams on this scale. Expect variation.
-->
