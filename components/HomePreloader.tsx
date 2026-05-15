'use client'

import {
  notifyPreloaderComplete,
  notifyPreloaderWipeStart,
  resetPreloaderSession,
} from '@/lib/preloaderEvents'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './home-preloader.css'

const PRELOADER_VIDEO = '/assets/home-preloader.mp4'
const WIPE_MS = 1000
const REVEAL_BEFORE_END_S = 1

function lockDocumentForPreloader() {
  document.documentElement.classList.add('home-preloader-active')
  document.body.style.overflow = 'hidden'
}

function unlockDocumentForPreloader() {
  document.documentElement.classList.remove('home-preloader-active')
  document.body.style.overflow = ''
}

export default function HomePreloader() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wipeStartedRef = useRef(false)
  const completeRef = useRef(false)
  const [wiping, setWiping] = useState(false)
  const [hidden, setHidden] = useState(false)

  const finish = useCallback(() => {
    if (completeRef.current) return
    completeRef.current = true
    setHidden(true)
    unlockDocumentForPreloader()
    /* Rail reveal runs after unlock so rail-load-intro (not the CSS lock) drives the open animation. */
    requestAnimationFrame(() => notifyPreloaderComplete())
  }, [])

  const startWipe = useCallback(() => {
    if (wipeStartedRef.current) return
    wipeStartedRef.current = true
    notifyPreloaderWipeStart()
    setWiping(true)
  }, [])

  /* Lock scroll + start fetch before paint (avoids waiting for useEffect). */
  useLayoutEffect(() => {
    resetPreloaderSession()
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      notifyPreloaderWipeStart()
      finish()
      return
    }

    lockDocumentForPreloader()

    if (!document.querySelector('link[data-home-preloader]')) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = PRELOADER_VIDEO
      link.as = 'fetch'
      link.type = 'video/mp4'
      link.crossOrigin = 'anonymous'
      link.setAttribute('data-home-preloader', '')
      document.head.appendChild(link)
    }
  }, [finish])

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const video = videoRef.current
    if (!video) {
      finish()
      return
    }

    const onTimeUpdate = () => {
      if (wipeStartedRef.current || !video.duration || !Number.isFinite(video.duration)) return
      if (video.currentTime >= video.duration - REVEAL_BEFORE_END_S) startWipe()
    }

    const onEnded = () => {
      if (!wipeStartedRef.current) startWipe()
    }

    const onError = () => finish()

    const tryPlay = () => {
      const p = video.play()
      if (p?.catch) p.catch(() => finish())
    }

    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended', onEnded)
    video.addEventListener('error', onError)
    video.addEventListener('canplay', tryPlay, { once: true })

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      tryPlay()
    } else {
      video.load()
    }

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('error', onError)
      if (completeRef.current) {
        unlockDocumentForPreloader()
      }
    }
  }, [finish, startWipe])

  const onPanelTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.propertyName !== 'transform' || !wiping) return
    finish()
  }

  useEffect(() => {
    if (!wiping) return
    const t = window.setTimeout(finish, WIPE_MS + 80)
    return () => window.clearTimeout(t)
  }, [wiping, finish])

  if (hidden) return null

  return (
    <div
      className={['home-preloader', wiping ? 'home-preloader--wipe' : ''].filter(Boolean).join(' ')}
      aria-hidden={wiping}
      aria-label="Loading"
      role="presentation"
    >
      <div
        className="home-preloader__panel"
        onTransitionEnd={onPanelTransitionEnd}
        style={{ transitionDuration: `${WIPE_MS}ms` }}
      >
        <video
          ref={videoRef}
          className="home-preloader__video"
          src={PRELOADER_VIDEO}
          autoPlay
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
        />
      </div>
    </div>
  )
}