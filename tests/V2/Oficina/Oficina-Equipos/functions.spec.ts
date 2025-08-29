import { login } from "../../../V1/cuenta.spec";

export async function beforeTest(page) {
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
}

export async function TeamData(page: any, image: any, nameTeam: any) {
  var file = await page.locator('input[type="file"]');
  await file.setInputFiles(image);
  await page.getByRole("textbox", { name: "Nombre del equipo" }).fill(nameTeam);
}

export async function dtData(page: any, name: any, lastName: any, cel: any) {
  await page.getByRole("textbox", { name: "Nombre", exact: true }).fill(name);
  await page.getByRole("textbox", { name: "Apellido" }).fill(lastName);
  await page.getByRole("textbox", { name: "Telefono" }).fill(cel);
}

export async function viewTeam(page: any, nombre: any) {
  const card = await page
    .getByRole("button", {
      name: `Logo del equipo ${nombre} #`,
    })
    .isVisible();
  // console.log("Card: " + card);

  await page.getByRole("tab", { name: "Lista" }).click();
  await page
    .getByRole("button", { name: "Previous Page" })
    .waitFor({ state: "visible" });
  await page.waitForTimeout(500);

  const list = await page.getByLabel("Lista").getByText(nombre).isVisible();
  // console.log("Lista: " + list);

  if (card === true && list === true) {
    console.log("- Creación de equipo exitosamente");
  } else {
    console.log("Error en creación de equipo");
  }
}
