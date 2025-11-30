# Technical Architecture - Supabase Integration

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│              Frontend (React + TypeScript)              │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Components (Services, Team)              │  │
│  │                                                  │  │
│  │  ├─ Services.tsx (uses useServices hook)        │  │
│  │  ├─ Team.tsx (uses useTeamMembers hook)         │  │
│  │  └─ Other components                            │  │
│  └──────────────────────────────────────────────────┘  │
│                       ↓                                  │
│  ┌──────────────────────────────────────────────────┐  │
│  │       React Hooks (Real-time Management)         │  │
│  │                                                  │  │
│  │  ├─ useServices() - Fetch & subscribe changes  │  │
│  │  └─ useTeamMembers() - Fetch & subscribe       │  │
│  └──────────────────────────────────────────────────┘  │
│                       ↓                                  │
│  ┌──────────────────────────────────────────────────┐  │
│  │       API Services (Business Logic)              │  │
│  │                                                  │  │
│  │  ├─ servicesApi.ts                             │  │
│  │  │  ├─ fetchAll()                              │  │
│  │  │  ├─ fetchById(id)                           │  │
│  │  │  ├─ create(service)                         │  │
│  │  │  ├─ update(id, updates)                     │  │
│  │  │  ├─ delete(id)                              │  │
│  │  │  └─ subscribeToChanges()                    │  │
│  │  │                                             │  │
│  │  └─ teamApi.ts                                 │  │
│  │     ├─ fetchAll()                              │  │
│  │     ├─ fetchByCategory(category)               │  │
│  │     ├─ fetchById(id)                           │  │
│  │     ├─ create(member)                          │  │
│  │     ├─ update(id, updates)                     │  │
│  │     ├─ delete(id)                              │  │
│  │     └─ subscribeToChanges()                    │  │
│  └──────────────────────────────────────────────────┘  │
│                       ↓                                  │
│  ┌──────────────────────────────────────────────────┐  │
│  │      Supabase Client (@supabase/supabase-js)    │  │
│  │                                                  │  │
│  │  src/lib/supabase.ts - Singleton instance      │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                         ↓
                 HTTPS / WebSocket
                         ↓
┌─────────────────────────────────────────────────────────┐
│           Supabase Backend (PostgreSQL)                 │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Tables                              │  │
│  │                                                  │  │
│  │  ├─ legal_services                             │  │
│  │  │  ├─ id (UUID)                               │  │
│  │  │  ├─ title, description, overview            │  │
│  │  │  ├─ header_image, icon settings             │  │
│  │  │  ├─ key_services, why_choose_us (JSONB)     │  │
│  │  │  ├─ process, sort_order                     │  │
│  │  │  └─ is_active, timestamps                   │  │
│  │  │                                             │  │
│  │  └─ team_members                               │  │
│  │     ├─ id (UUID)                               │  │
│  │     ├─ name, role, category                    │  │
│  │     ├─ specialization, image, contact          │  │
│  │     ├─ qualifications, experience              │  │
│  │     ├─ expertise, education, admissions        │  │
│  │     ├─ achievements, description               │  │
│  │     ├─ languages, sort_order                   │  │
│  │     └─ is_active, timestamps                   │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │      Row Level Security (RLS) Policies           │  │
│  │                                                  │  │
│  │  ├─ Public READ on active records              │  │
│  │  └─ Authenticated WRITE access                 │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │       Real-time Subscriptions                    │  │
│  │                                                  │  │
│  │  ├─ Postgres Changes Events                    │  │
│  │  ├─ INSERT, UPDATE, DELETE tracking            │  │
│  │  └─ WebSocket broadcasting                     │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

### Initial Load
```
User visits website
        ↓
React component mounts (Services/Team)
        ↓
Hook (useServices/useTeamMembers) runs
        ↓
API function (servicesApi.fetchAll/teamApi.fetchAll)
        ↓
Supabase client query
        ↓
PostgreSQL returns data (WHERE is_active = true)
        ↓
Hook updates state
        ↓
Component re-renders with data
        ↓
Subscription established for real-time updates
```

### Real-time Update
```
User updates data in Supabase Dashboard
        ↓
PostgreSQL database updated
        ↓
Supabase broadcasts change event
        ↓
WebSocket sends update to frontend
        ↓
Subscription callback triggered
        ↓
Hook re-fetches data
        ↓
State updated
        ↓
Component automatically re-renders
        ↓
User sees new data instantly
```

### Create New Record
```
Admin adds service in Supabase Dashboard
        ↓
INSERT event in PostgreSQL
        ↓
is_active = true (visible by default)
        ↓
Subscription broadcasts change
        ↓
All connected clients notified
        ↓
Data appears on website
        ↓
No page refresh needed!
```

