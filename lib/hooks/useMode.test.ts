import { describe, it, expect, afterEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useMode } from "./useMode";

describe("useMode", () => {
  afterEach(() => {
    delete document.body.dataset.mode;
  });

  it("defaults to elevation mode", () => {
    const { result } = renderHook(() => useMode());
    expect(result.current.mode).toBe("elevation");
  });

  it("syncs mode to document.body.dataset.mode on mount", () => {
    renderHook(() => useMode());
    expect(document.body.dataset.mode).toBe("elevation");
  });

  it("setMode updates state and body dataset", () => {
    const { result } = renderHook(() => useMode());
    act(() => {
      result.current.setMode("section");
    });
    expect(result.current.mode).toBe("section");
    expect(document.body.dataset.mode).toBe("section");
  });

  it("toggle flips between elevation and section", () => {
    const { result } = renderHook(() => useMode());
    act(() => {
      result.current.toggle();
    });
    expect(result.current.mode).toBe("section");
    expect(document.body.dataset.mode).toBe("section");
    act(() => {
      result.current.toggle();
    });
    expect(result.current.mode).toBe("elevation");
    expect(document.body.dataset.mode).toBe("elevation");
  });
});
