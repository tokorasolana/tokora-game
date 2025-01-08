import React from 'react';
import { SectionHeader } from '../ui/SectionHeader';
import { WalletBalance } from './WalletBalance';
import { WalletActions } from './WalletActions';
import { useAuth } from '../../context/AuthContext';

export const WalletSection: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <SectionHeader 
        title="Wallet" 
        subtitle="Manage your $TOKORA tokens"
      />
      
      <div className="grid md:grid-cols-2 gap-8">
        <WalletBalance />
        <div className="space-y-4">
          <div className="retro-card p-4">
            <h3 className="text-sm text-tokora-grey mb-2">Connected Address</h3>
            <div className="font-mono text-sm bg-tokora-black/50 p-3 rounded-lg break-all">
              {user?.solanaAddress}
            </div>
          </div>
          <WalletActions />
        </div>
      </div>
    </div>
  );
};