---
layout: default
section: How It Works
---

# The Request Lifecycle

Every time you press Tab or send a chat message, this happens:

```mermaid {scale: 0.65}
flowchart LR
    A[Context] --> B[Pre-filters]
    B --> C[LLM]
    C --> D[Post-filters]
    D --> E[IDE]
    E --> F{You}

    B -.- B1[Toxicity]
    B -.- B2[Injection guard]
    D -.- D1[Quality]
    D -.- D2[Security]
    D -.- D3[Public code]
    F -.- F1[Accept / Modify / Reject]
```

<div class="mt-4 text-sm opacity-70">

Your code is **never** used for training. Prompts are deleted after inference.

</div>

<!--
This is the pipeline overview. Next slide has the timing details.
The diagram must stay compact - each box is one word or two max.
-->
