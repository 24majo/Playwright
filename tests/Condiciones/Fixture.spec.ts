// Objetivo: Verifica que los elementos que puedan eliminar el Fixture generen
// o no un modal de advertencia de que el fixture será eliminado. Aplican ciertas
// condiciones de acuerdo con la modalidad y el formato del torneo.

import { test } from '@playwright/test'
import { login, Modalidad } from '../cuenta.spec'

test.beforeEach(async ({ page }) => {  
    await login(page)
    await page.pause()
    await page.getByRole('button', { name: 'Compartir Torneo' }).waitFor({ state: 'visible' })  
    await page.getByRole('link', { name: 'Mis torneos' }).click({ force: true })
    await page.getByRole('tab', { name: 'Torneos activos' }).waitFor({ state: 'visible' })
})

// -------------------------------- Formal --------------------------------

test("1. Liga Formal", async ({ page }) => {
    await Format(page, "Formal", 0, 9, "Liga")
})

test("2. Liga Formal (ida y vuelta)", async ({ page }) => {
    await Format(page, "Formal", 0, 9, "Liga (ida y vuelta)")
})

test("3. Eliminación directa Formal", async ({ page }) => {
    await Format(page, "Formal", 0, 9, "Eliminación directa")
})

test("4. Eliminación directa Formal (ida y vuelta)", async ({ page }) => {
    await Format(page, "Formal", 0, 9, "Eliminación directa (ida y vuelta)")
})

// -------------------------------- Flexible --------------------------------

test("5. Liga Flexible", async ({ page }) => {
    await Format(page, "Flexible", 0, 9, "Liga")
})

test("6. Liga Flexible (ida y vuelta)", async ({ page }) => {
    await Format(page, "Flexible", 0, 9, "Liga (ida y vuelta)")
})

test("7. Eliminación directa Flexible", async ({ page }) => {
    await Format(page, "Flexible", 0, 9, "Eliminación directa")
})

test("8. Eliminación directa Flexible (ida y vuelta)", async ({ page }) => {
    await Format(page, "Flexible", 0, 9, "Eliminación directa (ida y vuelta)")
})

// ---------------------------------------- Funciones ----------------------------------------

async function Format(page:any, modalidad: string, Group: number, equipos: number, formato: string) {
    var mod = ""
    if(modalidad == "Formal") {
        mod = await page.getByRole('button', { name: 'Se parece a este' }).first()
    }else{
        mod = await page.getByRole('button', { name: 'Se parece a este' }).nth(1)
    }

    await Modalidad( page, mod, Group, equipos, formato)
    await page.getByRole('tab', { name: 'Torneos activos' }).waitFor({ state: 'visible' })

    await teamDisabled(page) // Desactivar equipo
    await Calendar(page, formato, modalidad) // Crear el calendario
    await Teams(page)
    var nombre = 'Equipos participantes'
    var active = await page.getByRole('tab', { name: nombre })
    await Active_Desactive(page, active, '"Desactivar equipo"', nombre, 'Activo')
    nombre = 'Equipos inactivos' 
    var desactive = await page.getByRole('tab', { name: nombre })
    await Active_Desactive(page, desactive, '"Activar equipo"', nombre, 'Inactivo')
    
    var ipt_format = await page.locator('input[data-testid="selectFormatoCompetencia"]')
    await Tournament(page, ipt_format, '"Formato"')

    if(modalidad == "Formal") {
        var ipt_mod = await page.locator('input[placeholder="Ej. Formal, Flexible"]')
        await Tournament(page, ipt_mod, '"Modalidad"')
    }

    var select_equipo = await page.locator('input[placeholder="Selecciona los equipos"]')
    await Tournament(page, select_equipo, '"Seleccionar equipos"')
}

async function Calendar(page:any, formato: string, modalidad: string) {
    await page.getByRole('link', { name: 'Calendario' }).click({ force: true })

    if( formato == "Liga" || formato == "Liga (ida y vuelta)" && modalidad == "Flexible") {
        var jornada = await page.getByRole('button', { name: 'Nueva jornada' })
        await jornada.waitFor({ state: 'visible' })
        await jornada.click()
        await page.getByRole('menuitem', { name: 'Jornada regular' }).click()
        await page.getByRole('button', { name: 'Empezar a programar' }).click()
    }

    else{
        var cal = await page.getByRole('button', { name: 'Crear el calendario' })
        await cal.waitFor({ state: 'visible' })
        await cal.click({ force: true })
    }

    var tab = await page.getByRole('tab', { name: 'Calendario' })
    await tab.waitFor({ state: 'visible' })
    await tab.hover()
}

