/*
  # Job Listings System

  1. New Tables
    - `job_listings`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `location_suburb` (text)
      - `location_state` (text)
      - `club_name` (text)
      - `club_brand` (text)
      - `description` (text)
      - `employment_type` (text)
      - `tags` (text[])
      - `published_at` (timestamptz)
      - `featured` (boolean)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `created_by` (uuid, references auth.users)

  2. Security
    - Enable RLS on job_listings table
    - Add policy for public to view published jobs
    - Add policy for admin to manage all jobs
*/

-- Create job listings table
CREATE TABLE IF NOT EXISTS job_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  location_suburb text NOT NULL,
  location_state text NOT NULL,
  club_name text NOT NULL,
  club_brand text NOT NULL,
  description text NOT NULL,
  employment_type text NOT NULL,
  tags text[] DEFAULT '{}',
  published_at timestamptz,
  featured boolean DEFAULT false,
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE job_listings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published jobs
CREATE POLICY "Public can view published jobs"
  ON job_listings
  FOR SELECT
  TO public
  USING (status = 'published');

-- Allow admin to manage all jobs
CREATE POLICY "Admin can manage all jobs"
  ON job_listings
  TO authenticated
  USING (auth.uid() = 'bd1e7ce5-08ed-4f7d-964f-e7954dc14ad1')
  WITH CHECK (auth.uid() = 'bd1e7ce5-08ed-4f7d-964f-e7954dc14ad1');