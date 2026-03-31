import { appEnv, envFlags } from "@/lib/env";

export const isOrcidConfigured = envFlags.hasOrcidOidcEnv;

export function getOrcidConfig() {
  return {
    clientId: appEnv.ORCID_CLIENT_ID,
    issuer: appEnv.ORCID_OIDC_ISSUER,
    redirectUri: appEnv.ORCID_REDIRECT_URI
  };
}

export function getOrcidAuthorizationUrlPlaceholder(): string | null {
  if (!isOrcidConfigured) {
    return null;
  }

  // TODO ORCID OIDC: build the real authorization URL with PKCE and state.
  return `${appEnv.ORCID_OIDC_ISSUER}/authorize`;
}
