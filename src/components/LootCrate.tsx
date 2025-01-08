import React from 'react';
import { Package } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { generateMonster } from '../utils/generators';

const CRATE_COST = 500;

export const LootCrate: React.FC = () => {
  const { player, addMonster, addTokens } = useGame();

  const openCrate = () => {
    if (player.tokens < CRATE_COST) return;
    addTokens(-CRATE_COST);
    const monster = generateMonster();
    addMonster(monster);
  };

  return (
    <div className="text-center">
      <button
        onClick={openCrate}
        disabled={player.tokens < CRATE_COST}
        className={`p-6 rounded-lg flex flex-col items-center gap-4 transition-all
          ${player.tokens >= CRATE_COST 
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 cursor-pointer'
            : 'bg-gray-600 cursor-not-allowed'
          }`}
      >
        <Package className="w-12 h-12" />
        <div>
          <div className="font-bold text-xl">Open Loot Crate</div>
          <div className="text-sm opacity-75">{CRATE_COST} Tokens</div>
        </div>
      </button>
    </div>
  );
};