'use client'
import Lenis from 'lenis'
import { useEffect } from 'react'

declare global {
  interface Window {
    /** Set while Lenis runs — Nav uses on menu close only (sync scroll restore). */
    __omcodaLenis?: Lenis
  }
}

export default function useScrollEffects() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    var ac = new AbortController()
    var sig = ac.signal

    function syncHdrH() {
      var hdr = document.querySelector('.hdr')
      if (hdr) {
        document.documentElement.style.setProperty('--hdr-h', (hdr as HTMLElement).offsetHeight + 'px')
      }
    }
    syncHdrH()
    window.addEventListener('resize', syncHdrH, { signal: sig })
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncHdrH)

    function scanRevealOnScroll() {
      var pending = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)')
      if (!pending.length) return
      var vh = window.innerHeight || document.documentElement.clientHeight || 600
      var pad = Math.min(72, vh * 0.06)
      pending.forEach(function (el) {
        var r = el.getBoundingClientRect()
        if (r.top < vh - pad && r.bottom > pad) {
          el.classList.add('is-revealed')
        }
      })
    }
    function scrollYUniversal(lenisInstance: Lenis | null) {
      if (lenisInstance != null) return lenisInstance.scroll
      return window.scrollY || document.documentElement.scrollTop || 0
    }
    /** Play only the fill-cell video for the active industry; pause others. */
    function syncPracticesFillVideos(sec: HTMLElement) {
      var raw = sec.getAttribute('data-active-idx')
      var active = raw != null ? parseInt(raw, 10) : 0
      if (Number.isNaN(active)) active = 0
      var unveiled = sec.classList.contains('practices-insurance-unveil')
      sec.querySelectorAll('.practices-c3-media__video').forEach(function (el) {
        var vid = el as HTMLVideoElement
        var layer = vid.closest('.practices-industry-content') as HTMLElement | null
        var idxAttr = layer && layer.getAttribute('data-industry-idx')
        var layerIdx = idxAttr != null ? parseInt(idxAttr, 10) : NaN
        var shouldPlay = unveiled && active >= 1 && active <= 5 && layerIdx === active
        if (shouldPlay) {
          var r = vid.play()
          if (r && typeof r.catch === 'function') r.catch(function () {})
        } else {
          vid.pause()
        }
      })
    }
    function updatePracticesLabelSwap(lenisInstance: Lenis | null) {
      var sec = document.getElementById('practices')
      var track = document.querySelector('.practices-label-swap__track') as HTMLElement | null
      if (!sec || !track) return
      var inner = sec.querySelector('.practices-pin-inner')
      var mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mq && mq.matches) {
        track.style.setProperty('--practices-swap', '1')
        if (inner) inner.setAttribute('data-active-index', '5')
        sec.setAttribute('data-active-idx', '5')
        sec.classList.add('practices-insurance-unveil')
        syncPracticesFillVideos(sec)
        return
      }
      var stage = sec.querySelector('.practices-pin-stage')
      if (!stage) return
      var y = scrollYUniversal(lenisInstance)
      var st = stage.getBoundingClientRect().top + window.pageYOffset
      var sh = (stage as HTMLElement).offsetHeight
      var vh = window.innerHeight || document.documentElement.clientHeight || 600
      var yStart = st
      var yEnd = st + sh - vh
      var p = (y - yStart) / Math.max(1, yEnd - yStart)
      p = Math.max(0, Math.min(1, p))
      track.style.setProperty('--practices-swap', String(p))
      var idx = Math.min(5, Math.floor(p * 6))
      if (inner) {
        inner.setAttribute('data-active-index', String(idx))
      }
      sec.setAttribute('data-active-idx', String(idx))
      if (idx >= 1 && !sec.classList.contains('practices-insurance-unveil')) {
        sec.classList.add('practices-insurance-unveil')
      }
      syncPracticesFillVideos(sec)
    }
    function wirePracticesLabelSwap(lenisInstance: Lenis | null) {
      var track = document.querySelector('.practices-label-swap__track')
      if (!track) return
      function tick() {
        updatePracticesLabelSwap(lenisInstance)
      }
      tick()
      window.addEventListener('scroll', tick, { passive: true, signal: sig })
      window.addEventListener('resize', tick, { signal: sig })
      window.addEventListener('wheel', tick, { passive: true, signal: sig })
      document.addEventListener('touchmove', tick, { passive: true, signal: sig })
      window.addEventListener(
        'keydown',
        function (e) {
          var k = e.key
          if (k === ' ' || k === 'PageDown' || k === 'PageUp' || k === 'End' || k === 'Home' || k === 'ArrowDown' || k === 'ArrowUp') {
            tick()
          }
        },
        { capture: true, signal: sig }
      )
      if (lenisInstance) {
        lenisInstance.on('scroll', tick)
      }
    }

    function wirePracticesNewsCarousel() {
      document.querySelectorAll('#practices .practices-news-carousel').forEach(function (root) {
        var viewport = root.querySelector('.practices-news-carousel__viewport') as HTMLElement | null
        var prev = root.querySelector('[data-practices-news-prev]')
        var next = root.querySelector('[data-practices-news-next]')
        if (!viewport) return
        function slideBy(dir: number) {
          var w = viewport!.clientWidth
          if (!w) return
          viewport!.scrollBy({ left: dir * w, behavior: 'smooth' })
        }
        if (prev) prev.addEventListener('click', function () { slideBy(-1) }, { signal: sig })
        if (next) next.addEventListener('click', function () { slideBy(1) }, { signal: sig })
      })
    }

    function wireSiteRailVideo() {
      const el = document.querySelector('.site-rail__media-video')
      if (!(el instanceof HTMLVideoElement)) return
      const video: HTMLVideoElement = el
      var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
      function tryPlay() {
        var r = video.play()
        if (r && typeof r.catch === 'function') r.catch(function () {})
      }
      function sync() {
        if (mqReduce.matches) {
          video.pause()
          return
        }
        tryPlay()
      }
      video.addEventListener('loadeddata', sync, { once: true, signal: sig })
      mqReduce.addEventListener('change', sync, { signal: sig })
      sync()
    }

    function wirePracticesC3Video() {
      var sec = document.getElementById('practices')
      if (!sec) return
      var secEl = sec as HTMLElement
      sec.querySelectorAll('.practices-c3-media__video').forEach(function (video) {
        var vid = video as HTMLVideoElement
        vid.addEventListener(
          'loadeddata',
          function () {
            syncPracticesFillVideos(secEl)
          },
          { once: true, signal: sig }
        )
      })
    }

    function pickThesisPinSlideIndex(panels: Element[], yProbe: number): number {
      if (!panels.length) return 0
      for (var i = 0; i < panels.length; i++) {
        var r = panels[i].getBoundingClientRect()
        if (yProbe < r.top) return Math.max(0, i - 1)
        if (yProbe <= r.bottom) return i
      }
      return panels.length - 1
    }
    function updateThesisPinSlides() {
      var sec = document.getElementById('thesis')
      if (!sec) return
      var panels = Array.from(sec.querySelectorAll('.thesis-split-scroll__copy .thesis-phase-panel'))
      if (!panels.length) return
      var vh = window.innerHeight || document.documentElement.clientHeight || 600
      var yProbe = vh * 0.42
      var idx = pickThesisPinSlideIndex(panels, yProbe)
      idx = Math.max(0, Math.min(panels.length - 1, idx))
      sec.setAttribute('data-thesis-pin-slide', String(idx))
      sec.querySelectorAll('.thesis-col-cover__fill .thesis-col-cover__img').forEach(function (img, i) {
        img.setAttribute('aria-hidden', i === idx ? 'false' : 'true')
      })
    }
    function wireThesisPinSlides(lenisInstance: Lenis | null) {
      if (!document.querySelector('#thesis .thesis-col-cover__fill')) return
      function tick() {
        updateThesisPinSlides()
      }
      tick()
      window.addEventListener('scroll', tick, { passive: true, signal: sig })
      window.addEventListener('resize', tick, { signal: sig })
      window.addEventListener('wheel', tick, { passive: true, signal: sig })
      document.addEventListener('touchmove', tick, { passive: true, signal: sig })
      window.addEventListener(
        'keydown',
        function (e) {
          var k = e.key
          if (k === ' ' || k === 'PageDown' || k === 'PageUp' || k === 'End' || k === 'Home' || k === 'ArrowDown' || k === 'ArrowUp') {
            tick()
          }
        },
        { capture: true, signal: sig }
      )
      if (lenisInstance) {
        lenisInstance.on('scroll', tick)
      }
    }

    /** Mobile-only thesis gutter pin:
     *  Pin immediately on thesis entry, then unpin when #method approaches the top of viewport.
     */
    function wireThesisMobilePinUntilMethod(lenisInstance: Lenis | null) {
      var thesis = document.getElementById('thesis')
      var method = document.getElementById('method')
      if (!thesis || !method) return

      var thesisEl = thesis as HTMLElement
      var methodEl = method as HTMLElement

      var mqMobile = window.matchMedia('(max-width: 920px)')
      function tick() {
        if (!mqMobile.matches) {
          thesisEl.classList.remove('thesis-pin--mobile-active')
          return
        }

        var vh = window.innerHeight || document.documentElement.clientHeight || 600
        var thesisR = thesisEl.getBoundingClientRect()
        var methodR = methodEl.getBoundingClientRect()

        // Pin only after the user has reached thesis (top crosses into view from below).
        var thesisEntered = thesisR.top < vh
        // Unpin when #method approaches the top of the viewport (tune 0.08–0.15).
        var methodBand = vh * 0.1
        var methodNotYetNearTop = methodR.top > methodBand

        var shouldPin = thesisEntered && methodNotYetNearTop

        if (shouldPin) thesisEl.classList.add('thesis-pin--mobile-active')
        else thesisEl.classList.remove('thesis-pin--mobile-active')
      }

      tick()
      window.addEventListener('scroll', tick, { passive: true, signal: sig })
      window.addEventListener('resize', tick, { signal: sig })
      window.addEventListener('wheel', tick, { passive: true, signal: sig })
      document.addEventListener('touchmove', tick, { passive: true, signal: sig })
      window.addEventListener(
        'keydown',
        function (e) {
          var k = e.key
          if (k === ' ' || k === 'PageDown' || k === 'PageUp' || k === 'End' || k === 'Home' || k === 'ArrowDown' || k === 'ArrowUp') {
            tick()
          }
        },
        { capture: true, signal: sig }
      )
      if (lenisInstance) {
        lenisInstance.on('scroll', tick)
      }
    }

    function wireWritingShrink(lenisInstance: Lenis | null) {
      var sec = document.getElementById('writing')
      var canvas = sec && sec.querySelector('.writing-canvas')
      if (!canvas || !sec) return
      function tick() {
        var vh = window.innerHeight || document.documentElement.clientHeight || 600
        var rect = (sec as HTMLElement).getBoundingClientRect()
        var inViewportBand = rect.top < vh && rect.bottom > 0
        if (inViewportBand) {
          canvas!.classList.remove('writing-collapsed')
        } else {
          canvas!.classList.add('writing-collapsed')
        }
      }
      tick()
      window.addEventListener('scroll', tick, { passive: true, signal: sig })
      window.addEventListener('resize', tick, { signal: sig })
      if (lenisInstance) {
        lenisInstance.on('scroll', tick)
      }
    }

    /** Footer brand rail: retract until #contact is well into view (stricter top band than #writing). */
    function wireFooterBrandShrink(lenisInstance: Lenis | null) {
      if (!document.getElementById('contact')) return
      function tick() {
        var foot = document.getElementById('contact')
        if (!foot) return
        var w = window.innerWidth || document.documentElement.clientWidth || 9999
        if (w <= 920) {
          foot.classList.remove('site-footer--brand-collapsed')
          return
        }
        var vh = window.innerHeight || document.documentElement.clientHeight || 600
        var rect = foot.getBoundingClientRect()
        // Stricter than #writing: top must pass 70% line (≈30% more scroll before rail expands).
        var inViewportBand = rect.top < vh * 0.7 && rect.bottom > 0
        if (inViewportBand) {
          foot.classList.remove('site-footer--brand-collapsed')
        } else {
          foot.classList.add('site-footer--brand-collapsed')
        }
      }
      tick()
      window.addEventListener('scroll', tick, { passive: true, signal: sig })
      window.addEventListener('resize', tick, { signal: sig })
      if (lenisInstance) {
        lenisInstance.on('scroll', tick)
      }
    }

    function updateMethodRail() {
      var method = document.getElementById('method')
      var methodCanvas = document.querySelector('#method .method-canvas') as HTMLElement | null
      if (!method || !methodCanvas) return
      /* Stacked layout: class only fights sticky chrome — skip to avoid threshold oscillation. */
      var mqMobile = window.matchMedia && window.matchMedia('(max-width: 920px)')
      if (mqMobile.matches) {
        methodCanvas.classList.remove('method-collapsed')
        return
      }
      var vh = window.innerHeight || document.documentElement.clientHeight || 600
      var top = method.getBoundingClientRect().top
      /*
        Single-threshold toggle reflows the rail (20% → 0), which moves #method in the viewport
        and flips the same predicate → scroll “trapped” / double-pin. Use separate enter/exit bands.
      */
      var collapseEnter = vh * 0.5
      var dead = Math.min(120, Math.max(56, vh * 0.14))
      var collapseExit = collapseEnter + dead
      var collapsed = methodCanvas.classList.contains('method-collapsed')
      if (!collapsed && top <= collapseEnter) {
        methodCanvas.classList.add('method-collapsed')
      } else if (collapsed && top > collapseExit) {
        methodCanvas.classList.remove('method-collapsed')
      }
    }
    function wireMethodRail(lenisInstance: Lenis | null) {
      if (!document.querySelector('#method .method-canvas')) return
      function tick() { updateMethodRail() }
      tick()
      window.addEventListener('scroll', tick, { passive: true, signal: sig })
      window.addEventListener('resize', tick, { signal: sig })
      var mqMethodStack = window.matchMedia && window.matchMedia('(max-width: 920px)')
      if (mqMethodStack) mqMethodStack.addEventListener('change', tick, { signal: sig })
      if (lenisInstance) {
        lenisInstance.on('scroll', tick)
      }
    }

    /** Mobile-only: two-column parallax on right discipline cells inside #method. */
    function wireMethodMobileMainParallax(lenisInstance: Lenis | null) {
      var sec = document.getElementById('method')
      if (!sec) return
      const method = sec as HTMLElement
      var mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')

      function tick() {
        var w = window.innerWidth || document.documentElement.clientWidth || 9999
        var rights = method.querySelectorAll('[data-method-col="right"]')
        function clearTransforms() {
          rights.forEach(function (el) {
            ;(el as HTMLElement).style.transform = ''
          })
        }
        if (w > 920) {
          clearTransforms()
          return
        }
        if (mqReduce.matches) {
          clearTransforms()
          return
        }
        var r = method.getBoundingClientRect()
        var vh = window.innerHeight || document.documentElement.clientHeight || 600
        if (r.bottom <= 0 || r.top >= vh) {
          rights.forEach(function (el) {
            ;(el as HTMLElement).style.transform = 'translateY(0px)'
          })
          return
        }
        var scrollInto = Math.max(0, Math.min(vh - r.top, r.height + vh * 0.5))
        var y = -scrollInto * 0.15
        rights.forEach(function (el) {
          ;(el as HTMLElement).style.transform = 'translateY(' + y.toFixed(2) + 'px)'
        })
      }

      tick()
      window.addEventListener('scroll', tick, { passive: true, signal: sig })
      window.addEventListener('resize', tick, { signal: sig })
      window.addEventListener('wheel', tick, { passive: true, signal: sig })
      document.addEventListener('touchmove', tick, { passive: true, signal: sig })
      if (lenisInstance) {
        lenisInstance.on('scroll', tick)
      }
    }

    function wireRevealOnScroll(lenisInstance: Lenis | null) {
      var all = document.querySelectorAll('.reveal-on-scroll')
      if (!all.length) return
      var mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mq && mq.matches) {
        all.forEach(function (el) {
          el.classList.add('is-revealed')
        })
        return
      }
      function tick() {
        scanRevealOnScroll()
      }
      window.addEventListener('scroll', tick, { passive: true, signal: sig })
      window.addEventListener('resize', tick, { signal: sig })
      window.addEventListener('wheel', tick, { passive: true, signal: sig })
      document.addEventListener('touchmove', tick, { passive: true, signal: sig })
      window.addEventListener(
        'keydown',
        function (e) {
          var k = e.key
          if (k === ' ' || k === 'PageDown' || k === 'PageUp' || k === 'End' || k === 'Home' || k === 'ArrowDown' || k === 'ArrowUp') {
            tick()
          }
        },
        { capture: true, signal: sig }
      )
      if (lenisInstance) {
        lenisInstance.on('scroll', tick)
      }
      requestAnimationFrame(function () {
        if (sig.aborted) return
        var y = window.scrollY || document.documentElement.scrollTop || 0
        if (y > 48) {
          scanRevealOnScroll()
        }
      })
    }

    var canvas = document.querySelector('.site-canvas')
    function railThresholds() {
      var h = window.innerHeight || 600
      return { collapse: Math.min(h * 0.22, 220), expand: Math.min(h * 0.14, 140) }
    }
    function updateRailFromScroll(y?: number) {
      if (!canvas) return
      /* Nav scroll-lock (body position:fixed) zeros window.scrollY — would falsely expand the site rail. */
      if (document.body.classList.contains('hdr-menu-open')) return
      var scrollY = y != null ? y : (window.scrollY || document.documentElement.scrollTop || 0)
      var t = railThresholds()
      if (scrollY >= t.collapse) {
        canvas.classList.add('rail-collapsed')
      } else if (scrollY <= t.expand) {
        canvas.classList.remove('rail-collapsed')
      }
    }
    function wireRailFromScroll(lenisInstance: Lenis | null) {
      updateRailFromScroll()
      window.addEventListener('scroll', function () { updateRailFromScroll() }, { passive: true, signal: sig })
      window.addEventListener('resize', function () { updateRailFromScroll() }, { signal: sig })
      if (lenisInstance) {
        lenisInstance.on('scroll', function (instance) {
          updateRailFromScroll(instance.scroll)
        })
      }
    }

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    var lenis: Lenis | null = null

    if (!reduceMotion) {
      lenis = new Lenis({
        duration: 1.15,
        easing: function (t: number) {
          return Math.min(1, 1.001 - Math.pow(2, -10 * t))
        },
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        autoRaf: true,
      })
      window.__omcodaLenis = lenis
    }

    /* First paint must include .rail-load-intro (see page.tsx) so the rail has a committed "from" state; effect-only add runs too late for CSS transitions. */
    if (canvas && reduceMotion) {
      canvas.classList.remove('rail-load-intro')
    }

    var railLoadIntroRafIds: number[] = []
    wireRailFromScroll(lenis)
    if (canvas && !reduceMotion) {
      var idA = requestAnimationFrame(function () {
        var idB = requestAnimationFrame(function () {
          var idC = requestAnimationFrame(function () {
            if (sig.aborted) return
            if (!canvas || !document.contains(canvas)) return
            canvas.classList.remove('rail-load-intro')
            updateRailFromScroll(scrollYUniversal(lenis))
          })
          railLoadIntroRafIds.push(idC)
        })
        railLoadIntroRafIds.push(idB)
      })
      railLoadIntroRafIds.push(idA)
    }
    wireRevealOnScroll(lenis)
    wireThesisPinSlides(lenis)
    wireThesisMobilePinUntilMethod(lenis)
    wirePracticesC3Video()
    wirePracticesLabelSwap(lenis)
    wireSiteRailVideo()
    wirePracticesNewsCarousel()
    wireMethodRail(lenis)
    wireMethodMobileMainParallax(lenis)
    wireWritingShrink(lenis)
    wireFooterBrandShrink(lenis)

    document.addEventListener(
      'click',
      function (e) {
        var t = e.target as Element | null
        if (!t) return
        var a = t.closest && (t.closest('a[href^="#"]') as HTMLAnchorElement | null)
        if (!a || !document.contains(a)) return
        var id = a.getAttribute('href')
        if (!id || id.length <= 1) return
        var target = document.querySelector(id) as HTMLElement | null
        if (!target) return
        e.preventDefault()
        var hdr = document.querySelector('.hdr')
        var off = hdr ? -((hdr as HTMLElement).offsetHeight + 8) : -16
        if (lenis) {
          lenis.scrollTo(target, { offset: off, duration: 1.25 })
        } else {
          var top = target.getBoundingClientRect().top + window.scrollY + off
          window.scrollTo({ top, behavior: 'smooth' })
        }
      },
      { capture: true, signal: sig }
    )

    return () => {
      railLoadIntroRafIds.forEach(function (id) {
        cancelAnimationFrame(id)
      })
      if (canvas) canvas.classList.remove('rail-load-intro')
      ac.abort()
      delete window.__omcodaLenis
      if (lenis) lenis.destroy()
    }
  }, [])
}
