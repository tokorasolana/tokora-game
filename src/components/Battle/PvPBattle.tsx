import React, { useState, useEffect } from 'react';
import { Monster } from '../../types/game';
import { useGame } from '../../context/GameContext';
import { useAuth } from '../../context/AuthContext';
import { RetroCard } from '../ui/RetroCard';
import { Search, X, Coins, Lock } from 'lucide-react';
import { WagerInput } from './WagerInput';
import { MonsterSelector } from './MonsterSelector';
import { BattleScreen } from './BattleScreen';
import { BattleResult } from './BattleResult';

// Create a standard starter monster for PvP
const createStarterOpponent = (): Monster => ({
  id: crypto.randomUUID(),
  name: "Starter Monster",
  image: "https://i.ibb.co/LpwPXjn/DALL-E-2025-01-04-17-12-45-A-pixel-art-depiction-of-a-Tokora-starter-monster-designed-for-a-play-to.webp",
  rarity: "common",
  stats: {
    attack: 44,
    defense: 44,
    health: 125,
    speed: 44
  },
  equipment: {}
});

export const PvPBattle: React.FC = () => {
  const { player, addTokens } = useGame();
  const { user } = useAuth();
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTime, setSearchTime] = useState(0);
  const [wagerAmount, setWagerAmount] = useState<number>(0);
  const [opponent, setOpponent] = useState<Monster | null>(null);
  const [battleResult, setBattleResult] = useState<{
    winner: 'player' | 'opponent';
    rewards: number;
  } | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSearching) {
      timer = setInterval(() => {
        setSearchTime(prev => {
          // After 3-4 minutes (180-240 seconds), find an opponent
          if (prev >= 180 && prev <= 240 && Math.random() < 0.1) {
            setIsSearching(false);
            setOpponent(createStarterOpponent());
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSearching]);

  const startSearch = () => {
    if (!selectedMonster || wagerAmount <= 0) return;
    setIsSearching(true);
    setSearchTime(0);
  };

  const cancelSearch = () => {
    setIsSearching(false);
    setSearchTime(0);
  };

  const handleBattleEnd = (won: boolean) => {
    // Calculate rewards/losses based on wager
    const amount = won ? wagerAmount : -wagerAmount;
    addTokens(amount);
    setBattleResult({ 
      winner: won ? 'player' : 'opponent',
      rewards: amount
    });
    setOpponent(null);
  };

  const resetBattle = () => {
    setBattleResult(null);
    setSelectedMonster(null);
    setWagerAmount(0);
  };

  if (user?.isGuest) {
    return (
      <RetroCard className="p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-tokora-cyan/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-tokora-cyan" />
          </div>
          <h3 className="text-xl font-bold">PvP Battles Restricted</h3>
          <p className="text-tokora-grey max-w-md">
            PvP battles are only available for registered users. Please sign in with your account to access this feature.
          </p>
        </div>
      </RetroCard>
    );
  }

  if (battleResult) {
    return (
      <BattleResult
        result={battleResult}
        onClose={resetBattle}
      />
    );
  }

  if (opponent && selectedMonster) {
    return (
      <BattleScreen
        playerMonster={selectedMonster}
        opponentMonster={opponent}
        onBattleEnd={handleBattleEnd}
      />
    );
  }

  if (isSearching) {
    return (
      <RetroCard className="p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <Search className="w-12 h-12 animate-pulse text-tokora-cyan" />
          <h3 className="text-xl font-bold">Searching for opponent...</h3>
          <div className="flex items-center gap-2 text-tokora-grey">
            <span>Searching for</span>
            <span className="font-mono">{searchTime}s</span>
          </div>
          <div className="flex items-center gap-2 text-tokora-gold">
            <Coins className="w-4 h-4" />
            <span>{wagerAmount} $TOKORA at stake</span>
          </div>
          <button
            onClick={cancelSearch}
            className="flex items-center gap-2 px-4 py-2 text-sm text-tokora-grey hover:text-tokora-cyan"
          >
            <X className="w-4 h-4" />
            Cancel Search
          </button>
        </div>
      </RetroCard>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Select Your Monster</h3>
          <MonsterSelector
            monsters={player.monsters}
            selectedMonsterId={selectedMonster?.id}
            onSelect={setSelectedMonster}
          />
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Set Wager Amount</h3>
          <RetroCard hover={false}>
            <WagerInput
              maxAmount={player.tokens}
              value={wagerAmount}
              onChange={setWagerAmount}
            />
          </RetroCard>
        </div>
      </div>

      <button
        onClick={startSearch}
        disabled={!selectedMonster || wagerAmount <= 0 || wagerAmount > player.tokens}
        className="retro-button w-full"
      >
        Start Matchmaking
      </button>
    </div>
  );
};