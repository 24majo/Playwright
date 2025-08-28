import { test } from "@playwright/test";
import { beforeTest } from "./functions.spec";

test.beforeEach(async ({ page }) => {
  await beforeTest(page);
});

test("1. Eliminar cancha correctamente", async ({ page }) => {
  await page.pause();
  const card = await page.getByRole("button", {
    name: "Cancha 1 Pasto sintético",
  });
  await card.click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Eliminar" }).click();
  await page.getByRole("button", { name: "Eliminar cancha" }).click();
  await page.getByRole("button", { name: "Lo haré después" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "hidden" });
  const vis_card = await card.isVisible();
  await page.getByRole("tab", { name: "Lista" }).click();
  await page
    .getByRole("button", { name: "Previous Page" })
    .waitFor({ state: "visible" });
  const list = await page
    .getByRole("gridcell", { name: "Cancha" })
    .locator("div")
    .isVisible();
  if (vis_card === true && list === true) {
    console.log("Fallo al eliminar cancha");
  } else {
    console.log("Eliminación de cancha correcta");
  }
});

test("2. Cancelar eliminación", async ({ page }) => {
  await page.pause();
  const card = await page.getByRole("button", {
    name: "Cancha 1 Pasto sintético",
  });
  await card.click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Eliminar" }).click();
  await page.getByRole("button", { name: "Mejor no" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "hidden" });
  const vis_card = await card.isVisible();
  await page.getByRole("tab", { name: "Lista" }).click();
  await page
    .getByRole("button", { name: "Previous Page" })
    .waitFor({ state: "visible" });
  const list = await page
    .getByRole("gridcell", { name: "Cancha" })
    .locator("div")
    .isVisible();
  if (vis_card === true && list === true) {
    console.log("Cancelación de eliminación correcta");
  } else {
    console.log("Error al cancelar la eliminación de cancha");
  }
});
