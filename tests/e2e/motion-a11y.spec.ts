import AxeBuilder from '@axe-core/playwright'
import { test, expect, open, revealAllFrames, ROUTES, type Theme } from './support'

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })

  test('no boot splash, no running infinite animations, instant route change', async ({ page }) => {
    await open(page, '/', { boot: true })
    await expect(page.getByText('Opening divyansh-portfolio.fig')).toHaveCount(0)
    const infinite = await page.evaluate(
      () => document.getAnimations().filter((a) => a.playState === 'running' && a.effect?.getTiming().iterations === Infinity).length
    )
    expect(infinite).toBe(0)

    await page.locator('#decision-explorer').scrollIntoViewIfNeeded()
    await page.getByRole('button', { name: /Read the full case study/ }).click()
    // The incoming page must not be mid-transform: framer-motion is configured
    // to skip the slide/fade entirely under reduced motion.
    const transform = await page.locator('#main-content h1').evaluate((h1) => {
      let el: Element | null = h1
      while (el && el.id !== 'main-content') {
        const t = getComputedStyle(el).transform
        if (t && t !== 'none' && t !== 'matrix(1, 0, 0, 1, 0, 0)') return t
        el = el.parentElement
      }
      return 'none'
    })
    expect(transform).toBe('none')
  })
})

test.describe('default motion', () => {
  test.use({ reducedMotion: 'no-preference' })

  test('boot splash is brief, dismissible, and does not block input', async ({ page }) => {
    await open(page, '/', { boot: true })
    const splash = page.getByText('Opening divyansh-portfolio.fig')
    // It is shown once per session and must clear on its own.
    await expect(splash).toHaveCount(0, { timeout: 3_000 })
    await page.reload()
    await expect(page.locator('h1').first()).toBeVisible()
    await expect(splash).toHaveCount(0)
  })
})

test.describe('accessibility (axe, WCAG 2.2 A/AA)', () => {
  // Reduced motion keeps the decorative multiplayer cursors off-screen so the
  // scan covers the page content itself; frames are revealed before scanning.
  test.use({ reducedMotion: 'reduce' })

  for (const theme of ['light', 'dark'] as Theme[])
    for (const route of ROUTES)
      test(`${theme} ${route.path}`, async ({ page }, info) => {
        test.skip(info.project.name === 'tablet-chromium', 'desktop and phone widths cover both layouts')
        await open(page, route.path, { theme })
        await revealAllFrames(page)
        await page.evaluate(() => window.scrollTo(0, 0))
        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze()
        const summary = results.violations.map(
          (v) => `${v.id} (${v.impact}) ×${v.nodes.length}: ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`
        )
        expect(summary).toEqual([])
      })
})
