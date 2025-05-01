/*
  # Blog System

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `excerpt` (text)
      - `content` (text)
      - `featured_image` (text)
      - `author_id` (uuid)
      - `category_id` (uuid)
      - `published_at` (timestamptz)
      - `reading_time` (integer)
      - `meta_title` (text)
      - `meta_description` (text)
      - `tags` (text[])
      - `status` (text)
    
    - `blog_categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `description` (text)

    - `blog_authors`
      - `id` (uuid, primary key)
      - `name` (text)
      - `role` (text)
      - `avatar` (text)
      - `bio` (text)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Create blog authors table
CREATE TABLE blog_authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  avatar text NOT NULL,
  bio text NOT NULL
);

-- Create blog categories table
CREATE TABLE blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL
);

-- Create blog posts table
CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  featured_image text NOT NULL,
  author_id uuid REFERENCES blog_authors(id) NOT NULL,
  category_id uuid REFERENCES blog_categories(id) NOT NULL,
  published_at timestamptz DEFAULT now(),
  reading_time integer NOT NULL,
  meta_title text,
  meta_description text,
  tags text[] DEFAULT '{}',
  status text DEFAULT 'draft'
);

-- Enable RLS
ALTER TABLE blog_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public can read authors"
  ON blog_authors
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read categories"
  ON blog_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can read published posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (status = 'published');

-- Admin write access policies
CREATE POLICY "Admin can manage authors"
  ON blog_authors
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'jakep@beinspired.fitness')
  WITH CHECK (auth.jwt() ->> 'email' = 'jakep@beinspired.fitness');

CREATE POLICY "Admin can manage categories"
  ON blog_categories
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'jakep@beinspired.fitness')
  WITH CHECK (auth.jwt() ->> 'email' = 'jakep@beinspired.fitness');

CREATE POLICY "Admin can manage posts"
  ON blog_posts
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'jakep@beinspired.fitness')
  WITH CHECK (auth.jwt() ->> 'email' = 'jakep@beinspired.fitness');