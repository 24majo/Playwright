import { test } from '@playwright/test'
import { login, programar_partido } from './cuenta.spec'

var inicio, fin

test.beforeEach(async ({ page }) => {
    await login(page)
    await page.getByRole('link', { name: 'Calendario' }).click()
})

test("Generar", async ({ page }) => {
    // Caso 1: Generar calendario cumpliendo con los requisitos del torneo
    // Caso 2: Opción inhabilitada por de requisitos
    var boton = page.getByRole('button', { name: 'Crear el calendario' })
    await boton.waitFor()
    var visible = await boton.isVisible()
    console.log("Boton visible: " + visible)

    if(visible){
        var disponible = await boton.getAttribute('data-disabled')
        console.log("Deshabilitado: " + disponible)
        await page.waitForTimeout(500)

        if(disponible){
            console.log("Caso 2: Opción inhabilitada por falta de equipos")
            process.exit(0)
        }

        if(disponible == null){
            console.log("Caso 1: Generar calendario cumpliendo con los requisitos del torneo")
            await boton.click({ force: true })
            inicio = Date.now()
            await page.getByRole('tab', { name: 'Por jornadas' }).waitFor({ state: 'visible' })
            fin = Date.now()
            console.log("Tiempo de generación de calendario: " + (fin - inicio) + "ms")
            
        }
    }
})

test("Jornada", async({ page }) => {
    await page.getByRole('tab', { name: 'Por jornadas' }).click({ force: true })
    await page.locator('text=Jornadas').nth(1).waitFor({ state: 'visible' })
    var j_num = await page.getByRole('tab', { name: 'J - ', exact: false }).count()
    console.log("Jornadas: " + j_num)

    for(var i = 1; i <= j_num; i++){
        console.log("Jornada: " + i)
        var btn_j = page.getByRole('tab', { name: new RegExp(`J - ${i}`)}).first()
        await btn_j.waitFor({ state: 'visible' })
        await btn_j.click({ force: true })
        var programar = page.getByRole('button', { name: 'Programar' })
        var count = await programar.count()
        console.log("Botones totales: " + count)

        for(var j = 1; j <= count; j++) {
            console.log("Botón: " + j)
            await page.getByRole('button', { name: 'Programar' }).nth(j - 1).click({ force: true })
            await (page)
            if(j != count){
                await page.getByRole('tab', { name: new RegExp(`J - ${i}`)}).first().click({ force: true })
                await page.waitForTimeout(1000)
            }
        }
    }
})

test("Rondas", async ({ page }) => {
    await page.pause()
    await page.getByRole('tab', { name: 'Por rondas' }).click({ force: true })
    var btn_program = page.getByRole('button', { name: 'Programar partido' })
    var count = await btn_program.count()
    console.log("Btn Programar: " + count)

    for(var i = 0; i <= count; i++){
        await btn_program.nth(i).click({ force: true })
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible'})
        await page.waitForTimeout(1000)
        await programar_partido(page)
    }
    await page.pause()
})

test("Flex_Regular", async ({ page }) => {
    await page.pause()
    // await page.getByRole('button', { name: 'Nueva jornada' }).click()
    // await page.getByRole('menuitem', { name: 'Jornada regular' }).click()
    // await page.getByRole('button', { name: 'Empezar a programar' }).click()
    await page.getByRole('tab', { name: 'Por jornadas' }).click()
    await page.getByRole('button', { name: 'Agregar partido' }).click()
    await page.getByRole('textbox', { name: 'Selecciona equipo local' }).click()
    var local = page.locator('[data-combobox-option="true"][role="option"]:visible')
    var count_l = await local.count()
    console.log("Contador local: " + count_l)
    var count_v = count_l-2
    console.log("Contador visitante: " + count_v)
    for(var i = 0; i < count_l/2; i++){
        await local.nth(i).click()
        await page.getByRole('textbox', { name: 'Selecciona equipo visitante' }).click()
        var visitante = page.locator('[data-combobox-option="true"][role="option"]:visible')
        var count_vis = await visitante.count()
        console.log(count_vis)
        await visitante.nth(count_v).click()
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible'})
        await page.waitForTimeout(1000)
        await page.locator('form').getByRole('button').filter({ hasText: /^$/ }).click()
        await programar_partido(page)
        count_v--
        console.log("Contador visitante actualizado: " + count_v)
        await page.getByRole('button', { name: 'Agregar partido' }).click()
        await page.getByRole('textbox', { name: 'Selecciona equipo local' }).click()
        await page.pause()
    }
})

test("Flex_Eliminacion", async ({ page }) => {
    await page.getByRole('button', { name: 'Nueva jornada' }).click()
    await page.getByRole('menuitem', { name: 'Eliminación directa' }).click()
    await page.getByRole('textbox', { name: '¿Cúantos equipos quieres' }).fill('4')
    await page.getByRole('radio', { name: 'ida', exact: true }).click()
    // await page.getByRole('radio', { name: 'ida y vuelta' }).click()
    await page.getByRole('button', { name: 'Empezar a programar' }).click()
    await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible'})
    await page.getByRole('button', { name: 'Si, continuar' }).click()
    await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden'})
    await page.getByRole('tab', { name: 'Por rondas' }).click()
    var programar = page.locator('div').filter({ hasText: `.+Programar partido.+` }).getByRole('button')
    var count_p = await programar.count()

    // for(var i = 0; i < count_p; i++){
    //     await programar.click(i)
    // }
    await page.pause()
})

test("Todos", async ({ page }) => {
    // Caso 1: Agendar partidos
    // Caso 2: Agendar partidos en las siguientes pestañas
    // Caso 3: No hay más partidos por agendar 
    await page.pause()
    await page.getByRole('tab', { name: 'Todos los partidos' }).click({ force: true })
    await page.locator('[placeholder="Busqueda general"]').waitFor({ state: 'visible' })
    var boton = page.getByRole('row', { name: new RegExp(`.+ NO PROGRAMADO .+`) }).getByRole('button').first()
    await page.pause()
    var visible = await boton.isHidden()
    console.log("Botón programar oculto: " + visible)

    while(!visible){
        boton.click({ force: true })
        await boton.waitFor({ state: 'visible'})
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible'})
        await page.waitForTimeout(1000)
        await programar_partido(page)
        var visible = await boton.isHidden()
    }

    if(visible){
        var flecha = await page.locator('[aria-label="Next Page"]')
        var activa = await flecha.getAttribute('aria-disabled')
        console.log("Flecha siguiente: " + activa)

        if(activa){ // Ir a la siguiente página disponible
            console.log("Caso 2")
            await flecha.click()
            visible = await boton.first().isHidden()
            console.log(visible)

            while(!visible){ // Hay partidos por programar en la siguiente pestaña
                boton.click({ force: true })
                await boton.waitFor({ state: 'visible'})
                await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible'})
                await page.waitForTimeout(1000)
                await programar_partido(page)
                var visible = await boton.isHidden()
            }
        }
        
        else{
            console.log('Caso 3')
            process.exit(0)
        }
    }
})

//------------------------------------------------------------------

async function Random(boton) {
    var count = await boton.count()
    var random = Math.floor(Math.random() * count)
    await boton.nth(random).click({force: true })
}