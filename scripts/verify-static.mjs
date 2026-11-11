// Fails the build if dist/ is not a complete, self-contained course site.
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { course, root } from './course.mjs'
import { loadDeckSlides } from './decks.mjs'

const dist = join(root, 'dist')
const read = path => readFileSync(join(dist, path), 'utf8')
const fail = message => { throw Error(`verify-static: ${message}`) }

for (const file of ['index.html', '404.html', '_headers']) if (!existsSync(join(dist, file))) fail(`missing ${file}`)
// A _redirects rewrite on Cloudflare Pages also shadows real files, so the site must not ship one.
if (existsSync(join(dist, '_redirects'))) fail('dist/_redirects would shadow assets on Cloudflare Pages')

const landing = read('index.html')
const bundle = readdirSync(join(dist, 'assets')).filter(f => /\.(js|css)$/.test(f)).map(f => read(join('assets', f))).join('\n')
let routes = 0
let images = 0
for (const m of course.modules) {
  const deck = JSON.parse(read(join(m.id, 'deck.json')))
  const source = loadDeckSlides(join(root, m.deck)).slides
  if (deck.slides.length !== source.length + 1) fail(`deck ${m.id} has ${deck.slides.length} slides, expected ${source.length} + author`)
  for (const page of ['index.html', '404.html', ...deck.slides.map((_, k) => `${k + 1}.html`)]) {
    if (!existsSync(join(dist, m.id, page))) fail(`no static route ${m.id}/${page}`)
  }
  routes += deck.slides.length
  if (!landing.includes(`href="/${m.id}/"`)) fail(`landing does not link /${m.id}/`)
  if (m.lab && !landing.includes(`href="${m.lab}"`)) fail(`landing does not link the ${m.id} lab`)
  // Every image a slide points to must be published.
  const json = JSON.stringify(deck)
  for (const [, url] of json.matchAll(/(?:src=\\"|"image":")(\/[^"\\]+)/g)) {
    if (!existsSync(join(dist, decodeURI(url)))) fail(`deck ${m.id} references missing ${url}`)
    images++
  }
  // Speaker notes (HTML comments in the Markdown) must not be published.
  for (const slide of source) {
    for (const [, note] of slide.body.matchAll(/<!--([\s\S]*?)-->/g)) {
      const text = note.trim()
      if (text.length >= 60 && (json.includes(text.slice(0, 60)) || bundle.includes(text.slice(0, 60)))) fail(`speaker note published in ${m.id}: ${text.slice(0, 40)}…`)
    }
  }
}
for (const page of [landing, read('000/index.html')]) if (!page.includes('jgcarmona-com.goatcounter.com/count')) fail('GoatCounter is missing')
if (!landing.includes(course.certification.url)) fail('landing does not link the certification')

console.log(`Verified landing page, ${course.modules.length} decks, ${routes} slide routes, ${images} image references, no speaker notes published.`)
