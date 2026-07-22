-- BIFC Careers marketplace foundation.
-- Store timestamps in UTC. Display user-facing dates in Australia/Melbourne.

CREATE TABLE IF NOT EXISTS roles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  display_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending_verification',
  email_verified_at TEXT,
  last_login_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_roles (
  user_id TEXT NOT NULL,
  role_id TEXT NOT NULL,
  scope_type TEXT NOT NULL DEFAULT '',
  scope_id TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, role_id, scope_type, scope_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS candidate_profiles (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  middle_name TEXT,
  surname TEXT NOT NULL,
  preferred_name TEXT,
  pronouns TEXT,
  headline TEXT,
  career_summary TEXT,
  email TEXT NOT NULL,
  mobile TEXT,
  preferred_contact_method TEXT,
  country TEXT NOT NULL DEFAULT 'Australia',
  state TEXT,
  suburb TEXT,
  postcode TEXT,
  latitude REAL,
  longitude REAL,
  travel_radius_km INTEGER,
  career_status TEXT NOT NULL DEFAULT 'open_to_suitable_opportunities',
  profile_completion INTEGER NOT NULL DEFAULT 0,
  source_attribution TEXT,
  assigned_recruiter_user_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  archived_at TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (assigned_recruiter_user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_candidate_profiles_state_status
  ON candidate_profiles (state, career_status, archived_at);

CREATE TABLE IF NOT EXISTS candidate_visibility_settings (
  candidate_id TEXT PRIMARY KEY,
  discovery_mode TEXT NOT NULL DEFAULT 'bifc_recommendations_only',
  hide_profile_image INTEGER NOT NULL DEFAULT 0,
  hide_exact_suburb INTEGER NOT NULL DEFAULT 1,
  hide_current_employer INTEGER NOT NULL DEFAULT 1,
  show_first_name_surname_initial INTEGER NOT NULL DEFAULT 1,
  show_broad_area_only INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidate_id) REFERENCES candidate_profiles(id)
);

CREATE TABLE IF NOT EXISTS candidate_preferences (
  id TEXT PRIMARY KEY,
  candidate_id TEXT NOT NULL,
  preference_type TEXT NOT NULL,
  value TEXT NOT NULL,
  private_notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidate_id) REFERENCES candidate_profiles(id)
);

CREATE INDEX IF NOT EXISTS idx_candidate_preferences_candidate_type
  ON candidate_preferences (candidate_id, preference_type);

CREATE TABLE IF NOT EXISTS candidate_qualifications (
  id TEXT PRIMARY KEY,
  candidate_id TEXT NOT NULL,
  qualification_type TEXT NOT NULL,
  provider TEXT,
  qualification_name TEXT NOT NULL,
  completion_date TEXT,
  expiry_date TEXT,
  registration_number TEXT,
  document_key TEXT,
  verification_status TEXT NOT NULL DEFAULT 'self_declared',
  visibility TEXT NOT NULL DEFAULT 'candidate_controlled',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidate_id) REFERENCES candidate_profiles(id)
);

CREATE INDEX IF NOT EXISTS idx_candidate_qualifications_candidate_status
  ON candidate_qualifications (candidate_id, verification_status, expiry_date);

CREATE TABLE IF NOT EXISTS candidate_employer_blocks (
  candidate_id TEXT NOT NULL,
  employer_id TEXT NOT NULL,
  reason TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (candidate_id, employer_id),
  FOREIGN KEY (candidate_id) REFERENCES candidate_profiles(id)
);

CREATE TABLE IF NOT EXISTS employer_organisations (
  id TEXT PRIMARY KEY,
  legal_business_name TEXT NOT NULL,
  trading_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  abn TEXT,
  employer_type TEXT,
  website TEXT,
  public_description TEXT,
  verification_status TEXT NOT NULL DEFAULT 'pending',
  bifc_relationship_type TEXT NOT NULL DEFAULT 'verified_employer',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  suspended_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_employer_verification_status
  ON employer_organisations (verification_status, suspended_at);

CREATE TABLE IF NOT EXISTS employer_locations (
  id TEXT PRIMARY KEY,
  employer_id TEXT NOT NULL,
  name TEXT NOT NULL,
  state TEXT,
  suburb TEXT,
  postcode TEXT,
  latitude REAL,
  longitude REAL,
  workplace_type TEXT NOT NULL DEFAULT 'onsite',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employer_id) REFERENCES employer_organisations(id)
);

