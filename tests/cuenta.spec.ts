import { Page } from "@playwright/test";
import { faker, fakerES_MX } from "@faker-js/faker";

var inicio, fin;

export const login = async (page: Page) => {
  // await page.goto('http://localhost:3000/auth')
  await page.goto("https://caskr.app/auth");
  // await page.goto('https://dev.caskr.app/auth')

  var correo = await page.getByTestId("inputCorreo");
  await correo.waitFor({ state: "visible" });
  // await correo.fill('pruebas1@dominio.com')
  // await correo.fill('marketing@caskrapp.com')

  // await correo.fill('majo3@cuenta.com')
  // await correo.fill('majo175@prueba.com')

  // await correo.fill('prueba101@cuenta.com')
  await correo.fill("majo58@prueba.com");
  // await correo.fill('usuario@pruebas.com')
  await page.getByTestId("inputPassword").fill("12345678");
  await page.pause();
  await page.getByTestId("crearCuenta").click();
  inicio = Date.now();
  await page.locator("text=Inicio").waitFor({ state: "visible" });
  await page
    .getByRole("button", { name: "Compartir Torneo" })
    .waitFor({ state: "visible" });
  fin = Date.now();
  console.log("Tiempo de inicio de sesión: " + (fin - inicio) + "ms");
  await desactivar(page);
};

export const desactivar = async (page: Page) => {
  var equipos = await page.locator("text=Seleccionar los equipos").isVisible();
  if (equipos) {
    console.log("Equipos Caso 5: Desactivar equipo");
    var seleccionar = await page
      .locator("text=/\\d+ de \\d+ equipos/")
      .innerText();
    var numeros = seleccionar.match(/\d+/g);
    var numero = numeros?.[1] ? parseInt(numeros[1]) : null;
    console.log("Datos a desactivar: " + numero);
    await page.waitForTimeout(1000);

    for (var i = 0; i <= numero!; i++)
      await page
        .getByRole("checkbox", { name: "Escudo equipo Equipo: ", exact: false })
        .nth(i)
        .click();
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.getByRole("button", { name: "Si, continuar" }).click();
    await page.pause();
  }

  var torneos = await page.locator("text=Seleccionar los torneos").isVisible();
  if (torneos) {
    console.log("Torneos Caso 3: Límite de torneos activos");
    var seleccionar = await page
      .locator("text=/\\d+ de \\d+ torneos/")
      .innerText();
    var numeros = seleccionar.match(/\d+/g);
    var numero = numeros?.[1] ? parseInt(numeros[1]) : null;
    console.log("Datos a desactivar: " + numero);
    await page.waitForTimeout(1000);

    for (var i = 0; i <= numero!; i++)
      await page
        .getByRole("checkbox", { name: "Liga Inicio: ", exact: false })
        .nth(i)
        .click();

    await page.getByRole("button", { name: "Continuar" }).click();
    await page.getByRole("button", { name: "Si, continuar" }).click();
    await page.pause();
  }
};

