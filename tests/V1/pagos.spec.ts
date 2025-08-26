import { test } from '@playwright/test'
import { login } from './cuenta.spec'
import { stat } from 'fs'

var inicio, fin

test.beforeEach(async ({ page }) => {
    inicio = Date.now()
    await login(page)
    await page.locator('text=Inicio').waitFor({ state: 'visible' })
    fin = Date.now()
    console.log("Tiempo de inicio de sesión: " + (fin - inicio) + "ms")
    await page.getByRole('link', { name: 'Mis pagos' }).click()
})

test.describe("Resumen", async() => { 
    test("Addons", async ({ page }) => {
        await page.getByRole('tab', { name: 'Resumen' }).click()
        await page.getByRole('button', { name: 'Comprar elementos' }).click({ force: true })
        var addon = await page.getByRole('button', { name: 'Comprar' })
        await Random(addon)
        await Pagar({page})
        await page.pause()
    })

    test("CancelAddon", async ({ page }) => {
        await page.getByRole('tab', { name: 'Suscripción' }).click()
        var addon = page.locator('div').filter({ hasText: /^Addons/ }).getByRole('button')
        await Random(addon)
        await page.pause()
        await page.getByRole('button', { name: 'Si, continuar' }).click({ force: true })
        await page.pause()
    })

    test("Plan", async ({ page}) => { // Este ya está
        var planes = ["Plan Aficionado", "Plan Profesional", "Plan Clase Mundial"]
        var p_actual
        await page.getByRole('button', { name: 'Cambiar plan' }).click({ force: true })
        await page.getByRole('menuitem', { name: 'Cambiar plan' }).click({ force: true })
        await page.pause()
        for (var plan of planes) 
            p_actual = await page.locator(`text=${plan}`)
        
        await page.getByRole('button', { name: 'Cambiar plan' }).click({ force: true })

        if(p_actual == "Plan Aficionado"){
            var random = Math.floor(Math.random() * 2)
            await page.getByRole('button', { name: 'Cambiar Plan' }).nth(random).click({ force: true })
        }

        else 
            await page.getByRole('button', { name: 'Cambiar Plan' }).nth(1).click({ force: true })
    
        await page.getByRole('button', { name: 'Si, continuar' }).click({ force: true })
        await page.waitForTimeout(2000)
        
        var equipos = await page.getByText('Seleccionar los equipos').isVisible()
        var torneos = await page.getByText('Seleccionar los torneos').isVisible()
        
        if(equipos){
            await page.getByRole('button', { name: 'Continuar' }).click()
            await page.getByRole('button', { name: 'Si, continuar' }).click()
        }

        await page.waitForTimeout(1000)

        if(torneos){
            await page.getByRole('button', { name: 'Continuar' }).click()
            await page.getByRole('button', { name: 'Si, continuar' }).click()
        }

        await Pagar({page})
    })

    test("CancelarSub", async ({ page }) => { // Este ya está
        await page.getByRole('button', { name: 'Cambiar plan' }).click({ force: true })
        await page.getByRole('menuitem', { name: 'Administrar suscripción' }).click({ force: true })
        await page.getByRole('button', { name: 'Cancelar suscripción' }).click({ force: true })
        await page.getByPlaceholder('Selecciona un motivo').click({ force: true })
        var opciones = page.locator('[role="option"]')
        await Random(opciones)
        await page.getByRole('button', { name: 'Cancelar la suscripción' }).click({ force: true })
        var btn_c = page.getByRole('button', { name: 'Continuar' })
        inicio = Date.now()
        await btn_c.waitFor({ state: 'visible' })
        fin = Date.now()
        console.log("Tiempo de cancelación de suscripción: " + (fin - inicio) + "ms")
        await btn_c.click()
        await page.pause()
    })

    test("Factura", async ({ page }) => { 
        await page.getByRole('button', { name: 'Descargar última factura' }).click()
    })

    test("Historial", async ({ page }) => {
        await page.getByRole('button', { name: 'Ver historial' }).click()
    })
})

test.describe("Suscripcion", async() => {
    test("EliminarT", async ({ page }) => { 
        await page.getByRole('tab', { name: 'Suscripción' }).click()
        await page.locator('text=Suscripcion').waitFor({ state: 'visible' })
        await page.getByRole('button', { name: 'Eliminar' }).click({ force: true })
        await page.getByRole('button', { name: 'Sí, eliminar' }).click({ force: true })
        inicio = Date.now()
        var btn_con = page.getByRole('button', { name: 'Continuar'})
        await btn_con.waitFor({ state: 'visible' })
        fin = Date.now()
        console.log('Tiempo de eliminación de tarjeta: ' + (fin - inicio) + 'ms')
        await btn_con.click()
    })

    test("PredeterminadaT", async ({ page }) => {
        await page.getByRole('tab', { name: 'Suscripción' }).click()
        await page.locator('text=Suscripcion').waitFor({ state: 'visible' })
        var tarjetas = await page.locator('button', { hasText: new RegExp('\\*{4}\\d{4}') })
        await Random(tarjetas)
        await page.getByRole('button', { name: 'Sí, estoy seguro' }).click({ force: true })
        inicio = Date.now()
        var btn_con = page.getByRole('button', { name: 'Continuar'})
        await btn_con.waitFor({ state: 'visible' })
        fin = Date.now()
        console.log('Tiempo de eliminación de tarjeta: ' + (fin - inicio) + 'ms')
        await btn_con.click()
    })
})

async function Random(boton) {
    var count = await boton.count()
    console.log(count)
    var random = Math.floor(Math.random() * count)
    await boton.nth(random).click({force: true })
}

async function Pagar({ page }) {
    var radio = await page.locator('input[type="radio"]')
    var contar = await radio.count()
    console.log("Radios: " + contar)
    var random = Math.floor(Math.random() * contar)
    await radio.nth(random).click()
    await page.locator('input[type="checkbox"]').check()
    await page.getByRole('button', { name: 'Pagar' }).click()
    inicio = Date.now()
    var btn_con = page.getByRole('button', { name: 'Continuar' })
    await btn_con.waitFor({ state: 'visible' })
    fin = Date.now()
    console.log("Tiempo de compra de Plan o Addon: " + (fin - inicio) + "ms")
    await btn_con.click()
}