CREATE TABLE IF NOT EXISTS employer_users (
  employer_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  title TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (employer_id, user_id),
  FOREIGN KEY (employer_id) REFERENCES employer_organisations(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS marketplace_jobs (
  id TEXT PRIMARY KEY,
  employer_id TEXT NOT NULL,
  location_id TEXT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  role_category TEXT NOT NULL,
  workplace_type TEXT NOT NULL,
  engagement_model TEXT NOT NULL,
  experience_level TEXT,
  compensation_summary TEXT,
  weekly_rent INTEGER,
  rent_free_period TEXT,
  revenue_split TEXT,
  establishment_fee INTEGER,
  software_fee INTEGER,
  billing_fee INTEGER,
  required_floor_hours TEXT,
  leads_supplied INTEGER,
  leads_guaranteed INTEGER,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  responsibilities TEXT,
  required_qualifications TEXT,
  preferred_experience TEXT,
  support_and_onboarding TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  bifc_management_status TEXT NOT NULL DEFAULT 'posted_directly_by_employer',
  featured INTEGER NOT NULL DEFAULT 0,
  closing_date TEXT,
  approved_at TEXT,
  approved_by_user_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employer_id) REFERENCES employer_organisations(id),
  FOREIGN KEY (location_id) REFERENCES employer_locations(id),
  FOREIGN KEY (approved_by_user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_marketplace_jobs_public
  ON marketplace_jobs (status, featured, closing_date, created_at);

CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY,
  candidate_id TEXT NOT NULL,
  job_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'submitted',
  cover_letter TEXT,
  shared_field_snapshot TEXT NOT NULL,
  information_statement_version TEXT NOT NULL,
  submitted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  withdrawn_at TEXT,
  FOREIGN KEY (candidate_id) REFERENCES candidate_profiles(id),
  FOREIGN KEY (job_id) REFERENCES marketplace_jobs(id)
);

CREATE INDEX IF NOT EXISTS idx_applications_job_status
  ON applications (job_id, status, submitted_at);

CREATE TABLE IF NOT EXISTS candidate_job_matches (
  id TEXT PRIMARY KEY,
  candidate_id TEXT NOT NULL,
  job_id TEXT NOT NULL,
  match_score INTEGER NOT NULL,
  match_version TEXT NOT NULL,
  score_components TEXT NOT NULL,
  match_reasons TEXT NOT NULL,
  potential_gaps TEXT,
  calculated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(candidate_id, job_id, match_version),
  FOREIGN KEY (candidate_id) REFERENCES candidate_profiles(id),
  FOREIGN KEY (job_id) REFERENCES marketplace_jobs(id)
);

CREATE INDEX IF NOT EXISTS idx_candidate_job_matches_job_score
  ON candidate_job_matches (job_id, match_score);

CREATE TABLE IF NOT EXISTS employer_interest_requests (
  id TEXT PRIMARY KEY,
  employer_id TEXT NOT NULL,
  job_id TEXT NOT NULL,
  candidate_id TEXT NOT NULL,
  requested_by_user_id TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  responded_at TEXT,
  FOREIGN KEY (employer_id) REFERENCES employer_organisations(id),
  FOREIGN KEY (job_id) REFERENCES marketplace_jobs(id),
  FOREIGN KEY (candidate_id) REFERENCES candidate_profiles(id),
  FOREIGN KEY (requested_by_user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_interest_candidate_status
  ON employer_interest_requests (candidate_id, status, created_at);

CREATE TABLE IF NOT EXISTS candidate_disclosure_approvals (
  id TEXT PRIMARY KEY,
  candidate_id TEXT NOT NULL,
  employer_id TEXT NOT NULL,
  job_id TEXT NOT NULL,
  interest_request_id TEXT,
  approved_fields TEXT NOT NULL,
  optional_fields TEXT,
  statement_version TEXT NOT NULL,
  approved_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  revoked_at TEXT,
  FOREIGN KEY (candidate_id) REFERENCES candidate_profiles(id),
  FOREIGN KEY (employer_id) REFERENCES employer_organisations(id),
  FOREIGN KEY (job_id) REFERENCES marketplace_jobs(id),
  FOREIGN KEY (interest_request_id) REFERENCES employer_interest_requests(id)
);

CREATE TABLE IF NOT EXISTS recruitment_conversations (
  id TEXT PRIMARY KEY,
  job_id TEXT,
  application_id TEXT,
  interest_request_id TEXT,
  conversation_type TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL,
  sender_user_id TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TEXT,
  FOREIGN KEY (conversation_id) REFERENCES recruitment_conversations(id),
  FOREIGN KEY (sender_user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation_created
  ON messages (conversation_id, created_at);

CREATE TABLE IF NOT EXISTS interviews (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  candidate_id TEXT NOT NULL,
  employer_id TEXT NOT NULL,
  scheduled_for TEXT,
  status TEXT NOT NULL DEFAULT 'requested',
  location_or_link TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES marketplace_jobs(id),
  FOREIGN KEY (candidate_id) REFERENCES candidate_profiles(id),
  FOREIGN KEY (employer_id) REFERENCES employer_organisations(id)
);

CREATE TABLE IF NOT EXISTS placements (
  id TEXT PRIMARY KEY,
  candidate_id TEXT NOT NULL,
  employer_id TEXT NOT NULL,
  job_id TEXT,
  engagement_model TEXT,
  start_date TEXT,
  placement_date TEXT NOT NULL,
  placement_source TEXT NOT NULL,
  bifc_recruiter_user_id TEXT,
  invoice_status TEXT,
  current_status TEXT NOT NULL DEFAULT 'active',
  internal_notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (candidate_id) REFERENCES candidate_profiles(id),
  FOREIGN KEY (employer_id) REFERENCES employer_organisations(id),
  FOREIGN KEY (job_id) REFERENCES marketplace_jobs(id),
  FOREIGN KEY (bifc_recruiter_user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS policy_versions (
  id TEXT PRIMARY KEY,
  policy_type TEXT NOT NULL,
  version TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  legal_review_status TEXT NOT NULL DEFAULT 'requires_review',
  effective_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(policy_type, version)
);

CREATE TABLE IF NOT EXISTS consent_records (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  policy_version_id TEXT NOT NULL,
  consent_type TEXT NOT NULL,
  accepted INTEGER NOT NULL,
  accepted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ip_address TEXT,
  user_agent TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (policy_version_id) REFERENCES policy_versions(id)
);

CREATE TABLE IF NOT EXISTS audit_events (
  id TEXT PRIMARY KEY,
  actor_user_id TEXT,
  actor_role TEXT,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  metadata_json TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (actor_user_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_audit_events_target_created
  ON audit_events (target_type, target_id, created_at);
