import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  use: {
    baseURL: 'https://todo-app-for-cyclope.netlify.app/',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    testIdAttribute: 'data-cy',
  },

  testDir: './tests',
  expect: {
    timeout: 10000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'], ['junit', { outputFile: 'test-results/results.xml' }], ['list']],

  projects: [
    {
      name: 'chromium',
      testMatch: 'tests/e2e/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
})
