import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { course, root } from '../scripts/course.mjs'

const dist = join(root, 'dist')
const landing = readFileSync(join(dist, 'index.html'), 'utf8')
const links = [...landing.matchAll(/<a\s[^>]*?href="([^"]+)"/g)].map(([, href]) => href)

// How Cloudflare Pages maps a clean URL to a file in dist/.
const fileFor = path => {
  const clean = decodeURI(path.split(/[?#]/)[0])
  return clean.endsWith('/') ? join(dist, clean, 'index.html') : [join(dist, clean), join(dist, `${clean}.html`)].find(existsSync)
}

test('the build produces the landing page and all ten decks with a route per slide', () => {
  assert.deepEqual(course.modules.map(m => m.id), ['000', '101', '102', '103', '201', '202', '203', '301', '302', '303'])
  for (const m of course.modules) {
    const deck = JSON.parse(readFileSync(join(dist, m.id, 'deck.json'), 'utf8'))
    for (const page of ['index.html', '404.html', ...deck.slides.map((_, k) => `${k + 1}.html`)]) assert.ok(existsSync(join(dist, m.id, page)), `${m.id}/${page}`)
  }
  assert.match(landing, /<title>GitHub Copilot: from zero to hero · Juan G\. Carmona<\/title>/)
})

test('the landing page runs group 0, then 100, 200 and 300, then the certification', () => {
  const order = [...landing.matchAll(/id="(level-\d+|module-\d{3}|certification|instructor)"/g)].map(([, id]) => id)
  assert.deepEqual(order, ['level-0', 'module-000', 'level-100', 'module-101', 'module-102', 'module-103', 'level-200', 'module-201', 'module-202', 'module-203', 'level-300', 'module-301', 'module-302', 'module-303', 'certification', 'instructor'])
  // Group 0 and the certification each hold one centred card.
  assert.match(landing, /id="level-0"[\s\S]*?<ol class="modules single"/)
  assert.match(landing, /id="certification"[\s\S]*?<ol class="modules single"/)
  assert.deepEqual(course.modules.filter(m => m.lab).map(m => m.id), ['101', '102', '103'])
  for (const m of course.modules) assert.equal(landing.includes(`href="${m.lab}"`), Boolean(m.lab), `lab link for ${m.id}`)
})

test('the instructor is on the page: name, headline, portrait and profiles', () => {
  assert.match(landing, /Juan G\. Carmona/)
  assert.ok(landing.includes(course.author.headline.replace('&', '&amp;')))
  assert.match(landing, /<img src="\/assets\/portrait-[\w-]+\.jpg" alt="Portrait of Juan G\. Carmona"/)
  for (const p of course.author.profiles) assert.ok(landing.includes(`href="${p.url}"`), p.name)
})

test('every same-site link on the landing page resolves to a file in dist/', () => {
  const internal = links.filter(href => href.startsWith('/') && !href.startsWith('//'))
  assert.ok(internal.length >= 12)
  for (const href of internal) assert.ok(fileFor(href), `${href} resolves`)
})

test('every external link on the landing page answers', { skip: process.env.OFFLINE === '1' && 'OFFLINE=1' }, async () => {
  const external = [...new Set(links.filter(href => /^https?:/.test(href)))]
  for (const href of external) {
    const response = await fetch(href, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (course link check)' } })
    // LinkedIn answers automated requests with 999; anything else must succeed.
    assert.ok(response.ok || (href.includes('linkedin.com') && response.status === 999), `${href} → ${response.status}`)
  }
})

test('the site uses the Lighthouse UI tokens with square corners, and ships no _redirects', () => {
  const css = readFileSync(join(dist, 'assets', readFileSync(join(dist, 'index.html'), 'utf8').match(/assets\/([\w-]+\.css)/)[1]), 'utf8')
  assert.match(css, /--lh-canvas/)
  assert.match(css, /--lh-radius-control:\s*0/)
  assert.match(css, /--lh-radius-panel:\s*0/)
  assert.equal(existsSync(join(dist, '_redirects')), false)
})

test('the landing page and the decks count under the shared GoatCounter account and host path', () => {
  for (const html of [landing, readFileSync(join(dist, '201', '5.html'), 'utf8')]) {
    assert.match(html, /window\.goatcounter\s*=\s*\{\s*path:\s*function\s*\(p\)\s*\{\s*return location\.host \+ p\s*\}/)
    assert.match(html, /data-goatcounter="https:\/\/jgcarmona-com\.goatcounter\.com\/count"/)
  }
})
