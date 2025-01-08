import React from 'react';
import { MonsterInventory } from './MonsterInventory';
import { EquipmentInventory } from './EquipmentInventory';
import { PotionInventory } from './PotionInventory';

export const InventorySection: React.FC = () => {
  return (
    <div className="space-y-8">
      <MonsterInventory />
      <EquipmentInventory />
      <PotionInventory />
    </div>
  );
};