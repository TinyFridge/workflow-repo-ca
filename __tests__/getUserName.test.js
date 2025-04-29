import { describe, it, expect, beforeEach } from "vitest";
import { getUserName } from "../js/storage.js";

describe("getUserName", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns the name from the user object in storage", () => {
    const user = { name: "John" };
    localStorage.setItem("user", JSON.stringify(user));
    expect(getUserName()).toBe("John");
  });

  it("returns null when no user exists in storage", () => {
    expect(getUserName()).toBeNull();
  });
});
