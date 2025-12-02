/*
  # Create Services Table

  1. New Tables
    - `services`
      - `id` (text, primary key) - Unique identifier/slug
      - `slug` (text, unique) - URL-friendly identifier
      - `title` (text) - Service title
      - `icon` (text) - Icon name/identifier
      - `description` (text) - Short description
      - `detailed_description` (text) - Full detailed description
      - `color` (text) - Tailwind color classes for styling
      - `icon_color` (text) - Icon color classes
      - `overview` (text) - Service overview
      - `header_image` (text) - URL to header image
      - `key_services` (jsonb) - Array of key service offerings
      - `why_choose_us` (jsonb) - Array of reasons to choose this service
      - `process_steps` (jsonb) - Array of process steps
      - `faqs` (jsonb) - Array of frequently asked questions
      - `related_services` (jsonb) - Array of related service IDs
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `services` table
    - Add policy for public read access (anyone can view services)
    - Add policy for authenticated insert/update/delete (admin functionality)

  3. Important Notes
    - Using text as primary key to match existing ID format
    - JSONB used for complex nested data structures
    - All fields are flexible to allow easy editing from Supabase
*/

CREATE TABLE IF NOT EXISTS services (
  id text PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  icon text NOT NULL,
  description text NOT NULL,
  detailed_description text,
  color text DEFAULT 'bg-gray-50 border-gray-200',
  icon_color text DEFAULT 'text-gray-600',
  overview text,
  header_image text,
  key_services jsonb DEFAULT '[]'::jsonb,
  why_choose_us jsonb DEFAULT '[]'::jsonb,
  process_steps jsonb DEFAULT '[]'::jsonb,
  faqs jsonb DEFAULT '[]'::jsonb,
  related_services jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view services"
  ON services
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert services"
  ON services
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update services"
  ON services
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete services"
  ON services
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_title ON services(title);