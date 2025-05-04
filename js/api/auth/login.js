import { CONFIG } from "../../config.js";

export async function login(user) {
  if (window.MODE === "test") {
    if (
      user.email === window.VITE_EMAIL &&
      user.password === window.VITE_PASSWORD
    ) {
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
