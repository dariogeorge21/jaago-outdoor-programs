-- Create tables for three events
-- Run this script in your Supabase SQL Editor

-- Coffee with Bishop registrations
CREATE TABLE IF NOT EXISTS coffee_with_bishop_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  state TEXT NOT NULL,
  questions TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Meet the Strangers registrations
CREATE TABLE IF NOT EXISTS meet_the_strangers_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  state TEXT NOT NULL,
  questions TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blessed Banquet registrations
CREATE TABLE IF NOT EXISTS blessed_banquet_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  state TEXT NOT NULL,
  questions TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE coffee_with_bishop_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE meet_the_strangers_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE blessed_banquet_registrations ENABLE ROW LEVEL SECURITY;

-- INSERT Policy: Allow public/anonymous users to insert
CREATE POLICY "Allow public insert" ON coffee_with_bishop_registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public insert" ON meet_the_strangers_registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow public insert" ON blessed_banquet_registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- SELECT Policy: Only authenticated users can read
CREATE POLICY "Allow authenticated select" ON coffee_with_bishop_registrations
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated select" ON meet_the_strangers_registrations
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated select" ON blessed_banquet_registrations
  FOR SELECT TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_coffee_created_at ON coffee_with_bishop_registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_coffee_email ON coffee_with_bishop_registrations(email);

CREATE INDEX IF NOT EXISTS idx_strangers_created_at ON meet_the_strangers_registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_strangers_email ON meet_the_strangers_registrations(email);

CREATE INDEX IF NOT EXISTS idx_banquet_created_at ON blessed_banquet_registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_banquet_email ON blessed_banquet_registrations(email);

