/*
  # Add Author Information to Blog Posts

  1. Changes
    - Add author fields to blog_post table
    - Add author_name (text)
    - Add author_title (text)
    - Add author_image (text)
    - Add author_bio (text)

  2. Security
    - Maintain existing RLS policies
*/

-- Add author fields to blog_post table
ALTER TABLE blog_post
ADD COLUMN author_name text,
ADD COLUMN author_title text,
ADD COLUMN author_image text,
ADD COLUMN author_bio text;