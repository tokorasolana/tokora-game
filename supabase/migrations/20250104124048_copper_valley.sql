/*
  # Update Auth Configuration
  
  1. Changes
    - Disable email confirmations
    - Enable signups
*/

-- Disable email confirmations for development
UPDATE auth.config
SET enable_signup = true,
    enable_confirmations = false;