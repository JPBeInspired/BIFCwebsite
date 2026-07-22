import { Env, error, json, readJson } from '../../_lib/http';

const REQUIRED_FIELDS = new Set([
  'Full name',
  'Professional headline',
  'Career summary',
  'Relevant employment history',
  'Qualifications',
  'General availability'
]);

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await readJson<Record<string, any>>(request);

  if (!body.candidate_id || !body.employer_id || !body.job_id || !Array.isArray(body.approved_fields)) {
    return error('Missing required disclosure approval fields', 400);
  }

  const approvedFields = body.approved_fields.map(String);
  const missingRequired = [...REQUIRED_FIELDS].filter(field => !approvedFields.includes(field));

  if (missingRequired.length > 0) {
    return error(`Missing required disclosure fields: ${missingRequired.join(', ')}`, 400);
  }

  const id = crypto.randomUUID();
  const auditId = crypto.randomUUID();
  const now = new Date().toISOString();

  await env.DB.batch([
    env.DB.prepare(`
      INSERT INTO candidate_disclosure_approvals (
        id, candidate_id, employer_id, job_id, interest_request_id,
        approved_fields, optional_fields, statement_version, approved_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      id,
      body.candidate_id,
      body.employer_id,
      body.job_id,
      body.interest_request_id || null,
      JSON.stringify(approvedFields),
      JSON.stringify(body.optional_fields || []),
      body.statement_version || 'candidate-disclosure-v0',
      now
    ),
    env.DB.prepare(`
      INSERT INTO audit_events (id, actor_user_id, actor_role, action, target_type, target_id, metadata_json, created_at)
      VALUES (?, ?, 'candidate', 'candidate_disclosure_approved', 'candidate_disclosure_approval', ?, ?, ?)
    `).bind(
      auditId,
      body.actor_user_id || null,
      id,
      JSON.stringify({
        candidate_id: body.candidate_id,
        employer_id: body.employer_id,
        job_id: body.job_id,
        approved_fields: approvedFields
      }),
      now
    )
  ]);

  return json({ success: true, id }, { status: 201 });
};

