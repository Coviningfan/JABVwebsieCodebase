import { ArrowRight } from "lucide-react";

import { SectionReveal } from "@/components/marketing/section-reveal";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

function handleFooterNavigate(href: string) {
  if (href.startsWith("#")) {
    window.location.assign(`/${href}`);
    return;
  }

  window.location.assign(href);
}

export default function NotFound() {
  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="mx-auto flex min-h-[70vh] w-full max-w-7xl items-center px-5 py-16 sm:px-8">
        <SectionReveal>
          <div className="editorial-card max-w-3xl p-8 sm:p-10">
            <p className="editorial-eyebrow">Page not found</p>
            <h1 className="mt-6 text-4xl font-semibold text-[color:var(--foreground)]">
              The page you requested is not part of the current public site.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted-foreground)]">
              Head back to the main site or go straight to the contact page if you were trying to start a project.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a href="/" className="button-primary inline-flex items-center gap-2">
                Return home
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="/contact" className="button-secondary">
                Go to contact
              </a>
            </div>
          </div>
        </SectionReveal>
      </main>

      <SiteFooter onNavigate={handleFooterNavigate} />
    </div>
  );
}
