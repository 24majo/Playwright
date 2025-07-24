import { test } from "@playwright/test";
import { fakerES_MX } from "@faker-js/faker";

var inicio: any, fin: any;

test("1. Select photo random", async ({ page }) => {
  await page.goto("https://www.caskr.app/crear-foto-futbol-anime");
  await page.getByRole("button", { name: "Allow all" }).click();
  await page.pause();
  await page
    .locator('iframe[title="editor-anime-futbol-caskar"]')
    .contentFrame()
    .locator('iframe[title="streamlitApp"]')
    .contentFrame()
    .getByRole("textbox", { name: "Tu Nombre" })
    .fill(fakerES_MX.person.firstName());
  await page
    .locator('iframe[title="editor-anime-futbol-caskar"]')
    .contentFrame()
    .locator('iframe[title="streamlitApp"]')
    .contentFrame()
    .getByTestId("stSelectbox")
    .locator("div")
    .filter({ hasText: "Selecciona un estilo..." })
    .nth(2)
    .click();
  var options = [
    "Blue Lock",
    "Supercampeones",
    "Street Futbol",
    "Inazuma Eleven",
    "Ao Ashi",
  ];
  var random = options[Math.floor(Math.random() * options.length)];
  await page
    .locator('iframe[title="editor-anime-futbol-caskar"]')
    .contentFrame()
    .locator('iframe[title="streamlitApp"]')
    .contentFrame()
    .getByRole("option", { name: random })
    .click();
  await page
    .locator('iframe[title="editor-anime-futbol-caskar"]')
    .contentFrame()
    .locator('iframe[title="streamlitApp"]')
    .contentFrame()
    .getByTestId("stBaseButton-primary")
    .click();
  await page.waitForTimeout(1000);
  var img_random = Math.floor(Math.random() * 36) + 1;
  var imagen = "C:/Users/E015/Downloads/Imágenes/Images/" + img_random + ".jpg";
  var editorFrame = await page
    .frameLocator('iframe[title="editor-anime-futbol-caskar"]')
    .frameLocator('iframe[title="streamlitApp"]');
  var file = await editorFrame.locator(
    '[type="file"][data-testid="stFileUploaderDropzoneInput"]'
  );
  await file.setInputFiles(imagen);
  await page.waitForTimeout(1000);
  await page
    .locator('iframe[title="editor-anime-futbol-caskar"]')
    .contentFrame()
    .locator('iframe[title="streamlitApp"]')
    .contentFrame()
    .getByTestId("stBaseButton-primary")
    .click();
  inicio = Date.now();
  await page
    .locator('iframe[title="editor-anime-futbol-caskar"]')
    .contentFrame()
    .locator('iframe[title="streamlitApp"]')
    .contentFrame()
    .getByText("Aplicando la magia... ¡Tu")
    .waitFor({ state: "hidden" });
  fin = Date.now();
  console.log("Inicio: " + inicio);
  console.log("Fin: " + fin);
  console.log("Tiempo de carga de imágenes: " + (fin - inicio) + "ms");
  await page.pause();
});
