import { test } from '@playwright/test';
import { login, Modalidad, programar_partido, registrar_resultado } from '../cuenta.spec';
import { table } from 'console';

test.beforeEach(async ({ page }) => {
    await login(page);
    await page.pause();
    await page.getByRole('link', { name: 'Mis torneos' }).click({ force: true });
    await page.getByRole('tab', { name: 'Torneos activos' }).waitFor({ state: 'visible' });
})

test("1. Liga", async ({ page }) => {
    await FunctionsLiga(page, await page.getByRole('button', { name: 'Se parece a este' }).first(), "Liga", 0);
})

test("2. Liga (ida y vuelta)", async ({ page }) => {
    await FunctionsLiga(page, await page.getByRole('button', { name: 'Se parece a este' }).first(), "Liga (ida y vuelta)", 0);
})

test("3. Eliminacion directa", async ({ page }) => {
    await FunctionsElimination(page, await page.getByRole('button', { name: 'Se parece a este' }).first(), "Eliminación directa", 0);
})

test("4. Eliminacion directa (ida y vuelta)", async ({ page }) => {
    await FunctionsElimination(page, await page.getByRole('button', { name: 'Se parece a este' }).first(), "Eliminación directa (ida y vuelta)", 0);
})

test("5. Grupo", async ({ page }) => {
    await FunctionsLiga(page, await page.getByRole('button', { name: 'Se parece a este' }).first(), "Grupo", 0);
})

// ------------------------------- Flexible ---------------------------------------
test("6. Liga Flexible", async ({ page }) => {
    await FunctionsLiga(page, await page.getByRole('button', { name: 'Se parece a este' }).nth(1), "Liga", 0);
})

test("7. Liga (ida y vuelta) Flexible", async ({ page }) => {
    await FunctionsLiga(page, await page.getByRole('button', { name: 'Se parece a este' }).nth(1), "Liga (ida y vuelta)", 0);
})  

test("8. Eliminacion directa Flexible", async ({ page }) => {
    await FunctionsElimination(page, await page.getByRole('button', { name: 'Se parece a este' }).nth(1), "Eliminación directa", 0);
})

test("9. Eliminacion directa (ida y vuelta) Flexible", async ({ page }) => {
    await FunctionsElimination(page, await page.getByRole('button', { name: 'Se parece a este' }).nth(1), "Eliminación directa (ida y vuelta)", 0);
})

test("Prueba", async ({ page }) => {
    await page.pause()
})

// --------------------------Funciones para modalidad ------------------------------

async function FunctionsLiga(page: any, modalidad: any, formato: string, grupo: number) {
    await Modalidad(page, modalidad, grupo, 4, formato) // Crear torneo
    await Enfrentamientos(page) // Programar partidos
    await ResultsLiga(page) // Registrar resultados de la liga
    var table_ganador = await Ganador(page) // Ganador en tabla de posiciones
    await GanadorInicio(page, formato, table_ganador) // Ganador en inicio
    await page.pause()
}

async function FunctionsElimination(page: any, modalidad: any, formato: string, grupo: number) {
    await Modalidad(page, modalidad, grupo, 8, formato) // Crear torneo
    await Enfrentamientos(page) // Programar partidos
    await ResultsEliminacion(page) // Registrar resultados de la eliminacion

}

// ------------------------------- Funciones generales ----------------------------

async function Enfrentamientos(page: any) {
    await page.getByRole('link', { name: 'Calendario' }).click()
    var calendario = await page.getByRole('button', { name: 'Crear el calendario' })
    await calendario.waitFor({ state: 'visible' })
    await page.waitForTimeout(1000)
    await calendario.click({ force: true })
    var tab = await page.getByRole('tab', { name: 'Todos los partidos' })
    await tab.waitFor({ state: 'visible' })
    await tab.click({ force: true })
    await page.locator('[placeholder="Busqueda general"]').waitFor({ state: 'visible' })
    var boton = page.getByRole('row', { name: new RegExp(`.+ NO PROGRAMADO .+`) }).getByRole('button').first()
    await page.pause()
    var visible = await boton.isHidden()
    console.log("Botón programar oculto: " + visible)

    while(!visible){
        boton.click({ force: true })
        await boton.waitFor({ state: 'visible'})
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible'})
        await page.waitForTimeout(1000)
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

// -------------------------- Funciones de resultados ----------------------------

async function ResultsLiga(page: any) {
    await page.getByRole('link', { name: 'Resultados' }).click()
    await page.locator('text=Registro de resultados').waitFor({ state: 'visible' })
    var registrar = page.getByRole('row', { name: new RegExp(`.+ Registrar`)}).getByRole('button')
    await registrar.nth(0).waitFor({ state: 'visible' })
    await Results(page, registrar, 5, 3) 
    var count_registrar = await registrar.count()
    for( var i = 0; i < count_registrar; i++ ){
        await Results(page, registrar, Math.floor(Math.random() * 10), Math.floor(Math.random() * 10))
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

async function ResultsEliminacion(page: any) {
    await page.getByRole('link', { name: 'Resultados' }).click()
    await page.locator('text=Registro de resultados').waitFor({ state: 'visible' })
    var registrar = page.getByRole('button', { name: 'Registrar' }).first()
    await registrar.waitFor({ state: 'visible' })
    await Results(page, registrar, 5, 3) // Registro correcto

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

    await Results(page, registrar, 5, 5) // Registro empate

    // Edición de resultado a empate
    await Results(page, registrar, 1, 2) 
    var editar = await page.locator('div').filter({hasText: /Editar$/}).getByRole('button').last()
    await editar.waitFor({ state: 'visible' })
    await Results(page, editar, 7, 7) 

    // Cambio de ganador de partido
    await Results(page, registrar, 3, 1) 
    var editar = await page.locator('div').filter({hasText: /Editar$/}).getByRole('button').last()
    await editar.waitFor({ state: 'visible' })
    await Results(page, editar, 1, 8)

    await page.pause()
}

async function ResultsEliminacionVuelta(page: any) {

}

async function Results(page: any, registrar: any, local: number, visitante: number) {
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