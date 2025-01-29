import { test, expect } from '@playwright/test';
 
test.describe("CaskrApp", async() => {
    test.beforeEach("Inicios de sesión", async ({ page }) => {
        await page.goto('http://localhost:3000/auth');
        await page.getByTestId('inputCorreo').fill('majo90@prueba.com'); 
        await page.getByTestId('inputPassword').fill('12345678');
        await page.getByTestId('crearCuenta').click();
        await page.waitForTimeout(1000); 
    })

    test("Agregar", async ({ page }) => {
        // Caso 1: Agregar un equipo con éxito
        // Caso 2: No es posible agregar por partidos agendados
        // Caso 3: Límite de equipos alcanzado 

        await page.getByRole('link', { name: 'Equipos' }).click()

        for(var i = 0; i < 3; i++){
            await page.click('//span[text()="Agregar equipo"]')
            await page.waitForTimeout(2000)
            var n_equipo = Math.floor(Math.random() * 20)
            await page.locator('//input[@name="nombre"]').fill("Equipo " + n_equipo);

            var nombres = ['Lucero', 'Sofía', 'Frida', 'Matías', 'Eliseo', 'Cinthia', 'Édgar', 'Enrique', 'Julio', 'César', 'Leonardo', 'Ramses', 'Juan', 'David'];
            var nombre = nombres[Math.floor(Math.random() * nombres.length)];
            await page.locator('//input[@name="nombre_capitan"]').fill(nombre);

            var apellidos = ['Albor', 'Salazar', 'Rodríguez', 'Cuevas', 'Solórzano', 'Ramos', 'Delgado', 'Ávalos', 'Ruiz', 'Segoviano'];
            var apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
            await page.locator('//input[@name="apellidos_capitan"]').fill(apellido);

            var telefono = Math.floor(1000000000 + Math.random() * 9000000000).toString();
            await page.locator('//input[@name="telefono"]').fill(telefono);

            await page.getByLabel('LigaAgregar nuevo equipo').getByRole('button', { name: 'Agregar equipo' }).click();
            await page.waitForTimeout(5000)

            var participantes = await page.getByLabel('Equipos participantes').innerText()
            var p_lista = participantes.match(/Equipo \d+/g)
            p_lista?.includes("Equipo " + n_equipo)

            var todos = await page.getByLabel('Todos los equipos').innerText()
            var t_lista = todos.match(/Equipo \d+/g)
            t_lista!.includes("Equipo " + n_equipo)

            await page.pause()
            // await page.locator('//span[text()="Cancelar"]').click(); // Botón para cancelar acción
        }
        // await page.pause();
    })

    test("Inactivo", async ({ page }) => {
        await page.getByRole('link', { name: 'Equipos' }).click()
        // var contar = await page.getByLabel('Equipos participantes').getByText(/Equipo \d+/).count()
        //const equipo = await page.getByLabel('Equipos participantes').locator('text=/Equipo \d+/').count()
        var participantes = await page.getByLabel('Equipos participantes').innerText();
        var equipo = participantes.match(/Equipo \d+/g);
        console.log(equipo);
        var random = equipo![Math.floor(Math.random() * equipo!.length)];
        //var equipos = await page.getByLabel('Equipos participantes').getByText(/Equipo \d+/).nth(2).textContent()
        //var num = equipos!.match(/\d+/)?.[0]; // Con ! afirmamos que el elemento no es null
        console.log(random)
        await page.pause()
        await page.getByRole('row', { name: new RegExp(`escudo ${random} .+`) }).getByRole('button').click({ force: true });
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
        await page.getByRole('link', { name: 'Equipos' }).click()
        await page.getByRole('tab', {name: 'Equipos inactivos'}).click()
        await page.pause()
        var inactivos = await page.getByLabel('Equipos inactivos').innerText();
        var equipo = inactivos.match(/Equipo \d+/g);
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
            var lista = participantes.match(/Equipo \d+/g);
            var equ = lista!.includes(random)
            console.log(equ)
        }
    })

    test("Eliminar", async ({ page }) => {
        // Caso 1: Eliminar equipo con éxito
        // Caso 2: No eliminar equipo por pendientes de agenda
        await page.getByRole('link', { name: 'Equipos' }).click()
        var participantes = await page.getByLabel('Equipos participantes').innerText()
        var equipo = participantes.match(/Equipo \d+/g)
        console.log("Lista: " + equipo)
        var random = equipo![Math.floor(Math.random() * equipo!.length)]
        console.log(random)
        await page.waitForTimeout(2000)
        await page.getByRole('row', { name: new RegExp(`escudo ${random} .+`) }).getByRole('button').click({ force: true })
        await page.waitForTimeout(2000)
        await page.getByRole('button', { name: 'Eliminar' }).nth(equipo!.length - 1).click({ force: true })

        const msj = await page.locator('p:text("No puedes eliminar este equipo porque tiene partidos agendados")')
    
        if(await msj.isVisible())
            console.log("Caso 2")
        else
            console.log("Caso 1")

        await page.pause()
    })
})
