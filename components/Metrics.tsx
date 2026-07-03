"use client";

import { metrics } from "@/lib/content/metrics";
import styles from "./Metrics.module.css";
import { useReveal } from "@/lib/hooks/useReveal";

export function Metrics() {
  const { ref, seen } = useReveal<HTMLDivElement>();

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2>By the <em>numbers</em>.</h2>
        <div className={styles.meta}>Fig. 03 · Dimensions</div>
      </div>
      <div className={styles.grid} ref={ref}>
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className={`${styles.cell} ${seen ? styles.on : ""}`.trim()}
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <div className="k">{m.label}</div>
            <div className="v" dangerouslySetInnerHTML={{ __html: m.value }} />
            <div className="n">{m.caption}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