export const programar_partido = async (page: Page, flexible: number) => {
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  await page.waitForTimeout(1000);
  await page.getByLabel("día").click({ force: true });
  await page
    .locator('[data-dates-dropdown="true"]')
    .waitFor({ state: "visible" });
  var date = await page.locator(
    "button.mantine-DatePickerInput-day:not(:disabled)"
  );
  var count_date = await date.count();
  await date.nth(Math.floor(Math.random() * count_date)).click({ force: true });
  await page.waitForTimeout(1000);

  // Eliminado de la nueva versión
  // var random_date = faker.date.recent()
  // var horas = random_date.getHours()
  // var minutos = random_date.getMinutes()
  // var hora = horas.toString().padStart(2, '0');
  // var minuto = minutos.toString().padStart(2, '0')
  // await page.locator('input[type="time"]').fill(hora + ':' + minuto)

  await page.locator('input[placeholder="Hora"]').click({ force: true });
  var hora = await page.locator(
    '[data-combobox-option="true"][role="option"]:visible'
  );
  await Random(hora);
  await page.waitForTimeout(1000);

  var cancha: any;
  var arbitro_i: any;

  if (flexible === 1)
    cancha = await page.locator('input[aria-haspopup="listbox"]').nth(3);
  else cancha = await page.locator('input[aria-haspopup="listbox"]').nth(1);

  var cancha_i = await cancha.isDisabled();

  if (cancha_i == false) {
    await cancha.click({ force: true });
    await page.waitForTimeout(500);
    await page.getByRole("option", { name: new RegExp(`Cancha .+`) });
    var data_c = await page.locator(
      '[data-combobox-option="true"][role="option"]:visible'
    );
    await data_c.first().waitFor({ state: "visible" });

    // Eliminaco de la nueva versión
    // var random_c = Math.floor(Math.random() * data_c.length)
    // await cancha[random_c].click()

    await Random(data_c);
    await page.waitForTimeout(1000);
  }

  if (flexible === 1)
    arbitro_i = await page.locator('input[aria-haspopup="listbox"]').nth(4);
  else arbitro_i = await page.locator('input[aria-haspopup="listbox"]').nth(2);

  var arbitro_dis = await arbitro_i.isDisabled();

  if (!arbitro_dis) {
    await arbitro_i.click({ force: true });
    var arbitro = await page
      .locator('[data-combobox-option="true"][role="option"]:visible')
      .all();
    var random_a = Math.floor(Math.random() * arbitro.length);
    await arbitro[random_a].click();
    await page.waitForTimeout(500);
  }

  // var save_send = await page.getByRole('button', { name: 'Guardar y enviar'})
  // var enviar = await save_send.getAttribute('data-disabled')

  // if(enviar)
  await page
    .getByRole("button", { name: "Guardar enfrentamiento" })
    .dblclick({ force: true });

  // else{
  //   await save_send.click({ force: true })
  //   await page.getByRole('button', { name: 'Sí, envíales el mensaje' }).click({ force: true })
  // }
  await page.waitForTimeout(1000);
  inicio = Date.now();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "hidden" });
  fin = Date.now();
  console.log("Tiempo de programación de partido: " + (fin - inicio) + "ms");
};

export const jugador_existente = async (page: Page) => {
  await page.getByPlaceholder("Portero").click();
  await page.waitForTimeout(1000);
  var options = await page
    .locator('[data-combobox-option="true"][role="option"]:visible')
    .all();
  var random = Math.floor(Math.random() * options.length);
  await options[random].click();
  await page.waitForTimeout(1000);
  var num = Math.floor(Math.random() * 100).toString();
  await page.locator('[inputmode="numeric"]').fill(num);
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.waitForTimeout(500);
  var msg = await page.getByText("El dorsal ya esta en uso").isVisible();
  console.log("Número en uso: " + msg);

  if (msg) {
    var num = Math.floor(Math.random() * 100).toString();
    await page.locator('[inputmode="numeric"]').fill(num);
    await page.getByRole("button", { name: "Continuar" }).click();
  }
};

export const registro_jugador = async (page: Page) => {
  var curp1 = await generar_curp(page);
  console.log("CURP: " + curp1);
  await page.getByPlaceholder("ejemplo: AACM651123MTSLLR06").fill(curp1);
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.waitForTimeout(2000);

  if (await page.getByText("¡Este CURP ya tiene dueño en").isVisible()) {
    console.log("Caso 4");
    process.exit(0);
  }

  if (await page.getByText("¡CURP fuera de juego! No").isVisible()) {
    console.log("Caso 3");
    process.exit(0);
  }

  if (await page.getByText("¡Fuera de categoría! Excedes").isVisible()) {
    console.log("Caso 2");
    process.exit(0);
  } else {
    await page.waitForTimeout(1000);
    await page.getByRole("button", { name: "Continuar" }).click();
    await page.waitForTimeout(1000);
    console.log("Caso 1");
  }
};

