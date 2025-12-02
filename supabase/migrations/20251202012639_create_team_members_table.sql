/*
  # Create Team Members Table

  1. New Tables
    - `team_members`
      - `id` (uuid, primary key) - Unique identifier
      - `name` (text) - Full name of team member
      - `role` (text) - Job title/position (flexible, user-defined)
      - `category` (text) - Team category (flexible, user-defined)
      - `specialization` (text) - Area of specialization
      - `image` (text) - URL to profile image
      - `email` (text) - Contact email
      - `phone` (text) - Contact phone
      - `linkedin` (text, nullable) - LinkedIn profile URL
      - `is_partner` (boolean) - Whether the member is a partner
      - `qualifications` (jsonb) - Array of qualifications
      - `experience` (text) - Years/description of experience
      - `achievements` (jsonb) - Array of achievements
      - `description` (text) - Full biography/description
      - `expertise` (jsonb) - Array of expertise areas
      - `education` (jsonb) - Array of education details
      - `admissions` (jsonb) - Array of professional admissions
      - `languages` (jsonb) - Array of languages spoken
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `team_members` table
    - Add policy for public read access (anyone can view team members)
    - Add policy for authenticated insert/update/delete (admin functionality)

  3. Important Notes
    - `role` and `category` are text fields to allow flexibility
    - Users can create new roles and categories as needed
    - JSONB used for array fields to maintain structure while allowing flexibility
*/

CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  category text NOT NULL,
  specialization text NOT NULL,
  image text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  linkedin text,
  is_partner boolean DEFAULT false,
  qualifications jsonb DEFAULT '[]'::jsonb,
  experience text,
  achievements jsonb DEFAULT '[]'::jsonb,
  description text,
  expertise jsonb DEFAULT '[]'::jsonb,
  education jsonb DEFAULT '[]'::jsonb,
  admissions jsonb DEFAULT '[]'::jsonb,
  languages jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view team members"
  ON team_members
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert team members"
  ON team_members
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update team members"
  ON team_members
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete team members"
  ON team_members
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_team_members_category ON team_members(category);
CREATE INDEX IF NOT EXISTS idx_team_members_role ON team_members(role);
CREATE INDEX IF NOT EXISTS idx_team_members_is_partner ON team_members(is_partner);