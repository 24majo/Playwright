import { test } from '@playwright/test'
import { login } from "../cuenta.spec";
import { Modalidad, programar_partido } from "../cuenta.spec"

test.beforeEach(async ({ page }) => {
    await login(page)
    await page.pause()
    await page.getByRole('button', { name: 'Compartir Torneo' }).waitFor({ state: 'visible' })  
    await page.getByRole('link', { name: 'Mis torneos' }).click({ force: true })
    await page.getByRole('tab', { name: 'Torneos activos' }).waitFor({ state: 'visible' })
})

// --------------------- Torneos Formales -----------------------------

test("1. Liga", async ({ page }) => {
    await FormatMod(page, "Formal", 0, 8, 'Liga')
    await Formato(page, 0, "Formal")
    await ResultadoLiga(page, 0)
})

test("2. Liga vuelta", async ({ page }) => {
    await FormatMod(page, "Formal", 0, 8, 'Liga (ida y vuelta)')
    await Formato(page, 0, "Formal")
    await ResultadoLiga(page, 0)
})

test("3. Eliminacion directa", async ({ page }) => {
    await FormatMod(page, "Formal", 0, 8, 'Eliminación directa')
    await Formato(page, 0, "Formal")
    await ResultadoEliminacion(page)
})

test("4. Eliminacion directa vuelta", async ({ page }) => {
    await FormatMod(page, "Formal", 0, 8, 'Eliminación directa (ida y vuelta)')
    await Formato(page, 0, "Formal")
    await ResultadoEliminacionVuelta(page)
})

test("5. Grupos", async ({ page }) => {
    await FormatMod(page, "Formal", 1, 8, "Grupos")
    await Formato(page, 1, "Formal")
    await ResultadoLiga(page, 1)
})

// --------------------- Torneos Flexibles -----------------------------

test("6. Eliminación Flexible", async ({ page }) => {
    await FormatMod(page, "Flexible", 0, 8, 'Eliminación directa')
    await Formato(page, 0, "Flexible")
    await ResultadoEliminacion(page)
})

test("7. Eliminación Flexible vuelta", async ({ page }) => {
    await FormatMod(page, "Flexible", 0, 8, 'Eliminación directa (ida y vuelta)')
    await Formato(page, 0, "Flexible")
    await ResultadoEliminacionVuelta(page)
})

test("8. Liga Flexible", async ({ page }) => {
    await FormatMod(page, "Flexible", 0, 8, 'Liga')
    await Formato(page, 0, "Flex_Liga")
    await ResultadoLiga(page, 0)
    await page.pause()
})

test("9. Liga Flexible vuelta", async ({ page }) => {
    await FormatMod(page, "Flexible", 0, 8, 'Liga (ida y vuelta)')
    await Formato(page, 0, "Flex_Liga")
    await ResultadoLiga(page, 0)
    await page.pause()
})

// ---------------------------------------------------------------------

async function FormatMod(page: any, modalidad: String, Group: number, equipos: number, formato: string) {
    var mod = ""
    if(modalidad == "Formal") {
        mod = await page.getByRole('button', { name: 'Se parece a este' }).first()
    }else{
        mod = await page.getByRole('button', { name: 'Se parece a este' }).nth(1)
    }

    await Modalidad( page, mod, Group, equipos, formato)
    await page.getByRole('tab', { name: 'Torneos activos' }).waitFor({ state: 'visible' })
}

async function ResultadoLiga(page: any, Group: number) {
    await page.getByRole('link', { name: 'Resultados' }).click({ force: true })
    await page.getByRole('tab', { name: 'Resultados' }).waitFor({ state: 'visible' })
    await page.getByRole('row', { name: new RegExp(`.+ Registrar`)}).getByRole('button').first().click({ force: true })
    await Results(page, Group)
}

async function ResultadoEliminacion(page: any) {
    await page.getByRole('link', { name: 'Resultados' }).click({ force: true })
    await page.getByRole('button', { name: 'Registrar' }).first().click({ force: true })
    await Results(page, 0) 
}

