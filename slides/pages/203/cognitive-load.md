---
layout: two-cols-header
section: Cognitive Load
---

## Repository Cognitive Load

::left::

## Why it matters for AI

Cognitive load is the gap between where information lives and where it is needed. High load increases noisy context and reduces retrieval precision.

**High cognitive load traits:**
- Deep nesting and mixed responsibilities
- Giant files with multiple concepts
- Inconsistent naming and implicit conventions

::right::

## Reduce load with simple rules

- **One concept per file** — focused, embeddable units
- **Shallow structures** — fewer than ~3 hops to find code
- **Explicit naming** — file names surface intent
- **Predictable patterns & entry points** — `README.md`, `ARCHITECTURE.md`

## Practical 80/20

1. Rename `utils.ts` → domain-specific files
2. Split files >200 lines into focused modules
3. Add README per module and `ARCHITECTURE.md`

AI-friendly design is engineering clarity: small focused files, consistent names, and obvious entry points.
