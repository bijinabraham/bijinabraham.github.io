export function AtlasDetail() {
  return (
    <svg viewBox="0 0 560 260">
      <defs>
        <marker id="ar-atlas" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--dim)" />
        </marker>
      </defs>
      {/* Phone shell */}
      <rect x="20" y="20" width="120" height="220" fill="var(--paper-2)" stroke="var(--ink)" />
      <text x="80" y="45" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink)" letterSpacing="0.15em">EXPO · RN</text>
      <line x1="30" y1="55" x2="130" y2="55" stroke="var(--hair)" />
      <rect x="30" y="70" width="100" height="30" fill="var(--paper)" stroke="var(--dim)" />
      <text x="80" y="88" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">SETS · REPS</text>
      <rect x="30" y="108" width="100" height="30" fill="var(--paper)" stroke="var(--dim)" />
      <text x="80" y="126" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">TIMER</text>
      <rect x="30" y="146" width="100" height="30" fill="var(--paper)" stroke="var(--dim)" />
      <text x="80" y="164" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">HISTORY</text>
      <rect x="30" y="184" width="100" height="30" fill="var(--paper-2)" stroke="var(--dim)" strokeDasharray="3 3" />
      <text x="80" y="202" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">CHARTS</text>
      {/* Arrow to SQLite */}
      <line x1="140" y1="130" x2="240" y2="130" stroke="var(--dim)" strokeWidth="1" markerEnd="url(#ar-atlas)" />
      <text x="190" y="123" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">async storage</text>
      {/* SQLite */}
      <rect x="240" y="100" width="170" height="80" fill="rgba(165,74,46,0.10)" stroke="var(--accent)" />
      <text x="325" y="130" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--accent)" letterSpacing="0.1em">SQLITE</text>
      <text x="325" y="150" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">exercises · sessions · sets</text>
      <text x="325" y="166" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">local · encrypted</text>
      {/* No sync (deliberate) */}
      <line x1="410" y1="140" x2="440" y2="140" stroke="var(--dim)" strokeWidth="1" strokeDasharray="4 4" />
      <rect x="440" y="105" width="110" height="70" fill="var(--paper)" stroke="var(--dim)" strokeDasharray="3 3" />
      <text x="495" y="132" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">CLOUD SYNC</text>
      <text x="495" y="146" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">(deliberately none)</text>
      <text x="495" y="162" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--accent)">privacy by absence</text>
    </svg>
  );
}
