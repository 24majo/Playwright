import { test, expect } from '@playwright/test'
import { faker, fakerES_MX } from '@faker-js/faker'
import { login } from './cuenta.spec'

var inicio, fin

test.describe("CaskrApp", async() => {
    test.beforeEach(async ({ page }) => {
        await login(page)
        await page.getByRole('link', { name: 'Equipos' }).click()
        await page.locator('text=Equipos').nth(0).waitFor({ state: 'visible' })
    })

    test("Agregar", async ({ page }) => {
        // Caso 1: Agregar un equipo con éxito
        // Caso 2: Fixture generado
        // Caso 3: Límite de equipos alcanzado 
        // Caso 4: No es posible agregar por partidos agendados
        // Caso 5: Desactivar equipo (excedente por tipo de plan)
        
        await page.pause()
        var agregar = await page.getByRole('button', { name: 'Agregar equipo' })
        await expect(agregar).toBeVisible() // Si no es visible, es por Caso 3
        var boton = await agregar.isVisible() 
        
        if(boton){
            var bloqueado = await agregar.getAttribute('data-disabled')
            
            if(bloqueado){
                console.log("Caso 4")
                process.exit(0)
            }

            for(var i = 0; i < 16; i++){
                await agregar.click()
                await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor()
                var button = await page.getByRole('button', { name: 'Sí, estoy seguro' }).isVisible()

                if(button){
                    console.log("Caso 2")
                    await page.getByRole('button', { name: 'Sí, estoy seguro' }).click({ force: true })
                    console.log("Agregó equipos con calendario agendado")
                    var n_equipo = await agregar_equipo(page, n_equipo)
                    await page.getByLabel(/Agregar/).getByRole('button', { name: 'Agregar equipo' }).click()
                    inicio = Date.now()
                    await page.locator('[data-modal-content="true"][role="dialog"]:visible').waitFor({ state: 'hidden' })
                    fin = Date.now()
                    console.log("Tiempo de creación de equipos: " + (fin - inicio) + "ms")
            
                }

                else{
                    console.log("Caso 1")
                    var n_equipo = await agregar_equipo(page, n_equipo)
                    await page.getByLabel(/Agregar/).getByRole('button', { name: 'Agregar equipo' }).click()
                    inicio = Date.now()
                    await page.locator('[data-modal-content="true"][role="dialog"]:visible').waitFor({ state: 'hidden' })
                    fin = Date.now()
                    console.log("Tiempo de creación de equipos: " + (fin - inicio) + "ms")
                    var participantes = await page.getByLabel('Equipos participantes').innerText()
                    var p_lista = participantes.match(/Equipo \w+/g)
                    p_lista?.includes("Equipo " + n_equipo)
                    var todos = await page.getByLabel('Todos los equipos').innerText()
                    var t_lista = todos.match(/Equipo \w+/g)
                    t_lista?.includes("Equipo " + n_equipo)
                }
            }
        }
    })

    test("Editar", async ({ page }) => {
        for(var i = 0; i < 6; i++){
            await page.getByRole('row', { name: 'escudo Equipo ', exact: false }).getByRole('button').first().click({ force: true })
            await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible' })
            var n_equipo = Math.floor(Math.random() * 20)
            await page.getByPlaceholder("Escribe el nombre del equipo").fill("Equipo " + n_equipo)
            await page.getByPlaceholder("Nombre(s)").fill(faker.person.firstName())
            await page.getByPlaceholder("Apellido(s)").fill(faker.person.lastName())
            await page.locator('//input[@name="telefono"]').fill(faker.number.int({ min: 1000000000, max: 9999999999 }).toString())
            await page.getByRole('button', { name: 'Guardar cambios' }).click({ force: true })
            inicio = Date.now()
            await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden'})
            fin = Date.now()
            console.log("Tiempo de edición de equipos: " + (fin - inicio) + "ms")
            await page.waitForTimeout(1000)
        }
    })

    test("Inactivo", async ({ page }) => {
        var participantes = await page.getByLabel('Equipos participantes').innerText();
        var equipo = participantes.match(/Equipo \w+/g);
        console.log(equipo);
        var random = equipo![Math.floor(Math.random() * equipo!.length)]
        console.log(random)
        await page.pause()
        await page.getByRole('row', { name: new RegExp(`escudo ${random} .+`) }).getByRole('button').first().click({ force: true })
        await page.locator('div').filter({ hasText: /^Activo$/ }).locator('span').nth(1).click({ force: true })
        await page.locator('//span[text()="Guardar cambios"]').nth(equipo!.length -1).click()
        await page.getByText('Equipos registrados').isVisible()
        await page.getByText(random).nth(1).isVisible()
        await page.getByRole('tab', {name: 'Equipos inactivos'}).isVisible()
        await page.getByRole('tab', {name: 'Equipos inactivos'}).click()
        await page.getByText('Equipos inactivos').getByText(random).isVisible()
        await page.pause()
    })

    test("Activar", async ({ page }) => {
        // Caso 1: Varios equipos, habilitar uno de ellos
        // Caso 2: Un equipo, no es visible pestaña de equipos inactivos
        // Caso 3: No hay equipos inactivos. Error válido.
        await page.getByRole('tab', {name: 'Equipos inactivos'}).click()
        await page.pause()
        var inactivos = await page.getByLabel('Equipos inactivos').innerText();
        var equipo = inactivos.match(/Equipo \w+/g);
        console.log(equipo);
        var random = equipo![Math.floor(Math.random() * equipo!.length)];
        console.log(random)
        await page.getByRole('row', { name: new RegExp(`escudo ${random} .+`) }).getByRole('button').click({ force: true });
        await page.waitForTimeout(2000)
        await page.locator('div').filter({ hasText: /^Inactivo$/ }).locator('span').nth(1).click({ force: true });
        await page.waitForTimeout(2000)
        await page.locator('//span[text()="Guardar cambios"]').nth(equipo!.length -1).click()
        console.log("Arreglo: "+equipo!.length)
        await page.pause()

        // En caso de que solo hubiera un equipo desactivado, debe de estar en equipos participantes
        // y la opción de equipos inhabilitados no debe de ser visible
        if(equipo!.length == 1){
            !(await page.getByText('Equipos inactivos').getByText(random).isVisible())
            !(await page.getByText('Equipos registrados').isVisible())
            var participantes = await page.getByLabel('Equipos participantes').innerText();
            var lista = participantes.match(/Equipo \w+/g);
            var equ = lista!.includes(random)
            console.log(equ)
        }
    })

    test("Eliminar", async ({ page }) => {
        // Caso 1: Eliminar equipo con éxito
        // Caso 2: No eliminar equipo por pendientes de agenda
        for(var i = 0; i < 8; i++){
            var msj = page.locator('p:has-text("No puedes eliminar este")')
            var participantes = await page.getByLabel('Equipos participantes').innerText()
            var equipo = participantes.match(/Equipo \w+/g)
            var random = equipo![Math.floor(Math.random() * equipo!.length)]
            console.log(random)

            await page.getByRole('row', { name: new RegExp(`escudo ${random} .+`) }).getByRole('button').first().click({ force: true })
            await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor()
            await page.getByRole('button', { name: 'Eliminar' }).click({ force: true })
            var visible = await msj.isVisible()
            console.log("Mensaje: " + visible)

            if(!msj)
                console.log("Caso 2")
            
            else{
                console.log("Caso 1")
                inicio = Date.now()
                await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden'})
                fin = Date.now()
                console.log("Tiempo de eliminación de equipos: " + (fin - inicio) + "ms")
                await page.waitForTimeout(1000)
            }
        }
    })
})

// -------------------------------------------------------------

export const agregar_equipo = async (page: any, n_equipo) => {
    var file = await page.locator('input[type="file"]')
    var random = Math.floor(Math.random() * 40) + 1
    var imagen = 'C:/Users/E015/Downloads/Imágenes/Escudos/escudo' + random + '.jpg'
    await file.setInputFiles(imagen)
    var equipo = fakerES_MX.animal.petName()
    n_equipo = equipo.replace(/[^a-zA-Z0-9]/g, ' ')
    await page.locator('//input[@name="nombre"]').fill("Equipo " + n_equipo)
    await page.locator('label').filter({ hasText: 'Añadir datos del DT' }).locator('span').nth(1).click()
    await page.waitForTimeout(1000)
    await page.getByRole('textbox', { name: 'Nombre(s)' }).fill(fakerES_MX.person.firstName())
    await page.getByRole('textbox', { name: 'Apellido(s)' }).fill(fakerES_MX.person.lastName())
    await page.getByRole('textbox', { name: 'Telefono' }).fill(faker.number.int({ min: 3000000000, max: 9999999999 }).toString())
    return n_equipo
}