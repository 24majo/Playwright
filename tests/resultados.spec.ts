import { test, expect } from '@playwright/test'
import { fa, faker } from '@faker-js/faker'
import { login } from './cuenta.spec'

test.beforeEach(async ({ page }) => {
    await login(page)
})

test("Resultados", async ({ page }) => {
    await page.pause()

    var registrar = page.getByRole('row', { name: new RegExp(`.+ Registrar`)}).getByRole('button').first()
    var button = await registrar.getAttribute('data-disabled')

    while (!button){

    }
    
    await registrar.click()
    var random = Math.floor(Math.random() * 10).toString()
    await page.locator('input[name="puntos_local"]').fill(random)
    random = Math.floor(Math.random() * 10).toString()
    await page.locator('input[name="puntos_visitante"]').fill(random)
    await page.getByRole('button', { name: 'Guardar' }).click({ force: true })
    await page.pause()
})

test("Editar", async({ page }) => {
    await page.pause()
    await page.getByRole('row', { name: new RegExp(`Equipo \\d Equipo local .+`)}).getByRole('button').click()
    await page.pause()
})