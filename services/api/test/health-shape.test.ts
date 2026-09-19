import { describe, it, expect } from "vitest";

describe("health shape", () => {
  it("basic object shape", () => {
    const payload = { ok: true };
    expect(payload.ok).toBe(true);
  });
});
