export type CaseStudyStatus = "approved" | "draft";

export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  problem: string;
  solution: string;
  deliverables: string[];
  outcomes: string[];
  image: string | null;
  status: CaseStudyStatus;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "case-study-slot-01",
    title: "Case study pending approval",
    sector: "Confidential client",
    problem: "Detailed project context will be published once client approval and supporting assets are available.",
    solution: "The content scaffold is in place so the public case study can be published without changing the frontend structure.",
    deliverables: ["Project summary pending", "Asset selection pending", "Outcome review pending"],
    outcomes: ["Public-safe details pending approval"],
    image: null,
    status: "draft",
  },
  {
    slug: "case-study-slot-02",
    title: "Case study pending approval",
    sector: "Confidential client",
    problem: "A second reserved slot is prepared for future publication once source material is cleared.",
    solution: "The public site will only surface this work when the content is marked approved.",
    deliverables: ["Narrative draft pending", "Visual assets pending", "Outcome summary pending"],
    outcomes: ["Approval workflow pending"],
    image: null,
    status: "draft",
  },
];

export const approvedCaseStudies = caseStudies.filter(
  (caseStudy): caseStudy is CaseStudy & { status: "approved" } => caseStudy.status === "approved",
);
