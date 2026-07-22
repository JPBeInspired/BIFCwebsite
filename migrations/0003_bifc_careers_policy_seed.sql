INSERT OR IGNORE INTO policy_versions (
  id, policy_type, version, title, content, legal_review_status, effective_at, created_at
) VALUES
(
  'collection-notice-v0',
  'collection_notice',
  'v0',
  'BIFC Careers Collection Notice Placeholder',
  'Placeholder collection notice for BIFC Careers. Requires Australian legal and privacy review before production use.',
  'requires_review',
  NULL,
  CURRENT_TIMESTAMP
),
(
  'employer-terms-v0',
  'employer_terms',
  'v0',
  'BIFC Careers Employer Terms Placeholder',
  'Placeholder employer terms for BIFC Careers. Requires Australian legal and privacy review before production use.',
  'requires_review',
  NULL,
  CURRENT_TIMESTAMP
),
(
  'candidate-disclosure-v0',
  'candidate_disclosure_statement',
  'v0',
  'BIFC Careers Candidate Disclosure Statement Placeholder',
  'Placeholder disclosure statement explaining that approval is specific to one employer and one role.',
  'requires_review',
  NULL,
  CURRENT_TIMESTAMP
);

