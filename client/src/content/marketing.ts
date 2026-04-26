export type NavigationItem = {
  label: string;
  href: string;
  kind: "section" | "page";
};

export type ServicePreview = {
  slug: string;
  href: string;
  label: string;
  headline: string;
  summary: string;
  fit: string;
  outcome: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  body: string;
};

export type CapabilitySignal = {
  title: string;
  body: string;
};

export type ServicePageSection = {
  title: string;
  body: string;
};

export type ServicePageContent = {
  slug: string;
  href: string;
  label: string;
  eyebrow: string;
  title: string;
  summary: string;
  lead: string;
  bestFit: string[];
  problems: string[];
  approach: ServicePageSection[];
  deliverables: string[];
  outcomes: string[];
  closingTitle: string;
  closingBody: string;
};

export const company = {
  name: "JABV Labs",
  legalName: "JABV Holdings LLC",
  phone: "(775) 800-5850",
  phoneHref: "tel:+17758005850",
  email: "contact@jabvlabs.com",
  emailHref: "mailto:contact@jabvlabs.com",
  location: "Reno, Nevada, USA",
  responseWindow: "Replies within 24 hours",
  businessHours: [
    "Monday to Friday: 9:00 AM to 6:00 PM PST",
    "Saturday: 10:00 AM to 4:00 PM PST",
    "Sunday: Closed",
  ],
};

export const navigationItems: NavigationItem[] = [
  { label: "Services", href: "#services", kind: "section" },
  { label: "Process", href: "#process", kind: "section" },
  { label: "Proof", href: "#proof", kind: "section" },
  { label: "About", href: "#about", kind: "section" },
  { label: "Contact", href: "/contact", kind: "page" },
];

export const homePage = {
  hero: {
    eyebrow: "Custom digital products for serious businesses",
    title: "Websites and apps built with clarity, restraint, and custom code.",
    summary:
      "JABV Labs designs and develops premium mobile apps, interactive websites, and strategic redesigns for teams that need something deliberate, not generic.",
    primaryCta: { label: "Start a project", href: "/contact", kind: "page" as const },
    secondaryCta: { label: "Explore services", href: "#services", kind: "section" as const },
    sideNotes: [
      "Custom builds only",
      "Clear process from discovery through launch",
      "Reno-based and available nationwide",
    ],
  },
  proofStrip: [
    { label: "Build approach", value: "Custom coded, never template-led" },
    { label: "Engagement style", value: "Direct collaboration and practical handoff" },
    { label: "Support", value: "Launch guidance and ongoing iteration" },
    { label: "Location", value: "Reno, Nevada with remote delivery" },
  ],
  process: [
    {
      step: "01",
      title: "Scope the real problem",
      body: "We define the job the product needs to do before we talk about pages, features, or animations.",
    },
    {
      step: "02",
      title: "Shape the experience",
      body: "We organize messaging, interactions, and structure so the product feels intentional before it feels busy.",
    },
    {
      step: "03",
      title: "Build the right system",
      body: "We implement the product with maintainable code, sensible content structure, and clean technical boundaries.",
    },
    {
      step: "04",
      title: "Launch with accountability",
      body: "We test, ship, and support the rollout so the work performs well beyond the first screen recording.",
    },
  ] satisfies ProcessStep[],
  capabilitySignals: [
    {
      title: "Experience design with business discipline",
      body: "We balance polish with clarity so the interface supports trust, comprehension, and action.",
    },
    {
      title: "Product thinking beyond the landing page",
      body: "We think about structure, flows, content hierarchy, and long-term maintainability, not just isolated visuals.",
    },
    {
      title: "Technical delivery without unnecessary clutter",
      body: "The public site is kept lean, while contracts and backend validation remain typed where they actually matter.",
    },
  ] satisfies CapabilitySignal[],
  values: [
    {
      title: "No off-the-shelf look",
      body: "Each project is framed around the client, the audience, and the business pressure behind the work.",
    },
    {
      title: "Clear communication",
      body: "You see what is being built, why it is being built that way, and what decisions still need input.",
    },
    {
      title: "Launch-minded delivery",
      body: "We care about what happens after approval: responsiveness, handoff, maintainability, and conversion readiness.",
    },
  ] satisfies CapabilitySignal[],
  closingCta: {
    title: "Need a site or product experience that actually feels considered?",
    body: "Tell us what is not working today, what needs to improve, and where you need the product to take the business next.",
    primaryCta: { label: "Book the conversation", href: "/contact", kind: "page" as const },
    secondaryCta: { label: "Call JABV Labs", href: "tel:+17758005850", kind: "page" as const },
  },
};

