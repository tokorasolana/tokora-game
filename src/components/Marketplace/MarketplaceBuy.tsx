import React from 'react';
import { useGame } from '../../context/GameContext';
import { MonsterCard } from '../MonsterCard';
import { RetroCard } from '../ui/RetroCard';
import { Coins } from 'lucide-react';
import { cn } from '../../utils/cn';

// Marketplace listings with canEquip set to false
const MARKETPLACE_LISTINGS = [
  {
    id: 'starter-1',
    name: 'Starter Monster',
    image: 'https://i.ibb.co/LpwPXjn/DALL-E-2025-01-04-17-12-45-A-pixel-art-depiction-of-a-Tokora-starter-monster-designed-for-a-play-to.webp',
    rarity: 'common',
    stats: {
      attack: 44,
      defense: 44,
      health: 125,
      speed: 44
    },
    equipment: {},
    price: 69420,
    canEquip: false
  },
  {
    id: 'starter-2',
    name: 'Starter Monster',
    image: 'https://i.ibb.co/LpwPXjn/DALL-E-2025-01-04-17-12-45-A-pixel-art-depiction-of-a-Tokora-starter-monster-designed-for-a-play-to.webp',
    rarity: 'common',
    stats: {
      attack: 44,
      defense: 44,
      health: 125,
      speed: 44
    },
    equipment: {},
    price: 99999999,
    canEquip: false
  },
  {
    id: 'starter-3',
    name: 'Starter Monster',
    image: 'https://i.ibb.co/LpwPXjn/DALL-E-2025-01-04-17-12-45-A-pixel-art-depiction-of-a-Tokora-starter-monster-designed-for-a-play-to.webp',
    rarity: 'common',
    stats: {
      attack: 44,
      defense: 44,
      health: 125,
      speed: 44
    },
    equipment: {},
    price: 350000,
    canEquip: false
  },
  {
    id: 'starter-4',
    name: 'Starter Monster',
    image: 'https://i.ibb.co/LpwPXjn/DALL-E-2025-01-04-17-12-45-A-pixel-art-depiction-of-a-Tokora-starter-monster-designed-for-a-play-to.webp',
    rarity: 'common',
    stats: {
      attack: 44,
      defense: 44,
      health: 125,
      speed: 44
    },
    equipment: {},
    price: 100000,
    canEquip: false
  },
  {
    id: 'wolf-482',
    name: 'Wolf #482',
    image: 'https://i.ibb.co/0rmnB2Q/DALL-E-2025-01-04-16-40-29-A-pixel-art-depiction-of-a-Tokora-wolf-character-designed-for-a-play-to-e.webp',
    rarity: 'common',
    stats: {
      attack: 48,
      defense: 42,
      health: 130,
      speed: 50
    },
    equipment: {},
    price: 400000,
    canEquip: false
  },
  {
    id: 'dragon-741',
    name: 'Dragon #741',
    image: 'https://i.ibb.co/qyp8yzC/DALL-E-2025-01-04-16-30-57-A-pixel-art-depiction-of-a-Tokora-dragon-designed-for-a-play-to-earn-game.webp',
    rarity: 'rare',
    stats: {
      attack: 58,
      defense: 54,
      health: 160,
      speed: 52
    },
    equipment: {},
    price: 750000,
    canEquip: false
  }
];

export const MarketplaceBuy: React.FC = () => {
  const { player } = useGame();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MARKETPLACE_LISTINGS.map(listing => {
          const canAfford = player.tokens >= listing.price;
          
          return (
            <RetroCard key={listing.id} className="relative">
              <div className={cn(
                "absolute top-4 right-4 z-10 px-4 py-2 bg-tokora-black/80 rounded-lg",
                "border border-tokora-cyan/30 backdrop-blur-sm",
                !canAfford && "opacity-50"
              )}>
                <div className="flex items-center gap-2">
                  <Coins className={cn(
                    "w-4 h-4",
                    canAfford ? "text-tokora-gold" : "text-gray-400"
                  )} />
                  <span className={cn(
                    "font-bold",
                    canAfford ? "text-tokora-gold" : "text-gray-400"
                  )}>
                    {listing.price.toLocaleString()}
                  </span>
                </div>
              </div>
              <MonsterCard monster={listing} />
            </RetroCard>
          );
        })}
      </div>
    </div>
  );
};