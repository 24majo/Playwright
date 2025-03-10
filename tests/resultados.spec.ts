import { test } from '@playwright/test'
import { login, registrar_resultado } from './cuenta.spec'

var inicio, fin

test.beforeEach(async ({ page }) => {
    inicio = Date.now()
    await login(page)
    await page.locator('text=Inicio').waitFor({ state: 'visible' })
    fin = Date.now()
    console.log("Tiempo de inicio de sesión: " + (fin - inicio) + "ms")
    await page.getByRole('link', { name: 'Resultados' }).click()
})

test("Eliminacion", async ({ page }) => {
    await page.pause()
    var registrar = page.getByRole('button', { name: 'Registrar' })
    await registrar_resultado (page, registrar)
})

test("Todos", async ({ page }) => {
    await page.getByRole('tab', { name: 'Todos los partidos' }).click({ force: true })
    await page.locator('[placeholder="Busqueda general"]').waitFor({ state: 'visible' })
    var registrar = page.getByRole('row', { name: new RegExp(`.+ Registrar`)}).getByRole('button')
    await registrar_resultado (page, registrar)
})

test("Partes", async ({ page }) => {
    await page.getByRole('tab', { name: 'Resultados' }).click({ force: true })
    var registrar = page.getByRole('row', { name: new RegExp(`.+ Registrar`)}).getByRole('button')
    await registrar_resultado (page, registrar)
})