/*
  # Update betaTEST user tokens

  1. Changes
    - Updates the game_data tokens for the betaTEST user to 1,000,000
  
  2. Notes
    - Only affects the specific user with username 'betaTEST'
    - Preserves all other game data
*/

DO $$ 
BEGIN
  UPDATE profiles
  SET game_data = jsonb_set(
    game_data,
    '{tokens}',
    '1000000'
  )
  WHERE username = 'betaTEST';
END $$;