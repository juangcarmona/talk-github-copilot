---
layout: default
section: Security
---

# Security Validation Workflow

<div class="grid grid-cols-[1fr_1.1fr] gap-6 mt-2">
<div class="leading-snug">

## The loop

```
Generate code
     ↓
Ask: "Is this vulnerable to X?"
     ↓
Scan - GHAS / CodeQL / secrets
     ↓
Remediate findings
     ↓
Re-scan → clean → commit
```

## Ask while coding

- *"Is this vulnerable to SQL injection?"*
- *"Does this validate and sanitize input?"*
- *"Any authorization bypass paths here?"*

<div class="mt-4 text-sm opacity-70">

Copilot catches patterns. GHAS catches what reaches the repo.
Human review catches logic flaws. Security checks pass locally — PR review catches what you missed.

</div>

</div>
<div>

<img src="/103/secure-coding.png" class="w-full object-contain rounded shadow" />

</div>
</div>

<!--
Merged from secure-coding.md and security-detection.md.

The detection.png was dropped - secure-coding.png is the stronger visual here.
The loop is the workflow; the image shows Copilot security review in the editor.

Key reduction: removed GHAS taxonomy, vulnerability categories, defense-in-depth philosophy.
What remains: the loop + the three questions + the layered defense note.

The footer bridges to the next slide (PR review). Security checks are local; PR review is the
team-level gate that catches what individual review missed.

Lab exercises:
- Exercise 1 (Spot the Vulnerability): systematic security audit of DatabaseHelper.cs,
  AuthMiddleware.cs, CryptoHelper.cs, and Controllers/. At least 8 vulnerabilities.
- Exercise 5 (Secure the Endpoint): apply the loop to fix vulnerabilities from Exercise 1.
-->
