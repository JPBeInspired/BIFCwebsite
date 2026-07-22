# BIFC Website

Be Inspired Fitness and Coaching website, now extended with the BIFC Careers marketplace foundation.

## Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Cloudflare Pages
- Cloudflare Pages Functions
- Cloudflare D1
- Cloudflare R2

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Cloudflare deployment

Cloudflare Pages deploys from GitHub main. Manual deploy is available with:

```bash
npm run deploy:cloudflare
```

## Database migrations

Apply migrations in order to the configured D1 database:

```bash
npx wrangler d1 migrations apply <database-name>
```

Current migrations:

- `migrations/0001_cloudflare_core.sql`
- `migrations/0002_bifc_careers_marketplace.sql`

## Seed instructions

Seed data is documented in `docs/BIFC_CAREERS_DEMO_ACCOUNTS.md`. Production credentials are not stored in this repo. A future seed command should create fictional demo users, employers, jobs, candidate profiles, matches and placement records.

## BIFC Careers docs

- `docs/BIFC_CAREERS_TECHNICAL_AUDIT.md`
- `docs/BIFC_CAREERS_ARCHITECTURE.md`
- `docs/BIFC_CAREERS_DATABASE.md`
- `docs/BIFC_CAREERS_PERMISSIONS.md`
- `docs/BIFC_CAREERS_MATCHING.md`
- `docs/BIFC_CAREERS_PRIVACY_FLOW.md`
- `docs/BIFC_CAREERS_DEPLOYMENT.md`
- `docs/BIFC_CAREERS_TESTING.md`
- `docs/BIFC_CAREERS_DEMO_ACCOUNTS.md`

