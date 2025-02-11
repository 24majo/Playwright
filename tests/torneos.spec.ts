import { test } from '@playwright/test'
import { login, crear_torneo } from './cuenta.spec'

test.beforeEach(async ({ page }) => {
    await login(page)
    await page.getByRole('link', { name: 'Mis torneos' }).click({ force: true })
})

test("Crear", async ({ page }) => {
    //for (var i = 0; i < 4; i++){
        await page.getByRole('button', {name: 'Crear torneo'}).click({ force: true})
        await crear_torneo(page)
        await page.pause()
    //}
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
    // Caso 2: No se puede eliminar por tener partidos agendados
    // Caso 3: Torneo actual en el perfil
    await page.pause()
    // var formal = page.getByRole('row', { name: new RegExp('formal .+')}).getByRole('button').nth(2)
    // var flexible = page.getByRole('row', { name:  new RegExp('flexible .+')}).getByRole('button').nth(2)
    // var count1 = await formal.count()
    // var count2 = await flexible.count()
    // console.log(count1 + count2)

    var boton = page.locator('role=row').locator('role=button')
    var count = await boton.count()
    console.log('Botones:', count)
    for (let j = 2; j < count; j += 3) {
        count++
        await boton.nth(j).hover()
        await page.pause()
      }
    await page.pause()
    
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