// Objetivo: Verificar que la tabla de posiciones se actualice correctamente al activar/desactivar equipos o al agregar un equipo en torneos de tipo Liga en modalidadFlexible.

import { login, Modalidad } from  '../cuenta.spec'
import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await login(page)
    await page.pause()
    await page.getByRole('link', { name: 'Mis torneos' }).click({ force: true })
    await page.getByRole('tab', { name: 'Torneos activos' }).waitFor({ state: 'visible' })
})

test("1. Liga", async ({ page }) => {
    await Functions(page, await page.getByRole('button', { name: 'Se parece a este' }).first(), "Liga")
})

test("2. Liga (ida y vuelta)", async ({ page }) => {
    await Functions(page, await page.getByRole('button', { name: 'Se parece a este' }).first(), "Liga (ida y vuelta)")
})

test("3. Liga Flexible", async ({ page }) => {
    await Functions(page, await page.getByRole('button', { name: 'Se parece a este' }).nth(1), "Liga")
})

test("4. Liga (ida y vuelta) Flexible", async ({ page }) => {
    await Functions(page, await page.getByRole('button', { name: 'Se parece a este' }).nth(1), "Liga (ida y vuelta)")
})

// --------------------------------------------------------------------

var p_team = 0 // Variable global para la cantidad de equipos

async function Functions(page: any, modalidad: any, formato: string) {
    await Modalidad(page, modalidad, 0, 10, formato) // Crear torneo

    // Desactivar 2 equipos
    var nombre = 'Equipos participantes'
    var active = await page.getByRole('tab', { name: nombre })
    await Active_Desactive(page, active, nombre, 'Activo')
    await Active_Desactive(page, active, nombre, 'Activo')
    
    console.log("")
    console.log("Creando el calendario")
    await Table_Mod(page, 0) // Verificar tabla de posiciones
    var initial_teams = await Calendar(page, formato, modalidad) // Crear calendario y obtener cantidad de equipos
    await Table_Mod(page, initial_teams) // Verificar tabla de posiciones

    console.log("")
    console.log("Al desactivar un equipo")
    // Desactivar un equipo
    await Active_Desactive(page, active, nombre, 'Activo') 
    p_team = await Participating_Teams(page)
    await Table_Mod(page, p_team) 
    
    console.log("")
    console.log("Al activar un equipo")
    // Activar equipo
    nombre = 'Equipos inactivos' 
    var desactive = await page.getByRole('tab', { name: nombre })
    await Active_Desactive(page, desactive, nombre, 'Inactivo')
    p_team = await Participating_Teams(page) 
    await Table_Mod(page, p_team)
    
    console.log("")
    console.log("Al agregar un equipo")
    // Agregar un equipo desde "Mis torneos"
    await Add_Team(page)
    p_team = await Participating_Teams(page)
    await Table_Mod(page, p_team)
}

async function Active_Desactive(page: any, team:any, nombre: string, estado: string) {
    await page.getByRole('link', { name: 'Equipos' }).click({ force: true })
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
    await page.getByRole('banner').getByRole('button').click({ force: true })
    await page.waitForTimeout(1000)
}

async function Table_Mod(page: any, team: number) {
    await page.getByRole('link', { name: 'Tabla de posiciones' }).click({ force: true })
    var tabla = await page.getByRole('tab', { name: 'Goleadores' })
    await tabla.waitFor({ state: 'visible' })
    await page.pause()
    var btn_pdf = await page.getByRole('link', { name: 'Descargar PDF' })
    var btn_pdf_visible = await btn_pdf.isVisible()

    if(btn_pdf_visible == true) {
        await Teams_Number(page, team)
    }
    else{
        console.log("No hay tabla de posiciones")
    }
}

async function Teams_Number(page: any, equipos: number) {
    var column = await page.locator('[role="gridcell"][col-id="pos"][aria-colindex="1"]')
    var count_col = await column.count()
    if(count_col > 0) {
        await column.nth(equipos - 1).hover()
    }

    if(count_col == equipos) {
        console.log("Columnas: " + count_col)
        console.log("Equipos: " + equipos)
    }
    else{
        console.log("Cantidad de equipos no coincide con cantidad en la tabla de posiciones")
        console.log("Columnas: " + count_col)
        console.log("Equipos: " + equipos)
    }
}

async function Add_Team(page: any) {
    await page.getByRole('link', { name: 'Mis torneos' }).click({ force: true })
    await page.getByRole('tab', { name: 'Torneos activos' }).waitFor({ state: 'visible' })
    var edit = await page.locator('role=row', { name: /^formal.*/ }).last().getByRole('button').nth(1)
    await edit.waitFor({ state: 'visible' })
    await edit.click({ force: true })
    var drawer = await page.locator('[aria-modal="true"][role="dialog"]:visible')
    await drawer.waitFor({ state: 'visible' })
    await page.getByRole('textbox', { name: 'Añade equipos al torneo' }).click({ force: true })
    var opciones = await page.locator('[data-combobox-option="true"][role="option"]:visible')
    await opciones.first().waitFor({ state: 'visible' })
    await opciones.first().click({ force: true })
    await drawer.click()
    await page.getByRole('button', { name: 'Guardar cambios' }).click({ force: true })
    await drawer.waitFor({ state: 'hidden' })
}

async function Calendar(page:any, formato: string, modalidad: string) {
    var count_teams = 0
    await page.getByRole('link', { name: 'Calendario' }).click({ force: true })

    if( formato == "Liga" || formato == "Liga (ida y vuelta)" && modalidad == "Flexible") {
        var jornada = await page.getByRole('button', { name: 'Nueva jornada' })
        await jornada.waitFor({ state: 'visible' })
        var teams = await page.locator('[data-truncate="end"]')
        await teams.first().waitFor({ state: 'visible' })
        count_teams = await teams.count()
        console.log(`Equipos iniciales: ${count_teams}`)
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
    return count_teams
}

async function Participating_Teams(page: any) {
    await page.getByRole('link', { name: 'Calendario' }).click({ force: true })
    var team = await page.locator('[data-truncate="end"]')
    await team.first().waitFor({ state: 'visible' })
    await page.pause()
    var count_team = await team.count()
    console.log(`Equipos participantes: ${count_team}`)
    return count_team
}