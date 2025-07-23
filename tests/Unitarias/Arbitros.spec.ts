import { test } from "@playwright/test";
import { faker, fakerES_MX } from "@faker-js/faker";
import { login } from "../cuenta.spec";

test.beforeEach(async ({ page }) => {
  await login(page);
  await page.pause();
  await page.getByRole("link", { name: "Arbitros" }).click();
});

test("1. Validación de datos obligatorios", async ({ page }) => {
  var button = await page.getByRole("button", { name: "Agregar árbitro" });
  await button.waitFor({ state: "visible" });
  await button.click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  await page
    .getByRole("textbox", { name: "Correo electrónico" })
    .fill(faker.internet.email());
  await page.getByRole("button", { name: "Agregar arbitro" }).click();
  await page.waitForTimeout(500);
  var nombre = await page.getByText("El nombre es necesario").isVisible();
  var apellido = await page.getByText("El apellido es necesario").isVisible();
  var telefono = await page.getByText("El teléfono es obligatorio").isVisible();

  if (!nombre || !apellido || !telefono)
    throw new Error("No se mostraron todos los errores esperados");
  else console.log("Todos los errores esperados se mostraron correctamente");

  await page.waitForTimeout(1000);
});

test("2. Validación de formato", async ({ page }) => {
  var button = await page.getByRole("button", { name: "Agregar árbitro" });
  await button.waitFor({ state: "visible" });
  await button.click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });

  await page.getByRole("textbox", { name: "Nombre(s)" }).fill("12345");
  await page.getByRole("textbox", { name: "Apellido(s)" }).fill("67890");
  await page
    .getByRole("textbox", { name: "Escribe su número de telé" })
    .fill("123456");
  await page.getByRole("textbox", { name: "Correo electrónico" }).fill("12345");
  await page.getByRole("button", { name: "Agregar arbitro" }).click();

  var nombre = await page
    .getByText("El nombre solo puede contener")
    .isVisible();
  var apellido = await page
    .getByText("El nombre solo puede contener")
    .isVisible();
  var telefono = await page.getByText("El formato del teléfono es").isVisible();
  var correo = await page.getByText("El formato del correo es").isVisible();
  await page.waitForTimeout(500);

  if (!nombre || !apellido || !telefono || !correo)
    throw new Error("No se mostraron todos los errores esperados");
  else console.log("Todos los errores esperados se mostraron correctamente");
  await page.pause();
});

test("3. Validación de datos obligatorios al editar", async ({ page }) => {
  await page.pause();
});

test("4. Validación de formato al editar", async ({ page }) => {
  await page.pause();
});
