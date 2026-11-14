import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import Lenis from "lenis";
import { setLenis, unlockScroll } from "./scroll-lock";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** Absolute scroll position that puts the target's top exactly at the fixed header's real height. */
function anchorTop(target: HTMLElement) {
  const header =
    document.querySelector<HTMLElement>(".site-header")?.getBoundingClientRect().height ?? 0;
  return target.getBoundingClientRect().top + window.scrollY - header;
}

/**
 * Lenis smooth scrolling for the whole site, only while motion is allowed (html.motion set by the
 * inline script, and no reduced-motion preference). In-page anchor links scroll with Lenis through
 * the router, so the URL hash and Back still work. Renders nothing.
 */
export function SmoothScroll() {
  const router = useRouter();

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia(REDUCED_MOTION);
    let lenis: Lenis | null = null;

    const create = () => {
      if (lenis || media.matches || !root.classList.contains("motion")) return;
      lenis = new Lenis({
        autoRaf: true,
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
      });
      setLenis(lenis);
    };
    const destroy = () => {
      // Release any overlay lock first so the page is never left unscrollable.
      unlockScroll();
      setLenis(null);
      lenis?.destroy();
      lenis = null;
    };

    const onClick = (event: MouseEvent) => {
      if (!lenis || event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank") return;
      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      const instance = lenis;
      // The router records the hash (shareable URL, Back works) without jumping; Lenis scrolls.
      void router
        .navigate({
          to: ".",
          hash: url.hash.slice(1),
          hashScrollIntoView: false,
          resetScroll: false,
        })
        .finally(() => {
          // Resync with the real position first: if the page was moved natively in the same frame
          // (e.g. focus or scrollIntoView), Lenis has not seen that scroll event yet.
          if (!instance.isScrolling) {
            instance.stop();
            instance.start();
          }
          instance.scrollTo(anchorTop(target), { duration: 1.2 });
        });
    };

    // Route changes: stop any smooth scroll in flight, let the router place the page (top for a new
    // page, the saved position on Back), then let Lenis continue from wherever that is.
    const offBefore = router.subscribe("onBeforeNavigate", (event) => {
      if (event.pathChanged) lenis?.stop();
    });
    const offRendered = router.subscribe("onRendered", () => {
      requestAnimationFrame(() => {
        lenis?.resize();
        lenis?.start();
      });
    });
    const onMediaChange = () => (media.matches ? destroy() : create());

    create();
    // Opened on a #hash: the browser already jumped there (instantly, see `hash-load`). Place it
    // exactly like an anchor click, below the header, then restore native smooth scrolling.
    if (root.classList.contains("hash-load")) {
      requestAnimationFrame(() => {
        const target = location.hash
          ? document.getElementById(decodeURIComponent(location.hash.slice(1)))
          : null;
        if (target && lenis) lenis.scrollTo(anchorTop(target), { immediate: true, force: true });
        root.classList.remove("hash-load");
      });
    }
    document.addEventListener("click", onClick);
    media.addEventListener("change", onMediaChange);
    return () => {
      document.removeEventListener("click", onClick);
      media.removeEventListener("change", onMediaChange);
      offBefore();
      offRendered();
      destroy();
    };
  }, [router]);

  return null;
}
