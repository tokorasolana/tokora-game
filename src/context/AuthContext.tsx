import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  username: string;
  solanaAddress?: string;
  isGuest: boolean;
}

interface AuthContextType {
  user: User | null;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string, solanaAddress?: string) => Promise<void>;
  signInAsGuest: () => void;
  signOut: () => Promise<void>;
  loading: boolean;
  error: string | null;
  checkUsername: (username: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const session = supabase.auth.getSession();
    if (session) {
      loadUserData();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUserData = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profile) {
        setUser({
          id: profile.id,
          username: profile.username,
          solanaAddress: profile.solana_address,
          isGuest: false
        });
      }
    }
    setLoading(false);
  };

  const checkUsername = async (username: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single();

      if (error && error.code === 'PGRST116') {
        return true;
      }
      return !data;
    } catch (err) {
      console.error('Error checking username:', err);
      return false;
    }
  };

  const signUp = async (username: string, password: string, solanaAddress?: string) => {
    try {
      setError(null);
      setLoading(true);

      if (username.length < 3) {
        throw new Error('Username must be at least 3 characters long');
      }

      const isAvailable = await checkUsername(username);
      if (!isAvailable) {
        throw new Error('Username already taken');
      }

      const { data: { user: authUser }, error: signUpError } = await supabase.auth.signUp({
        email: `${username.toLowerCase()}@tokora.game`,
        password
      });

      if (signUpError) throw signUpError;
      if (!authUser) throw new Error('Failed to create user');

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authUser.id,
            username,
            solana_address: solanaAddress,
            game_data: {
              id: authUser.id,
              tokens: 0,
              monsters: [],
              inventory: [],
              listedMonsters: [],
              potions: []
            }
          }
        ]);

      if (profileError) {
        await supabase.auth.signOut();
        throw new Error('Failed to create profile');
      }

      await loadUserData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign up');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      setError(null);
      setLoading(true);

      const { data: { user: authUser }, error: signInError } = await supabase.auth.signInWithPassword({
        email: `${username.toLowerCase()}@tokora.game`,
        password
      });

      if (signInError) throw signInError;
      if (!authUser) throw new Error('Failed to sign in');

      await loadUserData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInAsGuest = () => {
    // Clear shop state when signing in as guest
    localStorage.removeItem('tokora_shop_state');
    
    setUser({
      id: crypto.randomUUID(),
      username: `Guest_${Math.floor(Math.random() * 10000)}`,
      isGuest: true
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        signIn, 
        signUp,
        signInAsGuest, 
        signOut,
        loading,
        error,
        checkUsername
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};