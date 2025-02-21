import { test, Browser } from '@playwright/test'
import { fakerES_MX, faker } from '@faker-js/faker'

test("Unirme", async ({ page }) => {
    await page.goto('http://localhost:3000/registroCapitan/176/19')
    await page.pause()
    await page.getByRole('button', { name: 'Unirme al equipo' }).click()
    await page.getByPlaceholder('********').fill('12345678')
    await page.getByRole('button', { name: 'Continuar' }).click()
    await page.pause()
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
    // Pide CURP
    await page.getByRole('button', { name: 'Lo haré después' }).click()
    await page.getByRole('button', { name: 'Terminar' }).click()
    await page.getByRole('button', { name: 'En otro momento '}).click()
    await page.pause()
})