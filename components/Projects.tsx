import { projects } from "@/lib/content/projects";
import styles from "./Projects.module.css";

export function Projects() {
  return (
    <section className={styles.section} id="projects">
      <div className={styles.head}>
        <h2>Nights &amp; <em>weekends</em>.</h2>
        <div className={styles.meta}>Fig. 05 · Side work<br />click a row for detail drawing</div>
      </div>
      <div className={styles.list}>
        {projects.map((p) => (
          <div key={p.slug} className={styles.card}>
            <div className="head-row">
              <div className="num">Proj. {p.num}</div>
              <div>
                <h3 dangerouslySetInnerHTML={{ __html: p.title }} />
                <p>{p.description}</p>
              </div>
              <div className="status">{p.status}</div>
              <div className="expand">Detail <span className="chev">▾</span></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
