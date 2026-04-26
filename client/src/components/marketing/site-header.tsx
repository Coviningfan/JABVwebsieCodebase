import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { useLocation } from "wouter";

import { company, navigationItems } from "@/content/marketing";
import { cn } from "@/lib/utils";

function scrollToSection(sectionId: string) {
  const target = document.getElementById(sectionId);
  if (!target) {
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY - 88;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.scrollTo({
    top,
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });
}

export function SiteHeader() {
  const [location, setLocation] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location !== "/") {
      return;
    }

    if (!window.location.hash) {
      return;
    }

    const timer = window.setTimeout(() => {
      scrollToSection(window.location.hash.replace("#", ""));
    }, 60);

    return () => window.clearTimeout(timer);
  }, [location]);

  const handleNavigate = (href: string) => {
    setIsMenuOpen(false);

    if (!href.startsWith("#")) {
      setLocation(href);
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const sectionId = href.replace("#", "");
    const updateHash = () => window.history.replaceState({}, "", `/#${sectionId}`);

    if (location !== "/") {
      setLocation("/");
      window.setTimeout(() => {
        updateHash();
        scrollToSection(sectionId);
      }, 80);
      return;
    }

    updateHash();
    scrollToSection(sectionId);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        isScrolled ? "nav-shell border-white/10 bg-[rgba(18,16,16,0.88)]" : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <button
          type="button"
          onClick={() => handleNavigate("#home")}
          className="flex items-center gap-3 text-left"
          aria-label="Go to home"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border-strong)] bg-[rgba(173,58,59,0.14)] text-sm font-extrabold uppercase tracking-[0.28em] text-[color:var(--accent-strong)]">
            J
          </div>
          <div>
            <span className="block text-sm uppercase tracking-[0.32em] text-[color:var(--muted-foreground)]">
              JABV Labs
            </span>
            <span className="block text-sm text-[color:var(--foreground)]">
              Custom apps, websites, and redesigns
            </span>
          </div>
        </button>

        <nav className="hidden items-center gap-7 lg:flex">
          {navigationItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavigate(item.href)}
              className="text-sm font-semibold tracking-[0.08em] text-[color:var(--muted-foreground)] transition hover:text-[color:var(--foreground)]"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={company.phoneHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--muted-foreground)] transition hover:text-[color:var(--foreground)]"
          >
            <Phone className="h-4 w-4" />
            {company.phone}
          </a>
          <button type="button" onClick={() => handleNavigate("/contact")} className="button-primary">
            Start a project
          </button>
        </div>

        <button
          type="button"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] text-[color:var(--foreground)] lg:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-white/10 bg-[rgba(18,16,16,0.97)] px-5 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4">
            {navigationItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavigate(item.href)}
                className="text-left text-base font-semibold text-[color:var(--foreground)]"
              >
                {item.label}
              </button>
            ))}

            <a href={company.phoneHref} className="text-sm text-[color:var(--muted-foreground)]">
              {company.phone}
            </a>

            <button type="button" onClick={() => handleNavigate("/contact")} className="button-primary w-full">
              Start a project
            </button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
