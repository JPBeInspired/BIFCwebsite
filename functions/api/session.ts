import { getSessionUser } from '../_lib/auth';
import { Env, isAdmin, json } from '../_lib/http';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const sessionUser = await getSessionUser(request, env);
  const email =
    sessionUser?.email ||
    request.headers.get('cf-access-authenticated-user-email') ||
    request.headers.get('x-admin-email') ||
    null;

  return json({
    authenticated: Boolean(sessionUser) || isAdmin(request, env),
    admin: isAdmin(request, env),
    email,
    employer_id: sessionUser?.employer_id || null,
    candidate_id: sessionUser?.candidate_id || null
  });
};
