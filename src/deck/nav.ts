// Pure navigation rules, shared by the deck, the presenter and the tests.
// A slide's URL is /<module>/<number>; the first slide is /<module>/. Steps (reveals) are not in the URL.

export type Position = { index: number; step: number }

/** Reads the module id and the 0-based slide index from a path such as /201/5, /201/5.html or /201/. */
export function parsePath(pathname: string, count: number): { id: string | null; index: number } {
  const match = pathname.match(/^\/(\d{3})(?:\/(\d+)(?:\.html)?)?\/?$/)
  if (!match) return { id: null, index: 0 }
  const number = Number(match[2] ?? 1)
  return { id: match[1], index: Math.min(Math.max(1, Number.isFinite(number) ? number : 1), Math.max(1, count)) - 1 }
}

export function toPath(id: string, index: number): string {
  return index === 0 ? `/${id}/` : `/${id}/${index + 1}`
}

export function next({ index, step }: Position, steps: number[]): Position {
  if (step < steps[index]) return { index, step: step + 1 }
  return index < steps.length - 1 ? { index: index + 1, step: 0 } : { index, step }
}

export function previous({ index, step }: Position, steps: number[]): Position {
  if (step > 0) return { index, step: step - 1 }
  return index > 0 ? { index: index - 1, step: steps[index - 1] } : { index, step }
}

export function same(a: Position, b: Position): boolean {
  return a.index === b.index && a.step === b.step
}

export type Action = 'next' | 'previous' | 'first' | 'last' | 'presenter' | 'blackout' | 'fullscreen' | 'overview'

const interactive = 'a, button, input, select, textarea, summary, [contenteditable="true"], [role="button"]'

/** Maps a key to a deck action. Keys typed into controls keep their native behaviour. */
export function keyAction(key: string, modifiers: { meta?: boolean; ctrl?: boolean; alt?: boolean } = {}, target: { closest?: (selector: string) => unknown } | null = null): Action | null {
  if (modifiers.meta || modifiers.ctrl || modifiers.alt) return null
  if (target?.closest?.(interactive) && (key === ' ' || key === 'Enter')) return null
  switch (key) {
    case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ': case 'n': return 'next'
    case 'ArrowLeft': case 'ArrowUp': case 'PageUp': case 'Backspace': return 'previous'
    case 'Home': return 'first'
    case 'End': return 'last'
    case 'p': case 'P': return 'presenter'
    case 'b': case 'B': case '.': return 'blackout'
    case 'f': case 'F': return 'fullscreen'
    case 'o': case 'O': return 'overview'
    default: return null
  }
}
