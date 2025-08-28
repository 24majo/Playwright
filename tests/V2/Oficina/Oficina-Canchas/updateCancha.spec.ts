import { test } from "@playwright/test";
import { beforeTest, dataCanchas, conditionsCanchas } from "./functions.spec";
import { fakerES_MX } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  await beforeTest(page);
});

test("1. Actualizar cancha correctamente", async ({ page }) => {
  await page.pause();
  const cancha = await page.getByRole("button", {
    name: "Cancha 1 Pasto sintético",
  });
  const visible_cancha = await cancha.isVisible();

  if (visible_cancha === false) {
    await page.getByRole("button", { name: "Registrar nueva cancha" }).click();
    await page
      .locator('[aria-modal="true"][role="dialog"]:visible')
      .waitFor({ state: "visible" });
    await dataCanchas(
      page,
      "C:/Users/E015/Downloads/cancha.jpg",
      "Cancha 1",
      "Pasto sintético",
      "Deportiva"
    );
    await page.getByRole("button", { name: "Registrar cancha" }).click();
    await page
      .locator('[aria-modal="true"][role="dialog"]:visible')
      .waitFor({ state: "hidden" });
  }

  await page.waitForTimeout(1000);
  await cancha.first().click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });

  const dataNombre = await page.getByTestId("inputCancha");
  const dataSuperficie = await page.getByTestId("inputDescripcion");
  const dataUbicacion = await page.getByRole("textbox", {
    name: "¿En dónde está la cancha?",
  });

  const inputName = await dataNombre.inputValue();
  const inputSuperficie = await dataSuperficie.inputValue();
  const inputUbicacion = await dataUbicacion.inputValue();

  if (
    inputName.trim() !== "" &&
    inputSuperficie.trim() !== "" &&
    inputUbicacion.trim() !== ""
  ) {
    console.log("- El campo trajo los datos correctamente");
  } else {
    console.log("- Error. Campos vacíos. No trajo datos.");
  }

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
  await page.getByRole("button", { name: "Guardar cambios" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "hidden" });
  const card = await page
    .getByRole("button", {
      name: new RegExp(`\\b${firstNombre}\\b`, "i"),
    })
    .isVisible();
  const cancha_card = await cancha.isVisible();

  await page.getByRole("tab", { name: "Lista" }).click();
  await page.waitForTimeout(500);
  const list = await page
    .getByRole("gridcell", { name: new RegExp(`\\b${firstNombre}\\b`, "i") })
    .locator("div")
    .isVisible();

  if (card === true && list === true) {
    if (cancha_card === false) {
      console.log("- Cancha actualizada exitosamente");
    } else {
      console.log("- Datos previos de cancha no se eliminaron correctamente");
    }
  } else {
    console.log("- Error al agregar una cancha");
  }
});
