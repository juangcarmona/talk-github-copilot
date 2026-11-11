import test from 'node:test'
import assert from 'node:assert/strict'
import { compileDeck, splitSlides } from '../scripts/decks.mjs'
import { course } from '../scripts/course.mjs'

test('Markdown splits on --- separators with frontmatter, but not inside code fences', () => {
  const slides = splitSlides('---\nlayout: cover\n---\n\n# One\n\n---\nlayout: statement\nsection: S\n---\n\n# Two\n\n```yaml\n---\nkey: value\n---\n```\n\n---\n\n# Three\n')
  assert.equal(slides.length, 3)
  assert.equal(slides[0].frontmatter.layout, 'cover')
  assert.deepEqual(slides[1].frontmatter, { layout: 'statement', section: 'S' })
  assert.match(slides[1].body, /key: value/)
  assert.match(slides[2].body, /# Three/)
})

test('every deck compiles to the slide count Slidev produced, plus the author slide', async () => {
  // Counts taken from the last Slidev build of these decks.
  const slidev = { '000': 9, '101': 27, '102': 22, '103': 10, '201': 17, '202': 17, '203': 18, '301': 33, '302': 18, '303': 14 }
  for (const m of course.modules) {
    const deck = await compileDeck(m)
    assert.equal(deck.slides.length, slidev[m.id] + 1, m.id)
    assert.equal(deck.slides.at(-1).layout, 'author', m.id)
    const html = JSON.stringify(deck)
    assert.ok(!html.includes('<!--'), `${m.id} publishes no speaker notes`)
    assert.ok(!/<v-clicks|::(left|right|before|after)::/.test(html), `${m.id} has no unprocessed Slidev syntax`)
  }
})

test('<v-clicks> lists become reveal steps', async () => {
  const deck = await compileDeck(course.modules.find(m => m.id === '101'))
  const stepped = deck.slides.filter(s => s.steps > 0)
  assert.equal(stepped.length, 1)
  assert.equal(stepped[0].steps, 7)
  assert.equal((stepped[0].html.main.match(/data-at="/g) ?? []).length, 7)
})
