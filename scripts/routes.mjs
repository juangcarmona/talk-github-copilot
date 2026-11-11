// After vite build: gives every slide its own static URL on Cloudflare Pages.
// Pages serves /201/5 from 201/5.html with a 200. A _redirects rewrite cannot do this, because Pages applies
// rewrites to existing files too. Any other path under /201/ falls back to 201/404.html, which is the same app.
import { copyFileSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { course, root } from './course.mjs'

const dist = join(root, 'dist')
const app = join(dist, 'deck.html')
let routes = 0
for (const m of course.modules) {
  const { slides } = JSON.parse(readFileSync(join(dist, m.id, 'deck.json'), 'utf8'))
  copyFileSync(app, join(dist, m.id, 'index.html'))
  copyFileSync(app, join(dist, m.id, '404.html'))
  for (let no = 1; no <= slides.length; no++) copyFileSync(app, join(dist, m.id, `${no}.html`))
  routes += slides.length
}
rmSync(app)

// Hashed build assets never change; deck data and pages revalidate.
writeFileSync(join(dist, '_headers'), '/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n')
console.log(`Wrote ${routes} slide routes for ${course.modules.length} modules.`)
