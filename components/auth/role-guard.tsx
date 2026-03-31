"use client";

import type { ReactNode } from "react";

import { useAuth } from "@/components/providers/auth-provider";
import { Badge } from "@/components/ui/badge";
import { hasMinimumRole } from "@/lib/auth/guards";
import type { UserRole } from "@/lib/types";

export function RoleGuard({
  minimumRole,
  children,
  title,
  description
}: {
  minimumRole: UserRole;
  children: ReactNode;
  title: string;
  description: string;
}) {
  const { currentProfile } = useAuth();

  if (hasMinimumRole(currentProfile, minimumRole)) {
    return <>{children}</>;
  }

  return (
    <section className="rounded-3xl border border-burdeos/20 bg-white p-6 shadow-card">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="warn">Restricted access</Badge>
        <Badge>Requires {minimumRole} role</Badge>
      </div>
      <h1 className="mt-4 font-serif text-3xl text-tinta">{title}</h1>
      <p className="mt-2 max-w-2xl text-sm text-marino/85">{description}</p>
      <p className="mt-4 text-sm text-marino/80">
        The current session does not have sufficient permissions. Use the mock session switcher to
        test `editor` or `admin` workflows.
      </p>
    </section>
  );
}
