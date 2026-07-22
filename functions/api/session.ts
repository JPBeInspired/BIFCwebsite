import { Env, isAdmin, json } from '../_lib/http';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const email =
    request.headers.get('cf-access-authenticated-user-email') ||
    request.headers.get('x-admin-email') ||
    null;

  return json({
    authenticated: isAdmin(request, env),
    email
  });
};
