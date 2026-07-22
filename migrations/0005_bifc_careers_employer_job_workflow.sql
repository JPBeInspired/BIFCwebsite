-- BIFC Careers employer job posting workflow fields.

ALTER TABLE marketplace_jobs ADD COLUMN ad_package TEXT NOT NULL DEFAULT 'standard';
ALTER TABLE marketplace_jobs ADD COLUMN pay_type TEXT;
ALTER TABLE marketplace_jobs ADD COLUMN pay_min INTEGER;
ALTER TABLE marketplace_jobs ADD COLUMN pay_max INTEGER;
ALTER TABLE marketplace_jobs ADD COLUMN pay_currency TEXT NOT NULL DEFAULT 'AUD';
ALTER TABLE marketplace_jobs ADD COLUMN pay_shown INTEGER NOT NULL DEFAULT 1;
ALTER TABLE marketplace_jobs ADD COLUMN application_questions_json TEXT NOT NULL DEFAULT '[]';
ALTER TABLE marketplace_jobs ADD COLUMN brand_name TEXT;
ALTER TABLE marketplace_jobs ADD COLUMN video_url TEXT;
ALTER TABLE marketplace_jobs ADD COLUMN submitted_at TEXT;
