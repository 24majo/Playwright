import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

    //baseURL: 'http://localhost:3000/', // URL por defecto
    trace: 'on-first-retry',
    video: 'on'
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'], 
        headless: false,
      },
    },

    // {
    //   name: 'chromium',
    //   use: { 
    //     ...devices['Desktop Chrome'], 
    //     headless: false,
    //   },
    // },
    
    // {
    //   name: 'Microsoft Edge',
    //   use: { 
    //     ...devices['Desktop Edge'], 
    //     headless: false, 
    //   },
    // },
    
    // {
    //   name: 'Microsoft Edge',
    //   use: { 
    //     ...devices['Desktop Edge'], 
    //     headless: false, 
    //   },
    // },

    // {
    //   name: 'Microsoft Edge',
    //   use: { 
    //     ...devices['Desktop Edge'], 
    //     headless: false, 
    //   },
    // },

    // {
    //   name: 'firefox',
    //   use: { 
    //     ...devices['Desktop Firefox'], 
    //     headless: false, 
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: { 
    //     ...devices['Desktop Safari'], 
    //     headless: false, 
    //   },
    // },


    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { 
    //     ...devices['Pixel 5'],
    //     headless: false,
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { 
    //     ...devices['iPhone 12'],
    //     headless: false,
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
