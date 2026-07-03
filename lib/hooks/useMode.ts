"use client";

import { useCallback, useEffect, useState } from "react";

export type Mode = "elevation" | "section";

export function useMode(initial: Mode = "elevation") {
  const [mode, setModeState] = useState<Mode>(initial);

  useEffect(() => {
    document.body.dataset.mode = mode;
  }, [mode]);

  const setMode = useCallback((next: Mode) => {
    setModeState(next);
  }, []);

  const toggle = useCallback(() => {
    setModeState((prev) => (prev === "elevation" ? "section" : "elevation"));
  }, []);

  return { mode, setMode, toggle };
}