async function Tournament(page: any, elemento: any, mensaje: string) {
    await page.getByRole('link', { name: 'Mis torneos' }).click({ force: true })
    await page.getByRole('tab', { name: 'Torneos activos' }).waitFor({ state: 'visible' })
    var edit = await page.locator('role=row', { name: /^formal.*/ }).last().getByRole('button').nth(1)
    await edit.waitFor({ state: 'visible' })
    await edit.click({ force: true })
    var drawer = await page.locator('[aria-modal="true"][role="dialog"]:visible')
    await drawer.waitFor({ state: 'visible' })
    var disabled = await elemento.getAttribute('data-disabled')
    
    if (disabled) {
        console.log("Botón " + mensaje + " deshabilitado")
    }
    else {
        await page.pause()
        await elemento.click({ force: true })
        var opciones = await page.locator('[data-combobox-option="true"][role="option"]:visible')
        await opciones.first().waitFor({ state: 'visible' })
        await opciones.first().click({ force: true })
        await page.getByRole('button', { name: 'Guardar cambios' }).click({ force: true })
        await page.waitForTimeout(1000)
        var modal = await page.locator('[aria-modal="true"][role="dialog"]:visible').nth(1)
        await Modal(page, modal, mensaje)
    }
}

async function teamDisabled(page: any) {
    await page.getByRole('link', { name: 'Equipos' }).click({ force: true })
    var btn_equipo = await page.getByRole('button', { name: 'Agregar equipo' })
    await btn_equipo.waitFor({ state: 'visible' })
    var participantes = await page.getByLabel('Equipos participantes').innerText()
    var equipo = participantes.match(/Equipo \w+/g)
    var random = equipo![Math.floor(Math.random() * equipo!.length)]
    await page.getByRole('row', { name: new RegExp(`escudo ${random} .+`) }).getByRole('button').first().click({ force: true })
    await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible' })
    var check_active = await page.locator('div').filter({ hasText: /^Activo$/ }).locator('span').nth(1)
    await check_active.waitFor({ state: 'visible' })
    await page.waitForTimeout(1000)
    await check_active.click({ force: true })
    await page.getByRole('button', { name: 'Guardar cambios' }).click({ force: true })
    await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden' })
    
}

async function Teams(page: any) {
    await page.getByRole('link', { name: 'Equipos' }).click({ force: true })
    var btn_equipo = await page.getByRole('button', { name: 'Agregar equipo' })
    await btn_equipo.waitFor({ state: 'visible' })
    await btn_equipo.click({ force: true })
    await Modal(page, page.locator('[aria-modal="true"][role="dialog"]:visible'), '"Agregar equipo"')
}

async function Active_Desactive(page: any, team:any, mensaje: string, nombre: string, estado: string) {
    await team.waitFor({ state: 'visible' })
    await page.getByRole('link', { name: 'Equipos' }).click({ force: true })
    await team.waitFor({ state: 'visible' })
    await team.click({ force: true })
    var participantes = await page.getByLabel(nombre).innerText()
    var equipo = participantes.match(/Equipo \w+/g)
    var random = equipo![Math.floor(Math.random() * equipo!.length)]
    await page.getByRole('row', { name: new RegExp(`escudo ${random} .+`) }).getByRole('button').first().click({ force: true })
    await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible' })
    var check_active = await page.locator('div').filter({ hasText: new RegExp(`^${estado}$`, 'i') }).locator('span').nth(1)
    await check_active.waitFor({ state: 'visible' })
    await page.waitForTimeout(2000)
    await check_active.click({ force: true })
    await page.getByRole('button', { name: 'Guardar cambios' }).click({ force: true })


    Modal(page, page.locator('[aria-modal="true"][role="dialog"]:visible').nth(1), mensaje)
    await page.getByRole('banner').getByRole('button').click({ force: true })
    await page.waitForTimeout(1000)
}

async function Modal(page: any, modal: any, mensaje: string){
    await page.waitForTimeout(1000)
    var modal_visible = await modal.isVisible()
    
    if (modal_visible === true) {
        var message = page.getByText('Esta acción eliminará tu')
        var msgVisible = await message.isVisible()
        if(msgVisible === true) {
            console.log("Modal de " + mensaje + " visible")
            var button = await page.getByRole('button', { name: 'No actualizar' })
            if( await button.isVisible() ) {
                await button.click({ force: true })
            }
            else{
                await page.getByRole('button', { name: 'No, Cancelar' }).click({ force: true })
            }
            await modal.waitFor({ state: 'hidden' })
        }
    } 
    else {
        console.log("Modal de " + mensaje + " no visible")
    }
}


