# BIFC Careers Technical Audit

## Existing stack

- Framework: Vite, React 18, TypeScript, React Router and Tailwind CSS.
- Hosting: static assets plus Cloudflare Pages Functions. The repo is deployed from GitHub to Cloudflare Pages.
- Current application type: React marketing website with a small full-stack Cloudflare API layer.
- Authentication: Cloudflare Access remains available for admin operations. Marketplace users use server-side password hashing and secure HTTP-only sessions.
- Database: Cloudflare D1 migrations for contacts, jobs, applications and blog posts. No ORM is used.
- Storage: Cloudflare R2 binding is used for resume uploads through `RESUME_BUCKET`.
- Design system: dark BIFC theme, `background.*`, `text.*`, `accent.*`, `ui.border`, lucide icons, shared navbar and route pages.
- Forms and CRM: contact and application forms post to Pages Functions. CRM delivery is not implemented yet.

## Recommended architecture

Use a hybrid inside the existing site:

- Public BIFC Careers pages stay in the existing React app under `/careers`.
- Authenticated candidate, employer and admin dashboards mount under `/careers/candidate`, `/careers/employer` and `/careers/admin`.
- Cloudflare Pages Functions provide server-side access control and workflow APIs.
- D1 stores relational marketplace records.
- R2 stores private resumes, qualification documents and media.
- Cloudflare Access can protect admin routes during the first release. Candidate/employer auth uses Workers Web Crypto password hashing and D1-backed session records.

This preserves the marketing website and adds a secure application surface without a rebuild.

## Major technical decisions

- One central `candidate_profiles` record per person. Employers never own duplicate candidate records.
- Candidate previews are intentionally limited and do not include contact details, full surname, resume keys or internal BIFC notes.
- Employer interest creates an event only. It does not release private information.
- Candidate disclosure approval records fields, employer, job, timestamp and statement version.
- BIFC admin and recruiter visibility is modelled separately from employer visibility.
- Public pages are SEO-friendly; private dashboards are marked `noindex`.
- Legal wording is placeholder-only until Australian legal and privacy review.

## Required environment variables and bindings

- `ADMIN_EMAIL`: Cloudflare Access email allowed to use current admin APIs.
- `DB`: Cloudflare D1 binding.
- `RESUME_BUCKET`: Cloudflare R2 bucket binding for private career documents.
- Future: `AUTH_SECRET`, `EMAIL_PROVIDER_API_KEY`, `CRM_WEBHOOK_URL`, `CRM_WEBHOOK_SECRET`, `GEOCODING_API_KEY`, `STRIPE_SECRET_KEY`, `TURNSTILE_SECRET_KEY`.

## Database strategy

D1 is suitable for the first marketplace foundation because records are relational and workflow-heavy: candidates, employers, jobs, applications, matches, disclosures, messages, interviews, placements and audit events. Migration `0002_bifc_careers_marketplace.sql` adds the core schema.

## Authentication strategy

Current admin auth can remain Cloudflare Access. Candidate and employer auth now uses secure cookies and server-side password hashing. Email verification, reset tokens, rate limits and optional MFA remain production-hardening items before live candidate data is accepted.

## Storage strategy

R2 stores resumes and qualification documents privately. Production download access must use short-lived signed URLs, file validation, access logging and a malware-scanning integration point.

## Deployment implications

Cloudflare Pages should deploy from GitHub main. Apply D1 migrations before enabling write paths. Configure D1 and R2 bindings in Cloudflare Pages project settings for production and preview.

## Risks and assumptions

- Final legal, privacy and employer terms are not written here and must be externally reviewed.
- Candidate/employer email verification and password reset flows are not production-complete.
- Billing, CRM, SMS and calendar integrations are adapter-ready only.
- Matching is currently deterministic seed/demo logic; background recalculation is a later production phase.
