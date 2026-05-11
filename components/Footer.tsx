import { footer } from '@/lib/siteCopy'

export default function Footer() {
  return (
    <section className="sec tight">
      <div className="wrap">
        <div className="gframe rule-bottom" style={{ gridAutoRows: 'auto', borderColor: 'var(--ink)', background: 'var(--ink)' }}>
          <div className="gcell dark c2 r2" style={{ minHeight: '220px', borderColor: '#2a2a2a' }}>
            <span className="gnum" style={{ color: 'var(--mute-2)' }}>08</span>
            <span className="gcorner">A</span>
            <div className="ftword">om<br />coda<br /><small>consulting</small></div>
          </div>
          <div className="gcell dark" style={{ minHeight: '200px', borderColor: '#2a2a2a' }}>
            <span className="gcorner">B</span>
            <span className="gnum" style={{ color: 'var(--mute-2)' }}>Method</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 'auto', fontFamily: 'var(--font-body)', fontSize: '13px' }}>
              {footer.methodLinks.map((l) => (
                <a key={l.href} href={l.href} style={{ color: 'var(--paper-pure)', textDecoration: 'none' }}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="gcell dark" style={{ minHeight: '200px', borderColor: '#2a2a2a' }}>
            <span className="gcorner">C</span>
            <span className="gnum" style={{ color: 'var(--mute-2)' }}>Reading</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 'auto', fontFamily: 'var(--font-body)', fontSize: '13px' }}>
              {footer.readingLinks.map((l) => (
                <a key={l.label} href={l.href} style={{ color: 'var(--paper-pure)', textDecoration: 'none' }}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="gcell dark" style={{ minHeight: '200px', borderColor: '#2a2a2a' }}>
            <span className="gcorner">D</span>
            <span className="gnum" style={{ color: 'var(--mute-2)' }}>Office</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 'auto', fontFamily: 'var(--font-body)', fontSize: '13px' }}>
              {footer.officeLinks.map((l) => (
                <a key={l.label} href={l.href} style={{ color: 'var(--paper-pure)', textDecoration: 'none' }}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="gcell dark r-end" style={{ minHeight: '200px', borderColor: '#2a2a2a' }}>
            <span className="gcorner">E</span>
            <span className="gnum" style={{ color: 'var(--mute-2)' }}>Studio</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: '1.5', color: 'var(--paper-pure)', marginTop: 'auto' }}>New York<br />By appointment</span>
          </div>

          <div className="gcell dark c4 b-end" style={{ minHeight: '100px', borderColor: '#2a2a2a' }}>
            <span className="gcorner">F</span>
            <div
              style={{
                marginTop: 'auto',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--mute-2)',
                lineHeight: 1.5,
              }}
            >
              {footer.tagline}
            </div>
          </div>
          <div className="gcell dark r-end b-end" style={{ minHeight: '100px', borderColor: '#2a2a2a' }}>
            <span className="gcorner">↘</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.119em', textTransform: 'uppercase', color: 'var(--mute-2)', marginTop: 'auto' }}>© Om Coda · 2026 · Vol. 01</span>
          </div>
        </div>
      </div>
    </section>
  )
}
