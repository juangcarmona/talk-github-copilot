---
layout: two-cols-header
section: Why Behavioral Shaping
---

# Instructions Reduce Output Variance

::left::

## Without Instructions

```mermaid
graph TD
    D1[Dev A opens Controller.cs] --> O1["async Task + try/catch"]
    D2[Dev B opens Service.cs] --> O2["sync void + no error handling"]
    D3[Dev C opens Handler.cs] --> O3["Result pattern + middleware"]

    style O1 fill:#fef2f2,stroke:#dc2626
    style O2 fill:#fef2f2,stroke:#dc2626
    style O3 fill:#fef2f2,stroke:#dc2626
```

Copilot mirrors whatever local pattern it sees.

::right::

## With Instructions

```mermaid
graph TD
    I[".github/copilot-instructions.md"]

    D1[Dev A] --> I
    D2[Dev B] --> I
    D3[Dev C] --> I

    I --> O["Consistent:<br/>async Task&lt;Result&lt;T&gt;&gt;"]

    style I fill:#eef2ff,stroke:#4f46e5
    style O fill:#f0fdf4,stroke:#16a34a
```

### Same standards. Same patterns. Same review expectations.

