import { Page } from '@playwright/test';
import { faker, fakerES_MX } from '@faker-js/faker'

var inicio, fin

export const login = async (page: Page) => {
  // await page.goto('http://localhost:3000/auth')
  await page.goto('https://caskr.app/auth')
  // await page.goto('https://dev.caskr.app/auth')
  
  await page.getByTestId('inputCorreo').fill('prueba1@prueba.com')
  await page.getByTestId('inputPassword').fill('12345678')
  await page.pause()
  await page.getByTestId('crearCuenta').click()
  inicio = Date.now()
  await page.locator('text=Inicio').waitFor({ state: 'visible' })
  fin = Date.now()
  console.log("Tiempo de inicio de sesión: " + (fin - inicio) + "ms")
  await desactivar(page)
}

export const desactivar = async (page: Page) => {
  var equipos = await page.locator('text=Seleccionar los equipos').isVisible()
  if(equipos){
    console.log("Equipos Caso 5: Desactivar equipo")
    var seleccionar = await page.locator('text=/\\d+ de \\d+ equipos/').innerText()
    var numeros = seleccionar.match(/\d+/g)
    var numero = numeros?.[1] ? parseInt(numeros[1]) : null
    console.log("Datos a desactivar: " + numero)
    await page.waitForTimeout(1000)

    for (var i = 0; i <= numero!; i++)
      await page.getByRole('checkbox', { name: 'Escudo equipo Equipo: ', exact: false }).nth(i).click()
    
    await page.getByRole('button', { name: 'Continuar' }).click()
    await page.getByRole('button', { name: 'Si, continuar' }).click()
    await page.pause()
  }

  var torneos = await page.locator('text=Seleccionar los torneos').isVisible()
  if(torneos){
    console.log("Torneos Caso 3: Límite de torneos activos")
    var seleccionar = await page.locator('text=/\\d+ de \\d+ torneos/').innerText()
    var numeros = seleccionar.match(/\d+/g)
    var numero = numeros?.[1] ? parseInt(numeros[1]) : null
    console.log("Datos a desactivar: " + numero)
    await page.waitForTimeout(1000)

    for (var i = 0; i <= numero!; i++)
      await page.getByRole('checkbox', { name: 'Liga Inicio: ', exact: false }).nth(i).click()
    
    await page.getByRole('button', { name: 'Continuar' }).click()
    await page.getByRole('button', { name: 'Si, continuar' }).click()
    await page.pause()
  }
}

export const programar_partido = async (page: Page) => {
  await page.getByLabel('día').click({ force: true })
  var fecha1 = new Date()
  var mes = fecha1.toLocaleString('es-ES', { month: 'long' }) 
  var fecha = [Math.floor(Math.random() * 28) + 1].toString() + " " + mes 
  await page.getByLabel(fecha).first().click({force: true})
  await page.waitForTimeout(1000)

  var fechaAleatoria = faker.date.recent()
  var horas = fechaAleatoria.getHours()
  var minutos = fechaAleatoria.getMinutes()
  var hora = horas.toString().padStart(2, '0');
  var minuto = minutos.toString().padStart(2, '0')
  await page.locator('input[type="time"]').fill(hora + ':' + minuto)
  await page.waitForTimeout(500)
  await page.getByPlaceholder('Selecciona la cancha').click({ force: true })
  await page.waitForTimeout(500)
  
  await page.getByRole('option', { name: new RegExp(`Cancha .+`)})
  var cancha = await page.locator('[data-combobox-option="true"][role="option"]:visible').all()
  var random_c = Math.floor(Math.random() * cancha.length)
  await cancha[random_c].click()
  await page.waitForTimeout(1000)

  await page.getByPlaceholder('Selecciona al árbitro').click({ force: true })
  var arbitro = await page.locator('[data-combobox-option="true"][role="option"]:visible').all()
  var random_a = Math.floor(Math.random() * arbitro.length)
  await arbitro[random_a].click()
  await page.waitForTimeout(500)

  var save_send = await page.getByRole('button', { name: 'Guardar y enviar'})
  var enviar = await save_send.getAttribute('data-disabled')

  if(enviar)
    await page.getByRole('button', { name: "Guardar enfrentamiento" }).click({ force: true })

  else{
    await save_send.click({ force: true })
    await page.getByRole('button', { name: 'Sí, envíales el mensaje' }).click({ force: true })
  }
  
  inicio = Date.now()
  await page.locator('[aria-modal="true"][role="dialog"]:visible').waitFor({ state: 'hidden'})
  fin = Date.now()
  console.log("Tiempo de programación de partido: " + (fin - inicio) + "ms")
}

