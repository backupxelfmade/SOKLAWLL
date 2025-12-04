/*
  Update Legal Services Table Structure

  Updates the existing legal_services table to match the services structure with all needed fields.
*/

-- Add missing columns to legal_services table
DO $$
BEGIN
  -- Add color column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'legal_services' AND column_name = 'color'
  ) THEN
    ALTER TABLE legal_services ADD COLUMN color text DEFAULT 'bg-blue-50 border-blue-200';
  END IF;

  -- Add icon_color column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'legal_services' AND column_name = 'icon_color'
  ) THEN
    ALTER TABLE legal_services ADD COLUMN icon_color text DEFAULT 'text-blue-600';
  END IF;

  -- Add detailed_description column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'legal_services' AND column_name = 'detailed_description'
  ) THEN
    ALTER TABLE legal_services ADD COLUMN detailed_description text;
  END IF;

  -- Add display_order column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'legal_services' AND column_name = 'display_order'
  ) THEN
    ALTER TABLE legal_services ADD COLUMN display_order integer DEFAULT 0;
  END IF;

  -- Add why_choose_us columns (3 reasons)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'legal_services' AND column_name = 'why_choose_us_1_title'
  ) THEN
    ALTER TABLE legal_services ADD COLUMN why_choose_us_1_title text;
    ALTER TABLE legal_services ADD COLUMN why_choose_us_1_description text;
    ALTER TABLE legal_services ADD COLUMN why_choose_us_2_title text;
    ALTER TABLE legal_services ADD COLUMN why_choose_us_2_description text;
    ALTER TABLE legal_services ADD COLUMN why_choose_us_3_title text;
    ALTER TABLE legal_services ADD COLUMN why_choose_us_3_description text;
  END IF;

  -- Add process_step columns (5 steps)
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'legal_services' AND column_name = 'process_step_1_title'
  ) THEN
    ALTER TABLE legal_services ADD COLUMN process_step_1_title text;
    ALTER TABLE legal_services ADD COLUMN process_step_1_description text;
    ALTER TABLE legal_services ADD COLUMN process_step_2_title text;
    ALTER TABLE legal_services ADD COLUMN process_step_2_description text;
    ALTER TABLE legal_services ADD COLUMN process_step_3_title text;
    ALTER TABLE legal_services ADD COLUMN process_step_3_description text;
    ALTER TABLE legal_services ADD COLUMN process_step_4_title text;
    ALTER TABLE legal_services ADD COLUMN process_step_4_description text;
    ALTER TABLE legal_services ADD COLUMN process_step_5_title text;
    ALTER TABLE legal_services ADD COLUMN process_step_5_description text;
  END IF;

  -- Rename icon_name to icon if needed
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'legal_services' AND column_name = 'icon_name'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'legal_services' AND column_name = 'icon'
  ) THEN
    ALTER TABLE legal_services RENAME COLUMN icon_name TO icon;
  END IF;
END $$;

-- Update id column to text type if it's uuid
DO $$
BEGIN
  ALTER TABLE legal_services ALTER COLUMN id TYPE text;
EXCEPTION
  WHEN others THEN NULL;
END $$;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_services_slug ON legal_services(slug);
CREATE INDEX IF NOT EXISTS idx_services_active ON legal_services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_order ON legal_services(display_order);