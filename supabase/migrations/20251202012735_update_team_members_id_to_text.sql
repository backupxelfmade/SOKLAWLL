/*
  # Update Team Members ID to Text

  1. Changes
    - Drop existing team_members table
    - Recreate with text ID to match existing data format
    - This allows using slugs like 'sospeter-opondo' as IDs

  2. Important Notes
    - Using text IDs for easier matching with existing data
    - Maintains backward compatibility with static data
*/

DROP TABLE IF EXISTS team_members CASCADE;

CREATE TABLE team_members (
  id text PRIMARY KEY,
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