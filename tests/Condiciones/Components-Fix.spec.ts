// Descripción:
// Visualiza los elementos que deben de aparecer en el caso de que un fixture
// se haya creado y la diferencia con respecto a cuando se elimina

import { test } from "@playwright/test"
import { login, Modalidad } from "../cuenta.spec"

test.beforeEach(async ({ page }) => {
    await login(page)
    await page.pause()
    await page.getByRole('button', { name: 'Compartir Torneo' }).waitFor({ state: 'visible' })
    await page.getByRole('link', { name: 'Mis torneos' }).click({ force: true })
    await page.getByRole('tab', { name: 'Torneos activos' }).waitFor({ state: 'visible' })
})

test("1. Liga", async ({ page }) => {
    await Tournament(page, "Formal", 0, 9, "Liga")
})

test("2. Liga (ida y vuelta)", async ({ page }) => {
    await Tournament(page, "Formal", 0, 9, "Liga (ida y vuelta)")
})

test("3. Eliminación directa", async ({ page }) => {
    await Tournament(page, "Formal", 0, 8, "Eliminación directa")
})  

test("4. Eliminación directa (ida y vuelta)", async ({ page }) => {
    await Tournament(page, "Formal", 0, 8, "Eliminación directa (ida y vuelta)")
})  

test("5. Grupos", async ({ page }) => {
    await Tournament(page, "Formal", 1, 8, "Grupos")
})

// -------------------------------- Funciones --------------------------------

async function Tournament(page: any, modalidad: string, Group: number, equipos: number, formato: string) {
    var mod = ""
    if (modalidad == "Formal") {
        mod = await page.getByRole('button', { name: 'Se parece a este' }).first()
    } else {
        mod = await page.getByRole('button', { name: 'Se parece a este' }).nth(1)
    }

    await Modalidad(page, mod, Group, equipos, formato)
    await page.getByRole('tab', { name: 'Torneos activos' }).waitFor({ state: 'visible' })
    
    console.log("")
    console.log("Al crear el torneo")
    await Elements(page, formato)

    console.log("")
    console.log("Al crear el fixture")
    await Calendar(page, formato)
    await Elements(page, formato)

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
    var accept = await page.getByRole('button', { name: 'Sí, actualizar' })
    await accept.waitFor({ state: 'visible' })
    await accept.click({ force: true })
    await page.locator('[aria-modal="true"][role="dialog"]:visible').nth(0).waitFor({ state: 'hidden' })

    console.log("")
    console.log("Al eliminar el fixture")
    await Elements(page, formato)
    await page.pause()
}

async function Calendar(page: any, formato: string) {
    var tab
    await page.getByRole('link', { name: 'Calendario' }).click({ force: true })
    var cal = await page.getByRole('button', { name: 'Crear el calendario' })
    await page.getByRole('img', { name: 'Silbato' }).waitFor({ state: 'visible' })
    await page.waitForTimeout(1000)
    await cal.click({ force: true })

    if(formato == "Grupos") {
        await page.getByRole('button', { name: 'Si, continuar' }).click({ force: true })
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden' })
    }

    var tab = await page.getByRole('tab', { name: 'Calendario' })
    await tab.waitFor({ state: 'visible' })
    await tab.hover()
}

async function Elements(page: any, formato: string) {
    var btn_res: any
    await page.getByRole('link', { name: 'Resultados' }).click({ force: true })
    await page.waitForTimeout(2000)

    if(formato == "Liga" || formato == "Liga (ida y vuelta)") {
        var res = await page.getByRole('tab', { name: 'Resultados' })
        await res.waitFor({ state: 'visible' })
        btn_res = await page.getByRole('row', { name: new RegExp(`.+ Registrar`)}).nth(0).getByRole('button')
        await elementsVisible(page, btn_res, "Registrar")

        await page.getByRole('link', { name: 'Tabla de posiciones' }).click({ force: true })
        var tabla = await page.getByRole('tab', { name: 'Goleadores' })
        await tabla.waitFor({ state: 'visible' })
        await page.waitForTimeout(5000)
        var btn_pdf = await page.getByRole('link', { name: 'Descargar PDF' })
        await elementsVisible(page, btn_pdf, "Descargar PDF")
    }

    if(formato == "Eliminación directa" || formato == "Eliminación directa (ida y vuelta)") {
        var msg = await page.getByText('Antes genera un calendario')
        var msg_visible = await msg.isVisible()
        // console.log("Mensaje visible: " + msg_visible)

        if (msg_visible === true) {  
            if(formato == "Eliminación directa") {
                btn_res = await page.getByRole('button', { name: 'Registrar' }).nth(0)
            } else {
                btn_res = await page.getByRole('button', { name: 'Registrar Ida' }).nth(0)
            }
        }
        else{
            var rnd = await page.getByText('Ronda')
            await rnd.waitFor({ state: 'visible' })
            if(formato == "Eliminación directa") {
                btn_res = await page.getByRole('button', { name: 'Registrar' }).nth(0)
            } else {
                btn_res = await page.getByRole('button', { name: 'Registrar Ida' }).nth(0)  
            }
        }
        await elementsVisible(page, btn_res, "Registrar")
    }

    if(formato == "Grupos") {
        await page.pause()
        var res = await page.getByRole('tab', { name: 'Resultados' })
        await res.waitFor({ state: 'visible' })
        var msg = await page.getByText('Antes genera un calendario')
        var msg_visible = await msg.isVisible()
        if (msg_visible === true) {  
            var group = await page.getByText('Grupo A')
        }
        else{
            var group = await page.getByText('Grupo A')
        }
        await elementsVisible(page, group, "Registrar")

        await page.getByRole('link', { name: 'Inicio' }).click({ force: true })
        await page.getByRole('button', { name: 'Compartir Torneo' }).waitFor({ state: 'visible' })
        var btn_group = await page.getByRole('button', { name: 'Eliminar Grupos' })
        await elementsVisible(page, btn_group, "Eliminar Grupos")

        var btn_create = await page.getByRole('button', { name: 'Crear Grupos' })
        await elementsVisible(page, btn_create, "Crear Grupos")

        await page.getByRole('link', { name: 'Tabla de posiciones' }).click({ force: true })
        await page.getByRole('tab', { name: 'Grupos' }).waitFor({ state: 'visible' })
        var group = await page.getByText('Grupo A')
        await elementsVisible(page, group, "Registrar")
    }
}

async function elementsVisible(page: any, element: any, nombre: string) {
    var isVisible = await element.isVisible()
    if (isVisible) {
        console.log(`Botón ${nombre} está visible.`)
    }
    else {
        console.log(`Botón ${nombre} no está visible.`)
    }
}