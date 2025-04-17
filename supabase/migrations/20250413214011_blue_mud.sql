/*
  # Job Applications System

  1. New Tables
    - `job_applications`
      - `id` (uuid, primary key)
      - `job_id` (uuid, references job_listings)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `resume_file_url` (text)
      - `cover_letter` (text, optional)
      - `created_at` (timestamptz)
      - `status` (text)

  2. Security
    - Enable RLS on job_applications table
    - Add policy for public submissions
    - Add policy for admin access
    - Set up storage bucket for resumes
    - Configure storage policies
*/

-- Create job applications table
CREATE TABLE IF NOT EXISTS job_applications (
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

-- Create storage bucket for resumes if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for resumes bucket
CREATE POLICY "Anyone can upload resumes"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Public can read resumes"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'resumes');