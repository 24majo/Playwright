import { login } from "../../../V1/cuenta.spec";

export async function beforeTest(page: any) {
  await login(page);
  await page.pause();
  await page.getByRole("link", { name: "Oficina" }).click();
  await page
    .getByRole("link", { name: "oficina /" })
    .waitFor({ state: "visible" });
  await page.getByRole("button", { name: "Canchas" }).click();
}

export async function dataCanchas(
  page: any,
  photo: any,
  nombre: any,
  superficie: any,
  ubicacion: any
) {
  await page.getByTestId("inputCancha").fill(nombre);
  await page.getByTestId("inputDescripcion").fill(superficie);
  await page
    .getByRole("textbox", { name: "¿En dónde está la cancha?" })
    .fill(ubicacion);
}

export async function conditionsCanchas(page: any) {
  await dataCanchas(page, "a", "", "", "");
  await dataCanchas(page, "", "", "", "");
  await page.getByRole("button", { name: "Registrar cancha" }).click();
  await page.waitForTimeout(500);
  const nombre = await page.getByText("El nombre es necesario").isVisible();
  const superficie = await page
    .getByText("La descripción es obligatoria")
    .isVisible();
  const ubicacion = await page
    .getByText("La dirección es obligatoria")
    .isVisible();

  if (nombre === true && superficie === true && ubicacion === true) {
    console.log("- Errores de campos vacíos mostrados correctamente");
  } else {
    console.log("- Fallo en muestra de errores");
  }
}
