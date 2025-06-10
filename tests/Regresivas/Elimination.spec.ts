// Validar que, en torneos de formato Eliminación directa e Ida y vuelta, en modalidades 
// Formal y Flexible, se aplique correctamente el límite de 16 equipos por torneo, y que 
// los elementos de UI para gestión de equipos reaccionen adecuadamente antes y después 
// de finalizar su creación.

import { test, expect } from '@playwright/test'
import { login } from "../cuenta.spec";

var inicio:any, fin:any
test.beforeEach(async ({ page }) => {
    await login(page)
    await page.pause()
    await page.getByRole('link', { name: 'Mis torneos' }).click({ force: true })
    await page.getByRole('tab', { name: 'Torneos activos' }).waitFor({ state: 'visible' })
})

// ----------------------- Test de Torneos modalidad Formal -------------------------

test("1. Formal Eliminación seleccion previa", async ({ page }) => {
    var mod = await page.getByRole('button', { name: 'Se parece a este' }).first()
    await Seleccion(page, mod, "Eliminación directa")
})

test("2. Formal Eliminación seleccion de equipos en torneos", async ({ page }) => {
    var mod = await page.getByRole('button', { name: 'Se parece a este' }).first()
    var equipo = 7
    await TeamTournament( page, mod, equipo, "Eliminación directa")
})

test("3. Formal Eliminación agregar nuevo equipo", async ({ page }) => {
    // Pendiente de implementar
})

test("4. Eliminación vuelta seleccion previa", async ({ page }) => {
    var mod = await page.getByRole('button', { name: 'Se parece a este' }).first()
    await Seleccion(page, mod, "Eliminación directa (ida y vuelta)")
})

test("5. Eliminación vuelta seleccion de equipos en torneos", async ({ page }) => {
    var mod = await page.getByRole('button', { name: 'Se parece a este' }).first()
    var equipo = 7
    await TeamTournament( page, mod, equipo, "Eliminación directa (ida y vuelta)")
})

test("6. Eliminación vuelta agregar nuevo equipo", async ({ page }) => {
    // Pendiente de implementar
})

// --------------------- Test de Torneos modalidad Flexible -------------------------

test("7. Flexible Eliminación seleccion previa", async ({ page }) => {
    var mod = await page.getByRole('button', { name: 'Se parece a este' }).nth(1)
    await Seleccion(page, mod, "Eliminación directa")
})

test("8. Flexible Eliminación seleccion de equipos en torneos", async ({ page }) => {
    var mod = await page.getByRole('button', { name: 'Se parece a este' }).nth(1)
    var equipo = 7
    await TeamTournament( page, mod, equipo, "Eliminación directa")
})

test("9. Flexible Eliminación agregar nuevo equipo", async ({ page }) => {
    // Pendiente de implementar
})  

test("10. Flexible Eliminación vuelta seleccion previa", async ({ page }) => {
    var mod = await page.getByRole('button', { name: 'Se parece a este' }).nth(1)
    await Seleccion(page, mod, "Eliminación directa (ida y vuelta)")
})

test("11. Flexible Eliminación vuelta seleccion de equipos en torneos", async ({ page }) => {
    var mod = await page.getByRole('button', { name: 'Se parece a este' }).nth(1)
    var equipo = 7
    await TeamTournament( page, mod, equipo, "Eliminación directa (ida y vuelta)")
})

test("12. Flexible Eliminación vuelta agregar nuevo equipo", async ({ page }) => {
    // Pendiente de implementar
})  

// ----------------------------------------------------------------------------------

async function Seleccion(page:any, mod:any, formato:string) {
    await Tournament(page, mod, 16, formato)
    await Options(page, 16, true)
    await Equipos(page, 16)
}

async function TeamTournament(page:any, mod:any, equipo: number, formato: string) {
    await Tournament( page, mod, equipo, formato)
    await Equipos(page, equipo)
    //Seleccionar equipos registrados hasta llegar a 16
    console.log("")
    console.log("Seleccionando equipos registrados hasta llegar a 16")
    await Options(page, equipo, false)
    await Equipos(page, equipo)
}

// ----------------------------------------------------------------------------------

async function Options(page, num_equipo: number, select_team: boolean) {
    await page.getByRole('link', { name: 'Mis torneos' }).click({ force: true })
    await page.getByRole('tab', { name: 'Torneos activos' }).waitFor({ state: 'visible' })
    await page.locator('role=row', { name: /^formal.*/ }).last().getByRole('button').nth(1).click({ force: true })
    await page.pause()
    var select_equipo = await page.locator('input[placeholder="Selecciona los equipos"]')
    var select_dis = await select_equipo.getAttribute('data-disabled')

    if (select_dis) {   
        console.log("- Input 'Añadir equipos' deshabilitado")
    }
    else {
        console.log("- Input 'Añadir equipos' habilitado")
        
        if (select_team === true) {
            await select_equipo.click({ force: true })
            var opciones = await page.locator('[data-combobox-option="true"][role="option"]:visible')
            await opciones.first().waitFor({ state: 'visible' })
            var y = 0

            for(var i = num_equipo; i < 17; i++) {
                var option = await opciones.nth(y)
                await option.click({ force: true })
                var select = await option.getAttribute('aria-selected')
                
                if(select == "false") {
                    console.log('- Opción no seleccionada. Límite de equipos alcanzado')
                }   
                await page.waitForTimeout(500)
                y++
            }
        } 
    }

    await page.waitForTimeout(2000)

    if( select_team === true) {
        await page.getByRole('button', { name: 'Guardar cambios' }).click({ force: true })
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden' })
        await page.locator('role=row', { name: /^formal.*/ }).last().getByRole('button').nth(1).click({ force: true })
        await page.waitForTimeout(1000)
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible' })
        var select_equipo = await page.locator('input[placeholder="Selecciona los equipos"]')
        await page.waitForTimeout(2000)
        var select_dis = await select_equipo.getAttribute('data-disabled')

        if (select_dis) 
            console.log("- Input 'Añadir equipos' deshabilitado")
        else 
            console.log("- Input 'Añadir equipos' habilitado")
        

        await page.getByRole('banner').getByRole('button').click({ force: true })
    }
    else{
        await page.getByRole('banner').getByRole('button').click({ force: true })
    }

    await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden' })
}

