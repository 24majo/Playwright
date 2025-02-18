import { Page } from '@playwright/test';
import { faker } from '@faker-js/faker'

export const login = async (page: Page) => {
  await page.goto('http://localhost:3000/auth')
  await page.getByTestId('inputCorreo').fill('majo162@prueba.com')
  //await page.getByTestId('inputCorreo').fill('4731201250')
  await page.getByTestId('inputPassword').fill('12345678')
  await page.getByTestId('crearCuenta').click()
  await page.pause()
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

export const agregar_equipo = async (page: Page, n_equipo) => {
  await page.waitForTimeout(2000)
  // await page.locator('img[src="https://rfgspzjirszjxyddzfqy.supabase.co/storage/v1/object/public/generic-image/genericTeam.png"]')
  // .evaluate((img: HTMLImageElement) => {
  //   img.src = 'C:/Users/E015/Downloads/escudo.png'
  // })
  var equipo = faker.company.name()
  n_equipo = equipo.replace(/[^a-zA-Z0-9]/g, ' ');
  await page.locator('//input[@name="nombre"]').fill("Equipo " + n_equipo)
  await page.locator('//input[@name="nombre_capitan"]').fill(faker.person.firstName())
  await page.locator('//input[@name="apellidos_capitan"]').fill(faker.person.lastName())
  await page.locator('//input[@name="telefono"]').fill(faker.number.int({ min: 1000000000, max: 9999999999 }).toString())
  return n_equipo
}

export const agregar_arbitro = async (page: Page) => {
  await page.waitForTimeout(2000)
  await page.getByRole('button', { name: 'Agregar árbitro' }).click({ force: true })
  await page.locator('//input[@name="nombres"]').fill(faker.person.firstName())
  await page.locator('//input[@name="apellidos"]').fill(faker.person.lastName())
  await page.locator('//input[@name="telefono"]').fill(faker.number.int({ min: 1000000000, max: 9999999999 }).toString())
  await page.locator('//input[@name="email"]').fill(faker.internet.email())
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

export const registrar_resultado = async (page: Page, registrar) => {
  var num_btn = await registrar.count()
  console.log("Botones: " + num_btn)

  for(var i = 0; i < num_btn; i++){
    var btn_registro = registrar.nth(i)
    var desactivado = await btn_registro.getAttribute('data-disabled') // true o null
    console.log(i + ": " + desactivado)

    if(desactivado === null){
      btn_registro.click({ force: true })
      var random = Math.floor(Math.random() * 10).toString()
      await page.locator('input[name="puntos_local"]').fill(random)
      random = Math.floor(Math.random() * 10).toString()
      await page.locator('input[name="puntos_visitante"]').fill(random)
      await page.waitForTimeout(1000)
      await page.getByRole('button', { name: 'Guardar' }).click({ force: true })
      await page.pause()
    }
  }
  await page.pause()
}

export const programar_partido = async (page: Page) => {
  await page.getByLabel('día').click({ force: true })
  await page.waitForTimeout(1000)
  var fecha1 = new Date()
  var mes = fecha1.toLocaleString('es-ES', { month: 'long' }) 
  var fecha = [Math.floor(1 + Math.random() * 25)].toString() + " " + mes 
  console.log(fecha)
  await page.getByRole('cell', { name: fecha }).first().click({ force: true })
  await page.waitForTimeout(1000)

  var fechaAleatoria = faker.date.recent()
  var horas = fechaAleatoria.getHours()
  var minutos = fechaAleatoria.getMinutes()
  var hora = horas.toString().padStart(2, '0');
  var minuto = minutos.toString().padStart(2, '0')
  console.log("Hora: " + hora + ":" + minuto)
  await page.locator('input[type="time"]').fill(hora + ':' + minuto)
  await page.waitForTimeout(1000)
  await page.getByPlaceholder('Selecciona la cancha').click({ force: true })
  await page.waitForTimeout(1000)
  
  var cancha = await page.getByRole('option', { name: new RegExp(`Cancha .+`)})
  var n_cancha = await cancha.count()
  console.log("Canchas: " + n_cancha)
  var random = Math.floor(Math.random() * n_cancha)
  await cancha.nth(random).click()
  await page.waitForTimeout(1000)

  await page.getByPlaceholder('Selecciona al árbitro').click({ force: true })
  await page.waitForTimeout(1000)
  for(var y = 0; y < random; y++){
    await page.getByPlaceholder('Selecciona al árbitro').press('ArrowDown')
    await page.waitForTimeout(1000)
  }
  await page.getByPlaceholder('Selecciona al árbitro').press('Enter')
  await page.waitForTimeout(1000)

  var save_send = await page.getByRole('button', { name: 'Guardar y enviar'})
  var enviar = await save_send.getAttribute('data-disabled')

  if(enviar)
    await page.getByRole('button', { name: "Guardar enfrentamiento" }).click({ force: true })

  else{
    await save_send.click({ force: true })
    await page.waitForTimeout(1000)
    await page.getByRole('button', { name: 'Si, envíales el mensaje' }).click({ force: true })
    await page.waitForTimeout(1000)
  }
      
  await page.pause()
}