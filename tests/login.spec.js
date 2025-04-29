import { test, expect } from "@playwright/test";

test("User can successfully log in with valid credentials", async ({
  page,
}) => {
  await page.route("**/auth/login", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ accessToken: "test-token", name: "Test User" }),
    });
  });

  await page.goto("/login/login.html");

  await page.getByPlaceholder("Email").fill("test@example.com");
  await page.getByPlaceholder("Password").fill("testpassword");
  await page.getByRole("button", { name: /login/i }).click();

  await page.waitForURL("**/index.html");

  await expect(page.getByText(/welcome|logged in/i)).toBeVisible();
});

test("User sees error message when login fails", async ({ page }) => {
  await page.route("**/auth/login", (route) => {
    route.fulfill({
      status: 401,
      contentType: "application/json",
      body: JSON.stringify({ errors: [{ message: "Invalid credentials" }] }),
    });
  });

  await page.goto("/login/login.html");

  await page.getByPlaceholder("Email").fill("wrong@example.com");
  await page.getByPlaceholder("Password").fill("wrongpassword");
  await page.getByRole("button", { name: /login/i }).click();

  await expect(page.getByText(/invalid|error|wrong/i)).toBeVisible();
});
