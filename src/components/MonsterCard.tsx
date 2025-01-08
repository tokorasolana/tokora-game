import React, { useState } from 'react';
import { Monster, Equipment } from '../types/game';
import { Shield, Swords, Heart, Wind, Plus, Lock } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { EquipmentSelector } from './EquipmentSelector';
import { cn } from '../utils/cn';

interface MonsterCardProps {
  monster: Monster;
  onClick?: () => void;
}

export const MonsterCard: React.FC<MonsterCardProps> = ({ monster, onClick }) => {
  const { unequipItem } = useGame();
  const [showEquipSelector, setShowEquipSelector] = useState<Equipment['type'] | null>(null);
  const [hoveredSlot, setHoveredSlot] = useState<Equipment['type'] | null>(null);

  const totalStats = {
    attack: monster.stats.attack + (monster.equipment.weapon?.stats.attack || 0),
    defense: monster.stats.defense + (monster.equipment.armor?.stats.defense || 0),
    health: Math.floor(monster.stats.health + (monster.equipment.armor?.stats.health || 0)),
    speed: monster.stats.speed + (monster.equipment.accessory?.stats.speed || 0)
  };

  const renderEquipmentSlot = (type: Equipment['type']) => {
    const equipment = monster.equipment[type];
    const isHovered = hoveredSlot === type;

    return (
      <div 
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          "bg-tokora-black/40 rounded-lg",
          isHovered && "ring-2 ring-tokora-cyan"
        )}
        onMouseEnter={() => setHoveredSlot(type)}
        onMouseLeave={() => setHoveredSlot(null)}
      >
        <div className="flex items-center gap-2 p-2">
          <span className="text-xs uppercase text-tokora-grey">{type}:</span>
          {equipment ? (
            <div className="flex items-center gap-2 flex-1">
              <span className={cn(
                "text-sm flex-1",
                equipment.rarity === 'legendary' && "text-tokora-gold",
                equipment.rarity === 'ultra rare' && "text-tokora-purple",
                equipment.rarity === 'rare' && "text-tokora-blue"
              )}>
                {equipment.name}
              </span>
              {monster.canEquip !== false && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    unequipItem(monster.id, type);
                  }}
                  className="text-xs px-2 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 
                           rounded transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          ) : (
            monster.canEquip === false ? (
              <div className="flex items-center gap-2 text-tokora-grey">
                <Lock className="w-4 h-4" />
                <span className="text-sm">Locked</span>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEquipSelector(type);
                }}
                className={cn(
                  "flex items-center gap-1 text-xs w-full justify-center",
                  "py-1 rounded transition-all duration-300",
                  "bg-tokora-cyan/10 hover:bg-tokora-cyan/20",
                  "text-tokora-cyan hover:text-tokora-cyan/80",
                  "group relative overflow-hidden"
                )}
              >
                {/* Glowing background effect */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r from-transparent via-tokora-cyan/20 to-transparent",
                  "-translate-x-full group-hover:translate-x-full transition-transform duration-1000",
                  "opacity-0 group-hover:opacity-100"
                )} />
                
                {/* Content */}
                <div className="relative flex items-center gap-1">
                  <Plus className="w-3 h-3" />
                  <span>Equip {type}</span>
                </div>
              </button>
            )
          )}
        </div>

        {/* Bottom border glow effect */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 h-[2px]",
          "bg-gradient-to-r from-transparent via-tokora-cyan to-transparent",
          "opacity-0 transition-opacity duration-300",
          isHovered && "opacity-30"
        )} />
      </div>
    );
  };

  return (
    <div 
      onClick={onClick}
      className="relative group cursor-pointer transform transition-all duration-300 hover:scale-105"
    >
      <div className={cn(
        "relative rounded-lg overflow-hidden border-4 bg-gray-900 text-white",
        rarityColors[monster.rarity],
        monster.rarity === 'legendary' && [
          "before:absolute before:inset-[-4px] before:rounded-lg before:animate-glow-slow",
          "before:bg-gradient-to-r before:from-yellow-500/50 before:via-yellow-200/50 before:to-yellow-500/50",
          "after:absolute after:inset-[-4px] after:rounded-lg after:animate-glow-slow after:delay-500",
          "after:bg-gradient-to-r after:from-yellow-500/30 after:via-yellow-200/30 after:to-yellow-500/30",
          "shadow-[0_0_15px_rgba(234,179,8,0.5)]"
        ]
      )}>
        <div className="relative">
          <div className="w-full aspect-square bg-tokora-black/50">
            <img
              src={monster.image}
              alt={monster.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className={cn(
            "absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-black bg-opacity-50",
            monster.rarity === 'legendary' && "text-yellow-400"
          )}>
            {monster.rarity}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className={cn(
            "text-xl font-bold mb-2",
            monster.rarity === 'legendary' && "text-yellow-400"
          )}>
            {monster.name}
          </h3>
          
          <div className="grid grid-cols-2 gap-2 text-sm mb-4">
            <div className="flex items-center gap-1">
              <Swords className="w-4 h-4" />
              <span className={monster.equipment.weapon ? 'text-green-400' : ''}>
                {totalStats.attack}
                {monster.equipment.weapon && ` (+${monster.equipment.weapon.stats.attack})`}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              <span className={monster.equipment.armor ? 'text-green-400' : ''}>
                {totalStats.defense}
                {monster.equipment.armor?.stats.defense && ` (+${monster.equipment.armor.stats.defense})`}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span className={monster.equipment.armor?.stats.health ? 'text-green-400' : ''}>
                {totalStats.health}
                {monster.equipment.armor?.stats.health && ` (+${Math.floor(monster.equipment.armor.stats.health)})`}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="w-4 h-4" />
              <span className={monster.equipment.accessory ? 'text-green-400' : ''}>
                {totalStats.speed}
                {monster.equipment.accessory && ` (+${monster.equipment.accessory.stats.speed})`}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {renderEquipmentSlot('weapon')}
            {renderEquipmentSlot('armor')}
            {renderEquipmentSlot('accessory')}
          </div>
        </div>
      </div>

      {showEquipSelector && monster.canEquip !== false && (
        <EquipmentSelector
          type={showEquipSelector}
          monsterId={monster.id}
          onClose={() => setShowEquipSelector(null)}
        />
      )}
    </div>
  );
};

const rarityColors = {
  'common': 'border-gray-500',
  'rare': 'border-blue-500',
  'ultra rare': 'border-purple-500',
  'legendary': 'border-yellow-500'
};