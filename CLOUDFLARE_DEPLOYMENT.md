# Cloudflare Pages Deployment

This repo is ready to deploy as a Cloudflare Pages project.

## Recommended Pages Settings

- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`
- Production branch: `main`
- Project name: `bifcwebsite`

## Cloudflare Bindings

Create and bind these Cloudflare resources before deploying the migrated backend:

- D1 database: `bifcwebsite`, bound as `DB`
- R2 bucket: `bifc-resumes`, bound as `RESUME_BUCKET`
- Environment variable: `ADMIN_EMAIL=jakep@beinspired.fitness`

After creating the D1 database, replace `REPLACE_WITH_CLOUDFLARE_D1_DATABASE_ID` in `wrangler.jsonc` with the database ID from Cloudflare.

Apply the schema with:

```bash
npx wrangler d1 migrations apply bifcwebsite --remote
```

The old standalone product API server has been removed. New backend behavior runs through Cloudflare Pages Functions.

## Direct Deploy

After logging in with Wrangler, a manual deploy can be run from this folder:

```bash
npx wrangler pages deploy dist --project-name bifcwebsite
```

## Git Deploy

For the normal production workflow:

1. Create a Cloudflare Pages project connected to `JPBeInspired/BIFCwebsite`.
2. Use the build settings above.
3. Add the required bindings and environment variable above.
4. Deploy a preview branch first and test core flows.
5. Move the custom domain from Netlify to Cloudflare once the preview is verified.

## Migration Checks

- Confirm SPA routes resolve directly after refresh, using `public/_redirects`.
- Confirm contact form submissions write to D1.
- Confirm job applications upload resumes to R2 and write applicant rows to D1.
- Protect `/admin/*` with Cloudflare Access for `jakep@beinspired.fitness`.
- Confirm blog and careers pages read from D1.
- Confirm the removed Products catalogue is no longer linked from navigation, home, or contact flows.
