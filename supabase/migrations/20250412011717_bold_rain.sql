/*
  # Job Listings Schema Update

  1. Changes
    - Update job_listings table to match required schema
    - Remove unused columns
    - Add new required columns
    - Update RLS policies

  2. Schema
    - id (uuid)
    - title (text)
    - location (text)
    - club_name (text)
    - job_type (text)
    - tags (text)
    - summary (text)
    - benefits (text)
    - requirements (text)
    - about_club (text)
    - created_at (timestamptz)
    - published (boolean)
*/

-- Drop existing table if it exists
DROP TABLE IF EXISTS job_listings;

-- Create job listings table with new schema
CREATE TABLE job_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  location text NOT NULL,
  club_name text NOT NULL,
  job_type text NOT NULL,
  tags text NOT NULL,
  summary text NOT NULL,
  benefits text NOT NULL,
  requirements text NOT NULL,
  about_club text NOT NULL,
  created_at timestamptz DEFAULT now(),
  published boolean DEFAULT false
);

-- Enable RLS
ALTER TABLE job_listings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published jobs
CREATE POLICY "Public can view published jobs"
  ON job_listings
  FOR SELECT
  TO public
  USING (published = true);

-- Allow admin to manage all jobs
CREATE POLICY "Admin can manage all jobs"
  ON job_listings
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'jakep@beinspired.fitness')
  WITH CHECK (auth.jwt() ->> 'email' = 'jakep@beinspired.fitness');