import { useLayoutEffect, useState } from "react";

/** How long after page start the loader can matter: CSS hides it at 1.82s (failsafe 2.4s). */
const INTRO_WINDOW_MS = 3600;

// Module scope: survives client-side route changes, resets on every full page load.
let introShown = false;

/**
 * Intro panel, server-rendered but display:none unless the inline head script added html.intro.
 * Everything it does (counter, line, exit, hiding) is CSS with its own timers, so it disappears
 * even if JavaScript never runs; this component only removes it, and the class, afterwards.
 * Copy is the site's existing name and role line; the panel is aria-hidden because the page
 * underneath stays readable.
 */
export function IntroLoader() {
  const [present, setPresent] = useState(true);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const mountedAt = performance.now();
    const finish = () => {
      root.classList.remove("intro");
      setPresent(false);
    };
    const remaining = INTRO_WINDOW_MS - mountedAt;
    // Not requested, already shown on this page load, or mounted too late to matter.
    if (!root.classList.contains("intro") || introShown || remaining <= 0) {
      finish();
      return;
    }
    const timer = window.setTimeout(finish, remaining);
    return () => {
      window.clearTimeout(timer);
      // StrictMode's immediate dev remount must not count as "shown".
      if (performance.now() - mountedAt > 200) introShown = true;
    };
  }, []);

  if (!present) return null;
  return (
    <div className="intro-loader" aria-hidden="true">
      <div className="page-shell intro-inner">
        <div className="intro-text">
          <p className="intro-name">Ahmed Missaoui</p>
          <p className="intro-role mono-label">Software Engineer — Full-Stack &amp; AI Systems</p>
        </div>
        <p className="intro-count font-mono">
          <span className="intro-count-real">100</span>
          <span className="intro-count-anim" />
        </p>
      </div>
      <div className="intro-line">
        <span className="intro-line-fill" />
      </div>
    </div>
  );
}
