import { createSession, revokeCurrentSession, validatePassword, verifyPassword } from '../_lib/auth';
import { Env, error, json, readJson } from '../_lib/http';

const LOGIN_WINDOW_SECONDS = 15 * 60;
const LOGIN_MAX_FAILURES = 10;

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

async function ensureLoginAttemptsTable(env: Env) {
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS auth_login_attempts (
      id TEXT PRIMARY KEY,
      attempt_key TEXT NOT NULL,
      attempted_at TEXT NOT NULL,
      success INTEGER NOT NULL DEFAULT 0
    )
  `).run();

  await env.DB.prepare(`
    CREATE INDEX IF NOT EXISTS idx_auth_login_attempts_key_time
      ON auth_login_attempts (attempt_key, attempted_at)
  `).run();
}

async function getAttemptKey(request: Request, email: string) {
  const ip = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'unknown';
  return sha256Hex(`${email}|${ip}`);
}

async function isRateLimited(env: Env, attemptKey: string) {
  const windowStart = new Date(Date.now() - LOGIN_WINDOW_SECONDS * 1000).toISOString();
  const row = await env.DB.prepare(`
    SELECT COUNT(*) AS count
    FROM auth_login_attempts
    WHERE attempt_key = ?
      AND success = 0
      AND attempted_at > ?
  `).bind(attemptKey, windowStart).first<{ count: number }>();

  return Number(row?.count || 0) >= LOGIN_MAX_FAILURES;
}

async function recordLoginAttempt(env: Env, attemptKey: string, success: boolean) {
  await env.DB.prepare(`
    INSERT INTO auth_login_attempts (id, attempt_key, attempted_at, success)
    VALUES (?, ?, ?, ?)
  `).bind(crypto.randomUUID(), attemptKey, new Date().toISOString(), success ? 1 : 0).run();
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await readJson<Record<string, any>>(request);
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');
  await ensureLoginAttemptsTable(env);
  const attemptKey = await getAttemptKey(request, email || 'missing-email');

  if (await isRateLimited(env, attemptKey)) {
    return error('Too many sign-in attempts. Try again later or reset your password.', 429);
  }

  if (!email || !password) {
    return error('Email and password are required', 400);
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    await recordLoginAttempt(env, attemptKey, false);
    return error('Invalid email or password', 401);
  }

  const user = await env.DB.prepare(`
    SELECT id, email, display_name, password_hash, status
    FROM users
    WHERE lower(email) = ?
    LIMIT 1
  `).bind(email).first<{ id: string; email: string; display_name: string | null; password_hash: string | null; status: string }>();

  if (!user || user.status === 'suspended') {
    await recordLoginAttempt(env, attemptKey, false);
    return error('Invalid email or password', 401);
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    await recordLoginAttempt(env, attemptKey, false);
    return error('Invalid email or password', 401);
  }

  await revokeCurrentSession(request, env);
  const session = await createSession(env, user.id);
  const now = new Date().toISOString();
  await recordLoginAttempt(env, attemptKey, true);

  await env.DB.prepare('UPDATE users SET last_login_at = ?, updated_at = ? WHERE id = ?')
    .bind(now, now, user.id)
    .run();

  return json(
    {
      authenticated: true,
      email: user.email,
      display_name: user.display_name
    },
    {
      headers: {
        'Set-Cookie': session.cookie
      }
    }
  );
};
