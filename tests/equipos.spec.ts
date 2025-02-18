import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { login, agregar_equipo } from './cuenta.spec'
 
test.describe("CaskrApp", async() => {
    test.beforeEach(async ({ page }) => {
        await login(page)
        await page.getByRole('link', { name: 'Equipos' }).click()
    })

    test("Agregar", async ({ page }) => {
        // Caso 1: Agregar un equipo con éxito
        // Caso 2: Torneo activo
        // Caso 3: Límite de equipos alcanzado 
        // Caso 4: No es posible agregar por partidos agendados
        // Caso 5: Desactivar equipo
        
        await page.pause()
        var agregar = await page.getByRole('button', { name: 'Agregar equipo' })
        await expect(agregar).toBeVisible() // Si no es visible, es por Caso 2
        var boton = await agregar.isVisible() 
        console.log("Botón agregar equipo: " + boton)
        
        if(boton){
            var bloqueado = await agregar.getAttribute('data-disabled')
            console.log("Botón bloqueado: " + bloqueado)
            
            if(bloqueado){
                console.log("Caso 4")
                process.exit(0)
            }

            for(var i = 0; i < 4; i++){
                await agregar.click()
                var button = await page.getByRole('button', { name: 'Sí, estoy seguro' }).isVisible()
                console.log("Boton calendario: " + button)

                if(button){
                    console.log("Caso 2")
                    var si = page.getByRole('button', { name: 'Sí, estoy seguro' })
                    var no = page.getByRole('button', { name: 'No, Cancelar' })
                    var botones = [si, no]
                    var elegir = botones[Math.floor(Math.random() * botones.length)]
                    await elegir.click({ force: true })

                    if(elegir == si){
                        console.log("Agregó equipos con calendario agendado")
                        var n_equipo = await agregar_equipo(page, n_equipo)
                        await page.getByLabel('LigaAgregar nuevo equipo').getByRole('button', { name: 'Agregar equipo' }).click();
                        await page.waitForTimeout(2000)
                        await page.pause()
                        process.exit(0)
                    }
                    else{
                        console.log("No agregó equipos por calendario agendado")
                        process.exit(0)
                    }
                }

                else{
                    console.log("Caso 1")
                    var n_equipo = await agregar_equipo(page, n_equipo)
                    await page.getByLabel('LigaAgregar nuevo equipo').getByRole('button', { name: 'Agregar equipo' }).click();
                    await page.waitForTimeout(2000)
                    var participantes = await page.getByLabel('Equipos participantes').innerText()
                    var p_lista = participantes.match(/Equipo \w+/g)
                    p_lista?.includes("Equipo " + n_equipo)
                    await page.waitForTimeout(1000)
                    var todos = await page.getByLabel('Todos los equipos').innerText()
                    var t_lista = todos.match(/Equipo \w+/g)
                    t_lista?.includes("Equipo " + n_equipo)
                    await page.pause()
                }
            }
        }
    })

    test("Editar", async ({ page }) => {
        await page.getByRole('row', { name: 'escudo Equipo ', exact: false }).getByRole('button').first().click({ force: true })
        await page.waitForTimeout(2000)
        var n_equipo = Math.floor(Math.random() * 20)
        await page.getByPlaceholder("Escribe el nombre del equipo").nth(4).fill("Equipo " + n_equipo)
        await page.getByPlaceholder("Nombre(s)").nth(4).fill(faker.person.firstName())
        await page.getByPlaceholder("Apellido(s)").nth(4).fill(faker.person.lastName())
        await page.locator('//input[@name="telefono"]').nth(4).fill(faker.number.int({ min: 1000000000, max: 9999999999 }).toString())
        await page.getByRole('button', { name: 'Guardar cambios' }).nth(4).click({ force: true })
        await page.pause()
    })

    test("Inactivo", async ({ page }) => {
        // var contar = await page.getByLabel('Equipos participantes').getByText(/Equipo \d+/).count()
        //const equipo = await page.getByLabel('Equipos participantes').locator('text=/Equipo \d+/').count()
        var participantes = await page.getByLabel('Equipos participantes').innerText();
        var equipo = participantes.match(/Equipo \w+/g);
        console.log(equipo);
        var random = equipo![Math.floor(Math.random() * equipo!.length)];
        //var equipos = await page.getByLabel('Equipos participantes').getByText(/Equipo \d+/).nth(2).textContent()
        //var num = equipos!.match(/\d+/)?.[0]; // Con ! afirmamos que el elemento no es null
        console.log(random)
        await page.pause()
        await page.getByRole('row', { name: new RegExp(`escudo ${random} .+`) }).getByRole('button').first().click({ force: true });
        await page.waitForTimeout(2000)
        await page.locator('div').filter({ hasText: /^Activo$/ }).locator('span').nth(1).click({ force: true });
        await page.waitForTimeout(2000)
        await page.locator('//span[text()="Guardar cambios"]').nth(equipo!.length -1).click()
        await page.waitForTimeout(2000)
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
        var msj = page.locator('p:has-text("No puedes eliminar este")')
        var participantes = await page.getByLabel('Equipos participantes').innerText()
        var equipo = participantes.match(/Equipo \w+/g)
        console.log("Lista: " + equipo)
        var random = equipo![Math.floor(Math.random() * equipo!.length)]
        console.log(random)
        await page.waitForTimeout(2000)
        await page.getByRole('row', { name: new RegExp(`escudo ${random} .+`) }).getByRole('button').first().click({ force: true })
        await page.waitForTimeout(2000)
        await page.getByRole('button', { name: 'Eliminar' }).nth(equipo!.length - 1).click({ force: true })
        await msj.waitFor({ state: 'visible' })
        var visible = await msj.isVisible()
        console.log("Mensaje: " + visible)

        if(msj)
            console.log("Caso 2")
        
        else
            console.log("Caso 1")
        
        await page.pause()
    })
})
