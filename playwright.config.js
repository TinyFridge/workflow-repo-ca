/* eslint-env node */
// @ts-check
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://127.0.0.1:5500",
    trace: "on-first-retry",
    env: {
      MODE: "test",
      VITE_EMAIL: "test@example.com",
      VITE_PASSWORD: "testpassword",
    },
  },
  webServer: {
    command: "npx live-server ./",
    url: "http://127.0.0.1:5500",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
