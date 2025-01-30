import { test, expect } from '@playwright/test';

test.describe("CaskrApp", async() => {
    test.beforeEach("Inicios de sesión", async ({ page }) => {
        await page.goto('http://localhost:3000/auth');
        await page.getByTestId('inputCorreo').fill('majo90@prueba.com');
        await page.getByTestId('inputPassword').fill('12345678');
        await page.getByTestId('crearCuenta').click();
        await page.getByRole('link', { name: 'Arbitros' }).click();
    })

    test("Agregar", async ({ page }) => {
        for(var i = 0; i < 5; i++) {
            await page.click('//span[text()="Agregar árbitro"]');
            await page.waitForTimeout(1500)

            var nombres = ['Lucero', 'Sofía', 'Frida', 'Matías', 'Eliseo', 'Cinthia', 'Édgar', 'Enrique', 'Julio', 'César', 'Leonardo', 'Ramses', 'Juan', 'David'];
            var nombre = nombres[Math.floor(Math.random() * nombres.length)];
            await page.locator('//input[@name="nombres"]').fill(nombre);

            var apellidos = ['Albor', 'Salazar', 'Rodríguez', 'Cuevas', 'Solórzano', 'Ramos', 'Delgado', 'Ávalos', 'Ruiz', 'Segoviano'];
            var apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
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
        
        var nombres = ['Lucero', 'Sofía', 'Frida', 'Matías', 'Eliseo', 'Cinthia', 'Édgar', 'Enrique', 'Julio', 'César', 'Leonardo', 'Ramses', 'Juan', 'David'];
        var apellidos = ['Albor', 'Salazar', 'Rodríguez', 'Cuevas', 'Solórzano', 'Ramos', 'Delgado', 'Ávalos', 'Ruiz', 'Segoviano'];
        var nombre = nombres[Math.floor(Math.random() * nombres.length)];
        var apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
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