import React from 'react';
import { useGame } from '../../context/GameContext';
import { MonsterCard } from '../MonsterCard';

export const MonsterInventory: React.FC = () => {
  const { player } = useGame();

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Monsters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {player.monsters.map(monster => (
          <MonsterCard key={monster.id} monster={monster} />
        ))}
        {player.monsters.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-400">
            No monsters yet! Open a loot crate to get started.
          </div>
        )}
      </div>
    </div>
  );
};