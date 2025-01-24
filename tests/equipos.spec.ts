import { test, expect } from '@playwright/test';
 
test.describe("CaskrApp", async() => {
    test.beforeEach("Inicios de sesión", async ({ page }) => {
        await page.goto('http://localhost:3000/auth');
        //await page.getByTestId('inputCorreo').fill('majo49@prueba.com'); // Correo 
        await page.getByTestId('inputCorreo').fill('majo67@prueba.com'); // Número
        await page.getByTestId('inputPassword').fill('12345678');
        await page.getByTestId('crearCuenta').click();
        await page.waitForTimeout(1000); 
    })

    test("Agregar", async ({ page }) => {
        for(var i = 0; i < 4; i++){
            await page.getByRole('link', { name: 'Equipos' }).click();
            await page.click('//span[text()="Agregar equipo"]');
            var n_equipo = Math.floor(Math.random() * 20)
            await page.locator('//input[@name="nombre"]').fill("Equipo " + n_equipo);

            var nombres = ['Lucero', 'Sofía', 'Frida', 'Matías', 'Eliseo', 'Cinthia', 'Édgar', 'Enrique', 'Julio', 'César', 'Leonardo', 'Ramses', 'Juan', 'David'];
            var nombre = nombres[Math.floor(Math.random() * nombres.length)];
            await page.locator('//input[@name="nombre_capitan"]').fill(nombre);

            var apellidos = ['Albor', 'Salazar', 'Rodríguez', 'Cuevas', 'Solórzano', 'Ramos', 'Delgado', 'Ávalos', 'Ruiz', 'Segoviano'];
            var apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
            await page.locator('//input[@name="apellidos_capitan"]').fill(apellido);

            var telefono = Math.floor(1000000000 + Math.random() * 9000000000).toString();
            await page.locator('//input[@name="telefono"]').fill(telefono);

            await page.getByLabel('LigaAgregar nuevo equipo').getByRole('button', { name: 'Agregar equipo' }).click();
            await page.pause()
            // await page.locator('//span[text()="Cancelar"]').click(); // Botón para cancelar acción
        }
        await page.pause();
    })

    test("Editar", async ({ page }) => {
        await page.getByRole('link', { name: 'Equipos' }).click();
        var i = Math.floor(Math.random() * 3)
        const div = await page.locator(`div[@role="row"][row-index="${i}"]`);
        div.hover()
        await page.pause()
    })
})
