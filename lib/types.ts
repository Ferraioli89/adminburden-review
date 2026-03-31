export type BurdenType = "Learning Costs" | "Compliance Costs" | "Psychological Costs";

export type AnalyticalRelationship =
  | "Institutional Design -> Citizen Experience"
  | "Citizen Experience -> Outcomes"
  | "Distributive Factors -> Citizen Experience"
  | "Implementation / Street-Level Bureaucracy -> Citizen Experience"
  | "Intermediation and Supports -> Citizen Experience"
  | "Feedback / Burden Tolerance / State Action -> Institutional Design";

export type ExperiencePhase =
  | "Discovering rights and eligibility"
  | "Application and documentation"
  | "Waiting and follow-up"
  | "Interactions with frontline offices and digital channels"
  | "Administrative errors and correction"
  | "Appeal"
  | "Intermediation and supports"
  | "Distributive effects and non-take-up";

export type EditorialWorkflowStatus = "Proposed" | "In Review" | "Included";

export type PublicationStatus = "Published" | "Working Paper" | "In Review";

export type ResearchMethod =
  | "Qualitative"
  | "Quantitative"
  | "Mixed Methods"
  | "Experiment"
  | "Systematic Review";

export type UserRole = "contributor" | "editor" | "admin";

export type AuthProvider = "mock" | "supabase";

export type ReviewDecision = "Approve" | "Request Changes" | "Reject";

export interface UserEntity {
  id: string;
  email: string;
  authProvider: AuthProvider;
  createdAt: string;
  lastSignInAt: string | null;
}

export interface ProfileEntity {
  id: string;
  userId: string;
  displayName: string;
  affiliation: string;
  role: UserRole;
  orcid: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleEntity {
  id: string;
  title: string;
  authors: string;
  year: number;
  source: string;
  abstract: string;
  doiOrLink: string;
  burdenType: BurdenType;
  analyticalRelationship: AnalyticalRelationship;
  experiencePhase: ExperiencePhase;
  country: string;
  method: ResearchMethod;
  publicationStatus: PublicationStatus;
  tags: string[];
  createdByUserId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleProposalEntity {
  id: string;
  title: string;
  authors: string;
  year: number;
  source: string;
  doiOrLink: string;
  abstract: string;
  burdenType: BurdenType;
  analyticalRelationship: AnalyticalRelationship;
  experiencePhase: ExperiencePhase;
  country: string;
  method: ResearchMethod;
  population: string;
  tags: string[];
  rationale: string;
  proposedByUserId: string;
  editorialStatus: EditorialWorkflowStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleReviewEntity {
  id: string;
  proposalId: string;
  reviewerUserId: string;
  decision: ReviewDecision;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  user: UserEntity;
  profile: ProfileEntity;
}

export interface ProposalWithReviews extends ArticleProposalEntity {
  reviews: ArticleReviewEntity[];
  validApprovalUserIds: string[];
  proposerProfile: ProfileEntity | null;
}

export interface ProposalInput {
  title: string;
  authors: string;
  year: number;
  source: string;
  doiOrLink: string;
  abstract: string;
  burdenType: BurdenType;
  analyticalRelationship: AnalyticalRelationship;
  experiencePhase: ExperiencePhase;
  country: string;
  method: ResearchMethod;
  population: string;
  tags: string[];
  rationale: string;
}

export interface ReviewActionResult {
  ok: boolean;
  message: string;
}

export interface MutationResult {
  ok: boolean;
  message: string;
}

export type Article = ArticleEntity;
export type Proposal = ProposalWithReviews;
