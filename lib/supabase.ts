import { appEnv, envFlags } from "@/lib/env";

export const isSupabaseConfigured = envFlags.hasSupabasePublicEnv;

export function getSupabaseConfig() {
  return {
    url: appEnv.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: appEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: appEnv.SUPABASE_SERVICE_ROLE_KEY
  };
}

export function getSupabaseClientPlaceholder() {
  // TODO Supabase Auth: crear cliente browser/server con @supabase/supabase-js.
  return null;
}
