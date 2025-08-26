import { test } from "@playwright/test";
import { crear_torneo } from "./cuenta.spec";
import { faker } from "@faker-js/faker";

var inicio: any, fin: any;

test.beforeEach("Iniciar", async ({ page }) => {
  // await page.goto('https://caskr.app/auth')
  // await page.goto('https://dev.caskr.app/auth')
  await page.goto("http://localhost:3000/auth");
  await page.getByRole("button", { name: "Crear cuenta" }).click();
});

test("Correo", async ({ page }) => {
  var n_cuenta = Math.floor(1 + Math.random() * 300).toString();
  var cuenta = "pruebas" + n_cuenta + "@dominio.com";
  await page.getByTestId("inputCorreo").fill(cuenta);
  await Cuenta(page, cuenta, "Correo");
});

test("Numero", async ({ page }) => {
  await page
    .locator("div")
    .filter({ hasText: /^Teléfono$/ })
    .first()
    .click();
  var cuenta = faker.number
    .int({ min: 1000000000, max: 9999999999 })
    .toString();
  await page.getByRole("textbox", { name: "Teléfono" }).fill(cuenta);
  console.log("Teléfono: " + cuenta);
  await Cuenta(page, cuenta, "Numero");
});

async function Cuenta(page: any, cuenta: String, tipo: String) {
  await page.getByTestId("inputPassword").fill("12345678");
  await page.pause();
  await page.getByTestId("crearCuenta").click();
  inicio = Date.now();
  await page.waitForTimeout(1000);
  var cuenta_e = await page
    .locator("text=Estos datos ya han sido registrados")
    .isVisible();

  if (cuenta_e) {
    console.log("Datos ya registrados");
    process.exit(0);
  }

  var name = page.locator('//input[@name="customerName"]');
  fin = Date.now();
  console.log("Cuenta registrada: " + cuenta);
  console.log("Tiempo de creación de cuenta: " + (fin - inicio - 1000) + "ms");
  await name.waitFor({ state: "attached" });
  if (await name.isVisible())
    await name.fill("Alondra Guerrero", { force: true });

  if (tipo === "Correo") {
    if (Math.floor(Math.random() * 2) === 1) {
      console.log("Se ingresó teléfono");
      await page
        .locator('//input[@name="phoneCustomer"]')
        .fill(
          faker.number.int({ min: 1000000000, max: 9999999999 }).toString()
        );
    }
  }

  if (tipo === "Numero") {
    var email = faker.internet.email();
    await page.locator('//input[@name="email"]').fill(email);
    await page.locator('//input[@name="phoneCustomer"]').fill(cuenta); // Pendiente
  }

  await page.getByRole("button", { name: "Siguiente" }).click();
  await page.locator("text=Nuevo Torneo").waitFor({ state: "visible" });
  await crear_torneo(page);
  inicio = Date.now();
  await page.locator("text=Inicio").waitFor({ state: "visible" });
  fin = Date.now();
  console.log("Tiempo de carga de dashboard: " + (fin - inicio) + "ms");
}
