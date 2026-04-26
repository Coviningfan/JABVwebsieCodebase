import { ArrowRight } from "lucide-react";

import { company, type ServicePageContent } from "@/content/marketing";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { SectionReveal } from "@/components/marketing/section-reveal";

type ServicePageLayoutProps = {
  service: ServicePageContent;
};

function navigateFromFooter(href: string) {
  if (href.startsWith("#")) {
    window.location.assign(`/${href}`);
    return;
  }

  window.location.assign(href);
}

export function ServicePageLayout({ service }: ServicePageLayoutProps) {
  return (
    <div className="page-shell">
      <SiteHeader />

      <main>
        <section className="border-b border-white/10">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.2fr,0.8fr] lg:py-24">
            <SectionReveal>
              <div className="max-w-3xl">
                <p className="editorial-eyebrow">{service.eyebrow}</p>
                <h1 className="display-title mt-6 max-w-3xl">{service.title}</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--muted-foreground)]">
                  {service.summary}
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delayMs={120}>
              <div className="editorial-card flex h-full flex-col justify-between p-7 sm:p-8">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
                    Best fit
                  </p>
                  <ul className="mt-5 space-y-4">
                    {service.bestFit.map((item) => (
                      <li key={item} className="flex gap-3 text-base leading-7 text-[color:var(--foreground)]">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[color:var(--accent-strong)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 border-t border-white/10 pt-5 text-sm leading-7 text-[color:var(--muted-foreground)]">
                  Based in {company.location}. Built for teams that need more precision than a generic agency process.
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr,0.9fr]">
          <SectionReveal>
            <div className="max-w-3xl">
              <p className="editorial-eyebrow">What this work usually requires</p>
              <p className="mt-4 text-2xl font-semibold leading-10 text-[color:var(--foreground)]">{service.lead}</p>
            </div>
          </SectionReveal>

          <SectionReveal delayMs={100}>
            <div className="editorial-card p-7 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
                Common pressure points
              </p>
              <ul className="mt-5 space-y-4">
                {service.problems.map((problem) => (
                  <li key={problem} className="flex gap-3 text-base leading-7 text-[color:var(--foreground)]">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[color:var(--accent)]" />
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>
        </section>

        <section className="border-y border-white/10 bg-[rgba(10,8,8,0.7)]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <SectionReveal>
              <div className="max-w-2xl">
                <p className="editorial-eyebrow">Approach</p>
                <h2 className="mt-4 text-3xl font-semibold text-[color:var(--foreground)]">
                  The work is structured to remove noise before it adds polish.
                </h2>
              </div>
            </SectionReveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {service.approach.map((item, index) => (
                <SectionReveal key={item.title} delayMs={index * 90}>
                  <article className="editorial-card h-full p-7">
                    <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--accent-strong)]">
                      0{index + 1}
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold text-[color:var(--foreground)]">{item.title}</h3>
                    <p className="mt-4 text-base leading-7 text-[color:var(--muted-foreground)]">{item.body}</p>
                  </article>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr,1.1fr]">
          <SectionReveal>
            <div className="editorial-card p-7 sm:p-8">
              <p className="editorial-eyebrow">Deliverables</p>
              <ul className="mt-5 space-y-4">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-7 text-[color:var(--foreground)]">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[color:var(--accent-strong)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          <SectionReveal delayMs={100}>
            <div className="editorial-card p-7 sm:p-8">
              <p className="editorial-eyebrow">Expected outcomes</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                {service.outcomes.map((item) => (
                  <div key={item} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                    <p className="text-base leading-7 text-[color:var(--foreground)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionReveal>
        </section>

        <section className="border-t border-white/10 bg-[rgba(10,8,8,0.86)]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <SectionReveal>
              <div className="editorial-card flex flex-col gap-8 p-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="editorial-eyebrow">Ready when you are</p>
                  <h2 className="mt-4 text-3xl font-semibold text-[color:var(--foreground)]">{service.closingTitle}</h2>
                  <p className="mt-4 text-base leading-7 text-[color:var(--muted-foreground)]">{service.closingBody}</p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a href="/contact" className="button-primary inline-flex items-center gap-2">
                    Start the conversation
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href={company.phoneHref} className="button-secondary inline-flex items-center gap-2">
                    Call {company.phone}
                  </a>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>
      </main>

      <SiteFooter onNavigate={navigateFromFooter} />
    </div>
  );
}
