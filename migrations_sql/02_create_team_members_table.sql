/*
  Create Team Members Table - Simple Text Fields Only

  This table stores team member profiles.
  Lists are stored as comma-separated text values.
*/

-- Drop existing table if any
DROP TABLE IF EXISTS team_members CASCADE;

-- Create team_members table with simple text fields
CREATE TABLE team_members (
  id text PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL,
  category text NOT NULL CHECK (category IN ('Partners', 'Associates', 'Consultants', 'Assistants')),
  specialization text NOT NULL,
  image text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  linkedin text,
  is_partner boolean DEFAULT false,

  -- Comma-separated text fields for lists
  qualifications text,  -- e.g., "LLB (Hons), Diploma in Law, CPA-K"
  experience text,
  achievements text,     -- e.g., "Achievement 1, Achievement 2, Achievement 3"
  description text NOT NULL,
  expertise text,        -- e.g., "Litigation, Corporate Law, Employment Law"
  education text,        -- e.g., "University of Nairobi - LLB, Kenya School of Law"
  admissions text,       -- e.g., "Advocate High Court, LSK Member"
  languages text,        -- e.g., "English, Swahili, Kikuyu"

  -- Management fields
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_team_category ON team_members(category);
CREATE INDEX idx_team_active ON team_members(is_active);
CREATE INDEX idx_team_order ON team_members(display_order);

-- Enable Row Level Security
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Allow public to view active team members
CREATE POLICY "Public can view active team members"
  ON team_members FOR SELECT
  TO public
  USING (is_active = true);

-- Allow authenticated users to manage all team members
CREATE POLICY "Authenticated users can manage team members"
  ON team_members FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
