import { posts } from "@/lib/content/writing";
import styles from "./Writing.module.css";

export function Writing() {
  return (
    <section className={styles.section} id="writing">
      <div className={styles.head}>
        <h2>Notes on <em>practice</em>.</h2>
        <div className={styles.meta}>Fig. 06 · Writing<br />occasional, opinionated</div>
      </div>
      <div className={styles.list}>
        {posts.map((p) => (
          <div className={styles.post} key={p.title}>
            <div className="date">{p.date}</div>
            <div>
              <h3 dangerouslySetInnerHTML={{ __html: p.title }} />
              <div className="excerpt">{p.excerpt}</div>
            </div>
            <div className="tag">{p.tag}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
