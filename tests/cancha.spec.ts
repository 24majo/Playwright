import { test, expect } from '@playwright/test';
import { fa, faker } from '@faker-js/faker'
import { login } from './cuenta.spec'
import { agregar_cancha } from './cuenta.spec';

test.describe("CaskrApp", async() => {
    test.beforeEach(async ({ page }) => {
        await login(page)
        await page.getByRole('link', { name: 'Canchas' }).click()
    })

    test("Agregar", async ({ page }) => {
        await page.click('//span[text()="Agregar cancha"]');
        await page.waitForTimeout(1000)
        await agregar_cancha(page)
        await page.getByLabel('LigaAñadir nueva cancha').getByRole('button', { name: 'Agregar cancha' }).click({ force: true });
        await page.pause()
    })

    test("Eliminar", async ({ page }) => {
        await page.pause()
        var borrar = page.locator('button:nth-child(2)').nth(2)
        await expect(borrar).toBeVisible()
        await borrar.click({ force: true })
        await page.getByRole('button', { name: 'Eliminar' }).click({ force: true })
        await page.waitForTimeout(2000)
        // await page.pause()
    })

    test("Editar", async ({ page }) => {
        await page.waitForTimeout(1000)
        await page.locator('button').nth(3).click()
        await page.waitForTimeout(1500)

        // Cambiar imagen
        var file = await page.locator('input[type="file"]')
        var imagen = 'C:/Users/E015/Downloads/cancha_editar.jpg'
        await file.setInputFiles(imagen)
        await page.waitForTimeout(1500)

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