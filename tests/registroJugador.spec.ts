import { BrowserContext, test, chromium, Browser, Page } from '@playwright/test'
import { fakerES_MX, faker } from '@faker-js/faker'
import { registro_jugador, EditInfo, jugador_existente } from './cuenta.spec'

var inicio: any
var fin: any

test("Unirme", async ({ page }) => {
    // Caso 1: Registro correcto
    // Caso 2: Límite de edad excedido
    // Caso 3: CURP inválido
    // Caso 4: CURP registrado previamente 
    // Caso 5: Límite de jugadores alcanzaddo

    await Registro({ page })
    var tel = faker.number.int({ min: 1000000000, max: 9999999999 })
    await page.getByPlaceholder('Telefono').fill(tel.toString())
    console.log("Teléfono: " + tel)
    await page.getByPlaceholder('********').fill('12345678')
    await page.getByRole('button', { name: 'Continuar' }).click()
    await page.waitForTimeout(1000)
    await page.getByPlaceholder('Nombre').fill(fakerES_MX.person.firstName())
    await page.getByPlaceholder('Apellido').fill(fakerES_MX.person.lastName())
    await page.getByRole('button', { name: 'Continuar' }).click()
    await jugador_existente(page)
    await registro_jugador(page)
    await Imagen({ page })
    // await page.getByRole('button', { name: 'Lo haré después' }).click()
    await page.getByRole('button', { name: 'Terminar' }).click()
    await page.getByRole('button', { name: 'Terminar' }).click()
    inicio = Date.now()
    await page.locator('text=Jugadores').waitFor({ state: 'visible' });
    fin = Date.now()
    console.log("Tiempo de inicio de sesión: " + (fin - inicio) + "ms")
})

test("Existente", async ({ page }) => {
    await Registro({ page })
    await page.getByPlaceholder('Telefono').fill('4732000001')
    await page.getByPlaceholder('********').fill('12345678')
    await page.getByRole('button', { name: 'Continuar' }).click()
    await page.getByRole('button', { name: 'Si, soy yo.' }).click()
    await jugador_existente(page)
    // await page.getByRole('button', { name: 'Lo haré después' }).click()
    await Imagen({ page })
    await page.getByRole('button', { name: 'Terminar' }).click()
    await page.getByRole('button', { name: 'Ir a mi perfil' }).click()
    inicio = Date.now()
    await page.getByRole('button', { name: 'Editar mi información' }).waitFor({ state: 'visible' })
    fin = Date.now()
    console.log("Tiempo de inicio de sesión: " + (fin - inicio) + "ms")
    await page.pause()
})

test("Login", async ({ page }) => {
    await Registro({ page })
    await page.getByPlaceholder('Telefono').fill('4732000001')
    await page.getByPlaceholder('********').fill('12345678')
    await page.getByRole('button', { name: 'Continuar' }).click()
    inicio = Date.now()
    await page.getByRole('button', { name: 'Editar mi información' }).waitFor({ state: 'visible' })
    fin = Date.now()
    console.log("Tiempo de inicio de sesión: " + (fin - inicio) + "ms")
})

test("Incompleto", async ({ page }) => {
    await Registro ({ page })
    var tel = faker.number.int({ min: 1000000000, max: 9999999999 })
    await page.getByPlaceholder('Telefono').fill(tel.toString())
    console.log("Teléfono: " + tel)
    await page.getByPlaceholder('********').fill('12345678')
    await page.getByRole('button', { name: 'Continuar' }).click()
    await page.waitForTimeout(1000)
    var name = fakerES_MX.person.firstName()
    var last_n = fakerES_MX.person.lastName()
    await page.getByPlaceholder('Nombre').fill(name)
    await page.getByPlaceholder('Apellido').fill(last_n)
    await page.getByRole('button', { name: 'Continuar' }).click()
    
    // Abrir nueva ventana del navegador para introducir credenciales
    const browser: Browser = await chromium.launch({ headless: false })
    var ventana: BrowserContext = await browser.newContext()
    const page2: Page = await ventana.newPage()
    await page2.goto('http://localhost:3000/auth')
    await page2.locator('div').filter({ hasText: /^Teléfono$/ }).first().click()
    await page2.getByRole('textbox', { name: 'Teléfono' }).fill(tel.toString())
    await page2.getByTestId('inputPassword').fill('12345678')
    await page2.getByTestId('crearCuenta').click()
    inicio = Date.now()
    var link = page2.getByRole('link', { name: 'Mis datos' })
    await link.waitFor({ state: 'visible' })
    fin = Date.now()
    console.log("Tiempo de inicio de sesión: " + (fin - inicio) + 'ms')
    await link.click()
    await page2.getByText(name + last_n).waitFor({ state: 'visible'})
    await page2.getByText('Portero').waitFor({ state: 'visible'})

    // Verificar que se pueda cerrar sesión de forma correcta
    await page2.getByRole('button', { name: 'Equipo ', exact: false }).click()
    await page2.getByRole('menuitem', { name: 'Cerrar Sesión' }).click()
    inicio = Date.now()
    await page2.getByText('Inicia sesión').waitFor({ state: 'visible' })
    fin = Date.now()
    console.log("Tiempo para cerrar sesión: " + (fin - inicio) + 'ms')
})

test("EditarInfo", async ({ page }) => {
    await EditInfo( page )
})

async function Registro({ page }){
    await page.goto('http://localhost:3000/registroJugador/1744303909367')
    // await page.goto('https://caskr.app/registroJugador/1741623095873')
    var limit = await page.getByText('Tu equipo alcanzó el límite').first().isVisible()
    
    if(limit){
        console.log("Caso 5")
        process.exit(0)
    }
    
    await page.getByRole('button', { name: 'Unirme al equipo' }).click()
    await page.waitForTimeout(1000)
}

async function Imagen (page: any) {
    var file = await page.locator('input[type="file"]')
    var random = Math.floor(Math.random() * 14) + 1
    var imagen = 'C:/Users/E015/Downloads/Imágenes/Personas/persona' + random + '.jpg'
    console.log(random)
    await file.setInputFiles(imagen)
    await page.waitForTimeout(1000)
}