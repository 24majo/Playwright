import { test } from "@playwright/test";
import { jugador_existente, EditInfo, generar_curp } from "./cuenta.spec";
import { fakerES_MX } from "@faker-js/faker";

var inicio: any, fin: any;

test("Unirme", async ({ page }) => {
  // await page.goto('http://localhost:3000/registroCapitan/1751642796258/1751642795919')
  // await page.goto('https://dev.caskr.app/registroCapitan/1748628997483/1741974914352')
  await page.goto(
    "https://caskr.app/registroCapitan/1747683472277/1747683472079"
  );

  var button = page.getByRole("button", { name: "Unirme al equipo" });
  await button.waitFor({ state: "visible" });
  await button.click();
  await page.getByPlaceholder("********").fill("12345678");
  await page.getByRole("button", { name: "Continuar" }).click();
  // await page.pause()
  await page.getByRole("button", { name: "Lo haré después" }).click();
  await page.getByRole("button", { name: "Terminar" }).click();
  // await page.getByRole('button', { name: 'En otro momento '}).click()
  await page.getByRole("button", { name: "Ir a mi perfil" }).click();
  inicio = Date.now();
  await page
    .getByRole("button", { name: "Editar mi card" })
    .waitFor({ state: "visible" });
  fin = Date.now();
  console.log("Tiempo de registro de capitán: " + (fin - inicio) + "ms");
  await page.pause();
});

test("1. Sin documentos", async ({ page }) => {
  await Sesion(page);
  for (var i = 0; i < 3; i++) {
    await Player(page);
    await page.getByRole("button", { name: "Guardar cambios" }).click();
    await page
      .locator('[aria-modal="true"][role="dialog"]:visible')
      .waitFor({ state: "hidden" });
  }
  await page.pause();
});

test("2. CURP", async ({ page }) => {
  await Sesion(page);
  for (var i = 0; i < 3; i++) {
    await Player(page);
    await CURP(page);
    await page.getByRole("button", { name: "Guardar cambios" }).click();
    await page
      .locator('[aria-modal="true"][role="dialog"]:visible')
      .waitFor({ state: "hidden" });
  }
  await page.pause();
});

test("3. Acta", async ({ page }) => {
  await Sesion(page);
  for (var i = 0; i < 3; i++) {
    await Player(page);
    await Acta(page);
    await page.getByRole("button", { name: "Guardar cambios" }).click();
    await page
      .locator('[aria-modal="true"][role="dialog"]:visible')
      .waitFor({ state: "hidden" });
  }
  await page.pause();
});

test("4. Constancia", async ({ page }) => {
  await Sesion(page);
  for (var i = 0; i < 3; i++) {
    await Player(page);
    await Constancia(page);
    await page.getByRole("button", { name: "Guardar cambios" }).click();
    await page
      .locator('[aria-modal="true"][role="dialog"]:visible')
      .waitFor({ state: "hidden" });
  }
  await page.pause();
});

test("5. CURP y Acta", async ({ page }) => {
  await Sesion(page);
  for (var i = 0; i < 3; i++) {
    await Player(page);
    await CURP(page);
    await Acta(page);
    await page.getByRole("button", { name: "Guardar cambios" }).click();
    await page
      .locator('[aria-modal="true"][role="dialog"]:visible')
      .waitFor({ state: "hidden" });
  }
  await page.pause();
});

test("6. CURP y Constancia", async ({ page }) => {
  await Sesion(page);
  for (var i = 0; i < 3; i++) {
    await Player(page);
    await CURP(page);
    await Constancia(page);
    await page.getByRole("button", { name: "Guardar cambios" }).click();
    await page
      .locator('[aria-modal="true"][role="dialog"]:visible')
      .waitFor({ state: "hidden" });
  }
  await page.pause();
});

test("7. Acta y Constancia", async ({ page }) => {
  await Sesion(page);
  for (var i = 0; i < 3; i++) {
    await Player(page);
    await Acta(page);
    await Constancia(page);
    await page.getByRole("button", { name: "Guardar cambios" }).click();
    await page
      .locator('[aria-modal="true"][role="dialog"]:visible')
      .waitFor({ state: "hidden" });
  }
  await page.pause();
});