export const jugador_existente = async (page: Page) => {
  await page.getByPlaceholder('Portero').click()
  await page.waitForTimeout(1000)
  var options = await page.locator('[data-combobox-option="true"][role="option"]:visible').all()
  var random = Math.floor(Math.random() * options.length)
  await options[random].click()
  await page.waitForTimeout(1000)
  var num = Math.floor(Math.random() * 100).toString()
  await page.locator('[inputmode="numeric"]').fill(num)
  await page.getByRole('button', { name: 'Continuar' }).click()
  await page.waitForTimeout(500)
  var msg = await page.getByText('El dorsal ya esta en uso').isVisible()
  console.log("Número en uso: " + msg)

  if(msg){
    var num = Math.floor(Math.random() * 100).toString()
    await page.locator('[inputmode="numeric"]').fill(num)
    await page.getByRole('button', { name: 'Continuar' }).click()
  }
}

export const registro_jugador = async (page: Page) => {
  var curp1 = await generar_curp(page)
  console.log("CURP: " + curp1)
  await page.getByPlaceholder('ejemplo: AACM651123MTSLLR06').fill(curp1)
  await page.getByRole('button', { name: 'Continuar' }).click()
  await page.waitForTimeout(2000)

  if(await page.getByText('¡Este CURP ya tiene dueño en').isVisible()){
    console.log("Caso 4")
    process.exit(0)
  }

  if(await page.getByText('¡CURP fuera de juego! No').isVisible()){
    console.log("Caso 3")
    process.exit(0)
  }

  if(await page.getByText('¡Fuera de categoría! Excedes').isVisible()){
    console.log("Caso 2")
    process.exit(0)
  }

  else{
    await page.waitForTimeout(1000)
    await page.getByRole('button', { name: 'Continuar' }).click()
    await page.waitForTimeout(1000)
    console.log("Caso 1")
  }
}

export const generar_curp = async (page: Page) => {
  var paterno = fakerES_MX.person.lastName()
  var materno = fakerES_MX.person.lastName()
  var name = fakerES_MX.person.firstName()
  var vocalP = paterno.match(/[aeiou]/)
  var paternoF = paterno.slice(0, 1) + vocalP
  var maternoF = materno.slice(0, 1)
  var nombre = name.slice(0, 1)
  var date = faker.date.past({ years: 10 })
  var fecha = `${date.getFullYear().toString().slice(-2)}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`
  var sexo = faker.helpers.arrayElement(['H', 'M'])
  var entidades = [
      'AS', 'BS', 'CL', 'GT', 'GR', 'HG', 'JC', 'MC', 'MN', 'MS', 'NT', 'NL', 'OC', 'PL', 'QR', 'QO', 'SL', 'SI', 'SM', 'SO', 'TB', 'TL', 'TS', 'VZ', 'YN', 'ZS'
  ];
  var lugar = faker.helpers.arrayElement(entidades)
  var paternoC = paterno.replace(/[aeiouáéíóú]/gi, '')[1] || null
  var maternoC = materno.replace(/[aeiouáéíóú]/gi, '')[1] || null
  var nombreC = name.replace(/[aeiouáéíóú]/gi, '')[1] || null
  let homoclave: string = String.fromCharCode(65 + Math.random() * 26 | 0) + (Math.random() * 10 | 0)
  var curp = paternoF + maternoF + nombre + fecha + sexo + lugar + paternoC + maternoC + nombreC + homoclave
  return curp
}

export const EditInfo = async (page: Page) => {
  // Caso 1: Modificación correcta
  // Caso 2: El número ya esta en uso por otro jugador
  await page.goto('http://localhost:3000/auth')
  await page.getByTestId('inputCorreo').fill('527626013893')
  await page.getByTestId('inputPassword').fill('12345678')
  await page.getByTestId('crearCuenta').click()
  await page.pause()

  await page.getByRole('link', { name: 'Mis datos' }).click()
  await page.getByRole('button', { name: 'Editar mi información' }).click()
  var file = await page.locator('input[type="file"]')
  var random = Math.floor(Math.random() * 14) + 1
  var imagen = 'C:/Users/E015/Downloads/Imágenes/Personas/persona' + random + '.jpg'
  console.log(random)
  await file.setInputFiles(imagen)
  await page.waitForTimeout(1500)
  await page.getByPlaceholder('Escribe tu nombre').fill(fakerES_MX.person.firstName())
  await page.getByPlaceholder('Escribe tu apellido').fill(fakerES_MX.person.lastName())
  var num = Math.floor(Math.random() * 30).toString()
  await page.locator('[inputmode="numeric"]').fill(num)
  await page.getByPlaceholder('Selecciona tu posición').click()
  await page.waitForTimeout(1000)
  var options = await page.locator('[data-combobox-option="true"][role="option"]:visible').all()
  var random = Math.floor(Math.random() * options.length)
  await options[random].click()
  await page.waitForTimeout(1000)
  await page.getByRole('button', { name: 'Listo' }).click()

  if(await page.getByText('El número ya esta en uso por').isVisible()){
      console.log("Caso 2")
      process.exit(0)
  }

  console.log("Caso 1")
  await page.pause()
}