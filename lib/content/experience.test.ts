import { describe, it, expect } from "vitest";
import { experience } from "./experience";

describe("experience", () => {
  it("has at least one role", () => {
    expect(experience.length).toBeGreaterThan(0);
  });

  it("has exactly one current role", () => {
    const current = experience.filter((r) => r.isCurrent);
    expect(current).toHaveLength(1);
  });

  it("every role has non-empty required fields", () => {
    for (const role of experience) {
      expect(role.title).toBeTruthy();
      expect(role.company).toBeTruthy();
      expect(role.location).toBeTruthy();
      expect(role.start).toBeTruthy();
      expect(role.end).toBeTruthy();
      expect(role.bullets.length).toBeGreaterThan(0);
    }
  });

  it("no user-facing string contains em or en dashes", () => {
    for (const role of experience) {
      const strings = [role.title, role.company, role.location, ...role.bullets, ...(role.awards ?? [])];
      for (const s of strings) {
        expect(s).not.toMatch(/[—–]/);
      }
    }
  });
});
