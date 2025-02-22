import { test } from '@playwright/test'
import { en, faker } from '@faker-js/faker'
import { login, programar_partido } from './cuenta.spec'

test.beforeEach(async ({ page }) => {
    await login(page)
    await page.getByRole('link', { name: 'Calendario' }).click()
})

test("Generar", async ({ page }) => {
    // Caso 1: Generar calendario cumpliendo con los requisitos del torneo
    // Caso 2: Opción inhabilitada por de requisitos

    await page.pause()
    var boton = page.getByRole('button', { name: 'Crear el calendario' })
    var visible = await boton.isVisible()
    console.log("Boton visible: " + visible)

    if(visible){
        var disponible = await boton.getAttribute('data-disabled')
        console.log(disponible)

        if(disponible){
            console.log("Caso 2: Opción inhabilitada por falta de equipos")
            process.exit(0)
        }

        if(disponible == null){
            console.log("Caso 1: Generar calendario cumpliendo con los requisitos del torneo")
            await page.getByRole('button', { name: 'Crear el calendario' }).click({ force: true })
            await page.getByRole('link', { name: 'Calendario' }).click({ force: true });
            await page.pause()
        }
    }
})

test("Jornada", async({ page }) => {
    await page.pause()
    await page.getByRole('tab', { name: 'Por jornadas' }).click({ force: true })
    var j_num = await page.getByRole('tab', { name: 'J - ', exact: false }).count()
    console.log("Jornadas: " + j_num)

    for(var i = 1; i <= j_num; i++){
        console.log("Jornada: " + i)
        await page.getByRole('tab', { name: new RegExp(`J - ${i}`)}).first().click({ force: true })
        var programar = page.getByRole('button', { name: 'Programar' })
        var count = await programar.count()
        console.log("Botones totales: " + count)

        for(var j = 1; j <= count; j++) {
            console.log("Botón: " + j)
            await page.getByRole('button', { name: 'Programar' }).nth(j - 1).click({ force: true })
            //await page.getByRole('button', { name: 'Programar' }).first().click({ force: true })
            await programar_partido(page)
            if(j != count){
                await page.getByRole('tab', { name: new RegExp(`J - ${i}`)}).first().click({ force: true })
                await page.waitForTimeout(1000)
            }
        }
    }
    await page.pause()
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
    await page.getByRole('tab', { name: 'Todos los partidos' }).click({ force: true })
    await page.pause()
    var boton = page.getByRole('row', { name: new RegExp(`.+ NO PROGRAMADO .+`) }).getByRole('button').first()
    var visible = await boton.isHidden()
    console.log("Botón programar oculto: " + visible)
    await page.waitForTimeout(1000)

    while(!visible){
        boton.click({ force: true })
        await page.waitForTimeout(1000)
        await programar_partido(page)
    }

    if(visible){ // En caso de que la primera pestaña tenga todos los partidos agendados, ir a la siguiente página si está disponible
        var flecha = await page.locator('[aria-label="Next Page"]')
        var activa = await flecha.getAttribute('aria-disabled')
        console.log("Flecha siguiente: " + activa)
        await page.pause()

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
            await page.pause()
        }

        else{
            console.log('Caso 3')
            process.exit(0)
        }

        await page.pause()
    }
})

test("Liguilla", async ({ page }) => {
    await page.getByRole('button', { name: 'Vamos' }).click({ force: true })
    await page.getByRole('button', { name: 'Continuar' }).click({ force: true })
})