import { tr } from '@faker-js/faker';
import { test, expect } from '@playwright/test';
import { agregar_arbitro, agregar_equipo, agregar_cancha } from './cuenta.spec'

test("Correo", async ({ page }) => {
    await page.goto('http://localhost:3000/auth');
    await page.getByRole('button', { name: 'Crear cuenta' }).click();

    var n_cuenta = Math.floor(1 + Math.random() * 200).toString();
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
    await page.waitForTimeout(1000); 

    await page.locator('//input[@name="nombre"]').fill('Liga');
    await page.waitForTimeout(1000); 

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
    await page.waitForTimeout(1000); 

    await page.getByLabel('dd-mm-aaaa').click();
    var fecha = new Date()
    var dia = fecha.getDate() 
    var mes = fecha.toLocaleString('es-ES', { month: 'long' }) 
    await page.getByRole('cell', { name: dia + " " + mes }).first().click();

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
    await page.waitForTimeout(1000)

    await page.locator('//input[@name="customerName"]').fill('Alondra Guerrero')
    var nombre = await page.locator('//input[@name="customerName"]').inputValue()
    nombre = nombre.replace(/\s+/g, '_')
    var n_correo = Math.floor(10 + Math.random() * 100).toString()
    await page.locator('//input[@name="email"]').fill(nombre + n_correo + "@prueba.com")
    var correo = await page.locator('//input[@name="email"]').inputValue()
    console.log("Correo: " + correo)

    await page.locator('//input[@name="phoneCustomer"]').fill(numero)
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await page.waitForTimeout(1000); 

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

    await page.getByLabel('dd-mm-aaaa').click()
    await page.getByRole('cell', { name: '31 enero' }).click()
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await page.getByRole('button', { name: 'Se parece a este' }).first().click()
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await page.getByRole('button', { name: 'Siguiente' }).click()
    await page.getByRole('button', { name: 'Finalizar Registro' }).click()
    await page.pause()
})

async function AgregarEquipo({ page }){
    await page.locator('input[type="checkbox"]').first().click()
    await page.getByRole('button', { name: 'Agregar equipo' })
    var n_equipo = await agregar_equipo(page, n_equipo)
    console.log(n_equipo)
    await page.getByLabel('Registro de equiposNuevo').getByRole('button', { name: 'Agregar equipo' }).click({ force: true })
    await page.pause()
}

async function AgregarArbitro({ page }) {
    await page.locator('input[type="checkbox"]').first().click()
    await page.getByRole('button', { name: 'Agregar árbitro' }).click({ force: true })
    await agregar_arbitro(page)
    await page.getByRole('button', { name: 'Agregar arbitro' }).click({ force: true })
}

async function AgregarCancha({ page }) {
    await page.locator('input[type="checkbox"]').first().click()
    await page.getByRole('button', { name: 'Añadir Cancha' }).click({ force: true })
    await agregar_cancha(page)
    await page.getByRole('button', { name: 'Agregar cancha' }).click({ force: true })
}