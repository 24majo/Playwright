import { test } from "@playwright/test";
import { beforeTest } from "./functions.spec";

test.beforeEach(async ({ page }) => {
  await beforeTest(page);
});

test("viewPlayers", async ({ page }) => {
  await page.pause();
  const nameTeam = `Equipo ${Math.floor(Math.random() * 3) + 2}`;
  const card = await page.getByRole("button", {
    name: `Logo del equipo ${nameTeam} #`,
  });
  await card.click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Ver jugadores" }).click();
  await page
    .getByRole("link", { name: nameTeam })
    .waitFor({ state: "visible" });

  const player = await page.getByRole("button", {
    name: "Logo del equipo",
  });

  const cardCount = await player.count();
  const num = Math.floor(Math.random() + cardCount);
  await player.nth(num).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  await page.pause();
});