export const servicePreviews: ServicePreview[] = [
  {
    slug: "mobile-app-development",
    href: "/services/mobile-app-development",
    label: "Mobile App Development",
    headline: "Custom mobile products that feel sharp, dependable, and built for repeat use.",
    summary:
      "From early product definition through launch planning, we help turn app ideas into experiences users can understand and keep using.",
    fit: "Best for startups, internal tools, and service businesses moving beyond spreadsheets or fragmented workflows.",
    outcome: "A tighter product scope, stronger user flows, and a build plan that does not rely on guesswork.",
  },
  {
    slug: "interactive-websites",
    href: "/services/interactive-websites",
    label: "Interactive Websites",
    headline: "Marketing sites and web experiences that look premium without becoming noisy.",
    summary:
      "We build responsive websites that prioritize hierarchy, pacing, and performance so the experience feels modern and persuasive.",
    fit: "Best for brands that need more than a brochure site but less chaos than a flashy demo reel.",
    outcome: "A clearer story, stronger conversion paths, and a frontend that is easier to maintain.",
  },
  {
    slug: "website-redesigns",
    href: "/services/website-redesigns",
    label: "Website Redesigns",
    headline: "A strategic rebuild for teams whose current site no longer reflects their level of work.",
    summary:
      "We audit the weak points, reset the hierarchy, and redesign the experience so the site feels credible again.",
    fit: "Best for businesses with dated visuals, weak messaging, or a site that no longer supports sales conversations.",
    outcome: "A cleaner brand presentation, better UX decisions, and a foundation that can scale with the company.",
  },
];

