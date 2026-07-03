"use client";

import styles from "./ViewToggle.module.css";
import type { Mode } from "@/lib/hooks/useMode";

interface ViewToggleProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

export function ViewToggle({ mode, onChange }: ViewToggleProps) {
  return (
    <div className={styles.toggle} role="group" aria-label="View mode">
      <span className={styles.lbl}>View</span>
      <button
        type="button"
        className={mode === "elevation" ? styles.active : undefined}
        aria-pressed={mode === "elevation"}
        onClick={() => onChange("elevation")}
      >
        Elevation
      </button>
      <button
        type="button"
        className={mode === "section" ? styles.active : undefined}
        aria-pressed={mode === "section"}
        onClick={() => onChange("section")}
      >
        Section
      </button>
    </div>
  );
}
