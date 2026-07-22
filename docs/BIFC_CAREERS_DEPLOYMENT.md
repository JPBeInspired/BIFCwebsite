# BIFC Careers Deployment

1. Build: `npm run build`
2. Apply D1 migrations in order:
   - `0001_cloudflare_core.sql`
   - `0002_bifc_careers_marketplace.sql`
   - `0003_bifc_careers_policy_seed.sql`
3. Configure Cloudflare Pages bindings:
   - `DB`
   - `RESUME_BUCKET`
   - `ADMIN_EMAIL`
4. Deploy from GitHub main through Cloudflare Pages.
5. Verify:
   - `/careers`
   - `/careers/jobs`
   - `/careers/employers`
   - `/careers/talent`
   - `/careers/candidate`
   - `/careers/employer`
   - `/careers/admin`
6. Confirm policy and consent write paths:
   - Candidate registration accepts `collection-notice-v0`
   - Employer registration accepts `employer-terms-v0`
   - Candidate disclosure approval records `candidate-disclosure-v0`
