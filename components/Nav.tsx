'use client'

import { useId, useLayoutEffect, useRef, useState } from 'react'

/** Scroll lock without `overflow: hidden` on body — that breaks `position: sticky` on `.hdr`. */
function applyScrollLock(scrollLock: { active: boolean; y: number }) {
  const y = window.scrollY || document.documentElement.scrollTop || 0
  scrollLock.active = true
  scrollLock.y = y
  document.body.style.position = 'fixed'
  document.body.style.top = `-${y}px`
  document.body.style.left = '0'
  document.body.style.right = '0'
  document.body.style.width = '100%'
}

function releaseScrollLock(scrollLock: { active: boolean; y: number }) {
  if (!scrollLock.active) {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    document.body.style.width = ''
    return
  }
  const y = scrollLock.y
  scrollLock.active = false
  scrollLock.y = 0
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.width = ''

  const lenis = typeof window !== 'undefined' ? window.__omcodaLenis : undefined
  if (lenis) lenis.stop()

  try {
    window.scrollTo({ left: 0, top: y, behavior: 'instant' })
  } catch {
    window.scrollTo(0, y)
  }

  if (lenis) {
    lenis.scrollTo(y, { immediate: true, force: true })
    lenis.start()
  }
}

const NAV_LINKS = [
  { href: '#intro', label: 'Home' },
  { href: '#thesis', label: 'Thesis' },
  { href: '#method', label: 'Method' },
  { href: '#writing', label: 'Writing' },
  { href: '#practices', label: 'Practices' },
  { href: '#engage', label: 'Engagement' },
] as const

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const panelId = useId()
  const scrollLockRef = useRef({ active: false, y: 0 })

  useLayoutEffect(() => {
    if (!menuOpen) {
      document.body.classList.remove('hdr-menu-open')
      releaseScrollLock(scrollLockRef.current)
      return
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    applyScrollLock(scrollLockRef.current)
    document.body.classList.add('hdr-menu-open')
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('hdr-menu-open')
      releaseScrollLock(scrollLockRef.current)
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
