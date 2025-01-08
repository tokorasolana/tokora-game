import React, { useState, useEffect } from 'react';
import { Package, X } from 'lucide-react';
import { Monster } from '../../types/game';
import { MonsterCard } from '../MonsterCard';
import { cn } from '../../utils/cn';

interface LootCrateRevealProps {
  monster: Monster;
  onClose: () => void;
}

export const LootCrateReveal: React.FC<LootCrateRevealProps> = ({ monster, onClose }) => {
  const [stage, setStage] = useState<'initial' | 'opening' | 'revealed'>('initial');
  
  useEffect(() => {
    const openTimer = setTimeout(() => setStage('opening'), 500);
    const revealTimer = setTimeout(() => setStage('revealed'), 2000);
    
    return () => {
      clearTimeout(openTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-tokora-black/90 flex items-center justify-center p-4 z-50">
      <div className="relative w-full max-w-md mx-auto">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 p-2 rounded-full bg-tokora-black/50 hover:bg-tokora-black/70 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative flex items-center justify-center min-h-[400px]">
          {/* Crate */}
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center transition-all duration-1000 ease-out',
              stage === 'initial' && 'scale-100 opacity-100',
              stage === 'opening' && 'scale-150 opacity-0',
              stage === 'revealed' && 'hidden'
            )}
          >
            <div className="bg-gradient-to-br from-tokora-purple to-tokora-blue p-8 rounded-lg text-center">
              <Package className="w-24 h-24 mx-auto mb-4 animate-bounce" />
              <div className="text-xl font-bold">Opening Loot Crate...</div>
            </div>
          </div>

          {/* Monster reveal */}
          <div
            className={cn(
              'w-full transition-all duration-500',
              stage !== 'revealed' && 'scale-50 opacity-0',
              stage === 'revealed' && 'scale-100 opacity-100'
            )}
          >
            <div className="text-center mb-4">
              <div className="text-2xl font-bold mb-2 retro-text">
                You got a {monster.rarity} monster!
              </div>
              <div className="text-tokora-grey">
                Click anywhere outside to continue
              </div>
            </div>
            <div className="animate-float">
              <MonsterCard monster={monster} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};