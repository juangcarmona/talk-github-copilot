---
layout: two-cols-header
section: Context Locality
---

# Context Locality

::left::

## The Principle
Place types, tests, and docs next to the code they describe.

Good:
```
src/orders/
├── order.types.ts
├── order.service.ts
├── order.service.test.ts
└── order.README.md
```

Keep locality simple: co-located types, co-located tests, co-located docs.
