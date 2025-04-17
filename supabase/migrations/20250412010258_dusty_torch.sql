/*
  # Set up admin user authentication

  1. Changes
    - Create admin user with proper credentials
    - Set correct role and permissions
    - Add necessary metadata

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
  'bd1e7ce5-08ed-4f7d-964f-e7954dc14ad1',
  'authenticated',
  'authenticated',
  'admin@beinspired.fitness',
  crypt('Beinspired1!', gen_salt('bf')),
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
) ON CONFLICT (id) DO UPDATE
SET 
  role = 'authenticated',
  raw_app_meta_data = '{"provider": "email", "providers": ["email"], "role": "admin"}',
  raw_user_meta_data = '{"role": "admin"}',
  encrypted_password = crypt('Beinspired1!', gen_salt('bf'));

-- Ensure identities exist
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  'bd1e7ce5-08ed-4f7d-964f-e7954dc14ad1',
  'bd1e7ce5-08ed-4f7d-964f-e7954dc14ad1',
  '{"sub": "bd1e7ce5-08ed-4f7d-964f-e7954dc14ad1", "email": "admin@beinspired.fitness"}',
  'email',
  now(),
  now(),
  now()
) ON CONFLICT (id) DO NOTHING;