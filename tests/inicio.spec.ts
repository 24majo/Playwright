import { test } from '@playwright/test'
import { login, programar_partido } from './cuenta.spec'
import { registrar_resultado } from './resultados.spec'

test.beforeEach(async ({ page }) => {

    await login(page)
})

test("Jornada", async ({ page }) => {
    var jornada = await page.getByRole('tab', { name: 'J- ', exact: false })
    var c_jornada = await jornada.count()
    console.log("Jornadas: " + c_jornada)

    for(var i = 1; i <= c_jornada; i++){
        await jornada.nth(i-1).click()
        var dia = await page.getByRole('button', { name: 'Programar fecha y hora' })
        var c_dia = await dia.count()
        console.log("Botón programar: " + c_dia)

        for(var j = 1; j <= c_dia; j++){
            await dia.nth(j-1).click({ force: true })
            programar_partido(page)
            await page.pause()
        }
        
        var registrar = await page.getByRole('button', { name: 'Registrar resultado' })
        await registrar_resultado (page, registrar)
    }
})
