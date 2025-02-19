import { test, expect } from '@playwright/test'
import { login } from './cuenta.spec'
import { faker } from '@faker-js/faker'

test("Cuenta", async ({  page }) => {
    // const numero = Math.random();
    // console.log(numero);

    // var n_cuenta = Math.floor(Math.random() * 100).toString()
    // console.log('majo' + n_cuenta + '@prueba.com')
    // await page.goto('http://localhost:3000/auth');
    // await page.pause()

    // var fecha = new Date()
    // var dia = fecha.getDate() // Para obtener el día en número
    // var mes = fecha.toLocaleString('es-ES', { month: 'long' }) // nombre del mes
    // console.log(dia + " " + mes)

    // for(var i = 0; i < 8; i++){
    //     var numero = faker.number.int({ min: 1000000000, max: 9999999999 }).toString()
    //     console.log("Núm: " + numero)
    // }

    await page.goto('http://localhost:3000/auth')
    await login(page)
    await page.pause()

    // for(var i = 0; i < 10; i++){
    //     var email = faker.internet.email()
    //     console.log(email)
    // }
})

test("Inicio", async ({ page }) => {
    await page.goto('http://localhost:3000/auth')
    await page.pause()
})

