import { Env, error, integerToBoolean, json, normalizeRows } from '../../_lib/http';

export const onRequestGet: PagesFunction<Env> = async ({ params, env }) => {
  const post = await env.DB.prepare(
    'SELECT * FROM blog_post WHERE slug = ? AND published = 1'
  ).bind(params.slug).first<Record<string, any>>();

  if (!post) return error('Post not found', 404);

  const { results } = await env.DB.prepare(`
    SELECT * FROM blog_post
    WHERE published = 1 AND id != ?
    ORDER BY published_at DESC, created_at DESC
    LIMIT 3
  `).bind(post.id).all();

  return json({
    post: integerToBoolean(post),
    relatedPosts: normalizeRows(results as Record<string, any>[])
  });
};
