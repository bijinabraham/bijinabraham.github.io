"use client";

import { useEffect, useRef } from "react";
import styles from "./Crosshair.module.css";

export function Crosshair() {
  const hRef = useRef<HTMLDivElement>(null);
  const vRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function move(e: MouseEvent) {
      if (hRef.current) hRef.current.style.top = `${e.clientY}px`;
      if (vRef.current) vRef.current.style.left = `${e.clientX}px`;
    }
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div ref={hRef} className={styles.h} />
      <div ref={vRef} className={styles.v} />
    </div>
  );
}
