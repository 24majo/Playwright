import { test } from "@playwright/test";
import { login } from "../../../V1/cuenta.spec";

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

test("1. Visualización tutorial", async ({ page }) => {
  await page.pause();
  const imagen = await page.getByRole("img", { name: "Whistle" }).isVisible();
  if (imagen === true) {
    console.log("Imagen tutorial visible");
  } else {
    console.log("Error. No hay imagen de tutorial");
  }

  await page.getByRole("button", { name: "Afiliar a nuevo equipo" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  const boton_team = await page
    .getByRole("button", { name: "Empezar con el registro" })
    .isVisible();
  if (boton_team === true) {
    console.log("Drawer de tutorial para agregar equipos");
  } else {
    console.log(
      "Error de visualización drawer de tutorial para agregar equipos"
    );
  }

  await page.getByRole("button", { name: "Genera link de afiliación" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  const boton_link = await page
    .getByRole("button", {
      name: "Empezar con el registro",
    })
    .click();
});
