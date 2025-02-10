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

test("Eliminar", async ({ page }) => {
    // Caso 1: Eliminación exitosa
    // Caso 2: No se puede eliminar por tener partidos agendados
    await page.getByRole('button', {name: 'Crear torneo'}).click({ force: true})
    await page.getByRole('row', { name: /^formal/ }).getByRole('button').nth(2).click({ force: true })
    await page.pause()
})