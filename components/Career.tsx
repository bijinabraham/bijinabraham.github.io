"use client";

import styles from "./Career.module.css";
import { useReveal } from "../lib/hooks/useReveal";

type MobileRole = {
  year: string;
  company: string;
  title: string;
  leadership?: boolean;
  current?: boolean;
};

const mobileRoles: MobileRole[] = [
  { year: "2026", company: "Confluent × IBM · Aug 2026", title: "Manager, SE", leadership: true, current: true },
  { year: "2024", company: "Confluent AMER", title: "Team Lead, SE", leadership: true },
  { year: "2023", company: "Confluent",      title: "Solutions Engineer" },
  { year: "2022", company: "Deloitte",       title: "Senior Consultant" },
  { year: "2020", company: "Whatfix",        title: "Senior SE" },
  { year: "2017", company: "HP Inc.",        title: "Tech Support" },
];

export function Career() {
  const { ref, seen } = useReveal<HTMLDivElement>();
  const pathClass = `${styles.pathAnim} ${seen ? styles.on : ""}`.trim();

  return (
    <section className={styles.section} id="work">
      <div className={styles.head}>
        <h2>The <em>trajectory</em>, drawn on two axes.</h2>
        <div className={styles.meta}>Fig. 02 · Timeline<br />1cm = 1yr</div>
      </div>
      <div className={styles.wrap} ref={ref}>
        <svg viewBox="0 -40 1200 600" preserveAspectRatio="xMidYMid meet" className={styles.svg}>
          {/* baseline */}
          <line x1="80" y1="480" x2="1120" y2="480" stroke="var(--hair)" />
          {/* year ticks */}
          {[{ x: 120, y: 2017 }, { x: 290, y: 2020 }, { x: 470, y: 2022 }, { x: 620, y: 2023 }, { x: 810, y: 2024 }, { x: 1020, y: 2026 }].map((t) => (
            <g key={t.y}>
              <line x1={t.x} y1="475" x2={t.x} y2="485" stroke="var(--dim)" />
              <text x={t.x} y="506" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="0.12em" fill="var(--dim)">{t.y}</text>
            </g>
          ))}

          {/* Tech track (dashed teal). Fades in rather than draws — the
              visible strokeDasharray "6 4" clashes with the pathAnim class
              that hijacks stroke-dasharray for the draw effect. */}
          <path className={`${styles.techTrack} ${seen ? styles.on : ""}`.trim()}
            fill="none" stroke="var(--signal)" strokeWidth="1.5" strokeDasharray="6 4"
            d="M120 430 C 200 420, 260 380, 290 350 C 340 320, 420 300, 470 270 C 520 250, 590 220, 620 180 C 680 160, 740 130, 810 110 C 880 105, 960 105, 1020 105" />

          {/* People/leadership track (solid rust) */}
          <path className={pathClass} fill="none" stroke="var(--accent)" strokeWidth="2"
            d="M290 450 C 350 440, 420 435, 470 420 C 540 400, 590 370, 620 320 C 680 260, 740 180, 810 130 C 870 80, 960 50, 1020 40" />

          {/* Nodes */}
          <g>
            <circle cx="120" cy="430" r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="105" y="410" textAnchor="end" fontFamily="var(--font-fraunces)" fontSize="18" fontWeight="500" fill="var(--ink)">HP Inc.</text>
            <text x="105" y="392" textAnchor="end" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em" fill="var(--dim)">Tech Support</text>
          </g>
          <g>
            <circle cx="290" cy="350" r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="305" y="332" fontFamily="var(--font-fraunces)" fontSize="18" fontWeight="500" fill="var(--ink)">Whatfix</text>
            <text x="305" y="316" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em" fill="var(--dim)">Senior SE</text>
          </g>
          <g>
            <circle cx="470" cy="270" r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="485" y="252" fontFamily="var(--font-fraunces)" fontSize="18" fontWeight="500" fill="var(--ink)">Deloitte</text>
            <text x="485" y="236" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em" fill="var(--dim)">Senior Consultant</text>
          </g>
          <g>
            <circle cx="620" cy="180" r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
            <text x="635" y="162" fontFamily="var(--font-fraunces)" fontSize="18" fontWeight="500" fill="var(--ink)">Confluent</text>
            <text x="635" y="146" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em" fill="var(--dim)">SE, Global</text>
          </g>
          <g>
            <circle cx="810" cy="110" r="8" fill="var(--paper)" stroke="var(--accent)" strokeWidth="2" />
            <text x="825" y="90" fontFamily="var(--font-fraunces)" fontSize="18" fontWeight="500" fill="var(--accent)">Team Lead, SE</text>
            <text x="825" y="74" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em" fill="var(--dim)">Confluent AMER</text>
          </g>
          <g>
            <circle cx="1020" cy="40" r="9" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1.5" />
            <text x="1035" y="22" fontFamily="var(--font-fraunces)" fontSize="18" fontWeight="500" fill="var(--accent)">Manager, SE</text>
            <text x="1035" y="6" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em" fill="var(--dim)">Confluent × IBM · Aug 2026</text>
          </g>

          {/* Y axis annotations */}
          <line x1="80" y1="40" x2="80" y2="480" stroke="var(--hair)" strokeDasharray="2 3" />
          <text x="66" y="45" textAnchor="end" fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="0.12em" fill="var(--dim)">EXPERT</text>
          <text x="66" y="215" textAnchor="end" fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="0.12em" fill="var(--dim)">SR IC</text>
          <text x="66" y="345" textAnchor="end" fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="0.12em" fill="var(--dim)">MID</text>
          <text x="66" y="470" textAnchor="end" fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="0.12em" fill="var(--dim)">JUNIOR</text>

          {/* Leadership span (Team Lead to Manager) */}
          <line x1="810" y1="-22" x2="1020" y2="-22" stroke="var(--accent)" strokeWidth="2" />
          <line x1="810" y1="-26" x2="810" y2="-18" stroke="var(--accent)" strokeWidth="1.5" />
          <line x1="1020" y1="-26" x2="1020" y2="-18" stroke="var(--accent)" strokeWidth="1.5" />
          <text x="915" y="-30" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10.5" letterSpacing="0.12em" fill="var(--accent)">People Leadership Scope</text>

          {/* Tech track callout */}
          <text x="1035" y="105" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em" fill="var(--signal)">Technical Depth</text>
          <text x="1035" y="120" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.1em" fill="var(--signal)">Still Rising · SME</text>
        </svg>
        <div className={styles.legend}>
          <span className="lg"><span className="sw p" />People and leadership scope</span>
          <span className="lg"><span className="sw t" />Technical depth and IC craft</span>
        </div>
      </div>

      {/* Mobile-only vertical timeline. Hidden above 640px via CSS. */}
      <ol className={styles.mobileTimeline} aria-label="Career timeline">
        {mobileRoles.map((r) => {
          const cls = [
            styles.mobileRow,
            r.leadership ? styles.mobileLead : "",
            r.current ? styles.mobileCurrent : "",
          ].filter(Boolean).join(" ");
          return (
            <li key={`${r.year}-${r.title}`} className={cls}>
              <span className={styles.mobileYear}>{r.year}</span>
              <div className={styles.mobileBody}>
                <div className={styles.mobileTitle}>{r.title}</div>
                <div className={styles.mobileCompany}>{r.company}</div>
              </div>
            </li>
          );
        })}
      </ol>
      <div className={styles.mobileLegend} aria-hidden="true">
        <span className={styles.mobileLegendDot} />
        People Leadership Scope · since 2024
      </div>
    </section>
  );
}
