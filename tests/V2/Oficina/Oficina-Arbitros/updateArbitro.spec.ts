import { test } from "@playwright/test";
import { faker, fakerES_MX } from "@faker-js/faker";
import { beforeTest, dataArbitro, errorsDataArbitro } from "./functions.spec";

test.beforeEach(async ({ page }) => {
  await beforeTest(page);
});

test("1. Actualizar árbitro correctamente", async ({ page }) => {
  await page.pause();
  await page.getByRole("button", { name: "Juan Perez" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  const dataNombre = page.getByRole("textbox", { name: "Nombre(s)" });
  const dataApellido = page.getByRole("textbox", {
    name: "Apellido(s)",
  });
  const dataTel = page.getByRole("textbox", {
    name: "Escribe su número de telé",
  });

  const valorNombre = await dataNombre.inputValue();
  const valorApellido = await dataApellido.inputValue();
  const valorTel = await dataTel.inputValue();

  // Validación de muestra de datos al abrir el drawer de modificación
  if (
    valorNombre.trim() !== "" &&
    valorApellido.trim() !== "" &&
    valorTel.trim() !== ""
  ) {
    console.log("- El campo trajo los datos correctamente");
  } else {
    console.log("- Error. Campos vacíos. No trajo datos.");
  }

  const nombre = fakerES_MX.person.firstName();
  const apellido = fakerES_MX.person.lastName();
  const email = fakerES_MX.internet.email();
  const tel = faker.number.int({ min: 3000000000, max: 9999999999 }).toString();

  await dataArbitro(page, nombre, apellido, email, tel);
  await page.getByRole("button", { name: "Guardar cambios" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "hidden" });
  const arbitro = await page
    .getByRole("button", { name: `${nombre} ${apellido}` })
    .isVisible();
  if (arbitro === true) {
    console.log("- Árbitro actualizado correctamente");
  } else {
    console.log("- Error al actualizar árbitro");
  }
});

test("2. Validación de campos al actualizar", async ({ page }) => {
  await page.pause();
  await page.getByRole("button", { name: "Juan Perez" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  const btnGuardar = await page.getByRole("button", {
    name: "Guardar cambios",
  });
  await errorsDataArbitro(page, btnGuardar);
});
