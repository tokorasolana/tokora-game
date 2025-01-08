import React, { useState, useEffect } from 'react';
import { Monster } from '../../types/game';
import { BattleState, BattleAction } from '../../types/battle';
import { BattleMonster } from './BattleMonster';
import { BattleControls } from './BattleControls';
import { BattleLog } from './BattleLog';
import { PotionSelector } from './PotionSelector';
import { calculateDamage } from '../../utils/battleCalculations';
import { useGame } from '../../context/GameContext';
import { Potion } from '../../types/items';

interface BattleScreenProps {
  playerMonster: Monster;
  opponentMonster: Monster;
  onBattleEnd: (won: boolean) => void;
}

export const BattleScreen: React.FC<BattleScreenProps> = ({
  playerMonster,
  opponentMonster,
  onBattleEnd
}) => {
  const { player, usePotion } = useGame();
  const [showPotionSelector, setShowPotionSelector] = useState(false);
  const [battleState, setBattleState] = useState<BattleState>({
    playerMonster: {
      currentHealth: playerMonster.stats.health,
      maxHealth: playerMonster.stats.health,
      mana: 100
    },
    opponentMonster: {
      currentHealth: opponentMonster.stats.health,
      maxHealth: opponentMonster.stats.health,
      mana: 100
    },
    currentTurn: playerMonster.stats.speed >= opponentMonster.stats.speed ? 'player' : 'opponent',
    log: ['Battle started!']
  });

  const handlePotionUse = (potion: Potion) => {
    const usedPotion = usePotion(potion.id);
    if (!usedPotion) return;

    const healing = Math.floor((battleState.playerMonster.maxHealth * potion.healPercentage) / 100);
    
    setBattleState(prev => ({
      ...prev,
      playerMonster: {
        ...prev.playerMonster,
        currentHealth: Math.min(
          prev.playerMonster.maxHealth,
          prev.playerMonster.currentHealth + healing
        ),
        mana: prev.playerMonster.mana
      },
      currentTurn: 'opponent',
      log: [...prev.log, `${playerMonster.name} uses ${potion.name} and recovers ${healing} health!`]
    }));

    setShowPotionSelector(false);
  };

  const performAction = async (action: BattleAction) => {
    if (battleState.currentTurn !== 'player') return;

    let damage = 0;
    let log = '';
    let manaCost = 0;

    switch (action) {
      case 'attack':
        damage = calculateDamage(playerMonster, opponentMonster);
        log = `${playerMonster.name} attacks for ${damage} damage!`;
        break;
      case 'magic':
        if (battleState.playerMonster.mana >= 70) {
          damage = calculateDamage(playerMonster, opponentMonster, true);
          log = `${playerMonster.name} casts a powerful spell for ${damage} damage!`;
          manaCost = 70;
        } else {
          log = `${playerMonster.name} is out of mana!`;
          return;
        }
        break;
      case 'potion':
        if (player.potions.length > 0) {
          setShowPotionSelector(true);
          return;
        } else {
          log = 'No potions available!';
          return;
        }
      case 'retreat':
        onBattleEnd(false);
        return;
    }

    setBattleState(prev => ({
      ...prev,
      opponentMonster: {
        ...prev.opponentMonster,
        currentHealth: Math.max(0, prev.opponentMonster.currentHealth - damage)
      },
      playerMonster: {
        ...prev.playerMonster,
        mana: Math.min(100, prev.playerMonster.mana - manaCost + 10)
      },
      currentTurn: 'opponent',
      log: [...prev.log, log]
    }));
  };

  // Opponent's turn
  useEffect(() => {
    if (battleState.currentTurn === 'opponent') {
      const timer = setTimeout(() => {
        const normalDamage = calculateDamage(opponentMonster, playerMonster);
        const magicDamage = calculateDamage(opponentMonster, playerMonster, true);
        const useMagic = battleState.opponentMonster.mana >= 70 && magicDamage > normalDamage * 1.4;

        const damage = useMagic ? magicDamage : normalDamage;
        const action = useMagic ? 'casts a powerful spell' : 'attacks';
        const manaCost = useMagic ? 70 : 0;
        
        setBattleState(prev => ({
          ...prev,
          playerMonster: {
            ...prev.playerMonster,
            currentHealth: Math.max(0, prev.playerMonster.currentHealth - damage)
          },
          opponentMonster: {
            ...prev.opponentMonster,
            mana: Math.min(100, prev.opponentMonster.mana - manaCost + 10)
          },
          currentTurn: 'player',
          log: [...prev.log, `${opponentMonster.name} ${action} for ${damage} damage!`]
        }));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [battleState.currentTurn, opponentMonster, playerMonster]);

  // Check for battle end
  useEffect(() => {
    if (battleState.playerMonster.currentHealth <= 0) {
      onBattleEnd(false);
    } else if (battleState.opponentMonster.currentHealth <= 0) {
      onBattleEnd(true);
    }
  }, [battleState.playerMonster.currentHealth, battleState.opponentMonster.currentHealth, onBattleEnd]);

  return (
    <div 
      className="min-h-[600px] bg-tokora-black/80 p-6 rounded-lg relative overflow-hidden"
      style={{
        backgroundImage: `url('https://i.ibb.co/fdKLhrq/DALL-E-2025-01-04-17-18-07-A-pixel-art-depiction-of-a-Tokora-battle-arena-designed-for-a-play-to-ear.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-tokora-black/40" />

      {/* Content */}
      <div className="relative z-10">
        <div className="grid grid-cols-2 gap-8 mb-6">
          <BattleMonster
            monster={playerMonster}
            currentHealth={battleState.playerMonster.currentHealth}
            maxHealth={battleState.playerMonster.maxHealth}
            mana={battleState.playerMonster.mana}
            isPlayer
          />
          <BattleMonster
            monster={opponentMonster}
            currentHealth={battleState.opponentMonster.currentHealth}
            maxHealth={battleState.opponentMonster.maxHealth}
            mana={battleState.opponentMonster.mana}
          />
        </div>
        
        <BattleLog messages={battleState.log} />
        
        <BattleControls
          onAction={performAction}
          disabled={battleState.currentTurn !== 'player'}
          mana={battleState.playerMonster.mana}
          currentHealth={battleState.playerMonster.currentHealth}
          maxHealth={battleState.playerMonster.maxHealth}
        />
      </div>

      {showPotionSelector && (
        <PotionSelector
          onSelect={handlePotionUse}
          onClose={() => setShowPotionSelector(false)}
        />
      )}
    </div>
  );
};