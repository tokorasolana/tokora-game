import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Gamepad, Wallet, User, Lock, Eye, EyeOff } from 'lucide-react';
import { GuestModeWarning } from './GuestModeWarning';

type AuthMode = 'signin' | 'signup';

export const SignInPage: React.FC = () => {
  const { signIn, signUp, signInAsGuest, error, loading } = useAuth();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [solanaAddress, setSolanaAddress] = useState('');
  const [showGuestWarning, setShowGuestWarning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    try {
      if (mode === 'signin') {
        await signIn(username, password);
      } else {
        await signUp(username, password, solanaAddress);
      }
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="retro-text text-4xl text-center mb-8">Tokora</h1>
        
        <div className="retro-card">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setMode('signin')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors
                ${mode === 'signin'
                  ? 'bg-tokora-cyan/20 text-tokora-cyan'
                  : 'text-tokora-grey hover:text-tokora-cyan'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors
                ${mode === 'signup'
                  ? 'bg-tokora-cyan/20 text-tokora-cyan'
                  : 'text-tokora-grey hover:text-tokora-cyan'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-tokora-grey mb-1">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-tokora-grey" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-tokora-black/50 border border-tokora-cyan/30 rounded-lg pl-10 pr-4 py-2
                           focus:outline-none focus:border-tokora-cyan text-white"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-tokora-grey mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-tokora-grey" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-tokora-black/50 border border-tokora-cyan/30 rounded-lg pl-10 pr-12 py-2
                           focus:outline-none focus:border-tokora-cyan text-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-tokora-grey hover:text-tokora-cyan"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-tokora-grey mb-1">
                  Solana Address (Optional)
                </label>
                <div className="relative">
                  <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-tokora-grey" />
                  <input
                    type="text"
                    value={solanaAddress}
                    onChange={(e) => setSolanaAddress(e.target.value)}
                    className="w-full bg-tokora-black/50 border border-tokora-cyan/30 rounded-lg pl-10 pr-4 py-2
                             focus:outline-none focus:border-tokora-cyan text-white font-mono text-sm"
                    placeholder="Enter your Solana address"
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading}
                className="retro-button w-full flex items-center justify-center gap-2"
              >
                <User className="w-5 h-5" />
                {mode === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-tokora-cyan/30" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-tokora-black text-tokora-grey">or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowGuestWarning(true)}
                className="w-full px-4 py-2 flex items-center justify-center gap-2
                         border-2 border-tokora-cyan/30 rounded-lg text-tokora-cyan
                         hover:bg-tokora-cyan/10 transition-colors"
              >
                <Gamepad className="w-5 h-5" />
                Test as Guest
              </button>
            </div>
          </form>
        </div>
      </div>

      {showGuestWarning && (
        <GuestModeWarning
          onConfirm={() => {
            setShowGuestWarning(false);
            signInAsGuest();
          }}
          onCancel={() => setShowGuestWarning(false)}
        />
      )}
    </div>
  );
};