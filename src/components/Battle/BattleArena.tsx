import React, { useState } from 'react';
import { Swords, Users } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { RetroCard } from '../ui/RetroCard';
import { OfflineBattle } from './OfflineBattle';
import { PvPBattle } from './PvPBattle';

type BattleMode = 'offline' | 'pvp';

export const BattleArena: React.FC = () => {
  const [mode, setMode] = useState<BattleMode | null>(null);

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Battle Arena" 
        subtitle="Challenge monsters or other players to earn tokens"
      />
      
      {!mode ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RetroCard
            onClick={() => setMode('offline')}
            className="p-8 text-center"
          >
            <Swords className="w-12 h-12 mx-auto mb-4 text-tokora-red" />
            <h3 className="text-xl font-bold mb-2">Offline Battle</h3>
            <p className="text-tokora-grey">
              Challenge AI monsters to earn tokens and gain experience
            </p>
          </RetroCard>

          <RetroCard
            onClick={() => setMode('pvp')}
            className="p-8 text-center"
          >
            <Users className="w-12 h-12 mx-auto mb-4 text-tokora-blue" />
            <h3 className="text-xl font-bold mb-2">PvP Battle</h3>
            <p className="text-tokora-grey">
              Battle against other players for higher rewards
            </p>
          </RetroCard>
        </div>
      ) : (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setMode(null)}
            className="text-sm text-tokora-grey hover:text-tokora-cyan"
          >
            ← Back to mode selection
          </button>
        </div>
      )}

      {mode === 'offline' && <OfflineBattle />}
      {mode === 'pvp' && <PvPBattle />}
    </div>
  );
};