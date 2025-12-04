/*
  Create Services Table - Simple Text Fields Only

  This table stores legal services information.
  All fields are plain text - no JSON for easy editing.
*/

-- Drop existing table if any
DROP TABLE IF EXISTS services CASCADE;

-- Create services table with simple text fields
CREATE TABLE services (
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

  -- Comma-separated list of services
  key_services text,

  -- Why Choose Us (3 reasons)
  why_choose_us_1_title text,
  why_choose_us_1_description text,
  why_choose_us_2_title text,
  why_choose_us_2_description text,
  why_choose_us_3_title text,
  why_choose_us_3_description text,

  -- Process Steps (5 steps)
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

  -- Management fields
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_active ON services(is_active);
CREATE INDEX idx_services_order ON services(display_order);

-- Enable Row Level Security
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Allow public to view active services
CREATE POLICY "Public can view active services"
  ON services FOR SELECT
  TO public
  USING (is_active = true);

-- Allow authenticated users to manage all services
CREATE POLICY "Authenticated users can manage services"
  ON services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
