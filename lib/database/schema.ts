import type {
  ArticleEntity,
  ArticleProposalEntity,
  ArticleReviewEntity,
  ProfileEntity,
  UserEntity
} from "@/lib/types";

export const databaseTables = {
  users: "users",
  profiles: "profiles",
  articles: "articles",
  articleProposals: "article_proposals",
  articleReviews: "article_reviews"
} as const;

export interface DatabaseEntityMap {
  users: UserEntity;
  profiles: ProfileEntity;
  articles: ArticleEntity;
  article_proposals: ArticleProposalEntity;
  article_reviews: ArticleReviewEntity;
}
