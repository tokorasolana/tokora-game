import React from 'react';
import { useGame } from '../../context/GameContext';
import { Shield, Swords, Heart, Wind } from 'lucide-react';
import { getEquipmentImage } from '../../config/equipmentMedia';
import { cn } from '../../utils/cn';

const rarityColors = {
  'common': 'border-gray-500',
  'rare': 'border-blue-500',
  'ultra rare': 'border-purple-500',
  'legendary': 'border-yellow-500'
};

export const EquipmentInventory: React.FC = () => {
  const { player } = useGame();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Equipment</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {player.inventory.map(equipment => {
          const equipmentImage = getEquipmentImage(equipment);
          
          return (
            <div 
              key={equipment.id}
              className={cn(
                "bg-gray-800 rounded-lg overflow-hidden border-2",
                rarityColors[equipment.rarity],
                equipment.rarity === 'legendary' && [
                  "before:absolute before:inset-[-4px] before:rounded-lg before:animate-glow-slow",
                  "before:bg-gradient-to-r before:from-yellow-500/50 before:via-yellow-200/50 before:to-yellow-500/50",
                  "after:absolute after:inset-[-4px] after:rounded-lg after:animate-glow-slow after:delay-500",
                  "after:bg-gradient-to-r after:from-yellow-500/30 after:via-yellow-200/30 after:to-yellow-500/30",
                  "shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                ]
              )}
            >
              {/* Image Container */}
              {equipmentImage && (
                <div className="w-full aspect-square bg-tokora-black/50">
                  <img
                    src={equipmentImage}
                    alt={equipment.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{equipment.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-black bg-opacity-50">
                      {equipment.type}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-black bg-opacity-50">
                      {equipment.rarity}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {equipment.stats.attack && (
                    <div className="flex items-center gap-2">
                      <Swords className="w-4 h-4" />
                      <span>+{equipment.stats.attack}</span>
                    </div>
                  )}
                  {equipment.stats.defense && (
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>+{equipment.stats.defense}</span>
                    </div>
                  )}
                  {equipment.stats.health && (
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      <span>+{equipment.stats.health}</span>
                    </div>
                  )}
                  {equipment.stats.speed && (
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4" />
                      <span>+{equipment.stats.speed}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {player.inventory.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-400">
            No equipment yet! Visit the shop to buy some.
          </div>
        )}
      </div>
    </div>
  );
};