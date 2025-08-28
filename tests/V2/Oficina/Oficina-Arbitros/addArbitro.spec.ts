import { test } from "@playwright/test";
import { faker, fakerES_MX } from "@faker-js/faker";
import { beforeTest, dataArbitro, errorsDataArbitro } from "./functions.spec";

test.beforeEach(async ({ page }) => {
  await beforeTest(page);
});

test("1. Agregar árbitro correcto", async ({ page }) => {
  await page.pause();
  const nombre = fakerES_MX.person.firstName();
  const apellido = fakerES_MX.person.lastName();
  const email = fakerES_MX.internet.email();
  const tel = faker.number.int({ min: 3000000000, max: 9999999999 }).toString();

  await page.getByRole("button", { name: "Afiliar a nuevo árbitro" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  await dataArbitro(page, nombre, apellido, email, tel); // Función para los datos solicitados de árbitro

  await page.getByRole("button", { name: "Afiliar árbitro" }).click();
  const entendido = await page.getByRole("button", { name: "Entendido" });
  await entendido.waitFor({ state: "visible" });
  await entendido.click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "hidden" });
  const arbitro = await page
    .getByRole("button", { name: `${nombre} ${apellido}` })
    .isVisible();
  if (arbitro === true) {
    console.log("Árbitro agregado correctamente");
  } else {
    console.log("Error al agregar árbitro");
  }
});

test("2. Manejo de errores", async ({ page }) => {
  await page.pause();
  await page.getByRole("button", { name: "Afiliar a nuevo árbitro" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  const btn_afiliar = await page.getByRole("button", {
    name: "Afiliar árbitro",
  });
  const btn_afiliar_dis = await btn_afiliar.isDisabled();
  if (btn_afiliar_dis == true) {
    console.log("2. Botón deshabilitado por campos vacíos");
  }
  await errorsDataArbitro(page, btn_afiliar);
});
