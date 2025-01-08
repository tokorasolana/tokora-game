import React from 'react';
import { Beaker } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { useShop } from '../../context/ShopContext';
import { POTION_CONFIGS } from '../../types/items';
import { RetroCard } from '../ui/RetroCard';

export const PotionShop: React.FC = () => {
  const { player, buyPotion } = useGame();
  const { isSoldOut, markAsSold } = useShop();

  const handlePurchase = (type: keyof typeof POTION_CONFIGS) => {
    if (player.tokens >= POTION_CONFIGS[type].price && !isSoldOut(`potion-${type}`)) {
      buyPotion(type);
      markAsSold(`potion-${type}`);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Health Potions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(POTION_CONFIGS).map(([type, potion]) => {
          const potionId = `potion-${type}`;
          const soldOut = isSoldOut(potionId);

          return (
            <RetroCard key={type}>
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-tokora-black/50 flex items-center justify-center">
                    <Beaker className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold">{potion.name}</h3>
                    <p className="text-sm text-tokora-grey">{potion.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => handlePurchase(type as keyof typeof POTION_CONFIGS)}
                  disabled={player.tokens < potion.price || soldOut}
                  className={`w-full py-2 px-4 rounded flex items-center justify-center gap-2
                    ${soldOut
                      ? 'bg-gray-700 cursor-not-allowed'
                      : player.tokens >= potion.price
                        ? 'bg-tokora-red hover:bg-red-600'
                        : 'bg-gray-600 cursor-not-allowed'}`}
                >
                  {soldOut ? (
                    <span>Sold Out</span>
                  ) : (
                    <>
                      <span>{potion.price}</span>
                      <span className="text-sm text-tokora-grey">$TOKORA</span>
                    </>
                  )}
                </button>
              </div>
            </RetroCard>
          );
        })}
      </div>
    </div>
  );
};