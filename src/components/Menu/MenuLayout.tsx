import React, { useState } from 'react';
import { MenuSection } from './MenuSection';
import { Swords, Package, ShoppingBag, Store, Gift, Wallet, Copy, Check } from 'lucide-react';

export const MenuLayout: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const sections = [
    {
      id: 'battle',
      title: 'Battle Arena',
      description: 'Challenge monsters',
      icon: Swords,
      color: 'red'
    },
    {
      id: 'inventory',
      title: 'Inventory',
      description: 'Your collection',
      icon: Package,
      color: 'blue'
    },
    {
      id: 'lootcrates',
      title: 'Loot Crates',
      description: 'Get new monsters',
      icon: Gift,
      color: 'gold'
    },
    {
      id: 'shop',
      title: 'Shop',
      description: 'Buy equipment',
      icon: ShoppingBag,
      color: 'blue'
    },
    {
      id: 'marketplace',
      title: 'Market',
      description: 'Trade monsters',
      icon: Store,
      color: 'green'
    },
    {
      id: 'wallet',
      title: 'Wallet',
      description: 'Manage tokens',
      icon: Wallet,
      color: 'cyan'
    }
  ];

  const handleCopyCA = () => {
    navigator.clipboard.writeText('b');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4">
      <div className="text-center mb-8">
        <h1 className="retro-text text-4xl mb-2">Welcome to Tokora</h1>
        <div className="flex items-center justify-center gap-2">
          <span className="text-tokora-grey">Tokora CA:</span>
          <button
            onClick={handleCopyCA}
            className="flex items-center gap-2 px-3 py-1 bg-tokora-black/30 rounded-lg hover:bg-tokora-black/40 transition-colors"
          >
            <span className="font-mono">TBA</span>
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-tokora-grey" />
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {sections.map((section) => (
          <MenuSection key={section.id} {...section} />
        ))}
      </div>
    </div>
  );
};