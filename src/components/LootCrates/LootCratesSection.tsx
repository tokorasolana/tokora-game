import React from 'react';
import { LootCrateCard } from './LootCrateCard';

const CRATE_TYPES = [
  {
    id: 'basic',
    name: 'Basic Crate',
    cost: 10000,
    description: 'Contains a random monster with standard odds',
    color: 'from-tokora-cyan/20 to-tokora-blue/20'
  },
  {
    id: 'rare',
    name: 'Rare Crate',
    cost: 25000,
    description: 'Higher chance of rare and ultra rare monsters',
    color: 'from-tokora-purple/20 to-tokora-pink/20'
  },
  {
    id: 'legendary',
    name: 'Legendary Crate',
    cost: 100000,
    description: 'Guaranteed ultra rare or legendary monster',
    color: 'from-tokora-gold/20 to-yellow-500/20'
  }
];

export const LootCratesSection: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Loot Crates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CRATE_TYPES.map((crate) => (
          <LootCrateCard key={crate.id} {...crate} />
        ))}
      </div>
    </div>
  );
};