async function ResultadoEliminacionVuelta(page: any) {
    await page.getByRole('link', { name: 'Resultados' }).click()
    await page.locator('text=Registro de resultados').waitFor({ state: 'visible' })
    await page.getByRole('button', { name: 'Registrar Ida' }).first().click({ force: true })
    await Results(page, 0)
}

async function Results(page:any, Group: number) {
    await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible'})
    var random = [Math.floor(Math.random() * 10) + 1].toString()
    await page.locator('input[name="puntos_local"]').fill(random)
    random = [Math.floor(Math.random() * 10) + 1].toString()
    await page.locator('input[name="puntos_visitante"]').fill(random)
    await page.getByRole('button', { name: 'Guardar' }).click({ force: true })
    await page.getByRole('dialog', { name: /Registro de/i }).waitFor({ state: 'hidden' })
    
    // Después de registrar un resultado
    console.log("")
    console.log("Después de registrar un resultado")
    await OpcionesTorneo(page, Group)
}

// ---------------------------------------------------------------------

async function Formato(page: any, Group: number, modalidad: string) {
    //Al crear el torneo
    console.log("")
    console.log("Al crear el torneo")
    await OpcionesTorneo(page, Group)
    await page.getByRole('link', { name: 'Calendario' }).click({ force: true })

    // Crear el calendario
    if(modalidad == "Flex_Liga") {
        await page.getByRole('button', { name: 'Nueva jornada' }).click()
        await page.getByRole('menuitem', { name: 'Jornada regular' }).click()
        await page.getByRole('button', { name: 'Empezar a programar' }).click()
    }

    else {
        var calendario = await page.getByRole('button', { name: 'Crear el calendario' })
        await calendario.waitFor({ state: 'visible' })
        await page.waitForTimeout(1000)
        await calendario.click({ force: true })

        if( Group == 1) {
            await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible' })
            await page.getByRole('button', { name: 'Si, continuar' }).click({ force: true })   
            await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden' }) 
        }

        var partidos = page.getByRole('tab', { name: 'Todos los partidos' })
        await partidos.waitFor({ state: 'visible' })
    }

    console.log("")
    console.log("Después de crear el calendario")
    await OpcionesTorneo(page, Group)

    // Programar un partido
    await page.getByRole('link', { name: 'Calendario' }).click({ force: true })

    if(modalidad == "Formal") {
        var partidos = page.getByRole('tab', { name: 'Todos los partidos' })
        await partidos.waitFor({ state: 'visible' })
        await partidos.click({ force: true })
        await page.pause()
        page.getByRole('row', { name: new RegExp(`.+ NO PROGRAMADO .+`) }).getByRole('button').first().click({ force: true })
        await programar_partido(page, 0)
    }

    if(modalidad == "Flexible") {
        await page.getByRole('tab', { name: 'Por rondas' }).click({ force: true })
        await page.getByRole('button', { name: 'Programar partido' }).first().click({ force: true })
        await page.getByRole('textbox', { name: 'Selecciona equipo local' }).click()
        var local = page.locator('[data-combobox-option="true"][role="option"]:visible')
        var count_l = await local.count()
        var count_v = count_l-2
        await local.nth(1).click()
        await page.getByRole('textbox', { name: 'Selecciona equipo visitante' }).click()
        var visitante = page.locator('[data-combobox-option="true"][role="option"]:visible')
        await visitante.nth(count_v).click()
        await page.waitForTimeout(1000)
        await programar_partido(page, 1)
    }

    if(modalidad == "Flex_Liga") {
        await page.getByRole('tab', { name: 'Por jornadas' }).click()
        var agregar = await page.getByRole('button', { name: 'Agregar partido' })
        await agregar.waitFor({ state: 'visible' })
        await agregar.click({ force: true })
        await page.getByRole('textbox', { name: 'Selecciona equipo local' }).click()
        var local = page.locator('[data-combobox-option="true"][role="option"]:visible')
        var count_l = await local.count()
        var count_v = count_l-2
        await local.nth(1).click()
        await page.getByRole('textbox', { name: 'Selecciona equipo visitante' }).click()
        var visitante = page.locator('[data-combobox-option="true"][role="option"]:visible')
        await visitante.nth(count_v).click()
        await page.waitForTimeout(1000)
        await page.locator('form').getByRole('button').filter({ hasText: /^$/ }).click()
        await programar_partido(page, 1)
    }
    
    // Después de programar un partido y antes de registrar un resultado, las opciones deben estar habilitadas
    console.log("")
    console.log("Después de programar un partido")
    await OpcionesTorneo(page, Group)
}

