import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// GoatCounter is external; keep the tests offline and the count clean.
test.beforeEach(async ({ page }) => { await page.route('https://gc.zgo.at/**', route => route.abort()) })

test('landing page: ten modules, accessible, no horizontal scroll at phone width', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('GitHub Copilot: from zero to hero')
  await expect(page.locator('li.module')).toHaveCount(10)
  await expect(page.getByRole('link', { name: /^Lab/ })).toHaveCount(3)
  await expect(page.getByRole('link', { name: /Go to the certification/ })).toHaveAttribute('href', 'https://learn.microsoft.com/en-us/credentials/certifications/github-copilot')
  expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
  await page.setViewportSize({ width: 320, height: 720 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.emulateMedia({ colorScheme: 'dark' })
  expect((await new AxeBuilder({ page }).withTags(['wcag2aa']).analyze()).violations).toEqual([])
})

test('deck: opens from the landing page, and a deep link survives a refresh', async ({ page }) => {
  const failed = []
  page.on('response', r => { if (r.url().startsWith('http://127.0.0.1:8788') && r.status() >= 400) failed.push(`${r.status()} ${r.url()}`) })
  await page.goto('/')
  await page.getByRole('link', { name: 'Slides for module 201' }).click()
  await expect(page).toHaveURL(/\/201\/(1)?$/)
  await expect(page).toHaveTitle(/Module 201/)
  await expect(page.locator('.slidev-page').first()).toBeVisible()

  await page.goto('/201/5')
  await page.reload()
  await expect(page).toHaveURL(/\/201\/5$/)
  await expect(page.locator('.slidev-page-5')).toBeVisible()
  await page.keyboard.press('ArrowRight')
  await expect(page).toHaveURL(/\/201\/6$/)
  expect(failed).toEqual([])
})
