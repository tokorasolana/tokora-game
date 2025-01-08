import React, { useState } from 'react';
import { Package } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { generateMonster } from '../../utils/generators';
import { LootCrateReveal } from './LootCrateReveal';
import { Monster } from '../../types/game';
import { cn } from '../../utils/cn';

interface LootCrateCardProps {
  id: string;
  name: string;
  cost: number;
  description: string;
  color: string;
}

export const LootCrateCard: React.FC<LootCrateCardProps> = ({
  id,
  name,
  cost,
  description,
  color
}) => {
  const { player, addMonster, addTokens } = useGame();
  const [revealedMonster, setRevealedMonster] = useState<Monster | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const openCrate = () => {
    if (player.tokens < cost) return;
    
    addTokens(-cost);
    const monster = generateMonster(id as 'basic' | 'rare' | 'legendary');
    setRevealedMonster(monster);
  };

  const handleRevealClose = () => {
    if (revealedMonster) {
      addMonster(revealedMonster);
      setRevealedMonster(null);
    }
  };

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "relative group cursor-pointer transform transition-all duration-300",
          player.tokens >= cost && "hover:scale-[1.02]"
        )}
      >
        {/* Pixel border with glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-tokora-cyan/20 to-transparent pixel-corners" />
        
        <div className={cn(
          "relative bg-tokora-black/80 p-8 pixel-corners",
          "before:absolute before:inset-0 before:bg-gradient-to-br",
          color,
          "overflow-hidden"
        )}>
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, ${color.includes('gold') ? '#FFD700' : '#00FFFF'}22 0%, transparent 50%)`,
              animation: 'pulse 4s ease-in-out infinite'
            }} />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            <div className={cn(
              "w-20 h-20 mx-auto mb-4 rounded-lg",
              "flex items-center justify-center",
              "bg-tokora-black/30 backdrop-blur-sm",
              "transform transition-transform duration-500",
              isHovered && "rotate-[15deg] scale-110"
            )}>
              <Package className={cn(
                "w-12 h-12",
                color.includes('gold') ? "text-tokora-gold" : 
                color.includes('purple') ? "text-tokora-purple" : 
                "text-tokora-cyan"
              )} />
            </div>

            <h3 className="text-xl font-bold mb-2 retro-text">{name}</h3>
            <p className="text-sm text-gray-100 mb-4 min-h-[40px]">{description}</p>
            
            <div className={cn(
              "text-lg font-bold mb-4",
              color.includes('gold') ? "text-tokora-gold" : 
              color.includes('purple') ? "text-tokora-purple" : 
              "text-tokora-cyan"
            )}>
              {cost} $TOKORA
            </div>

            <button
              onClick={openCrate}
              disabled={player.tokens < cost}
              className={cn(
                "w-full py-3 px-6 rounded-lg font-bold transition-all pixel-corners",
                "relative overflow-hidden",
                player.tokens >= cost
                  ? cn(
                      "bg-tokora-black/40 hover:bg-tokora-black/60",
                      color.includes('gold') ? "text-tokora-gold" : 
                      color.includes('purple') ? "text-tokora-purple" : 
                      "text-tokora-cyan"
                    )
                  : "bg-gray-700 cursor-not-allowed opacity-50"
              )}
            >
              <span className="relative z-10">Open Crate</span>
              {player.tokens >= cost && (
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r from-transparent via-current to-transparent opacity-20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                )} />
              )}
            </button>
          </div>
        </div>
      </div>

      {revealedMonster && (
        <LootCrateReveal 
          monster={revealedMonster} 
          onClose={handleRevealClose}
        />
      )}
    </>
  );
};