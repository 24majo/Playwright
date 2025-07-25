// Pruebas E2E para la modalidad Flexible
// Validar el funcionamiento de las diferentes modalidades, las especificaciones para generar un calendario, las condiciones de programación de partidos y los resultados.

import { test } from '@playwright/test'
import { login, Modalidad, programar_partido, registrar_resultado } from '../cuenta.spec'

var mod: any
var count_v = 10
var count_l: any

test.beforeEach(async ({ page }) => {
    await login(page)
    await page.getByRole('link', { name: 'Mis Torneos' }).click()
    mod = await page.getByRole('button', { name: 'Se parece a este' }).nth(1)
})  

test("1. Liga", async ({ page }) => {
    await page.pause()
    await Modalidad(page, mod, 0, 13, "Liga")
    await Fixture(page, "Liga")
    var btn_registrar = page.getByRole('row', { name: new RegExp(`.+ Registrar`)}).getByRole('button')
    await Results(page, btn_registrar)
})

test("2. Liga (ida y vuelta)", async ({ page }) => {
    await page.pause()
    await Modalidad(page, mod, 0, 6, "Liga (ida y vuelta)")
    await Fixture(page, "Liga (ida y vuelta)")
    var btn_registrar = page.getByRole('row', { name: new RegExp(`.+ Registrar`)}).getByRole('button')
    await Results(page, btn_registrar)
})

test("3. Eliminación directa", async ({ page }) => {
    await page.pause()
    await Modalidad(page, mod, 0, 8, "Eliminación directa")
    await Fixture(page, "Eliminación directa")
    var btn_registrar = page.getByRole('button', { name: 'Registrar' })
    await Results(page, btn_registrar)
})

test("4. Eliminación directa (ida y vuelta)", async ({ page }) => {
    await page.pause()
    await Modalidad(page, mod, 0, 8, "Eliminación directa (ida y vuelta)")
    await Fixture(page, "Eliminación directa (ida y vuelta)")
})

// ------------------------------------------------------------------------------------------

async function Fixture(page: any, modalidad: any){
    await page.getByRole('link', { name: 'Calendario' }).click({ force: true })
    
    if(modalidad == "Liga" || modalidad == "Liga (ida y vuelta)"){
        var jornada = await page.getByRole('button', { name: 'Nueva jornada' })
        await jornada.waitFor({ state: 'visible' })
        await jornada.click()
        await page.getByRole('menuitem', { name: 'Jornada regular' }).click()
        await page.getByRole('button', { name: 'Empezar a programar' }).click()
        await Programar(page, modalidad)
    }

    else {
        var calendario = await page.getByRole('button', { name: 'Crear el calendario' })
        await calendario.waitFor({ state: 'visible' })
        await page.waitForTimeout(1000)
        await calendario.click({ force: true })
        await Programar(page, modalidad)
    }

    var partidos = await page.getByRole('tab', { name: 'Todos los partidos' })
    await partidos.waitFor({ state: 'visible' })
}

async function Programar(page: any, modalidad: any) {
    if(modalidad == "Liga" || modalidad == "Liga (ida y vuelta)"){
        while(count_v > 2){
            await page.getByRole('tab', { name: 'Por jornadas' }).click()
            var agregar = await page.getByRole('button', { name: 'Agregar partido' })
            await agregar.waitFor({ state: 'visible' })
            await agregar.click()
            await Teams(page, modalidad)
        }

        await page.pause()
    }

    else {
        await page.getByRole('tab', { name: 'Por rondas' }).click()
        var btn_program = page.getByRole('button', { name: 'Programar partido' })
        await btn_program.nth(0).waitFor({ state: 'visible' })
        var count = await btn_program.count()

        for(var i = 0; i < count; i++){
            await btn_program.nth(i).click({ force: true })
            await Teams(page, modalidad)
        }

        var terminar = await page.getByRole('button', { name: 'Terminar programación' })
        await terminar.click()
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible'})
        await page.pause()
        await page.getByRole('button', { name: '¡Lo entiendo!' }).click()
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden'})
        await page.pause()
    }
}

// ---------------------------------------------------------------------------------

// Función para seleccionar equipos locales y visitantes
async function Teams(page: any, modalidad: any) {
    await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible'})
    await page.getByRole('textbox', { name: 'Selecciona equipo local' }).click()
    var data_local = await page.locator('[data-combobox-option="true"][role="option"]:visible')
    count_l = await data_local.count()
    await data_local.nth(0).click()
    await page.getByRole('textbox', { name: 'Selecciona equipo visitante' }).click()
    var data_visitante = await page.locator('[data-combobox-option="true"][role="option"]:visible')
    count_v = await data_visitante.count()
    await data_visitante.nth(0).click()
    
    if(modalidad == "Liga (ida y vuelta)" || modalidad == "Liga")
        await page.locator('form').getByRole('button').filter({ hasText: /^$/ }).click()
    
    await programar_partido(page, 1)
    await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden'})
}

async function Results(page: any, btn_registrar: any) {
    await page.getByRole('link', { name: 'Resultados' }).click({ force: true })
    await btn_registrar.nth(0).waitFor({ state: 'visible' })
    await registrar_resultado (page, btn_registrar)
    await page.pause()
}