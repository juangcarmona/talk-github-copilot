import { defineConfig } from '@playwright/test'
import { existsSync } from 'node:fs'

// Served by wrangler's Cloudflare Pages emulator, so routing matches production.
export default defineConfig({
  testDir: './tests/browser',
  workers: 1,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:8788', headless: true, launchOptions: { executablePath: existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined } },
  webServer: { command: 'npm run preview -- --ip 127.0.0.1', url: 'http://127.0.0.1:8788', reuseExistingServer: false, timeout: 60_000 },
})
