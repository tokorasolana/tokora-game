export type MonsterType = 'Dragon' | 'Wolf' | 'Bear' | 'Serpent' | 'Giant';

export interface Monster {
  id: string;
  name: string;
  image: string;
  rarity: 'common' | 'rare' | 'ultra rare' | 'legendary';
  stats: {
    attack: number;
    defense: number;
    health: number;
    speed: number;
  };
  equipment: {
    weapon?: Equipment;
    armor?: Equipment;
    accessory?: Equipment;
  };
  canEquip?: boolean;
}

export interface Equipment {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'accessory';
  rarity: Monster['rarity'];
  stats: {
    attack?: number;
    defense?: number;
    health?: number;
    speed?: number;
  };
  price: number;
}

export interface Player {
  id: string;
  tokens: number;
  monsters: Monster[];
  inventory: Equipment[];
  listedMonsters: string[];
  potions: Potion[];
}