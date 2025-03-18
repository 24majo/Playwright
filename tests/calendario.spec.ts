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
            await programar_partido(page)
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
        await programar_partido(page)
    }
    await page.pause()
})

test("Todos", async ({ page }) => {
    // Caso 1: Agendar partidos
    // Caso 2: Agendar partidos en las siguientes pestañas
    // Caso 3: No hay más partidos por agendar 
    await page.locator('text=Calendario').waitFor({ state: 'visible' })
    await page.getByRole('tab', { name: 'Todos los partidos' }).click({ force: true })
    await page.locator('[placeholder="Busqueda general"]').waitFor({ state: 'visible' })
    var boton = page.getByRole('row', { name: new RegExp(`.+ NO PROGRAMADO .+`) }).getByRole('button').first()
    await page.pause()
    var visible = await boton.isHidden()
    console.log("Botón programar oculto: " + visible)

    while(!visible){
        boton.click({ force: true })
        await boton.waitFor({ state: 'visible'})
        await programar_partido(page)
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
                await page.waitForTimeout(1000)
                await programar_partido(page)
            }
        }
        else{
            console.log('Caso 3')
            process.exit(0)
        }
    }
})

test("Liguilla", async ({ page }) => {
    await page.getByRole('button', { name: 'Vamos' }).click({ force: true })
    await page.getByRole('button', { name: 'Continuar' }).click({ force: true })
})