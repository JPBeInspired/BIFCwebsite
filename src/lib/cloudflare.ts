async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(path, {
    ...init,
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

export async function signIn(_email: string, _password: string) {
  return getUser();
}

export async function signOut() {
  window.location.href = '/cdn-cgi/access/logout';
}

export async function getUser() {
  const session = await apiRequest<{ authenticated: boolean; email: string | null }>('/api/session');

  if (!session.authenticated) {
    return null;
  }

  return { email: session.email };
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