test("8. All Documents", async ({ page }) => {
  await Sesion(page);
  for (var i = 0; i < 15; i++) {
    await Player(page);
    await Acta(page);
    await Constancia(page);
    await CURP(page);
    await page.getByRole("button", { name: "Guardar cambios" }).click();
    await page.waitForTimeout(500);
    await page
      .locator('[aria-modal="true"][role="dialog"]:visible')
      .waitFor({ state: "hidden" });
  }
  await page.pause();
});

// ----------------------------------------------------------------------------

async function Sesion(page: any) {
  await page.goto("http://localhost:3000/auth");
  // await page.goto('https://caskr.app/auth')

  var telefono = await page.locator("label").filter({ hasText: "Teléfono" });
  await telefono.waitFor({ state: "visible" });
  await telefono.click();
  await page.getByRole("textbox", { name: "Teléfono" }).fill("763 123 4643");
  await page.getByTestId("inputPassword").fill("12345678");
  await page.pause();
  await page.getByTestId("crearCuenta").click();
  inicio = Date.now();
  await page
    .getByRole("button", { name: "Editar mi card" })
    .waitFor({ state: "visible" });
  fin = Date.now();
  console.log("Tiempo de inicio de sesión: " + (fin - inicio) + "ms");
  await page.pause();
}

async function Player(page: any) {
  await page.getByRole("link", { name: "Resumen" }).click();
  await page.getByRole("button", { name: "Nuevo jugador" }).click();
  // await Imagen(page)
  await page
    .getByRole("textbox", { name: "Nombre" })
    .fill(fakerES_MX.person.firstName());
  await page
    .getByRole("textbox", { name: "Apellidos" })
    .fill(fakerES_MX.person.lastName());
  await page
    .getByRole("textbox", { name: "Número" })
    .fill(fakerES_MX.number.int({ min: 0, max: 100 }).toString());
  await page.getByRole("textbox", { name: "Posición" }).click();
  await page.waitForTimeout(500);
  var posicion = await page
    .locator('[data-combobox-option="true"][role="option"]:visible')
    .all();
  var random_a = Math.floor(Math.random() * posicion.length);
  await posicion[random_a].click();
}

async function CURP(page: any) {
  var curp = await generar_curp(page);
  await page.getByRole("textbox", { name: "CURP" }).fill(curp);
}

async function Acta(page: any) {
  var acta = await page
    .locator('[type="file"][accept="application/pdf"]')
    .first();
  await acta.setInputFiles("C:/Users/E015/Downloads/Casos.pdf");
}

async function Constancia(page: any) {
  var estudio = await page
    .locator('[type="file"][accept="application/pdf"]')
    .nth(1);
  await estudio.setInputFiles("C:/Users/E015/Downloads/Casos.pdf");
}

async function Imagen(page: any) {
  var file = await page.locator('[type="file"][accept="image/png,image/jpeg"]');
  var random = Math.floor(Math.random() * 14) + 1;
  var imagen =
    "C:/Users/E015/Downloads/Imágenes/Personas/persona" + random + ".jpg";
  await file.setInputFiles(imagen);
  await page.waitForTimeout(1000);
}

// -------------------------------------------------------------------------------------------

// No aplican para la nueva versión
// test("EditTeam", async ({ page }) => {
//     await page.goto('http://localhost:3000/auth')
//     await page.getByTestId('inputCorreo').fill('524522217332')
//     await page.getByTestId('inputPassword').fill('12345678')
//     await page.getByTestId('crearCuenta').click()
//     await page.pause()
//     await page.getByRole('button').nth(2).click()
//     var file = await page.locator('input[type="file"]')
//     var random = Math.floor(Math.random() * 40) + 1
//     var imagen = 'C:/Users/E015/Downloads/Imágenes/Escudos/escudo' + random + '.jpg'
//     console.log(random)
//     await file.setInputFiles(imagen)
//     await page.waitForTimeout(1500)
//     var equipo = fakerES_MX.company.name()
//     var n_equipo = equipo.replace(/[^a-zA-Z0-9 ]/g, '');
//     await page.locator('//input[@name="nombre"]').fill("Equipo " + n_equipo)
//     var r = Math.floor(Math.random() * 255) + 1;
//     var g = Math.floor(Math.random() * 255) + 1;
//     var b = Math.floor(Math.random() * 255) + 1;
//     var a = (Math.random()).toFixed(1)
//     var rgba = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
//     await page.getByPlaceholder('Selecciona un color').fill(rgba)
//     await page.pause()
//     await page.getByRole('button', { name: 'Listo' }).click()
// })