## File Structure

```
src/
├── lib/
│   └── supabase.ts              # Supabase client singleton
│
├── services/
│   ├── servicesApi.ts           # Services CRUD operations
│   └── teamApi.ts               # Team members CRUD operations
│
├── hooks/
│   ├── useServices.ts           # Services data hook
│   └── useTeamMembers.ts        # Team members data hook
│
├── components/
│   ├── Services.tsx             # Updated to use useServices
│   └── Team.tsx                 # Updated to use useTeamMembers
│
├── data/
│   ├── servicesData.ts          # Fallback local data
│   └── teamData.ts              # Fallback local data
│
└── utils/
    └── seedDatabase.ts          # Database seeding utility
```

## API Service Pattern

Each API service follows this pattern:

```typescript
export const apiService = {
  async fetchAll(): Promise<T[]> {
    // Query all active records
  },

  async fetchById(id: string): Promise<T | null> {
    // Query single record using maybeSingle()
  },

  async create(data: CreateType): Promise<T> {
    // Insert new record
  },

  async update(id: string, updates: PartialType): Promise<T> {
    // Update timestamp and return updated record
  },

  async delete(id: string): Promise<void> {
    // Delete record
  },

  async subscribeToChanges(callback: Function) {
    // Real-time subscription with Postgres changes
  }
};
```

## Hook Pattern

```typescript
export const useDataHook = () => {
  const [state, setState] = useState({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => { /* ... */ };
    fetchData();

    // Subscribe to real-time changes
    const subscription = apiService.subscribeToChanges(() => {
      fetchData(); // Refetch on change
    });

    // Cleanup
    return () => subscription.then(sub => sub?.unsubscribe());
  }, []);

  return state;
};
```

## Component Usage Pattern

```typescript
const MyComponent = () => {
  const { data, loading, error } = useDataHook();
  const fallbackData = defaultData;

  // Use database data if available, fallback to local data
  const displayData = data.length > 0 ? data : fallbackData;

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div>
      {displayData.map(item => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </div>
  );
};
```

## Security Architecture

### Row Level Security (RLS)

All tables have RLS enabled with policies:

**legal_services table:**
```sql
-- Public can read active services
CREATE POLICY "legal_services_read_public"
  ON legal_services FOR SELECT TO public
  USING (is_active = true);

-- Authenticated users can do anything
CREATE POLICY "legal_services_full_authenticated"
  ON legal_services FOR ALL TO authenticated
  USING (true) WITH CHECK (true);
```

**team_members table:**
```sql
-- Public can read active members
CREATE POLICY "team_members_read_public"
  ON team_members FOR SELECT TO public
  USING (is_active = true);

-- Authenticated users can do anything
CREATE POLICY "team_members_full_authenticated"
  ON team_members FOR ALL TO authenticated
  USING (true) WITH CHECK (true);
```

### Environment Variables
- `VITE_SUPABASE_URL` - Project URL (public)
- `VITE_SUPABASE_ANON_KEY` - Anon key (public but limited by RLS)

## Error Handling

### Graceful Degradation
- If Supabase is unavailable, falls back to local data
- Users see cached/default data
- Website remains functional
- Error messages shown in UI

### Error Messages
- User-friendly error messages
- Console logging for debugging
- Error state displayed to admins

## Performance Optimization

### Query Optimization
- Only fetch active records (`WHERE is_active = true`)
- Sort by `sort_order` for consistency
- Use `maybeSingle()` for single records (no error if not found)

### Real-time Performance
- Debounced subscriptions
- Minimal network traffic
- WebSocket connection reused

### Caching
- React state caching
- Browser cache for images
- Supabase connection pooling

## Scalability Considerations

- PostgreSQL handles large datasets
- JSONB fields for flexible data
- Indexes on frequently queried columns
- Horizontal scaling via Supabase infrastructure

## Backup & Recovery

- Automatic daily backups in Supabase
- Point-in-time recovery available
- Data export functionality
- Version control for schema

## Monitoring

- Supabase Dashboard for metrics
- Real-time query monitoring
- Storage usage tracking
- Error rate monitoring

## Future Enhancements

1. **Authentication UI** - Admin login for data management
2. **File Uploads** - Drag-and-drop image uploads
3. **Advanced Filtering** - Search and filter capabilities
4. **Batch Operations** - Bulk import/export
5. **Audit Logging** - Track all changes
6. **API Rate Limiting** - Protect against abuse

---

**Architecture Version**: 1.0
**Last Updated**: November 2025
**Status**: Production Ready ✓
