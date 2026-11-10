// Fails the build if dist/ is not a complete, self-contained course site.
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { load } from '@slidev/parser/fs'
import { course, root } from './course.mjs'

const dist = join(root, 'dist')
const read = path => readFileSync(join(dist, path), 'utf8')
const fail = message => { throw Error(`verify-static: ${message}`) }

for (const file of ['index.html', '404.html', 'styles.css', '_headers']) if (!existsSync(join(dist, file))) fail(`missing ${file}`)

// A _redirects rewrite on Cloudflare Pages also shadows real files, so the site must not ship one.
if (existsSync(join(dist, '_redirects'))) fail('dist/_redirects would shadow deck assets on Cloudflare Pages')
const landing = read('index.html')
let assets = 0
let routes = 0
for (const m of course.modules) {
  if (!existsSync(join(dist, m.id, 'index.html'))) fail(`deck ${m.id} was not built`)
  if (!existsSync(join(dist, m.id, '404.html'))) fail(`deck ${m.id} has no 404.html fallback for client routes`)
  const { slides } = await load(dirname(join(root, m.deck)), join(root, m.deck))
  for (let no = 1; no <= slides.length; no++) if (!existsSync(join(dist, m.id, `${no}.html`))) fail(`no static route for /${m.id}/${no}`)
  routes += slides.length
  if (!landing.includes(`href="/${m.id}/"`)) fail(`landing does not link /${m.id}/`)
  if (m.lab && !landing.includes(`href="${m.lab}"`)) fail(`landing does not link the ${m.id} lab`)
  // Every same-origin URL the deck HTML points to must exist in dist/.
  const html = read(join(m.id, 'index.html'))
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"#?]+)"/g)) {
    if (!url.startsWith(`/${m.id}/`)) fail(`deck ${m.id} references ${url} outside its base`)
    if (!existsSync(join(dist, url))) fail(`deck ${m.id} references missing ${url}`)
    assets++
  }
  if (!html.includes('jgcarmona-com.goatcounter.com/count')) fail(`deck ${m.id} is missing GoatCounter`)
}
if (!landing.includes(course.certification.url)) fail('landing does not link the certification')
if (!landing.includes('jgcarmona-com.goatcounter.com/count')) fail('landing is missing GoatCounter')

console.log(`Verified ${course.modules.length} decks, landing page, ${routes} slide routes and ${assets} deck asset references.`)
