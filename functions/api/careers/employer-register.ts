import { createSession, hashPassword, validatePassword } from '../../_lib/auth';
import { Env, error, json, readJson } from '../../_lib/http';

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await readJson<Record<string, any>>(request);

  if (!body.trading_name || !body.legal_business_name || !body.contact_email || !body.password || !body.policy_version_id) {
    return error('Missing required employer registration fields', 400);
  }

  if (body.accepted_terms !== true) {
    return error('Employer terms and candidate-use obligations must be accepted', 400);
  }

  const email = String(body.contact_email).trim().toLowerCase();
  const password = String(body.password);
  const passwordError = validatePassword(password);
  if (passwordError) return error(passwordError, 400);

  const existingUser = await env.DB.prepare('SELECT id FROM users WHERE lower(email) = ? LIMIT 1')
    .bind(email)
    .first<{ id: string }>();

  if (existingUser) {
    return error('An account already exists for this email address', 409);
  }

  const userId = crypto.randomUUID();
  const employerId = crypto.randomUUID();
  const consentId = crypto.randomUUID();
  const auditId = crypto.randomUUID();
  const now = new Date().toISOString();
  const passwordHash = await hashPassword(password);

  await env.DB.batch([
    env.DB.prepare(`
      INSERT INTO users (id, email, password_hash, display_name, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, 'active', ?, ?)
    `).bind(userId, email, passwordHash, body.contact_name || body.trading_name, now, now),
    env.DB.prepare(`
      INSERT INTO employer_organisations (
        id, legal_business_name, trading_name, slug, abn, employer_type, website,
        public_description, verification_status, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'self_registered', ?, ?)
    `).bind(
      employerId,
      body.legal_business_name,
      body.trading_name,
      slugify(body.trading_name),
      body.abn || null,
      body.employer_type || null,
      body.website || null,
      body.public_description || '',
      now,
      now
    ),
    env.DB.prepare(`
      INSERT INTO employer_users (employer_id, user_id, title, status, created_at)
      VALUES (?, ?, ?, 'active', ?)
    `).bind(employerId, userId, body.contact_title || 'Owner', now),
    env.DB.prepare(`
      INSERT INTO consent_records (
        id, user_id, policy_version_id, consent_type, accepted, accepted_at, ip_address, user_agent
      )
      VALUES (?, ?, ?, 'employer_terms', 1, ?, ?, ?)
    `).bind(
      consentId,
      userId,
      body.policy_version_id,
      now,
      request.headers.get('cf-connecting-ip'),
      request.headers.get('user-agent')
    ),
    env.DB.prepare(`
      INSERT INTO audit_events (id, actor_user_id, actor_role, action, target_type, target_id, metadata_json, created_at)
      VALUES (?, ?, 'employer_owner', 'employer_registered', 'employer_organisation', ?, ?, ?)
    `).bind(auditId, userId, employerId, JSON.stringify({ verification_status: 'self_registered' }), now)
  ]);

  const session = await createSession(env, userId);

  return json(
    { success: true, user_id: userId, employer_id: employerId },
    {
      status: 201,
      headers: {
        'Set-Cookie': session.cookie
      }
    }
  );
};
