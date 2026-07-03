export function BBBDetail() {
  return (
    <svg viewBox="0 0 500 260">
      <defs>
        <marker id="ar-bbb" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--dim)" />
        </marker>
      </defs>
      {/* Data files left */}
      <rect x="20" y="30" width="90" height="26" fill="var(--paper-2)" stroke="var(--ink)" />
      <text x="65" y="46" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--ink)" letterSpacing="0.08em">travelsData</text>
      <rect x="20" y="60" width="90" height="26" fill="var(--paper-2)" stroke="var(--ink)" />
      <text x="65" y="76" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--ink)" letterSpacing="0.08em">adrenalineData</text>
      <rect x="20" y="90" width="90" height="26" fill="var(--paper-2)" stroke="var(--ink)" />
      <text x="65" y="106" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--ink)" letterSpacing="0.08em">projectsData</text>
      <rect x="20" y="120" width="90" height="26" fill="var(--paper-2)" stroke="var(--ink)" />
      <text x="65" y="136" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" fill="var(--ink)" letterSpacing="0.08em">/photos</text>
      {/* Arrow to Next */}
      <line x1="110" y1="88" x2="145" y2="88" stroke="var(--dim)" markerEnd="url(#ar-bbb)" />
      {/* Next.js center */}
      <rect x="145" y="30" width="150" height="180" fill="rgba(165,74,46,0.08)" stroke="var(--accent)" />
      <text x="220" y="52" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--accent)" letterSpacing="0.15em">NEXT.JS · SSG</text>
      <text x="220" y="66" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">output: export</text>
      <line x1="160" y1="76" x2="280" y2="76" stroke="var(--hair)" />
      <text x="220" y="92" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink)">/ · /about</text>
      <text x="220" y="108" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink)">/travels/[slug]</text>
      <text x="220" y="124" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink)">/adrenaline/[sport]</text>
      <text x="220" y="140" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--ink)">/map · /projects</text>
      <line x1="160" y1="150" x2="280" y2="150" stroke="var(--hair)" />
      <text x="220" y="168" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">Tailwind + CSS mods</text>
      <text x="220" y="184" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">OKLCH only, no hex</text>
      <text x="220" y="200" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--accent)">Josefin + Nunito</text>
      {/* Motion layer right */}
      <line x1="295" y1="60" x2="330" y2="60" stroke="var(--dim)" markerEnd="url(#ar-bbb)" />
      <rect x="330" y="35" width="150" height="50" fill="var(--paper)" stroke="var(--dim)" />
      <text x="405" y="57" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink)" letterSpacing="0.1em">FRAMER MOTION</text>
      <text x="405" y="72" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">+ Lenis smooth scroll</text>
      <line x1="295" y1="120" x2="330" y2="120" stroke="var(--dim)" markerEnd="url(#ar-bbb)" />
      <rect x="330" y="95" width="150" height="50" fill="var(--paper)" stroke="var(--dim)" />
      <text x="405" y="117" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink)" letterSpacing="0.1em">D3 GLOBE</text>
      <text x="405" y="132" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">orthographic + polaroid</text>
      <line x1="295" y1="180" x2="330" y2="180" stroke="var(--dim)" markerEnd="url(#ar-bbb)" />
      <rect x="330" y="155" width="150" height="50" fill="var(--paper)" stroke="var(--dim)" />
      <text x="405" y="177" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink)" letterSpacing="0.1em">CANVAS FX</text>
      <text x="405" y="192" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">wave · scramble · grain</text>
      {/* Deploy at bottom */}
      <line x1="220" y1="210" x2="220" y2="230" stroke="var(--dim)" markerEnd="url(#ar-bbb)" />
      <rect x="145" y="230" width="150" height="24" fill="var(--paper-2)" stroke="var(--ink)" />
      <text x="220" y="246" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink)" letterSpacing="0.15em">GITHUB PAGES</text>
    </svg>
  );
}
