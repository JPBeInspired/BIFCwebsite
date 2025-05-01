/*
  # Blog System

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `excerpt` (text)
      - `content` (text)
      - `thumbnail_url` (text)
      - `published_at` (timestamptz)
      - `published` (boolean)

  2. Security
    - Enable RLS on blog_posts table
    - Add policy for public read access to published posts
    - Add policy for admin write access
*/

-- Create blog posts table
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  thumbnail_url text NOT NULL,
  published_at timestamptz DEFAULT now(),
  published boolean DEFAULT false
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