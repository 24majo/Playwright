import { test } from "@playwright/test";
import { faker, fakerES_MX } from "@faker-js/faker";
import { beforeTest, dtData, TeamData, viewTeam } from "./functions.spec";

test.beforeEach(async ({ page }) => {
  await beforeTest(page);
});

test("1. Validación de actualización ", async ({ page }) => {
  await page.pause();
  // var number = Math.floor(Math.random() * 2) + 1;
  var number = 1;
  var cardTeam = await page.getByRole("button", {
    name: `Logo del equipo Equipo ${number} #`,
  });
  await cardTeam.click();
  await page
    .locator('[aria-modal="true"][role="dialog"]:visible')
    .waitFor({ state: "visible" });
  const team = await page.getByText(`Equipo ${number}`).first().isVisible();

  if (team === true) {
    console.log("Visualización de nombre del equipo correcta");
  } else {
    console.log("Error en la visualización del nombre del equipo");
  }

  await page
    .getByRole("button", { name: "Editar información del equipo" })
    .click();

  const photo = await page.getByRole("button", { name: "Cambiar foto" });
  const name = await page.getByRole("textbox", { name: "Nombre del equipo" });
  const dtName = await page.getByRole("textbox", {
    name: "Nombre",
    exact: true,
  });
  const dtApellido = await page.getByRole("textbox", { name: "Apellido" });
  const dtTel = await page.getByRole("textbox", { name: "Telefono" });

  const inputName = await name.inputValue();
  const inputDtName = await dtName.inputValue();
  const inputApellido = await dtApellido.inputValue();
  const inputTel = await dtTel.inputValue();

  if (
    inputName.trim() !== "" &&
    inputDtName.trim() !== "" &&
    inputApellido.trim() !== "" &&
    inputTel.trim() !== ""
  ) {
    console.log("Los campos tienen datos");
  } else {
    console.log("Error en obtención de datos");
  }

  const disPhoto = await photo.isDisabled();
  const disName = await name.isDisabled();
  const disDtName = await dtName.isDisabled();
  const disApellido = await dtApellido.isDisabled();
  const disTel = await dtTel.isDisabled();
  const btnEditar = await page.getByRole("button", { name: "Editar equipo" });
  const visBtnEditar = await btnEditar.isVisible();

  if (
    disPhoto === true &&
    disName === true &&
    disDtName === true &&
    disApellido === true &&
    disTel === true &&
    visBtnEditar === false
  ) {
    console.log("No es posible editar. DT completó ru registro.");
  } else {
    const nameTeam = fakerES_MX.string.alphanumeric();
    await TeamData(page, "C:/Users/E015/Downloads/cancha.jpg", nameTeam);
    await dtData(
      page,
      fakerES_MX.person.firstName(),
      fakerES_MX.person.lastName(),
      faker.number.int({ min: 3000000000, max: 9999999999 }).toString()
    );
    await btnEditar.click();
    await page
      .locator('[aria-modal="true"][role="dialog"]:visible')
      .waitFor({ state: "hidden" });
    await page.waitForTimeout(500);
    var visTeamCard = await cardTeam.isVisible();

    if (visTeamCard === true) {
      console.log("Error de visualización de card dcon datos antiguos");
    }

    var newCard = await page
      .getByRole("button", {
        name: `Logo del equipo ${nameTeam} #`,
      })
      .isVisible();

    if (newCard === true) {
      console.log("Equipo modificado correctamente");
    } else {
      console.log("Error de visualización al modificar los datos");
    }

    await page.getByRole("tab", { name: "Lista" }).click();
    await page
      .getByRole("button", { name: "Previous Page" })
      .waitFor({ state: "visible" });
    await page.waitForTimeout(500);

    const newTeam = await page
      .getByLabel("Lista")
      .getByText(nameTeam)
      .isVisible();
    if (newTeam === true) {
      console.log("Visualización correcta de modificación de equipos");
    }
  }
});
