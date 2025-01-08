import React from 'react';
import { Equipment } from '../types/game';
import { useGame } from '../context/GameContext';
import { Shield, Swords, Heart, Wind } from 'lucide-react';

interface EquipmentSelectorProps {
  type: Equipment['type'];
  monsterId: string;
  onClose: () => void;
}

export const EquipmentSelector: React.FC<EquipmentSelectorProps> = ({
  type,
  monsterId,
  onClose
}) => {
  const { player, equipItem } = useGame();
  const availableEquipment = player.inventory.filter(item => item.type === type);

  const handleEquip = (equipment: Equipment) => {
    equipItem(monsterId, equipment);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Select {type} to Equip</h3>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {availableEquipment.map(equipment => (
            <div
              key={equipment.id}
              onClick={() => handleEquip(equipment)}
              className="bg-gray-700 p-3 rounded-lg cursor-pointer hover:bg-gray-600"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold">{equipment.name}</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-black bg-opacity-50">
                  {equipment.rarity}
                </span>
              </div>
              
              <div className="space-y-1">
                {equipment.stats.attack && (
                  <div className="flex items-center gap-2">
                    <Swords className="w-4 h-4" />
                    <span>+{equipment.stats.attack}</span>
                  </div>
                )}
                {equipment.stats.defense && (
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>+{equipment.stats.defense}</span>
                  </div>
                )}
                {equipment.stats.health && (
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>+{equipment.stats.health}</span>
                  </div>
                )}
                {equipment.stats.speed && (
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4" />
                    <span>+{equipment.stats.speed}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          {availableEquipment.length === 0 && (
            <div className="text-center text-gray-400 py-4">
              No {type} available in inventory
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2 px-4 bg-gray-600 hover:bg-gray-700 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};