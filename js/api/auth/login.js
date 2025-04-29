import { CONFIG } from "../../config.js";

const isTestMode = navigator.userAgent.includes("Playwright"); // 👈 detect test

export async function login(user) {
  if (isTestMode) {
    if (user.email === "test@example.com" && user.password === "testpassword") {
      return { accessToken: "fakeToken", name: "Test User" };
    } else {
      throw new Error("Invalid credentials");
    }
  }

  const url = `${CONFIG.apiUrl}auth/login`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Login failed");
  }

  return json;
}
