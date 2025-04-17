/*
  # Add headline column to job listings

  1. Changes
    - Add headline column to job_listings table
    - Make it required for all new entries
    - Update existing rows with a default value
*/

-- Add headline column
ALTER TABLE job_listings 
ADD COLUMN headline text;

-- Update existing rows with a default value from title
UPDATE job_listings 
SET headline = title 
WHERE headline IS NULL;

-- Make the column required for future entries
ALTER TABLE job_listings 
ALTER COLUMN headline SET NOT NULL;