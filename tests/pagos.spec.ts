import { test } from '@playwright/test'
import { login } from './cuenta.spec'

test.beforeEach(async ({ page }) => {
    await login(page)
    await page.getByRole('link', { name: 'Mis pagos' }).click()
})

test.describe("Resumen", async() => { // Pendiente
    test("Addons", async ({ page }) => {
        await page.getByRole('tab', { name: 'Resumen' }).click()
        await page.getByRole('button', { name: 'Comprar elementos' }).click({ force: true })
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

        var radio = await page.locator('input[type="radio"]')
        var contar = await radio.count()
        console.log("Radios: " + contar)
        random = Math.floor(Math.random() * contar)
        await radio.nth(random).click()
        await page.locator('input[type="checkbox"]').check()
        await page.getByRole('button', { name: 'Pagar' }).click()
        await page.getByRole('button', { name: 'Continuar' }).click()
        await page.pause()
    })

    test("CancelarSub", async ({ page }) => { // Este ya está
        await page.getByRole('button', { name: 'Cambiar plan' }).click({ force: true })
        await page.getByRole('menuitem', { name: 'Administrar suscripción' }).click({ force: true })
        await page.getByRole('button', { name: 'Cancelar suscripción' }).click({ force: true })
        await page.getByPlaceholder('Selecciona un motivo').click({ force: true })
        var opciones = page.locator('[role="option"]')
        var count = await opciones.count()
        console.log(count)
        var random = Math.floor(Math.random() * count)
        await opciones.nth(random).click({force: true })
        await page.getByRole('button', { name: 'Cancelar la suscripción' }).click({ force: true })
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
    test("EliminarT", async ({ page }) => { // Este ya está
        await page.getByRole('tab', { name: 'Suscripción' }).click()
        await page.getByRole('button', { name: 'Eliminar' }).click({ force: true })
        await page.getByRole('button', { name: 'Sí, eliminar' }).click({ force: true })
    })

    test("PredeterminadaT", async ({ page }) => { // Este ya está
        await page.getByRole('tab', { name: 'Suscripción' }).click()
        await page.pause()
        var tarjetas = await page.locator('button', { hasText: new RegExp('\\*{4}\\d{4}') })
        var count = await tarjetas.count()
        console.log(count)
        var random = Math.floor(Math.random() * count)
        await tarjetas.nth(random).click({force: true })
        await page.getByRole('button', { name: 'Sí, estoy seguro' }).click({ force: true })
        await page.pause()
    })
})

