import { test, expect } from '@playwright/test';

test.describe("CaskrApp", async() => {
    test.beforeEach("Inicios de sesión", async ({ page }) => {
        await page.goto('http://localhost:3000/auth');
        await page.getByTestId('inputCorreo').fill('majo70@prueba.com');
        await page.getByTestId('inputPassword').fill('12345678');
        await page.getByTestId('crearCuenta').click();
    })

    test("Agregar cancha", async ({ page }) => {
        await page.getByRole('link', { name: 'Canchas' }).click();
        await page.click('//span[text()="Agregar cancha"]');
        await page.locator('//input[@name="nombre"]').fill("Cancha");
        await page.waitForTimeout(2000)
        var lugar = ['Deportiva', "Calle", "Estadio", "Deportivo", "Puerto"];
        var ubicacion = lugar[Math.floor(Math.random() * lugar.length)];
        console.log("Ubicación: " + ubicacion)
        await page.getByPlaceholder('Ubicación').fill(ubicacion);

        var num = Math.floor(1 + Math.random() * 4);
        console.log("Numero: " + num)
        //await page.pause()
        await page.waitForTimeout(2000)
        //await page.locator('div:nth-child(24) > div:nth-child('+num+') > .pac-icon').click();
        //await page.locator('div:nth-child('+num+') > .pac-icon').first().click();
        await page.getByText(ubicacion, { exact: false }).nth(num).click({ force: true });
        //await page.getByLabel('LigaAñadir nueva cancha').getByRole('img').nth(num).click();
        await page.getByTestId('inputDescripcion').fill('Pasto sintético');
        await page.getByLabel('LigaAñadir nueva cancha').getByRole('button', { name: 'Agregar cancha' }).click();
        await page.waitForTimeout(3000)
    })

    test("Eliminar cancha", async ({ page }) => {
        await page.getByRole('link', { name: 'Canchas' }).click();
        var num = Math.floor(1 + Math.random() * 4);
        //console.log(num)
        //await page.locator('div:nth-child(3) > div:nth-child(2)').click()
        
        var div = await page.locator('div:nth-child(3)').count()
        console.log(div)

        // await page.waitForTimeout(4000)
        // await page.locator('.mantine-UnstyledButton-root').first().click({ force: true })
        // await page.pause()

        //await page.locator('div:nth-child('+num+') > div:nth-child(2) > div > .m_8bffd616 > button:nth-child(2)').click();
        //await page.pause()

        /* 
            await page.locator('.m_8bffd616 > div > .m_8bffd616 > button:nth-child(2)').first().click();
            await page.locator('div:nth-child(2) > div:nth-child(2) > div > .m_8bffd616 > button:nth-child(2)').click();
            await page.locator('div:nth-child(3) > div:nth-child(2) > div > .m_8bffd616 > button:nth-child(2)').click();
            await page.locator('div:nth-child(4) > div:nth-child(2) > div > .m_8bffd616 > button:nth-child(2)').click();
        */
    })
})