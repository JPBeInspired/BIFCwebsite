-- BIFC Careers login rate limiting metadata.

CREATE TABLE IF NOT EXISTS auth_login_attempts (
  id TEXT PRIMARY KEY,
  attempt_key TEXT NOT NULL,
  attempted_at TEXT NOT NULL,
  success INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_auth_login_attempts_key_time
  ON auth_login_attempts (attempt_key, attempted_at);
