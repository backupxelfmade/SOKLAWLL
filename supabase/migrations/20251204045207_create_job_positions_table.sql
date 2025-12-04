/*
  Create Job Positions Table - Simple Structure

  1. New Tables
    - `job_positions`
      - `id` (uuid, primary key)
      - `title` (text)
      - `department` (text)
      - `location` (text)
      - `type` (text)
      - `experience` (text)
      - `description` (text)
      - `is_active` (boolean)
      - `created_at`, `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `job_positions` table
    - Add policy for public to view active job positions
    - Add policy for authenticated users to manage all job positions

  3. Performance
    - Index on is_active for filtering active jobs
*/

-- Drop existing table if any
DROP TABLE IF EXISTS job_positions CASCADE;

-- Create job_positions table
CREATE TABLE job_positions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  department text NOT NULL,
  location text DEFAULT 'Nairobi',
  type text DEFAULT 'Full-time',
  experience text NOT NULL,
  description text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for performance
CREATE INDEX idx_job_positions_active ON job_positions(is_active);

-- Enable Row Level Security
ALTER TABLE job_positions ENABLE ROW LEVEL SECURITY;

-- Allow public to view active job positions
CREATE POLICY "Public can view active jobs"
  ON job_positions FOR SELECT
  TO public
  USING (is_active = true);

-- Allow authenticated users to manage all job positions
CREATE POLICY "Authenticated users can manage jobs"
  ON job_positions FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);