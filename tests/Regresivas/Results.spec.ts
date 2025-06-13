import { test } from '@playwright/test'
import { login, Modalidad, programar_partido, registrar_resultado } from '../cuenta.spec'
import { count } from 'console'

test.beforeEach(async ({ page }) => {
    await login(page)
    await page.pause()
    await page.getByRole('link', { name: 'Mis torneos' }).click({ force: true })
    await page.getByRole('tab', { name: 'Torneos activos' }).waitFor({ state: 'visible' })
})

test("1. Liga", async ({ page }) => {
    await FunctionsLiga(page, await page.getByRole('button', { name: 'Se parece a este' }).first(), "Liga", 0, "Formal")
})

test("2. Liga (ida y vuelta)", async ({ page }) => {
    await FunctionsLiga(page, await page.getByRole('button', { name: 'Se parece a este' }).first(), "Liga (ida y vuelta)", 0, "Formal");
})

test("3. Eliminacion directa", async ({ page }) => {
    await FunctionsElimination(page, await page.getByRole('button', { name: 'Se parece a este' }).first(), "Eliminación directa", 0, "Formal")
})

test("4. Eliminacion directa (ida y vuelta)", async ({ page }) => {
    await FunctionsElimination(page, await page.getByRole('button', { name: 'Se parece a este' }).first(), "Eliminación directa (ida y vuelta)", 0, "Formal")
})

test("5. Grupo", async ({ page }) => {
    await FunctionsLiga(page, await page.getByRole('button', { name: 'Se parece a este' }).first(), "Grupo", 0, "Formal")
})

// ------------------------------- Flexible ---------------------------------------
test("6. Liga Flexible", async ({ page }) => {
    await FunctionsLiga(page, await page.getByRole('button', { name: 'Se parece a este' }).nth(1), "Liga", 0, "Flexible")
})

test("7. Liga (ida y vuelta) Flexible", async ({ page }) => {
    await FunctionsLiga(page, await page.getByRole('button', { name: 'Se parece a este' }).nth(1), "Liga (ida y vuelta)", 0, "Flexible")
})  

test("8. Eliminacion directa Flexible", async ({ page }) => {
    await FunctionsElimination(page, await page.getByRole('button', { name: 'Se parece a este' }).nth(1), "Eliminación directa", 0, "Flexible")
})

test("9. Eliminacion directa (ida y vuelta) Flexible", async ({ page }) => {
    await FunctionsElimination(page, await page.getByRole('button', { name: 'Se parece a este' }).nth(1), "Eliminación directa (ida y vuelta)", 0, "Flexible")
})

test("Prueba", async ({ page}) => {
    await page.pause()
})

// --------------------------Funciones para modalidad ---------------------------

async function FunctionsLiga(page: any, modalidad: any, formato: string, grupo: number, mod: string) {
    await Modalidad(page, modalidad, grupo, 4, formato) // Crear torneo
    await Create_Fixture(page, mod, grupo, formato) // Crear fixture
    await ResultsLiga(page, mod, formato) // Registrar resultados de la liga
    var table_ganador = await Ganador(page) // Ganador en tabla de posiciones
    await GanadorInicio(page, formato, table_ganador) // Ganador en inicio
    await page.pause()
}

async function FunctionsElimination(page: any, modalidad: any, formato: string, grupo: number, mod: string) {
    await Modalidad(page, modalidad, grupo, 8, formato) // Crear torneo
    await Create_Fixture(page, mod, grupo, formato)
    
    if(formato == "Eliminación directa")
        await ResultsEliminacion(page, mod, formato) // Registrar resultados de la eliminacion
    else
        await ResultsEliminacionVuelta(page, mod, formato)
}

// ------------------------ Funciones para fixture ----------------------------

async function Create_Fixture(page: any, modalidad: any, grupo: number, formato: string) {
    if(modalidad == "Flexible" && (formato == "Liga (ida y vuelta)" || formato == "Liga")){
        var jornada = await page.getByRole('button', { name: 'Nueva jornada' })
        await jornada.waitFor({ state: 'visible' })
        await jornada.click()
        await page.getByRole('menuitem', { name: 'Jornada regular' }).click()
        await page.locator('[data-truncate="end"]').first().waitFor({ state: 'visible' })
        await page.getByRole('button', { name: 'Empezar a programar' }).click()
    }

    else {
        await page.getByRole('link', { name: 'Calendario' }).click()
        var calendario = await page.getByRole('button', { name: 'Crear el calendario' })
        await calendario.waitFor({ state: 'visible' })
        await page.waitForTimeout(1000)
        await calendario.click({ force: true })
        await Enfrentamientos(page, modalidad)
    }
}

