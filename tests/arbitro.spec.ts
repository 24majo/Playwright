import { test } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { login } from './cuenta.spec'
import { agregar_arbitro } from './cuenta.spec'

var inicio, fin

test.beforeEach(async ({ page }) => {
    inicio = Date.now()
    await login(page)
    await page.locator('text=Inicio').waitFor({ state: 'visible' })
    fin = Date.now()
    console.log("Tiempo de inicio de sesión: " + (fin - inicio) + "ms")
    await page.getByRole('link', { name: 'Arbitros' }).click()
})

test("Agregar", async ({ page }) => {
    for(var i = 0; i < 3; i++) {
        await agregar_arbitro(page)
        await page.click('//span[text()="Agregar arbitro"]')
        inicio = Date.now()
        await page.locator('[data-modal-content="true"][role="dialog"]:visible').waitFor({ state: 'hidden' })
        fin = Date.now()
        console.log("Tiempo de registro de árbitro: " + (fin - inicio) + "ms")
    }
})

test("Eliminar", async ({ page }) => {
    // Caso 1: Eliminar exitosamente
    // Caso 2: No se puede eliminar porque ya está asignado a un partido
    await page.locator('role=row[name=/@.+\..+$/]').locator('role=button').nth(1).click({ force: true })
    await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor()
    await page.locator('//button[text()="Sí, Eliminar"]').click({ force: true })
    var error = await page.getByRole('heading', { name: 'Error' }).isVisible()
    
    if(error){
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden' })
        fin = Date.now()
        console.log("Caso 2")
        console.log("Error de eliminación de árbitro:" + (fin - inicio) + "ms")
    }

    else{
        inicio = Date.now()
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden' })
        fin = Date.now()
        console.log("Caso 1")
        console.log("Tiempo de eliminación de árbitro:" + (fin - inicio) + "ms")
    }
})

test("Editar", async ({ page }) => {
    await page.locator('role=row[name=/@.+\..+$/]').locator('role=button').first().click({ force: true })
    await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor()
    await page.locator('//input[@name="nombres"]').fill(faker.person.firstName())
    await page.locator('//input[@name="apellidos"]').fill(faker.person.lastName())
    await page.locator('//input[@name="telefono"]').fill(faker.number.int({ min: 1000000000, max: 9999999999 }).toString())
    await page.locator('//input[@name="email"]').fill(faker.internet.email())
    await page.getByRole('button', { name: 'Guardar cambios' }).click({ force: true })
    inicio = Date.now()
    await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden'})
    fin = Date.now()
    console.log("Tiempo de modificación de árbitro: " + (fin - inicio) + "ms")
    await page.pause()
})