import { test, expect } from '@playwright/test'
 
test('have Link to signin', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/')
  // The new URL should be "/about" (baseURL is used there)
await expect(page.locator('a[href="/auth/signin"]')).toBeVisible()
})