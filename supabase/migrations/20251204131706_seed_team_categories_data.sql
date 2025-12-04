/*
  # Seed team categories data

  1. Data Insertion
    - Insert default categories: Partners, Consulting Partners, Associates, Administrative staff, Assistants
    - Each category has a display order to control how they appear on the site
    - All categories are active by default
  
  2. Notes
    - Uses ON CONFLICT to avoid errors if categories already exist
    - Display order determines the sequence on the team page
*/

-- Insert default team categories
INSERT INTO team_categories (name, display_order, is_active)
VALUES
  ('Partners', 1, true),
  ('Consulting Partners', 2, true),
  ('Associates', 3, true),
  ('Administrative staff', 4, true),
  ('Assistants', 5, true)
ON CONFLICT (name) 
DO UPDATE SET 
  display_order = EXCLUDED.display_order,
  is_active = EXCLUDED.is_active,
  updated_at = now();