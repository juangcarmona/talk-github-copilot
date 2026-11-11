---
layout: default
section: Pitfalls
---

# When NOT to Trust Autocomplete

Autocomplete is fast and convenient - but there are situations where you should **pause before pressing Tab**.

<div class="grid grid-cols-2 gap-2 mt-6">

<div>

### ⚠️ High-risk scenarios

- **Security-sensitive code** - auth, crypto, input validation, SQL queries
- **Business logic with edge cases** - financial calculations, state machines
- **API contracts** - wrong types compile but break at runtime
- **Unfamiliar libraries** - Copilot may suggest outdated or wrong APIs
- **Copy-paste patterns** - it repeats what it sees, including bugs

</div>

<div>

### ✅ When autocomplete shines

- **Boilerplate** - constructors, getters, mappings
- **Test scaffolding** - arrange/act/assert structure
- **Repetitive patterns** - similar methods, config entries
- **Language idioms** - common patterns in the current language
- **Documentation** - JSDoc, XML comments, README sections

</div>

</div>

---


# When NOT to Trust Autocomplete

Autocomplete is fast and convenient - but there are situations where you should **pause before pressing Tab**.


<div class="mt-6 p-4 border border-red-200 bg-red-50 rounded text-sm">

🛑 **Rule of thumb:** If the consequences of a bug are high, slow down. Read the suggestion character by character. Run tests. Don't let speed override correctness.

</div>

<!--
This slide directly addresses the trust calibration problem.

New users trust Copilot too much because it "sounds confident."
The model generates plausible code regardless of correctness.

Security-sensitive code is the highest risk area because:
- The code compiles and looks right
- The bug is invisible without security expertise
- The consequences are severe

Module 103 covers this in depth with practical exercises.
-->
