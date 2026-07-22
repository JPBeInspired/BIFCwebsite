export interface Env {
  DB: D1Database;
  RESUME_BUCKET: R2Bucket;
  ADMIN_EMAIL?: string;
}

export function json(data: unknown, init: ResponseInit = {}) {
  return Response.json(data, {
    ...init,
    headers: {
      'Cache-Control': 'no-store',
      ...(init.headers || {})
    }
  });
}

export function error(message: string, status = 400) {
  return json({ error: message }, { status });
}

export async function readJson<T>(request: Request): Promise<T> {
  try {
    return await request.json<T>();
  } catch {
    throw new Error('Invalid JSON body');
  }
}

export function isAdmin(request: Request, env: Env) {
  const expectedEmail = env.ADMIN_EMAIL || 'jakep@beinspired.fitness';
  const accessEmail =
    request.headers.get('cf-access-authenticated-user-email') ||
    request.headers.get('x-admin-email');

  return accessEmail?.toLowerCase() === expectedEmail.toLowerCase();
}

export function requireAdmin(request: Request, env: Env) {
  if (!isAdmin(request, env)) {
    return error('Unauthorized', 401);
  }

  return null;
}

export function booleanToInteger(value: unknown) {
  return value ? 1 : 0;
}

export function integerToBoolean<T extends Record<string, any>>(row: T | null): T | null {
  if (!row) return row;

  if ('published' in row) row.published = Boolean(row.published);
  if ('prefer_call' in row) row.prefer_call = Boolean(row.prefer_call);

  return row;
}

export function normalizeRows<T extends Record<string, any>>(rows: T[]) {
  return rows.map(row => integerToBoolean(row));
}
