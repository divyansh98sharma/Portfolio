import { defineConfig, devices } from '@playwright/test'

/**
 * End-to-end regression suite. Runs against the *production build* served
 * like GitHub Pages (tests/e2e/static-server.mjs), not the Vite dev server,
 * so deep links, generated route pages and 404s match production.
 *
 *   npm run build && npm run test:e2e
 */
const PORT = Number(process.env.E2E_PORT ?? 4173)

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  timeout: 45_000,
  expect: { timeout: 7_500 },
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: `node tests/e2e/static-server.mjs build ${PORT}`,
    url: `http://127.0.0.1:${PORT}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'tablet-chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 810, height: 1080 }, hasTouch: true },
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['Pixel 7'] },
    },
    {
      // Closest available proxy for iOS Safari: WebKit with iPhone metrics.
      // It is not a real device; see tests/e2e/README.md.
      name: 'mobile-webkit',
      use: { ...devices['iPhone 13'] },
    },
  ],
})
