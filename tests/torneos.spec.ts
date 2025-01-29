import { test, expect } from '@playwright/test';

test.beforeEach("Inicios de sesion", async ({ page }) => {
    await page.goto('http://localhost:3000/auth');
    await page.getByTestId('inputCorreo').fill('majo84@prueba.com');
    await page.getByTestId('inputPassword').fill('12345678');
    await page.getByTestId('crearCuenta').click();
    await page.getByRole('link', { name: 'Mis torneos' }).click()
})

test("Crear", async ({ page }) => {
    for (var i = 0; i < 6; i++){
        await page.getByRole('button', {name: 'Crear torneo'}).click({ force: true})
        await page.locator('//input[@name="nombre"]').fill('Liga');
        await page.waitForTimeout(1000); 

        var formato = ['Eliminación directa','Eliminación directa (ida y vuelta)','Liga','Liga (ida y vuelta)'];
        var t_formato = formato[Math.floor(Math.random() * formato.length)];
        console.log("Formato: " + t_formato)
        await page.getByPlaceholder('Ej. Liga + Liguilla, Eliminacion directa').click();
        await page.waitForTimeout(1000); 
        await page.getByRole('option', { name: t_formato, exact: true }).click();
        await page.waitForTimeout(1000); 

        var sexo = ['Varonil', 'Femenil']
        var categoria = sexo[Math.floor(Math.random() * sexo.length)]
        console.log("Categoría: " + categoria)
        await page.getByPlaceholder('Ej. Varonil').click();
        await page.waitForTimeout(1000); 
        await page.getByRole('option', { name: categoria }).click();
        await page.waitForTimeout(1000); 

        await page.getByLabel('dd-mm-aaaa').click();
        await page.getByRole('cell', { name: '29 enero' }).click();
        await page.getByRole('button', { name: 'Siguiente' }).click();
        await page.getByRole('button', { name: 'Se parece a este' }).first().click();
        await page.getByRole('button', { name: 'Siguiente' }).click();
        await page.getByRole('button', { name: 'Siguiente' }).click();
        await page.getByRole('button', { name: 'Siguiente' }).click();
        await page.getByRole('button', { name: 'Finalizar Registro' }).click();
        await page.pause();
    }
    await page.pause();
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
    await page.getByRole('button', {name: 'Crear torneo'}).click({ force: true})
    await page.getByRole('row', { name: /^formal/ }).getByRole('button').nth(2).click({ force: true })
    await page.pause()
})