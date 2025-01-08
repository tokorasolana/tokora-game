import React from 'react';
import { Coins } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { RetroCard } from '../ui/RetroCard';

export const WalletBalance: React.FC = () => {
  const { player } = useGame();

  return (
    <RetroCard hover={false} className="flex flex-col items-center justify-center p-8">
      <Coins className="w-16 h-16 text-tokora-gold mb-4 animate-float" />
      <div className="text-sm text-tokora-grey mb-2">Current Balance</div>
      <div className="text-4xl font-bold text-tokora-gold mb-2">
        {player.tokens}
      </div>
      <div className="text-tokora-cyan">$TOKORA</div>
    </RetroCard>
  );
};