import { Env, booleanToInteger, error, integerToBoolean, json, readJson, requireAdmin } from '../../../_lib/http';

export const onRequestGet: PagesFunction<Env> = async ({ request, params, env }) => {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const job = await env.DB.prepare('SELECT * FROM job_listings WHERE id = ?').bind(params.id).first<Record<string, any>>();
  if (!job) return error('Job not found', 404);

  return json(integerToBoolean(job));
};

export const onRequestPut: PagesFunction<Env> = async ({ request, params, env }) => {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const body = await readJson<Record<string, any>>(request);
  const now = new Date().toISOString();

  await env.DB.prepare(`
    UPDATE job_listings
    SET title = ?, location = ?, club_name = ?, job_type = ?, tags = ?, summary = ?,
        headline = ?, benefits = ?, requirements = ?, about_club = ?, published = ?,
        updated_at = ?
    WHERE id = ?
  `).bind(
    body.title,
    body.location,
    body.club_name,
    body.job_type,
    body.tags || '',
    body.summary,
    body.headline,
    body.benefits,
    body.requirements,
    body.about_club,
    booleanToInteger(body.published),
    now,
    params.id
  ).run();

  const job = await env.DB.prepare('SELECT * FROM job_listings WHERE id = ?').bind(params.id).first<Record<string, any>>();
  if (!job) return error('Job not found', 404);

  return json(integerToBoolean(job));
};

export const onRequestPatch: PagesFunction<Env> = async ({ request, params, env }) => {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  await env.DB.prepare(
    'UPDATE job_listings SET published = 0, updated_at = ? WHERE id = ?'
  ).bind(new Date().toISOString(), params.id).run();

  return json({ success: true });
};
