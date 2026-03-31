"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { Badge } from "@/components/ui/badge";

export function SessionSwitcher({ compact = false }: { compact?: boolean }) {
  const { availableProfiles, currentProfile, currentUser, signInAs, signOut } = useAuth();

  return (
    <div
      className={`rounded-2xl border border-marino/20 bg-white/80 ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="accent">Mock auth</Badge>
        <Badge>{currentProfile?.role ?? "no session"}</Badge>
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-sm font-semibold text-tinta">
          {currentProfile?.displayName ?? "No active session"}
        </p>
        <p className="text-xs text-marino/80">
          {currentUser?.email ?? "Select a profile to test permissions and workflow states."}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <select
          value={currentUser?.id ?? ""}
          onChange={(event) => signInAs(event.target.value)}
          className="min-w-[15rem] rounded-full border border-marino/20 bg-fondo px-3 py-2 text-sm text-marino outline-none focus:border-marino"
        >
          <option value="">Select a mock session</option>
          {availableProfiles.map((profile) => (
            <option key={profile.id} value={profile.userId}>
              {profile.displayName} · {profile.role}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={signOut}
          className="rounded-full border border-marino/25 px-4 py-2 text-sm font-semibold text-marino transition hover:bg-fondo"
        >
          Sign out of mock session
        </button>
      </div>
    </div>
  );
}
