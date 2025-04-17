/*
  # Contact Form System

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text, nullable)
      - `message` (text)
      - `source` (text) - Which form the submission came from
      - `product_id` (text, nullable) - For product/service specific enquiries
      - `business_name` (text, nullable)
      - `prefer_call` (boolean)
      - `created_at` (timestamptz)
      - `status` (text) - For tracking submission status
      
  2. Security
    - Enable RLS on contact_submissions table
    - Add policy for admin access
    - Add policy for creating new submissions
*/

-- Create contact submissions table
CREATE TABLE contact_submissions (
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

-- Allow admins to read all submissions
CREATE POLICY "Admins can read all submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@beinspired.fitness');

-- Allow anyone to create submissions
CREATE POLICY "Anyone can create submissions"
  ON contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);