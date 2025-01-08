import React from 'react';
import { Clock } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ShopTimer: React.FC = () => {
  const { timeUntilReset } = useShop();

  return (
    <div className="flex items-center gap-2 text-sm text-tokora-grey mb-6">
      <Clock className="w-4 h-4" />
      <span>Shop resets in: {timeUntilReset}</span>
    </div>
  );
};