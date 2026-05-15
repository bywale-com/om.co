/** Fired once when the home preloader wipe begins (page reveal). Drives the one-shot rail load intro. */
export const PRELOADER_WIPE_START_EVENT = 'omcoda:preloader-wipe-start'

/** Fired once when the preloader is fully dismissed (after wipe). */
export const PRELOADER_COMPLETE_EVENT = 'omcoda:preloader-complete'

let wipeStarted = false
let preloaderComplete = false

/** Call when mounting the home preloader (fresh visit / remount). */
export function resetPreloaderSession() {
  wipeStarted = false
  preloaderComplete = false
}

export function notifyPreloaderWipeStart() {
  if (wipeStarted) return
  wipeStarted = true
  window.dispatchEvent(new CustomEvent(PRELOADER_WIPE_START_EVENT))
}

export function notifyPreloaderComplete() {
  if (preloaderComplete) return
  preloaderComplete = true
  window.dispatchEvent(new CustomEvent(PRELOADER_COMPLETE_EVENT))
}

export function hasPreloaderWipeStarted() {
  return wipeStarted
}

export function isPreloaderComplete() {
  return preloaderComplete
}
