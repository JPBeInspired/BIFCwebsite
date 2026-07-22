import { clearSessionCookie, revokeCurrentSession } from '../_lib/auth';
import { Env, json } from '../_lib/http';

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  await revokeCurrentSession(request, env);

  return json(
    { success: true },
    {
      headers: {
        'Set-Cookie': clearSessionCookie()
      }
    }
  );
};
