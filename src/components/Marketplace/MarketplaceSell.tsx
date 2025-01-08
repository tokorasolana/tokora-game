import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { Monster } from '../../types/game';
import { MonsterCard } from '../MonsterCard';

export const MarketplaceSell: React.FC = () => {
  const { player, listMonsterForSale } = useGame();
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  const [price, setPrice] = useState<string>('');

  const availableMonsters = player.monsters.filter(
    monster => !player.listedMonsters.includes(monster.id)
  );

  const handleList = () => {
    if (!selectedMonster || !price || isNaN(Number(price))) return;
    
    listMonsterForSale(selectedMonster.id, Number(price));
    setSelectedMonster(null);
    setPrice('');
  };

  return (
    <div className="space-y-6">
      {selectedMonster ? (
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4">List Monster for Sale</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <MonsterCard monster={selectedMonster} />
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price in $TOKORA
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="1"
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price..."
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleList}
                  disabled={!price || isNaN(Number(price))}
                  className="flex-1 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  List for Sale
                </button>
                <button
                  onClick={() => setSelectedMonster(null)}
                  className="flex-1 py-2 px-4 rounded-lg bg-gray-600 hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableMonsters.map(monster => (
            <div
              key={monster.id}
              onClick={() => setSelectedMonster(monster)}
              className="cursor-pointer"
            >
              <MonsterCard monster={monster} />
            </div>
          ))}
          {availableMonsters.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-400">
              No monsters available to list
            </div>
          )}
        </div>
      )}
    </div>
  );
}