// ---------------------------------------------------------------------

async function OpcionesTorneo(page: any, Group: number) {
    await page.getByRole('link', { name: 'Equipos' }).click({ force: true })
    await page.getByRole('tab', { name: 'Equipos participantes' }).waitFor({ state: 'visible' })
    await page.waitForTimeout(2000)
    var btn_Agregar = await page.getByRole('button', { name: 'Agregar equipo' })
    var Agr_dis = await btn_Agregar.getAttribute('data-disabled')
    
    if (Agr_dis) {
        console.log("1. Botón 'Agregar equipo' deshabilitado")
    }
    else {
        console.log("1. Botón 'Agregar equipo' habilitado") 
        await btn_Agregar.click({ force: true })
        await page.waitForTimeout(1000)

        var cancel = await page.getByRole('button', { name: 'No, Cancelar' })
        var cancel_visible = await cancel.isVisible()
        
        if(cancel_visible){
            await cancel.click({ force: true })
        }else{
            await page.getByRole('banner').getByRole('button').click({ force: true })
        }
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
        console.log("2. Input 'Estatus' deshabilitado")
    }
    else{
        console.log("2. Input 'Estatus' habilitado")
        await check_active.click({ force: true })
    }

    await page.getByRole('banner').getByRole('button').click({ force: true })
    await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden' })
    await page.getByRole('link', { name: 'Mis torneos' }).click({ force: true })

    await page.locator('role=row', { name: /^formal.*/ }).last().getByRole('button').nth(1).click({ force: true })
    await page.waitForTimeout(2000)
    var formato = await page.locator('input[data-testid="selectFormatoCompetencia"]')
    var formato_dis = await formato.getAttribute('data-disabled')
    
    if (formato_dis) {
        console.log("3. Input 'Formato del torneo' deshabilitado")
    }
    else {
        console.log("3. Input 'Formato del torneo' habilitado")
        await formato.click({ force: true })
    }

    var modalidad = await page.locator('input[placeholder="Ej. Formal, Flexible"]')
    var modal_dis = await modalidad.getAttribute('data-disabled')
    
    if(modal_dis) {
        console.log("4. Input 'Modalidad' deshabilitado")
    }
    else{
        console.log("4. Input 'Modalidad' habilitado")
        await modalidad.click({ force: true })
    }

    await page.waitForTimeout(1000)
    var select_equipo = await page.locator('input[placeholder="Selecciona los equipos"]')
    var select_dis = await select_equipo.getAttribute('data-disabled')

    if (select_dis) {   
        console.log("5. Input 'Añadir equipos' deshabilitado")
    }
    else {
        console.log("5. Input 'Añadir equipos' habilitado")
        await select_equipo.click({ force: true })
    }
    
    await page.waitForTimeout(2000)
    await page.getByRole('banner').getByRole('button').click({ force: true })
    await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden' })

    if(Group == 1) {
        await page.getByRole('link', { name: 'Inicio' }).click({ force: true })
        await page.getByRole('button', { name: 'Compartir Torneo' }).waitFor({ state: 'visible' })  
        var eliminar = await page.getByRole('button', { name: 'Eliminar Grupos' })
        var eliminar_dis = await eliminar.isVisible()

        if(eliminar_dis){
            console.log("6. Botón 'Eliminar Grupos' visible")
        }else{
            console.log("6. Botón 'Eliminar Grupos' invisible")
        }

        await page.waitForTimeout(2000)
    }
}