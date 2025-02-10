import { test } from '@playwright/test';
import { agregar_arbitro, agregar_equipo, agregar_cancha, crear_torneo } from './cuenta.spec'
import { faker } from '@faker-js/faker'

test.beforeEach("Iniciar", async ({ page }) => {
    await page.goto('http://localhost:3000/auth');
    await page.getByRole('button', { name: 'Crear cuenta' }).click()
})

test("Correo", async ({ page }) => {
    var tipo = "Correo"
    var n_cuenta = Math.floor(1 + Math.random() * 200).toString()
    var cuenta = 'majo' + n_cuenta + '@prueba.com'
    console.log("Correo: " + cuenta)
    await Cuenta({ page, cuenta, tipo })
})

test("Numero", async ({ page }) => {
    var tipo = "Numero"
    var cuenta = faker.number.int({ min: 1000000000, max: 9999999999 }).toString()
    await Cuenta({ page, cuenta, tipo })
})

async function Cuenta({ page, cuenta, tipo }) {
    await page.getByTestId('inputCorreo').fill(cuenta)
    await page.getByTestId('inputPassword').fill('12345678')
    await page.getByTestId('crearCuenta').click()
    await page.waitForTimeout(2000)
    await page.locator('//input[@name="customerName"]').fill('Alondra Guerrero')

    if(tipo === "Correo"){
        await page.locator('//input[@name="phoneCustomer"]').fill(faker.number.int({ min: 1000000000, max: 9999999999 }).toString())
    }

    if(tipo === "Numero"){
        // var nombre = await page.locator('//input[@name="customerName"]').inputValue()
        // nombre = nombre.replace(/\s+/g, '_')
        // var n_correo = Math.floor(1 + Math.random() * 200).toString()
        //await page.locator('//input[@name="email"]').fill(nombre + n_correo + "@prueba.com")
        //var correo = await page.locator('//input[@name="email"]').inputValue()
        //console.log("Correo: " + correo)
        var email = faker.internet.email()
        await page.locator('//input[@name="email"]').fill(email)
        await page.pause()
        await page.locator('//input[@name="phoneCustomer"]').fill(cuenta) // Pendiente
    }

    await page.getByRole('button', { name: 'Siguiente' }).click()
    await page.waitForTimeout(1000)
    await crear_torneo(page)
    await page.pause()
}

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