import { test, expect } from '@playwright/test';
//import { describe } from 'node:test';

test.describe("CaskrApp", async() => {
  test.beforeEach("Inicios de sesion", async ({ page }) => {
    await page.goto('http://localhost:3000/auth');
    await page.getByTestId('inputCorreo').fill('majo49@prueba.com');
    await page.getByTestId('inputPassword').fill('12345678');
    await page.getByTestId('crearCuenta').click();
  })

  test.only("1 Basico a Profesional", async ({ page }) => {
    await page.getByRole('link', { name: 'Mis pagos' }).click()
    await page.getByRole('tab', { name: 'Tienda' }).dblclick()
    //await page.locator('div').filter({ hasText: /^\$450\/ al mesCambiar Plan$/ }).getByRole('button').click()
    await page.getByRole('button', { name: 'Cambiar Plan'}).nth(1).click()
    await page.getByRole('button', { name: 'Si, continuar' }).click()
    await page.locator('input[type="checkbox"]').check()
    //await page.dblclick('//span[text()="Pagar"]');
    await page.getByRole('button', {name: 'Pagar'}).click({ force: true })
    await page.waitForTimeout(2000)
    await page.pause()
    await page.dblclick('//span[text()="Continuar"]');
  })

  test.only("2 Básico a Mundial", async ({ page })=> {
    await page.getByRole('link', { name: 'Mis pagos' }).click();
    await page.getByRole('tab', { name: 'Tienda' }).dblclick();
    await page.locator('div').filter({ hasText: /^\$854\/ al mesCambiar Plan$/ }).getByRole('button').click();
    await page.getByRole('button', { name: 'Si, continuar' }).click();
    await page.locator('input[type="checkbox"]').check();
    await page.waitForTimeout(2000);
    await page.getByRole('button', {name: 'Pagar'}).click({ force: true })
    //await page.dblclick('//span[text()="Pagar"]');
    await page.pause()
    await page.dblclick('//span[text()="Continuar"]');
  })

  test.only("3 Plan Básico", async ({ page }) => {
    await page.getByRole('link', { name: 'Mis pagos' }).click();
    await page.getByRole('tab', { name: 'Tienda' }).dblclick();
    await page.locator('div').filter({ hasText: /^\$0\/ al mesCambiar Plan$/ }).getByRole('button').click();
    await page.click('//span[text()="Si, continuar"]');
    await page.locator('input[type="checkbox"]').check();
    await page.waitForTimeout(2000);
    await page.click('//span[text()="Pagar"]');
    await page.click('//span[text()="Continuar"]');
  })

  test.only("4 Profesional y Mundial", async({ page }) => {
    // En "Mis pagos" debe de reflejarse el descuento por los días restantes que quedaban del plan Profesional
    await page.getByRole('link', { name: 'Mis pagos' }).click();
    await page.getByRole('tab', { name: 'Tienda' }).dblclick();
    await page.getByRole('button', { name: 'Cambiar Plan'}).nth(1).click()
    //await page.locator('div').filter({ hasText: /^\$450\/ al mesCambiar Plan$/ }).getByRole('button').click();
    await page.click('//span[text()="Si, continuar"]');
    await page.locator('input[type="checkbox"]').check();
    await page.waitForTimeout(3000);
    await page.click('//span[text()="Pagar"]');
    await page.click('//span[text()="Continuar"]');
    await page.getByRole('link', { name: 'Mis pagos' }).click();
    await page.getByRole('tab', { name: 'Tienda' }).dblclick();
    await page.getByRole('button', { name: 'Cambiar Plan'}).nth(1).click()
    await page.locator('div').filter({ hasText: /^\$854\/ al mesCambiar Plan$/ }).getByRole('button').click();
    await page.click('//span[text()="Si, continuar"]');
    await page.locator('input[type="checkbox"]').check();
    await page.waitForTimeout(2000);
    await page.click('//span[text()="Pagar"]');
    await page.click('//span[text()="Continuar"]');
  })

  test.only('Cambio Mundial', async ({ page }) => {
    await page.getByRole('link', { name: 'Mis pagos' }).click();
    await page.getByRole('tab', { name: 'Tienda' }).dblclick();
    await page.getByRole('button', { name: 'Cambiar Plan'}).nth(2).click()
    //await page.locator('div').filter({ hasText: /^\$854\/ al mesCambiar Plan$/ }).getByRole('button').click();
    await page.click('//span[text()="Si, continuar"]');
    await page.locator('input[type="checkbox"]').check();
    await page.waitForTimeout(2000);
    await page.getByRole('button', {name: 'Pagar'}).click({ force: true })
    //await page.dblclick('//span[text()="Pagar"]');
    await page.pause()
    await page.dblclick('//span[text()="Continuar"]');
  })

  test.only("Plan Profesional", async({ page }) => {
    await page.getByRole('link', { name: 'Mis pagos' }).click();
    await page.getByRole('tab', { name: 'Tienda' }).dblclick();
    await page.locator('div').filter({ hasText: /^\$450\/ al mesCambiar Plan$/ }).getByRole('button').click();
    await page.click('//span[text()="Si, continuar"]');
    await page.locator('input[type="checkbox"]').check();
    await page.waitForTimeout(2000);
    await page.dblclick('//span[text()="Pagar"]');
    await page.dblclick('//span[text()="Continuar"]');
  })

  // -----------------------------------------------------------------

  // Verificación de planes
  test.only("1 Basico verificar", async ({ page }) => {
    await page.getByRole('link', { name: 'Mis pagos' }).click();
    await expect(page.getByText('Plan Aficionado', { exact: true })).toBeVisible();
    await expect(page.getByText('0.00')).toBeVisible();
    await expect(page.getByText(/^\d+ de 4 equipos$/)).toBeVisible(),
    await expect(page.getByText(/^\d+ de 4 torneo\(s\)$/)).toBeVisible();
    await expect(page.getByText(/^\d+ de 60 jugadores\(s\)$/)).toBeVisible();
    await page.getByRole('tab', { name: 'Tienda' }).dblclick();
    await page.waitForTimeout(1000)
    //await page.pause()
    await page.getByRole('button', { name: 'Cambiar Plan'}).first().hover()
    //await page.locator('div').filter({ hasText: /^\$0\/ al mesCambiar Plan$/ }).getByRole('button').hover();
    const p_activo = await page.locator('text()=Ya tienes activo este plan');
    await page.waitForTimeout(3000)
    await expect(p_activo).toBeVisible(); 
  })

  test.only("Profesional verificar", async ({ page }) => {
    await page.getByRole('link', { name: 'Mis pagos' }).click();
    await expect(page.getByText('Plan Profesional', { exact: true })).toBeVisible();
    await expect(page.getByText('450.00')).toBeVisible();
    await expect(page.getByText(/^\d+ de 8 equipos$/)).toBeVisible(),
    await expect(page.getByText(/^\d+ de 8 torneo\(s\)$/)).toBeVisible();
    await expect(page.getByText(/^\d+ de 120 jugadores\(s\)$/)).toBeVisible();
    await page.getByRole('tab', { name: 'Tienda' }).dblclick();
    await page.getByRole('button', { name: 'Cambiar Plan'}).nth(1).hover()
    //await page.locator('div').filter({ hasText: /^\$450\/ al mesCambiar Plan$/ }).getByRole('button').hover();
    const p_activo = await page.locator('text()=Ya tienes activo este plan');
    await expect(p_activo).toBeVisible(); 
    //await page.pause();
  })

  

  test.only("Mundial verificar", async ({ page }) => {
    await page.getByRole('link', { name: 'Mis pagos' }).click();
    await expect(page.getByText('Plan Clase Mundial', { exact: true })).toBeVisible();
    await expect(page.getByText('854.00')).toBeVisible();
    await expect(page.getByText(/^\d+ de 12 equipos$/)).toBeVisible(),
    await expect(page.getByText(/^\d+ de 12 torneo\(s\)$/)).toBeVisible();
    await expect(page.getByText(/^\d+ de 180 jugadores\(s\)$/)).toBeVisible();
    await page.getByRole('tab', { name: 'Tienda' }).dblclick();
    await page.locator('div').filter({ hasText: /^\$854\/ al mesCambiar Plan$/ }).getByRole('button').hover();
    const p_activo = page.locator('text()=Ya tienes activo este plan');
    await expect(p_activo).toBeVisible(); 
  })  
})