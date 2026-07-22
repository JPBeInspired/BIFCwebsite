import { Env, booleanToInteger, error, integerToBoolean, json, readJson, requireAdmin } from '../../../_lib/http';

export const onRequestGet: PagesFunction<Env> = async ({ request, params, env }) => {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const post = await env.DB.prepare('SELECT * FROM blog_post WHERE id = ?').bind(params.id).first<Record<string, any>>();
  if (!post) return error('Post not found', 404);

  return json(integerToBoolean(post));
};

export const onRequestPut: PagesFunction<Env> = async ({ request, params, env }) => {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  const body = await readJson<Record<string, any>>(request);
  const now = new Date().toISOString();

  await env.DB.prepare(`
    UPDATE blog_post
    SET title = ?, slug = ?, excerpt = ?, content = ?, thumbnail_url = ?,
        meta_title = ?, meta_description = ?, published = ?, published_at = ?,
        updated_at = ?
    WHERE id = ?
  `).bind(
    body.title,
    body.slug,
    body.excerpt,
    body.content,
    body.thumbnail_url,
    body.meta_title || body.title,
    body.meta_description || body.excerpt,
    booleanToInteger(body.published),
    body.published ? (body.published_at || now) : null,
    now,
    params.id
  ).run();

  return json({ success: true });
};

export const onRequestDelete: PagesFunction<Env> = async ({ request, params, env }) => {
  const unauthorized = requireAdmin(request, env);
  if (unauthorized) return unauthorized;

  await env.DB.prepare('DELETE FROM blog_post WHERE id = ?').bind(params.id).run();
  return json({ success: true });
};
