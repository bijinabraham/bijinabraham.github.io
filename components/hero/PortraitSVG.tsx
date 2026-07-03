import styles from "./PortraitSVG.module.css";

type Mode = "elevation" | "section";

export function PortraitSVG({ mode = "elevation" }: { mode?: Mode }) {
  return (
    <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}>
      {/* Corner marks — first strokes to draw */}
      <path className={styles.draw} d="M20 20 L60 20 M20 20 L20 60" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      <path className={styles.draw} d="M580 20 L540 20 M580 20 L580 60" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      <path className={styles.draw} d="M20 580 L60 580 M20 580 L20 540" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      <path className={styles.draw} d="M580 580 L540 580 M580 580 L580 540" fill="none" stroke="var(--ink)" strokeWidth="1.5" />

      {/* Portrait outline — shoulders + collar draw2, head circle draw3 */}
      <g transform="translate(300 320)">
        <path className={`${styles.draw} ${styles.draw2}`} d="M-160 180 L-100 20 L100 20 L160 180" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        <path className={`${styles.draw} ${styles.draw2}`} d="M-30 20 L-30 -30 L30 -30 L30 20" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        <circle className={`${styles.draw} ${styles.draw3}`} cx="0" cy="-120" r="90" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
        <line x1="-90" y1="-120" x2="90" y2="-120" stroke="var(--hair)" strokeWidth="1" strokeDasharray="2 3" />
        <line x1="0" y1="-210" x2="0" y2="180" stroke="var(--hair)" strokeWidth="1" strokeDasharray="2 3" />
      </g>

      {/* Shared dimension line */}
      <g className={`${styles.fadeIn} ${styles.f1}`}>
        <line x1="60" y1="130" x2="180" y2="130" stroke="var(--dim)" strokeWidth="1" />
        <line x1="60" y1="125" x2="60" y2="135" stroke="var(--dim)" />
        <line x1="180" y1="125" x2="180" y2="135" stroke="var(--dim)" />
        <text x="120" y="122" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" fill="var(--dim)">
          7+ YR <tspan fill="var(--ink)" fontWeight="500">EXPERIENCE</tspan>
        </text>
      </g>

      {/* ELEVATION callouts */}
      {mode === "elevation" && (
        <g>
          <g className={`${styles.fadeIn} ${styles.f2}`}>
            <line x1="420" y1="200" x2="540" y2="200" stroke="var(--dim)" strokeWidth="1" />
            <line x1="420" y1="195" x2="420" y2="205" stroke="var(--dim)" />
            <line x1="540" y1="195" x2="540" y2="205" stroke="var(--dim)" />
            <text x="480" y="192" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" fill="var(--dim)">
              137% <tspan fill="var(--ink)" fontWeight="500">QUOTA</tspan>
            </text>
          </g>
          <g className={`${styles.fadeIn} ${styles.f2}`}>
            <line x1="300" y1="200" x2="470" y2="120" stroke="var(--accent)" strokeWidth="1" />
            <circle cx="300" cy="200" r="3" fill="var(--accent)" />
            <text x="478" y="112" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" fill="var(--dim)">SE MANAGER, AMER</text>
            <text x="478" y="134" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fill="var(--ink-2)">37 SEs · 3 theatres</text>
          </g>
          <g className={`${styles.fadeIn} ${styles.f3}`}>
            <path d="M 210 260 L 75 260 L 75 232" fill="none" stroke="var(--ink)" strokeWidth="1" />
            <circle cx="210" cy="260" r="3" fill="var(--ink)" />
            <text x="80" y="230" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" fill="var(--dim)">PEOPLE + PIPELINE</text>
            <text x="80" y="252" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fill="var(--ink-2)">hires, forecasts, coach</text>
          </g>
          <g className={`${styles.fadeIn} ${styles.f4}`}>
            <line x1="360" y1="300" x2="510" y2="360" stroke="var(--ink)" strokeWidth="1" />
            <circle cx="360" cy="300" r="3" fill="var(--ink)" />
            <text x="518" y="352" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" fill="var(--dim)">$1.1M CLOSED</text>
            <text x="518" y="374" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fill="var(--ink-2)">15 new logos</text>
          </g>
        </g>
      )}

      {/* SECTION callouts */}
      {mode === "section" && (
        <g>
          <g className={`${styles.fadeIn} ${styles.f2}`}>
            <line x1="420" y1="200" x2="540" y2="200" stroke="var(--dim)" strokeWidth="1" />
            <line x1="420" y1="195" x2="420" y2="205" stroke="var(--dim)" />
            <line x1="540" y1="195" x2="540" y2="205" stroke="var(--dim)" />
            <text x="480" y="192" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" fill="var(--dim)">
              3+ YR <tspan fill="var(--ink)" fontWeight="500">CONFLUENT</tspan>
            </text>
          </g>
          <g className={`${styles.fadeIn} ${styles.f2}`}>
            <line x1="300" y1="200" x2="470" y2="120" stroke="var(--accent)" strokeWidth="1" />
            <circle cx="300" cy="200" r="3" fill="var(--accent)" />
            <text x="478" y="112" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" fill="var(--dim)">STREAMING ARCHITECT</text>
            <text x="478" y="134" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fill="var(--ink-2)">Kafka · Flink · CDC</text>
          </g>
          <g className={`${styles.fadeIn} ${styles.f3}`}>
            <path d="M 210 260 L 75 260 L 75 232" fill="none" stroke="var(--ink)" strokeWidth="1" />
            <circle cx="210" cy="260" r="3" fill="var(--ink)" />
            <text x="80" y="230" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" fill="var(--dim)">POCS AND WORKSHOPS</text>
            <text x="80" y="252" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fill="var(--ink-2)">code, demo, deliver</text>
          </g>
          <g className={`${styles.fadeIn} ${styles.f4}`}>
            <line x1="360" y1="300" x2="510" y2="360" stroke="var(--ink)" strokeWidth="1" />
            <circle cx="360" cy="300" r="3" fill="var(--ink)" />
            <text x="518" y="352" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" fill="var(--dim)">SHIPS WEEKENDS</text>
            <text x="518" y="374" fontFamily="var(--font-fraunces)" fontSize="14" fontStyle="italic" fill="var(--ink-2)">6 live side projects</text>
          </g>
        </g>
      )}

      {/* Title block bottom right */}
      <g>
        <line x1="360" y1="530" x2="580" y2="530" stroke="var(--ink)" strokeWidth="1" />
        <line x1="360" y1="560" x2="580" y2="560" stroke="var(--ink)" strokeWidth="1" />
        <line x1="360" y1="530" x2="360" y2="560" stroke="var(--ink)" />
        <line x1="470" y1="530" x2="470" y2="560" stroke="var(--ink)" />
        <line x1="580" y1="530" x2="580" y2="560" stroke="var(--ink)" />
        <text x="370" y="548" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" fill="var(--dim)">VIEW</text>
        <text x="410" y="548" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" fontWeight="500" fill="var(--ink)">
          {mode === "elevation" ? "ELEV." : "SECT."}
        </text>
        <text x="480" y="548" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" fill="var(--dim)">SHEET</text>
        <text x="520" y="548" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.12em" fontWeight="500" fill="var(--ink)">01/07</text>
      </g>
    </svg>
  );
}
