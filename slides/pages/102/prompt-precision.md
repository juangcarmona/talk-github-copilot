---
layout: two-cols-header
section: Techniques
---

# Names Are Implicit Prompts

::left::

Copilot reads your code. Vague names produce vague completions:

```ts
// ❌ Generic - Copilot guesses intent
function process(data) { ... }

// ✅ Precise - Copilot understands domain
function validateShippingAddress(
  address: Address
): ValidationResult { ... }
```

::right::

## Specifications as Input

```ts
interface PaymentResult {
  success: boolean;
  transactionId: string;
  error?: string;
}
// Implementations respect the contract.
```

<!--
The unique lesson: well-named types, variables, and files are implicit prompts.
Copilot reads your code — vague names produce vague completions.

The code example shows:
- process(data) → generic, Copilot guesses intent
- validateShippingAddress(address: Address): ValidationResult → domain-specific,
  Copilot understands the task

This connects back to repository-aware-prompting: code quality = context quality = AI output quality.

Additional precision techniques (mention verbally):
- Format contracts: "Takes an array of strings, returns the first palindrome or null"
- Explicit constraints: "Use reduce, not a for loop" / "Do not use external dependencies"
- Type definitions as contracts: give Copilot an interface and the implementation
  respects it.

Transition: "Good names help Copilot understand. But the first response isn't always right.
Let's look at iterative refinement."
-->