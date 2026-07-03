import { describe, it, expect } from "vitest";
import { projects } from "./projects";

describe("projects", () => {
  it("has exactly four v1 projects", () => {
    expect(projects).toHaveLength(4);
  });

  it("each project has required fields", () => {
    for (const p of projects) {
      expect(p.slug).toBeTruthy();
      expect(p.num).toMatch(/^\d{2}$/);
      expect(p.title).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.status).toBeTruthy();
      expect(p.stack).toBeTruthy();
      expect(p.choices.length).toBeGreaterThan(0);
    }
  });

  it("slugs are unique", () => {
    const slugs = new Set(projects.map((p) => p.slug));
    expect(slugs.size).toBe(projects.length);
  });

  it("no user-facing string contains em or en dashes", () => {
    for (const p of projects) {
      const strings = [p.description, p.status, p.stack, ...p.choices];
      for (const s of strings) {
        expect(s).not.toMatch(/[—–]/);
      }
    }
  });
});
