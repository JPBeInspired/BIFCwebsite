/*
  # Job Applications System with File Uploads

  1. New Tables
    - `job_applications`
      - `id` (uuid, primary key)
      - `job_id` (uuid, references job_listings)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `resume_file_url` (text)
      - `cover_letter` (text)
      - `created_at` (timestamptz)
      - `status` (text)

  2. Storage
    - Create resumes bucket for file uploads
    
  3. Security
    - Enable RLS on job_applications table
    - Add policy for inserting applications
    - Add policy for admin access
    - Set up storage bucket policies
*/

-- Create job applications table
CREATE TABLE job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES job_listings(id),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  resume_file_url text NOT NULL,
  cover_letter text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new'
);

-- Enable RLS
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit applications
CREATE POLICY "Anyone can submit applications"
  ON job_applications
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow admin to read all applications
CREATE POLICY "Admin can read all applications"
  ON job_applications
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'jakep@beinspired.fitness');

-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false);

-- Storage policies for resumes bucket
CREATE POLICY "Anyone can upload resumes"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Admins can read resumes"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'resumes' AND
    auth.jwt() ->> 'email' = 'jakep@beinspired.fitness'
  );