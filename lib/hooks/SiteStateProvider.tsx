"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useMode, type Mode } from "./useMode";
import { usePalette, type Palette } from "./usePalette";

interface SiteState {
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
  palette: Palette;
  setPalette: (palette: Palette) => void;
}

const SiteStateContext = createContext<SiteState | null>(null);

export function SiteStateProvider({ children }: { children: ReactNode }) {
  const { mode, setMode, toggle: toggleMode } = useMode();
  const { palette, setPalette } = usePalette();

  const value: SiteState = {
    mode,
    setMode,
    toggleMode,
    palette,
    setPalette,
  };

  return (
    <SiteStateContext.Provider value={value}>
      {children}
    </SiteStateContext.Provider>
  );
}

export function useSiteState(): SiteState {
  const ctx = useContext(SiteStateContext);
  if (!ctx) {
    throw new Error("useSiteState must be used within a SiteStateProvider");
  }
  return ctx;
}
