import { test } from "@playwright/test";
import { faker, fakerES_MX } from "@faker-js/faker";
import { login } from "../../../V1/cuenta.spec";
import { dtData, TeamData } from "./functions.spec";

test.beforeEach(async ({ page }) => {
  await login(page);
  await page.pause();
  await page.getByRole("link", { name: "Oficina" }).click();
  await page
    .getByRole("link", { name: "oficina /" })
    .waitFor({ state: "visible" });
  await page
    .getByRole("button", {
      name: "Equipos y jugadores",
    })
    .click();
  await page
    .getByRole("heading", { name: "Equipos" })
    .waitFor({ state: "visible" });
});

test("1. Nuevo equipo con DT", async ({ page }) => {
  await page.pause();
  await page.getByRole("button", { name: "Afiliar a nuevo equipo" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  var imagen = "C:/Users/E015/Downloads/cancha.jpg";
  await TeamData(page, imagen, fakerES_MX.animal.type());
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
  await page.pause();
});

test("2. Nuevo equipo sin DT", async ({ page }) => {
  await page.pause();
  await page.getByRole("button", { name: "Afiliar a nuevo equipo" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  var imagen = "C:/Users/E015/Downloads/cancha.jpg";
  await TeamData(page, imagen, fakerES_MX.animal.type());
  await page.getByRole("button", { name: "Afiliar equipo" }).click();
  const entendido = await page.getByRole("button", { name: "Entendido" });
  await entendido.waitFor({ state: "visible" });
  await entendido.click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "hidden" });
  await page.pause();
});

// -------------------------------------------------------------
