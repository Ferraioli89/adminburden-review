import type {
  AnalyticalRelationship,
  BurdenType,
  ExperiencePhase,
  PublicationStatus,
  ResearchMethod
} from "@/lib/types";

export const burdenTypes: BurdenType[] = [
  "Learning Costs",
  "Compliance Costs",
  "Psychological Costs"
];

export const analyticalRelationships: AnalyticalRelationship[] = [
  "Institutional Design -> Citizen Experience",
  "Citizen Experience -> Outcomes",
  "Distributive Factors -> Citizen Experience",
  "Implementation / Street-Level Bureaucracy -> Citizen Experience",
  "Intermediation and Supports -> Citizen Experience",
  "Feedback / Burden Tolerance / State Action -> Institutional Design"
];

export const experiencePhases: ExperiencePhase[] = [
  "Discovering rights and eligibility",
  "Application and documentation",
  "Waiting and follow-up",
  "Interactions with frontline offices and digital channels",
  "Administrative errors and correction",
  "Appeal",
  "Intermediation and supports",
  "Distributive effects and non-take-up"
];

export const researchMethods: ResearchMethod[] = [
  "Qualitative",
  "Quantitative",
  "Mixed Methods",
  "Experiment",
  "Systematic Review"
];

export const publicationStatuses: PublicationStatus[] = [
  "Published",
  "Working Paper",
  "In Review"
];

export const countries = [
  "United States",
  "Spain",
  "Chile",
  "Mexico",
  "Canada",
  "Brasil",
  "United Kingdom",
  "Germany",
  "Australia",
  "Colombia"
];
