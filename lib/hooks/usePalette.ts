"use client";

import { useCallback, useEffect, useState } from "react";

export type Palette =
  | "original"
  | "salmon"
  | "manila"
  | "vellum"
  | "steel"
  | "prussian";

export function usePalette(initial: Palette = "original") {
  const [palette, setPaletteState] = useState<Palette>(initial);

  useEffect(() => {
    if (palette === "original") {
      delete document.body.dataset.palette;
    } else {
      document.body.dataset.palette = palette;
    }
  }, [palette]);

  const setPalette = useCallback((next: Palette) => {
    setPaletteState(next);
  }, []);

  return { palette, setPalette };
}
