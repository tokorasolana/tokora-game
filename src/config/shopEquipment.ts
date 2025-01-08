import { Equipment } from '../types/game';

export const SHOP_EQUIPMENT: Equipment[] = [
  {
    id: 'golden-axe',
    name: 'Golden Axe',
    type: 'weapon',
    rarity: 'ultra rare',
    stats: {
      attack: 35,
    },
    price: 50000
  },
  {
    id: 'magic-robe',
    name: 'Magic Robe',
    type: 'armor',
    rarity: 'common',
    stats: {
      defense: 12,
      health: 25
    },
    price: 10000
  },
  {
    id: 'flame-amulet',
    name: 'Flame Amulet',
    type: 'accessory',
    rarity: 'rare',
    stats: {
      speed: 20
    },
    price: 20000
  },
  {
    id: 'chain-armor',
    name: 'Chain Armour',
    type: 'armor',
    rarity: 'rare',
    stats: {
      defense: 25,
      health: 40
    },
    price: 20000
  },
  {
    id: 'dagger',
    name: 'Dagger',
    type: 'weapon',
    rarity: 'common',
    stats: {
      attack: 15
    },
    price: 10000
  },
  {
    id: 'ancient-ring',
    name: 'Ancient Ring',
    type: 'accessory',
    rarity: 'legendary',
    stats: {
      speed: 45
    },
    price: 100000
  }
];