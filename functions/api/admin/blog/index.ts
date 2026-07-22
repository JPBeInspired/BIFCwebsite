import { Env, booleanToInteger, json, normalizeRows, readJson, requireAdmin } from '../../../_lib/http';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const { results } = await env.DB.prepare(
    'SELECT * FROM blog_post ORDER BY created_at DESC'
  ).all();

  return json(normalizeRows(results as Record<string, any>[]));
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const body = await readJson<Record<string, any>>(request);
  const id = crypto.randomUUID();
  const now = new Date().toISOString();

  await env.DB.prepare(`
    INSERT INTO blog_post (
      id, title, slug, excerpt, content, thumbnail_url, meta_title,
      meta_description, published, published_at, created_at, updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    id,
    body.title,
    body.slug,
    body.excerpt,
    body.content,
    body.thumbnail_url,
    body.meta_title || body.title,
    body.meta_description || body.excerpt,
    booleanToInteger(body.published),
    body.published ? new Date().toISOString() : null,
    now,
    now
  ).run();

  return json({ id }, { status: 201 });
};
