/*
  # Create Simplified CMS Tables

  1. New Tables
    - services_new: Simplified services table with text fields
    - team_members_new: Simplified team members table with text fields
    - careers: Job positions table (already exists, will be kept)
  
  2. Changes
    - Removes JSONB arrays in favor of comma-separated text fields
    - Makes it easier for users to update via Supabase dashboard
    - Preserves all existing data from current tables
  
  3. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage content
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS services_new CASCADE;
DROP TABLE IF EXISTS team_members_new CASCADE;

-- Create simplified services table
CREATE TABLE IF NOT EXISTS services_new (
  id text PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  icon text NOT NULL,
  description text NOT NULL,
  detailed_description text,
  color text DEFAULT 'bg-blue-50 border-blue-200',
  icon_color text DEFAULT 'text-blue-600',
  overview text,
  header_image text,
  key_services text,
  why_choose_us_1_title text,
  why_choose_us_1_description text,
  why_choose_us_2_title text,
  why_choose_us_2_description text,
  why_choose_us_3_title text,
  why_choose_us_3_description text,
  process_step_1_title text,
  process_step_1_description text,
  process_step_2_title text,
  process_step_2_description text,
  process_step_3_title text,
  process_step_3_description text,
  process_step_4_title text,
  process_step_4_description text,
  process_step_5_title text,
  process_step_5_description text,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create simplified team members table
CREATE TABLE IF NOT EXISTS team_members_new (
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
  qualifications text,
  experience text,
  achievements text,
  description text NOT NULL,
  expertise text,
  education text,
  admissions text,
  languages text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE services_new ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members_new ENABLE ROW LEVEL SECURITY;

-- Create policies for services_new
CREATE POLICY "Anyone can view active services"
  ON services_new FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage services"
  ON services_new FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for team_members_new
CREATE POLICY "Anyone can view active team members"
  ON team_members_new FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage team members"
  ON team_members_new FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Migrate data from old services table to new one
INSERT INTO services_new (
  id, slug, title, icon, description, detailed_description, color, icon_color, 
  overview, header_image, key_services,
  why_choose_us_1_title, why_choose_us_1_description,
  why_choose_us_2_title, why_choose_us_2_description,
  why_choose_us_3_title, why_choose_us_3_description,
  process_step_1_title, process_step_1_description,
  process_step_2_title, process_step_2_description,
  process_step_3_title, process_step_3_description,
  process_step_4_title, process_step_4_description,
  process_step_5_title, process_step_5_description,
  display_order
)
SELECT 
  id, slug, title, icon, description, detailed_description, color, icon_color,
  overview, header_image,
  array_to_string(ARRAY(SELECT jsonb_array_elements_text(key_services)), ', '),
  why_choose_us->0->>'title', why_choose_us->0->>'description',
  why_choose_us->1->>'title', why_choose_us->1->>'description',
  why_choose_us->2->>'title', why_choose_us->2->>'description',
  process_steps->0->>'title', process_steps->0->>'description',
  process_steps->1->>'title', process_steps->1->>'description',
  process_steps->2->>'title', process_steps->2->>'description',
  process_steps->3->>'title', process_steps->3->>'description',
  process_steps->4->>'title', process_steps->4->>'description',
  ROW_NUMBER() OVER (ORDER BY title)
FROM services;

-- Migrate data from old team_members table to new one
INSERT INTO team_members_new (
  id, name, role, category, specialization, image, email, phone, linkedin,
  is_partner, qualifications, experience, achievements, description,
  expertise, education, admissions, languages, display_order
)
SELECT 
  id, name, role, category, specialization, image, email, phone, linkedin,
  is_partner,
  array_to_string(ARRAY(SELECT jsonb_array_elements_text(qualifications)), ', '),
  experience,
  array_to_string(ARRAY(SELECT jsonb_array_elements_text(achievements)), ', '),
  description,
  array_to_string(ARRAY(SELECT jsonb_array_elements_text(expertise)), ', '),
  array_to_string(ARRAY(SELECT jsonb_array_elements_text(education)), ', '),
  array_to_string(ARRAY(SELECT jsonb_array_elements_text(admissions)), ', '),
  array_to_string(ARRAY(SELECT jsonb_array_elements_text(languages)), ', '),
  CASE category
    WHEN 'Partners' THEN ROW_NUMBER() OVER (PARTITION BY category ORDER BY name)
    WHEN 'Associates' THEN 100 + ROW_NUMBER() OVER (PARTITION BY category ORDER BY name)
    WHEN 'Consultants' THEN 200 + ROW_NUMBER() OVER (PARTITION BY category ORDER BY name)
    WHEN 'Assistants' THEN 300 + ROW_NUMBER() OVER (PARTITION BY category ORDER BY name)
  END
FROM team_members;

-- Drop old tables
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;

-- Rename new tables to replace old ones
ALTER TABLE services_new RENAME TO services;
ALTER TABLE team_members_new RENAME TO team_members;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(display_order);
CREATE INDEX IF NOT EXISTS idx_team_category ON team_members(category);
CREATE INDEX IF NOT EXISTS idx_team_active ON team_members(is_active);
CREATE INDEX IF NOT EXISTS idx_team_order ON team_members(display_order);
CREATE INDEX IF NOT EXISTS idx_careers_active ON job_positions(is_active);
