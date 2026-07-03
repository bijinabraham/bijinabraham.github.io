"use client";

import styles from "./PaletteSwitcher.module.css";
import type { Palette } from "@/lib/hooks/usePalette";

interface Swatch {
  id: Palette;
  color: string;
  title: string;
}

const SWATCHES: Swatch[] = [
  { id: "original", color: "#8b2818", title: "FT Salmon and Oxblood (locked default)" },
  { id: "salmon", color: "#a63c00", title: "FT Salmon and rust (comparison)" },
  { id: "manila", color: "#8b2818", title: "Manila and oxblood" },
  { id: "vellum", color: "#1e5f4b", title: "Vellum and forest" },
  { id: "steel", color: "#2563eb", title: "Steel grey and electric blue" },
  { id: "prussian", color: "#003a70", title: "Paper and prussian blue" },
];

interface PaletteSwitcherProps {
  palette: Palette;
  onChange: (palette: Palette) => void;
}

export function PaletteSwitcher({ palette, onChange }: PaletteSwitcherProps) {
  return (
    <div className={styles.toggle} role="group" aria-label="Colour palette">
      <span className={styles.lbl}>Palette</span>
      <div className={styles.swatches}>
        {SWATCHES.map((s) => {
          const isActive = palette === s.id;
          return (
            <button
              key={s.id}
              type="button"
              className={`${styles.sw} ${isActive ? styles.active : ""}`}
              style={{ color: s.color }}
              title={s.title}
              aria-label={s.title}
              aria-pressed={isActive}
              onClick={() => onChange(s.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
