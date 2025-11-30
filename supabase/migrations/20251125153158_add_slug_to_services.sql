/*
  # Add slug field to legal_services table
  
  1. Changes
    - Add `slug` column to legal_services table
    - Add unique constraint on slug
    - Update existing services with slugs based on their titles
  
  2. Notes
    - Slugs are URL-friendly versions of service titles
    - Used for cleaner URLs (e.g., /services/civil-criminal-litigation)
*/

-- Add slug column
ALTER TABLE legal_services 
ADD COLUMN IF NOT EXISTS slug text;

-- Update existing services with slugs
UPDATE legal_services SET slug = 'civil-criminal-litigation' WHERE title = 'Civil and Criminal Litigation';
UPDATE legal_services SET slug = 'alternative-dispute-resolution' WHERE title LIKE 'Alternative Dispute Resolution%';
UPDATE legal_services SET slug = 'commercial-corporate-law' WHERE title = 'Commercial and Corporate Law';
UPDATE legal_services SET slug = 'bank-securities-conveyancing-real-estate' WHERE title LIKE 'Bank Securities%';
UPDATE legal_services SET slug = 'employment-labour-law' WHERE title = 'Employment and Labour Law';
UPDATE legal_services SET slug = 'family-law' WHERE title = 'Family Law';
UPDATE legal_services SET slug = 'consultancy' WHERE title = 'Consultancy';
UPDATE legal_services SET slug = 'health-medical-law' WHERE title = 'Health and Medical Law';
UPDATE legal_services SET slug = 'finance-banking-law' WHERE title = 'Finance and Banking Law';
UPDATE legal_services SET slug = 'insurance-personal-injury-law' WHERE title = 'Insurance and Personal Injury Law';

-- Add unique constraint on slug
ALTER TABLE legal_services 
ADD CONSTRAINT legal_services_slug_unique UNIQUE (slug);
