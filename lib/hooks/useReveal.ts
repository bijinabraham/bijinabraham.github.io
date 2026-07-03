"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useReveal
 *
 * Attach `ref` to any element. `seen` flips to `true` the first time the
 * element crosses the viewport threshold, then the observer disconnects so
 * the value stays true for the rest of the session (one-shot reveal).
 *
 * If IntersectionObserver is unavailable (SSR / very old browsers), `seen`
 * falls back to `true` on mount so content is never permanently hidden.
 */
export function useReveal<T extends Element = HTMLDivElement>(threshold: number = 0.2) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSeen(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, seen };
}
