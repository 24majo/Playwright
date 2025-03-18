import { test } from '@playwright/test'
import { login } from './cuenta.spec'
import { fakerES_MX, faker } from '@faker-js/faker'

var inicio, fin

test.beforeEach(async ({ page }) => {
    await login(page)
    await page.getByRole('link', { name: 'Mis Cobros' }).click()
    
})

test("Registro", async ({ page }) => {
    await page.pause()
})

test.describe("Pestaña_P", async() => {
    test("Collections", async ({ page }) => {
        await page.getByRole('tab', { name: 'Productos' }).click({ force: true })
        inicio = Date.now()
        await page.locator('text=Productos').waitFor({ state: 'visible' })
        fin = Date.now()
        console.log("Tiempo de carga de elementos: " + (fin - inicio) + "ms")
        await page.pause()
        await page.getByRole('main').getByRole('button').filter({ hasText: /^$/ }).click()
        await page.getByRole('textbox', { name: 'Monto' }).fill(faker.number.int().toString())
        await page.getByRole('textbox', { name: 'Recurrencia' }).click()
        var opciones = page.locator('[data-combobox-option="true"][role="option"]:visible')
        await Random(opciones)
        await page.getByRole('button', { name: 'fecha de inicio' }).click()
        var fecha1 = new Date()
        var mes = fecha1.toLocaleString('en-EN', { month: 'long' }) 
        var fecha = [Math.floor(Math.random() * 28) + 1].toString() + " " + mes 
        await page.getByLabel(fecha).first().click({force: true})
        await page.getByRole('textbox', { name: '¿A quién va dirigido el cobro?' }).click()
        var opciones = page.locator('[data-combobox-option="true"][role="option"]:visible')
        await Random(opciones)
        await page.waitForTimeout(500)
        await page.getByRole('button', { name: 'Guardar' }).click({ force: true })
        inicio = Date.now()
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden'})
        fin = Date.now()
        console.log("Tiempo de carga para añadir productos: " + (fin - inicio) + "ms")
    })

    test("Productos", async ({ page }) => {
        await page.getByRole('tab', { name: 'Productos' }).click({ force: true })
        inicio = Date.now()
        await page.locator('text=Productos').waitFor({ state: 'visible' })
        fin = Date.now()
        console.log("Tiempo de carga de elementos: " + (fin - inicio) + "ms")
        await page.pause()
        await page.getByRole('button', { name: '+ Añadir nuevo producto' }).click()
        await page.getByPlaceholder('Ej. Arbitraje', { exact: true }).fill(fakerES_MX.word.words())
        await page.getByPlaceholder('Ej. Arbitraje de un partido').fill(fakerES_MX.lorem.lines(1))
        await page.getByPlaceholder('$600.00 + IVA + Comisión').fill(faker.number.bigInt().toString())
        await page.getByRole('textbox', { name: 'Recurrencia' }).click()
        var opciones = page.locator('[data-combobox-option="true"][role="option"]:visible')
        await Random(opciones)
        await page.getByRole('textbox', { name: 'Fecha de inicio de cobro' }).click()
        var fecha1 = new Date()
        var mes = fecha1.toLocaleString('en-EN', { month: 'long' }) 
        var fecha = [Math.floor(Math.random() * 28) + 1].toString() + " " + mes 
        await page.getByLabel(fecha).first().click({force: true})
        await page.getByRole('textbox', { name: '¿A quién va dirigido el cobro?' }).click()
        var opciones = page.locator('[data-combobox-option="true"][role="option"]:visible')
        await Random(opciones)
        await page.waitForTimeout(500)
        await page.getByRole('button', { name: 'Guardar' }).click({ force: true })
        inicio = Date.now()
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden'})
        fin = Date.now()
        console.log("Tiempo de carga para añadir productos: " + (fin - inicio) + "ms")
    })
})

async function Random(boton) {
    var count = await boton.count()
    var random = Math.floor(Math.random() * count)
    await boton.nth(random).click({force: true })
}