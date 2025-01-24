import { test, expect } from '@playwright/test';

test("Correo", async ({ page }) => {
    await page.goto('http://localhost:3000/auth');
    await page.getByRole('button', { name: 'Crear cuenta' }).click();

    var n_cuenta = Math.floor(10 + Math.random() * 100).toString();
    var correo = 'majo' + n_cuenta + '@prueba.com';
    console.log("Correo: " + correo);
    await page.getByTestId('inputCorreo').fill(correo);
    await page.getByTestId('inputPassword').fill('12345678');
    await page.getByTestId('crearCuenta').click();
    await page.waitForTimeout(2000); 

    await page.locator('//input[@name="customerName"]').fill('Alondra Guerrero');
    var numero = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    console.log("Teléfono: " + numero);
    await page.locator('//input[@name="phoneCustomer"]').fill(numero);
    await page.getByRole('button', { name: 'Siguiente' }).click();
    await page.waitForTimeout(2000); 

    await page.locator('//input[@name="nombre"]').fill('Liga');
    await page.waitForTimeout(2000); 

    var formato = ['Eliminación directa','Eliminación directa (ida y vuelta)','Liga','Liga (ida y vuelta)'];
    var t_formato = formato[Math.floor(Math.random() * formato.length)];
    console.log("Formato: " + t_formato)
    await page.getByPlaceholder('Ej. Liga + Liguilla, Eliminacion directa').click();
    await page.waitForTimeout(1000); 
    await page.getByRole('option', { name: t_formato, exact: true }).click();
    await page.waitForTimeout(2000); 

    var sexo = ['Varonil', 'Femenil']
    var categoria = sexo[Math.floor(Math.random() * sexo.length)]
    console.log("Categoría: " + categoria)
    await page.getByPlaceholder('Ej. Varonil').click();
    await page.waitForTimeout(1000); 
    await page.getByRole('option', { name: categoria }).click();
    await page.waitForTimeout(2000); 

    await page.getByLabel('dd-mm-aaaa').click();
    await page.getByRole('cell', { name: '29 enero' }).click();
    await page.getByRole('button', { name: 'Siguiente' }).click();
    await page.getByRole('button', { name: 'Se parece a este' }).first().click();
    await page.getByRole('button', { name: 'Siguiente' }).click();
    await page.getByRole('button', { name: 'Siguiente' }).click();
    await page.getByRole('button', { name: 'Siguiente' }).click();
    await page.getByRole('button', { name: 'Finalizar Registro' }).click();
    await page.pause();
})

test("Numero", async ({ page }) => {
    await page.goto('http://localhost:3000/auth');
    await page.getByRole('button', { name: 'Crear cuenta' }).click();
    var numero = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    console.log("Teléfono: " + numero);
    await page.getByTestId('inputCorreo').fill(numero);

    await page.getByTestId('inputPassword').fill('12345678');
    await page.getByTestId('crearCuenta').click();
    await page.waitForTimeout(2000)

    await page.locator('//input[@name="customerName"]').fill('Alondra Guerrero')
    var nombre = await page.locator('//input[@name="customerName"]').inputValue()
    nombre = nombre.replace(/\s+/g, '_')
    var n_correo = Math.floor(10 + Math.random() * 100).toString()
    await page.locator('//input[@name="email"]').fill(nombre + n_correo + "@prueba.com")
    var correo = await page.locator('//input[@name="email"]').inputValue()
    console.log("Correo: " + correo)

    await page.locator('//input[@name="phoneCustomer"]').fill(numero)
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await page.waitForTimeout(2000); 

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
    //await page.waitForTimeout(2000); 
})
