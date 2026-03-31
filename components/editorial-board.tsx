"use client";

import { useMemo, useState } from "react";

import { useAuth } from "@/components/providers/auth-provider";
import { useAppState } from "@/components/providers/app-state-provider";
import { Badge } from "@/components/ui/badge";
import { mockProfiles } from "@/data/mockUsers";
import type { EditorialWorkflowStatus } from "@/lib/types";

const statusTabs: Array<"All" | EditorialWorkflowStatus> = [
  "All",
  "Proposed",
  "In Review",
  "Included"
];

export function EditorialBoard() {
  const { currentProfile } = useAuth();
  const { proposals, registerDecision, resetDemoData } = useAppState();
  const [activeTab, setActiveTab] = useState<"All" | EditorialWorkflowStatus>("All");
  const [feedback, setFeedback] = useState<{ tone: "success" | "warn"; message: string } | null>(
    null
  );

  const orderedProposals = useMemo(
    () =>
      [...proposals]
        .filter((proposal) =>
          activeTab === "All" ? true : proposal.editorialStatus === activeTab
        )
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [activeTab, proposals]
  );

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-marino/20 bg-white p-4 shadow-card">
        <div>
          <h2 className="font-serif text-2xl text-tinta">Mock Editorial Workflow</h2>
          <p className="text-sm text-marino/80">
            Active rule: a proposal becomes “Included” only after two valid approvals from two
            different reviewers.
          </p>
        </div>
        <button
          type="button"
          onClick={resetDemoData}
          className="rounded-full border border-marino/30 px-4 py-2 text-sm font-semibold text-marino transition hover:bg-fondo"
        >
          Reset demo data
        </button>
      </div>

      <div className="rounded-2xl border border-marino/20 bg-white p-4 shadow-card">
        <div className="grid gap-3 md:grid-cols-3">
          <MetricCard
            label="Active proposals"
            value={String(
              proposals.filter((proposal) => proposal.editorialStatus !== "Included").length
            )}
          />
          <MetricCard
            label="Included"
            value={String(
              proposals.filter((proposal) => proposal.editorialStatus === "Included").length
            )}
          />
          <MetricCard
            label="Reviewer session"
            value={currentProfile?.displayName ?? "No session"}
            caption={currentProfile?.role ?? "no role"}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-marino/20 bg-white p-3 shadow-card">
        <div className="flex flex-wrap gap-2">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                activeTab === tab
                  ? "bg-marino text-white"
                  : "bg-fondo text-marino hover:bg-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {feedback && (
        <p
          className={`rounded-2xl p-4 text-sm ${
            feedback.tone === "success"
              ? "border border-musgo/25 bg-musgo/10 text-musgo"
              : "border border-burdeos/25 bg-burdeos/10 text-burdeos"
          }`}
        >
          {feedback.message}
        </p>
      )}

      <div className="grid gap-4 xl:grid-cols-2">
        {orderedProposals.map((proposal) => {
          const canReview = proposal.editorialStatus !== "Included";
          return (
            <article
              key={proposal.id}
              className="rounded-2xl border border-marino/20 bg-white p-5 shadow-card"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif text-xl text-tinta">{proposal.title}</h3>
                  <p className="text-sm text-marino/80">
                    {proposal.authors} · {proposal.year} · {proposal.source}
                  </p>
                </div>
                <Badge tone={proposal.editorialStatus === "Included" ? "success" : "default"}>
                  {proposal.editorialStatus}
                </Badge>
              </div>

              <p className="mt-3 text-sm text-tinta/90">{proposal.abstract}</p>

              <div className="mt-4 grid gap-2 text-sm text-marino/90">
                <p>
                  <span className="font-semibold">Burden Type:</span> {proposal.burdenType}
                </p>
                <p>
                  <span className="font-semibold">Citizen Experience Stage:</span>{" "}
                  {proposal.experiencePhase}
                </p>
                <p>
                  <span className="font-semibold">Proposed by:</span>{" "}
                  {proposal.proposerProfile?.displayName ?? "Profile pending"}
                </p>
                <p>
                  <span className="font-semibold">Valid approvals:</span>{" "}
                  {proposal.validApprovalUserIds.length}/2
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={!canReview}
                  onClick={() => {
                    const result = registerDecision(proposal.id, "Approve");
                    setFeedback({ tone: result.ok ? "success" : "warn", message: result.message });
                  }}
                  className="rounded-full bg-musgo px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Approve
                </button>
                <button
                  type="button"
                  disabled={!canReview}
                  onClick={() => {
                    const result = registerDecision(proposal.id, "Request Changes");
                    setFeedback({ tone: result.ok ? "success" : "warn", message: result.message });
                  }}
                  className="rounded-full border border-marino/30 px-4 py-2 text-sm font-semibold text-marino disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Request Changes
                </button>
                <button
                  type="button"
                  disabled={!canReview}
                  onClick={() => {
                    const result = registerDecision(proposal.id, "Reject");
                    setFeedback({ tone: result.ok ? "success" : "warn", message: result.message });
                  }}
                  className="rounded-full bg-burdeos px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Reject
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-marino/60">
                  Review history
                </p>
                {proposal.reviews.length === 0 ? (
                  <p className="text-sm text-marino/70">No reviews yet.</p>
                ) : (
                  <ul className="space-y-2 text-sm text-marino/80">
                    {proposal.reviews.slice(0, 4).map((review) => (
                      <li key={review.id} className="rounded-lg bg-fondo px-3 py-2">
                        {review.decision} by{" "}
                        {mockProfiles.find((profile) => profile.userId === review.reviewerUserId)
                          ?.displayName ?? review.reviewerUserId}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {orderedProposals.length === 0 && (
        <p className="rounded-2xl border border-marino/20 bg-white p-6 text-center text-marino">
          No proposals match the selected status.
        </p>
      )}
    </section>
  );
}

function MetricCard({
  label,
  value,
  caption
}: {
  label: string;
  value: string;
  caption?: string;
}) {
  return (
    <article className="rounded-2xl border border-marino/15 bg-fondo p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-marino/60">{label}</p>
      <p className="mt-2 font-serif text-2xl text-tinta">{value}</p>
      {caption ? <p className="text-xs text-marino/75">{caption}</p> : null}
    </article>
  );
}