export const servicePageContent: Record<string, ServicePageContent> = {
  "mobile-app-development": {
    slug: "mobile-app-development",
    href: "/services/mobile-app-development",
    label: "Mobile App Development",
    eyebrow: "Mobile app development",
    title: "Build the product people will actually keep opening.",
    summary:
      "We help shape custom mobile apps that feel credible at launch and remain understandable as the product grows.",
    lead:
      "The challenge with mobile products is rarely just shipping screens. It is defining the right user journey, deciding what deserves to exist in version one, and building something that can mature without turning into a patchwork.",
    bestFit: [
      "Startups validating a focused product idea",
      "Service businesses replacing manual coordination",
      "Teams that need a stronger product narrative before development scales",
    ],
    problems: [
      "The product idea is promising, but the app scope is still too broad or too vague.",
      "The experience needs to feel credible from day one, not like a prototype wrapped in branding.",
      "The team needs a build approach that can evolve without losing usability and consistency.",
    ],
    approach: [
      {
        title: "Clarify the product shape",
        body: "We narrow the feature set around the actual user job, the operating constraints, and the decisions that matter most at launch.",
      },
      {
        title: "Design around repeat behavior",
        body: "We structure flows for the actions people will perform often, not just the moments that look good in a demo.",
      },
      {
        title: "Build with future iterations in mind",
        body: "We keep the architecture and interface system lean enough to ship now, but stable enough to extend later.",
      },
    ],
    deliverables: [
      "Product framing and core flow definition",
      "Interface direction and screen-level UX decisions",
      "Mobile frontend implementation and API integration support",
      "Launch readiness guidance, bug fixing, and iteration planning",
    ],
    outcomes: [
      "A tighter version-one scope that reduces waste",
      "A more coherent app experience across key user flows",
      "A product foundation that can support post-launch learning",
    ],
    closingTitle: "If the app idea is real, the first version needs discipline.",
    closingBody:
      "We can help define the product, shape the experience, and build the release around the decisions that matter most.",
  },
  "interactive-websites": {
    slug: "interactive-websites",
    href: "/services/interactive-websites",
    label: "Interactive Websites",
    eyebrow: "Interactive websites",
    title: "Create a web experience that feels modern without feeling performative.",
    summary:
      "We build custom websites that use motion, hierarchy, and interaction with intent instead of excess.",
    lead:
      "Many interactive sites fail in the same way: they chase novelty, bury the message, and overwhelm the visitor before trust is earned. Good interaction design should sharpen the story, not compete with it.",
    bestFit: [
      "Brands that need stronger storytelling and conversion structure",
      "Studios, agencies, and service firms that need a more polished digital presence",
      "Teams replacing a site that feels generic or visually noisy",
    ],
    problems: [
      "The current site looks active, but the messaging and structure feel unfocused.",
      "The experience needs to feel premium without sliding into gimmicks or motion overload.",
      "The team wants a custom frontend that is easier to update than a pile of one-off effects.",
    ],
    approach: [
      {
        title: "Build the hierarchy first",
        body: "We define what the visitor should understand in the first few seconds and what should happen next on the page.",
      },
      {
        title: "Use motion as support",
        body: "We keep animation short, subtle, and purposeful so it reinforces pacing instead of distracting from the offer.",
      },
      {
        title: "Deliver a maintainable marketing system",
        body: "The site content, sections, and shared components are organized so updates stay practical after launch.",
      },
    ],
    deliverables: [
      "Content hierarchy and page-structure refinement",
      "Custom visual direction and responsive frontend implementation",
      "Reusable marketing components and content scaffolding",
      "Performance, accessibility, and launch support",
    ],
    outcomes: [
      "A clearer site story and stronger visual confidence",
      "Better pacing between brand, proof, and call to action",
      "A frontend that feels premium without becoming harder to maintain",
    ],
    closingTitle: "Interactive does not have to mean chaotic.",
    closingBody:
      "We build web experiences that move with intent, respect the user, and still leave a strong impression.",
  },
  "website-redesigns": {
    slug: "website-redesigns",
    href: "/services/website-redesigns",
    label: "Website Redesigns",
    eyebrow: "Website redesigns",
    title: "Rebuild the site so it matches the level of the business behind it.",
    summary:
      "We redesign underperforming websites by fixing the message, the hierarchy, and the experience together.",
    lead:
      "A redesign should do more than freshen colors. It should correct the places where the current site creates hesitation, confusion, or a quiet loss of trust during the sales conversation.",
    bestFit: [
      "Businesses whose site no longer reflects the quality of their work",
      "Teams that have outgrown an old template or piecemeal redesigns",
      "Companies needing a stronger story before investing further in traffic",
    ],
    problems: [
      "The brand presentation feels dated, inconsistent, or less credible than the service itself.",
      "Visitors are not getting to the important information quickly enough.",
      "The current site has accumulated patches instead of a coherent structure.",
    ],
    approach: [
      {
        title: "Audit what is actually failing",
        body: "We look at positioning, page flow, navigation, content density, and friction points before deciding what to rebuild.",
      },
      {
        title: "Reset the message and the structure together",
        body: "A stronger visual layer only works when the hierarchy, proof, and calls to action are fixed at the same time.",
      },
      {
        title: "Ship a cleaner foundation",
        body: "The redesign is delivered as a more intentional frontend system, not just a layer of cosmetic changes.",
      },
    ],
    deliverables: [
      "Site audit and redesign strategy",
      "Updated content hierarchy and visual direction",
      "Custom frontend rebuild for key public pages",
      "Responsive QA, launch support, and post-launch refinement guidance",
    ],
    outcomes: [
      "A site that feels more current, credible, and easier to trust",
      "Clearer positioning for sales conversations and lead qualification",
      "A more scalable public-site structure for future updates",
    ],
    closingTitle: "If the current site is costing trust, a visual touch-up is not enough.",
    closingBody:
      "We can help rework the experience so the site communicates the right level of quality before the call even starts.",
  },
};

export const contactProjectOptions = [
  {
    value: "mobile-app",
    label: "Mobile app development",
    description: "A new product, internal app, or customer-facing mobile workflow.",
  },
  {
    value: "website",
    label: "Interactive website",
    description: "A new public site or web experience that needs stronger UX and storytelling.",
  },
  {
    value: "redesign",
    label: "Website redesign",
    description: "An existing site that needs clearer messaging, structure, and visual maturity.",
  },
  {
    value: "consultation",
    label: "Consultation",
    description: "You need strategic guidance before deciding on scope or implementation.",
  },
];
