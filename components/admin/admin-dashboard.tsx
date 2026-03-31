"use client";

import Link from "next/link";

import { RoleGuard } from "@/components/auth/role-guard";
import { SessionSwitcher } from "@/components/auth/session-switcher";
import { EditorialBoard } from "@/components/editorial-board";

export function AdminDashboard() {
  return (
    <RoleGuard
      minimumRole="editor"
      title="Editorial workspace"
      description="This view is prepared for real authentication and role-based access control. In the current phase it still uses a mock session."
    >
      <div className="space-y-6">
        <section className="rounded-3xl border border-marino/20 bg-white p-6 shadow-card">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-marino/60">
                Editorial admin
              </p>
              <h1 className="mt-2 font-serif text-4xl text-tinta">
                Workflow prepared for Supabase, ORCID, and double approval
              </h1>
              <p className="mt-3 text-sm leading-6 text-marino/85">
                This screen centralizes proposals, reviews, and editorial statuses with mock rules
                that mirror the future workflow. Inclusion requires two valid approvals from two
                different people and excludes self-approval by the proposer.
              </p>
            </div>

            <Link
              href="/submit"
              className="rounded-full border border-marino/25 px-4 py-2 text-sm font-semibold text-marino transition hover:bg-fondo"
            >
              Go to article submission
            </Link>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_2fr]">
          <section className="space-y-4 rounded-3xl border border-marino/20 bg-white p-5 shadow-card">
            <div>
              <h2 className="font-serif text-2xl text-tinta">Session and permissions</h2>
              <p className="mt-2 text-sm text-marino/80">
                Use this panel to simulate `contributor`, `editor`, and `admin` before connecting
                Supabase Auth and ORCID OIDC.
              </p>
            </div>

            <SessionSwitcher />

            <div className="rounded-2xl border border-marino/15 bg-fondo p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-marino/60">
                Planned integration
              </p>
              <ul className="mt-3 space-y-2 text-sm text-marino/85">
                <li>Supabase Auth will replace the current mock session.</li>
                <li>ORCID OIDC will provide academic identity and profile linking.</li>
                <li>Role-based policies will move to Supabase RLS.</li>
              </ul>
            </div>
          </section>

          <EditorialBoard />
        </div>
      </div>
    </RoleGuard>
  );
}
