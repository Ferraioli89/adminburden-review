# Administrative Burden Review

Static academic site built with Next.js App Router, TypeScript, and Tailwind CSS. The current phase is designed for GitHub Pages deployment using mock data and `localStorage`, with no real backend yet.

## Current phase: static site

The app currently works as a static export:

- Next.js static export to `out/`
- GitHub Pages deployment setup
- mock data for articles, proposals, users, and reviews
- browser persistence with `localStorage`
- editorial workspace and permission control in mock mode

## Architecture already prepared for a dynamic phase

Even though this phase remains static, the structure is already separated so the project can migrate later to a dynamic version with Supabase and ORCID:

- future entities and tables in [lib/types.ts](/Users/francisco_ferraioli/Library/CloudStorage/GoogleDrive-ferraiolifrancisco@gmail.com/Mi unidad/Phd UAB - Drive/21_adminburden/Python/lib/types.ts) and [lib/database/schema.ts](/Users/francisco_ferraioli/Library/CloudStorage/GoogleDrive-ferraiolifrancisco@gmail.com/Mi unidad/Phd UAB - Drive/21_adminburden/Python/lib/database/schema.ts)
- repository contracts in [lib/database/contracts.ts](/Users/francisco_ferraioli/Library/CloudStorage/GoogleDrive-ferraiolifrancisco@gmail.com/Mi unidad/Phd UAB - Drive/21_adminburden/Python/lib/database/contracts.ts)
- mock auth and roles in [components/providers/auth-provider.tsx](/Users/francisco_ferraioli/Library/CloudStorage/GoogleDrive-ferraiolifrancisco@gmail.com/Mi unidad/Phd UAB - Drive/21_adminburden/Python/components/providers/auth-provider.tsx) and [lib/auth/guards.ts](/Users/francisco_ferraioli/Library/CloudStorage/GoogleDrive-ferraiolifrancisco@gmail.com/Mi unidad/Phd UAB - Drive/21_adminburden/Python/lib/auth/guards.ts)
- Supabase and ORCID placeholders in [lib/supabase.ts](/Users/francisco_ferraioli/Library/CloudStorage/GoogleDrive-ferraiolifrancisco@gmail.com/Mi unidad/Phd UAB - Drive/21_adminburden/Python/lib/supabase.ts) and [lib/auth/orcid.ts](/Users/francisco_ferraioli/Library/CloudStorage/GoogleDrive-ferraiolifrancisco@gmail.com/Mi unidad/Phd UAB - Drive/21_adminburden/Python/lib/auth/orcid.ts)
- normalized editorial workflow logic in [lib/editorial/workflow.ts](/Users/francisco_ferraioli/Library/CloudStorage/GoogleDrive-ferraiolifrancisco@gmail.com/Mi unidad/Phd UAB - Drive/21_adminburden/Python/lib/editorial/workflow.ts)

## Scripts

- `npm install`
- `npm run dev`
- `npm run typecheck`
- `npm run build`
- `npm run preview`

`npm run build` generates the static output in `out/`. `npm run preview` serves that folder locally.

## Environment variables

The app already reads environment variables from [lib/env.ts](/Users/francisco_ferraioli/Library/CloudStorage/GoogleDrive-ferraiolifrancisco@gmail.com/Mi unidad/Phd UAB - Drive/21_adminburden/Python/lib/env.ts). The example file is [.env.example](/Users/francisco_ferraioli/Library/CloudStorage/GoogleDrive-ferraiolifrancisco@gmail.com/Mi unidad/Phd UAB - Drive/21_adminburden/Python/.env.example).

### Required for the static phase

- `NEXT_PUBLIC_APP_URL`: Public base URL of the site.
- `NEXT_PUBLIC_BASE_PATH`: Route prefix when deploying to a GitHub Pages project site, for example `/my-repo`. Leave it empty for a root-domain deployment.

### Reserved for phase 2 with Supabase

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Reserved for phase 2 with ORCID

- `ORCID_CLIENT_ID`
- `ORCID_CLIENT_SECRET`
- `ORCID_OIDC_ISSUER`
- `ORCID_REDIRECT_URI`

## GitHub Pages

The workflow in [deploy-pages.yml](/Users/francisco_ferraioli/Library/CloudStorage/GoogleDrive-ferraiolifrancisco@gmail.com/Mi unidad/Phd UAB - Drive/21_adminburden/Python/.github/workflows/deploy-pages.yml) is already configured.

Steps:

1. Push the project to GitHub.
2. Make sure the default branch is `main`.
3. In GitHub, enable Pages with `GitHub Actions` as the source.
4. Push to `main`.

The workflow computes `NEXT_PUBLIC_BASE_PATH` automatically:

- empty when the repository is `username.github.io`
- `/<repo-name>` for a standard project repository

## Current mock editorial rule

- a proposal moves to `Included` only with 2 valid approvals
- the same person does not count twice
- the proposer cannot approve their own submission
- only `editor` and `admin` can review

All of this still runs in the client with `localStorage`, but the structure is ready to move later to a real backend.

## TODOs already marked for phase 2

- `TODO Supabase Auth`
- `TODO ORCID OIDC`
- `TODO proposal insertion`
- `TODO review storage`
- `TODO role-based permission control`

## Recommended order for the future dynamic migration

1. Keep this static version deployed and stabilize content and UX.
2. Create the Supabase project and define the `users`, `profiles`, `articles`, `article_proposals`, and `article_reviews` tables.
3. Replace local state with Supabase repositories.
4. Enable Supabase Auth.
5. Integrate ORCID OIDC and link it to `users/profiles`.
6. Move permissions and double approval to server-side validation and RLS.

## Current routes

- `/`
- `/library`
- `/submit`
- `/framework`
- `/admin`
- `/editorial-board`
