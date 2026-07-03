"use client";

import styles from "./Nav.module.css";
import { useSiteState } from "@/lib/hooks/SiteStateProvider";
import { ViewToggle } from "./ViewToggle";

export function Nav() {
  const { mode, setMode } = useSiteState();

  return (
    <nav className={styles.nav} aria-label="Primary">
      <a href="#" className={styles.logo}>
        Bijin <em>Abraham</em>
      </a>
      <div className={styles.mid}>
        <ul className={styles.menu}>
          <li><a href="#work">Work</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#writing">Writing</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <ViewToggle mode={mode} onChange={setMode} />
      </div>
    </nav>
  );
}
