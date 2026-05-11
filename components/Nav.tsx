'use client'

import { useEffect, useId, useState } from 'react'

const NAV_LINKS = [
  { href: '#method', label: 'Method' },
  { href: '#writing', label: 'Writing' },
  { href: '#practices', label: 'Practices' },
  { href: '#engage', label: 'Engagement' },
] as const

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const panelId = useId()

  useEffect(() => {
    if (!menuOpen) {
      document.body.classList.remove('hdr-menu-open')
      return
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.classList.add('hdr-menu-open')
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('hdr-menu-open')
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      {/* Drawer outside .hdr so position:fixed is viewport-based (backdrop-filter on header would trap it). */}
      <header className="hdr">
        <div className="wrap hdr-inner">
          <a className="lockup" href="#" aria-label="Home">
            <img src="/assets/logo-pmco.svg" alt="" />
            <span className="stack" aria-hidden="true">
              <span className="top layout-lock-line"></span>
              <span className="sub layout-lock-line layout-lock-line--narrow"></span>
            </span>
          </a>
          <nav className="primary" aria-label="Primary">
            {NAV_LINKS.map(({ href, label }) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className="hdr-actions">
            <button
              type="button"
              className="hdr-menu-toggle"
              aria-expanded={menuOpen}
              aria-controls={panelId}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="hdr-menu-toggle__bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="hdr-menu-toggle__label">Menu</span>
            </button>
            <button type="button" className="btn" aria-label="Action">
              <span>→</span>
            </button>
          </div>
        </div>
      </header>

      <div
        id={panelId}
        className={`hdr-mobile-drawer ${menuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="hdr-mobile-drawer__backdrop"
          tabIndex={-1}
          aria-label="Close menu"
          onClick={closeMenu}
        />
        <nav className="hdr-mobile-drawer__nav" aria-label="Primary">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
