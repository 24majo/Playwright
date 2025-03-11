import { test, expect } from '@playwright/test';
import { login, agregar_cancha } from './cuenta.spec'

var inicio, fin

test.describe("CaskrApp", async() => {
    test.beforeEach(async ({ page }) => {
        await login(page)
        await page.getByRole('link', { name: 'Canchas' }).click()
    })

    test("Agregar", async ({ page }) => {
        await page.locator('text=Canchas').waitFor({ state: 'visible' })
        for(var i = 0; i < 3; i++){
            await page.click('//span[text()="Agregar cancha"]')
            await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor()
            await agregar_cancha(page)
            await page.getByLabel(/Añadir/).getByRole('button', { name: 'Agregar cancha' }).click({ force: true })
            inicio = Date.now()
            await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden'})
            fin = Date.now()
            console.log("Tiempo de registro de canchas: " + (fin - inicio) + "ms")
        }
    })

    test("Eliminar", async ({ page }) => {
        // Caso 1: Eliminar exitosamente
        // Caso 2: No es posible eliminar porque tiene partidos registrados en ella
        
        var borrar = page.locator('button:nth-child(2)').nth(2)
        await expect(borrar).toBeVisible()
        await borrar.click({ force: true })
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible' })
        await page.getByRole('button', { name: 'Eliminar' }).click({ force: true })
        var error = await page.locator('text=Está cancha no puede ser').isVisible()
        
        if(error)
            console.log("Caso 2")

        else{
            console.log("Caso 1")
            inicio = Date.now()
            await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden' })
            fin = Date.now()
            console.log("Tiempo de eliminación de cancha: " + (fin - inicio) + "ms")
        }
            
    })

    test("Editar", async ({ page }) => {
        await page.locator('button').nth(3).click()
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible' })
        await agregar_cancha(page)
        await page.getByRole('button', { name: 'Guardar cambios' }).click({ force: true })
        inicio = Date.now()
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden'})
        fin = Date.now()
        console.log("Tiempo de edición de canchas: " + (fin - inicio) + "ms")
    })
})