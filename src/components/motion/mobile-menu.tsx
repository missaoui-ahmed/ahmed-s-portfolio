import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "@tanstack/react-router";
import { ArrowUpRight, Github, Linkedin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact, navigation } from "@/data/portfolio";
import { lockScroll, unlockScroll } from "./scroll-lock";

const DESKTOP = "(min-width: 1024px)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
/** Close animation length plus a margin; the panel is hidden by then even if animationend never fires. */
const CLOSE_FAILSAFE_MS = 500;
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

type MenuState = "closed" | "open" | "closing";

/** Everything in <body> except the dialog becomes inert while the menu is open. */
function setPageInert(dialog: HTMLElement | null, inert: boolean) {
  for (const el of Array.from(document.body.children)) {
    if (el === dialog) continue;
    if (inert) el.setAttribute("inert", "");
    else el.removeAttribute("inert");
  }
}

/**
 * Mobile navigation (below lg): a full-screen dialog built from the same `navigation` data as the
 * desktop nav. Escape, the close button, a link, resizing to desktop, a route change and unmounting
 * all close it, and every one of those paths releases the scroll lock and the inert page.
 */
export function MobileMenu() {
  const router = useRouter();
  const [state, setState] = useState<MenuState>("closed");
  const [portalReady, setPortalReady] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef(true);
  const open = state === "open";

  // The dialog lives in a portal on <body>: the header's backdrop-filter would otherwise trap a
  // fixed overlay inside the header box. Server HTML only has the toggle button.
  useEffect(() => setPortalReady(true), []);

  const close = useCallback((options: { focusButton?: boolean; instant?: boolean } = {}) => {
    returnFocus.current = options.focusButton ?? true;
    unlockScroll();
    const instant = options.instant || window.matchMedia(REDUCED_MOTION).matches;
    setState((current) => (current === "closed" ? current : instant ? "closed" : "closing"));
  }, []);

  const openMenu = () => {
    lockScroll();
    setState("open");
  };

  // While open: page inert, focus inside, Escape and Tab handled. Cleanup always undoes it all.
  useEffect(() => {
    if (state !== "open") return;
    const dialog = dialogRef.current;
    const toggle = toggleRef.current;
    setPageInert(dialog, true);
    const focusables = () => Array.from(dialog?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    focusables()[0]?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !dialog?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !dialog?.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      setPageInert(dialog, false);
      if (returnFocus.current) toggle?.focus({ preventScroll: true });
    };
  }, [state, close]);

  // Closing animation, with a failsafe in case animationend never arrives.
  useEffect(() => {
    if (state !== "closing") return;
    const timer = window.setTimeout(() => setState("closed"), CLOSE_FAILSAFE_MS);
    return () => window.clearTimeout(timer);
  }, [state]);

  // Desktop width, route changes and unmount close it and release the lock.
  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP);
    const onDesktop = () => {
      if (desktop.matches) close({ focusButton: false, instant: true });
    };
    const offNavigate = router.subscribe("onBeforeNavigate", (event) => {
      if (event.pathChanged) close({ focusButton: false, instant: true });
    });
    desktop.addEventListener("change", onDesktop);
    return () => {
      desktop.removeEventListener("change", onDesktop);
      offNavigate();
      unlockScroll();
      // Unmount: clear inert from every <body> child, whatever state the menu was in.
      setPageInert(null, false);
    };
  }, [router, close]);

  // A link closes the menu first (releasing the lock synchronously), then SmoothScroll's
  // document-level handler scrolls to the section with Lenis.
  const onLink = () => close();

  const dialog = (
    <div
      id="mobile-menu"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="mobile-menu lg:hidden"
      data-state={state}
      hidden={state === "closed"}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && state === "closing") setState("closed");
      }}
    >
      <div className="page-shell flex h-16 shrink-0 items-center justify-between gap-4 sm:h-[74px]">
        <a
          href="#home"
          onClick={onLink}
          className="inline-flex shrink-0 items-center gap-2 font-mono text-lg font-semibold"
          aria-label="Ahmed Missaoui home"
        >
          <span className="text-primary">&lt;/&gt;</span>
          <span>
            Ahmed<span className="text-primary">.</span>
          </span>
        </a>
        <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => close()}>
          <X />
        </Button>
      </div>
      <nav aria-label="Mobile navigation" className="page-shell mobile-menu-links">
        {navigation.map(([label, id], i) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={onLink}
            className="mobile-menu-link"
            style={{ "--i": i } as CSSProperties}
          >
            {label}
          </a>
        ))}
      </nav>
      <div className="page-shell mobile-menu-foot">
        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          <Github size={20} />
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-muted-foreground transition-colors hover:text-primary"
        >
          <Linkedin size={20} />
        </a>
        <Button variant="portfolioOutline" size="sm" className="ml-auto" asChild>
          <a href="#contact" onClick={onLink}>
            Let’s talk <ArrowUpRight />
          </a>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Button
        ref={toggleRef}
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => (open ? close() : openMenu())}
      >
        {open ? <X /> : <Menu />}
      </Button>
      {portalReady && createPortal(dialog, document.body)}
    </>
  );
}
