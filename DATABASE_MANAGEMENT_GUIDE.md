# Database Management Guide

This guide explains how to manage your website content through Supabase.

## Overview

Your website data is now stored in three main tables that you can easily edit via the Supabase dashboard:

1. **services** - Legal services offered
2. **team_members** - Team member profiles
3. **job_positions** - Career opportunities

All tables use simple text fields instead of complex JSON, making it easy to update content directly in Supabase.

---

## Table: `services`

Stores information about legal services offered by the firm.

### Key Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | text | Unique identifier (slug format) | `civil-criminal-litigation` |
| `slug` | text | URL-friendly identifier | `civil-criminal-litigation` |
| `title` | text | Service name | `Civil and Criminal Litigation` |
| `icon` | text | Lucide icon name | `Scale` |
| `description` | text | Short description (1-2 sentences) | Service summary |
| `detailed_description` | text | Longer description | Extended details |
| `color` | text | Background color classes | `bg-blue-50 border-blue-200` |
| `icon_color` | text | Icon color class | `text-blue-600` |
| `overview` | text | Overview paragraph | Service overview |
| `header_image` | text | Image URL | Full image URL |
| `key_services` | text | Comma-separated list | `Civil Litigation, Criminal Defense, Appeals` |
| `is_active` | boolean | Show/hide service | `true` or `false` |
| `display_order` | integer | Display order (lower = first) | `1`, `2`, `3`, etc. |

### "Why Choose Us" Fields (3 reasons)

- `why_choose_us_1_title` - First reason title
- `why_choose_us_1_description` - First reason description
- `why_choose_us_2_title` - Second reason title
- `why_choose_us_2_description` - Second reason description
- `why_choose_us_3_title` - Third reason title
- `why_choose_us_3_description` - Third reason description

### Process Steps (5 steps)

- `process_step_1_title` / `process_step_1_description`
- `process_step_2_title` / `process_step_2_description`
- `process_step_3_title` / `process_step_3_description`
- `process_step_4_title` / `process_step_4_description`
- `process_step_5_title` / `process_step_5_description`

### Managing Services

**To add a new service:**
1. Go to Supabase → Table Editor → services
2. Click "Insert row"
3. Fill in required fields: `id`, `slug`, `title`, `icon`, `description`
4. Set `is_active` to `true`
5. Set `display_order` to control position
6. Add optional fields as needed

**To hide a service:**
- Set `is_active` to `false`

**To reorder services:**
- Change `display_order` values (lower numbers appear first)

**Current Services (10):**
1. Civil and Criminal Litigation
2. Alternative Dispute Resolution (ADR)
3. Commercial and Corporate Law
4. Bank Securities, Conveyancing and Real Estate Law
5. Employment and Labour Law
6. Family Law
7. Consultancy
8. Health and Medical Law
9. Finance and Banking Law
10. Insurance and Personal Injury Law

---

## Table: `team_members`

Stores team member profiles and information.

### Key Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | text | Unique identifier (slug format) | `sospeter-opondo` |
| `name` | text | Full name | `Sospeter Opondo Aming'a` |
| `role` | text | Position/title | `Co-Founder & Managing Partner` |
| `category` | text | Team category | `Partners`, `Associates`, `Consultants`, `Assistants` |
| `specialization` | text | Area of expertise | `Litigation & Dispute Resolution` |
| `image` | text | Profile image URL | Full image URL |
| `email` | text | Contact email | `sospeter@soklaw.co.ke` |
| `phone` | text | Contact phone | `0205285048` |
| `linkedin` | text | LinkedIn profile URL | Full LinkedIn URL |
| `is_partner` | boolean | Is this person a partner? | `true` or `false` |
| `experience` | text | Years of experience | `10+ years of legal practice` |
| `description` | text | Full bio/description | Full biography text |
| `is_active` | boolean | Show/hide member | `true` or `false` |
| `display_order` | integer | Display order | `1`, `2`, `3`, etc. |

### Comma-Separated Text Fields

These fields accept comma-separated values that will be displayed as lists:

- `qualifications` - Educational qualifications
  - Example: `LLB (Hons), Diploma in Law, Certified Public Secretary`

- `achievements` - Major achievements
  - Example: `Successfully led high-profile litigation, Headed legal departments, Published articles`

- `expertise` - Areas of expertise
  - Example: `Litigation & Dispute Resolution, Employment Law, Commercial Law`

