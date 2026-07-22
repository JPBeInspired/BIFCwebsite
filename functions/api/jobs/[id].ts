import { Env, error, integerToBoolean, json } from '../../_lib/http';

export const onRequestGet: PagesFunction<Env> = async ({ params, env }) => {
  const job = await env.DB.prepare(
    'SELECT * FROM job_listings WHERE id = ? AND published = 1'
  ).bind(params.id).first<Record<string, any>>();

  if (!job) return error('Job not found', 404);
  return json(integerToBoolean(job));
};
