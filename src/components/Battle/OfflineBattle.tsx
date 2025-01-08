import React, { useState } from 'react';
import { Monster } from '../../types/game';
import { MonsterCard } from '../MonsterCard';
import { BattleScreen } from './BattleScreen';
import { BattleResult } from './BattleResult';
import { generateOpponent } from '../../utils/generators';
import { useGame } from '../../context/GameContext';
import { RetroCard } from '../ui/RetroCard';

export const OfflineBattle: React.FC = () => {
  const { player, addTokens } = useGame();
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  const [opponent, setOpponent] = useState<Monster | null>(null);
  const [battleResult, setBattleResult] = useState<{
    winner: 'player' | 'opponent';
    rewards: number;
  } | null>(null);

  const startBattle = () => {
    if (!selectedMonster) return;
    setOpponent(generateOpponent(selectedMonster.rarity));
  };

  const handleBattleEnd = (won: boolean) => {
    // Only give rewards for winning, no penalty for losing
    const rewards = won ? 300 : 0;
    if (won) {
      addTokens(rewards);
    }
    setBattleResult({ winner: won ? 'player' : 'opponent', rewards });
    setOpponent(null);
  };

  return (
    <div className="space-y-6">
      {battleResult && (
        <BattleResult
          result={battleResult}
          onClose={() => {
            setBattleResult(null);
            setSelectedMonster(null);
          }}
        />
      )}

      {opponent && selectedMonster && (
        <BattleScreen
          playerMonster={selectedMonster}
          opponentMonster={opponent}
          onBattleEnd={handleBattleEnd}
        />
      )}

      {!battleResult && !opponent && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {player.monsters.map(monster => (
              <RetroCard
                key={monster.id}
                onClick={() => setSelectedMonster(monster)}
                className={selectedMonster?.id === monster.id ? 'border-tokora-cyan' : ''}
              >
                <MonsterCard monster={monster} />
              </RetroCard>
            ))}
          </div>

          <button
            onClick={startBattle}
            disabled={!selectedMonster}
            className="retro-button w-full"
          >
            Start Battle
          </button>
        </>
      )}
    </div>
  );
};