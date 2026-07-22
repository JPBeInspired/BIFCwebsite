import { Env, error, json, readJson } from '../../_lib/http';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await readJson<Record<string, any>>(request);

  if (!body.employer_id || !body.job_id || !body.candidate_id || !body.requested_by_user_id) {
    return error('Missing required employer interest fields', 400);
  }

  const candidate = await env.DB.prepare(`
    SELECT cp.id, cvs.discovery_mode
    FROM candidate_profiles cp
    JOIN candidate_visibility_settings cvs ON cvs.candidate_id = cp.id
    WHERE cp.id = ? AND cp.archived_at IS NULL
  `).bind(body.candidate_id).first<Record<string, any>>();

  if (!candidate || candidate.discovery_mode === 'hidden_from_employer_discovery') {
    return error('Candidate is not available for employer interest', 403);
  }

  const blocked = await env.DB.prepare(`
    SELECT candidate_id FROM candidate_employer_blocks
    WHERE candidate_id = ? AND employer_id = ?
  `).bind(body.candidate_id, body.employer_id).first();

  if (blocked) {
    return error('Candidate is not available for this employer', 403);
  }

  const id = crypto.randomUUID();
  const auditId = crypto.randomUUID();
  const now = new Date().toISOString();

  await env.DB.batch([
    env.DB.prepare(`
      INSERT INTO employer_interest_requests (
        id, employer_id, job_id, candidate_id, requested_by_user_id, message, status, created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, 'new', ?)
    `).bind(id, body.employer_id, body.job_id, body.candidate_id, body.requested_by_user_id, body.message || '', now),
    env.DB.prepare(`
      INSERT INTO audit_events (id, actor_user_id, actor_role, action, target_type, target_id, metadata_json, created_at)
      VALUES (?, ?, 'employer', 'employer_interest_created', 'employer_interest_request', ?, ?, ?)
    `).bind(
      auditId,
      body.requested_by_user_id,
      id,
      JSON.stringify({ employer_id: body.employer_id, job_id: body.job_id, candidate_id: body.candidate_id }),
      now
    )
  ]);

  return json({ success: true, id }, { status: 201 });
};

