"use client";

import { Fragment } from "react";
import { skillCategories, type Skill } from "@/lib/content/skills";
import styles from "./Skills.module.css";
import { useReveal } from "@/lib/hooks/useReveal";

function levelClass(skill: Skill, level: 1 | 2 | 3 | 4): string {
  const filled = skill.level >= level;
  if (!filled) return "cell";
  const isPeak = level === skill.level && skill.sme;
  return isPeak ? "cell filled accent" : "cell filled";
}

export function Skills() {
  const { ref, seen } = useReveal<HTMLDivElement>();
  // Compute a running index across all skill rows so stagger delay is
  // continuous across category groups without also counting the category
  // header rows (which don't animate).
  let skillIdx = 0;

  return (
    <section className={styles.section} id="skills">
      <div className={styles.head}>
        <h2><em>Material</em> specifications.</h2>
        <div className={styles.meta}>Fig. 04 · Skill depth matrix</div>
      </div>
      <div className={styles.matrix} ref={ref}>
        <div className={styles.tableWrap}>
        <table>
          <caption>L1 exposure · L2 working · L3 production · L4 SME/coach</caption>
          <thead>
            <tr>
              <th style={{ width: "280px" }}>Skill</th>
              <th className="level">L1</th>
              <th className="level">L2</th>
              <th className="level">L3</th>
              <th className="level">L4</th>
              <th className="notes">Notes</th>
            </tr>
          </thead>
          <tbody>
            {skillCategories.map((cat) => (
              <Fragment key={cat.name}>
                <tr className={styles.catFirst}>
                  <td className="cat" colSpan={6}>{cat.name}</td>
                </tr>
                {cat.skills.map((skill) => {
                  const i = skillIdx++;
                  return (
                    <tr
                      key={`${cat.name}-${skill.name}`}
                      className={`${styles.row} ${seen ? styles.on : ""}`.trim()}
                      style={{ transitionDelay: `${i * 0.04}s` }}
                    >
                      <td className="skill">
                        {skill.name}
                        {skill.detail && <em>({skill.detail})</em>}
                      </td>
                      {[1, 2, 3, 4].map((l) => (
                        <td key={l} className={levelClass(skill, l as 1 | 2 | 3 | 4)}>
                          <div className="box" />
                        </td>
                      ))}
                      <td className="noteTxt">{skill.note}</td>
                    </tr>
                  );
                })}
              </Fragment>
            ))}
          </tbody>
        </table>
        </div>
        <div className={styles.lvlKey}>
          <span className="k"><span className="swatch" /> empty · not yet</span>
          <span className="k"><span className="swatch f" /> filled · at this level</span>
          <span className="k"><span className="swatch a" /> highlighted · SME</span>
        </div>
      </div>
    </section>
  );
}
