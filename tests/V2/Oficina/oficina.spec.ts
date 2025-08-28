import { test } from "@playwright/test";
import { login } from "../../V1/cuenta.spec";

test.beforeEach(async ({ page }) => {
  await login(page);
  await page.pause();
  await page.getByRole("link", { name: "Oficina" }).click();
  await page
    .getByRole("link", { name: "oficina /" })
    .waitFor({ state: "visible" });
});

test("1. Validación de navegación entre secciones", async ({ page }) => {
  await page.pause();
  const equipos = await page.getByRole("button", {
    name: "Equipos y jugadores",
  });
  const canchas = await page.getByRole("button", { name: "Canchas" });
  const arbitros = await page.getByRole("button", { name: "Árbitros" });

  // Evaluación de navegación de equipos
  await equipos.click();
  const nav_equipos = await page
    .getByRole("main")
    .getByRole("link", { name: "Equipos" });
  await page
    .getByRole("heading", { name: "Equipos" })
    .waitFor({ state: "visible" });
  const visible_equipos = await nav_equipos.isVisible();

  if (visible_equipos === true) {
    console.log("Navegación a equipos correcta");
  } else {
    console.log("Navegación a equipos errónea");
  }
  await page.getByRole("main").getByRole("link", { name: "Oficina" }).click();
  await page
    .getByRole("paragraph")
    .filter({ hasText: "Oficina" })
    .waitFor({ state: "visible" });
  await page.waitForTimeout(2000);

  //Evaluación de canchas
  await canchas.click();
  const nav_canchas = await page.getByRole("main").getByRole("link", {
    name: "Canchas",
  });
  await page
    .getByRole("paragraph")
    .filter({ hasText: "Canchas" })
    .waitFor({ state: "visible" });
  const visible_canchas = await nav_canchas.isVisible();

  if (visible_canchas === true) {
    console.log("Navegación a canchas correcta");
  } else {
    console.log("Navegación a canchas errónea");
  }
  await page.getByRole("main").getByRole("link", { name: "Oficina" }).click();
  await page
    .getByRole("paragraph")
    .filter({ hasText: "Oficina" })
    .waitFor({ state: "visible" });
  await page.waitForTimeout(2000);

  //Evaluación de árbitros
  await arbitros.click();
  const nav_arbitro = await page.getByRole("link", { name: "Árbitro" });
  await page
    .getByRole("paragraph")
    .filter({ hasText: "Árbitro" })
    .waitFor({ state: "visible" });
  const visible_arbitro = await nav_arbitro.isVisible();
  if (visible_arbitro === true) {
    console.log("Navegación a árbitros correcta");
  } else {
    console.log("Navegación a árbitros errónea");
  }
  await page.getByRole("main").getByRole("link", { name: "Oficina" }).click();
  await page
    .getByRole("paragraph")
    .filter({ hasText: "Oficina" })
    .waitFor({ state: "visible" });
  await page.pause();
});
