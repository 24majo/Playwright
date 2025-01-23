import { test, expect } from '@playwright/test';

test.beforeEach("Inicios de sesion", async ({ page }) => {
    await page.goto('http://localhost:3000/auth');
    await page.getByTestId('inputCorreo').fill('majo76@prueba.com');
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

test("Eliminar", async ({ page }) => {
    await page.pause()
    var formato = ['Eliminación directa','Eliminación directa (ida y vuelta)','Liga','Liga (ida y vuelta)'];
    for (let i = 0; i < formato.length; i++) {
        var op_formato = await expect(page.getByText(formato[i], { exact: true }).first()).toBeVisible()
        await page.getByRole('row', { name: '/' + op_formato + '.*/' }).getByRole('button').first().click();
        //console.log(op_formato)
        //const opcionLocator = page.locator(`text=${formato[i]}`);
        // if (await opcionLocator.isVisible()) {
        //     console.log("Visible")
        //     await page.getByRole('row', { name: '/'+opcionLocator+'.*/' }).getByRole('button').first().click();
        //     await page.pause()
        //     break; // Sale del bucle una vez que ha hecho click en el primer elemento visible
        // }
        // else{
        //     await page.getByRole('button', { name: 'Next Page' }).click();
        //     await page.pause()
        // }
    }
    /*
        await page.getByRole('row', { name: 'formal Liga (ida y vuelta)' }).getByRole('button').nth(2).click();
        await page.getByRole('button', { name: 'Previous Page' }).click();
        await page.getByRole('button', { name: 'Next Page' }).click();
        await page.getByRole('button', { name: 'First Page' }).click();
        await page.getByRole('button', { name: 'Last Page' }).click();
        await page.getByText('Liga (ida y vuelta)').click();
        await page.getByRole('row', { name: 'formal Liga (ida y vuelta)' }).getByRole('button').nth(1).click();

    */
})