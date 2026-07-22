import { Env, json, normalizeRows } from '../../_lib/http';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return json({ relatedPosts: [] });
  }

  const { results } = await env.DB.prepare(`
    SELECT * FROM blog_post
    WHERE published = 1 AND id != ?
    ORDER BY published_at DESC, created_at DESC
    LIMIT 3
  `).bind(id).all();

  return json({ relatedPosts: normalizeRows(results as Record<string, any>[]) });
};
