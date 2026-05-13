-- Create users table (profiles table in your setup)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create language_profiles table
CREATE TABLE IF NOT EXISTS language_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  language TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, language)
);

-- Create custom_vocabulary table
CREATE TABLE IF NOT EXISTS custom_vocabulary (
  id UUID PRIMARY KEY,
  language_profile_id UUID REFERENCES language_profiles(id) ON DELETE CASCADE NOT NULL,
  list_id TEXT NOT NULL,
  hebrew TEXT NOT NULL,
  french TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create mastery tables
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
