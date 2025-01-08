import React from 'react';
import { useGame } from '../../context/GameContext';
import { MonsterCard } from '../MonsterCard';

export const MarketplaceListings: React.FC = () => {
  const { player, cancelListing } = useGame();
  
  const listedMonsters = player.monsters.filter(
    monster => player.listedMonsters.includes(monster.id)
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listedMonsters.map(monster => (
          <div key={monster.id} className="relative">
            <MonsterCard monster={monster} />
            <button
              onClick={() => cancelListing(monster.id)}
              className="absolute top-2 left-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium"
            >
              Cancel Listing
            </button>
          </div>
        ))}
        {listedMonsters.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-400">
            You haven't listed any monsters for sale
          </div>
        )}
      </div>
    </div>
  );
}