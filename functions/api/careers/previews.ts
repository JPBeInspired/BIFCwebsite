import { Env, error, json } from '../../_lib/http';

const SAFE_PREVIEW_SELECT = `
  cp.id,
  cp.first_name,
  substr(cp.surname, 1, 1) AS surname_initial,
  cp.headline,
  cp.state,
  cp.career_summary,
  cp.career_status,
  cp.profile_completion,
  cjm.match_score,
  cjm.match_reasons
`;

function parseMatchReasons(value: unknown) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(String(value));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const url = new URL(request.url);
  const jobId = url.searchParams.get('job_id');

  if (!jobId) return error('job_id is required', 400);

  const { results } = await env.DB.prepare(`
    SELECT ${SAFE_PREVIEW_SELECT}
    FROM candidate_job_matches cjm
    JOIN candidate_profiles cp ON cp.id = cjm.candidate_id
    JOIN candidate_visibility_settings cvs ON cvs.candidate_id = cp.id
    WHERE cjm.job_id = ?
      AND cp.archived_at IS NULL
      AND cvs.discovery_mode NOT IN ('hidden_from_employer_discovery', 'visible_only_when_applying')
    ORDER BY cjm.match_score DESC
    LIMIT 25
  `).bind(jobId).all<Record<string, any>>();

  const previews = (results || []).map(row => ({
    id: row.id,
    firstName: row.first_name,
    surnameInitial: row.surname_initial,
    headline: row.headline,
    broadArea: row.state,
    summary: row.career_summary,
    careerStatus: row.career_status,
    profileActivity: row.profile_completion >= 70 ? 'Active profile' : 'Profile in progress',
    matchPercentage: row.match_score,
    matchReasons: parseMatchReasons(row.match_reasons)
  }));

  return json(previews);
};
