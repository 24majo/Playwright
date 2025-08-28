import { test } from "@playwright/test";
import { beforeTest } from "./functions.spec";

test.beforeEach(async ({ page }) => {
  await beforeTest(page);
});

test("1. Confirmar eliminación de árbitro - Card", async ({ page }) => {
  await page.pause();
  const optionArbitro = await page.getByRole("button", {
    name: "Juan Perez",
    exact: false,
  });
  await optionArbitro.click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Desafiliar árbitro" }).click();
  await page.getByRole("button", { name: "Desafiliar árbitro" }).click();
  const btnLater = await page.getByRole("button", {
    name: "Lo háre después",
  });
  await btnLater.waitFor({ state: "visible" });
  await btnLater.click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "hidden" });
  const visibleArbitro = await optionArbitro.isVisible();

  if (visibleArbitro === true) {
    console.log("- Error: El árbitro no se eliminó");
  } else {
    console.log("- El árbitro se eliminó correctamente");
  }
});

test("2. Cancelar eliminación de árbitro - Card", async ({ page }) => {
  await page.pause();
  const optionArbitro = await page.getByRole("button", {
    name: "Juan Perez",
    exact: false,
  });
  await optionArbitro.click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Desafiliar árbitro" }).click();
  await page.getByRole("button", { name: "Mejor no" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "hidden" });
  const visibleArbitro = await optionArbitro.isVisible();

  if (visibleArbitro === true) {
    console.log("- Cancelar eliminación de árbitro correcta");
  } else {
    console.log("- Error al cancelar la eliminación de árbitro. No hay dato");
  }
});
