import { company, navigationItems, servicePreviews } from "@/content/marketing";

type SiteFooterProps = {
  onNavigate: (href: string) => void;
};

export function SiteFooter({ onNavigate }: SiteFooterProps) {
  return (
    <footer className="border-t border-white/10 bg-[rgba(10,8,8,0.94)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr,0.9fr,1fr]">
        <div className="max-w-xl">
          <p className="editorial-eyebrow">JABV Labs</p>
          <h2 className="mt-4 text-2xl font-semibold text-[color:var(--foreground)]">
            Custom digital experiences with a cleaner point of view.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-[color:var(--muted-foreground)]">
            We design and build custom apps, public websites, and strategic redesigns for teams that need more
            clarity, credibility, and long-term maintainability.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
            Navigate
          </p>
          <div className="mt-5 flex flex-col gap-3">
            {navigationItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => onNavigate(item.href)}
                className="w-fit text-left text-sm font-medium text-[color:var(--foreground)] transition hover:text-[color:var(--accent-strong)]"
              >
                {item.label}
              </button>
            ))}
            {servicePreviews.map((service) => (
              <button
                key={service.slug}
                type="button"
                onClick={() => onNavigate(service.href)}
                className="w-fit text-left text-sm text-[color:var(--muted-foreground)] transition hover:text-[color:var(--foreground)]"
              >
                {service.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
            Contact
          </p>
          <div className="mt-5 space-y-3 text-sm leading-7 text-[color:var(--muted-foreground)]">
            <p>{company.location}</p>
            <a href={company.phoneHref} className="block transition hover:text-[color:var(--foreground)]">
              {company.phone}
            </a>
            <a href={company.emailHref} className="block transition hover:text-[color:var(--foreground)]">
              {company.email}
            </a>
            <p>{company.responseWindow}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-sm text-[color:var(--muted-foreground)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © 2025 {company.legalName}. Public site lives in <code>client/</code>; the portal and admin app stay in
            root <code>src/</code>.
          </p>
          <p>Custom code. Clear structure. Launch support.</p>
        </div>
      </div>
    </footer>
  );
}
