import { test, expect } from '@playwright/test'
import { login, crear_torneo, desactivar } from './cuenta.spec'

test.beforeEach(async ({ page }) => {
    await login(page)
    await page.getByRole('link', { name: 'Mis torneos' }).click({ force: true })
})

test("Crear", async ({ page }) => {
    // Caso 1: Creación de torneo
    // Caso 2: Límite de torneos alcanzado para crear
    // Caso 3: Límite de torneos activos
    await page.pause()
    var torneo = await page.getByRole('button', {name: 'Crear torneo'})
    await expect(torneo).toBeVisible() // Si no es visible, es por Caso 2
    var boton = await torneo.isVisible() 
    console.log("Botón agregar equipo: " + boton)

    if(boton){
        //for (var i = 0; i < 1; i++){
            await torneo.click({ force: true})
            console.log("Caso 1")
            await crear_torneo(page)
            await page.pause()
        //}
    }
    await desactivar(page) // Caso 3
})

test("Editar", async ({ page }) => {
    await page.getByRole('button', {name: 'Crear torneo'}).click({ force: true})
    await page.getByRole('row', { name: /^formal/ }).getByRole('button').nth(1).click({ force: true })
    //await page.getByTestId('inputNombreCompetencia').nth(2).fill('')

    var formato = ['Eliminación directa','Eliminación directa (ida y vuelta)','Liga','Liga (ida y vuelta)'];
    var t_formato = formato[Math.floor(Math.random() * formato.length)];
    console.log("Formato: " + t_formato)
    await page.getByTestId('selectFormatoCompetencia').nth(2).click({ force: true })
    await page.waitForTimeout(1000)
    await page.getByRole('option', { name: t_formato, exact: true }).click({ force: true })
    //await page.getByRole('button', { name: 'Guardar cambios' }).nth(2).click({ force: true })
    await page.pause()
})

test("Active Delete", async ({ page }) => {
    // Caso 1: Eliminación exitosa
    // Caso 2: Torneo actual en el perfil
    
    await page.pause()
    var boton = page.locator('role=row').locator('role=button')
    var count = await boton.count()
    console.log('Botones:', count)
    var botones: number[] = []
    for (let j = 2; j < count; j += 3) {
        await boton.nth(j).hover()
        botones.push(j)
        await page.pause()
    }
    console.log('Botones eliminar:', botones)
    var random = Math.floor(Math.random() * botones.length)
    //var b_eliminar = botones[random] 
    var b_eliminar = 2 // Para confirmar el caso 2
    await boton.nth(b_eliminar).click({force: true })
    await page.pause()

    var modal1 = await page.getByRole('heading', { name: '¿Estás seguro de eliminar el' }).isVisible()
    console.log("Modal confirmar eliminar: " + modal1)
    var modal2 = await page.getByRole('heading', { name: 'No puedes eliminar este torneo' }).isVisible()
    console.log("Modal confirmar eliminar: " + modal2)

    if(modal1){
        await page.getByRole('button', { name: 'Sí, Eliminar' }).click({ force: true })
        console.log("Caso 1")
    }

    if(modal2){
        await page.getByRole('button', { name: 'Entendido' }).click({ force: true })
        console.log("Caso 2")
    }

    // var modal = await page.getByRole('heading', { name: 'No puedes eliminar este torneo' }).isVisible()
    // console.log("Modal visible: " + modal)
    // if(modal){
    //     console.log("Caso 3")
    //     await page.getByRole('button', { name: 'Entendido' }).click({ force: true })
    //     process.exit(0)
    // }
    // await page.pause()
})

test("Inactivo Eli", async ({ page }) => {
    await page.getByRole('tab', { name: 'Torneos inactivos' }).click({ force: true })
    await page.getByLabel('Torneos inactivos').locator('button').nth(2).click({ force: true })
    await page.waitForTimeout(500)
    await page.getByRole('button', { name: 'Sí, Eliminar' }).click({ force: true })
    await page.pause()
})