import { Page } from '@playwright/test';
import { faker } from '@faker-js/faker'

export const login = async (page: Page) => {
  await page.goto('http://localhost:3000/auth')
  await page.getByTestId('inputCorreo').fill('majo143@prueba.com')
  await page.getByTestId('inputPassword').fill('12345678')
  await page.getByTestId('crearCuenta').click()
}

export const agregar_equipo = async (page: Page, n_equipo) => {
  await page.waitForTimeout(2000)
  // await page.locator('img[src="https://rfgspzjirszjxyddzfqy.supabase.co/storage/v1/object/public/generic-image/genericTeam.png"]')
  // .evaluate((img: HTMLImageElement) => {
  //   img.src = 'C:/Users/E015/Downloads/escudo.png'
  // })
  // await page.pause()
  //n_equipo = Math.floor(Math.random() * 20)
  var equipo = faker.company.name()
  n_equipo = equipo.replace(/[^a-zA-Z0-9]/g, ' ');
  await page.locator('//input[@name="nombre"]').fill("Equipo " + n_equipo)
  await page.locator('//input[@name="nombre_capitan"]').fill(faker.person.firstName())
  await page.locator('//input[@name="apellidos_capitan"]').fill(faker.person.lastName())
  //var telefono = Math.floor(1000000000 + Math.random() * 9000000000).toString()
  await page.locator('//input[@name="telefono"]').fill(faker.phone.number())
  return n_equipo
}

export const agregar_arbitro = async (page: Page) => {
  var nombre = faker.person.firstName()
  var apellido = faker.person.lastName()
  await page.waitForTimeout(2000)
  await page.getByRole('button', { name: 'Agregar árbitro' }).click({ force: true })
  await page.locator('//input[@name="nombres"]').fill(nombre)
  await page.locator('//input[@name="apellidos"]').fill(apellido)
  await page.locator('//input[@name="telefono"]').fill(faker.phone.number())
  await page.locator('//input[@name="email"]').fill(nombre + '_' + apellido + '@arbitro.com')
}

export const agregar_cancha = async (page: Page) => {
  // Imagen
  var file = await page.locator('input[type="file"]')
  var imagen = 'C:/Users/E015/Downloads/cancha.jpg'
  await file.setInputFiles(imagen)
  await page.waitForTimeout(1500)

  var n_cancha = faker.location.city()
  console.log("Cancha " + n_cancha)
  await page.locator('//input[@name="nombre"]').fill("Cancha " + n_cancha)
  await page.waitForTimeout(2000)
  var lugar = ['Deportiva', "Calle", "Estadio", "Deportivo", "Puerto"]
  var ubicacion = lugar[Math.floor(Math.random() * lugar.length)]
  //var ubicacion = faker.location.city()
  console.log("Ubicación: " + ubicacion)
  await page.getByPlaceholder('Ubicación').fill(ubicacion)
  var num = Math.floor(Math.random() * 4)
  console.log("Numero: " + num)
  await page.waitForTimeout(1500)
  await page.getByText(ubicacion, { exact: false }).nth(num).click({ force: true })
  await page.getByTestId('inputDescripcion').fill('Pasto sintético')
  await page.waitForTimeout(2000)
}

export const crear_torneo = async (page: Page) => {
  await page.locator('//input[@name="nombre"]').fill('Liga');
  await page.waitForTimeout(1000); 
  var formato = ['Eliminación directa','Eliminación directa (ida y vuelta)','Liga','Liga (ida y vuelta)'];
  var t_formato = formato[Math.floor(Math.random() * formato.length)];
  console.log("Formato: " + t_formato)
  await page.getByPlaceholder('Ej. Liga + Liguilla, Eliminacion directa').click();
  await page.waitForTimeout(1000); 
  await page.getByRole('option', { name: t_formato, exact: true }).click();
  await page.waitForTimeout(1000); 

  var sexo = ['Varonil', 'Femenil']
  var categoria = sexo[Math.floor(Math.random() * sexo.length)]
  console.log("Categoría: " + categoria)
  await page.getByPlaceholder('Ej. Varonil').click();
  await page.waitForTimeout(1000); 
  await page.getByRole('option', { name: categoria }).click();
  await page.waitForTimeout(1000); 

  await page.getByLabel('dd-mm-aaaa').click();
  var fecha = new Date()
  var dia = fecha.getDate() 
  var mes = fecha.toLocaleString('es-ES', { month: 'long' }) 
  await page.getByRole('cell', { name: dia + " " + mes }).first().click()

  await page.getByRole('button', { name: 'Siguiente' }).click()
  await page.getByRole('button', { name: 'Se parece a este' }).first().click()
  await page.getByRole('button', { name: 'Siguiente' }).click()
  await page.getByRole('button', { name: 'Siguiente' }).click()
  await page.getByRole('button', { name: 'Siguiente' }).click()
  await page.getByRole('button', { name: 'Finalizar Registro' }).click()
}