import { test } from '@playwright/test'
import { login, registrar_resultado } from './cuenta.spec'

test.beforeEach(async ({ page }) => {
    await login(page)
    await page.getByRole('link', { name: 'Resultados' }).click()
    await page.locator('text=Registro de resultados').waitFor({ state: 'visible' })
})

test("Eliminacion", async ({ page }) => {
    await page.pause()
    var registrar = page.getByRole('button', { name: 'Registrar' })
    await registrar_resultado (page, registrar)
})

test("Todos", async ({ page }) => {
    await page.getByRole('tab', { name: 'Todos los partidos' }).click({ force: true })
    await page.pause()
    await page.locator('[placeholder="Busqueda general"]').waitFor({ state: 'visible' })
    var registrar = page.getByRole('row', { name: new RegExp(`.+ Registrar`)}).getByRole('button')
    await page.waitForTimeout(1000)
    await registrar_resultado (page, registrar)
})

test("Partes", async ({ page }) => {
    await page.getByRole('tab', { name: 'Resultados' }).click({ force: true })
    var registrar = page.getByRole('row', { name: new RegExp(`.+ Registrar`)}).getByRole('button')
    await registrar_resultado (page, registrar)
})