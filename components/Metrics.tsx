import { metrics } from "@/lib/content/metrics";
import styles from "./Metrics.module.css";

export function Metrics() {
  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2>By the <em>numbers</em>.</h2>
        <div className={styles.meta}>Fig. 03 · Dimensions</div>
      </div>
      <div className={styles.grid}>
        {metrics.map((m) => (
          <div key={m.label} className={styles.cell}>
            <div className="k">{m.label}</div>
            <div className="v" dangerouslySetInnerHTML={{ __html: m.value }} />
            <div className="n">{m.caption}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
