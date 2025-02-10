import { test, expect } from '@playwright/test'
import { fa, faker } from '@faker-js/faker'
import { login } from './cuenta.spec'
import { agregar_arbitro } from './cuenta.spec'

test.beforeEach(async ({ page }) => {
    await login(page)
    await page.getByRole('link', { name: 'Arbitros' }).click()
})

var nombre = faker.person.firstName()
var apellido = faker.person.lastName()

test("Agregar", async ({ page }) => {
    for(var i = 0; i < 2; i++) {
        await agregar_arbitro(page)
        await page.click('//span[text()="Agregar arbitro"]');
        await page.pause()
    }
})

test("Eliminar", async ({ page }) => {
    await page.pause()
    await page.locator('role=row[name=/@.+\..+$/]').locator('role=button').nth(1).click({ force: true })
    await page.locator('//button[text()="Sí, Eliminar"]').click({ force: true })
    //await page.pause()
})

test("Editar", async ({ page }) => {
    await page.pause()
    await page.locator('role=row[name=/@.+\..+$/]').locator('role=button').first().click({ force: true })
    await page.locator('//input[@name="nombres"]').nth(3).fill(faker.person.firstName())
    await page.locator('//input[@name="apellidos"]').nth(3).fill(faker.person.lastName())
    await page.locator('//input[@name="telefono"]').nth(3).fill(faker.number.int({ min: 1000000000, max: 9999999999 }).toString())
    await page.locator('//input[@name="email"]').nth(3).fill(faker.internet.email())
    await page.getByRole('button', { name: 'Guardar cambios' }).nth(3).click({ force: true })
    await page.pause()
})