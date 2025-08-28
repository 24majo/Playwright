import { test } from "@playwright/test";
import { beforeTest } from "./functions.spec";

test.beforeEach(async ({ page }) => {
  await beforeTest(page);
});

test("Visualización de página Árbitros", async ({ page }) => {
  await page.pause();
  const imagen = await page.getByRole("img", { name: "Whistle" }).isVisible();
  const texto = await page.getByText("No hay árbitros afiliados").isVisible();
  const search = await page
    .getByRole("textbox", {
      name: "Buscar y filtrar",
    })
    .isVisible();

  if (imagen === true) {
    console.log("Tutorial");
    const title = await page.getByText("Invita a tus árbitros").isVisible();
    const content = await page
      .getByText("Aquí afilias a los jueces que")
      .isVisible();
    const button = await page.getByRole("button", {
      name: "Invitar a mi primer árbitro",
    });
    const visible_button = await button.isVisible();

    if (title === true && content === true && visible_button === true) {
      console.log(
        "- Todos los elementos de la pantalla principal son visibles"
      );
    } else {
      console.log(
        "- Error de visualización de elementos de la pantalla principal"
      );
    }

    await button.click();

    await page
      .locator('[aria-modal="true"][role="dialog"]:visible')
      .waitFor({ state: "visible" });
    const drawerImage = await page
      .getByRole("img", { name: "Certificate" })
      .isVisible();
    const drawerTitle = await page
      .getByText("Registra al árbitro y")
      .isVisible();
    const drawerContent = await page
      .getByText("Llena un par de datos (Nombre")
      .isVisible();
    const drawerButton = await page
      .getByRole("button", {
        name: "Empezar el registro",
      })
      .isVisible();

    if (
      drawerImage === true &&
      drawerTitle === true &&
      drawerContent === true &&
      drawerButton === true
    ) {
      console.log("- Todos los elementos del drawer son visibles");
    } else {
      console.log("- Error de visualización de elementos del drawer");
    }
  }

  if (texto === true) {
    console.log("Contenido vacío");
    const content = await page
      .getByText("No hay árbitros afiliadosSin")
      .isVisible();
    const button = await page.getByRole("button", {
      name: "Afiliar a nuevo árbitro",
    });
    const visible_button = await button.isVisible();

    if (content === true && visible_button === true) {
      console.log(
        "- Todos los elementos de la pantalla principal son visibles"
      );
    } else {
      console.log(
        "- Error de visualización de elementos de la pantalla principal"
      );
    }

    await button.click();
    await page
      .locator('[aria-modal="true"][role="dialog"]:visible')
      .waitFor({ state: "visible" });

    const input = await page
      .getByRole("textbox", { name: "Nombre(s)" })
      .isVisible();
    if (input === true) {
      console.log("- Elementos del drawer son visibles");
    } else {
      console.log("- Error de visualización de elementos del drawer");
    }
  }

  if (search === true) {
    console.log("Árbitros registrados");
    var elements = false;
    const tab_tarjeta = await page
      .getByRole("tab", { name: "Tarjetas" })
      .isVisible();
    const tab_lista = await page.getByRole("tab", { name: "Lista" });
    const visible_lista = await tab_lista.isVisible();
    const tarjeta = await page
      .getByRole("button", { name: "Juan Perez" })
      .isVisible();

    if (tab_tarjeta === true && visible_lista === true && tarjeta === true)
      elements = true;

    await tab_lista.click();
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
