const rawEnv = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  ORCID_CLIENT_ID: process.env.ORCID_CLIENT_ID ?? "",
  ORCID_CLIENT_SECRET: process.env.ORCID_CLIENT_SECRET ?? "",
  ORCID_OIDC_ISSUER: process.env.ORCID_OIDC_ISSUER ?? "",
  ORCID_REDIRECT_URI: process.env.ORCID_REDIRECT_URI ?? ""
} as const;

export const appEnv = rawEnv;

export const envFlags = {
  hasSupabasePublicEnv:
    rawEnv.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
    rawEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0,
  hasSupabaseServiceRole: rawEnv.SUPABASE_SERVICE_ROLE_KEY.length > 0,
  hasOrcidOidcEnv:
    rawEnv.ORCID_CLIENT_ID.length > 0 &&
    rawEnv.ORCID_CLIENT_SECRET.length > 0 &&
    rawEnv.ORCID_OIDC_ISSUER.length > 0 &&
    rawEnv.ORCID_REDIRECT_URI.length > 0
} as const;
