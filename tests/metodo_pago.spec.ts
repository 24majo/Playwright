import { test, expect } from '@playwright/test'
import { fa, faker } from '@faker-js/faker'
import { login } from './cuenta.spec'

test.describe("CaskrApp", async() => {
    test.beforeEach(async ({ page }) => {
        await login(page)
    })

    test("Método de pago", async ({ page }) => {
        await page.getByRole('link', { name: 'Mis pagos' }).click();
        await page.getByRole('button', { name: 'Añadir método de pago' }).click();
        
        var frame = page.frameLocator('iframe').first();
        await frame.locator('//input[@name="cardnumber"]');
        await frame.locator('//input[@name="exp-date"]');
        await frame.locator('//input[@name="cvc"]');
        
        //await page.pause();
        
        await page.getByRole('button', { name: 'Añadir tarjeta' }).click();

        //await page.getByPlaceholder('Número de tarjeta').fill('4242424242424242');
        
        //await frame.frameLocator('[placeholder="Número de tarjeta"]').locator('//input[@name="cardnumber"]');

        // await page.waitForSelector('iframe[name="__privateStripeFrame9005"]');
        // var frame = await page.frameLocator('iframe[name="__privateStripeFrame9005"]');
        // await frame.fill('//input[@name="cardnumber"]', '4242424242424242');

        // await tarjeta.click();
        // await tarjeta.fill('4242424242424242');

        //var frame = page.frameLocator('iframe').first();

        //await page.waitForTimeout(10000);
        //await page.waitForSelector('input[name="cardnumber"]');   

        // const locator = page.locator('input[name="cardnumber"]');
        // await locator.waitFor();
        // await locator.fill('4242424242424242');
  })
})