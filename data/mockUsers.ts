import type { ProfileEntity, UserEntity } from "@/lib/types";

const seedCreatedAt = "2026-03-31T08:00:00.000Z";
const seedUpdatedAt = "2026-03-31T10:00:00.000Z";

export const defaultMockUserId = "user-contributor-1";

export const mockUsers: UserEntity[] = [
  {
    id: "user-contributor-1",
    email: "lucia.herrera@example.org",
    authProvider: "mock",
    createdAt: seedCreatedAt,
    lastSignInAt: seedUpdatedAt
  },
  {
    id: "user-editor-1",
    email: "marco.ruiz@example.org",
    authProvider: "mock",
    createdAt: seedCreatedAt,
    lastSignInAt: seedUpdatedAt
  },
  {
    id: "user-editor-2",
    email: "elena.costa@example.org",
    authProvider: "mock",
    createdAt: seedCreatedAt,
    lastSignInAt: seedUpdatedAt
  },
  {
    id: "user-admin-1",
    email: "ana.torres@example.org",
    authProvider: "mock",
    createdAt: seedCreatedAt,
    lastSignInAt: seedUpdatedAt
  }
];

export const mockProfiles: ProfileEntity[] = [
  {
    id: "profile-contributor-1",
    userId: "user-contributor-1",
    displayName: "Lucia Herrera",
    affiliation: "Universitat Autonoma de Barcelona",
    role: "contributor",
    orcid: null,
    bio: "Doctoral researcher focused on citizen experience and Administrative Burden.",
    createdAt: seedCreatedAt,
    updatedAt: seedUpdatedAt
  },
  {
    id: "profile-editor-1",
    userId: "user-editor-1",
    displayName: "Marco Ruiz",
    affiliation: "University of Michigan",
    role: "editor",
    orcid: null,
    bio: "Editor focused on implementation and policy design.",
    createdAt: seedCreatedAt,
    updatedAt: seedUpdatedAt
  },
  {
    id: "profile-editor-2",
    userId: "user-editor-2",
    displayName: "Elena Costa",
    affiliation: "Sciences Po",
    role: "editor",
    orcid: null,
    bio: "Editor focused on burden, non-take-up, and inequality.",
    createdAt: seedCreatedAt,
    updatedAt: seedUpdatedAt
  },
  {
    id: "profile-admin-1",
    userId: "user-admin-1",
    displayName: "Ana Torres",
    affiliation: "London School of Economics",
    role: "admin",
    orcid: null,
    bio: "Oversees the editorial workflow and the future authentication layer.",
    createdAt: seedCreatedAt,
    updatedAt: seedUpdatedAt
  }
];
