import React from 'react';
import { useGame } from '../../context/GameContext';
import { Beaker } from 'lucide-react';
import { RetroCard } from '../ui/RetroCard';
import { POTION_CONFIGS } from '../../types/items';

export const PotionInventory: React.FC = () => {
  const { player } = useGame();
  
  // Group potions by type
  const potionCounts = player.potions.reduce((acc, potion) => {
    acc[potion.type] = (acc[potion.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Potions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(potionCounts).map(([type, count]) => {
          const potionConfig = POTION_CONFIGS[type as keyof typeof POTION_CONFIGS];
          return (
            <RetroCard key={type} hover={false}>
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-tokora-black/50 flex items-center justify-center">
                    <Beaker className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold">{potionConfig.name}</h3>
                    <p className="text-sm text-tokora-grey">{potionConfig.description}</p>
                  </div>
                </div>
                <div className="text-center text-tokora-cyan font-bold">
                  {count} owned
                </div>
              </div>
            </RetroCard>
          );
        })}
        {player.potions.length === 0 && (
          <div className="col-span-full text-center py-8 text-tokora-grey">
            No potions in inventory. Visit the shop to buy some!
          </div>
        )}
      </div>
    </div>
  );
};