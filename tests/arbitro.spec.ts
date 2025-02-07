import { test, expect } from '@playwright/test'
import { fa, faker } from '@faker-js/faker'
import { login } from './cuenta.spec'
import { agregar_arbitro } from './cuenta.spec'

test.describe("CaskrApp", async() => {

    test.beforeEach(async ({ page }) => {
        await login(page)
        await page.getByRole('link', { name: 'Arbitros' }).click()
    })

    var nombre = faker.person.firstName()
    var apellido = faker.person.lastName()
    
    test("Agregar", async ({ page }) => {
        for(var i = 0; i < 8; i++) {
            await agregar_arbitro(page)
            await page.click('//span[text()="Agregar arbitro"]');
            await page.pause()
        }
    })

    test("Eliminar", async ({ page }) => {
        //await page.getByRole('row', { name: 'Leonardo_Ávalos@arbitro.com' }).getByRole('button').nth(1).click();
        await page.locator('role=row[name=/@arbitro.com$/]').locator('role=button').nth(1).click({ force: true })
        await page.locator('//button[text()="Sí, Eliminar"]').click({ force: true })
        //await page.pause()
    })

    test("Editar", async ({ page }) => {
        await page.locator('role=row[name=/@arbitro.com$/]').locator('role=button').first().click({ force: true })
        var telefono = faker.number.int({ min: 1000000000, max: 9999999999 }).toString()
        console.log(nombre + " " + apellido)
        console.log(telefono)
        await page.locator('//input[@name="nombres"]').nth(4).fill(nombre)
        await page.locator('//input[@name="apellidos"]').nth(4).fill(apellido)
        await page.locator('//input[@name="telefono"]').nth(4).fill(telefono)
        //await page.locator('//input[@name="email"]').nth(4).fill(nombre + '_' + apellido + '@arbitro.com')
        await page.getByRole('button', { name: 'Guardar cambios' }).nth(4).click({ force: true })
        await page.pause()
        //await page.click('//span[text()="Guardar cambios"]');
        
    })
})