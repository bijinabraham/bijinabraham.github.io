"use client";

import { useState, type ReactElement } from "react";
import { projects } from "@/lib/content/projects";
import styles from "./Projects.module.css";
import { AtlasDetail } from "./projects/AtlasDetail";
import { SculpturaDetail } from "./projects/SculpturaDetail";
import { PsychShortsDetail } from "./projects/PsychShortsDetail";
import { BBBDetail } from "./projects/BBBDetail";
import { useReveal } from "@/lib/hooks/useReveal";

const detailMap: Record<string, () => ReactElement> = {
  atlas: AtlasDetail,
  sculptura: SculpturaDetail,
  "psych-shorts": PsychShortsDetail,
  bbb: BBBDetail,
};

export function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const { ref, seen } = useReveal<HTMLDivElement>();

  return (
    <section className={styles.section} id="projects">
      <div className={styles.head}>
        <h2>Nights &amp; <em>weekends</em>.</h2>
        <div className={styles.meta}>Fig. 05 · Side work<br />click a row for detail drawing</div>
      </div>
      <div className={styles.list} ref={ref}>
        {projects.map((p, i) => {
          const isOpen = openSlug === p.slug;
          const Detail = detailMap[p.slug];
          return (
            <article
              key={p.slug}
              className={`${styles.card} ${isOpen ? styles.open : ""} ${seen ? styles.cardOn : ""}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <button
                type="button"
                className="head-row"
                aria-expanded={isOpen}
                onClick={() => setOpenSlug(isOpen ? null : p.slug)}
              >
                <div className="num">Proj. {p.num}</div>
                <div>
                  <h3 dangerouslySetInnerHTML={{ __html: p.title }} />
                  <p>{p.description}</p>
                </div>
                <div className="status">{p.status}</div>
                <div className="expand">Detail <span className="chev">▾</span></div>
              </button>
              <div className={styles.detail}>
                <div className={styles.detailInner}>
                  {Detail ? <Detail /> : null}
                  <div className="arch">
                    <h4>Design choices worth defending</h4>
                    <ul>
                      {p.choices.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                    <div className={styles.stack}>Stack: {p.stack}</div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
