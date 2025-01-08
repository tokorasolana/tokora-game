import React from 'react';
import { EquipmentCard } from './EquipmentCard';
import { SHOP_EQUIPMENT } from '../../config/shopEquipment';

export const EquipmentShop: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Equipment</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SHOP_EQUIPMENT.map(equipment => (
          <EquipmentCard key={equipment.id} equipment={equipment} />
        ))}
      </div>
    </div>
  );
};