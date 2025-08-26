import { test, expect } from '@playwright/test'
import { login, generar_curp } from './cuenta.spec'
import { fakerES_MX, faker } from '@faker-js/faker'

test("Cuenta", async ({  page }) => {
    await page.goto('http://localhost:3000/auth')
    await login(page)
    await page.pause()
})

test("Inicio", async ({ page }) => {
    await page.goto('http://localhost:3000/auth')
    await page.pause()
})

test("Otros", async ({ page }) => {
    for(var i = 0; i < 5; i++){
        var generarcurp = await generar_curp(page)
        console.log(generarcurp)
        console.log(generarcurp.length)
    }
})

test("Produccion", async ({ page }) => {
    await page.goto('https://caskr.app/auth')
    await page.getByTestId('inputCorreo').fill('4731001010')
    await page.getByTestId('inputPassword').fill('12345678')
    await page.pause()
    await page.getByTestId('crearCuenta').click()
    await page.waitForTimeout(2000)
    await page.getByRole('link', { name: 'Calendario' }).click()
    await page.getByRole('tab', { name: 'Todos los partidos' }).click({ force: true })
    await page.pause()
})

test("Datos", async ({ page }) => {
    for(var i = 0; i < 10; i++){
        console.log("Nombre: " + fakerES_MX.person.firstName() + " " + fakerES_MX.person.lastName())
        console.log("Número: " + faker.number.int({ min: 4790000000, max: 9999999999 }))
        console.log("Correo: " + fakerES_MX.internet.email())
    }
})