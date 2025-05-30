import { test } from '@playwright/test';
import { login } from './cuenta.spec'
import { fakerES_MX } from '@faker-js/faker';

var inicio, fin

test.describe("CaskrApp", async() => {
    test.beforeEach(async ({ page }) => {
        await login(page)
        await page.getByRole('link', { name: 'Canchas' }).click()
    })

    test("Agregar", async ({ page }) => {
        for(var i = 0; i < 5; i++){
            await page.click('//span[text()="Agregar cancha"]')
            await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor()
            await agregar_cancha(page)
            await page.getByLabel(/Añadir/).getByRole('button', { name: 'Agregar cancha' }).click({ force: true })
            inicio = Date.now()
            await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden'})
            fin = Date.now()
            console.log("Tiempo de registro de canchas: " + (fin - inicio) + "ms")
        }
    })

    test("Eliminar", async ({ page }) => {
        // Caso 1: Eliminar exitosamente
        // Caso 2: No es posible eliminar porque tiene partidos registrados en ella
        
        for(var i = 0; i < 4; i++){
            var borrar = page.locator('button:nth-child(2)').nth(2)
            // await expect(borrar).toBeVisible()
            await borrar.click({ force: true })
            await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible' })
            await page.getByRole('button', { name: 'Eliminar' }).click({ force: true })
            var error = await page.locator('text=Está cancha no puede ser').isVisible()
            
            if(error)
                console.log("Caso 2")

            else{
                console.log("Caso 1")
                inicio = Date.now()
                await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden' })
                fin = Date.now()
                console.log("Tiempo de eliminación de cancha: " + (fin - inicio) + "ms")
            }
            await page.waitForTimeout(1000)
        }    
    })

    test("Editar", async ({ page }) => {
        for(var i = 0; i < 6; i++){
            await page.locator('button').nth(3).click()
            await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'visible' })
            await agregar_cancha(page)
            await page.getByRole('button', { name: 'Guardar cambios' }).click({ force: true })
            inicio = Date.now()
            await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden'})
            fin = Date.now()
            console.log("Tiempo de edición de canchas: " + (fin - inicio) + "ms")
            await page.waitForTimeout(1000)
        }
        
    })
})

// ---------------------------------------------------

export const agregar_cancha = async (page: any) => {
  var file = await page.locator('input[type="file"]')
  var imagen = 'C:/Users/E015/Downloads/cancha.jpg'
  await file.setInputFiles(imagen)
  await page.locator('//input[@name="nombre"]').fill("Cancha " + fakerES_MX.location.city())
  var lugar = ['Deportiva', "Calle", "Estadio", "Deportivo", "Puerto"]
  var ubicacion = lugar[Math.floor(Math.random() * lugar.length)]
  await page.getByPlaceholder('Ubicación').fill(ubicacion)
  var num = Math.floor(Math.random() * 4)
  await page.getByText(ubicacion).nth(1).click({ force: true })
  await page.getByTestId('inputDescripcion').fill('Pasto sintético')
}