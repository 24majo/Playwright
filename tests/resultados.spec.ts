import { test, expect } from '@playwright/test'
import { fa, faker } from '@faker-js/faker'
import { login } from './cuenta.spec'

test.beforeEach(async ({ page }) => {
    await login(page)
    await page.getByRole('link', { name: 'Resultados' }).click()
})

test("Resultados", async ({ page }) => {
    await page.pause()
    await Registro({ page })        
})

test("Todos", async ({ page }) => {
    await page.getByRole('tab', { name: 'Todos los partidos' }).click({ force: true })
    await Registro({ page })
})

test("Editar", async({ page }) => {
    await page.pause()
    await page.getByRole('row', { name: new RegExp(`Equipo \\d Equipo local .+`)}).getByRole('button').click()
})

async function Registro({ page }){
    var registrar = page.getByRole('row', { name: new RegExp(`.+ Registrar`)}).getByRole('button')
    var btn_registro = registrar.first()
    var num_btn = await registrar.count()
    var button = await btn_registro.getAttribute('data-disabled')

    console.log("Botones: " + num_btn)

    for(var i = 0; i < num_btn; i++){
        await btn_registro.click()
        var random = Math.floor(Math.random() * 10).toString()
        await page.locator('input[name="puntos_local"]').fill(random)
        random = Math.floor(Math.random() * 10).toString()
        await page.locator('input[name="puntos_visitante"]').fill(random)
        await page.getByRole('button', { name: 'Guardar' }).click({ force: true })
        await page.pause()
    }
}