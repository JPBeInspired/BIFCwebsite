CREATE TABLE IF NOT EXISTS contact_submissions (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  source TEXT NOT NULL,
  product_id TEXT,
  business_name TEXT,
  prefer_call INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS job_listings (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  club_name TEXT NOT NULL,
  job_type TEXT NOT NULL,
  tags TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL,
  headline TEXT NOT NULL,
  benefits TEXT NOT NULL,
  requirements TEXT NOT NULL,
  about_club TEXT NOT NULL,
  published INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_job_listings_published_created
  ON job_listings (published, created_at);

CREATE TABLE IF NOT EXISTS job_applicants (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  resume_file_key TEXT NOT NULL,
  resume_file_name TEXT NOT NULL,
  resume_file_type TEXT,
  resume_file_size INTEGER,
  cover_letter TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES job_listings(id)
);

CREATE INDEX IF NOT EXISTS idx_job_applicants_job_id
  ON job_applicants (job_id);

CREATE TABLE IF NOT EXISTS blog_post (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  published INTEGER NOT NULL DEFAULT 0,
  published_at TEXT,
  author_name TEXT,
  author_title TEXT,
  author_image TEXT,
  author_bio TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_blog_post_published_at
  ON blog_post (published, published_at);

CREATE INDEX IF NOT EXISTS idx_blog_post_slug
  ON blog_post (slug);
