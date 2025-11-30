# Supabase Integration Setup Guide

This guide will help you set up and manage your legal services website with Supabase backend.

## Overview

The application is now integrated with Supabase to manage:
- **Legal Services** - Dynamic content for your law firm's services
- **Team Members** - Lawyer profiles and team information
- **Real-time Synchronization** - Live updates when data changes

## Initial Setup

### 1. Database Tables

Two main tables have been created in your Supabase project:

#### `legal_services` Table
Stores all legal service information with fields:
- `id` (UUID) - Unique identifier
- `title` - Service name
- `description` - Short description
- `detailed_description` - Longer description
- `overview` - Comprehensive overview
- `icon_name` - Lucide React icon name
- `color_class` - Tailwind CSS color classes
- `icon_color_class` - Icon color Tailwind class
- `header_image` - URL to header image
- `key_services` - JSON array of service highlights
- `why_choose_us` - JSON array of reasons
- `process` - JSON array of process steps
- `sort_order` - Display order (0-based)
- `is_active` - Boolean (only active services display)
- `created_at` - Timestamp
- `updated_at` - Timestamp

#### `team_members` Table
Stores lawyer and team member profiles with fields:
- `id` (UUID) - Unique identifier
- `name` - Full name
- `role` - Job title
- `category` - Partners, Associates, Consultants, or Assistants
- `specialization` - Primary area of expertise
- `image` - URL to profile image
- `email` - Email address
- `phone` - Phone number
- `is_partner` - Boolean
- `qualifications` - JSON array
- `experience` - Years of experience
- `achievements` - JSON array
- `description` - Full biography
- `expertise` - JSON array of expertise areas
- `education` - JSON array of education
- `admissions` - JSON array of admissions
- `languages` - JSON array of spoken languages
- `sort_order` - Display order (0-based)
- `is_active` - Boolean (only active members display)
- `created_at` - Timestamp
- `updated_at` - Timestamp

### 2. Populate Initial Data

**Option A: Via Supabase Dashboard**

1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Copy and run the seed SQL file or manually insert data
4. For legal services, insert your service data
5. For team members, insert your lawyer profiles

**Option B: Via Application (Recommended)**

1. Call the seed function in your console:
```javascript
import { seedDatabase } from './src/utils/seedDatabase';
seedDatabase();
```

This will automatically populate the database from your existing data files.

## Managing Content

### Via Supabase Dashboard

1. **Login** to your Supabase project
2. **Select your project**
3. **Go to SQL Editor** tab
4. Use the Table Editor for simple CRUD operations:
   - Click on `legal_services` or `team_members` table
   - Add records: Click "+ Insert row"
   - Edit records: Click on any cell
   - Delete records: Select row and delete

### Common Operations

#### Adding a New Service

```javascript
import { servicesApi } from './src/services/servicesApi';

const newService = {
  title: 'Intellectual Property Law',
  description: 'IP protection and enforcement',
  detailed_description: 'Comprehensive IP legal services...',
  overview: 'Our IP practice...',
  icon_name: 'Shield',
  color_class: 'bg-blue-50 border-blue-200',
  icon_color_class: 'text-blue-600',
  header_image: 'https://images.pexels.com/...',
  key_services: ['Patent Registration', 'Trademark Protection', '...'],
  why_choose_us: [
    { title: 'Expertise', description: 'Deep IP knowledge...' }
  ],
  process: [
    { title: 'Assessment', description: 'Initial IP audit...' }
  ],
  sort_order: 15,
  is_active: true,
};

await servicesApi.create(newService);
```

#### Adding a New Team Member

```javascript
import { teamApi } from './src/services/teamApi';

const newMember = {
  name: 'John Doe',
  role: 'Senior Associate',
  category: 'Associates',
  specialization: 'Corporate Law',
  image: 'https://images.pexels.com/...',
  email: 'john@soklaw.co.ke',
  phone: '+254 700 123 456',
  is_partner: false,
  qualifications: ['LLB (Hons)', 'Diploma in Law'],
  experience: '5+ years',
  achievements: ['Achievement 1', 'Achievement 2'],
  description: 'John is a talented lawyer...',
  expertise: ['Corporate Law', 'Commercial Contracts'],
  education: ['University of Nairobi - LLB'],
  admissions: ['Advocate of High Court of Kenya'],
  languages: ['English', 'Swahili'],
  sort_order: 8,
  is_active: true,
};

await teamApi.create(newMember);
```

#### Updating a Service

