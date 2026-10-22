import { test as base, expect, type Page } from '@playwright/test'

export type Theme = 'light' | 'dark'

export const ROUTES = [
  { path: '/', h1: /complex products/i },
  { path: '/about', h1: /Divyansh Sharma/ },
  { path: '/all-case-studies', h1: /Recents/ },
  { path: '/case-study-1', h1: /Analytics Central/ },
  { path: '/case-study-2', h1: /Role-Based Access Control/ },
  { path: '/case-study-3', h1: /Flowsheets/ },
] as const

/** Requests to anything other than the local build are third-party
 *  (Cloudflare analytics, Firestore). They are aborted so tests never depend
 *  on the network, and their resulting errors are not app defects. */
const THIRD_PARTY_NOISE = /cloudflareinsights|firestore\.googleapis|firebase|googleapis\.com|ERR_FAILED|ERR_ABORTED|access control checks|Failed to load resource/i

type Fixtures = {
  /** Uncaught exceptions and console errors from the app itself. Asserted empty after every test. */
  appErrors: string[]
}

export const test = base.extend<Fixtures>({
  appErrors: [
    async ({ page, baseURL }, use) => {
      const errors: string[] = []
      const origin = new URL(baseURL!).origin
      await page.route('**/*', (route) =>
        route.request().url().startsWith(origin) ? route.continue() : route.abort('blockedbyclient')
      )
      page.on('pageerror', (e) => {
        if (!THIRD_PARTY_NOISE.test(e.message)) errors.push(`pageerror: ${e.message}`)
      })
      page.on('console', (m) => {
        if (m.type() === 'error' && !THIRD_PARTY_NOISE.test(m.text())) errors.push(`console.error: ${m.text()}`)
      })
      await use(errors)
      expect(errors, 'app-originated console errors / exceptions').toEqual([])
    },
    { auto: true },
  ],
})

export { expect }

/** Load a route with the boot splash already dismissed (as on a repeat visit
 *  in the same session) and the given theme, then wait for the page heading. */
export async function open(
  page: Page,
  path: string,
  opts: { theme?: Theme; boot?: boolean; namePrompt?: boolean } = {}
) {
  await page.addInitScript(
    ({ theme, boot, namePrompt }) => {
      try {
        if (!boot) sessionStorage.setItem('fig-booted', '1')
        if (theme) localStorage.setItem('ui-theme', theme)
        // The visitor name prompt is covered by its own test; keep it out of
        // layout assertions so it doesn't mask the controls under test.
        if (!namePrompt) localStorage.setItem('portfolio-name-prompted', '1')
      } catch {
        /* storage may be unavailable */
      }
    },
    { theme: opts.theme, boot: opts.boot ?? false, namePrompt: opts.namePrompt ?? false }
  )
  const response = await page.goto(path)
  await expect(page.locator('h1').first()).toBeVisible()
  return response
}

/** Scroll every frame into view and wait for its reveal transition to settle,
 *  so content is fully opaque before layout / contrast assertions. */
export async function revealAllFrames(page: Page) {
  const frames = page.locator('#main-content section.frame-wrap')
  const count = await frames.count()
  for (let i = 0; i < count; i++) {
    const frame = frames.nth(i)
    await frame.scrollIntoViewIfNeeded()
    await expect(frame.locator(':scope > .frame-surface')).toHaveCSS('opacity', '1')
  }
}

/** Pairs of visible, interactive fixed-position controls whose boxes overlap by more than 2px. */
export async function floatingCollisions(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const fixed = [...document.querySelectorAll<HTMLElement>('body *')]
      .filter((el) => {
        const cs = getComputedStyle(el)
        return cs.position === 'fixed' && cs.display !== 'none' && cs.visibility !== 'hidden' && Number(cs.opacity) > 0.05 && cs.pointerEvents !== 'none'
      })
      .map((el) => ({ el, b: el.getBoundingClientRect() }))
      .filter(({ b }) => b.width > 0 && b.height > 0 && b.width < innerWidth * 0.95 && b.height < innerHeight * 0.9)
    const label = (el: HTMLElement) =>
      (el.getAttribute('aria-label') || el.textContent?.trim().slice(0, 30) || el.className.toString().slice(0, 40)).trim()
    const hits: string[] = []
    for (let i = 0; i < fixed.length; i++)
      for (let j = i + 1; j < fixed.length; j++) {
        const a = fixed[i], c = fixed[j]
        if (a.el.contains(c.el) || c.el.contains(a.el)) continue
        const x = Math.min(a.b.right, c.b.right) - Math.max(a.b.left, c.b.left)
        const y = Math.min(a.b.bottom, c.b.bottom) - Math.max(a.b.top, c.b.top)
        if (x > 2 && y > 2) hits.push(`${label(a.el)} × ${label(c.el)} (${Math.round(x)}×${Math.round(y)}px)`)
      }
    return hits
  })
}

/** Document wider than the viewport → the user can scroll sideways. */
export async function horizontalOverflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
}

export const isMobileProject = (name: string) => name.startsWith('mobile')

/** Skip every test in the enclosing describe unless the predicate holds for the project. */
export function onlyOnProjects(predicate: (project: string) => boolean, reason: string) {
  test.beforeEach(({}, info) => {
    test.skip(!predicate(info.project.name), reason)
  })
}
