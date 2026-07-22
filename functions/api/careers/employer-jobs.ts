import { getSessionUser } from '../../_lib/auth';
import { Env, error, json, readJson } from '../../_lib/http';

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function parseLocation(value: string) {
  const parts = value.split(',').map(part => part.trim()).filter(Boolean);
  return {
    suburb: parts[0] || value || 'Australia',
    state: parts[1] || ''
  };
}

function asInteger(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) ? Math.round(number) : null;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const sessionUser = await getSessionUser(request, env);
  if (!sessionUser?.employer_id) return error('Employer login required', 401);

  const { results } = await env.DB.prepare(`
    SELECT id, slug, title, role_category, workplace_type, engagement_model, status,
      ad_package, compensation_summary, created_at, updated_at, submitted_at
    FROM marketplace_jobs
    WHERE employer_id = ?
    ORDER BY updated_at DESC
  `).bind(sessionUser.employer_id).all<Record<string, any>>();

  return json(results || []);
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const sessionUser = await getSessionUser(request, env);
  if (!sessionUser?.employer_id) return error('Employer login required', 401);

  const body = await readJson<Record<string, any>>(request);
  const action = body.action === 'submit' ? 'submit' : 'draft';
  const title = String(body.title || '').trim();

  if (action === 'submit' && !title) return error('Job title is required', 400);
  if (action === 'submit' && !body.location) return error('Location is required', 400);
  if (action === 'submit' && !body.summary) return error('Job summary is required', 400);
  if (action === 'submit' && !body.description) return error('Job description is required', 400);

  const now = new Date().toISOString();
  const jobId = crypto.randomUUID();
  const locationId = crypto.randomUUID();
  const location = parseLocation(String(body.location || 'Australia'));
  const displayTitle = title || 'Untitled job draft';
  const slug = `${slugify(displayTitle) || 'job'}-${jobId.slice(0, 8)}`;
  const status = action === 'submit' ? 'submitted' : 'draft';
  const compensationSummary = String(body.pay_shown === false ? 'Pay hidden from ad' : body.compensation_summary || '').trim();
  const questions = Array.isArray(body.application_questions) ? body.application_questions : [];

  await env.DB.batch([
    env.DB.prepare(`
      INSERT INTO employer_locations (id, employer_id, name, state, suburb, workplace_type, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      locationId,
      sessionUser.employer_id,
      String(body.location || location.suburb),
      location.state,
      location.suburb,
      body.workplace_type || 'onsite',
      now
    ),
    env.DB.prepare(`
      INSERT INTO marketplace_jobs (
        id, employer_id, location_id, slug, title, role_category, workplace_type,
        engagement_model, experience_level, compensation_summary, summary,
        description, responsibilities, required_qualifications, preferred_experience,
        support_and_onboarding, status, bifc_management_status, ad_package, pay_type,
        pay_min, pay_max, pay_currency, pay_shown, application_questions_json,
        brand_name, video_url, created_at, updated_at, submitted_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'posted_directly_by_employer', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      jobId,
      sessionUser.employer_id,
      locationId,
      slug,
      displayTitle,
      body.role_category || 'Personal Training',
      body.workplace_type || 'onsite',
      body.engagement_model || 'Full-time',
      body.experience_level || 'Open',
      compensationSummary,
      body.summary || '',
      body.description || '',
      body.responsibilities || '',
      body.required_qualifications || '',
      body.preferred_experience || '',
      body.support_and_onboarding || '',
      status,
      body.ad_package || 'standard',
      body.pay_type || 'annual',
      asInteger(body.pay_min),
      asInteger(body.pay_max),
      body.pay_currency || 'AUD',
      body.pay_shown === false ? 0 : 1,
      JSON.stringify(questions),
      body.brand_name || null,
      body.video_url || null,
      now,
      now,
      action === 'submit' ? now : null
    ),
    env.DB.prepare(`
      INSERT INTO audit_events (id, actor_user_id, actor_role, action, target_type, target_id, metadata_json, created_at)
      VALUES (?, ?, 'employer_owner', ?, 'marketplace_job', ?, ?, ?)
    `).bind(
      crypto.randomUUID(),
      sessionUser.id,
      action === 'submit' ? 'employer_job_submitted' : 'employer_job_draft_saved',
      jobId,
      JSON.stringify({ ad_package: body.ad_package || 'standard', status }),
      now
    )
  ]);

  const job = await env.DB.prepare('SELECT * FROM marketplace_jobs WHERE id = ?').bind(jobId).first();
  return json({ success: true, job }, { status: 201 });
};
