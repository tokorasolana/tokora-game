import React, { useState } from 'react';
import { MarketplaceBuy } from './MarketplaceBuy';
import { MarketplaceSell } from './MarketplaceSell';
import { MarketplaceListings } from './MarketplaceListings';
import { SectionHeader } from '../ui/SectionHeader';

export const Marketplace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell' | 'listings'>('buy');

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Marketplace" 
        subtitle="Trade monsters with other players"
      />

      <div className="flex gap-4 border-b border-tokora-cyan/30">
        {(['buy', 'sell', 'listings'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 font-medium capitalize transition-colors
              ${activeTab === tab
                ? 'text-tokora-cyan border-b-2 border-tokora-cyan'
                : 'text-tokora-grey hover:text-tokora-cyan/70'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'buy' && <MarketplaceBuy />}
      {activeTab === 'sell' && <MarketplaceSell />}
      {activeTab === 'listings' && <MarketplaceListings />}
    </div>
  );
};