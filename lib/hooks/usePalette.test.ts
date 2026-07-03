import { describe, it, expect, afterEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { usePalette } from "./usePalette";

describe("usePalette", () => {
  afterEach(() => {
    delete document.body.dataset.palette;
  });

  it("defaults to original palette", () => {
    const { result } = renderHook(() => usePalette());
    expect(result.current.palette).toBe("original");
  });

  it("original palette does not set body[data-palette]", () => {
    renderHook(() => usePalette());
    expect(document.body.dataset.palette).toBeUndefined();
  });

  it("setPalette to a named palette syncs body dataset", () => {
    const { result } = renderHook(() => usePalette());
    act(() => {
      result.current.setPalette("steel");
    });
    expect(result.current.palette).toBe("steel");
    expect(document.body.dataset.palette).toBe("steel");
  });

  it("switching back to original clears body dataset", () => {
    const { result } = renderHook(() => usePalette());
    act(() => {
      result.current.setPalette("prussian");
    });
    expect(document.body.dataset.palette).toBe("prussian");
    act(() => {
      result.current.setPalette("original");
    });
    expect(document.body.dataset.palette).toBeUndefined();
  });
});
