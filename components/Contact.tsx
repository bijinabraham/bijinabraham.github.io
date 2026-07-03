import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.head}>
        <h2>Get in <em>touch</em>.</h2>
        <div className={styles.meta}>Fig. 08 · Title block<br />drawing complete</div>
      </div>
      <div className={styles.block}>
        <div className={styles.tbhd}>
          <div className="name">Bijin <em>Abraham</em></div>
          <div className="meta2">
            <div><span className="k">Discipline</span> <span className="v">Solutions engineering</span></div>
            <div><span className="k">Location</span> <span className="v">Bangalore, IN</span></div>
            <div><span className="k">Availability</span> <span className="v">Open to conversations</span></div>
          </div>
        </div>
        <div className={styles.tbbody}>
          <div className={styles.cell}>
            <div className="k">Email</div>
            <div className="v">
              <a href="mailto:bjabraham07@gmail.com">bjabraham07@gmail.com</a>
              <span className="small">best for opportunities</span>
            </div>
          </div>
          <div className={styles.cell}>
            <div className="k">LinkedIn</div>
            <div className="v">
              <a href="https://linkedin.com/in/bijinabraham">/in/bijinabraham</a>
              <span className="small">roles and recruiters</span>
            </div>
          </div>
          <div className={styles.cell}>
            <div className="k">GitHub</div>
            <div className="v">
              <a href="https://github.com/bijinabraham">/bijinabraham</a>
              <span className="small">code and side work</span>
            </div>
          </div>
        </div>
        <div className={styles.tbft}>
          <div className={styles.cell}><span className="lbl">Drawing</span><span className="val">Portfolio · v.1</span></div>
          <div className={styles.cell}><span className="lbl">Sheet</span><span className="val">08 of 08</span></div>
          <div className={styles.cell}><span className="lbl">Rev.</span><span className="val">1.4 · 2026-07</span></div>
          <div className={styles.cell}><span className="lbl">By</span><span className="val">Self</span></div>
        </div>
      </div>
    </section>
  );
}
