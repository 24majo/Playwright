import { test, expect } from '@playwright/test'
import { fa, faker } from '@faker-js/faker'
import { login } from './cuenta.spec'

test.describe("CaskrApp", async() => {

    test.beforeEach(async ({ page }) => {
        await login(page); 
    })

    var nombre = faker.name.firstName()
    var apellido = faker.name.lastName()
    
    test("Agregar", async ({ page }) => {
        for(var i = 0; i < 5; i++) {
            await page.click('//span[text()="Agregar árbitro"]');
            await page.waitForTimeout(1500)

            await page.locator('//input[@name="nombres"]').fill(nombre);
            await page.locator('//input[@name="apellidos"]').fill(apellido);

            var telefono = Math.floor(1000000000 + Math.random() * 9000000000).toString();
            await page.locator('//input[@name="telefono"]').fill(telefono);

            await page.locator('//input[@name="email"]').fill(nombre + '_' + apellido + '@arbitro.com');
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
        var telefono = Math.floor(1000000000 + Math.random() * 9000000000).toString();
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