---
layout: two-cols-header
section: Testing
---

# Fake Green Tests

::left::

## Three patterns to catch

**1. Assertion-free** - runs but proves nothing:
```csharp
// ❌
var result = service.Process(input);
Assert.NotNull(result);
```

**2. Time-dependent** - passes now, fails at midnight:
```csharp
// ❌
Assert.Equal(DateTime.Today, result.CreatedDate);
```

**3. Order-dependent** - fails when run in suite:
```csharp
// ❌ Shared mutable state
static List<Order> _orders = new();
```

::right::

## The mutation check

> If I flip the implementation logic, does this test fail?

```csharp
// Change: return price * 0.9m;
// To:     return price * 1.1m;
// Test still passes? → Worthless.
```

Every generated test needs this check before you trust it.

<div class="mt-6 text-sm opacity-70"><b>A test that can't fail is mere decoration.</b> Noise.</div>

<!--
Merged from flaky-tests.md and spot-fake-green.md.

Three failure patterns in the left, the mutation heuristic in the right.
Both fit on one slide because the content is compact and directly related.

The mutation check is the single most transferable heuristic:
break the code, see if the test breaks. If not, the test is wrong.

Talking point: "The mutation check is the one heuristic to take home. If you forget
everything else, remember: break the code, see if the test breaks."

Exercise 2 (Fix the Flaky Test): the lab starter contains all three patterns.
Let participants find them before showing this slide's patterns.
-->
