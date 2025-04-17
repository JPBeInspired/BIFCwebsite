/*
  # Update Resume Storage Configuration

  1. Changes
    - Set resumes bucket to private
    - Update storage policies for secure access
    - Ensure proper file access control

  2. Security
    - Only allow public upload
    - Restrict read access to admin
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Public can read resumes" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload resumes" ON storage.objects;

-- Update bucket to be private
UPDATE storage.buckets
SET public = false
WHERE id = 'resumes';

-- Create new policies
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