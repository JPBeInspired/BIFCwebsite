import { Env, json, normalizeRows } from '../../_lib/http';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const search = url.searchParams.get('search')?.trim();
  const page = Math.max(Number(url.searchParams.get('page') || 1), 1);
  const limit = Math.min(Math.max(Number(url.searchParams.get('limit') || 9), 1), 50);
  const offset = (page - 1) * limit;

  const where = search
    ? 'WHERE published = 1 AND (title LIKE ? OR content LIKE ?)'
    : 'WHERE published = 1';
  const bindings = search ? [`%${search}%`, `%${search}%`] : [];

  const [{ results: countRows }, { results }] = await Promise.all([
    env.DB.prepare(`SELECT COUNT(*) AS total FROM blog_post ${where}`).bind(...bindings).all(),
    env.DB.prepare(`
      SELECT * FROM blog_post
      ${where}
      ORDER BY published_at DESC, created_at DESC
      LIMIT ? OFFSET ?
    `).bind(...bindings, limit, offset).all()
  ]);

  return json({
    posts: normalizeRows(results as Record<string, any>[]),
    total: Number((countRows?.[0] as any)?.total || 0)
  });
};
