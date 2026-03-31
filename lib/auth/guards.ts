import type {
  ArticleProposalEntity,
  ArticleReviewEntity,
  ProfileEntity,
  UserRole
} from "@/lib/types";

const roleWeight: Record<UserRole, number> = {
  contributor: 1,
  editor: 2,
  admin: 3
};

export function hasMinimumRole(
  profile: Pick<ProfileEntity, "role"> | null,
  minimumRole: UserRole
): boolean {
  if (!profile) {
    return false;
  }

  return roleWeight[profile.role] >= roleWeight[minimumRole];
}

export function canSubmitProposal(profile: Pick<ProfileEntity, "role"> | null): boolean {
  return hasMinimumRole(profile, "contributor");
}

export function canAccessAdmin(profile: Pick<ProfileEntity, "role"> | null): boolean {
  return hasMinimumRole(profile, "editor");
}

export function getValidApprovalUserIds(
  proposal: Pick<ArticleProposalEntity, "proposedByUserId">,
  reviews: ArticleReviewEntity[]
): string[] {
  const validApprovalUserIds = new Set<string>();

  for (const review of reviews) {
    if (review.decision !== "Approve") {
      continue;
    }

    if (review.reviewerUserId === proposal.proposedByUserId) {
      continue;
    }

    validApprovalUserIds.add(review.reviewerUserId);
  }

  return [...validApprovalUserIds];
}

export function canReviewProposal(params: {
  proposal: ArticleProposalEntity;
  reviews: ArticleReviewEntity[];
  reviewerProfile: ProfileEntity | null;
  reviewerUserId: string | null;
  decision: ArticleReviewEntity["decision"];
}): { allowed: boolean; reason: string } {
  const { proposal, reviews, reviewerProfile, reviewerUserId, decision } = params;

  // TODO role-based permission control: move this validation to Supabase RLS and policies.
  if (!reviewerProfile || !reviewerUserId) {
    return {
      allowed: false,
      reason: "You need an active session to register reviews."
    };
  }

  if (!canAccessAdmin(reviewerProfile)) {
    return {
      allowed: false,
      reason: "Only editors and admins can review proposals."
    };
  }

  if (proposal.proposedByUserId === reviewerUserId) {
    return {
      allowed: false,
      reason: "The person who proposed an article cannot approve their own submission."
    };
  }

  if (decision === "Approve") {
    const alreadyApproved = reviews.some(
      (review) => review.reviewerUserId === reviewerUserId && review.decision === "Approve"
    );

    if (alreadyApproved) {
      return {
        allowed: false,
        reason: "The same person cannot count twice toward approval."
      };
    }
  }

  return { allowed: true, reason: "OK" };
}
