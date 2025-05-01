/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text, optional)
      - `message` (text)
      - `source` (text)
      - `product_id` (text, optional)
      - `business_name` (text, optional)
      - `prefer_call` (boolean)
      - `created_at` (timestamp)
      - `status` (text)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for authenticated users to read submissions
    - Add policy for anon/authenticated users to insert submissions
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  source text NOT NULL,
  product_id text,
  business_name text,
  prefer_call boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'new'
);

-- Enable RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read submissions
CREATE POLICY "Authenticated users can read submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow anyone to insert submissions
CREATE POLICY "Anyone can insert submissions"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);