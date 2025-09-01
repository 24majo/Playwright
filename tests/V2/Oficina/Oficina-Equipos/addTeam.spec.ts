import { test } from "@playwright/test";
import { faker, fakerES_MX } from "@faker-js/faker";
import {
  beforeTest,
  dtData,
  TeamData,
  viewTeam,
  errorsTeam,
} from "./functions.spec";

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
  const button = await page.getByRole("button", { name: "Afiliar equipo" });
  await errorsTeam(page, button);
});
