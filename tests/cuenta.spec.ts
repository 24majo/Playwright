import { Page } from '@playwright/test';

export const login = async (page: Page) => {
  await page.goto('http://localhost:3000/auth')
  await page.getByTestId('inputCorreo').fill('majo62@prueba.com')
  await page.getByTestId('inputPassword').fill('12345678')
  await page.getByTestId('crearCuenta').click()
  await page.getByRole('link', { name: 'Arbitros' }).click()
}