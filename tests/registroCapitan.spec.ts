import { test } from '@playwright/test'
import { registro_jugador, EditInfo } from './cuenta.spec'
import { fakerEL, fakerES_MX } from '@faker-js/faker'

test("Unirme", async ({ page }) => {
    // Caso 1: Registro correcto
    // Caso 2: CURP inválido
    await page.goto('http://localhost:3000/registroCapitan/1740441366451/1740441366452')
    await page.pause()
    await page.getByRole('button', { name: 'Unirme al equipo' }).click()
    
    await registro_jugador(page)
    await page.getByRole('button', { name: 'Lo haré después' }).click()
    await page.getByRole('button', { name: 'Terminar' }).click()
    await page.getByRole('button', { name: 'En otro momento '}).click()
    await page.pause()
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