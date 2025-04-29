import { describe, it, expect, beforeEach, vi } from "vitest";
import { getUsername } from "../js/Utils/storage.js";

describe("getUserName", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn(),
    });
    localStorage.clear();
  });

  it("returns the name from the user object in storage", () => {
    const user = { name: "John" };
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(user));

    expect(getUsername()).toBe("John");
  });

  it("returns null when no user exists in storage", () => {
    localStorage.getItem.mockReturnValueOnce(null);

    expect(getUsername()).toBeNull();
  });
});
