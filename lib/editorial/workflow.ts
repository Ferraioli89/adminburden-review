import { getValidApprovalUserIds } from "@/lib/auth/guards";
import type {
  ArticleProposalEntity,
  ArticleReviewEntity,
  EditorialWorkflowStatus,
  ProfileEntity,
  ProposalWithReviews
} from "@/lib/types";

export function deriveEditorialStatus(
  proposal: Pick<ArticleProposalEntity, "proposedByUserId">,
  reviews: ArticleReviewEntity[]
): EditorialWorkflowStatus {
  const validApprovals = getValidApprovalUserIds(proposal, reviews);

  if (validApprovals.length >= 2) {
    return "Included";
  }

  if (reviews.length > 0) {
    return "In Review";
  }

  return "Proposed";
}

export function buildProposalWithReviews(params: {
  proposal: ArticleProposalEntity;
  reviews: ArticleReviewEntity[];
  profiles: ProfileEntity[];
}): ProposalWithReviews {
  const { proposal, reviews, profiles } = params;
  const validApprovalUserIds = getValidApprovalUserIds(proposal, reviews);

  return {
    ...proposal,
    editorialStatus: deriveEditorialStatus(proposal, reviews),
    reviews,
    validApprovalUserIds,
    proposerProfile:
      profiles.find((profile) => profile.userId === proposal.proposedByUserId) ?? null
  };
}
