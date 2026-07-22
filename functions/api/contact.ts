import { Env, booleanToInteger, json, readJson } from '../_lib/http';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const body = await readJson<Record<string, any>>(request);

  await env.DB.prepare(`
    INSERT INTO contact_submissions (
      id, name, email, phone, message, source, product_id,
      business_name, prefer_call, created_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    crypto.randomUUID(),
    body.name,
    body.email,
    body.phone || null,
    body.message,
    body.source || 'contact',
    body.product_id || null,
    body.business_name || null,
    booleanToInteger(body.prefer_call),
    new Date().toISOString()
  ).run();

  return json({ success: true }, { status: 201 });
};
