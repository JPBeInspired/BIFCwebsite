import { Env, error, json, normalizeRows, readJson, requireAdmin, booleanToInteger } from '../../_lib/http';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const includeDrafts = url.searchParams.get('admin') === 'true';

  if (includeDrafts) {
    const unauthorized = requireAdmin(request, env);
    if (unauthorized) return unauthorized;
  }

  const query = includeDrafts
    ? 'SELECT * FROM job_listings ORDER BY created_at DESC'
    : 'SELECT * FROM job_listings WHERE published = 1 ORDER BY created_at DESC';

  const { results } = await env.DB.prepare(query).all();
  return json(normalizeRows(results as Record<string, any>[]));
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const body = await readJson<Record<string, any>>(request);
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await env.DB.prepare(`
    INSERT INTO job_listings (
      id, title, location, club_name, job_type, tags, summary, headline,
      benefits, requirements, about_club, published, created_at, updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    id,
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
    now
  ).run();

  const job = await env.DB.prepare('SELECT * FROM job_listings WHERE id = ?').bind(id).first();
  if (!job) return error('Failed to create job', 500);

  return json(job, { status: 201 });
};
