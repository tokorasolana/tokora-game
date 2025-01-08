import React, { useState, useEffect } from 'react';
import { Shop } from '../Shop/Shop';
import { BattleArena } from '../Battle/BattleArena';
import { Marketplace } from '../Marketplace/Marketplace';
import { MenuLayout } from '../Menu/MenuLayout';
import { InventorySection } from '../Inventory/InventorySection';
import { LootCratesSection } from '../LootCrates/LootCratesSection';
import { WalletSection } from '../Wallet/WalletSection';
import { UserProfile } from '../ui/UserProfile';
import { useAuth } from '../../context/AuthContext';
import { GuestRestrictionPopup } from '../auth/GuestRestrictionPopup';
import { RetroCard } from '../ui/RetroCard';
import { Lock, Twitter } from 'lucide-react';

export const GameLayout: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('menu');
  const [showGuestRestriction, setShowGuestRestriction] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.slice(1);
      if (user?.isGuest && (hash === 'wallet' || hash === 'marketplace')) {
        setShowGuestRestriction(true);
        window.location.hash = '';
        return;
      }
      setActiveSection(hash || 'menu');
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, [user?.isGuest]);

  const renderContent = () => {
    if (user?.isGuest && (activeSection === 'wallet' || activeSection === 'marketplace')) {
      return (
        <RetroCard className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-tokora-cyan/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-tokora-cyan" />
            </div>
            <h3 className="text-xl font-bold">Feature Restricted</h3>
            <p className="text-tokora-grey max-w-md">
              {activeSection === 'wallet' 
                ? 'The wallet feature is only available for registered users. Please sign in with your account to access wallet functionality.'
                : 'The marketplace is only available for registered users. Please sign in with your account to trade monsters.'}
            </p>
          </div>
        </RetroCard>
      );
    }

    switch (activeSection) {
      case 'battle':
        return <BattleArena />;
      case 'inventory':
        return <InventorySection />;
      case 'lootcrates':
        return <LootCratesSection />;
      case 'shop':
        return <Shop />;
      case 'marketplace':
        return <Marketplace />;
      case 'wallet':
        return <WalletSection />;
      default:
        return <MenuLayout />;
    }
  };

  return (
    <div className="min-h-screen bg-tokora-black text-white">
      {/* Header */}
      <header className="bg-tokora-black/80 backdrop-blur-sm sticky top-0 z-50 border-b border-tokora-cyan/20">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                window.location.hash = '';
                setActiveSection('menu');
              }}
              className="retro-text text-2xl hover:scale-105 transition-transform"
            >
              Tokora
            </button>
            <a
              href="https://x.com/Tokora_Solana"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-tokora-cyan/10 hover:bg-tokora-cyan/20 transition-colors"
            >
              <Twitter className="w-4 h-4 text-tokora-cyan" />
            </a>
          </div>
          <div className="flex items-center gap-4">
            <UserProfile />
            {!user?.isGuest && user?.solanaAddress && (
              <span className="text-sm text-tokora-grey">
                {user.solanaAddress.slice(0, 6)}...{user.solanaAddress.slice(-4)}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {renderContent()}
        </div>
      </main>

      {showGuestRestriction && (
        <GuestRestrictionPopup onClose={() => setShowGuestRestriction(false)} />
      )}
    </div>
  );
};