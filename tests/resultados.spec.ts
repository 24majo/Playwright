import { test, expect } from '@playwright/test';

test.beforeEach("Inicios de sesión", async ({ page }) => {
    await page.goto('http://localhost:3000/auth');
    await page.getByTestId('inputCorreo').fill('majo90@prueba.com');
    await page.getByTestId('inputPassword').fill('12345678');
    await page.getByTestId('crearCuenta').click();
    await page.getByRole('link', { name: 'Resultados' }).click();
})

test("Resultados", async ({ page }) => {
    await page.pause()

    var registrar = page.getByRole('row', { name: new RegExp(`.+ Registrar`)}).getByRole('button').first()
    var button = await registrar.getAttribute('data-disabled')

    while (!button){

    }
    
    await registrar.click()
    var random = Math.floor(Math.random() * 10).toString()
    await page.locator('input[name="puntos_local"]').fill(random)
    random = Math.floor(Math.random() * 10).toString()
    await page.locator('input[name="puntos_visitante"]').fill(random)
    await page.getByRole('button', { name: 'Guardar' }).click({ force: true })
    await page.pause()
})

test("Editar", async({ page }) => {
    await page.pause()
    await page.getByRole('row', { name: new RegExp(`Equipo \\d Equipo local .+`)}).getByRole('button').click()
    await page.pause()
})