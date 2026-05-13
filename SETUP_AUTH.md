# Authentication & Database Setup Guide

## Current Status

After login, the app tries to fetch language profiles from `/api/profiles/user`. This endpoint queries the `language_profiles` table in Supabase.

## Required Database Tables

You need to create these tables in your Supabase project:

### 1. Create `profiles` table (users)
```sql
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Create `language_profiles` table (most important)
```sql
CREATE TABLE IF NOT EXISTS language_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  language TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, language)
);
```

### 3. Create `custom_vocabulary` table
```sql
CREATE TABLE IF NOT EXISTS custom_vocabulary (
  id UUID PRIMARY KEY,
  language_profile_id UUID REFERENCES language_profiles(id) ON DELETE CASCADE NOT NULL,
  list_id TEXT NOT NULL,
  hebrew TEXT NOT NULL,
  french TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Create mastery tracking tables
```sql
CREATE TABLE IF NOT EXISTS mastery_vocabulary (
  id UUID PRIMARY KEY,
  language_profile_id UUID REFERENCES language_profiles(id) ON DELETE CASCADE NOT NULL,
  list_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(language_profile_id, list_id)
);

CREATE TABLE IF NOT EXISTS mastery_grammar (
  id UUID PRIMARY KEY,
  language_profile_id UUID REFERENCES language_profiles(id) ON DELETE CASCADE NOT NULL,
  lesson_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(language_profile_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS mastery_conjugation (
  id UUID PRIMARY KEY,
  language_profile_id UUID REFERENCES language_profiles(id) ON DELETE CASCADE NOT NULL,
  exercise_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(language_profile_id, exercise_id)
);
```

## How to Set This Up

### Option 1: Run SQL in Supabase Dashboard
1. Go to https://app.supabase.com
2. Select your project
3. Go to SQL Editor
4. Create a new query
5. Copy and paste each SQL statement above (one at a time)
6. Click "Run"

### Option 2: Use Diagnostics
Visit this URL in your browser while the app is running:
```
http://localhost:3000/api/init
```
This will show you the status of your tables.

## Testing the Flow

1. **Signup**: Create a new account with username and password
2. **Login**: Sign in with those credentials
3. **Browser Console** (F12 → Console tab): Watch the logs
   - You should see "Token exists: true"
   - Then "Fetching language profiles..."
   - Then "Languages loaded: []" (empty because you have no profiles yet)
4. **Select Language**: Click on "Hébreu" or another language
5. **Verify**: You should be redirected to the learning dashboard

## If You Get an Error

Check the browser console (F12) and look for error messages like:
- "relation 'language_profiles' does not exist" → You need to create the table
- "JWT verification failed" → Check JWT_SECRET env variable
- "Unauthorized" → Token isn't being sent properly

## Current Implementation Status

✅ Signup page created  
✅ Login page created  
✅ API endpoints for auth created  
✅ API endpoints for language profiles created  
✅ Home page with language selection  
✅ Token storage in localStorage  
✅ Error logging added  

⏳ Database tables (you need to create these)
