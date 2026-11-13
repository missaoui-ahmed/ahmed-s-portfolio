import { useEffect, useState } from "react";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact, navigation } from "@/data/portfolio";

const CONTACT_ID = "contact";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const ids = ["home", ...navigation.map(([, id]) => id)];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Contact has its own button on desktop, so the desktop links skip it.
  const desktopLinks = navigation.filter(([, id]) => id !== CONTACT_ID);
  const contactLabel = navigation.find(([, id]) => id === CONTACT_ID)?.[0] ?? "Contact";

  return (
    <header className="site-header fixed inset-x-0 top-0 z-40">
      <div className="page-shell flex h-16 items-center justify-between gap-6 sm:h-[74px]">
        <a
          href="#home"
          className="font-display shrink-0 text-[17px] font-semibold tracking-[-0.01em]"
        >
          Ahmed Missaoui
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
          {desktopLinks.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              className={`font-display text-[15px] transition-colors hover:text-foreground ${active === id ? "text-primary" : "text-muted-foreground"}`}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Github size={18} />
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            <Linkedin size={18} />
          </a>
          <Button variant="portfolioOutline" size="sm" className="hero-action font-display" asChild>
            <a href={`#${CONTACT_ID}`}>{contactLabel}</a>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="hero-action lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-border bg-background py-3 lg:hidden"
        >
          <div className="page-shell grid grid-cols-2 gap-x-5">
            {navigation.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="font-display border-b border-line py-3 text-[15px] text-muted-foreground hover:text-primary"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