// Función de equipos
async function Equipos(page:any, num_equipo: number) {
    await page.getByRole('link', { name: 'Equipos' }).click({ force: true })
    await page.getByRole('tab', { name: 'Equipos participantes' }).waitFor({ state: 'visible' })
    await page.waitForTimeout(2000)
    var btn_Agregar = await page.getByRole('button', { name: 'Agregar equipo' })
    var Agr_dis = await btn_Agregar.getAttribute('data-disabled')
    
    if (Agr_dis) {
        console.log("- Botón 'Agregar equipo' deshabilitado")
    }
    else {
        console.log("- Botón 'Agregar equipo' habilitado") 
    }

    await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden' })
    await page.waitForTimeout(1000)
    var participantes = await page.getByLabel('Equipos participantes').innerText()
    var equipo = participantes.match(/Equipo \w+/g)
    var random = equipo![Math.floor(Math.random() * equipo!.length)]
    await page.getByRole('row', { name: new RegExp(`escudo ${random} .+`) }).getByRole('button').first().click({ force: true })
    await page.waitForTimeout(2000)
    var check_active = await page.locator('div').filter({ hasText: /^Activo$/ }).locator('span').nth(1)
    var is_active = await check_active.isDisabled()

    if (is_active) {
        console.log("- Input 'Estatus' deshabilitado")
    }
    else{
        console.log("- Input 'Estatus' habilitado")
        await check_active.click({ force: true })
    }
    
    await page.getByRole('button', { name: 'Guardar cambios' }).click({ force: true })
}

// --------- Función para crear torneos con más o menos de 16 equipos ---------------
async function Tournament (page:any, mod: any, equipos: number, formato: string) {
    await page.getByRole('button', {name: 'Crear torneo'}).click({ force: true})
    await page.locator('//input[@name="nombre"]').fill(formato)
    await page.getByPlaceholder('Ej. Liga + Liguilla, Eliminacion directa').click()
    await page.waitForTimeout(500)
    await page.getByRole('option', { name: formato, exact: true }).click()
    await page.waitForTimeout(500)
    await page.getByPlaceholder('Ej. Varonil').click()
    var opciones = page.locator('[data-combobox-option="true"][role="option"]:visible')
    await Random(opciones)
    await page.waitForTimeout(500)
    await page.getByLabel('dd-mm-aaaa').click()
    var fecha = new Date()
    var dia = fecha.getDate() 
    var mes = fecha.toLocaleString('es-ES', { month: 'long' }) 
    await page.getByRole('cell', { name: dia + " " + mes }).first().click()
    await page.locator('[aria-haspopup="listbox"]').nth(2).click({force: true})
    await page.waitForTimeout(500)
    var opciones = page.locator('[data-combobox-option="true"][role="option"]:visible')
    await Random(opciones)
    await page.waitForTimeout(500)
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await mod.click()
    await page.getByPlaceholder('Seleccione la opción').click()
    var opciones = page.locator('[data-combobox-option="true"][role="option"]:visible')
    await Random(opciones)
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await page.waitForTimeout(1000)
    await page.locator('input[type="checkbox"]').nth(1).check()
    for(var i = 0; i < equipos; i++){
        await page.locator('input[type="checkbox"]').nth(i).check()
    }

    if(equipos == 16) {
        await page.locator('input[type="checkbox"]').nth(16).click()
        const check = page.locator('input[type="checkbox"]').nth(16)
        expect(await check.isChecked()).toBeFalsy()

        var notificacion = await page.locator('role=alert').first()
        var not_visible = await notificacion.isVisible()

        if (not_visible) {
            console.log("- Notificación visible")
        } else {
            console.log("- Error: No se mostró la notificación")
        }
    }
    
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await page.locator('input[type="checkbox"]').nth(1).check()
    for(var i = 0; i < 2; i++)
        await page.locator('input[type="checkbox"]').nth(i).check()
    await page.waitForTimeout(500)
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await page.getByRole('button', { name: 'Finalizar Registro' }).click()
    inicio = Date.now()
    await page.locator('text=Mis Torneos').waitFor({ state: 'visible' })
    fin = Date.now()
    console.log("Tiempo de creación de torneo: " + (fin - inicio) + "ms")
    await page.waitForTimeout(2000)
}

async function Random(boton) {
    var count = await boton.count()
    var random = Math.floor(Math.random() * count)
    console.log(random)
    await boton.nth(random).click({force: true })
}