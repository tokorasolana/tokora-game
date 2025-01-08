import React from 'react';
import { Monster } from '../../types/game';
import { Shield, Swords } from 'lucide-react';

interface BattleMonsterProps {
  monster: Monster;
  currentHealth: number;
  maxHealth: number;
  mana: number;
  isPlayer?: boolean;
}

export const BattleMonster: React.FC<BattleMonsterProps> = ({
  monster,
  currentHealth,
  maxHealth,
  mana,
  isPlayer
}) => {
  const healthPercentage = (currentHealth / maxHealth) * 100;
  const manaPercentage = (mana / 100) * 100;

  return (
    <div className={`flex flex-col ${isPlayer ? 'items-start' : 'items-end'}`}>
      <div className="relative w-48 h-48 mb-4">
        <img
          src={monster.image}
          alt={monster.name}
          className={`w-full h-full object-cover rounded-lg ${isPlayer ? '' : 'transform scale-x-[-1]'}`}
        />
        <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold bg-black bg-opacity-50">
          {monster.rarity}
        </div>
      </div>

      <div className={`w-full space-y-2 ${isPlayer ? '' : 'text-right'}`}>
        <h3 className="font-bold text-lg">{monster.name}</h3>
        
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${healthPercentage}%`,
              background: `linear-gradient(to right, 
                ${healthPercentage > 50 ? '#22c55e' : healthPercentage > 20 ? '#eab308' : '#ef4444'}, 
                ${healthPercentage > 50 ? '#16a34a' : healthPercentage > 20 ? '#ca8a04' : '#dc2626'})`
            }}
          />
        </div>
        <div className="text-sm">{currentHealth} / {maxHealth} HP</div>

        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
            style={{ width: `${manaPercentage}%` }}
          />
        </div>
        <div className="text-sm">{mana} / 100 MP</div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Swords className="w-4 h-4" />
            <span>{monster.stats.attack}</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-4 h-4" />
            <span>{monster.stats.defense}</span>
          </div>
        </div>
      </div>
    </div>
  );
};