import React from 'react';
import { Monster } from '../../types/game';
import { MonsterCard } from '../MonsterCard';
import { RetroCard } from '../ui/RetroCard';

interface MonsterSelectorProps {
  monsters: Monster[];
  selectedMonsterId?: string;
  onSelect: (monster: Monster) => void;
}

export const MonsterSelector: React.FC<MonsterSelectorProps> = ({
  monsters,
  selectedMonsterId,
  onSelect
}) => {
  return (
    <div className="retro-card">
      <div className="max-h-[600px] overflow-y-auto pr-2 space-y-4">
        {monsters.map(monster => (
          <div
            key={monster.id}
            onClick={() => onSelect(monster)}
            className={`transition-transform hover:scale-[1.02] cursor-pointer
              ${selectedMonsterId === monster.id ? 'ring-2 ring-tokora-cyan rounded-lg' : ''}`}
          >
            <MonsterCard monster={monster} />
          </div>
        ))}
        {monsters.length === 0 && (
          <div className="text-center py-8 text-tokora-grey">
            No monsters available
          </div>
        )}
      </div>
    </div>
  );
};