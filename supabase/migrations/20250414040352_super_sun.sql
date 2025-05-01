/*
  # Job Applications System

  1. New Tables
    - ``
      - `id` (uuid, primary key)
      - `job_id` (uuid, references job_listings)
      - `full_name` (text)
      - `email` (text)
      - `phone` (text)
      - `resume_file_url` (text)
      - `cover_letter` (text, optional)
      - `created_at` (timestamptz)
      - `status` (text)

  2. Storage
    - Create private bucket for resumes
    - Set up secure access policies

  3. Security
    - Enable RLS
    - Add policies for submissions and admin access
*/

-- Create job applications table
CREATE TABLE IF NOT EXISTS job_applicants (
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
ALTER TABLE job_applicants ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit applications
CREATE POLICY "Anyone can submit applications"
  ON job_applicants
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow admin to read all applications
CREATE POLICY "Admin can read all applications"
  ON 
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'jakep@beinspired.fitness');

-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO UPDATE
SET public = false;

-- Storage policies for resumes bucket
CREATE POLICY "Anyone can upload resumes"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Only admin can read resumes"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'resumes' AND
    auth.jwt() ->> 'email' = 'jakep@beinspired.fitness'
  );