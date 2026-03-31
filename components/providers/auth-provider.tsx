"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";

import { defaultMockUserId, mockProfiles, mockUsers } from "@/data/mockUsers";
import type { AuthSession, ProfileEntity, UserEntity } from "@/lib/types";

const STORAGE_KEY = "admin-burden-auth-user-id-v1";

interface AuthContextValue {
  currentUser: UserEntity | null;
  currentProfile: ProfileEntity | null;
  session: AuthSession | null;
  availableProfiles: ProfileEntity[];
  signInAs: (userId: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function resolveSession(userId: string | null): AuthSession | null {
  if (!userId) {
    return null;
  }

  const user = mockUsers.find((candidate) => candidate.id === userId) ?? null;
  const profile = mockProfiles.find((candidate) => candidate.userId === userId) ?? null;

  if (!user || !profile) {
    return null;
  }

  return { user, profile };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(defaultMockUserId);

  useEffect(() => {
    const storedUserId = window.localStorage.getItem(STORAGE_KEY);
    setCurrentUserId(storedUserId ?? defaultMockUserId);
  }, []);

  useEffect(() => {
    if (currentUserId) {
      window.localStorage.setItem(STORAGE_KEY, currentUserId);
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
  }, [currentUserId]);

  const session = useMemo(() => resolveSession(currentUserId), [currentUserId]);

  const value = useMemo<AuthContextValue>(
    () => ({
      currentUser: session?.user ?? null,
      currentProfile: session?.profile ?? null,
      session,
      availableProfiles: mockProfiles,
      signInAs: (userId: string) => {
        // TODO Supabase Auth: replace the mock user with a real Supabase session.
        setCurrentUserId(userId || null);
      },
      signOut: () => {
        // TODO ORCID OIDC: replace this mock sign-out with OIDC logout and session revocation.
        setCurrentUserId(null);
      }
    }),
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