async function Enfrentamientos(page: any, modalidad: any) {
    var tab = await page.getByRole('tab', { name: 'Todos los partidos' })
    await tab.waitFor({ state: 'visible' })
    await tab.click({ force: true })
    await page.locator('[placeholder="Busqueda general"]').waitFor({ state: 'visible' })
    var boton = page.getByRole('row', { name: new RegExp(`.+ NO PROGRAMADO .+`) }).getByRole('button').first()
    await page.pause()
    var visible = await boton.isHidden()

    while(!visible){
        boton.click({ force: true })
        await boton.waitFor({ state: 'visible'})
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible'})
        await page.waitForTimeout(1000)

        if(modalidad == "Flexible"){
            await page.getByRole('textbox', { name: 'Selecciona equipo local' }).click()
            var local = page.locator('[data-combobox-option="true"][role="option"]:visible')
            var count_l = await local.count()
            var count_v = count_l-2
            await local.nth(1).click()
            await page.getByRole('textbox', { name: 'Selecciona equipo visitante' }).click()
            var visitante = page.locator('[data-combobox-option="true"][role="option"]:visible')
            await visitante.nth(count_v).click()
            await page.waitForTimeout(1000)
        }

        await programar_partido(page, 0)
        visible = await boton.isHidden()
    }

    if(visible){
        var flecha = await page.locator('[aria-label="Next Page"]')
        var activa = await flecha.getAttribute('aria-disabled')
        console.log("Flecha de siguiente página desactivada: " + activa)

        if(activa == 'false'){
            await flecha.click()
            visible = await boton.first().isHidden()

            while(!visible){ // Hay partidos por programar en la siguiente pestaña
                boton.click({ force: true })
                await boton.waitFor({ state: 'visible'})
                await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible'})
                await page.waitForTimeout(1000)
                await programar_partido(page, 0)
                var visible = await boton.isHidden()
            }
        }
    }
}

// -------------------------- Funciones generales ----------------------------

async function Rounds(page: any, registrar: any, modalidad: string, formato: string) {
    var registrar_disabled = await registrar.getAttribute('data-disabled')
    if(registrar_disabled == 'true'){
        await page.getByRole('link', { name: 'Calendario' }).click()
        await Enfrentamientos(page, modalidad) // Programar partidos de la siguiente ronda
        
        await page.getByRole('link', { name: 'Resultados' }).click()

        if(formato == "Eliminación directa") {
            registrar = await page.getByRole('button', { name: 'Registrar' })
            await registrar.first().waitFor({ state: 'visible' })
            var registrar_count = await registrar.count()
            for(var i = 0; i < registrar_count; i++)
                await Results(page, registrar.first(), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), modalidad, formato)
        }
        
        else {
            var ida = await page.getByRole('button', { name: 'Registrar Ida'})
            await ida.first().waitFor({ state: 'visible' })
            var registrar_count = await ida.count()
            for(var i = 0; i < registrar_count; i++)
                await Results(page, ida.first(), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), modalidad, formato)

            var vuelta = await page.getByRole('button', { name: 'Registrar vuelta' })
            await vuelta.first().waitFor({ state: 'visible' })
            var registrar_count = await vuelta.count()
            for(var i = 0; i < registrar_count; i++)
                await Results(page, vuelta.first(), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), modalidad, formato)
        } 
    }
}

// -------------------------- Funciones de resultados ----------------------------

async function ResultsLiga(page: any, modalidad: string, formato: string) {
    await page.getByRole('link', { name: 'Resultados' }).click()
    await page.locator('text=Registro de resultados').waitFor({ state: 'visible' })
    var registrar = page.getByRole('row', { name: new RegExp(`.+ Registrar`)}).getByRole('button')
    await registrar.nth(0).waitFor({ state: 'visible' })
    await Results(page, registrar.first(), 5, 3, modalidad, formato) 
    var count_registrar = await registrar.count()
    for( var i = 0; i < count_registrar; i++ ){
        await Results(page, registrar.first(), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), modalidad, formato)
    }

    await page.waitForTimeout(1000)
    var liguilla = await page.getByRole('button', { name: 'Vamos' })
    var visible = await liguilla.isVisible()
    if(visible == true){
        await liguilla.hover()
        console.log("Botón Liguilla visible")
    }
    else{
        console.log("Botón Liguilla no visible")
    }
}

