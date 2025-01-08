import React from 'react';
import { Beaker } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { Potion } from '../../types/items';

interface PotionSelectorProps {
  onSelect: (potion: Potion) => void;
  onClose: () => void;
}

export const PotionSelector: React.FC<PotionSelectorProps> = ({ onSelect, onClose }) => {
  const { player } = useGame();

  // Group potions by type for display
  const potionGroups = player.potions.reduce((acc, potion) => {
    if (!acc[potion.type]) {
      acc[potion.type] = {
        ...potion,
        count: 1
      };
    } else {
      acc[potion.type].count++;
    }
    return acc;
  }, {} as Record<string, Potion & { count: number }>);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Select Potion</h3>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {Object.values(potionGroups).map((potion) => (
            <div
              key={potion.type}
              onClick={() => onSelect(potion)}
              className="bg-gray-700 p-3 rounded-lg cursor-pointer hover:bg-gray-600"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-tokora-black/50 flex items-center justify-center">
                  <Beaker className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">{potion.name}</h4>
                  <p className="text-sm text-tokora-grey">{potion.description}</p>
                </div>
                <div className="text-sm font-bold text-tokora-cyan">
                  {potion.count}x
                </div>
              </div>
            </div>
          ))}
          {player.potions.length === 0 && (
            <div className="text-center text-gray-400 py-4">
              No potions available
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};