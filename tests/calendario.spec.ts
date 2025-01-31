import { test, expect } from '@playwright/test';
import { fa, faker } from '@faker-js/faker'
import { login } from './cuenta.spec'

test.describe("CaskrApp", async() => {
    
    test.beforeEach(async ({ page }) => {
        await login(page)
    })

    test("Generar", async ({ page }) => {
        // Caso 1: Generar calendario cumpliendo con los requisitos del torneo
        // Caso 2: Opción inhabilitada por falta de equipos

        await page.pause()
        var boton = page.getByRole('button', { name: 'Crear el calendario' })
        var visible = await boton.isVisible()
        console.log("Boton visible: " + visible)

        if(visible){
            var disponible = await boton.getAttribute('data-disabled')
            console.log(disponible)

            if(disponible){
                console.log("Caso 2")
                process.exit(0); // 0 sin errores, 1 con error
            }

            if(disponible == null){
                console.log("Caso 1")
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

        for(var i = 3; i <= j_num; i++){
            await page.getByRole('tab', { name: new RegExp(`J - ${i}`)}).first().click({ force: true })
            
            // Programar partido
            await page.getByRole('button', { name: 'Programar' }).nth(1).click({ force: true })
            await page.waitForTimeout(1000)
            Agregar({ page })
            await page.pause()
        }
        await page.pause()

    })

    test("Todos", async ({ page }) => {
        await page.getByRole('tab', { name: 'Todos los partidos' }).click({ force: true })
        var boton = page.getByRole('row', { name: new RegExp(`.+ NO PROGRAMADO .+`) }).getByRole('button').first()
        var visible = await boton.isHidden()
        console.log(visible)

        if(visible){ // En caso de que la primera pestaña tenga todos los partidos agendados, ir a la siguiente página
            var flecha = page.getByLabel('Next Page')
            var activa = await flecha.getAttribute('aria-disabled')
            console.log(activa)

            if(activa){ // Ir a la siguiente página disponible
                await flecha.click()
                visible = await boton.first().isHidden()
                console.log(visible)

                if(!visible){ // Hay partidos por programar en la siguiente pestaña
                    boton.click({ force: true })
                    Agregar({ page })
                }
                await page.pause()
            }

            else{
                console.log('Todos los partidos están programados')
                process.exit(0)
            }

            await page.pause()
        }
        else{
            boton.click({ force: true })
            Agregar({ page })
        }
        
        // await boton.first().click()
        // Agregar({ page })
        //await page.pause()
    })

    
})

async function Agregar({ page }){
    await page.getByLabel('día').click({ force: true })
    await page.waitForTimeout(1000)
    var fecha = [Math.floor(1 + Math.random() * 25)].toString() + ' enero'
    console.log(fecha)
    await page.getByRole('cell', { name: fecha }).first().click({ force: true })
    await page.waitForTimeout(1000)
    var hora = [Math.floor(10 + Math.random() * 15)]
    var minuto = [Math.floor(10 + Math.random() * 48)]
    console.log("Hora: " + hora + ":" + minuto)
    await page.locator('input[type="time"]').fill(hora + ':' + minuto)
    await page.waitForTimeout(1000)
    await page.getByPlaceholder('Selecciona la cancha').click({ force: true })
    await page.waitForTimeout(1000)
    
    var cancha = await page.getByRole('option', { name: new RegExp(`Cancha `) })
    var n_cancha = await cancha.count()
    console.log("Canchas: " + n_cancha)
    var random = Math.floor(Math.random() * n_cancha - 1)
    await cancha.nth(random).click()
    await page.waitForTimeout(1000)

    await page.getByPlaceholder('Selecciona al árbitro').click({ force: true })
    await page.waitForTimeout(1000)
    for(var y = 0; y < random; y++){
        await page.getByPlaceholder('Selecciona al árbitro').press('ArrowDown')
        await page.waitForTimeout(1000)
    }
    await page.getByPlaceholder('Selecciona al árbitro').press('Enter')
    await page.waitForTimeout(1000)
    await page.getByRole('button', { name: 'Guardar y enviar', exact: false }).click({ force: true })
    await page.waitForTimeout(1000)
    await page.getByRole('button', { name: 'Si, envíales el mensaje' }).click({ force: true })
    await page.waitForTimeout(1000)
    await page.getByLabel('LigaProgramar partido —').getByRole('button').click({ force: true })
}