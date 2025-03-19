import { test, expect, Page } from '@playwright/test'
import { login, crear_torneo, desactivar } from './cuenta.spec'

var inicio, fin

test.beforeEach(async ({ page }) => {
    await login(page)
    await page.getByRole('link', { name: 'Mis torneos' }).click({ force: true })
    await page.locator('text=Mis Torneos').waitFor({ state: 'visible' })
})

test("Crear", async ({ page }) => {
    // Caso 1: Creación de torneo
    // Caso 2: Límite de torneos alcanzado para crear
    // Caso 3: Límite de torneos activos
    var torneo = await page.getByRole('button', {name: 'Crear torneo'})
    await expect(torneo).toBeVisible() // Si no es visible, es por Caso 2
    var boton = await torneo.isVisible() 
    console.log("Botón agregar equipo: " + boton)

    if(boton){
        //for (var i = 0; i < 5; i++){
            await torneo.click({ force: true})
            console.log("Caso 1")
            await crear_torneo(page)
            inicio = Date.now()
            await page.locator('text=Mis Torneos').waitFor({ state: 'visible' })
            fin = Date.now()
            console.log("Tiempo de creación de torneo: " + (fin - inicio) + "ms")
        //}
    }
    await desactivar(page) // Caso 3
})

test("Editar", async ({ page }) => {
    for(var i = 0; i < 6; i++){
        await page.getByRole('row', { name: /^formal/ }).getByRole('button').nth(1).click({ force: true })
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible' })
        await page.waitForTimeout(1000)
        await page.getByTestId('selectFormatoCompetencia').click({ force: true })
        var opciones = page.locator('[data-combobox-option="true"][role="option"]:visible')
        await Random(opciones)
        //await page.getByRole('option', { name: t_formato, exact: true }).click({ force: true })
        await page.getByRole('button', { name: 'Guardar cambios' }).click({ force: true })
        inicio = Date.now()
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden'})
        fin = Date.now()
        console.log("Tiempo de edición de cancha: " + (fin - inicio) + "ms")
        await page.waitForTimeout(1000)
    }
})

test("Active Delete", async ({ page }) => {
    // Caso 1: Eliminación exitosa
    // Caso 2: Torneo actual en el perfil
    var boton = page.locator('role=row').locator('role=button')
    var count = await boton.count()
    var botones: number[] = []
    for (let j = 2; j < count; j += 3) {
        await boton.nth(j).hover()
        botones.push(j)
        await page.waitForTimeout(1000)
    }
    var b_eliminar = 2 // Para confirmar el caso 2
    await boton.nth(b_eliminar).click({force: true })

    await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible'})
    await page.pause()
    var modal1 = await page.getByRole('heading', { name: '¿Estás seguro de eliminar el' }).isVisible()
    console.log("Modal confirmar eliminar: " + modal1)
    var modal2 = await page.getByRole('heading', { name: 'No puedes eliminar este torneo' }).isVisible()
    console.log("Modal no se puede: " + modal2)

    if(modal1){
        await page.getByRole('button', { name: 'Sí, Eliminar' }).click({ force: true })
        inicio = Date.now()
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible'})
        fin = Date.now()
        console.log("Tiempo de eliminación de torneo: " + (fin - inicio) + "ms")
        console.log("Caso 1")
    }

    if(modal2){
        await page.getByRole('button', { name: 'Entendido' }).click({ force: true })
        console.log("Caso 2")
    }
})

test("Inactivo Eli", async ({ page }) => {
    await page.getByRole('tab', { name: 'Torneos inactivos' }).click({ force: true })
    await page.getByLabel('Torneos inactivos').locator('button').nth(2).click({ force: true })
    await page.waitForTimeout(500)
    await page.getByRole('button', { name: 'Sí, Eliminar' }).click({ force: true })
    await page.pause()
})

test("Formal", async ({ page }) => {
    var mod = await page.getByRole('button', { name: 'Se parece a este' }).first()
    await Modalidad( page, mod )
})

test("Flexible", async ({ page }) => {
    var mod = await page.getByRole('button', { name: 'Se parece a este' }).nth(1)
    await Modalidad( page, mod )
})

async function Modalidad(page:Page, mod) {
    var torneo = await page.getByRole('button', {name: 'Crear torneo'})
    await torneo.click({ force: true})

    // var formato = 'Liga (ida y vuelta)'
    var formato = 'Liga'
    // var formato = 'Eliminación directa (ida y vuelta)'
    // var formato = 'Eliminación directa'

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
    for(var i = 0; i < 8; i++){
        await page.locator('input[type="checkbox"]').nth(i).check()
    }
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await page.locator('input[type="checkbox"]').nth(1).check()
    for(var i = 0; i < 4; i++){
        await page.locator('input[type="checkbox"]').nth(i).check()
    }
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await page.getByRole('button', { name: 'Finalizar Registro' }).click()
    inicio = Date.now()
    await page.locator('text=Mis Torneos').waitFor({ state: 'visible' })
    fin = Date.now()
    console.log("Tiempo de creación de torneo: " + (fin - inicio) + "ms")
    await page.locator('text=Mis Torneos').waitFor({ state: 'visible' })
}

async function Random(boton) {
    var count = await boton.count()
    var random = Math.floor(Math.random() * count)
    console.log(random)
    await boton.nth(random).click({force: true })
}