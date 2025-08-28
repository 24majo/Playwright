import { test } from "@playwright/test";
import { beforeTest, dataCanchas, conditionsCanchas } from "./functions.spec";
import { fakerES_MX } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  await beforeTest(page);
});

test("1. Agregar cancha correctamente", async ({ page }) => {
  await page.pause();
  await page.getByRole("button", { name: "Registrar nueva cancha" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  const imagen = "C:/Users/E015/Downloads/cancha.jpg";
  const nombre = fakerES_MX.word.words();
  const firstNombre = nombre.split(" ")[0];
  await dataCanchas(
    page,
    imagen,
    nombre,
    fakerES_MX.lorem.words(),
    "Deportiva"
  );
  await page
    .getByText(/Deportiva.*/i)
    .nth(1)
    .click();
  await page.getByRole("button", { name: "Registrar cancha" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "hidden" });
  const card = await page
    .getByRole("button", {
      name: new RegExp(`\\b${firstNombre}\\b`, "i"),
    })
    .isVisible();

  await page.getByRole("tab", { name: "Lista" }).click();
  await page.waitForTimeout(500);
  const list = await page
    .getByRole("gridcell", { name: new RegExp(`\\b${firstNombre}\\b`, "i") })
    .locator("div")
    .isVisible();

  if (card === true && list === true) {
    console.log("Cancha agregada exitosamente");
  } else {
    console.log("Error al agregar una cancha");
  }
});

test("2. Manejo de errores", async ({ page }) => {
  await page.pause();
  await page.getByRole("button", { name: "Registrar nueva cancha" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  await conditionsCanchas(page);
});
