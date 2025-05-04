import { test, expect } from "@playwright/test";

test.describe("Login functionality", () => {
  test("User can log in with correct credentials", async ({ page }) => {
    await page.goto("/login.html");
    await page.fill('input[name="email"]', "testuser@example.com");
    await page.fill('input[name="password"]', "testpassword");
    await page.click('button[type="submit"]');

    await expect(page.locator("#message-container")).toContainText("Welcome", {
      timeout: 3000,
    });
  });

  test("User sees error message with wrong credentials", async ({ page }) => {
    await page.goto("/login.html");
    await page.fill('input[name="email"]', "wrong@example.com");
    await page.fill('input[name="password"]', "wrongpassword");
    await page.click('button[type="submit"]');

    await expect(page.locator("#message-container")).toContainText(
      /invalid|error|wrong/i,
      {
        timeout: 3000,
      },
    );
  });
});