```javascript
import { servicesApi } from './src/services/servicesApi';

const updatedData = {
  title: 'Updated Service Name',
  description: 'Updated description',
  // ... other fields
};

await servicesApi.update('service-id-here', updatedData);
```

#### Deleting a Record

Instead of deleting, **set `is_active` to false**:

```javascript
await servicesApi.update('service-id', { is_active: false });
await teamApi.update('member-id', { is_active: false });
```

This preserves your data while hiding it from the frontend.

## API Functions

### Services API (`src/services/servicesApi.ts`)

```typescript
servicesApi.fetchAll()          // Get all active services
servicesApi.fetchById(id)       // Get specific service
servicesApi.create(service)     // Create new service
servicesApi.update(id, updates) // Update service
servicesApi.delete(id)          // Delete service
servicesApi.subscribeToChanges(callback) // Real-time updates
```

### Team API (`src/services/teamApi.ts`)

```typescript
teamApi.fetchAll()              // Get all team members
teamApi.fetchByCategory(cat)    // Get members by category
teamApi.fetchById(id)           // Get specific member
teamApi.create(member)          // Create new member
teamApi.update(id, updates)     // Update member
teamApi.delete(id)              // Delete member
teamApi.subscribeToChanges(callback) // Real-time updates
```

## React Hooks

Two custom hooks handle data fetching and real-time updates:

### useServices Hook

```typescript
import { useServices } from './hooks/useServices';

const MyComponent = () => {
  const { services, loading, error } = useServices();

  if (loading) return <div>Loading services...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {services.map(service => (
        <div key={service.id}>{service.title}</div>
      ))}
    </div>
  );
};
```

### useTeamMembers Hook

```typescript
import { useTeamMembers } from './hooks/useTeamMembers';

const TeamComponent = () => {
  const { members, loading, error } = useTeamMembers();

  if (loading) return <div>Loading team...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {members.map(member => (
        <div key={member.id}>{member.name}</div>
      ))}
    </div>
  );
};
```

## Real-time Synchronization

The application uses Supabase real-time subscriptions. When you update data in the dashboard:

1. The change is made in the database
2. Supabase broadcasts the change
3. The frontend receives the update
4. Components automatically re-render with new data

**No page refresh needed!**

## Image Management

### Best Practices

1. **Use Supabase Storage** for team member photos and service images
2. **Externally Hosted Images** work too (Pexels, Unsplash, etc.)
3. **Image URLs** can be:
   - Direct image URLs
   - Supabase Storage URLs
   - Any publicly accessible image URL

### Setting Up Supabase Storage

1. Go to your Supabase Dashboard
2. Navigate to **Storage** tab
3. Create new bucket (e.g., `service-images`, `team-photos`)
4. Upload images
5. Copy the image URL and paste into the database

## Data Validation

The frontend automatically validates:
- ✓ Required fields (name, title, email)
- ✓ Email format
- ✓ URL format for images
- ✓ JSON arrays format for lists

## Security (Row Level Security - RLS)

Data is protected with policies:
- **Public Read**: Anyone can view active services and team members
- **Authenticated Update**: Only authenticated users can modify data
- **No Anonymous Write**: Only authorized users can add/edit/delete

## Fallback Mechanism

If Supabase is unavailable:
- Services component falls back to local `servicesData`
- Team component falls back to local `teamData`
- Users still see the website (with cached/default data)

## Troubleshooting

### Services/Team Not Showing

1. Check if data exists in Supabase Dashboard
2. Verify `is_active` field is `true`
3. Check browser console for errors
4. Verify `.env` variables are correct

### Real-time Updates Not Working

1. Refresh the browser
2. Check network tab for WebSocket errors
3. Verify Supabase project is running
4. Check for browser extensions blocking WebSockets

### Image Not Loading

1. Verify image URL is publicly accessible
2. Check image URL format
3. Use Supabase Storage for reliable hosting
4. Test URL in browser directly

## Next Steps

1. **Populate Data**: Use Supabase Dashboard to add your services and team
2. **Test Everything**: Visit each page to verify data loads
3. **Set Up Backups**: Enable daily backups in Supabase Dashboard
4. **Monitor Performance**: Check Supabase metrics
5. **Train Team**: Show staff how to update content via Supabase

## Support

For issues with:
- **Supabase**: Visit [supabase.com/docs](https://supabase.com/docs)
- **Application**: Check the code in `src/services/` and `src/hooks/`
- **Database**: Review schema in Supabase Dashboard

---

**Last Updated**: November 2025
**Framework**: React + TypeScript + Tailwind
**Database**: Supabase PostgreSQL
