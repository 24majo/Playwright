import { test, expect } from '@playwright/test';

test.describe("CaskrApp", async() => {
    test.beforeEach("Inicios de sesión", async ({ page }) => {
        await page.goto('http://localhost:3000/auth');
        await page.getByTestId('inputCorreo').fill('majo90@prueba.com');
        await page.getByTestId('inputPassword').fill('12345678');
        await page.getByTestId('crearCuenta').click();
    })

    test("Agregar", async ({ page }) => {
        await page.getByRole('link', { name: 'Canchas' }).click();
        await page.click('//span[text()="Agregar cancha"]');
        //await page.pause()
        await page.getByLabel('LigaAñadir nueva cancha').locator('img').waitFor({ state: 'visible' });
        await page.waitForTimeout(3000)
        var n_cancha = Math.floor(1 + Math.random() * 20).toString()
        await page.locator('//input[@name="nombre"]').fill("Cancha " + n_cancha);
        await page.waitForTimeout(2000)
        var lugar = ['Deportiva', "Calle", "Estadio", "Deportivo", "Puerto"];
        var ubicacion = lugar[Math.floor(Math.random() * lugar.length)];
        console.log("Ubicación: " + ubicacion)
        await page.getByPlaceholder('Ubicación').fill(ubicacion);
        var num = Math.floor(1 + Math.random() * 4);
        console.log("Numero: " + num)
        //await page.pause()
        await page.waitForTimeout(2000)
        //await page.locator('div:nth-child(24) > div:nth-child('+num+') > .pac-icon').click();
        //await page.locator('div:nth-child('+num+') > .pac-icon').first().click();
        await page.getByText(ubicacion, { exact: false }).nth(num).click({ force: true });
        //await page.getByLabel('LigaAñadir nueva cancha').getByRole('img').nth(num).click();
        await page.getByTestId('inputDescripcion').fill('Pasto sintético');
        await page.waitForTimeout(3000)
        await page.getByLabel('LigaAñadir nueva cancha').getByRole('button', { name: 'Agregar cancha' }).click();
    })

    test("Eliminar", async ({ page }) => {
        await page.getByRole('link', { name: 'Canchas' }).click()
        var borrar = page.locator('button:nth-child(2)').nth(2)
        await expect(borrar).toBeVisible()
        await borrar.click({ force: true })
        await page.getByRole('button', { name: 'Eliminar' }).click()
        await page.waitForTimeout(2000)
        // await page.pause()
    })

    test("Editar", async ({ page }) => {
        await page.waitForTimeout(2000)
        await page.getByRole('link', { name: 'Canchas' }).click()
        await page.waitForTimeout(1000)
        var editar = page.locator('button').nth(3)
        await editar.click()
        // var nombre = await page.getByTestId('inputCancha')
         var n_cancha = Math.floor(Math.random() * 20).toString()
        // await nombre.fill("Cancha " + n_cancha)
        await page.locator('//input[@name="nombre"]').fill("Cancha " + n_cancha);
        var lugar = ['Deportiva', "Calle", "Estadio", "Deportivo", "Puerto", 'Estadio'];
        var ubicacion = lugar[Math.floor(Math.random() * lugar.length)];
        console.log("Ubicación: " + ubicacion)
        await page.getByPlaceholder('Ubicación').fill(ubicacion)
        var num = Math.floor(Math.random() * 4);
        console.log("Numero: " + num)
        await page.waitForTimeout(2000)
        await page.getByText(ubicacion, { exact: false }).nth(num).click({ force: true });
        await page.getByTestId('inputDescripcion').fill('Pasto falso');
        await page.waitForTimeout(2000)
        await page.getByRole('button', { name: 'Guardar cambios' }).click({ force: true })
        await page.pause()
    })
})