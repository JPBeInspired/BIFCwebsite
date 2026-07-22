import { createSession, hashPassword, validatePassword } from '../../_lib/auth';
import { Env, error, json, readJson } from '../../_lib/http';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await readJson<Record<string, any>>(request);

  if (!body.email || !body.first_name || !body.surname || !body.password || !body.policy_version_id) {
    return error('Missing required candidate registration fields', 400);
  }

  if (body.accepted_terms !== true) {
    return error('Candidate collection notice and terms must be accepted', 400);
  }

  const email = String(body.email).trim().toLowerCase();
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
  const candidateId = crypto.randomUUID();
  const consentId = crypto.randomUUID();
  const auditId = crypto.randomUUID();
  const now = new Date().toISOString();
  const passwordHash = await hashPassword(password);

  await env.DB.batch([
    env.DB.prepare(`
      INSERT INTO users (id, email, password_hash, display_name, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, 'active', ?, ?)
    `).bind(userId, email, passwordHash, `${body.first_name} ${body.surname}`, now, now),
    env.DB.prepare(`
      INSERT INTO candidate_profiles (
        id, user_id, first_name, surname, email, mobile, state, suburb,
        career_status, source_attribution, created_at, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      candidateId,
      userId,
      body.first_name,
      body.surname,
      email,
      body.mobile || null,
      body.state || null,
      body.suburb || null,
      body.career_status || 'open_to_suitable_opportunities',
      body.source_attribution || 'bifc_careers_registration',
      now,
      now
    ),
    env.DB.prepare(`
      INSERT INTO candidate_visibility_settings (candidate_id, discovery_mode, updated_at)
      VALUES (?, 'bifc_recommendations_only', ?)
    `).bind(candidateId, now),
    env.DB.prepare(`
      INSERT INTO consent_records (
        id, user_id, policy_version_id, consent_type, accepted, accepted_at, ip_address, user_agent
      )
      VALUES (?, ?, ?, 'candidate_collection_notice', 1, ?, ?, ?)
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
      VALUES (?, ?, 'candidate', 'candidate_registered', 'candidate_profile', ?, ?, ?)
    `).bind(auditId, userId, candidateId, JSON.stringify({ source: body.source_attribution || 'bifc_careers_registration' }), now)
  ]);

  const session = await createSession(env, userId);

  return json(
    { success: true, user_id: userId, candidate_id: candidateId },
    {
      status: 201,
      headers: {
        'Set-Cookie': session.cookie
      }
    }
  );
};
