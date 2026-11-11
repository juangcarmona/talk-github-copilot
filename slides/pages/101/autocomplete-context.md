---
layout: default
section: Autocomplete
---

# What Autocomplete Sees

Autocomplete uses a **narrower context** than Chat.

<div class="grid grid-cols-2 gap-6 mt-4">

<div class="leading-snug">

### High-signal sources
- Current file (above and below cursor)
- Open editor tabs (neighboring files)
- File name and language identifier
- Import statements and type signatures

</div>

<div>

<img src="/101/copilot-flow.png" class="w-full object-contain rounded shadow" />

</div>

</div>

<div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">

💡 **Tip:** Open related files in tabs - they become signal for autocomplete.

</div>

<!--
This explains the "open related files" tip: tabs are signal.
If you're working on a service, open the interface/types file in another tab.

Autocomplete doesn't search your workspace like Chat does - it works with what's immediately available.
-->
