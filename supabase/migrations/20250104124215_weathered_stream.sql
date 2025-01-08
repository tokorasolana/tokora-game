/*
  # Update Auth Settings and Profiles
  
  1. Changes
    - Add insert policy for profiles table
    - Set default game data structure
*/

-- Add insert policy if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'profiles' 
        AND policyname = 'Users can insert own profile'
    ) THEN
        CREATE POLICY "Users can insert own profile"
            ON profiles
            FOR INSERT
            TO authenticated
            WITH CHECK (auth.uid() = id);
    END IF;
END $$;

-- Update default game data structure if needed
ALTER TABLE profiles 
ALTER COLUMN game_data 
SET DEFAULT '{
    "tokens": 0,
    "monsters": [],
    "inventory": [],
    "listedMonsters": [],
    "potions": []
}'::jsonb;