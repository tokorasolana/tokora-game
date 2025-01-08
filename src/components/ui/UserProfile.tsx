import React, { useState, useRef, useEffect } from 'react';
import { User, Coins, LogOut } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { useAuth } from '../../context/AuthContext';

export const UserProfile: React.FC = () => {
  const { player } = useGame();
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    window.location.hash = ''; // Reset to menu
  };
  
  return (
    <div className="relative group" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-6 px-6 py-3 bg-tokora-black/30 rounded-lg pixel-border hover:bg-tokora-black/40 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-tokora-cyan/10 flex items-center justify-center">
            <User className="w-5 h-5 text-tokora-cyan" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-tokora-cyan">{user?.username}</span>
            {user?.isGuest && (
              <span className="text-xs text-tokora-grey">Guest Account</span>
            )}
          </div>
        </div>

        <div className="h-8 w-[1px] bg-tokora-cyan/20" />

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-tokora-gold/10 flex items-center justify-center">
            <Coins className="w-5 h-5 text-tokora-gold" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-tokora-gold">{player.tokens}</span>
            <span className="text-xs text-tokora-grey">$TOKORA</span>
          </div>
        </div>
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-tokora-black/95 rounded-lg pixel-border shadow-xl z-50">
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-3 flex items-center gap-3 text-tokora-grey hover:text-tokora-cyan hover:bg-tokora-black/50 transition-colors rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}

      {/* Glowing border effect on hover */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-tokora-cyan/0 via-tokora-cyan/20 to-tokora-gold/20 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
    </div>
  );
};