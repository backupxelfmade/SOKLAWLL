/*
  Add Missing Columns to Team Members Table

  Adds display_order and is_active columns that are needed for proper content management.
*/

-- Add display_order column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'team_members' AND column_name = 'display_order'
  ) THEN
    ALTER TABLE team_members ADD COLUMN display_order integer DEFAULT 0;
  END IF;
END $$;

-- Add is_active column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'team_members' AND column_name = 'is_active'
  ) THEN
    ALTER TABLE team_members ADD COLUMN is_active boolean DEFAULT true;
  END IF;
END $$;

-- Update description to be NOT NULL if needed
DO $$
BEGIN
  ALTER TABLE team_members ALTER COLUMN description SET NOT NULL;
EXCEPTION
  WHEN others THEN NULL;
END $$;

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_team_category ON team_members(category);
CREATE INDEX IF NOT EXISTS idx_team_active ON team_members(is_active);
CREATE INDEX IF NOT EXISTS idx_team_order ON team_members(display_order);