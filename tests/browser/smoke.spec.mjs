import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { readFileSync } from 'node:fs'

const course = JSON.parse(readFileSync('course/modules.json', 'utf8'))

// GoatCounter is external; keep the tests offline and the count clean.
test.beforeEach(async ({ page }) => { await page.route('https://gc.zgo.at/**', route => route.abort()) })

const axe = page => new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()

test('landing page: order, centred single cards, accessible in light and dark, no horizontal scroll at 320px', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('GitHub Copilot: from zero to hero')
  await expect(page.locator('li.module')).toHaveCount(11)
  await expect(page.getByRole('link', { name: /^Lab/ })).toHaveCount(3)
  await expect(page.getByRole('img', { name: 'Portrait of Juan G. Carmona' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Go to the certification/ })).toHaveAttribute('href', course.certification.url)

  // Module 000 and the certification sit alone, centred on the page frame.
  for (const card of ['#module-000', 'li.module.cert']) {
    const box = await page.locator(card).boundingBox()
    const frame = await page.locator(card).locator('xpath=ancestor::section[1]').boundingBox()
    expect(Math.abs(box.x + box.width / 2 - (frame.x + frame.width / 2)), card).toBeLessThan(2)
  }
  expect((await axe(page)).violations).toEqual([])

  await page.getByRole('button', { name: 'Dark' }).click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  expect((await axe(page)).violations).toEqual([])

  await page.setViewportSize({ width: 320, height: 720 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('deck: opens from the landing page, deep links survive a refresh, keys step through reveals', async ({ page }) => {
  const failed = []
  page.on('response', r => { if (r.url().startsWith('http://127.0.0.1:8789') && r.status() >= 400) failed.push(`${r.status()} ${r.url()}`) })
  await page.goto('/')
  await page.getByRole('link', { name: 'Slides for module 201' }).click()
  await expect(page).toHaveURL(/\/201\/$/)
  await expect(page.locator('.slide[data-slide="1"]')).toBeVisible()

  await page.goto('/201/5')
  await page.reload()
  await expect(page).toHaveURL(/\/201\/5$/)
  await expect(page.locator('.slide[data-slide="5"]')).toBeVisible()
  await page.keyboard.press('ArrowRight')
  await expect(page).toHaveURL(/\/201\/6$/)
  await expect(page).toHaveTitle(/201 Custom Instructions/)

  // Module 101 has one <v-clicks> list: its items appear one key press at a time.
  const deck = await (await page.request.get('/101/deck.json')).json()
  const n = deck.slides.findIndex(s => s.steps > 0) + 1
  await page.goto(`/101/${n}`)
  const items = page.locator('.slide [data-at]')
  await expect(items.first()).not.toHaveClass(/\bon\b/)
  await page.keyboard.press('ArrowRight')
  await expect(items.first()).toHaveClass(/\bon\b/)
  await expect(page).toHaveURL(new RegExp(`/101/${n}$`))

  // The last slide is the instructor, pointing on to the next module.
  await page.goto(`/201/${(await (await page.request.get('/201/deck.json')).json()).slides.length}`)
  await expect(page.getByRole('heading', { name: 'Juan G. Carmona' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Next: 202/ })).toHaveAttribute('href', '/202/')
  expect(failed).toEqual([])
})

test('every slide of every module fits its sheet, with no script errors', async ({ page }) => {
  test.setTimeout(240_000)
  const errors = []
  page.on('pageerror', e => errors.push(`${page.url()} ${e.message}`))
  const overflow = []
  for (const m of course.modules) {
    const { slides } = await (await page.request.get(`/${m.id}/deck.json`)).json()
    for (let n = 1; n <= slides.length; n++) {
      await page.goto(`/${m.id}/${n}?embed`)
      await page.waitForSelector('.slide[data-fit]')
      if (await page.$('[data-mermaid]')) await page.waitForSelector('[data-mermaid][data-rendered]')
      await page.waitForFunction(() => [...document.images].every(img => img.complete))
      const o = await page.evaluate(() => { const s = document.querySelector('.slide'); return Math.max(s.scrollHeight - s.clientHeight, s.scrollWidth - s.clientWidth) })
      if (o > 1) overflow.push(`${m.id}/${n} +${o}px`)
    }
  }
  expect(overflow).toEqual([])
  expect(errors).toEqual([])
})
