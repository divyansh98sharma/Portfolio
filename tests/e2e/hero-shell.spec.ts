import { test, expect, open } from './support'

/**
 * The home page ships a prerendered copy of the hero (scripts/generate-static-
 * routes.ts → src/prerender/heroShell.tsx) so the headline paints before the
 * JS bundle runs. These tests guard the hand-over: same layout box, no
 * duplicate landmarks once React mounts, and no visible restart of the hero's
 * entrance animation.
 */

/** The headline's layout box from offsets (ignores the entrance transform). */
async function headlineBox(page: import('@playwright/test').Page) {
  return page.evaluate(() => {
    const offset = (el: HTMLElement) => {
      let x = 0, y = 0
      for (let e: HTMLElement | null = el; e; e = e.offsetParent as HTMLElement | null) {
        x += e.offsetLeft
        y += e.offsetTop
      }
      return [x, y]
    }
    const h1 = document.querySelector<HTMLElement>('#hero-heading')!
    return [...offset(h1), h1.offsetWidth, h1.offsetHeight]
  })
}

test.describe('prerendered home hero', () => {
  test('only the home page HTML carries the shell', async ({ request }) => {
    expect(await (await request.get('/')).text()).toContain('data-prerendered-shell')
    for (const path of ['/about', '/all-case-studies', '/case-study-1']) {
      expect(await (await request.get(path)).text()).not.toContain('data-prerendered-shell')
    }
  })

  test('headline paints without JavaScript and keeps its box when React takes over', async ({ page, context }) => {
    // Shell only: block the entry bundle.
    const shellPage = await context.newPage()
    await shellPage.route(/\/assets\/index-[^/]+\.js$/, (route) => route.abort())
    await shellPage.goto('/')
    await expect(shellPage.locator('[data-prerendered-shell] #hero-heading')).toBeVisible()
    await shellPage.evaluate(() => document.fonts.ready)
    const shellBox = await headlineBox(shellPage)
    await shellPage.close()

    // Real app: the shell is removed and exactly one hero / main remains.
    await open(page, '/')
    await expect(page.locator('[data-prerendered-shell]')).toHaveCount(0)
    await expect(page.locator('#hero-heading')).toHaveCount(1)
    await expect(page.locator('main#main-content')).toHaveCount(1)
    await page.evaluate(() => document.fonts.ready)
    expect(await headlineBox(page)).toEqual(shellBox)
  })

  test('hero entrance does not restart when React replaces the shell', async ({ page }, info) => {
    // WebKit runs these animations on the compositor while the bundle executes,
    // so main-thread computed opacity lags what is on screen; checked in Chromium.
    test.skip(info.project.name.includes('webkit'), 'computed style lags compositor animation in WebKit')
    await page.addInitScript(() => {
      const samples: number[] = []
      ;(window as unknown as { __heroOpacity: number[] }).__heroOpacity = samples
      const tick = () => {
        const h1 = document.querySelector('#hero-heading')
        if (h1) samples.push(Number(getComputedStyle(h1).opacity))
        if (samples.length < 240) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    await open(page, '/')
    await expect(page.locator('[data-prerendered-shell]')).toHaveCount(0)
    await expect.poll(() => page.evaluate(() => (window as unknown as { __heroOpacity: number[] }).__heroOpacity.at(-1))).toBe(1)
    const samples = await page.evaluate(() => (window as unknown as { __heroOpacity: number[] }).__heroOpacity)
    const biggestDrop = Math.max(0, ...samples.slice(1).map((v, i) => samples[i] - v))
    expect(biggestDrop).toBeLessThanOrEqual(0.05)
  })
})
