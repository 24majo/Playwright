import { test } from "@playwright/test";
import { beforeTest } from "./functions.spec";

test.beforeEach(async ({ page }) => {
  await beforeTest(page);
});

test("Visualización de página Canchas", async ({ page }) => {
  await page.pause();
  const image = await page.getByRole("img", { name: "Whistle" }).isVisible();
  const title = await page
    .getByText("Aún no hay canchas registradas")
    .isVisible();
  const search = await page
    .getByRole("textbox", { name: "Buscar y filtrar" })
    .isVisible();
  const button = await page
    .getByRole("button", { name: "Registrar nueva cancha" })
    .isVisible();

  if (image === true) {
    console.log("Tutorial");
    const title = await page.getByText("Sin cancha no hay reta").isVisible();
    const content = await page
      .getByText("Aquí es donde se juega la")
      .isVisible();

    if (title === true && content === true && button === true) {
      console.log(
        "- Todos los elementos de la pantalla principal son visibles"
      );
    } else {
      console.log(
        "- Error de visualización de elementos de la pantalla principal"
      );
    }
  }

  if (title === true) {
    console.log("Sin contenido");
    const content = await page
      .getByText(
        "Aún no hay canchas registradas¿Dónde se va a jugar la reta, en el limbo? Agrega"
      )
      .isVisible();

    if (button === true && content === true) {
      console.log(
        "- Todos los elementos de la pantalla principal son visibles"
      );
    } else {
      console.log(
        "- Error de visualización de elementos de la pantalla principal"
      );
    }
  }

  if (search === true) {
    console.log("Registros de canchas");
    var elements = false;
    const tabTarjeta = await page
      .getByRole("tab", { name: "Tarjetas" })
      .isVisible();
    const tabLista = await page.getByRole("tab", { name: "Lista" });
    const visLista = await tabLista.isVisible();
    const card = await page
      .getByRole("button", {
        name: "Cancha 1 Pasto sintético",
      })
      .isVisible();

    if (tabTarjeta === true && visLista === true && card === true)
      elements = true;

    await tabLista.click();
    await page.waitForTimeout(1000);
    const tabla = await page.getByText("a 1 de 1 Página 1 de 1").isVisible();

    if (elements === true && tabla === true) {
      console.log(
        "- Todos los elementos de la pantalla principal son visibles"
      );
    } else {
      console.log(
        "- Error de visualización de elementos de la pantalla principal"
      );
    }
  }
});
