import styles from "./Nav.module.css";

export function Nav() {
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
      </div>
    </nav>
  );
}
