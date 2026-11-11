import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import ts from 'typescript'

// Transpile the browser module here, so the test runs on any Node build, with or without type stripping.
const source = ts.transpileModule(readFileSync(new URL('../src/deck/nav.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
const { keyAction, next, parsePath, previous, toPath } = await import(`data:text/javascript,${encodeURIComponent(source)}`)

test('slide URLs are /<module>/<number>, first slide at /<module>/', () => {
  assert.deepEqual(parsePath('/201/', 18), { id: '201', index: 0 })
  assert.deepEqual(parsePath('/201', 18), { id: '201', index: 0 })
  assert.deepEqual(parsePath('/201/5', 18), { id: '201', index: 4 })
  assert.deepEqual(parsePath('/201/5.html', 18), { id: '201', index: 4 })
  assert.deepEqual(parsePath('/201/99', 18), { id: '201', index: 17 }, 'past the end clamps to the last slide')
  assert.deepEqual(parsePath('/201/0', 18), { id: '201', index: 0 })
  assert.deepEqual(parsePath('/nope', 18), { id: null, index: 0 })
  assert.equal(toPath('201', 0), '/201/')
  assert.equal(toPath('201', 4), '/201/5')
})

test('next and previous walk through reveal steps before changing slide', () => {
  const steps = [0, 2, 0]
  assert.deepEqual(next({ index: 0, step: 0 }, steps), { index: 1, step: 0 })
  assert.deepEqual(next({ index: 1, step: 0 }, steps), { index: 1, step: 1 })
  assert.deepEqual(next({ index: 1, step: 2 }, steps), { index: 2, step: 0 })
  assert.deepEqual(next({ index: 2, step: 0 }, steps), { index: 2, step: 0 }, 'stays on the last slide')
  assert.deepEqual(previous({ index: 2, step: 0 }, steps), { index: 1, step: 2 }, 'going back lands on the fully revealed slide')
  assert.deepEqual(previous({ index: 0, step: 0 }, steps), { index: 0, step: 0 })
})

test('keys map to deck actions, but Space and Enter keep working on links and buttons', () => {
  assert.equal(keyAction('ArrowRight'), 'next')
  assert.equal(keyAction('PageUp'), 'previous')
  assert.equal(keyAction('o'), 'overview')
  assert.equal(keyAction('ArrowRight', { ctrl: true }), null)
  const button = { closest: selector => selector.includes('button') }
  assert.equal(keyAction(' ', {}, button), null)
  assert.equal(keyAction('Enter', {}, button), null)
  assert.equal(keyAction('ArrowRight', {}, button), 'next')
})
