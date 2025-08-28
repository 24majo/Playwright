import { login } from "../../../V1/cuenta.spec";

export async function beforeTest(page) {
  await login(page);
  await page.pause();
  await page.getByRole("link", { name: "Oficina" }).click();
  await page
    .getByRole("link", { name: "oficina /" })
    .waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Árbitros" }).click();
}

export async function dataArbitro(
  page: any,
  nombre: any,
  apellido: any,
  correo: any,
  tel: any
) {
  await page.getByRole("textbox", { name: "Nombre(s)" }).fill(nombre);
  await page.getByRole("textbox", { name: "Apellido(s)" }).fill(apellido);
  await page.getByRole("textbox", { name: "Correo electrónico" }).fill(correo);
  await page
    .getByRole("textbox", { name: "Escribe su número de telé" })
    .fill(tel);
}

export async function errorsDataArbitro(page: any, actionButton: any) {
  await dataArbitro(page, "a", "", "", "");
  await dataArbitro(page, "", "", "", "");
  await actionButton.click();
  await page.waitForTimeout(500);
  const nombre_error = await page
    .getByText("El nombre es necesario")
    .isVisible();
  const apellido_error = await page
    .getByText("El apellido es necesario")
    .isVisible();
  const tel_error = await page
    .getByText("El teléfono es obligatorio")
    .isVisible();

  if (nombre_error == true && apellido_error == true && tel_error == true) {
    console.log("- Errores de campos vacíos mostrados correctamente");
  } else {
    console.log("- Fallo en muestra de errores");
  }

  await dataArbitro(page, "Luis1", "Pérez2", "juan.com", "1112223344");
  await actionButton.click();
  const nombre_format = await page
    .getByText("El nombre solo puede contener")
    .isVisible();
  const apellido_format = await page
    .getByText("El apellido solo puede")
    .isVisible();
  const correo_format = await page
    .getByText("El formato del correo es")
    .isVisible();
  const tel_format = await page
    .getByText("El formato del teléfono es")
    .isVisible();

  if (
    nombre_format === true &&
    apellido_format === true &&
    correo_format === true &&
    tel_format === true
  ) {
    console.log("- Errores de formato en campos mostrados correctamente");
  } else {
    console.log("- Fallo en muestra de errores");
  }
}
