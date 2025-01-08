import React, { useState } from 'react';
import { Equipment } from '../../types/game';
import { Shield, Swords, Heart, Wind, Coins } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { useShop } from '../../context/ShopContext';
import { getEquipmentImage } from '../../config/equipmentMedia';
import { cn } from '../../utils/cn';

interface EquipmentCardProps {
  equipment: Equipment;
}

const rarityColors = {
  'common': 'border-gray-500',
  'rare': 'border-blue-500',
  'ultra rare': 'border-purple-500',
  'legendary': 'border-yellow-500'
};

export const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment }) => {
  const { player, addEquipment, addTokens } = useGame();
  const { isSoldOut, markAsSold } = useShop();
  const equipmentImage = getEquipmentImage(equipment);
  const [isHovered, setIsHovered] = useState(false);

  const handlePurchase = async () => {
    if (player.tokens >= equipment.price && !isSoldOut(equipment.id)) {
      await addTokens(-equipment.price);
      await addEquipment(equipment);
      markAsSold(equipment.id);
    }
  };

  const canAfford = player.tokens >= equipment.price;
  const isSold = isSoldOut(equipment.id);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative rounded-lg overflow-hidden border-4 bg-gray-800 h-full flex flex-col",
        rarityColors[equipment.rarity],
        equipment.rarity === 'legendary' && [
          "before:absolute before:inset-[-4px] before:rounded-lg before:animate-glow-slow",
          "before:bg-gradient-to-r before:from-yellow-500/50 before:via-yellow-200/50 before:to-yellow-500/50",
          "after:absolute after:inset-[-4px] after:rounded-lg after:animate-glow-slow after:delay-500",
          "after:bg-gradient-to-r after:from-yellow-500/30 after:via-yellow-200/30 after:to-yellow-500/30",
          "shadow-[0_0_15px_rgba(234,179,8,0.5)]"
        ]
      )}>
      <div className="relative z-10 flex flex-col h-full">
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

        {/* Content Container */}
        <div className="flex flex-col flex-grow p-4">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h3 className={cn(
              "font-bold",
              equipment.rarity === 'legendary' && "text-tokora-gold",
              equipment.rarity === 'ultra rare' && "text-tokora-purple",
              equipment.rarity === 'rare' && "text-tokora-blue"
            )}>
              {equipment.name}
            </h3>
            <span className={cn(
              "text-xs px-2 py-1 rounded-full bg-black bg-opacity-50",
              equipment.rarity === 'legendary' && "text-tokora-gold",
              equipment.rarity === 'ultra rare' && "text-tokora-purple",
              equipment.rarity === 'rare' && "text-tokora-blue"
            )}>
              {equipment.rarity}
            </span>
          </div>
          
          {/* Stats */}
          <div className="space-y-2 flex-grow mb-4">
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

          {/* Buy Button */}
          <button
            onClick={handlePurchase}
            disabled={!canAfford || isSold}
            className={cn(
              "w-full py-3 px-4 rounded-lg font-bold transition-all duration-300",
              "relative overflow-hidden group",
              isSold
                ? "bg-gray-700 cursor-not-allowed text-gray-500"
                : canAfford
                  ? cn(
                      "bg-tokora-black/40 text-tokora-cyan",
                      "hover:bg-tokora-black/60",
                      "before:absolute before:inset-0 before:bg-gradient-to-r",
                      "before:from-transparent before:via-tokora-cyan/20 before:to-transparent",
                      "before:-translate-x-full before:hover:translate-x-full",
                      "before:transition-transform before:duration-1000",
                      isHovered && "before:animate-pulse"
                    )
                  : "bg-gray-700 cursor-not-allowed text-gray-500"
            )}
          >
            <div className="relative flex items-center justify-center gap-2">
              {isSold ? (
                <span>Sold Out</span>
              ) : (
                <>
                  <Coins className="w-4 h-4" />
                  <span>{equipment.price.toLocaleString()}</span>
                </>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};