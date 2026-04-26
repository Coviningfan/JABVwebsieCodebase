import { ArrowRight, Clock3, Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/marketing/contact-form";
import { SectionReveal } from "@/components/marketing/section-reveal";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { company, contactProjectOptions } from "@/content/marketing";

function handleFooterNavigate(href: string) {
  if (href.startsWith("#")) {
    window.location.assign(`/${href}`);
    return;
  }

  window.location.assign(href);
}

export default function Contact() {
  return (
    <div className="page-shell">
      <SiteHeader />

      <main>
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
            <SectionReveal>
              <div className="max-w-4xl">
                <p className="editorial-eyebrow">Contact</p>
                <h1 className="display-title mt-6 max-w-4xl">Start with the business problem, not the buzzwords.</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--muted-foreground)]">
                  Whether you need a new app, a higher-quality website, or a redesign that fixes trust issues, this is
                  the place to describe what needs to change.
                </p>
              </div>
            </SectionReveal>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1.08fr,0.92fr]">
          <SectionReveal>
            <ContactForm />
          </SectionReveal>

          <div className="grid gap-6">
            <SectionReveal delayMs={100}>
              <aside className="editorial-card p-7 sm:p-8">
                <p className="editorial-eyebrow">Direct contact</p>
                <div className="mt-6 space-y-5">
                  <a
                    href={company.phoneHref}
                    className="flex items-start gap-4 text-base text-[color:var(--foreground)] transition hover:text-[color:var(--accent-strong)]"
                  >
                    <Phone className="mt-1 h-5 w-5" />
                    <span>{company.phone}</span>
                  </a>
                  <a
                    href={company.emailHref}
                    className="flex items-start gap-4 text-base text-[color:var(--foreground)] transition hover:text-[color:var(--accent-strong)]"
                  >
                    <Mail className="mt-1 h-5 w-5" />
                    <span>{company.email}</span>
                  </a>
                  <div className="flex items-start gap-4 text-base text-[color:var(--muted-foreground)]">
                    <MapPin className="mt-1 h-5 w-5 text-[color:var(--foreground)]" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-start gap-4 text-base text-[color:var(--muted-foreground)]">
                    <Clock3 className="mt-1 h-5 w-5 text-[color:var(--foreground)]" />
                    <span>{company.responseWindow}</span>
                  </div>
                </div>
              </aside>
            </SectionReveal>

            <SectionReveal delayMs={180}>
              <aside className="editorial-card p-7 sm:p-8">
                <p className="editorial-eyebrow">What to include</p>
                <div className="mt-5 grid gap-4">
                  {contactProjectOptions.map((option) => (
                    <div key={option.value} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                      <p className="text-base font-semibold text-[color:var(--foreground)]">{option.label}</p>
                      <p className="mt-2 text-sm leading-7 text-[color:var(--muted-foreground)]">{option.description}</p>
                    </div>
                  ))}
                </div>
              </aside>
            </SectionReveal>

            <SectionReveal delayMs={240}>
              <aside className="editorial-card p-7 sm:p-8">
                <p className="editorial-eyebrow">Business hours</p>
                <ul className="mt-5 space-y-3">
                  {company.businessHours.map((item) => (
                    <li key={item} className="text-sm leading-7 text-[color:var(--muted-foreground)]">
                      {item}
                    </li>
                  ))}
                </ul>
                <a href={company.phoneHref} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--foreground)]">
                  Prefer to call first?
                  <ArrowRight className="h-4 w-4" />
                </a>
              </aside>
            </SectionReveal>
          </div>
        </section>
      </main>

      <SiteFooter onNavigate={handleFooterNavigate} />
    </div>
  );
}
