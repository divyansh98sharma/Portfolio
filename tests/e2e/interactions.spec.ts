import { test, expect, open, isMobileProject } from './support'

test.describe('Decision Explorer', () => {
  test('selection, previous/next and the case-study link', async ({ page }) => {
    await open(page, '/')
    const explorer = page.locator('#decision-explorer')
    await explorer.scrollIntoViewIfNeeded()

    const choices = explorer.getByRole('group', { name: 'Select a design decision' }).getByRole('button')
    const detail = explorer.locator('article h3')
    expect(await choices.count()).toBeGreaterThan(1)
    await expect(choices.first()).toHaveAttribute('aria-pressed', 'true')
    const firstTitle = await detail.textContent()

    await choices.nth(1).click()
    await expect(choices.nth(1)).toHaveAttribute('aria-pressed', 'true')
    await expect(choices.first()).toHaveAttribute('aria-pressed', 'false')
    await expect(detail).not.toHaveText(firstTitle!)
    const secondTitle = await detail.textContent()

    await explorer.getByRole('button', { name: 'Previous decision' }).click()
    await expect(detail).toHaveText(firstTitle!)
    await explorer.getByRole('button', { name: 'Next decision' }).click()
    await expect(detail).toHaveText(secondTitle!)

    // Wraps around from the first decision to the last.
    await choices.first().click()
    await explorer.getByRole('button', { name: 'Previous decision' }).click()
    await expect(choices.last()).toHaveAttribute('aria-pressed', 'true')

    await explorer.getByRole('button', { name: /Read the full case study/ }).click()
    await expect(page).toHaveURL(/\/case-study-2$/)
  })
})

test.describe('Chapter Rail and active-section tracking', () => {
  const rail = (page: import('@playwright/test').Page) => page.getByRole('navigation', { name: 'Portfolio story chapters' })

  test('hidden over the hero, then tracks and navigates sections', async ({ page }) => {
    await open(page, '/')
    await expect(rail(page)).toBeHidden()

    for (const [id, label] of [
      ['case-studies', 'Work'],
      ['about', 'About'],
      ['contact', 'Contact'],
    ] as const) {
      await page.locator(`#${id}`).evaluate((el) => el.scrollIntoView({ block: 'start' }))
      await expect(rail(page).getByRole('button', { name: label })).toHaveAttribute('aria-current', 'location')
    }

    await rail(page).getByRole('button', { name: 'Experience' }).click()
    await expect(page.locator('#experience')).toBeInViewport()
    await expect(rail(page).getByRole('button', { name: 'Experience' })).toHaveAttribute('aria-current', 'location')

    // Regression: jumping to the first chapter used to hide the rail on phones.
    await rail(page).getByRole('button', { name: 'Work' }).click()
    await expect(page.locator('#case-studies')).toBeInViewport()
    await expect(rail(page).getByRole('button', { name: 'Work' })).toHaveAttribute('aria-current', 'location')
  })

  test('layers panel marks the active frame (desktop)', async ({ page }, info) => {
    test.skip(info.project.name !== 'desktop-chromium', 'layers panel is shown from 1024px')
    await open(page, '/')
    await page.locator('#about').evaluate((el) => el.scrollIntoView({ block: 'start' }))
    await expect(page.locator('[data-tour="layers-panel"] [aria-current="true"]')).toContainText('About')
  })

  test('compact rail reveals labels on keyboard focus (md+)', async ({ page }, info) => {
    test.skip(isMobileProject(info.project.name), 'phones use the horizontal labelled rail')
    await open(page, '/')
    await page.locator('#about').evaluate((el) => el.scrollIntoView({ block: 'start' }))
    const label = rail(page).getByRole('button', { name: 'About' }).locator('span').last()
    await expect.poll(async () => (await label.boundingBox())?.width ?? 0).toBeLessThan(2)
    await rail(page).getByRole('button', { name: 'About' }).focus()
    await expect.poll(async () => (await label.boundingBox())?.width ?? 0).toBeGreaterThan(20)
  })
})

test.describe('focus stability', () => {
  test('scrolling past the hero never moves focus into the name prompt', async ({ page }) => {
    await open(page, '/', { namePrompt: true })
    await page.locator('#about').evaluate((el) => el.scrollIntoView({ block: 'start' }))
    await expect(page.getByRole('region', { name: 'Add your name' })).toBeVisible()
    const nameField = page.getByRole('textbox', { name: 'Your name' })
    await expect(nameField).not.toBeFocused()
    await nameField.focus()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('region', { name: 'Add your name' })).toBeHidden()
  })

  test('first Tab stop is visible and has a focus indicator', async ({ page }, info) => {
    test.skip(isMobileProject(info.project.name), 'hardware keyboard')
    await open(page, '/')
    await page.keyboard.press('Tab')
    const focused = page.locator(':focus')
    await expect(focused).toBeVisible()
    // A visible focus indicator: outline or box-shadow ring is present.
    const indicator = await focused.evaluate((el) => {
      const cs = getComputedStyle(el)
      return (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) || cs.boxShadow !== 'none'
    })
    expect(indicator, 'first tab stop has a visible focus indicator').toBe(true)
  })
})
