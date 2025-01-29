import { test, expect } from '@playwright/test';

test.describe("CaskrApp", async() => {
    test.beforeEach("Inicios de sesión", async ({ page }) => {
        await page.goto('http://localhost:3000/auth');
        await page.getByTestId('inputCorreo').fill('majo90@prueba.com');
        await page.getByTestId('inputPassword').fill('12345678');
        await page.getByTestId('crearCuenta').click();
        await page.getByRole('link', { name: 'Calendario' }).click();
    })

    test("Generar", async ({ page }) => {
        // Caso 1: Generar calendario cumpliendo el número de equipos par para un torneo
        // Caso 2: Opción inhabilitada por falta de equipos
        var boton = page.getByRole('button', { name: 'Crear el calendario' })
        
        var visible = await boton.isVisible()

        if(visible){
            var disponible = await boton.getAttribute('data-disabled')
            if(disponible){
                console.log("Caso 2")
                process.exit(0); // 0 sin errores, 1 con error
            }

            if(boton == null){
                console.log("Caso 1")
                await page.getByRole('button', { name: 'Crear el calendario' }).click({ force: true })
                await page.getByRole('link', { name: 'Calendario' }).click();
            }
        }
        
        if(!visible){
            await page.pause()
            await page.getByRole('tab', { name: 'Por jornadas' }).click({ force: true })
            
            await page.getByRole('button', { name: 'Programar' }).click({ force: true })
            await page.getByLabel('día').click({ force: true })
            await page.getByRole('cell', { name: '31 enero' }).click({ force: true })

            await page.getByPlaceholder('Selecciona la cancha')
            await page.getByRole('option', { name: 'Cancha 3' })

            await page.getByPlaceholder('Selecciona al árbitro')


            await page.getByRole('button', { name: 'Guardar enfrentamiento' })
            await page.getByRole('button', { name: 'Guardar y enviar' })

            // getByRole('banner').getByRole('button') // Este es para cerrar en la "x"

            //await page.getByRole('tab', { name: 'Todos los partidos' }).click({ force: true })
            await page.getByRole('button', { name: 'Programar fecha y hora' }).click({ force: true })
            await page.getByLabel('día').click({ force: true })
            // Hacer un tab para ver si reconoce el campo de hora
            await page.getByPlaceholder('Selecciona la cancha').click({ force: true })
            await page. getByRole('option', { name: 'Cancha 3' }).first().click({ force: true })
            await page.getByPlaceholder('Selecciona al árbitro').click({ force: true })

        }
    })
})