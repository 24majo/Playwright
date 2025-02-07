import { test, expect } from '@playwright/test';
import { login, agregar_cancha } from './cuenta.spec'
import { faker } from '@faker-js/faker'

test.describe("CaskrApp", async() => {
    test.beforeEach(async ({ page }) => {
        await login(page)
        await page.getByRole('link', { name: 'Canchas' }).click()
    })

    test("Agregar", async ({ page }) => {
        for(var i = 0; i < 4; i++){
            await page.click('//span[text()="Agregar cancha"]');
            await page.waitForTimeout(1000)
            await agregar_cancha(page)
            await page.getByLabel('LigaAñadir nueva cancha').getByRole('button', { name: 'Agregar cancha' }).click({ force: true });
            await page.pause()
        }
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
        await agregar_cancha(page)
        await page.getByRole('button', { name: 'Guardar cambios' }).click({ force: true })
        await page.pause()
    })
})