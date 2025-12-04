/*
  # Create team categories table

  1. New Tables
    - `team_categories`
      - `id` (uuid, primary key) - Unique identifier for each category
      - `name` (text, unique) - Category name (e.g., "Partners", "Associates")
      - `display_order` (integer) - Order in which categories should be displayed
      - `is_active` (boolean) - Whether the category is currently active
      - `created_at` (timestamptz) - When the category was created
      - `updated_at` (timestamptz) - When the category was last updated
  
  2. Security
    - Enable RLS on `team_categories` table
    - Add policy for public read access (categories are public information)
    - Restrict insert/update/delete to authenticated users only

  3. Indexes
    - Index on `display_order` for efficient sorting
    - Unique index on `name` to prevent duplicate categories
*/

-- Create the team_categories table
CREATE TABLE IF NOT EXISTS team_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE team_categories ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active categories (public data)
CREATE POLICY "Anyone can view active categories"
  ON team_categories
  FOR SELECT
  USING (is_active = true);

-- Policy: Authenticated users can view all categories
CREATE POLICY "Authenticated users can view all categories"
  ON team_categories
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Only authenticated users can insert categories
CREATE POLICY "Authenticated users can insert categories"
  ON team_categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy: Only authenticated users can update categories
CREATE POLICY "Authenticated users can update categories"
  ON team_categories
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Only authenticated users can delete categories
CREATE POLICY "Authenticated users can delete categories"
  ON team_categories
  FOR DELETE
  TO authenticated
  USING (true);

-- Create index for efficient ordering
CREATE INDEX IF NOT EXISTS idx_team_categories_display_order 
  ON team_categories(display_order);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_team_categories_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER team_categories_updated_at
  BEFORE UPDATE ON team_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_team_categories_updated_at();