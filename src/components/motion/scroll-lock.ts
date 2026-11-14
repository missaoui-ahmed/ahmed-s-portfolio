import type Lenis from "lenis";

/*
 * The active Lenis instance (set by SmoothScroll) and a page scroll lock for overlays.
 * With Lenis running, the lock is lenis.stop()/start(); otherwise it is a native overflow lock.
 * unlockScroll() always restores both, so it is safe to call on every exit path.
 */

let lenis: Lenis | null = null;
let locked = false;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

export function lockScroll() {
  if (locked) return;
  locked = true;
  if (lenis) lenis.stop();
  else document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  if (!locked) return;
  locked = false;
  lenis?.start();
  document.documentElement.style.overflow = "";
}
