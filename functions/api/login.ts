import { createSession, validatePassword, verifyPassword } from '../_lib/auth';
import { Env, error, json, readJson } from '../_lib/http';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await readJson<Record<string, any>>(request);
  const email = String(body.email || '').trim().toLowerCase();
  const password = String(body.password || '');

  if (!email || !password) {
    return error('Email and password are required', 400);
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    return error('Invalid email or password', 401);
  }

  const user = await env.DB.prepare(`
    SELECT id, email, display_name, password_hash, status
    FROM users
    WHERE lower(email) = ?
    LIMIT 1
  `).bind(email).first<{ id: string; email: string; display_name: string | null; password_hash: string | null; status: string }>();

  if (!user || user.status === 'suspended') {
    return error('Invalid email or password', 401);
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return error('Invalid email or password', 401);
  }

  const session = await createSession(env, user.id);
  const now = new Date().toISOString();

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
