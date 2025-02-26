import { test } from '@playwright/test'
import { fakerES_MX, faker } from '@faker-js/faker'
import { registro_jugador, EditInfo } from './cuenta.spec'

test("Unirme", async ({ page }) => {
    // Caso 1: Registro correcto
    // Caso 2: Límite de edad excedido
    // Caso 3: CURP inválido
    // Caso 4: CURP registrado previamente 
    // Caso 5: Límite de jugadores alcanzaddo

    await page.goto('http://localhost:3000/registroJugador/1740411459905')
    await page.pause()
    var limit = await page.getByText('Tu equipo alcanzó el límite').first().isVisible()
    if(limit){
        console.log("Caso 5")
        process.exit(0)
    }
    await page.getByRole('button', { name: 'Unirme al equipo' }).click()
    await page.pause()
    await page.getByPlaceholder('Nombre').fill(fakerES_MX.person.firstName())
    await page.getByPlaceholder('Apellido').fill(fakerES_MX.person.lastName())
    await page.getByRole('button', { name: 'Continuar' }).click()
    var tel = faker.number.int({ min: 1000000000, max: 9999999999 })
    await page.getByPlaceholder('Telefono').fill(tel.toString())
    console.log("Teléfono: " + tel)
    await registro_jugador(page)
    await page.getByRole('button', { name: 'Lo háre desués' }).click()
    await page.getByRole('button', { name: 'Terminar' }).click()
    await page.getByRole('button', { name: 'Terminar' }).click()
    await page.pause()
    
})

test("EditarInfo", async ({ page }) => {
    await EditInfo( page )
})