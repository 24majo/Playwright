import { login } from "../../../V1/cuenta.spec";
import { fakerES_MX } from "@faker-js/faker";

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

export async function errorsTeam(page: any, button: any) {
  await TeamData(page, "C:/Users/E015/Downloads/cancha.jpg", "");
  await dtData(page, "", "", "");
  await button.click();
  await page.waitForTimeout(500);

  const team = await page.getByText("El nombre del equipo es").isVisible();
  const name = await page.getByText("El nombre es necesario.").isVisible();
  const lastname = await page
    .getByText("El apellido es necesario.")
    .isVisible();
  const tel = await page.getByText("El teléfono es obligatorio.").isVisible();

  if (team === true && name === true && lastname === true && tel === true) {
    console.log("Validación de campos obligatorios correcta");
  } else {
    console.log("Error de validación de datos obligatorios");
  }

  TeamData(
    page,
    "C:/Users/E015/Downloads/cancha.jpg",
    fakerES_MX.lorem.words()
  );
  dtData(page, "Pedro2", "Pérez3", "123");

  await button.click();
  await page.waitForTimeout(700);

  const dataName = await page
    .getByText("El nombre solo puede contener")
    .isVisible();
  console.log(dataName);
  const dataLastName = await page
    .getByText("El apellido solo puede")
    .isVisible();
  console.log(dataLastName);
  const dataTel = await page
    .getByText("El formato del teléfono es")
    .isVisible();
  console.log(dataTel);

  if (dataName === true && dataLastName === true && dataTel === true) {
    console.log("Validación de formato de campos correcta");
  } else {
    console.log("Error en validación de formato de campos");
  }
}

export async function deleteTeam(page: any) {
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
  await deleteTeam.click();
  await page.getByRole("button", { name: "Lo haré después" }).click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "hidden" });
}
