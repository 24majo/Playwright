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