- `education` - Educational background
  - Example: `University of Nairobi - Bachelor of Laws (LLB), Kenya School of Law - Postgraduate Diploma`

- `admissions` - Professional admissions
  - Example: `Advocate of the High Court of Kenya, Member of Law Society of Kenya`

- `languages` - Languages spoken
  - Example: `English, Swahili, Luo`

### Managing Team Members

**To add a new team member:**
1. Go to Supabase → Table Editor → team_members
2. Click "Insert row"
3. Fill in required fields: `id`, `name`, `role`, `category`, `specialization`, `image`, `email`, `phone`, `description`
4. Set `is_active` to `true`
5. Set `display_order` to control position within category
6. Add comma-separated values for qualifications, expertise, etc.

**Category Display Order:**
- Partners: 1-99
- Associates: 100-199
- Consultants: 200-299
- Assistants: 300-399

**To hide a team member:**
- Set `is_active` to `false`

**Current Team Members (9):**
- **Partners (4):** Sospeter Opondo, Paul Kiranga, Faith Simiyu, Angela Omuya
- **Associates (3):** Kennedy Muriuki, Geoffrey Otieno, Loise Njoroge
- **Consultants (1):** Justus Njoroge
- **Assistants (1):** Shallet Katiku

---

## Table: `job_positions`

Stores career opportunities and job postings.

### Key Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | uuid | Auto-generated unique ID | Auto-generated |
| `title` | text | Job title | `Senior Associate - Corporate Law` |
| `department` | text | Department name | `Corporate & Commercial` |
| `location` | text | Job location | `Nairobi` |
| `type` | text | Employment type | `Full-time`, `Part-time`, `Contract` |
| `experience` | text | Required experience | `5+ years` |
| `description` | text | Job description | Full job description text |
| `is_active` | boolean | Show/hide posting | `true` or `false` |
| `created_at` | timestamp | Creation date | Auto-generated |
| `updated_at` | timestamp | Last update date | Auto-updated |

### Managing Job Positions

**To add a new job posting:**
1. Go to Supabase → Table Editor → job_positions
2. Click "Insert row"
3. Fill in: `title`, `department`, `location`, `type`, `experience`, `description`
4. Set `is_active` to `true`
5. `id`, `created_at`, and `updated_at` are auto-generated

**To close a job posting:**
- Set `is_active` to `false` (keeps it in database for records)

**To delete a job posting:**
- Select the row and click delete (permanent removal)

**Current Job Postings (4):**
1. Senior Associate - Corporate Law
2. Associate - Litigation
3. Junior Associate - Conveyancing
4. Legal Secretary

---

## Tips for Managing Content

### Best Practices

1. **Always preview:** After making changes, check the live website to ensure content displays correctly
2. **Use consistent formatting:** Keep formatting consistent across similar entries
3. **Comma-separated lists:** Use commas without line breaks for multi-value fields
4. **Display order:** Use gaps (e.g., 10, 20, 30) to make reordering easier later
5. **Images:** Use stable, permanent URLs for images (preferably from a CDN or image hosting service)

### Common Tasks

**Updating team member info:**
- Navigate to team_members table
- Find the member by name or ID
- Click to edit the row
- Update desired fields
- Save changes

**Changing service order:**
- Go to services table
- Update `display_order` values
- Lower numbers appear first on the website

**Hiding content temporarily:**
- Set `is_active` to `false` instead of deleting
- This preserves the data for future use

**Bulk updates:**
- Use Supabase SQL Editor for bulk operations
- Example: Update all services with old URLs to new URLs

---

## Security & Access

### Row Level Security (RLS)

All tables have RLS enabled with the following policies:

**Public Access (Read):**
- Anyone can view active records (`is_active = true`)

**Authenticated Access (Full):**
- Authenticated Supabase users can create, read, update, and delete all records

### Managing Access

To grant someone access to edit content:
1. Go to Supabase Dashboard → Authentication → Users
2. Invite user via email or create account
3. They can then access the Table Editor to manage content

---

## Need Help?

- **Supabase Documentation:** https://supabase.com/docs
- **Table Editor Guide:** https://supabase.com/docs/guides/database/tables
- **SQL Editor:** Use for complex queries or bulk operations

---

## Data Summary

**Current Database State:**
- ✅ 10 active services
- ✅ 9 active team members
- ✅ 4 active job positions
- ✅ All tables use simple text fields
- ✅ RLS policies configured
- ✅ Ready for direct editing via Supabase dashboard
