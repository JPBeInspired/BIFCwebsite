import { Env, error, json } from '../_lib/http';

const MAX_RESUME_BYTES = 10 * 1024 * 1024;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const formData = await request.formData();
  const resume = formData.get('resume_file');

  if (!(resume instanceof File)) {
    return error('Resume file is required', 400);
  }

  if (resume.size > MAX_RESUME_BYTES) {
    return error('Resume file must be 10MB or smaller', 400);
  }

  const id = crypto.randomUUID();
  const fileName = resume.name || 'resume';
  const key = `resumes/${id}/${fileName.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

  await env.RESUME_BUCKET.put(key, resume.stream(), {
    httpMetadata: {
      contentType: resume.type || 'application/octet-stream',
      contentDisposition: `attachment; filename="${fileName.replace(/"/g, '')}"`
    },
    customMetadata: {
      applicantEmail: String(formData.get('email') || '')
    }
  });

  await env.DB.prepare(`
    INSERT INTO job_applicants (
      id, job_id, full_name, email, phone, resume_file_key,
      resume_file_name, resume_file_type, resume_file_size, cover_letter,
      created_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    id,
    String(formData.get('job_id') || ''),
    String(formData.get('full_name') || ''),
    String(formData.get('email') || ''),
    String(formData.get('phone') || ''),
    key,
    fileName,
    resume.type || null,
    resume.size,
    String(formData.get('cover_letter') || ''),
    new Date().toISOString()
  ).run();

  return json({ success: true, id }, { status: 201 });
};
