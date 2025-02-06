import { test } from '@playwright/test'
import { login } from './cuenta.spec'

test.beforeEach(async ({ page }) => {
    await login(page)
    await page.getByRole('link', { name: 'Mis pagos' }).click({ force: true })
})

