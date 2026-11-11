---
layout: comparison
section: Context Quality Matters
beforeTitle: Low Context
afterTitle: High Context
---

::before::

```javascript
// bad.js
function p(d) {
  var r = [];
  for (var i = 0; i < d.length; i++) {
    if (d[i].a > 0) r.push(d[i]);
  }
  return r;
}
// No tests. No types. No docs.
// Missing: test-expectations.js
```

Copilot sees: unclear intent, no types, no patterns.
Suggestions: generic, potentially wrong.

**Documentation gap:** `// TODO: what does 'a' mean?`

**Missing tests:** Copilot generates based on the function name, not expected behavior.

::after::

```typescript
// orders/orderFilter.ts
interface Order {
  id: string;
  amount: number; // positive = chargeable
  status: 'pending' | 'paid' | 'refunded';
}

/** Returns orders eligible for processing (amount > 0) */
function filterChargeableOrders(orders: Order[]): Order[] {
  return orders.filter(order => order.amount > 0);
}
```
```typescript
// orders/orderFilter.test.ts  ← co-located
it('excludes zero-amount orders', () => { ... });
it('excludes negative amounts (refunds)', () => { ... });
```

Copilot sees: typed contract, named intent, test examples.
Suggestions: match the established quality.

<!--
The contrast now shows four quality dimensions:
1. Types (interface vs var)
2. Naming (filterChargeableOrders vs p)
3. Documentation (JSDoc vs nothing)
4. Co-located tests (examples of expected behavior)

Each dimension is independent, each compounds.
A codebase that improves all four sees dramatically better AI output.
-->