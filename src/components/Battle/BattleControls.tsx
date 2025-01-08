import React from 'react';
import { BattleAction } from '../../types/battle';
import { Swords, Wand2, ArrowLeft, Beaker } from 'lucide-react';
import { useGame } from '../../context/GameContext';

interface BattleControlsProps {
  onAction: (action: BattleAction) => void;
  disabled: boolean;
  mana: number;
  currentHealth: number;
  maxHealth: number;
}

export const BattleControls: React.FC<BattleControlsProps> = ({
  onAction,
  disabled,
  mana,
  currentHealth,
  maxHealth
}) => {
  const { player } = useGame();
  const hasHealthPotions = player.potions.length > 0;
  const isFullHealth = currentHealth === maxHealth;

  return (
    <div className="grid grid-cols-4 gap-4 mt-6">
      <button
        onClick={() => onAction('attack')}
        disabled={disabled}
        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold
          ${disabled
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700'
          }`}
      >
        <Swords className="w-5 h-5" />
        Attack
      </button>

      <button
        onClick={() => onAction('magic')}
        disabled={disabled || mana < 70}
        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold
          ${disabled || mana < 70
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
          }`}
      >
        <Wand2 className="w-5 h-5" />
        Magic
      </button>

      <button
        onClick={() => onAction('potion')}
        disabled={disabled || !hasHealthPotions || isFullHealth}
        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold
          ${disabled || !hasHealthPotions || isFullHealth
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
          }`}
      >
        <Beaker className="w-5 h-5" />
        Potion ({player.potions.length})
      </button>

      <button
        onClick={() => onAction('retreat')}
        disabled={disabled}
        className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold
          ${disabled
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800'
          }`}
      >
        <ArrowLeft className="w-5 h-5" />
        Retreat
      </button>
    </div>
  );
};