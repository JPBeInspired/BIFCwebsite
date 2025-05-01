/*
  # Set up admin user authentication

  1. Changes
    - Create admin user with correct credentials
    - Set proper role and permissions
    - Update RLS policies

  2. Security
    - Ensures admin has proper access rights
    - Sets up RLS policies correctly
*/

-- Create the admin user with proper credentials
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'jakep@beinspired.fitness',
  crypt('Beinspired2024!', gen_salt('bf')),
  now(),
  now(),
  now(),
  '{"provider": "email", "providers": ["email"], "role": "admin"}',
  '{"role": "admin"}',
  now(),
  now(),
  '',
  '',
  '',
  ''
);

-- Update RLS policies to use the new admin email
DROP POLICY IF EXISTS "Admin can manage all jobs" ON job_listings;

CREATE POLICY "Admin can manage all jobs"
  ON job_listings
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'jakep@beinspired.fitness')
  WITH CHECK (auth.jwt() ->> 'email' = 'jakep@beinspired.fitness');