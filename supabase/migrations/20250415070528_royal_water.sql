/*
  # Blog System Schema Update

  1. Changes
    - Create blog_posts table with correct schema
    - Enable RLS
    - Add policies for public and admin access

  2. Security
    - Public can read published posts
    - Admin can manage all posts
*/

-- Create blog posts table
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  thumbnail_url text NOT NULL,
  published boolean DEFAULT false,
  published_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read access to published posts
CREATE POLICY "Public can read published posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (published = true);

-- Admin write access
CREATE POLICY "Admin can manage posts"
  ON blog_posts
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'jakep@beinspired.fitness')
  WITH CHECK (auth.jwt() ->> 'email' = 'jakep@beinspired.fitness');