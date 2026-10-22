import { test, expect, open, isMobileProject, onlyOnProjects } from './support'

const trigger = (page: import('@playwright/test').Page) => page.getByRole('button', { name: /^Quick open/ })
const dialog = (page: import('@playwright/test').Page) => page.getByRole('dialog', { name: 'Quick Open' })
const search = (page: import('@playwright/test').Page) => page.getByRole('combobox', { name: 'Search portfolio destinations' })

test.describe('Quick Open', () => {
  test('opens from its trigger and closes with the close button', async ({ page }) => {
    await open(page, '/')
    await trigger(page).click()
    await expect(dialog(page)).toBeVisible()
    await expect(search(page)).toBeFocused()
    await page.getByRole('button', { name: 'Close Quick Open' }).click()
    await expect(dialog(page)).toBeHidden()
  })

  test.describe('keyboard', () => {
    onlyOnProjects((p) => !isMobileProject(p), 'hardware-keyboard behaviour is covered on desktop and tablet')

    test('Ctrl/⌘+K toggles, traps focus, locks scroll, and restores focus on Escape', async ({ page }) => {
      await open(page, '/')
      await trigger(page).focus()
      await page.keyboard.press('ControlOrMeta+k')
      await expect(dialog(page)).toBeVisible()
      await expect(search(page)).toBeFocused()
      await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('hidden')

      for (let i = 0; i < 6; i++) await page.keyboard.press('Tab')
      await expect.poll(() => page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]'))).toBe(true)
      for (let i = 0; i < 6; i++) await page.keyboard.press('Shift+Tab')
      await expect.poll(() => page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]'))).toBe(true)

      await page.keyboard.press('Escape')
      await expect(dialog(page)).toBeHidden()
      await expect.poll(() => page.evaluate(() => document.body.style.overflow)).not.toBe('hidden')
      await expect(trigger(page)).toBeFocused()
    })

    test('arrow keys move aria-activedescendant through listbox options', async ({ page }) => {
      await open(page, '/')
      await page.keyboard.press('ControlOrMeta+k')
      const input = search(page)
      const options = page.getByRole('listbox', { name: 'Available destinations' }).getByRole('option')
      await expect(options.first()).toHaveAttribute('aria-selected', 'true')
      await expect(input).toHaveAttribute('aria-activedescendant', (await options.first().getAttribute('id'))!)

      await page.keyboard.press('ArrowDown')
      await expect(options.nth(1)).toHaveAttribute('aria-selected', 'true')
      await expect(options.first()).toHaveAttribute('aria-selected', 'false')
      await expect(input).toHaveAttribute('aria-activedescendant', (await options.nth(1).getAttribute('id'))!)

      await page.keyboard.press('ArrowUp')
      await expect(options.first()).toHaveAttribute('aria-selected', 'true')
    })

    test('search + Enter opens a case study', async ({ page }) => {
      await open(page, '/')
      await page.keyboard.press('ControlOrMeta+k')
      await search(page).fill('flowsheet')
      await expect(page.getByRole('option')).toHaveCount(1)
      await page.keyboard.press('Enter')
      await expect(page).toHaveURL(/\/case-study-3$/)
      await expect(page.locator('h1')).toHaveText(/Flowsheets/)
    })

    test('no-match state is announced', async ({ page }) => {
      await open(page, '/')
      await page.keyboard.press('ControlOrMeta+k')
      await search(page).fill('zzzz-nothing')
      await expect(page.getByRole('option')).toHaveCount(0)
      await expect(dialog(page).getByRole('status')).toHaveText('No matching pages or projects')
    })
  })

  test('lists the Decisions chapter and jumps to it', async ({ page }) => {
    await open(page, '/')
    await trigger(page).click()
    await search(page).fill('decision')
    await page.getByRole('option', { name: /Design decisions/ }).click()
    await expect(dialog(page)).toBeHidden()
    await expect(page.locator('#decision-explorer')).toBeInViewport()
  })

  test('section destinations navigate home from a case study', async ({ page }) => {
    await open(page, '/case-study-1')
    await trigger(page).click()
    await search(page).fill('contact')
    await page.getByRole('option', { name: /Contact/ }).click()
    await expect(page).toHaveURL(/\/$/)
    await expect(page.locator('#contact')).toBeInViewport()
  })
})
