import React from 'react';
import { EquipmentShop } from './EquipmentShop';
import { PotionShop } from './PotionShop';
import { ShopTimer } from './ShopTimer';
import { SectionHeader } from '../ui/SectionHeader';
import { ShopProvider } from '../../context/ShopContext';

export const Shop: React.FC = () => {
  return (
    <ShopProvider>
      <div className="space-y-8">
        <SectionHeader 
          title="Shop" 
          subtitle="Enhance your monsters and stock up on supplies"
        />
        
        <ShopTimer />
        
        <PotionShop />
        <EquipmentShop />
      </div>
    </ShopProvider>
  );
};