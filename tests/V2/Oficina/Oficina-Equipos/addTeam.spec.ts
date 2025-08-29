import { test } from "@playwright/test";
import { faker, fakerES_MX } from "@faker-js/faker";
import { beforeTest, dtData, TeamData, viewTeam } from "./functions.spec";

test.beforeEach(async ({ page }) => {
  await beforeTest(page);
});

test("1. Nuevo equipo con DT", async ({ page }) => {
  await page.pause();
  await page.getByRole("button", { name: "Afiliar a nuevo equipo" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  var imagen = "C:/Users/E015/Downloads/cancha.jpg";
  const nombre = fakerES_MX.animal.type();
  await TeamData(page, imagen, nombre);
  await page
    .locator("label")
    .filter({ hasText: "Añadir los datos del D.T." })
    .locator("span")
    .first()
    .click();

  await dtData(
    page,
    fakerES_MX.person.firstName(),
    fakerES_MX.person.lastName(),
    faker.number.int({ min: 3000000000, max: 9999999999 }).toString()
  );
  await page.getByRole("button", { name: "Afiliar equipo" }).click();
  const entendido = await page.getByRole("button", { name: "Entendido" });
  await entendido.waitFor({ state: "visible" });
  await entendido.click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "hidden" });
  await viewTeam(page, nombre);
  await page.pause();
});

test("2. Nuevo equipo sin DT", async ({ page }) => {
  await page.pause();
  await page.getByRole("button", { name: "Afiliar a nuevo equipo" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  var imagen = "C:/Users/E015/Downloads/cancha.jpg";
  const nombre = fakerES_MX.animal.type();
  await TeamData(page, imagen, nombre);
  await page.getByRole("button", { name: "Afiliar equipo" }).click();
  const entendido = await page.getByRole("button", { name: "Entendido" });
  await entendido.waitFor({ state: "visible" });
  await entendido.click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "hidden" });
  await viewTeam(page, nombre);
  await page.pause();
});

test("3. Validación de errores", async ({ page }) => {
  await page.pause();
  await page.getByRole("button", { name: "Afiliar a nuevo equipo" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  await page
    .locator("label")
    .filter({ hasText: "Añadir los datos del D.T." })
    .locator("span")
    .first()
    .click();

  await page.getByRole("button", { name: "Afiliar equipo" }).click();
  await page.waitForTimeout(500);

  const team = await page.getByText("El nombre del equipo es").isVisible();
  const name = await page.getByText("El nombre es necesario.").isVisible();
  const lastname = await page
    .getByText("El apellido es necesario.")
    .isVisible();
  const tel = await page.getByText("El teléfono es obligatorio.").isVisible();

  if (team === true && name === true && lastname === true && tel === true) {
    console.log("Validación de campos obligatorios correcta");
  } else {
    console.log("Error de validación de datos obligatorios");
  }

  TeamData(
    page,
    "C:/Users/E015/Downloads/cancha.jpg",
    fakerES_MX.lorem.words()
  );
  dtData(page, "Pedro2", "Pérez3", "123");

  await page.getByRole("button", { name: "Afiliar equipo" }).click();
  await page.waitForTimeout(500);

  const dataName = await page
    .getByText("El nombre solo puede contener")
    .isVisible();
  console.log(dataName);
  const dataLastName = await page
    .getByText("El apellido solo puede")
    .isVisible();
  console.log(dataLastName);
  const dataTel = await page
    .getByText("El formato del teléfono es")
    .isVisible();
  console.log(dataTel);

  if (dataName === true && dataLastName === true && dataTel === true) {
    console.log("Validación de formato de campos correcta");
  } else {
    console.log("Error en validación de formato de campos");
  }
});