async function ResultsEliminacion(page: any, modalidad: string, formato: string) {
    await page.getByRole('link', { name: 'Resultados' }).click()
    await page.locator('text=Registro de resultados').waitFor({ state: 'visible' })
    var registrar = page.getByRole('button', { name: 'Registrar' }).first()
    await registrar.waitFor({ state: 'visible' })

    console.log("")
    console.log("Registro correcto")
    await Results(page, registrar, 5, 3, modalidad, formato) // Registro correcto

    // Confirmar que al tener al primer ganador, genera una nueva card de enfrentamiento
    await page.waitForTimeout(1000)
    var card = await page.getByText('Fecha por definir').first()
    var visible_card = await card.isVisible()
    if(visible_card == true){
        console.log("Card de nuevo enfrentamiento visible")
    }
    else{
        console.log("Card de nuevo enfrentamiento no visible")
    }

    console.log("")
    console.log("Registro empate")
    await Results(page, registrar, 5, 5, modalidad, formato) // Registro empate

    console.log("")
    console.log("Edición de resultado a empate")	
    // Edición de resultado a empate
    await Results(page, registrar, 1, 2, modalidad, formato) 
    var editar = await page.locator('div').filter({hasText: /Editar$/}).getByRole('button').last()
    await editar.waitFor({ state: 'visible' })
    await Results(page, editar, 7, 7, modalidad, formato) 

    console.log("")
    console.log("Cambiar ganador de partido")
    // Cambio de ganador de partido
    await Results(page, registrar, 3, 1, modalidad, formato) 
    editar = await page.locator('div').filter({hasText: /Editar$/}).getByRole('button').last()
    await editar.waitFor({ state: 'visible' })
    await Results(page, editar, 1, 8, modalidad, formato)

    console.log("")
    console.log("Confirmar ganador")
    var result_win = await GanadorEliminacion(page)
    await GanadorInicio(page, "Eliminación directa", result_win) // Confirmar ganador en inicio
    await page.pause()
}

async function ResultsEliminacionVuelta(page: any, modalidad: any, formato: string) {
    await page.getByRole('link', { name: 'Resultados' }).click()
    await page.locator('text=Registro de resultados').waitFor({ state: 'visible' })

    var ida = await page.getByRole('button', { name: 'Registrar Ida' })
    var vuelta = await page.getByRole('button', { name: 'Registrar vuelta' })
    var act_ida = await page.getByRole('button', { name: 'Actualizar ida' }).last()
    var act_vuelta = await page.getByRole('button', { name: 'Actualizar vuelta' }).last()

    await ida.first().waitFor({ state: 'visible' })

    var count_ida = await ida.count()
    for (var i = 0; i < count_ida; i++)
        await Results(page, ida.first(), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), modalidad, formato)
    
    // Registro de ida y vuelta correctas
    console.log("")
    console.log("Registro correcto")
    await Results(page, vuelta.first(), Math.floor(Math.random() * 10), Math.floor(Math.random() * 10), modalidad, formato)

    // Confirmar que al tener al primer ganador, genera una nueva card de enfrentamiento
    await page.waitForTimeout(1000)
    var card = await ida.last().getAttribute('data-disabled')
    if(card == 'true'){
        console.log("Card de nuevo enfrentamiento visible")
    }
    else{
        console.log("Card de nuevo enfrentamiento no visible")
    }

    // Resultados de ida y vuelta en empates
    console.log("")
    console.log("Registro empate")
    await Results(page, act_ida, 3, 3, modalidad, formato)
    await Results(page, vuelta.first(), 6, 6, modalidad, formato)

    // Actualizar ida y vuelta a empates
    console.log("")
    console.log("Edición de ida y vuelta a empates")
    await Results(page, vuelta.first(), 3, 4, modalidad, formato)
    await Results(page, act_ida, 5, 5, modalidad, formato)
    await Results(page, act_vuelta, 4, 4, modalidad, formato)

    // Modificar ganador
    console.log("")
    console.log("Cambiar ganador de partido")
    await Results(page, act_ida, 3, 1, modalidad,formato) 
    await Results(page, vuelta.first(), 2, 3, modalidad, formato)
    await Results(page, act_ida.first(), 1, 2, modalidad, formato)

    await page.pause()

    await Rounds(page, ida.first(), modalidad, formato)
    await Rounds(page, ida.first(), modalidad, formato)
    
    console.log("")
    console.log("Confirmar ganador")
    var result_win = await GanadorEliminacion(page)
    await GanadorInicio(page, "Eliminación directa", result_win) // Confirmar ganador en inicio
    await page.pause()
}

