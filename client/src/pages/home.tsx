import { ArrowRight, Mail, Phone } from "lucide-react";

import { approvedCaseStudies } from "@/content/case-studies";
import { company, homePage, servicePreviews } from "@/content/marketing";
import { SectionReveal } from "@/components/marketing/section-reveal";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

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

function handleSectionNavigation(href: string) {
  if (!href.startsWith("#")) {
    window.location.assign(href);
    return;
  }

  const sectionId = href.replace("#", "");
  window.history.replaceState({}, "", `/#${sectionId}`);
  scrollToSection(sectionId);
}

export default function Home() {
  const publishedCaseStudies = approvedCaseStudies.slice(0, 3);

  return (
    <div className="page-shell">
      <SiteHeader />

      <main>
        <section id="home" className="border-b border-white/10">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr,0.85fr] lg:py-24">
            <SectionReveal>
              <div className="max-w-4xl">
                <p className="editorial-eyebrow">{homePage.hero.eyebrow}</p>
                <h1 className="display-title mt-6">{homePage.hero.title}</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--muted-foreground)]">
                  {homePage.hero.summary}
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a href={homePage.hero.primaryCta.href} className="button-primary inline-flex items-center gap-2">
                    {homePage.hero.primaryCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    className="button-secondary"
                    onClick={() => handleSectionNavigation(homePage.hero.secondaryCta.href)}
                  >
                    {homePage.hero.secondaryCta.label}
                  </button>
                </div>
              </div>
            </SectionReveal>

            <SectionReveal delayMs={120}>
              <div className="editorial-card flex h-full flex-col justify-between p-7 sm:p-8">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--muted-foreground)]">
                    What clients come to us for
                  </p>
                  <ul className="mt-6 space-y-4">
                    {homePage.hero.sideNotes.map((item) => (
                      <li key={item} className="flex gap-3 text-base leading-7 text-[color:var(--foreground)]">
                        <span className="mt-2 h-2 w-2 rounded-full bg-[color:var(--accent-strong)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 border-t border-white/10 pt-6">
                  <div className="grid gap-4">
                    <a
                      href={company.phoneHref}
                      className="inline-flex items-center gap-3 text-base text-[color:var(--foreground)] transition hover:text-[color:var(--accent-strong)]"
                    >
                      <Phone className="h-4 w-4" />
                      {company.phone}
                    </a>
                    <a
                      href={company.emailHref}
                      className="inline-flex items-center gap-3 text-base text-[color:var(--foreground)] transition hover:text-[color:var(--accent-strong)]"
                    >
                      <Mail className="h-4 w-4" />
                      {company.email}
                    </a>
                    <p className="text-sm leading-7 text-[color:var(--muted-foreground)]">
                      {company.location}. {company.responseWindow}.
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>

        <section className="border-b border-white/10 bg-[rgba(10,8,8,0.66)]">
          <div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
            {homePage.proofStrip.map((item, index) => (
              <SectionReveal key={item.label} delayMs={index * 80}>
                <div className="rounded-[26px] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
                    {item.label}
                  </p>
                  <p className="mt-3 text-base leading-7 text-[color:var(--foreground)]">{item.value}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <SectionReveal>
            <div className="max-w-3xl">
              <p className="editorial-eyebrow">Services</p>
              <h2 className="mt-4 text-3xl font-semibold text-[color:var(--foreground)]">
                Focused offers for teams that need stronger digital product work.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted-foreground)]">
                The public site is structured around three engagements we can scope clearly and deliver with practical
                momentum.
              </p>
            </div>
          </SectionReveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {servicePreviews.map((service, index) => (
              <SectionReveal key={service.slug} delayMs={index * 90}>
                <article className="editorial-card flex h-full flex-col p-7">
                  <p className="editorial-eyebrow">{service.label}</p>
                  <h3 className="mt-4 text-2xl font-semibold text-[color:var(--foreground)]">{service.headline}</h3>
                  <p className="mt-4 text-base leading-7 text-[color:var(--muted-foreground)]">{service.summary}</p>

                  <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
                    <div>
                      <p className="text-sm font-semibold text-[color:var(--foreground)]">Best fit</p>
                      <p className="mt-2 text-sm leading-7 text-[color:var(--muted-foreground)]">{service.fit}</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[color:var(--foreground)]">Expected outcome</p>
                      <p className="mt-2 text-sm leading-7 text-[color:var(--muted-foreground)]">{service.outcome}</p>
                    </div>
                  </div>

                  <a
                    href={service.href}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--foreground)]"
                  >
                    View service
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </article>
              </SectionReveal>
            ))}
          </div>
        </section>

        <section id="process" className="border-y border-white/10 bg-[rgba(10,8,8,0.72)]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
            <SectionReveal>
              <div className="max-w-3xl">
                <p className="editorial-eyebrow">Process</p>
                <h2 className="mt-4 text-3xl font-semibold text-[color:var(--foreground)]">
                  We keep the work grounded in decisions that improve the product, not just the presentation.
                </h2>
              </div>
            </SectionReveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-4">
              {homePage.process.map((item, index) => (
                <SectionReveal key={item.step} delayMs={index * 90}>
                  <article className="editorial-card h-full p-6">
                    <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--accent-strong)]">{item.step}</p>
                    <h3 className="mt-4 text-2xl font-semibold text-[color:var(--foreground)]">{item.title}</h3>
                    <p className="mt-4 text-base leading-7 text-[color:var(--muted-foreground)]">{item.body}</p>
                  </article>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="proof" className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <SectionReveal>
            <div className="max-w-3xl">
              <p className="editorial-eyebrow">Proof</p>
              <h2 className="mt-4 text-3xl font-semibold text-[color:var(--foreground)]">
                Proof should be real. Until case studies are approved, we keep this section honest.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted-foreground)]">
                The frontend is already prepared for future case-study publication, but public proof stays gated until
                the source material is approved.
              </p>
            </div>
          </SectionReveal>

          {publishedCaseStudies.length > 0 ? (
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {publishedCaseStudies.map((study, index) => (
                <SectionReveal key={study.slug} delayMs={index * 90}>
                  <article className="editorial-card h-full p-7">
                    <p className="editorial-eyebrow">{study.sector}</p>
                    <h3 className="mt-4 text-2xl font-semibold text-[color:var(--foreground)]">{study.title}</h3>
                    <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                      Problem
                    </p>
                    <p className="mt-2 text-base leading-7 text-[color:var(--muted-foreground)]">{study.problem}</p>
                    <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
                      Outcome
                    </p>
                    <p className="mt-2 text-base leading-7 text-[color:var(--foreground)]">{study.outcomes[0]}</p>
                  </article>
                </SectionReveal>
              ))}
            </div>
          ) : (
            <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr,0.95fr]">
              <div className="grid gap-6">
                {homePage.capabilitySignals.map((item, index) => (
                  <SectionReveal key={item.title} delayMs={index * 90}>
                    <article className="editorial-card p-7">
                      <h3 className="text-2xl font-semibold text-[color:var(--foreground)]">{item.title}</h3>
                      <p className="mt-4 text-base leading-7 text-[color:var(--muted-foreground)]">{item.body}</p>
                    </article>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delayMs={120}>
                <aside className="editorial-card flex h-full flex-col justify-between p-7 sm:p-8">
                  <div>
                    <p className="editorial-eyebrow">Case-study scaffold in place</p>
                    <h3 className="mt-4 text-2xl font-semibold text-[color:var(--foreground)]">
                      Published examples will appear here once client-safe material is cleared.
                    </h3>
                    <p className="mt-4 text-base leading-7 text-[color:var(--muted-foreground)]">
                      The content model already supports title, sector, problem, solution, deliverables, outcomes,
                      image, and approval state. Until then, the site stays focused on what we can defend publicly.
                    </p>
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-5 text-sm leading-7 text-[color:var(--muted-foreground)]">
                    No fabricated clients. No invented metrics. No filler logos.
                  </div>
                </aside>
              </SectionReveal>
            </div>
          )}
        </section>

        <section id="about" className="border-y border-white/10 bg-[rgba(10,8,8,0.78)]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.02fr,0.98fr]">
            <SectionReveal>
              <div className="max-w-3xl">
                <p className="editorial-eyebrow">About JABV Labs</p>
                <h2 className="mt-4 text-3xl font-semibold text-[color:var(--foreground)]">
                  A small studio perspective with product-minded execution.
                </h2>
                <p className="mt-4 text-base leading-7 text-[color:var(--muted-foreground)]">
                  JABV Labs builds public-facing digital experiences for businesses that need a cleaner story, better UX,
                  and a frontend that feels maintained rather than improvised.
                </p>
                <p className="mt-4 text-base leading-7 text-[color:var(--muted-foreground)]">
                  The goal is not to make the site look busy. The goal is to make it feel intentional enough that the
                  business behind it becomes easier to trust.
                </p>
              </div>
            </SectionReveal>

            <div className="grid gap-6">
              {homePage.values.map((item, index) => (
                <SectionReveal key={item.title} delayMs={index * 80}>
                  <article className="editorial-card p-7">
                    <h3 className="text-2xl font-semibold text-[color:var(--foreground)]">{item.title}</h3>
                    <p className="mt-4 text-base leading-7 text-[color:var(--muted-foreground)]">{item.body}</p>
                  </article>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <SectionReveal>
            <div className="editorial-card flex flex-col gap-8 p-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="editorial-eyebrow">Closing CTA</p>
                <h2 className="mt-4 text-3xl font-semibold text-[color:var(--foreground)]">
                  {homePage.closingCta.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-[color:var(--muted-foreground)]">
                  {homePage.closingCta.body}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a href={homePage.closingCta.primaryCta.href} className="button-primary inline-flex items-center gap-2">
                  {homePage.closingCta.primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href={homePage.closingCta.secondaryCta.href} className="button-secondary">
                  {homePage.closingCta.secondaryCta.label}
                </a>
              </div>
            </div>
          </SectionReveal>
        </section>
      </main>

      <SiteFooter onNavigate={handleSectionNavigation} />
    </div>
  );
}
