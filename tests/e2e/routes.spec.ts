import { test, expect, open, ROUTES } from './support'

test.describe('routes, deep links and history', () => {
  for (const route of ROUTES) {
    test(`deep link and refresh: ${route.path}`, async ({ page }) => {
      const first = await open(page, route.path)
      expect(first?.status()).toBe(200)
      await expect(page.locator('h1').first()).toHaveText(route.h1)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page).toHaveTitle(/Divyansh Sharma/)

      const again = await page.reload()
      expect(again?.status()).toBe(200)
      await expect(page.locator('h1').first()).toHaveText(route.h1)
    })
  }

  test('generated route pages carry per-route canonical URLs', async ({ request }) => {
    for (const route of ROUTES.filter((r) => r.path !== '/')) {
      const html = await (await request.get(route.path)).text()
      expect(html).toContain(`<link rel="canonical" href="https://divyanshsharma.work${route.path}"`)
    }
  })

  test('unknown routes return the 404 page', async ({ page }) => {
    const response = await page.goto('/this-route-does-not-exist')
    expect(response?.status()).toBe(404)
    await expect(page.getByRole('link', { name: /Back to Divyansh/ })).toBeVisible()
  })

  test('back and forward restore SPA routes', async ({ page }) => {
    await open(page, '/')
    await page.locator('#decision-explorer').scrollIntoViewIfNeeded()
    await page.getByRole('button', { name: /Read the full case study/ }).click()
    await expect(page).toHaveURL(/\/case-study-2$/)
    await expect(page.locator('h1')).toHaveText(/Role-Based Access Control/)

    await page.goBack()
    await expect(page).toHaveURL(/\/$/)
    await expect(page.locator('#hero')).toBeAttached()

    await page.goForward()
    await expect(page).toHaveURL(/\/case-study-2$/)
    await expect(page.locator('h1')).toHaveText(/Role-Based Access Control/)
  })
})