async function Results(page: any, registrar: any, local: number, visitante: number, modalidad: string, formato: string) {
    registrar.click({ force: true })
    await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible'})
    await page.locator('input[name="puntos_local"]').fill(local.toString())
    await page.locator('input[name="puntos_visitante"]').fill(visitante.toString())
    await page.pause()
    await page.getByRole('button', { name: 'Guardar' }).click({ force: true })

    var msg = await page.getByText('El partido no puede quedar')
    await page.waitForTimeout(500)
    var msg_visible = await msg.isVisible()
    if(msg_visible == true){
        console.log("Mensaje de partido empatado visible")
        var random = [Math.floor(Math.random() * 10)].toString()
        await page.locator('input[name="puntos_visitante"]').fill(random)
        await page.getByRole('button', { name: 'Guardar' }).click({ force: true })
    }
    else {
        console.log("Mensaje de partido empatado no visible")
    }

    await page.waitForTimeout(1000)
    var ganador = await page.getByRole('dialog', { name: 'Confirmar cambio de resultado' }).getByRole('banner')
    var visible_ganador = await ganador.isVisible()
    if(visible_ganador == true){
        console.log("Ganador del partido cambiado")
        await page.getByRole('button', { name: 'Confirmar' }).click({ force: true })
        await page.waitForTimeout(1000)
    }

    await page.getByRole('dialog', { name: /Registro de/i }).waitFor({ state: 'hidden' })

    await page.waitForTimeout(500)
    var share = await page.locator('div').filter({ hasText: /^¡JORNADA TERMINADA!¿Lo compartimos\?$/ }).first()
    var visible_share = await share.isVisible()

    if(visible_share == true){
        await page.getByRole('button', { name: 'Guardar para luego' }).click()
        await share.waitFor({ state: 'hidden'})
    }

    if(formato != "Eliminación directa (ida y vuelta)") {
        var registrar_visible = await registrar.isVisible()
        if(registrar_visible == true)
            await Rounds(page, registrar, modalidad, formato) // Registrar enfrentamientos de la siguiente ronda
    }
}

// ------------- Funcion para conocer al ganador -----------------

async function Ganador(page: any) {
    await page.getByRole('link', { name: 'Tabla de posiciones' }).click({ force: true })
    var ganador = await page.locator('[role="gridcell"][col-id="equipos"][aria-colindex="3"]').first()
    await ganador.waitFor({ state: 'visible' })
    var nombre_ganador = await ganador.textContent()
    console.log("El ganador del torneo es: " + nombre_ganador)
    await page.pause()
    return nombre_ganador
}

async function GanadorEliminacion(page: any) {
    var divs = await page.locator('div', { hasText: /Equipo/ }).all()
    var matched: { div: any; img: any; text: string }[] = []

    for (const div of divs) {
        const img = div.getByRole('img')
        if (await img.count() > 0) {
            const text = (await div.textContent())?.trim() ?? ''
            matched.push({ div, img, text })
        }
    }

    var ganador = matched.slice(-2).map(({ div, img, text }) => {
        var match = text.match(/^(.*?)(\d+)$/);
        return {
            fullText: text,
            text: match?.[1].trim() ?? text,
            number: match ? Number(match[2]) : null,
            divLocator: div,
            imgLocator: img
        }
    })

    return ganador[0].number! < ganador[1].number!
        ? ganador[1].text
        : ganador[0].text
}      

async function GanadorInicio(page: any, formato: string, equipo: string) {
    await page.getByRole('link', { name: 'Inicio' }).click({ force: true })
    await page.getByRole('button', { name: 'Compartir Torneo' }).waitFor({ state: 'visible' })
    var ganador = await page.getByText(formato + ' - ' + equipo)
    var visible_ganador = await ganador.isVisible()
    
    if(visible_ganador){
        console.log("Ganador confirmado en tabla de posiciones e inicio")
    }
    else{
        console.log("El ganador de la tabla de posiciones no coincide con el ganador del inicio")
    }
}