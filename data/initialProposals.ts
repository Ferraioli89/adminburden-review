import type { ArticleProposalEntity, ArticleReviewEntity } from "@/lib/types";

const seedCreatedAt = "2026-03-31T09:00:00.000Z";
const seedUpdatedAt = "2026-03-31T10:00:00.000Z";

export const initialArticleProposals: ArticleProposalEntity[] = [
  {
    id: "prop-1",
    title: "Digital Mismatch and Learning Burden in Rural Benefit Access",
    authors: "A. Vega, M. Ruiz",
    year: 2026,
    source: "UAB Public Policy Seminar",
    doiOrLink: "Pending",
    abstract:
      "Explores the gap between portal design and navigation capacity in rural communities accessing public benefits.",
    burdenType: "Learning Costs",
    analyticalRelationship: "Institutional Design -> Citizen Experience",
    experiencePhase: "Interactions with frontline offices and digital channels",
    country: "Spain",
    method: "Mixed Methods",
    population: "Rural households with intermittent internet access",
    tags: ["rural", "digital divide", "access"],
    rationale:
      "Adds recent evidence on territorial inequality at the first point of contact with the state.",
    proposedByUserId: "user-contributor-1",
    editorialStatus: "Proposed",
    createdAt: seedCreatedAt,
    updatedAt: seedUpdatedAt
  },
  {
    id: "prop-2",
    title: "Compliance Drift in Emergency Income Programs",
    authors: "J. Bennett, S. Molina",
    year: 2025,
    source: "Working Paper",
    doiOrLink: "Pending",
    abstract:
      "Shows how requirements shift during implementation and increase compliance demands for applicants.",
    burdenType: "Compliance Costs",
    analyticalRelationship:
      "Implementation / Street-Level Bureaucracy -> Citizen Experience",
    experiencePhase: "Application and documentation",
    country: "United States",
    method: "Quantitative",
    population: "Applicants to emergency income support programs",
    tags: ["minimum income", "implementation", "changing rules"],
    rationale:
      "Connects crisis-policy scholarship with Administrative Burden theory and street-level bureaucracy.",
    proposedByUserId: "user-contributor-1",
    editorialStatus: "In Review",
    createdAt: seedCreatedAt,
    updatedAt: seedUpdatedAt
  }
];

export const initialArticleReviews: ArticleReviewEntity[] = [
  {
    id: "rev-1",
    proposalId: "prop-2",
    reviewerUserId: "user-editor-1",
    decision: "Approve",
    comment: "Strong fit with the implementation and compliance-burden agenda.",
    createdAt: seedUpdatedAt,
    updatedAt: seedUpdatedAt
  }
];
