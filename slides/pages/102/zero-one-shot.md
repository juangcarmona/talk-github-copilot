---
layout: comparison
section: Techniques
beforeTitle: Zero-Shot
afterTitle: One-Shot
---

# From Zero-Shot to One-Shot

::before::

Direct instruction - no examples provided.

```javascript
// Write a function that finds 
// the maximum value in an array
function max(array) {
  return Math.max.apply(null, array);
}
```

Works for simple, well-known patterns.
Copilot uses general training knowledge.

::after::

One example sets the pattern.

```javascript
// Create a function `findMax` that takes
// an array and returns the string with
// the maximum length.
// Example: test('adds 1 + 2 to equal 3',
//   () => expect(calculate(1, 2, '+')).toBe(3))
function findMax(array) {
  var max = array[0].length;
  array.map(v => max = Math.max(max, v.length));
  return array.filter(v => v.length == max);
}
```

The example teaches Copilot the expected behavior.

<!--
Zero-shot: fast, works for common patterns.
One-shot: adds one example to guide the model - significantly better for non-trivial tasks.

The jump from zero-shot to one-shot is often the biggest quality improvement.
-->