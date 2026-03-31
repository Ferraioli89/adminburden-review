"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

import { useAuth } from "@/components/providers/auth-provider";
import { initialArticleProposals, initialArticleReviews } from "@/data/initialProposals";
import { mockProfiles } from "@/data/mockUsers";
import { canReviewProposal, canSubmitProposal } from "@/lib/auth/guards";
import { buildProposalWithReviews, deriveEditorialStatus } from "@/lib/editorial/workflow";
import type {
  ArticleProposalEntity,
  ArticleReviewEntity,
  MutationResult,
  Proposal,
  ProposalInput,
  ReviewActionResult,
  ReviewDecision
} from "@/lib/types";

const STORAGE_KEY = "admin-burden-editorial-v2";

interface PersistedEditorialState {
  articleProposals: ArticleProposalEntity[];
  articleReviews: ArticleReviewEntity[];
}

interface AppStateContextValue {
  proposals: Proposal[];
  articleProposals: ArticleProposalEntity[];
  articleReviews: ArticleReviewEntity[];
  addProposal: (input: ProposalInput) => MutationResult;
  registerDecision: (proposalId: string, decision: ReviewDecision) => ReviewActionResult;
  resetDemoData: () => void;
}

const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

function generateId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getInitialEditorialState(): PersistedEditorialState {
  return {
    articleProposals: initialArticleProposals,
    articleReviews: initialArticleReviews
  };
}

function hydrateEditorialState(raw: PersistedEditorialState): PersistedEditorialState {
  return {
    articleProposals: raw.articleProposals.map((proposal) => ({
      ...proposal,
      editorialStatus: deriveEditorialStatus(
        proposal,
        raw.articleReviews.filter((review) => review.proposalId === proposal.id)
      )
    })),
    articleReviews: raw.articleReviews
  };
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const { currentProfile, currentUser } = useAuth();
  const [editorialState, setEditorialState] = useState<PersistedEditorialState>(
    getInitialEditorialState()
  );

  useEffect(() => {
    const fromStorage = window.localStorage.getItem(STORAGE_KEY);

    if (!fromStorage) {
      return;
    }

    try {
      const parsed = JSON.parse(fromStorage) as PersistedEditorialState;
      setEditorialState(hydrateEditorialState(parsed));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(editorialState));
  }, [editorialState]);

  const proposals = useMemo(
    () =>
      editorialState.articleProposals
        .map((proposal) =>
          buildProposalWithReviews({
            proposal,
            reviews: editorialState.articleReviews.filter(
              (review) => review.proposalId === proposal.id
            ),
            profiles: mockProfiles
          })
        )
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [editorialState.articleProposals, editorialState.articleReviews]
  );

  function addProposal(input: ProposalInput): MutationResult {
    if (!currentUser || !canSubmitProposal(currentProfile)) {
      return {
        ok: false,
        message: "You need an active session with contributor permissions or higher to submit."
      };
    }

    const timestamp = new Date().toISOString();
    const newProposal: ArticleProposalEntity = {
      id: generateId("prop"),
      ...input,
      proposedByUserId: currentUser.id,
      editorialStatus: "Proposed",
      createdAt: timestamp,
      updatedAt: timestamp
    };

    setEditorialState((current) => ({
      ...current,
      articleProposals: [newProposal, ...current.articleProposals]
    }));

    // TODO proposal insertion: persist article_proposals in Supabase.
    return {
      ok: true,
      message: "Proposal submitted successfully. It was saved in local mock state."
    };
  }

  function registerDecision(
    proposalId: string,
    decision: ReviewDecision
  ): ReviewActionResult {
    const proposal = editorialState.articleProposals.find(
      (candidate) => candidate.id === proposalId
    );

    if (!proposal) {
      return { ok: false, message: "The selected proposal does not exist." };
    }

    if (!currentUser) {
      return { ok: false, message: "You need an active session to review proposals." };
    }

    const proposalReviews = editorialState.articleReviews.filter(
      (review) => review.proposalId === proposalId
    );

    const permission = canReviewProposal({
      proposal,
      reviews: proposalReviews,
      reviewerProfile: currentProfile,
      reviewerUserId: currentUser.id,
      decision
    });

    if (!permission.allowed) {
      return { ok: false, message: permission.reason };
    }

    const timestamp = new Date().toISOString();
    const newReview: ArticleReviewEntity = {
      id: generateId("rev"),
      proposalId,
      reviewerUserId: currentUser.id,
      decision,
      comment: null,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    setEditorialState((current) => {
      const nextReviews = [newReview, ...current.articleReviews];
      const nextProposals = current.articleProposals.map((candidate) => {
        if (candidate.id !== proposalId) {
          return candidate;
        }

        return {
          ...candidate,
          editorialStatus: deriveEditorialStatus(
            candidate,
            nextReviews.filter((review) => review.proposalId === proposalId)
          ),
          updatedAt: timestamp
        };
      });

      return {
        articleProposals: nextProposals,
        articleReviews: nextReviews
      };
    });

    // TODO review storage: persist article_reviews in Supabase.
    return { ok: true, message: `Review recorded: ${decision}.` };
  }

  function resetDemoData() {
    setEditorialState(getInitialEditorialState());
  }

  const value = useMemo<AppStateContextValue>(
    () => ({
      proposals,
      articleProposals: editorialState.articleProposals,
      articleReviews: editorialState.articleReviews,
      addProposal,
      registerDecision,
      resetDemoData
    }),
    [editorialState.articleProposals, editorialState.articleReviews, proposals]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);

  if (!context) {
    throw new Error("useAppState must be used within AppStateProvider.");
  }

  return context;
}
