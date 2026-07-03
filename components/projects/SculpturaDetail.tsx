export function SculpturaDetail() {
  return (
    <svg viewBox="0 0 500 260">
      <defs>
        <marker id="ar-sculp" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--dim)" />
        </marker>
      </defs>
      {/* Website */}
      <rect x="20" y="30" width="180" height="120" fill="var(--paper-2)" stroke="var(--ink)" />
      <text x="110" y="55" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink)" letterSpacing="0.15em">NEXT.JS · SSG</text>
      <rect x="30" y="70" width="160" height="20" fill="var(--paper)" stroke="var(--dim)" />
      <text x="110" y="83" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">HERO · MARQUEE</text>
      <rect x="30" y="95" width="160" height="20" fill="var(--paper)" stroke="var(--dim)" />
      <text x="110" y="108" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">PROCESS · GALLERY</text>
      <rect x="30" y="120" width="160" height="20" fill="var(--paper)" stroke="var(--dim)" />
      <text x="110" y="133" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">QUOTE FORM</text>
      {/* Sanity */}
      <line x1="200" y1="90" x2="250" y2="90" stroke="var(--dim)" strokeWidth="1" markerEnd="url(#ar-sculp)" />
      <rect x="250" y="60" width="110" height="60" fill="rgba(165,74,46,0.10)" stroke="var(--accent)" />
      <text x="305" y="86" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--accent)" letterSpacing="0.1em">SANITY CMS</text>
      <text x="305" y="104" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">gallery + copy</text>
      {/* Framer motion */}
      <line x1="200" y1="130" x2="250" y2="180" stroke="var(--dim)" strokeWidth="1" markerEnd="url(#ar-sculp)" />
      <rect x="250" y="160" width="110" height="60" fill="var(--paper)" stroke="var(--dim)" />
      <text x="305" y="186" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--ink)" letterSpacing="0.1em">FRAMER MOTION</text>
      <text x="305" y="202" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">scroll + hover fx</text>
      {/* Email */}
      <line x1="110" y1="150" x2="110" y2="200" stroke="var(--dim)" strokeWidth="1" markerEnd="url(#ar-sculp)" />
      <rect x="60" y="200" width="100" height="40" fill="var(--paper)" stroke="var(--dim)" />
      <text x="110" y="220" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink)" letterSpacing="0.1em">RESEND</text>
      <text x="110" y="234" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">quote → email</text>
      {/* Host */}
      <rect x="380" y="30" width="100" height="60" fill="var(--paper)" stroke="var(--dim)" />
      <text x="430" y="55" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink)">VERCEL</text>
      <text x="430" y="70" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">edge · ISR</text>
      <line x1="200" y1="20" x2="380" y2="20" stroke="var(--dim)" strokeWidth="1" strokeDasharray="3 3" />
      <text x="290" y="16" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="var(--dim)">deployed on</text>
    </svg>
  );
}
