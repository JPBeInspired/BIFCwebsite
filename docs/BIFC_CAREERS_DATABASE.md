# BIFC Careers Database

Migrations:

- `migrations/0002_bifc_careers_marketplace.sql`
- `migrations/0003_bifc_careers_policy_seed.sql`

Core tables:

- Access: `users`, `roles`, `user_roles`
- Candidates: `candidate_profiles`, `candidate_visibility_settings`, `candidate_preferences`, `candidate_qualifications`, `candidate_employer_blocks`
- Employers: `employer_organisations`, `employer_locations`, `employer_users`
- Jobs: `marketplace_jobs`
- Matching: `candidate_job_matches`
- Recruitment: `applications`, `employer_interest_requests`, `candidate_disclosure_approvals`, `recruitment_conversations`, `messages`, `interviews`, `placements`
- Trust: `policy_versions`, `consent_records`, `audit_events`

Important constraints:

- One user can have one central candidate profile.
- Employer interest is tied to one employer, one job and one candidate.
- Disclosure approval is tied to one employer and one job.
- Audit events are append-only operational records.
