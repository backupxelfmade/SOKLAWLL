/*
  Create Team Members Table - Simple Text Fields Only

  1. New Tables
    - `team_members`
      - `id` (text, primary key)
      - `name` (text)
      - `role` (text)
      - `category` (text) - Partners, Associates, Consultants, Assistants
      - `specialization` (text)
      - `image` (text)
      - `email` (text)
      - `phone` (text)
      - `linkedin` (text)
      - `is_partner` (boolean)
      - `qualifications` (text) - Comma-separated list
      - `experience` (text)
      - `achievements` (text) - Comma-separated list
      - `description` (text)
      - `expertise` (text) - Comma-separated list
      - `education` (text) - Comma-separated list
      - `admissions` (text) - Comma-separated list
      - `languages` (text) - Comma-separated list
      - `display_order` (integer)
      - `is_active` (boolean)
      - `created_at`, `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `team_members` table
    - Add policy for public to view active team members
    - Add policy for authenticated users to manage all team members

  3. Performance
    - Index on category for filtering
    - Index on is_active for filtering
    - Index on display_order for sorting
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
  qualifications text,
  experience text,
  achievements text,
  description text NOT NULL,
  expertise text,
  education text,
  admissions text,
  languages text,

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