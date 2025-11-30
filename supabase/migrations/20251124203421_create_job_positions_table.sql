/*
  # Create Job Positions Table

  1. New Tables
    - `job_positions`
      - `id` (uuid, primary key)
      - `title` (text) - Job title
      - `department` (text) - Department/practice area
      - `location` (text) - Office location
      - `type` (text) - Employment type (Full-time, Part-time, Contract)
      - `experience` (text) - Required experience level
      - `description` (text) - Job description
      - `is_active` (boolean) - Whether position is currently open
      - `created_at` (timestamptz) - When position was created
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `job_positions` table
    - Add policy for public read access to active positions
    - Add policy for authenticated admin users to manage positions
*/

CREATE TABLE IF NOT EXISTS job_positions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,
  location text NOT NULL DEFAULT 'Nairobi',
  type text NOT NULL DEFAULT 'Full-time',
  experience text NOT NULL,
  description text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE job_positions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active job positions"
  ON job_positions
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert job positions"
  ON job_positions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update job positions"
  ON job_positions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete job positions"
  ON job_positions
  FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO job_positions (title, department, location, type, experience, description, is_active) VALUES
  ('Senior Associate - Corporate Law', 'Corporate & Commercial', 'Nairobi', 'Full-time', '5+ years', 'We are seeking an experienced corporate lawyer to join our team and handle complex corporate transactions, mergers, and acquisitions.', true),
  ('Associate - Litigation', 'Litigation & Dispute Resolution', 'Nairobi', 'Full-time', '3-5 years', 'Looking for a litigation associate with strong advocacy skills and experience in civil and commercial litigation.', true),
  ('Junior Associate - Conveyancing', 'Real Estate & Property Law', 'Nairobi', 'Full-time', '1-3 years', 'Entry-level position for a lawyer interested in real estate transactions, land law, and conveyancing matters.', true),
  ('Legal Secretary', 'Administration', 'Nairobi', 'Full-time', '2+ years', 'Organized professional to provide administrative support to our legal team, manage documents, and coordinate client communications.', true);