export const generar_curp = async (page: Page) => {
  var paterno = fakerES_MX.person.lastName();
  var materno = fakerES_MX.person.lastName();
  var name = fakerES_MX.person.firstName();
  var vocalP = paterno.match(/[aeiou]/);
  var paternoF = paterno.slice(0, 1) + vocalP;
  var maternoF = materno.slice(0, 1);
  var nombre = name.slice(0, 1);
  var date = faker.date.past({ years: 25 });
  var fecha = `${date.getFullYear().toString().slice(-2)}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
  var sexo = faker.helpers.arrayElement(["H", "M"]);
  var entidades = [
    "AS",
    "BS",
    "CL",
    "GT",
    "GR",
    "HG",
    "JC",
    "MC",
    "MN",
    "MS",
    "NT",
    "NL",
    "OC",
    "PL",
    "QR",
    "QO",
    "SL",
    "SI",
    "SM",
    "SO",
    "TB",
    "TL",
    "TS",
    "VZ",
    "YN",
    "ZS",
  ];
  var lugar = faker.helpers.arrayElement(entidades);
  var paternoC = paterno.replace(/[aeiouáéíóú]/gi, "")[1] || null;
  var maternoC = materno.replace(/[aeiouáéíóú]/gi, "")[1] || null;
  var nombreC = name.replace(/[aeiouáéíóú]/gi, "")[1] || null;
  let homoclave: string =
    String.fromCharCode((65 + Math.random() * 26) | 0) +
    ((Math.random() * 10) | 0);
  var curp =
    paternoF +
    maternoF +
    nombre +
    fecha +
    sexo +
    lugar +
    paternoC +
    maternoC +
    nombreC +
    homoclave;
  return curp;
};

export const EditInfo = async (page: Page) => {
  // Caso 1: Modificación correcta
  // Caso 2: El número ya esta en uso por otro jugador
  await page.goto("http://localhost:3000/auth");
  await page.getByTestId("inputCorreo").fill("527626013893");
  await page.getByTestId("inputPassword").fill("12345678");
  await page.getByTestId("crearCuenta").click();
  await page.pause();

  await page.getByRole("link", { name: "Mis datos" }).click();
  await page.getByRole("button", { name: "Editar mi información" }).click();
  var file = await page.locator('input[type="file"]');
  var random = Math.floor(Math.random() * 14) + 1;
  var imagen =
    "C:/Users/E015/Downloads/Imágenes/Personas/persona" + random + ".jpg";
  console.log(random);
  await file.setInputFiles(imagen);
  await page.waitForTimeout(1500);
  await page
    .getByPlaceholder("Escribe tu nombre")
    .fill(fakerES_MX.person.firstName());
  await page
    .getByPlaceholder("Escribe tu apellido")
    .fill(fakerES_MX.person.lastName());
  var num = Math.floor(Math.random() * 30).toString();
  await page.locator('[inputmode="numeric"]').fill(num);
  await page.getByPlaceholder("Selecciona tu posición").click();
  await page.waitForTimeout(1000);
  var options = await page
    .locator('[data-combobox-option="true"][role="option"]:visible')
    .all();
  var random = Math.floor(Math.random() * options.length);
  await options[random].click();
  await page.waitForTimeout(1000);
  await page.getByRole("button", { name: "Listo" }).click();

  if (await page.getByText("El número ya esta en uso por").isVisible()) {
    console.log("Caso 2");
    process.exit(0);
  }

  console.log("Caso 1");
  await page.pause();
};

export const crear_torneo = async (page: Page) => {
  await page.locator('//input[@name="nombre"]').fill("Liga");
  var formato = [
    "Eliminación directa",
    "Eliminación directa (ida y vuelta)",
    "Liga",
    "Liga (ida y vuelta)",
  ];
  var t_formato = formato[Math.floor(Math.random() * formato.length)];
  await page
    .getByPlaceholder("Ej. Liga + Liguilla, Eliminacion directa")
    .click();
  await page.waitForTimeout(500);
  await page.getByRole("option", { name: t_formato, exact: true }).click();
  await page.waitForTimeout(500);
  var sexo = ["Varonil", "Femenil"];
  var categoria = sexo[Math.floor(Math.random() * sexo.length)];
  await page.getByPlaceholder("Ej. Varonil").click();
  await page.waitForTimeout(500);
  await page.getByRole("option", { name: categoria }).click();
  await page.waitForTimeout(500);
  await page.getByLabel("dd-mm-aaaa").click();
  var fecha = new Date();
  var dia = fecha.getDate();
  var mes = fecha.toLocaleString("es-ES", { month: "long" });
  await page
    .getByRole("cell", { name: dia + " " + mes })
    .first()
    .click();
  await page.locator('[aria-haspopup="listbox"]').nth(2).click({ force: true });
  await page.waitForTimeout(500);
  var options = await page
    .locator('[data-combobox-option="true"][role="option"]:visible')
    .all();
  var random = Math.floor(Math.random() * options.length);
  await options[random].click();
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "Siguiente" }).click();
  await page.getByRole("button", { name: "Se parece a este" }).first().click();
  await page.getByPlaceholder("Seleccione la opción").click();
  var options = await page
    .locator('[data-combobox-option="true"][role="option"]:visible')
    .all();
  var random = Math.floor(Math.random() * options.length);
  await options[random].click();
  await page.getByRole("button", { name: "Siguiente" }).click();
  await page.getByRole("button", { name: "Siguiente" }).click();
  await page.getByRole("button", { name: "Siguiente" }).click();
  await page.getByRole("button", { name: "Siguiente" }).click();
  await page.getByRole("button", { name: "Finalizar Registro" }).click();
};

export const Modalidad = async (
  page: Page,
  mod: any,
  num: number,
  equipos: number,
  formato: string
) => {
  await page
    .getByRole("button", { name: "Crear torneo" })
    .click({ force: true });
  await page.locator('//input[@name="nombre"]').fill(formato);
  await page.getByRole("textbox", { name: "¿Cuál es el formato del" }).click();
  await page.waitForTimeout(500);

  if (formato == "Liga" || formato == "Liga (ida y vuelta)") {
    await page.getByRole("option", { name: `${formato} + Liguilla` }).click();
  } else if (num === 1) {
    await page
      .getByRole("option", { name: `${formato} + Eliminatorias` })
      .click();
  } else {
    await page.getByRole("option", { name: formato, exact: true }).click();
  }

  await page.waitForTimeout(500);
  await page.getByPlaceholder("Ej. Varonil").click();
  var opciones = page.locator(
    '[data-combobox-option="true"][role="option"]:visible'
  );
  await Random(opciones);
  await page.waitForTimeout(500);
  await page
    .getByRole("textbox", { name: "Limite de edad" })
    .click({ force: true });
  var limit_option = page.locator(
    '[data-combobox-option="true"][role="option"]:visible'
  );
  await Random(limit_option);
  await page.waitForTimeout(500);
  await page.getByLabel("dd-mm-aaaa").first().click();
  var fecha = new Date();
  var dia = fecha.getDate() + 1;
  var mes = fecha.toLocaleString("es-ES", { month: "long" });
  await page
    .getByRole("cell", { name: dia + " " + mes })
    .first()
    .click();

  await page.getByRole("button", { name: "dd-mm-aaaa" }).click();
  await page
    .locator('[type="button"][data-today="true"]')
    .nth(1)
    .click({ force: true });
  await page.waitForTimeout(500);

  await page
    .getByRole("textbox", { name: "¿Qué tipo de fútbol se juega?" })
    .click();
  var type_option = page.locator(
    '[data-combobox-option="true"][role="option"]:visible'
  );
  await Random(type_option);

  await page
    .locator('[inputmode="numeric"]')
    .fill(faker.number.int({ min: 10, max: 90 }).toString());

  // await page.locator('[aria-haspopup="listbox"]').nth(2).click({force: true})
  // await page.waitForTimeout(500)
  // var opciones = page.locator('[data-combobox-option="true"][role="option"]:visible')
  // await Random(opciones)
  // await page.waitForTimeout(500)
  await page.getByRole("button", { name: "Siguiente" }).click();
  await mod.click();
  await page.getByPlaceholder("Seleccione la opción").click();
  var opciones = page.locator(
    '[data-combobox-option="true"][role="option"]:visible'
  );
  await Random(opciones);
  await page.getByRole("button", { name: "Siguiente" }).click();
  await page.waitForTimeout(1000);
  await page.locator('input[type="checkbox"]').nth(1).check();

  for (var i = 0; i < equipos; i++)
    await page.locator('input[type="checkbox"]').nth(i).check();

  await page.getByRole("button", { name: "Siguiente" }).click();
  await page.locator('input[type="checkbox"]').nth(1).check();
  for (var i = 0; i < 5; i++)
    await page.locator('input[type="checkbox"]').nth(i).check();
  await page.waitForTimeout(500);
  await page.getByRole("button", { name: "Siguiente" }).click();
  await page.getByRole("button", { name: "Siguiente" }).click();

  if (num === 1) {
    await page
      .getByRole("textbox", { name: "Cantidad de equipos por grupo" })
      .click();
    var opciones = page.locator(
      '[data-combobox-option="true"][role="option"]:visible'
    );
    await Random(opciones);
    await page.getByRole("button", { name: "Siguiente" }).click();
  }

  await page.getByRole("button", { name: "Finalizar Registro" }).click();
  inicio = Date.now();
  await page.locator("text=Mis Torneos").waitFor({ state: "visible" });
  fin = Date.now();
  console.log("Tiempo de creación de torneo: " + (fin - inicio) + "ms");
  await page.waitForTimeout(2000);
};

export const registrar_resultado = async (page: any, registrar) => {
  var num_btn = await registrar.count();

  for (var i = 0; i < num_btn; i++) {
    await registrar.first().waitFor({ state: "visible" });
    var desactivado = await registrar.first().getAttribute("data-disabled");

    if (desactivado === null) {
      registrar.first().click({ force: true });
      await page
        .locator('[aria-modal="true"][role="dialog"]:visible')
        .waitFor({ state: "visible" });
      var random = [Math.floor(Math.random() * 10) + 1].toString();
      await page.locator('input[name="puntos_local"]').fill(random);
      random = [Math.floor(Math.random() * 10) + 1].toString();
      await page.locator('input[name="puntos_visitante"]').fill(random);
      await page
        .getByRole("button", { name: "Guardar" })
        .click({ force: true });

      var msg = await page.getByText("El partido no puede quedar");
      await page.waitForTimeout(500);
      if (msg.isVisible()) {
        random = [Math.floor(Math.random() * 10) + 1].toString();
        await page.locator('input[name="puntos_visitante"]').fill(random);
        await page
          .getByRole("button", { name: "Guardar" })
          .click({ force: true });
      }

      inicio = Date.now();
      await page
        .getByRole("dialog", { name: /Registro de/i })
        .waitFor({ state: "hidden" });
      fin = Date.now();
      console.log("Tiempo de registro de resultados: " + (fin - inicio) + "ms");

      // Compartir jornada
      // var num = Math.floor(Math.random() * 2)
      var num = 0;
      var share = await page.getByRole("button", {
        name: "Compartir la jornada",
      });
      var share_v = share.isVisible();
      if (share_v == true) {
        if (num === 0) {
          await page
            .getByRole("button", { name: "Guardar para luego" })
            .click();
        } else {
          share.click();
          inicio = Date.now();
          await page
            .locator('[aria-modal="true"][role="dialog"]:visible')
            .waitFor({ state: "hidden" });
          fin = Date.now();
          console.log("Tiempo de jornada compartida: " + (fin - inicio) + "ms");
        }
      }
    }
  }
};

async function Random(boton) {
  var count = await boton.count();
  var random = Math.floor(Math.random() * count);
  console.log(random);
  await boton.nth(random).click({ force: true });
}
