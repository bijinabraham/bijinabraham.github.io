export function PsychShortsDetail() {
  return (
    <svg viewBox="0 0 500 240">
      <defs>
        <marker id="ar-psych" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="var(--dim)" />
        </marker>
      </defs>
      <rect x="20" y="40" width="90" height="60" fill="var(--paper-2)" stroke="var(--ink)" />
      <text x="65" y="65" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink)">SEED BIAS</text>
      <text x="65" y="80" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">200+ topics</text>
      <line x1="110" y1="70" x2="150" y2="70" stroke="var(--dim)" markerEnd="url(#ar-psych)" />
      <rect x="150" y="40" width="100" height="60" fill="rgba(165,74,46,0.10)" stroke="var(--accent)" />
      <text x="200" y="65" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--accent)">LLM WRITE</text>
      <text x="200" y="80" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">script + hook</text>
      <line x1="250" y1="70" x2="290" y2="70" stroke="var(--dim)" markerEnd="url(#ar-psych)" />
      <rect x="290" y="40" width="100" height="60" fill="var(--paper)" stroke="var(--dim)" />
      <text x="340" y="65" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink)">RENDER</text>
      <text x="340" y="80" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">tts + frames</text>
      <line x1="340" y1="100" x2="340" y2="140" stroke="var(--dim)" markerEnd="url(#ar-psych)" />
      <rect x="290" y="140" width="100" height="50" fill="var(--paper)" stroke="var(--dim)" />
      <text x="340" y="162" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink)">FFMPEG</text>
      <text x="340" y="175" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">stitch mp4</text>
      <line x1="290" y1="165" x2="250" y2="165" stroke="var(--dim)" markerEnd="url(#ar-psych)" />
      <rect x="150" y="140" width="100" height="50" fill="rgba(165,74,46,0.10)" stroke="var(--accent)" />
      <text x="200" y="162" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--accent)">YOUTUBE API</text>
      <text x="200" y="175" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">publish + tags</text>
      <line x1="150" y1="165" x2="110" y2="165" stroke="var(--dim)" markerEnd="url(#ar-psych)" />
      <rect x="20" y="140" width="90" height="50" fill="var(--paper)" stroke="var(--dim)" />
      <text x="65" y="162" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--ink)">GH ACTIONS</text>
      <text x="65" y="175" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">daily cron</text>
      {/* Test badge */}
      <rect x="410" y="90" width="80" height="50" fill="var(--paper)" stroke="var(--accent)" />
      <text x="450" y="112" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--accent)">28/28</text>
      <text x="450" y="126" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9" fill="var(--dim)">tests green</text>
    </svg>
  );
}
