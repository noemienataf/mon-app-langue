# Authentication Implementation Checklist

## ✅ Completed Components

### Frontend Pages
- [x] `/app/auth/login/page.tsx` - Login form with token storage
- [x] `/app/auth/signup/page.tsx` - Signup form  
- [x] `/app/page.tsx` - Main page with language selection and learning dashboard

### Backend API Routes  
- [x] `/app/api/auth/login/route.ts` - Login endpoint
- [x] `/app/api/auth/signup/route.ts` - Signup endpoint
- [x] `/app/api/auth/logout/route.ts` - Logout endpoint (if needed)
- [x] `/app/api/profiles/user/route.ts` - Get user's language profiles
- [x] `/app/api/profiles/user/language/route.ts` - Create/select language profile

### Utilities & Helpers
- [x] `/app/utils/auth.ts` - Session management functions
- [x] `/app/utils/supabaseClient.ts` - Supabase client configuration
- [x] `.env.local` - Environment variables configured

### Database Diagnostics
- [x] `/app/api/init/route.ts` - Diagnostic endpoint (GET `/api/init`)
- [x] `SETUP_AUTH.md` - Setup instructions with SQL

## ⏳ Next Steps (CRITICAL)

### 1. Create Database Tables
Visit your Supabase dashboard and run these SQL commands:

**Go to:** https://app.supabase.com → Your Project → SQL Editor → New Query

**Copy and paste each SQL block:**

```sql
-- Table 1: profiles (users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

```sql
-- Table 2: language_profiles (MOST IMPORTANT)
CREATE TABLE IF NOT EXISTS language_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  language TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, language)
);
```

```sql
-- Table 3: custom_vocabulary
CREATE TABLE IF NOT EXISTS custom_vocabulary (
  id UUID PRIMARY KEY,
  language_profile_id UUID REFERENCES language_profiles(id) ON DELETE CASCADE NOT NULL,
  list_id TEXT NOT NULL,
  hebrew TEXT NOT NULL,
  french TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

```sql
-- Table 4: mastery_vocabulary
CREATE TABLE IF NOT EXISTS mastery_vocabulary (
  id UUID PRIMARY KEY,
  language_profile_id UUID REFERENCES language_profiles(id) ON DELETE CASCADE NOT NULL,
  list_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(language_profile_id, list_id)
);
```

```sql
-- Table 5: mastery_grammar  
CREATE TABLE IF NOT EXISTS mastery_grammar (
  id UUID PRIMARY KEY,
  language_profile_id UUID REFERENCES language_profiles(id) ON DELETE CASCADE NOT NULL,
  lesson_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(language_profile_id, lesson_id)
);
```

```sql
-- Table 6: mastery_conjugation
CREATE TABLE IF NOT EXISTS mastery_conjugation (
  id UUID PRIMARY KEY,
  language_profile_id UUID REFERENCES language_profiles(id) ON DELETE CASCADE NOT NULL,
  exercise_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(language_profile_id, exercise_id)
);
```

### 2. Test the Diagnostic
After creating the tables, visit:
```
http://localhost:3000/api/init
```

You should see:
```json
{
  "supabase_url": "configured",
  "supabase_key": "configured",
  "tables": {
    "profiles": "OK",
    "language_profiles": "OK"
  }
}
```

### 3. Test the Full Flow
1. Clear your browser's Local Storage (F12 → Application → Local Storage → Delete `authToken`)
2. Go to http://localhost:3000
3. You should redirect to `/auth/login`
4. Click "Inscris-toi" to signup
5. Create account with:
   - Username: `testuser`
   - Password: `password123`
6. Click "Connexion" button
7. Select a language (Hébreu, Portugais, etc.)
8. You should see the learning dashboard
9. Open browser console (F12) and check for messages like "Languages loaded: [...]"

## 🐛 Troubleshooting

If you see a blank page after login:

1. **Open browser console** (F12 → Console tab)
2. **Look for these messages:**
   - "Token exists: true" ✅ (token saved correctly)
   - "Fetching language profiles..." ✅ (API call started)
   - "Response status: 200" ✅ (API response received)
   - Error messages like "relation 'language_profiles' does not exist" ❌ (table doesn't exist)

3. **Check the error display:**
   - The page should show the error message at the top
   - If you don't see the error, check if `screen` is stuck in 'loading' state

4. **Common fixes:**
   - Missing table: Create the SQL tables above
   - JWT error: Check `.env.local` has correct values
   - Token not saving: Check if localStorage is enabled in browser
   - CORS error: Unlikely with this setup, but check browser console

## 📋 File Structure Summary

```
/app
├── auth/
│   ├── login/page.tsx          ✅
│   └── signup/page.tsx         ✅
├── api/
│   ├── auth/
│   │   ├── login/route.ts      ✅
│   │   ├── signup/route.ts     ✅
│   │   └── logout/route.ts     ✅
│   ├── profiles/
│   │   └── user/
│   │       ├── route.ts        ✅ (GET /api/profiles/user)
│   │       └── language/route.ts ✅ (POST /api/profiles/user/language)
│   └── init/route.ts           ✅ (Diagnostics endpoint)
├── page.tsx                    ✅ (Language selection + learning dashboard)
├── utils/
│   ├── auth.ts                 ✅ (Session management)
│   └── supabaseClient.ts       ✅
└── [other existing pages]      ✅

/DATABASE_SETUP.sql            - SQL commands (copy to Supabase)
/SETUP_AUTH.md                 - Setup guide
/CHECKLIST.md                  - This file
```

## Next Action

1. Copy the SQL commands above
2. Paste them into your Supabase SQL Editor
3. Run each one
4. Visit `/api/init` to verify tables exist
5. Test the login flow

Once tables are created, the authentication system should work end-to-end! 🎉
