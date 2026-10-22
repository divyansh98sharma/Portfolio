import { test, expect, open, revealAllFrames, floatingCollisions, horizontalOverflow, onlyOnProjects, ROUTES, type Theme } from './support'

// The full width matrix runs once (desktop Chromium project) by resizing the
// viewport; every project additionally checks its own device viewport.
const WIDTHS = [320, 375, 390, 430, 768, 810, 1024, 1366, 1440, 1600, 1920]
const heightFor = (w: number) => (w < 768 ? 800 : w < 1100 ? 1024 : 900)
const THEMES: Theme[] = ['light', 'dark']
const MATRIX_ROUTES = ['/', '/case-study-1', '/case-study-2']

test.describe('responsive layout matrix', () => {
  onlyOnProjects((p) => p === 'desktop-chromium', 'matrix resizes one browser; devices are covered below')

  for (const theme of THEMES)
    for (const path of MATRIX_ROUTES)
      test(`${theme} ${path}: no overflow or control collisions at 11 widths`, async ({ page }) => {
        test.setTimeout(120_000)
        await open(page, path, { theme })
        const problems: string[] = []
        for (const width of WIDTHS) {
          await page.setViewportSize({ width, height: heightFor(width) })
          // Mid-page, where the chapter rail and every floating control are shown.
          await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.4))
          await expect.poll(() => horizontalOverflow(page), { message: `${width}px overflow` }).toBeLessThanOrEqual(0)
          // Poll briefly: controls such as the chapter rail mount after an
          // IntersectionObserver callback. A real overlap persists and fails.
          const hits = await expect
            .poll(() => floatingCollisions(page), { timeout: 2_000 })
            .toEqual([])
            .then(() => [] as string[])
            .catch(async () => floatingCollisions(page))
          if (hits.length) problems.push(`${width}px: ${hits.join('; ')}`)
        }
        expect(problems).toEqual([])
      })
})

test.describe('device viewport', () => {
  for (const route of ROUTES)
    for (const theme of THEMES)
      test(`${theme} ${route.path}: content revealed, no overflow, no collisions`, async ({ page }) => {
        await open(page, route.path, { theme })
        await revealAllFrames(page)
        expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0)
        await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.4))
        await expect.poll(() => floatingCollisions(page)).toEqual([])
      })

  test('theme toggle switches and persists across reload', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' })
    await open(page, '/')
    const html = page.locator('html')
    const startDark = await html.evaluate((el) => el.classList.contains('dark'))
    await page.getByRole('switch', { name: /^Switch to (dark|light) theme$/ }).click()
    await expect.poll(() => html.evaluate((el) => el.classList.contains('dark'))).toBe(!startDark)
    await page.reload()
    await expect(page.locator('h1').first()).toBeVisible()
    await expect.poll(() => html.evaluate((el) => el.classList.contains('dark'))).toBe(!startDark)
  })
})
