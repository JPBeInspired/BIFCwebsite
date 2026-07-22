async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(path, {
    ...init,
    credentials: 'same-origin',
    headers: {
      ...(init.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(init.headers || {})
    }
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.error || `Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source: string;
  product_id?: string;
  business_name?: string;
  prefer_call?: boolean;
}

export async function submitContactForm(data: ContactSubmission) {
  return apiRequest<{ success: boolean }>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function signIn(email: string, password: string) {
  await apiRequest<{ authenticated: boolean; email: string | null }>('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  return getUser();
}

export async function signOut() {
  await apiRequest<{ success: boolean }>('/api/logout', { method: 'POST' });
}

export async function getUser() {
  const session = await apiRequest<{
    authenticated: boolean;
    admin?: boolean;
    email: string | null;
    employer_id?: string | null;
    candidate_id?: string | null;
  }>('/api/session');

  if (!session.authenticated) {
    return null;
  }

  return {
    email: session.email,
    admin: Boolean(session.admin),
    employer_id: session.employer_id || null,
    candidate_id: session.candidate_id || null
  };
}

export async function getPublicJobListings() {
  return apiRequest<any[]>('/api/jobs');
}

export async function getJobListing(id: string) {
  return apiRequest<any>(`/api/jobs/${encodeURIComponent(id)}`);
}

export async function getJobListings() {
  return apiRequest<any[]>('/api/jobs?admin=true');
}

export async function getAdminJobListing(id: string) {
  return apiRequest<any>(`/api/admin/jobs/${encodeURIComponent(id)}`);
}

export async function createJobListing(jobData: any) {
  return apiRequest<any>('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(jobData)
  });
}

export async function updateJobListing(id: string, jobData: any) {
  return apiRequest<any>(`/api/admin/jobs/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(jobData)
  });
}

export async function unpublishJob(id: string) {
  return apiRequest<{ success: boolean }>(`/api/admin/jobs/${encodeURIComponent(id)}`, {
    method: 'PATCH'
  });
}

export async function submitJobApplication(applicationData: {
  job_id: string;
  full_name: string;
  email: string;
  phone: string;
  resume_file: File;
  cover_letter?: string;
}) {
  const formData = new FormData();
  formData.append('job_id', applicationData.job_id);
  formData.append('full_name', applicationData.full_name);
  formData.append('email', applicationData.email);
  formData.append('phone', applicationData.phone);
  formData.append('cover_letter', applicationData.cover_letter || '');
  formData.append('resume_file', applicationData.resume_file);

  return apiRequest<{ success: boolean; id: string }>('/api/applications', {
    method: 'POST',
    body: formData
  });
}

export async function registerCareersCandidate(data: {
  first_name: string;
  surname: string;
  email: string;
  mobile?: string;
  state?: string;
  suburb?: string;
  career_status?: string;
  password: string;
  accepted_terms: boolean;
}) {
  return apiRequest<{ success: boolean; user_id: string; candidate_id: string }>('/api/careers/candidate-register', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      policy_version_id: 'collection-notice-v0'
    })
  });
}

export async function registerCareersEmployer(data: {
  trading_name: string;
  legal_business_name: string;
  abn?: string;
  contact_name?: string;
  contact_email: string;
  contact_title?: string;
  website?: string;
  employer_type?: string;
  public_description?: string;
  password: string;
  accepted_terms: boolean;
}) {
  return apiRequest<{ success: boolean; user_id: string; employer_id: string }>('/api/careers/employer-register', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      policy_version_id: 'employer-terms-v0'
    })
  });
}

export async function getCareersDashboard(role: 'candidate' | 'employer' | 'admin') {
  return apiRequest<{ cards: string[]; recent?: any[] }>(`/api/careers/dashboard?role=${encodeURIComponent(role)}`);
}

export async function getLimitedCandidatePreviews(jobId = 'demo') {
  return apiRequest<any[]>(`/api/careers/previews?job_id=${encodeURIComponent(jobId)}`);
}

export async function submitEmployerInterest(data: {
  employer_id: string;
  job_id: string;
  candidate_id: string;
  requested_by_user_id: string;
  message?: string;
}) {
  return apiRequest<{ success: boolean; id: string }>('/api/careers/interest', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function approveCandidateDisclosure(data: {
  candidate_id: string;
  employer_id: string;
  job_id: string;
  interest_request_id?: string;
  approved_fields: string[];
  optional_fields?: string[];
}) {
  return apiRequest<{ success: boolean; id: string }>('/api/careers/disclosures', {
    method: 'POST',
    body: JSON.stringify({
      ...data,
      statement_version: 'candidate-disclosure-v0'
    })
  });
}

export async function getAdminBlogPosts() {
  return apiRequest<any[]>('/api/admin/blog');
}

export async function getAdminBlogPost(id: string) {
  return apiRequest<any>(`/api/admin/blog/${encodeURIComponent(id)}`);
}

export async function createBlogPost(postData: any) {
  return apiRequest<{ id: string }>('/api/admin/blog', {
    method: 'POST',
    body: JSON.stringify(postData)
  });
}

export async function updateBlogPost(id: string, postData: any) {
  return apiRequest<{ success: boolean }>(`/api/admin/blog/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(postData)
  });
}

export async function deleteBlogPost(id: string) {
  return apiRequest<{ success: boolean }>(`/api/admin/blog/${encodeURIComponent(id)}`, {
    method: 'DELETE'
  });
}
