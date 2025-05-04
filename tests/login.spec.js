import { test, expect } from "@playwright/test";

test.describe("Login functionality", () => {
  test("User can successfully log in with valid credentials", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/login.html");
    await page.fill('input[name="email"]', "testuser@example.com");
    await page.fill('input[name="password"]', "testpassword");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/index\.html|\/$/);
  });

  test("User sees error message when login fails", async ({ page }) => {
    await page.goto("http://localhost:3000/login.html");
    await page.fill('input[name="email"]', "wronguser@example.com");
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
