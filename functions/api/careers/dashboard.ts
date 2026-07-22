import { getSessionUser } from '../../_lib/auth';
import { Env, json, requireAdmin } from '../../_lib/http';

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const role = url.searchParams.get('role') || 'candidate';
  const sessionUser = await getSessionUser(request, env);
  const email = (
    sessionUser?.email ||
    request.headers.get('cf-access-authenticated-user-email') ||
    request.headers.get('x-user-email') ||
    ''
  ).toLowerCase();

  if (role === 'admin') {
    const unauthorized = requireAdmin(request, env);
    if (unauthorized) return unauthorized;

    const [candidates, employers, jobs, interests, audit] = await Promise.all([
      env.DB.prepare('SELECT COUNT(*) AS count FROM candidate_profiles WHERE archived_at IS NULL').first<{ count: number }>(),
      env.DB.prepare("SELECT COUNT(*) AS count FROM employer_organisations WHERE verification_status = 'self_registered'").first<{ count: number }>(),
      env.DB.prepare("SELECT COUNT(*) AS count FROM marketplace_jobs WHERE status IN ('submitted', 'pending_review')").first<{ count: number }>(),
      env.DB.prepare("SELECT COUNT(*) AS count FROM employer_interest_requests WHERE status = 'new'").first<{ count: number }>(),
      env.DB.prepare("SELECT COUNT(*) AS count FROM audit_events WHERE created_at >= datetime('now', '-1 day')").first<{ count: number }>()
    ]);

    return json({
      cards: [
        `${candidates?.count || 0} active candidates`,
        `${employers?.count || 0} self-registered employers`,
        `${jobs?.count || 0} jobs awaiting review`,
        `${interests?.count || 0} new employer interests`,
        `${audit?.count || 0} audit events today`
      ]
    });
  }

  if (role === 'employer') {
    const employer = sessionUser?.employer_id
      ? { id: sessionUser.employer_id }
      : email
      ? await env.DB.prepare(`
          SELECT eo.id
          FROM employer_organisations eo
          JOIN employer_users eu ON eu.employer_id = eo.id
          JOIN users u ON u.id = eu.user_id
          WHERE lower(u.email) = ?
          LIMIT 1
        `).bind(email).first<{ id: string }>()
        : null;

    if (!employer) {
      return json({
        cards: ['0 active jobs', '0 matched previews', '0 interests awaiting response', 'No candidate exports available']
      });
    }

    const [activeJobs, interests] = await Promise.all([
      env.DB.prepare("SELECT COUNT(*) AS count FROM marketplace_jobs WHERE employer_id = ? AND status = 'approved'")
        .bind(employer.id).first<{ count: number }>(),
      env.DB.prepare("SELECT COUNT(*) AS count FROM employer_interest_requests WHERE employer_id = ? AND status = 'new'")
        .bind(employer.id).first<{ count: number }>()
    ]);

    return json({
      cards: [
        `${activeJobs?.count || 0} active jobs`,
        'Matched previews are job-scoped',
        `${interests?.count || 0} interests awaiting response`,
        'No candidate exports available'
      ]
    });
  }

  const candidate = sessionUser?.candidate_id
    ? await env.DB.prepare('SELECT id, profile_completion FROM candidate_profiles WHERE id = ? LIMIT 1')
        .bind(sessionUser.candidate_id)
        .first<{ id: string; profile_completion: number }>()
    : email
    ? await env.DB.prepare(`
        SELECT cp.id, cp.profile_completion
        FROM candidate_profiles cp
        JOIN users u ON u.id = cp.user_id
        WHERE lower(u.email) = ?
        LIMIT 1
      `).bind(email).first<{ id: string; profile_completion: number }>()
      : null;

  if (!candidate) {
    return json({
      cards: ['Profile not started', '0 employer interest requests', '0 recommended jobs', '0 qualification expiry alerts']
    });
  }

  const interests = await env.DB.prepare(`
    SELECT COUNT(*) AS count FROM employer_interest_requests
    WHERE candidate_id = ? AND status IN ('new', 'viewed', 'question_sent')
  `).bind(candidate.id).first<{ count: number }>();

  return json({
    cards: [
      `Profile completion ${candidate.profile_completion || 0}%`,
      `${interests?.count || 0} employer interest requests`,
      'Recommended jobs are being calculated',
      'Qualification expiry monitoring enabled'
    ]
  });
};
