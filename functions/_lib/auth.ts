import { Env } from './http';

const PASSWORD_ITERATIONS = 310000;
const SESSION_COOKIE = 'bifc_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = '';
  bytes.forEach(byte => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlToBytes(value: string) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((value.length + 3) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, char => char.charCodeAt(0));
}

async function sha256Base64Url(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return bytesToBase64Url(new Uint8Array(digest));
}

export function validatePassword(password: string) {
  if (password.length < 10) {
    return 'Password must be at least 10 characters.';
  }

  if (password.length > 256) {
    return 'Password is too long.';
  }

  return null;
}

export async function hashPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt,
      iterations: PASSWORD_ITERATIONS
    },
    key,
    256
  );

  return `pbkdf2-sha256$${PASSWORD_ITERATIONS}$${bytesToBase64Url(salt)}$${bytesToBase64Url(new Uint8Array(bits))}`;
}

export async function verifyPassword(password: string, storedHash: string | null | undefined) {
  if (!storedHash) return false;

  const [algorithm, iterationsValue, saltValue, hashValue] = storedHash.split('$');
  const iterations = Number(iterationsValue);

  if (algorithm !== 'pbkdf2-sha256' || !Number.isFinite(iterations) || !saltValue || !hashValue) {
    return false;
  }

  const salt = base64UrlToBytes(saltValue);
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt,
      iterations
    },
    key,
    256
  );

  return bytesToBase64Url(new Uint8Array(bits)) === hashValue;
}

export function parseCookies(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  return Object.fromEntries(
    cookieHeader
      .split(';')
      .map(cookie => cookie.trim())
      .filter(Boolean)
      .map(cookie => {
        const index = cookie.indexOf('=');
        return index === -1 ? [cookie, ''] : [cookie.slice(0, index), decodeURIComponent(cookie.slice(index + 1))];
      })
  );
}

export async function createSession(env: Env, userId: string) {
  const tokenBytes = crypto.getRandomValues(new Uint8Array(32));
  const token = bytesToBase64Url(tokenBytes);
  const tokenHash = await sha256Base64Url(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000).toISOString();

  await env.DB.prepare(`
    INSERT INTO auth_sessions (id, user_id, token_hash, expires_at, created_at, last_seen_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(crypto.randomUUID(), userId, tokenHash, expiresAt, new Date().toISOString(), new Date().toISOString()).run();

  return {
    token,
    cookie: `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${SESSION_TTL_SECONDS}; HttpOnly; Secure; SameSite=Lax`
  };
}

export function clearSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;
}

export async function getSessionUser(request: Request, env: Env) {
  const token = parseCookies(request)[SESSION_COOKIE];
  if (!token) return null;

  const tokenHash = await sha256Base64Url(token);
  const row = await env.DB.prepare(`
    SELECT u.id, u.email, u.display_name, u.status, eo.id AS employer_id, cp.id AS candidate_id
    FROM auth_sessions s
    JOIN users u ON u.id = s.user_id
    LEFT JOIN employer_users eu ON eu.user_id = u.id AND eu.status = 'active'
    LEFT JOIN employer_organisations eo ON eo.id = eu.employer_id AND eo.suspended_at IS NULL
    LEFT JOIN candidate_profiles cp ON cp.user_id = u.id AND cp.archived_at IS NULL
    WHERE s.token_hash = ?
      AND s.revoked_at IS NULL
      AND s.expires_at > ?
      AND u.status IN ('active', 'pending_verification')
    LIMIT 1
  `).bind(tokenHash, new Date().toISOString()).first<{
    id: string;
    email: string;
    display_name: string | null;
    status: string;
    employer_id: string | null;
    candidate_id: string | null;
  }>();

  if (!row) return null;

  await env.DB.prepare('UPDATE auth_sessions SET last_seen_at = ? WHERE token_hash = ?')
    .bind(new Date().toISOString(), tokenHash)
    .run();

  return row;
}

export async function revokeCurrentSession(request: Request, env: Env) {
  const token = parseCookies(request)[SESSION_COOKIE];
  if (!token) return;

  const tokenHash = await sha256Base64Url(token);
  await env.DB.prepare('UPDATE auth_sessions SET revoked_at = ? WHERE token_hash = ?')
    .bind(new Date().toISOString(), tokenHash)
    .run();
}
