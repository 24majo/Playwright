import { test } from '@playwright/test'
import { login, registrar_resultado } from './cuenta.spec'

var inicio: any
var fin: any

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
    // await page.getByRole('tab', { name: 'Todos los partidos' }).click({ force: true })
    // await page.locator('[placeholder="Busqueda general"]').waitFor({ state: 'visible' })
    await page.pause()
    var registrar = page.getByRole('row', { name: new RegExp(`.+ Registrar`)}).getByRole('button')
    await page.waitForTimeout(1000)
    await registrar_resultado (page, registrar)
})

test("Lig_ida", async ({ page }) => {
    var ida = await page.getByRole('button', { name: 'Registrar Ida' })
    await registrar_resultado (page, ida)
})


test("Lig_idavuelta", async ({ page }) => {
    await page.pause()
    // await page.getByText('Final', { exact: true }).waitFor({ state: 'visible' })
    var ida = await page.getByRole('button', { name: 'Registrar Ida' })
    await registrar_resultado (page, ida)
    await page.waitForTimeout(1000)
    var vuelta = await page.getByRole('button', { name: 'Registrar vuelta' })
    await registrar_resultado (page, vuelta)
})

test("Liga", async ({ page }) => {
    await page.pause()
    await page.getByRole('tab', { name: 'Resultados' }).click({ force: true })
    var registrar = page.getByRole('row', { name: new RegExp(`.+ Registrar`)}).getByRole('button')
    await registrar_resultado (page, registrar)
})

// Test al generar liguilla
test("LiguillaIda", async ({ page }) => {
    await page.getByRole('button', { name: 'Vamos' }).click({ force: true })
    await page.getByRole('textbox', { name: '¿Cúantos equipos quieres' }).fill('8')
    await page.getByRole('radio', { name: 'ida', exact: true }).click()
    await page.getByRole('button', { name: 'Empezar a programar' }).click({ force: true })
})

test("LiguillaVuelta", async ({ page }) => {
    await page.getByRole('button', { name: 'Vamos' }).click({ force: true })
    await page.getByRole('textbox', { name: '¿Cúantos equipos quieres' }).fill('4')
    await page.getByRole('radio', { name: 'ida y vuelta' }).click()
    await page.getByRole('button', { name: 'Empezar a programar' }).click({ force: true })
})

// --------------------------------------------------------------------

