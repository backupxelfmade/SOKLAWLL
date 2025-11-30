# Quick Start Guide - Managing Your Website Content

## What Changed?

Your website now gets content from Supabase instead of hardcoded data. This means you can update services and team members without touching code!

## How It Works

1. **You update data in Supabase Dashboard**
2. **Website automatically shows the new content**
3. **No coding required!**

## 5-Minute Setup

### Step 1: Access Supabase Dashboard
- Go to https://supabase.com
- Log in with your account
- Select your project
- Go to "SQL Editor" tab

### Step 2: Populate Data

**Copy and paste this SQL to seed initial data** (or use the Table Editor):

```sql
-- Services data will be auto-populated on first app load
-- Or manually insert your services here

INSERT INTO legal_services (
  title, description, detailed_description, overview,
  icon_name, color_class, icon_color_class, header_image,
  key_services, why_choose_us, process, sort_order, is_active
) VALUES (
  'Your Service Name',
  'Short description',
  'Detailed description',
  'Full overview',
  'Scale', 'bg-blue-50 border-blue-200', 'text-blue-600',
  'https://images.pexels.com/...',
  '["Service 1", "Service 2"]'::jsonb,
  '[{"title":"Reason 1","description":"Why..."}]'::jsonb,
  '[{"title":"Step 1","description":"First..."}]'::jsonb,
  0, true
);
```

### Step 3: View Changes
- Go back to your website
- Content automatically updates!

## Managing Content

### Add a New Service
1. Supabase Dashboard → `legal_services` table
2. Click "+ Insert row"
3. Fill in the fields
4. Click Save
5. Website updates instantly ✨

### Add a Team Member
1. Supabase Dashboard → `team_members` table
2. Click "+ Insert row"
3. Fill in required fields:
   - name
   - role
   - category (Partners, Associates, Consultants, Assistants)
   - specialization
   - image (URL)
   - email
   - phone
4. Click Save
5. Team page updates instantly ✨

### Edit Existing Data
1. Find the row in the table
2. Click on any cell
3. Edit the value
4. Changes save automatically

### Hide Content (Don't Delete!)
1. Find the row
2. Change `is_active` to `false`
3. Content disappears from website
4. Data is preserved for later

### Delete Data
1. Find the row
2. Click the "..." menu
3. Select "Delete row"

## Important Fields

### For Services:
- **title** ✓ (Required) - Service name like "Corporate Law"
- **description** ✓ (Required) - 1-2 sentences
- **detailed_description** ✓ (Required) - Longer version
- **overview** ✓ (Required) - Full description
- **header_image** ✓ (Required) - Image URL
- **key_services** - List of highlights: `["Item 1", "Item 2"]`
- **why_choose_us** - Array of reasons (JSON format)
- **process** - Array of steps (JSON format)
- **sort_order** - Number (0, 1, 2...) for display order
- **is_active** - true/false to show/hide

### For Team Members:
- **name** ✓ (Required) - Full name
- **role** ✓ (Required) - Job title
- **category** ✓ (Required) - Partners, Associates, Consultants, or Assistants
- **specialization** ✓ (Required) - Main expertise
- **image** ✓ (Required) - Photo URL
- **email** ✓ (Required) - Email address
- **phone** ✓ (Required) - Phone number
- **description** ✓ (Required) - Biography
- **expertise** - List: `["Area 1", "Area 2"]`
- **education** - List: `["Degree 1", "Degree 2"]`
- **languages** - List: `["English", "Swahili"]`
- **is_active** - true/false to show/hide

## Image URLs

Use any public image URL:
- **Pexels**: https://pexels.com (free stock photos)
- **Unsplash**: https://unsplash.com (free stock photos)
- **Your own server**: Direct URL to your image
- **Supabase Storage**: Upload images and use URLs

## JSON Data Format

Some fields require special format:

### Arrays (Simple Lists)
```
["Item 1", "Item 2", "Item 3"]
```

### Objects (Key-Value)
```
[
  {"title": "Step 1", "description": "Description here"},
  {"title": "Step 2", "description": "Description here"}
]
```

**Note**: Always use double quotes and valid JSON!

## Troubleshooting

### Changes Not Appearing?
- ✓ Verify `is_active` is `true`
- ✓ Refresh browser (Ctrl+F5)
- ✓ Wait 2-3 seconds
- ✓ Check Supabase Dashboard for errors

### Error When Saving?
- ✓ Check JSON format is correct
- ✓ Verify all required fields are filled
- ✓ Check image URL is valid
- ✓ Look for typos in field names

### Page Not Loading?
- ✓ Check Supabase is online
- ✓ Verify environment variables
- ✓ Open browser console (F12) for errors

## Need Help?

- **Supabase Questions**: https://supabase.com/docs
- **JSON Format Help**: https://jsonlint.com
- **Image URLs**: Use Pexels or Unsplash

## Remember

✓ Always use valid JSON for arrays/objects
✓ Set `is_active = false` to hide instead of delete
✓ Changes appear instantly on the website
✓ Your data is automatically backed up
✓ You can't break anything - just restore data if needed

---

**Need to add a new service or team member?**
→ Supabase Dashboard → Table Editor → Click "+ Insert row"

**That's it! Your website is now dynamic! 🎉**
