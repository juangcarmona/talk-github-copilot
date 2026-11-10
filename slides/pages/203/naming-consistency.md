---
layout: comparison
section: Naming Consistency
beforeTitle: Inconsistent Naming
afterTitle: Consistent Naming
---

::before::

```
src/
├── OrderMgr.ts
├── payment_handler.js
├── ticketUtils.ts
├── ArtistSvc.ts
├── venueHelpers.js
└── check-in-controller.ts
```

```typescript
// What does Copilot learn from this?
class OrderMgr { }
function handlePayment() { }
const ticketUtils = { }
class ArtistSvc { }
```

Copilot sees: no naming pattern.
Next suggestion: could be anything.

::after::

```
src/
├── order.service.ts
├── payment.service.ts
├── ticket.service.ts
├── artist.service.ts
├── venue.service.ts
└── checkin.controller.ts
```

```typescript
// What does Copilot learn from this?
class OrderService { }
class PaymentService { }
class TicketService { }
class ArtistService { }
```

- Copilot sees: **{domain}.service.ts** pattern.
- Next suggestion: follows the same convention automatically.
 - Copilot sees: **{domain}.service.ts** pattern.
 - Next suggestion: follows the same convention automatically.
