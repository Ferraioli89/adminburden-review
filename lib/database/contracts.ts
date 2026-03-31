import type {
  ArticleEntity,
  ArticleProposalEntity,
  ArticleReviewEntity,
  ProfileEntity,
  ProposalInput,
  UserEntity
} from "@/lib/types";

export interface UsersRepository {
  list(): Promise<UserEntity[]>;
  findById(id: string): Promise<UserEntity | null>;
}

export interface ProfilesRepository {
  list(): Promise<ProfileEntity[]>;
  findByUserId(userId: string): Promise<ProfileEntity | null>;
}

export interface ArticlesRepository {
  list(): Promise<ArticleEntity[]>;
}

export interface ArticleProposalsRepository {
  list(): Promise<ArticleProposalEntity[]>;
  insert(input: ProposalInput, proposedByUserId: string): Promise<ArticleProposalEntity>;
}

export interface ArticleReviewsRepository {
  listByProposal(proposalId: string): Promise<ArticleReviewEntity[]>;
  insert(review: Omit<ArticleReviewEntity, "id" | "createdAt" | "updatedAt">): Promise<ArticleReviewEntity>;
}

export interface AppRepositories {
  users: UsersRepository;
  profiles: ProfilesRepository;
  articles: ArticlesRepository;
  articleProposals: ArticleProposalsRepository;
  articleReviews: ArticleReviewsRepository;
}
