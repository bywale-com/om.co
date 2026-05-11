'use client'
import { useEffect } from 'react'

export default function useScrollEffects() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    function syncHdrH() {
      var hdr = document.querySelector('.hdr')
      if (hdr) {
        document.documentElement.style.setProperty('--hdr-h', (hdr as HTMLElement).offsetHeight + 'px')
      }
    }
    syncHdrH()
    window.addEventListener('resize', syncHdrH)
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(syncHdrH)

    /* Reveal only while scrolling — no eager scan on load (that felt "not scroll-triggered"). */
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
    function scrollYUniversal(lenisInstance: any) {
      if (lenisInstance != null && typeof lenisInstance.scroll === 'number') return lenisInstance.scroll
      if (lenisInstance != null && typeof lenisInstance.animatedScroll === 'number') return lenisInstance.animatedScroll
      return window.scrollY || document.documentElement.scrollTop || 0
    }
    function playPracticesC3Video(secEl: Element) {
      secEl.querySelectorAll('.practices-c3-media__video').forEach(function (vid) {
        var r = (vid as HTMLVideoElement).play()
        if (r && typeof r.catch === 'function') r.catch(function () {})
      })
    }
    function updatePracticesLabelSwap(lenisInstance: any) {
      var sec = document.getElementById('practices')
      var track = document.querySelector('.practices-label-swap__track') as HTMLElement | null
      if (!sec || !track) return
      var inner = sec.querySelector('.practices-pin-inner')
      var mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mq && mq.matches) {
        track.style.setProperty('--practices-swap', '1')
        if (inner) inner.setAttribute('data-active-index', '5')
        sec.classList.add('practices-insurance-unveil')
        playPracticesC3Video(sec)
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
        playPracticesC3Video(sec)
      }
    }
    function wirePracticesLabelSwap(lenisInstance: any) {
      var track = document.querySelector('.practices-label-swap__track')
      if (!track) return
      function tick() {
        updatePracticesLabelSwap(lenisInstance)
      }
      tick()
      window.addEventListener('scroll', tick, { passive: true })
      window.addEventListener('resize', tick)
      window.addEventListener('wheel', tick, { passive: true })
      document.addEventListener('touchmove', tick, { passive: true })
      window.addEventListener(
        'keydown',
        function (e) {
          var k = e.key
          if (k === ' ' || k === 'PageDown' || k === 'PageUp' || k === 'End' || k === 'Home' || k === 'ArrowDown' || k === 'ArrowUp') {
            tick()
          }
        },
        true
      )
      if (lenisInstance && typeof lenisInstance.on === 'function') {
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
        if (prev) prev.addEventListener('click', function () { slideBy(-1) })
        if (next) next.addEventListener('click', function () { slideBy(1) })
      })
    }

    /* Practices C3: keep paused until Insurance unveils (see updatePracticesLabelSwap). */
    function wirePracticesC3Video() {
      var sec = document.getElementById('practices')
      if (!sec) return
      sec.querySelectorAll('.practices-c3-media__video').forEach(function (video) {
        var vid = video as HTMLVideoElement
        vid.pause()
        vid.addEventListener(
          'loadeddata',
          function () {
            if (!sec!.classList.contains('practices-insurance-unveil')) {
              vid.pause()
            }
          },
          { once: true }
        )
      })
    }

    function wireWritingShrink(lenisInstance: any) {
      var sec = document.getElementById('writing')
      var canvas = sec && sec.querySelector('.writing-canvas')
      if (!canvas || !sec) return
      /** Rail starts retracted; expands when #writing intersects the viewport (scroll reveals). */
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
      window.addEventListener('scroll', tick, { passive: true })
      window.addEventListener('resize', tick)
      if (lenisInstance && typeof lenisInstance.on === 'function') {
        lenisInstance.on('scroll', tick)
      }
    }

    function updateMethodRail() {
      var method = document.getElementById('method')
      var methodCanvas = document.querySelector('#method .method-canvas')
      if (!method || !methodCanvas) return
      var vh = window.innerHeight || document.documentElement.clientHeight || 600
      if (method.getBoundingClientRect().top <= vh * 0.5) {
        methodCanvas.classList.add('method-collapsed')
      } else {
        methodCanvas.classList.remove('method-collapsed')
      }
    }
    function wireMethodRail(lenisInstance: any) {
      if (!document.querySelector('#method .method-canvas')) return
      function tick() { updateMethodRail() }
      tick()
      window.addEventListener('scroll', tick, { passive: true })
      window.addEventListener('resize', tick)
      if (lenisInstance && typeof lenisInstance.on === 'function') {
        lenisInstance.on('scroll', tick)
      }
    }

    function wireRevealOnScroll(lenisInstance: any) {
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
      window.addEventListener('scroll', tick, { passive: true })
      window.addEventListener('resize', tick)
      window.addEventListener('wheel', tick, { passive: true })
      document.addEventListener('touchmove', tick, { passive: true })
      window.addEventListener(
        'keydown',
        function (e) {
          var k = e.key
          if (k === ' ' || k === 'PageDown' || k === 'PageUp' || k === 'End' || k === 'Home' || k === 'ArrowDown' || k === 'ArrowUp') {
            tick()
          }
        },
        true
      )
      if (lenisInstance && typeof lenisInstance.on === 'function') {
        lenisInstance.on('scroll', tick)
      }
      /* Mid-page refresh / hash restore: reveal anything already in view without waiting for input */
      requestAnimationFrame(function () {
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
      var scrollY = y != null ? y : (window.scrollY || document.documentElement.scrollTop || 0)
      var t = railThresholds()
      if (scrollY >= t.collapse) {
        canvas.classList.add('rail-collapsed')
      } else if (scrollY <= t.expand) {
        canvas.classList.remove('rail-collapsed')
      }
    }
    function wireRailFromScroll(lenisInstance: any) {
      updateRailFromScroll()
      window.addEventListener('scroll', function () { updateRailFromScroll() }, { passive: true })
      window.addEventListener('resize', function () { updateRailFromScroll() })
      if (lenisInstance && typeof lenisInstance.on === 'function') {
        lenisInstance.on('scroll', function (e: any) { updateRailFromScroll(e.scroll) })
      }
    }

    if (typeof (window as any).Lenis === 'undefined') {
      wireRailFromScroll(null)
      wireRevealOnScroll(null)
      wirePracticesLabelSwap(null)
      wirePracticesC3Video()
      wirePracticesNewsCarousel()
      wireMethodRail(null)
      wireWritingShrink(null)
      return
    }

    var LenisClass = (window as any).Lenis
    var lenis = new LenisClass({ duration: 1.15, easing: function (t: number) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)) }, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.4 })
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)

    function scrollYNow(inst: any) {
      if (inst != null && typeof inst.scroll === 'number') return inst.scroll
      if (inst != null && typeof inst.animatedScroll === 'number') return inst.animatedScroll
      return window.scrollY || document.documentElement.scrollTop || 0
    }
    wireRailFromScroll(lenis)

    wireRevealOnScroll(lenis)
    wirePracticesLabelSwap(lenis)
    wirePracticesC3Video()
    wirePracticesNewsCarousel()
    wireMethodRail(lenis)
    wireWritingShrink(lenis)

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href')
        if (id && id.length > 1) {
          var target = document.querySelector(id)
          if (target) {
            e.preventDefault()
            var hdr = document.querySelector('.hdr')
            var off = hdr ? -((hdr as HTMLElement).offsetHeight + 8) : -16
            lenis.scrollTo(target, { offset: off, duration: 1.25 })
          }
        }
      })
    })

    return () => {
      window.removeEventListener('resize', syncHdrH)
    }
  }, [])
}
