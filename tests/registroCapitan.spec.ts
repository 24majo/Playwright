import { test } from '@playwright/test'
import { jugador_existente, EditInfo, generar_curp } from './cuenta.spec'
import { fakerES_MX } from '@faker-js/faker'

var inicio: any, fin: any

test("Unirme", async ({ page }) => {
    // Caso 1: Registro correcto
    // Caso 2: CURP inválido

    await page.goto('http://localhost:3000/registroCapitan/1748629002563/1748629002359')
    // await page.goto('https://dev.caskr.app/registroCapitan/1748628997483/1741974914352')
    // await page.goto('https://caskr.app/registroCapitan/1750784461493/1750784461293')
    
    var button = page.getByRole('button', { name: 'Unirme al equipo' })
    await button.waitFor({ state: 'visible' })
    await button.click()
    await page.getByPlaceholder('********').fill('12345678')
    await page.getByRole('button', { name: 'Continuar' }).click()
    await page.pause()
    // await Imagen({ page })
    await page.getByRole('button', { name: 'Lo haré después' }).click()
    await page.getByRole('button', { name: 'Terminar' }).click()
    await page.getByRole('button', { name: 'En otro momento '}).click()
    await page.getByRole('button', { name: 'Ir a mi perfil' }).click()
    inicio = Date.now()
    await page.getByRole('button', { name: 'Editar mi información' }).waitFor({ state: 'visible' })
    fin = Date.now()
    console.log("Tiempo de registro de capitán: " + (fin - inicio) + "ms")
})

// test("EditInfo", async ({ page }) => {
//     await EditInfo( page )
// })

test("Agregar jugador", async ({ page }) => {
    await page.goto('http://localhost:3000/auth')
    var telefono = await page.locator('label').filter({ hasText: 'Teléfono' })
    await telefono.waitFor({ state: 'visible' })
    await telefono.click()
    await page.getByRole('textbox', { name: 'Teléfono' }).fill('9561969573')
    await page.getByTestId('inputPassword').fill('12345678')
    await page.getByTestId('crearCuenta').click()
    await page.pause()

    await page.getByRole('button', { name: 'Editar mi información' }).waitFor({state: 'visible'})
    await page.getByRole('link', { name: 'Resumen' }).click()

    for(var i = 0; i < 15; i++){
        await page.getByRole('button', { name: 'Nuevo jugador' }).click()
        await Imagen(page)
        await page.getByRole('textbox', { name: 'Nombre' }).fill(fakerES_MX.person.firstName())
        await page.getByRole('textbox', { name: 'Apellidos' }).fill(fakerES_MX.person.lastName())
        await page.getByRole('textbox', { name: 'Número' }).fill(fakerES_MX.number.int({ min: 0, max: 100 }).toString())
        await page.getByRole('textbox', { name: 'Posición' }).click()
        var posicion = await page.locator('[data-combobox-option="true"][role="option"]:visible').all()
        var random_a = Math.floor(Math.random() * posicion.length)
        await posicion[random_a].click()
        var curp1 = await generar_curp(page)
        await page.getByRole('textbox', { name: 'CURP' }).fill(curp1)

        var acta = await page.locator('[type="file"][accept="application/pdf"]').first()
        await acta.setInputFiles('C:/Users/E015/Downloads/Temporada Completa.pdf')

        var estudio = await page.locator('[type="file"][accept="application/pdf"]').nth(1)
        await estudio.setInputFiles('C:/Users/E015/Downloads/Temporada Completa.pdf')

        await page.getByRole('button', { name: 'Guardar cambios' }).click()
        await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden'})
    }
    await page.pause()
})

// No aplican para la nueva versión
// test("EditTeam", async ({ page }) => {
//     await page.goto('http://localhost:3000/auth')
//     await page.getByTestId('inputCorreo').fill('524522217332')
//     await page.getByTestId('inputPassword').fill('12345678')
//     await page.getByTestId('crearCuenta').click()
//     await page.pause()
//     await page.getByRole('button').nth(2).click()
//     var file = await page.locator('input[type="file"]')
//     var random = Math.floor(Math.random() * 40) + 1
//     var imagen = 'C:/Users/E015/Downloads/Imágenes/Escudos/escudo' + random + '.jpg'
//     console.log(random)
//     await file.setInputFiles(imagen)
//     await page.waitForTimeout(1500)
//     var equipo = fakerES_MX.company.name()
//     var n_equipo = equipo.replace(/[^a-zA-Z0-9 ]/g, '');
//     await page.locator('//input[@name="nombre"]').fill("Equipo " + n_equipo)
//     var r = Math.floor(Math.random() * 255) + 1;  
//     var g = Math.floor(Math.random() * 255) + 1; 
//     var b = Math.floor(Math.random() * 255) + 1; 
//     var a = (Math.random()).toFixed(1)
//     var rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
//     await page.getByPlaceholder('Selecciona un color').fill(rgba)
//     await page.pause()
//     await page.getByRole('button', { name: 'Listo' }).click()
// })

// --------------------------------------------

async function Imagen (page: any) {
    var file = await page.locator('[type="file"][accept="image/png,image/jpeg"]')
    var random = Math.floor(Math.random() * 14) + 1
    var imagen = 'C:/Users/E015/Downloads/Imágenes/Personas/persona' + random + '.jpg'
    await file.setInputFiles(imagen)
    await page.waitForTimeout(1000)
}
