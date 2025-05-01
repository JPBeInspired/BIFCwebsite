import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ----------------------
// Contact Form Submission
// ----------------------

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
  const { error } = await supabase
    .from('contact_submissions')
    .insert([data]);

  if (error) throw error;
}

// ----------------------
// Auth
// ----------------------

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

// ----------------------
// Job Listings
// ----------------------

export async function getPublicJobListings() {
  const { data, error } = await supabase
    .from('job_listings')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getJobListings() {
  const { data, error } = await supabase
    .from('job_listings')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function createJobListing(jobData: any) {
  const { data, error } = await supabase
    .from('job_listings')
    .insert([{
      ...jobData,
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateJobListing(id: string, jobData: any) {
  const { data, error } = await supabase
    .from('job_listings')
    .update(jobData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function unpublishJob(id: string) {
  const { error } = await supabase
    .from('job_listings')
    .update({ published: false })
    .eq('id', id);

  if (error) throw error;
}

// ----------------------
// Resume Upload
// ----------------------

export async function uploadResume(file: File): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = await supabase.storage
      .from('resumes')
      .createSignedUrl(fileName, 60 * 60 * 24 * 7); // 7 days

    if (!data?.signedUrl) {
      throw new Error('Failed to get signed URL');
    }

    return data.signedUrl;
  } catch (error) {
    console.error('Error uploading resume:', error);
    throw error;
  }
}

// ----------------------
// Job Application Submission
// ----------------------

export async function submitJobApplication(applicationData: {
  job_id: string;
  full_name: string;
  email: string;
  phone: string;
  resume_file_url: string;
  cover_letter?: string;
}) {
  const { error } = await supabase
    .from('job_applicants')
    .insert([{
      ...applicationData,
      created_at: new Date().toISOString()
    }]);

  if (error) {
    console.error('❌ Supabase insert error:', error);
    throw error;
  }
}