'use client'

import { useCallback, useId, useRef } from 'react'
import { footer, newsroom, newsletter } from '@/lib/siteCopy'

/** When true, in-page anchors like `#method` become `/#method` so they resolve from non-home routes. */
function resolveFooterHref(href: string, linkHome: boolean | undefined) {
  if (linkHome && href.startsWith('#') && href.length > 1) {
    return `/${href}`
  }
  return href
}

type FooterProps = {
  linkHome?: boolean
}

export default function Footer({ linkHome }: FooterProps) {
  const newsroomScrollerRef = useRef<HTMLDivElement>(null)
  const emailFieldId = useId()

  const scrollNewsroom = useCallback((dir: number) => {
    const root = newsroomScrollerRef.current
    if (!root) return
    const card = root.querySelector('.site-footer__newsroom-card') as HTMLElement | null
    const gap = 16
    const step = (card?.offsetWidth ?? Math.min(340, root.clientWidth * 0.85)) + gap
    root.scrollBy({ left: dir * step, behavior: 'smooth' })
  }, [])

  return (
    <footer
      className="site-footer sec tight site-footer--brand-collapsed"
      id="contact"
      aria-label="Site footer"
    >
      <div className="wrap">
        <div className="site-footer__grid site-footer__canvas">
          <div className="site-footer__brand site-footer__cell">
            <span className="gnum site-footer__gnum">08</span>
            <span className="gcorner site-footer__gcorner">A</span>
            <div className="ftword">
              om
              <br />
              coda
              <br />
              <small>consulting</small>
            </div>
          </div>

          <div className="site-footer__body">
          <div className="site-footer__top-cluster">
            <div className="site-footer__col site-footer__cell">
              <span className="gcorner site-footer__gcorner">B</span>
              <span className="gnum site-footer__gnum">Method</span>
              <nav className="site-footer__links" aria-label="Method">
                {footer.methodLinks.map((l) => (
                  <a key={l.href} href={resolveFooterHref(l.href, linkHome)} className="site-footer__link">
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>
            <div className="site-footer__col site-footer__cell">
              <span className="gcorner site-footer__gcorner">C</span>
              <span className="gnum site-footer__gnum">Reading</span>
              <nav className="site-footer__links" aria-label="Reading">
                {footer.readingLinks.map((l) => (
                  <a key={l.label} href={resolveFooterHref(l.href, linkHome)} className="site-footer__link">
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>
            <div className="site-footer__col site-footer__cell">
              <span className="gcorner site-footer__gcorner">D</span>
              <span className="gnum site-footer__gnum">Office</span>
              <nav className="site-footer__links" aria-label="Office">
                {footer.officeLinks.map((l) => (
                  <a key={l.label} href={resolveFooterHref(l.href, linkHome)} className="site-footer__link">
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>
            <div className="site-footer__col site-footer__cell site-footer__col--last">
              <span className="gcorner site-footer__gcorner">E</span>
              <span className="gnum site-footer__gnum">Studio</span>
              <p className="site-footer__studio">
                Toronto
                <br />
                By appointment
              </p>
            </div>
          </div>

          <div className="site-footer__form site-footer__cell">
            <p className="site-footer__hint">{newsletter.hint}</p>
            <form
              className="site-footer__book"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <label className="visually-hidden" htmlFor={emailFieldId}>
                Email for booking inquiry
              </label>
              <input
                id={emailFieldId}
                name="email"
                type="email"
                autoComplete="email"
                placeholder={newsletter.emailPlaceholder}
                className="site-footer__book-input"
              />
              <button type="submit" className="site-footer__book-btn">
                {newsletter.submitLabel}
              </button>
            </form>
            <p className="site-footer__meta">
              <span>{footer.tagline}</span>
              <span className="site-footer__copy">© Om Coda · 2026 · Vol. 01</span>
            </p>
          </div>

          <section
            className="site-footer__newsroom site-footer__cell"
            aria-labelledby="footer-newsroom-heading"
          >
            <div className="site-footer__newsroom-head">
              <div className="site-footer__newsroom-head-text">
                <p className="site-footer__newsroom-eyebrow">08 · Newsroom</p>
                <h2 id="footer-newsroom-heading" className="site-footer__newsroom-title">
                  {newsroom.title}
                </h2>
                <p className="site-footer__newsroom-subtitle">{newsroom.subtitle}</p>
              </div>
              <div className="site-footer__newsroom-controls" aria-label="Newsroom carousel">
                <button
                  type="button"
                  className="site-footer__newsroom-btn"
                  onClick={() => scrollNewsroom(-1)}
                >
                  Prev
                </button>
                <button
                  type="button"
                  className="site-footer__newsroom-btn"
                  onClick={() => scrollNewsroom(1)}
                >
                  Next
                </button>
              </div>
            </div>
            <div
              ref={newsroomScrollerRef}
              className="site-footer__newsroom-viewport"
              tabIndex={0}
              role="region"
              aria-label="Newsroom articles"
            >
              {newsroom.items.map((item, i) => (
                <a
                  key={`${item.date}-${i}`}
                  href={resolveFooterHref(item.href, linkHome)}
                  className="site-footer__newsroom-card"
                >
                  <span className="site-footer__newsroom-card-date">{item.date}</span>
                  <span className="site-footer__newsroom-card-title">{item.title}</span>
                  <span className="site-footer__newsroom-card-dek">{item.dek}</span>
                  <span className="site-footer__newsroom-card-cta">Read →</span>
                </a>
              ))}
            </div>
          </section>
          </div>
        </div>
      </div>
    </footer>
  )
}
