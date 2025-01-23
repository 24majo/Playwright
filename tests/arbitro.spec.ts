import { test, expect } from '@playwright/test';

test.describe("CaskrApp", async() => {
    test.beforeEach("Inicios de sesión", async ({ page }) => {
        await page.goto('http://localhost:3000/auth');
        await page.getByTestId('inputCorreo').fill('majo83@prueba.com');
        await page.getByTestId('inputPassword').fill('12345678');
        await page.getByTestId('crearCuenta').click();
        await page.getByRole('link', { name: 'Arbitros' }).click();
    })

    test("Agregar", async ({ page }) => {
        await page.click('//span[text()="Agregar árbitro"]');
        await page.waitForTimeout(2000)

        var nombres = ['Lucero', 'Sofía', 'Frida', 'Matías', 'Eliseo', 'Cinthia', 'Édgar', 'Enrique', 'Julio', 'César', 'Leonardo', 'Ramses', 'Juan', 'David'];
        var nombre = nombres[Math.floor(Math.random() * nombres.length)];
        await page.locator('//input[@name="nombres"]').fill(nombre);

        var apellidos = ['Albor', 'Salazar', 'Rodríguez', 'Cuevas', 'Solórzano', 'Ramos', 'Delgado', 'Ávalos', 'Ruiz', 'Segoviano'];
        var apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
        await page.locator('//input[@name="apellidos"]').fill(apellido);

        var telefono = Math.floor(100000000000 + Math.random() * 900000000000).toString();
        await page.locator('//input[@name="telefono"]').fill(telefono);

        await page.locator('//input[@name="email"]').fill(nombre + '_' + apellido + '@arbitro.com');
        await page.click('//span[text()="Agregar arbitro"]');
        //await page.pause()
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
        var telefono = Math.floor(100000000000 + Math.random() * 900000000000).toString();

        await page.locator('//input[@name="nombres"]').first().fill('')
        await page.locator('//input[@name="nombres"]').first().fill('Juanito')
        // var caso = Math.floor(Math.random() * 4);
        // switch(caso){
        //     case 1:
        //         await page.locator('input[placeholder="Escribe su nombre"]').first().fill('');
        //         var nombre = nombres[Math.floor(Math.random() * nombres.length)];
        //         await page.getByPlaceholder('Escribe su nombre').first().fill(nombre)
        //         break

        //     case 2:
        //         await page.locator('Escribe sus apellidos').first().fill('')
        //         var apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
        //         await page.getByPlaceholder('Escribe sus apellidos').first().fill(apellido)
        //         break

        //     case 3:
        //         await page.locator('Escribe su teléfono').first().first().fill('')
        //         var telefono = Math.floor(100000000000 + Math.random() * 900000000000).toString();
        //         await page.getByPlaceholder('Escribe su teléfono').first().fill(telefono)

        //         break

        //     case 4:
        //         await page.getByPlaceholder('Escribe su nombre').first().clear()
        //         await page.getByPlaceholder('Escribe sus apellidos').first().clear()
        //         var nombre = nombres[Math.floor(Math.random() * nombres.length)];
        //         var apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
        //         await page.getByPlaceholder('Escribe su correo electrónico').fill(nombre + '_' + apellido + '@arbitro.com')
        //         break

        //     default:
        //         var nombre = nombres[Math.floor(Math.random() * nombres.length)];
        //         var apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
        //         var telefono = Math.floor(100000000000 + Math.random() * 900000000000).toString();

        //         await page.getByPlaceholder('Escribe su nombre').first().fill(nombre)
        //         await page.getByPlaceholder('Escribe sus apellidos').first().fill(apellido)
        //         await page.getByPlaceholder('Escribe su teléfono').fill(telefono)
        //         await page.getByPlaceholder('Escribe su correo electrónico').first().fill(nombre + '_' + apellido + '@arbitro.com')
        //         break
        // }
        //await page.click('//span[text()="Guardar cambios"]');
        await page.pause()
    })
})