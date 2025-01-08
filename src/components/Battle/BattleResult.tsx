import React from 'react';
import { Coins } from 'lucide-react';

interface BattleResultProps {
  result: {
    winner: 'player' | 'opponent';
    rewards: number;
  };
  onClose: () => void;
}

export const BattleResult: React.FC<BattleResultProps> = ({ result, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full text-center">
        <h3 className="text-2xl font-bold mb-4">
          {result.winner === 'player' ? 'Victory!' : 'Defeat!'}
        </h3>
        
        <div className="flex items-center justify-center gap-2 text-xl mb-6">
          <Coins className={`w-6 h-6 ${result.rewards > 0 ? 'text-green-500' : 'text-red-500'}`} />
          <span className={result.rewards > 0 ? 'text-green-500' : 'text-red-500'}>
            {result.rewards > 0 ? '+' : ''}{result.rewards}
          </span>
        </div>

        <button
          onClick={onClose}
          className="bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
};