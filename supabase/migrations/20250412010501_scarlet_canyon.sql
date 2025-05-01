/*
  # Update admin user password

  1. Changes
    - Update password for admin user
    - Ensure email matches existing admin
*/

-- Update the admin user's password
UPDATE auth.users
SET encrypted_password = crypt('Notday68', gen_salt('bf'))
WHERE email = 'jakep@beinspired.fitness';