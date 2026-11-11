import { defineConfig } from '@playwright/test'
import { existsSync } from 'node:fs'

// Served by wrangler's Cloudflare Pages emulator, so routing matches production. Port 8789 leaves
// `npm run preview` (8788) free.
export default defineConfig({
  testDir: './tests/browser',
  workers: 1,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:8789', headless: true, launchOptions: { executablePath: existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined } },
  webServer: { command: 'npx wrangler pages dev dist --ip 127.0.0.1 --port 8789', url: 'http://127.0.0.1:8789', reuseExistingServer: false, timeout: 60_000 },
})
