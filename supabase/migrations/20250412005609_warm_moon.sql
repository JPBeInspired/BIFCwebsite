/*
  # Update Admin User Permissions

  1. Changes
    - Update admin user role to 'admin'
    - Add admin role to raw_app_meta_data
    - Ensure admin has correct permissions

  2. Security
    - Only affects the specific admin user
    - Maintains existing RLS policies
*/

-- Update the admin user's role and metadata
UPDATE auth.users
SET 
  role = 'admin',
  raw_app_meta_data = jsonb_set(
    raw_app_meta_data,
    '{role}',
    '"admin"'
  )
WHERE email = 'admin@beinspired.fitness';

-- Ensure the admin user exists in public.profiles if needed
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'admin'
FROM auth.users
WHERE email = 'admin@beinspired.fitness'
ON CONFLICT (id) DO UPDATE
SET role = 'admin';