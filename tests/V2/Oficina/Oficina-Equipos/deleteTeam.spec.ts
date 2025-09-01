import { test } from "@playwright/test";
import { beforeTest, deleteTeam } from "./functions.spec";

test.beforeEach(async ({ page }) => {
  await beforeTest(page);
});

test("1. Eliminación de equipo en card", async ({ page }) => {
  await page.pause();
  const nameTeam = `Equipo ${Math.floor(Math.random() * 3) + 2}`;
  const card = await page.getByRole("button", {
    name: `Logo del equipo ${nameTeam} #`,
  });
  await card.click();
  await deleteTeam(page);
  const visibleCard = await card.isVisible();
  if (visibleCard === true) {
    console.log("Error de eliminación de equipos");
  } else {
    console.log("Eliminación de equipos en card correcta");
  }
  await page.getByRole("tab", { name: "Lista" }).click();
  await page
    .getByRole("button", { name: "Next Page" })
    .waitFor({ state: "visible" });
  const list = await page.getByLabel("Lista").getByText(nameTeam).isVisible();
  if (list === true) {
    console.log("Error de eliminación de equipo en lista");
  } else {
    console.log("Eliminación de equipo en lista exitosa");
  }
});

test("2. Eliminar equipo de lista", async ({ page }) => {
  await page.pause();
  await page.getByRole("tab", { name: "Lista" }).click();
  await page
    .getByRole("button", { name: "Next Page" })
    .waitFor({ state: "visible" });
  const nameTeam = `Equipo ${Math.floor(Math.random() * 3) + 2}`;
  console.log(nameTeam);
  const list = await page.getByLabel("Lista").getByText(nameTeam);
  await list.click();
  await deleteTeam(page);
  const visibleList = await list.isVisible();

  if (visibleList === true) {
    console.log("Error en la eliminación de equipo en lista");
  } else {
    console.log("Eliminación de equipo correcta en la sección de lista");
  }

  await page.getByRole("tab", { name: "Tarjetas" }).click();
  await page.waitForTimeout(500);
  const card = await page
    .getByRole("button", { name: `Logo del equipo ${nameTeam} #` })
    .isVisible();

  if (card === true) {
    console.log("Error en eliminación de equipo en card");
  } else {
    console.log("Eliminación de card de equipo correcta");
  }
});

test("3. Cancelar eliminación", async ({ page }) => {
  await page.pause();
  const nameTeam = `Equipo ${Math.floor(Math.random() * 3) + 2}`;
  const card = await page.getByRole("button", {
    name: `Logo del equipo ${nameTeam} #`,
  });
  await card.click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  await page
    .getByRole("button", { name: "Editar información del equipo" })
    .click();
  const deleteTeam = await page.getByRole("button", {
    name: "Desafiliar equipo",
  });
  await deleteTeam.waitFor({ state: "visible" });
  await deleteTeam.click();
  await page.getByRole("button", { name: "Mejor no" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "hidden" });
  const visibleCard = await card.isVisible();

  if (visibleCard === false) {
    console.log("Error de cancelación para eliminar equipo");
  } else {
    console.log("Cancelación para eliminar correcta (card)");
  }

  await page.getByRole("tab", { name: "Lista" }).click();
  await page
    .getByRole("button", { name: "Next Page" })
    .waitFor({ state: "visible" });
  const list = await page.getByLabel("Lista").getByText(nameTeam).isVisible();

  if (list === false) {
    console.log("Error de cancelación para eliminar equipo");
  } else {
    console.log("Cancelación para eliminar correcta (lista)");
  }
});
