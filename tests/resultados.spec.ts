import { test, expect } from '@playwright/test'
import { login } from './cuenta.spec'

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

export const registrar_resultado = async (page: any, registrar) => {
    var num_btn = await registrar.count()

    for(var i = 0; i < num_btn; i++){
        await registrar.first().waitFor({ state: 'visible' })
        var desactivado = await registrar.first().getAttribute('data-disabled') // true o null

        if(desactivado === null){
            registrar.first().click({ force: true })
            await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible'})
            var random = [Math.floor(Math.random() * 10) + 1].toString()
            await page.locator('input[name="puntos_local"]').fill(random)
            random = [Math.floor(Math.random() * 10) + 1].toString()
            await page.locator('input[name="puntos_visitante"]').fill(random)
            await page.getByRole('button', { name: 'Guardar' }).click({ force: true })

            inicio = Date.now()
            // await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden'}).toHaveCount(1, { timeout: 5000 })
            await page.getByRole('dialog', { name: /Registro de/i }).waitFor({ state: 'hidden' })
            fin = Date.now()
            console.log("Tiempo de registro de resultados: " + (fin - inicio) + "ms")

            // Compartir jornada
            var share = await page.getByRole('button', { name: 'Compartir la jornada' }).isVisible()
            console.log(share)
            if(share){
                await page.getByRole('button', { name: 'Guardar para luego' }).click()
                // share.click()
                // inicio = Date.now()
                // await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden'})
                // fin = Date.now()
                // console.log("Tiempo de jornada compartida: " + (fin - inicio) + "ms")
            }
        }
    }
}