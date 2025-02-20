import { test, Browser } from '@playwright/test'
import { fakerES_MX, faker } from '@faker-js/faker'

test("Unirme", async ({ page }) => {
    // Caso 1: Registro correcto
    // Caso 2: Límite de edad excedido
    // Caso 3: CURP inválido
    // Caso 4: CURP registrado previamente (Pendiente)

    await page.goto('http://localhost:3000/registroJugador/1740080290800')
    await page.getByRole('button', { name: 'Unirme al equipo' }).click()
    await page.getByPlaceholder('Nombre').fill(fakerES_MX.person.firstName())
    await page.getByPlaceholder('Apellido').fill(fakerES_MX.person.lastName())
    await page.getByRole('button', { name: 'Continuar' }).click()
    await page.pause()
    var tel = faker.number.int({ min: 1000000000, max: 9999999999 })
    await page.getByPlaceholder('Telefono').fill(tel.toString())
    console.log("Teléfono: " + tel)
    await page.getByPlaceholder('********').fill('12345678')
    await page.getByRole('button', { name: 'Continuar' }).click()
    await page.waitForTimeout(1000)
    await page.getByPlaceholder('Portero').click()
    await page.waitForTimeout(1000)
    var options = await page.locator('[data-combobox-option="true"][role="option"]').all()
    var random = Math.floor(Math.random() * options.length)
    await options[random].click()
    await page.waitForTimeout(1000)
    var num = Math.floor(Math.random() * 30).toString()
    await page.locator('[inputmode="numeric"]').fill(num)
    await page.getByRole('button', { name: 'Continuar' }).click()
    await page.waitForTimeout(500)
    var msg = await page.getByText('El dorsal ya esta en uso').isVisible()
    console.log("Número en uso: " + msg)
    if(msg){
        var num = Math.floor(Math.random() * 30).toString()
        await page.locator('[inputmode="numeric"]').fill(num)
        await page.getByRole('button', { name: 'Continuar' }).click()
    }
    await page.getByRole('button', { name: 'Lo háre desués' }).click()
    await page.pause()
    await page.getByPlaceholder('ejemplo: AACM651123MTSLLR06').fill('1234567891234')
    await page.getByRole('button', { name: 'Continuar' }).click()
    await page.pause()
    var fake = await page.getByText('¡CURP fuera de juego! No').isVisible()
    if(fake){
        console.log("Caso 3")
        process.exit(1)
    }
    var message = await page.getByText('¡Fuera de categoría! Excedes').isVisible()
    if(message){
        console.log("Caso 2")
        process.exit(1)
    }
    else{
        console.log("Caso 1")
        await page.getByRole('button', { name: 'Terminar' }).click()
        await page.pause()
    }
})

test("EditarInfo", async ({ page }) => {
    // Caso 1: Modificación correcta
    // Caso 2: El número ya esta en uso por otro jugador
    await page.goto('http://localhost:3000/auth')
    await page.getByTestId('inputCorreo').fill('527536757544')
    await page.getByTestId('inputPassword').fill('12345678')
    await page.getByTestId('crearCuenta').click()
    await page.pause()

    await page.getByRole('link', { name: 'Mis datos' }).click()
    await page.getByRole('button', { name: 'Editar mi información' }).click()
    await page.getByPlaceholder('Escribe tu nombre').fill(fakerES_MX.person.firstName())
    await page.getByPlaceholder('Escribe tu apellido').fill(fakerES_MX.person.lastName())
    var num = Math.floor(Math.random() * 30).toString()
    await page.locator('[inputmode="numeric"]').fill(num)
    await page.getByPlaceholder('Selecciona tu posición').click()
    await page.waitForTimeout(1000)
    var options = await page.locator('[data-combobox-option="true"][role="option"]').all()
    var random = Math.floor(Math.random() * options.length)
    await options[random].click()
    await page.waitForTimeout(1000)
    await page.getByRole('button', { name: 'Listo' }).click()

    if(await page.getByText('El número ya esta en uso por').isVisible()){
        console.log("Caso 2")
        process.exit(1)
    }

    console.log("Caso 1")
    await page.pause()
})