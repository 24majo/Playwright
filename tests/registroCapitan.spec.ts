import { test } from '@playwright/test'
import { registro_jugador, EditInfo } from './cuenta.spec'
import { fakerES_MX } from '@faker-js/faker'

var inicio, fin

test("Unirme", async ({ page }) => {
    // Caso 1: Registro correcto
    // Caso 2: CURP inválido

    await page.goto('https://localhost:3000/registroCapitan/1741974914351/1741974914352')
    // await page.goto('https://dev.caskr.app/registroCapitan/1741974914351/1741974914352')
    // await page.goto('https://caskr.app/registroCapitan/1740584601379/1740584601380')
    
    var button = page.getByRole('button', { name: 'Unirme al equipo' })
    await button.waitFor({ state: 'visible' })
    await button.click()
    await page.getByPlaceholder('********').fill('12345678')
    await registro_jugador(page)
    await page.getByRole('button', { name: 'Lo haré después' }).click()
    await page.getByRole('button', { name: 'Terminar' }).click()
    await page.getByRole('button', { name: 'En otro momento '}).click()
    inicio = Date.now()
    await page.locator('text=Jugadores').waitFor({ state: 'visible' })
    fin = Date.now()
    console.log("Tiempo de registro de capitán: " + (fin - inicio) + "ms")
})

test("EditInfo", async ({ page }) => {
    await EditInfo( page )
})

test("EditTeam", async ({ page }) => {
    await page.goto('http://localhost:3000/auth')
    await page.getByTestId('inputCorreo').fill('524522217332')
    await page.getByTestId('inputPassword').fill('12345678')
    await page.getByTestId('crearCuenta').click()
    await page.pause()
    await page.getByRole('button').nth(2).click()
    var file = await page.locator('input[type="file"]')
    var random = Math.floor(Math.random() * 40) + 1
    var imagen = 'C:/Users/E015/Downloads/Imágenes/Escudos/escudo' + random + '.jpg'
    console.log(random)
    await file.setInputFiles(imagen)
    await page.waitForTimeout(1500)
    var equipo = fakerES_MX.company.name()
    var n_equipo = equipo.replace(/[^a-zA-Z0-9 ]/g, '');
    await page.locator('//input[@name="nombre"]').fill("Equipo " + n_equipo)
    var r = Math.floor(Math.random() * 255) + 1;  
    var g = Math.floor(Math.random() * 255) + 1; 
    var b = Math.floor(Math.random() * 255) + 1; 
    var a = (Math.random()).toFixed(1)
    var rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
    await page.getByPlaceholder('Selecciona un color').fill(rgba)
    await page.pause()
    await page.getByRole('button', { name: 'Listo' }).click()
})