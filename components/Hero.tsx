import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.stamp}>
        <div><span className="k">Doc №</span><span className="v">CV-2026-BA</span></div>
        <div><span className="k">Rev.</span><span className="v">1.4</span></div>
        <div><span className="k">View</span><span className="v">Elevation</span></div>
        <div className="sec"><span className="k">Drawn by</span><span className="v">Self</span></div>
      </div>

      <div className={styles.left}>
        <div className={styles.eyebrow}>
          <span className="hair" />Fig. 01 · Portrait, elevation
        </div>
        <h1 className={styles.display}>
          <span className="word"><span>Bijin</span></span>
          <span className="word"><span><em>Abraham</em></span></span>
          <span className="underline" />
        </h1>
        <div className={styles.roleLine}>
          <span className="arrow">▸</span>
          Manager · Solutions Engineering · Confluent · AMER
        </div>
        <p className={styles.body}>
          7+ years drawing streaming systems for the world&rsquo;s largest data flows, currently leading the Solutions Engineering team for <em>New Logo Acquisition</em> across the Americas. People and pipeline, owned end to end.
        </p>
        <div className={styles.cta}>
          <a href="#work" className={styles.btn}>See the trajectory →</a>
          <a href="#contact" className={`${styles.btn} ${styles.ghost}`}>Hire me to lead →</a>
        </div>
      </div>

      <div className={styles.right}>
        {/* PortraitSVG goes here in Task 2.4 */}
      </div>
    </section>
  );
}
