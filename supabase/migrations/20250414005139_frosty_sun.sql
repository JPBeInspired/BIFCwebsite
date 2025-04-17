/*
  # Fix job applications system

  1. Changes
    - Create job_applicants table
    - Add proper RLS policies
    - Ensure table matches form data structure

  2. Security
    - Enable RLS
    - Allow public submissions
    - Admin-only read access
*/

-- Create job applicants table
CREATE TABLE IF NOT EXISTS job_applicants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES job_listings(id),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  resume_url text NOT NULL,
  created_at timestamptz DEFAULT now()
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
  ON job_applicants
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'jakep@beinspired.fitness');