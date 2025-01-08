import { Equipment, Monster, MonsterType } from '../types/game';
import { getRandomMonsterImage } from '../config/monsterMedia';

const weaponNames = ['Sword', 'Axe', 'Spear', 'Dagger', 'Staff'];
const armorNames = ['Plate', 'Chain', 'Leather', 'Robe', 'Shield'];
const accessoryNames = ['Ring', 'Amulet', 'Belt', 'Crown', 'Charm'];

const monsterTypes: MonsterType[] = ['Dragon', 'Wolf', 'Bear', 'Serpent', 'Giant'];

// Equipment generation
export const generateEquipment = (
  type: 'weapon' | 'armor' | 'accessory',
  forcedRarity?: Monster['rarity']
): Equipment => {
  const rand = Math.random() * 100;
  const rarity = forcedRarity || (
    rand < 50 ? 'common' :
    rand < 80 ? 'rare' :
    rand < 95 ? 'ultra rare' :
    'legendary'
  );

  const names = type === 'weapon' ? weaponNames :
                type === 'armor' ? armorNames :
                accessoryNames;

  const name = `${rarity === 'legendary' ? 'Ancient ' : ''}${names[Math.floor(Math.random() * names.length)]}`;
  
  const baseStats = Math.floor(Math.random() * 10) + (
    rarity === 'common' ? 5 :
    rarity === 'rare' ? 15 :
    rarity === 'ultra rare' ? 25 :
    35
  );

  return {
    id: crypto.randomUUID(),
    name,
    type,
    rarity,
    stats: {
      attack: type === 'weapon' ? baseStats : undefined,
      defense: type === 'armor' ? baseStats : undefined,
      health: type === 'armor' ? Math.floor(baseStats * 1.5) : undefined,
      speed: type === 'accessory' ? baseStats : undefined,
    },
    price: baseStats * (
      rarity === 'common' ? 20 :
      rarity === 'rare' ? 50 :
      rarity === 'ultra rare' ? 100 :
      200
    )
  };
};

// Monster generation with balanced stats
const generateMonsterStats = (rarity: Monster['rarity']) => {
  const rarityStats = {
    'common': { base: 40, variance: 12, healthMult: 2.8 },
    'rare': { base: 52, variance: 15, healthMult: 3.2 },
    'ultra rare': { base: 68, variance: 20, healthMult: 3.8 },
    'legendary': { base: 85, variance: 25, healthMult: 4.2 }
  };

  const { base, variance, healthMult } = rarityStats[rarity];
  return {
    attack: base + Math.floor(Math.random() * variance),
    defense: base + Math.floor(Math.random() * variance),
    health: Math.floor((base + Math.floor(Math.random() * variance)) * healthMult),
    speed: base + Math.floor(Math.random() * variance)
  };
};

// Rarity chances for different crate types
const CRATE_ODDS = {
  basic: {
    common: 70,
    rare: 25,
    ultraRare: 4.5,
    legendary: 0.5
  },
  rare: {
    common: 0,
    rare: 75,
    ultraRare: 22,
    legendary: 3
  },
  legendary: {
    common: 0,
    rare: 0,
    ultraRare: 85,
    legendary: 15
  }
} as const;

export const generateMonster = (crateType: keyof typeof CRATE_ODDS = 'basic'): Monster => {
  const odds = CRATE_ODDS[crateType];
  const rand = Math.random() * 100;
  
  let rarity: Monster['rarity'];
  if (rand < odds.common) {
    rarity = 'common';
  } else if (rand < odds.common + odds.rare) {
    rarity = 'rare';
  } else if (rand < odds.common + odds.rare + odds.ultraRare) {
    rarity = 'ultra rare';
  } else {
    rarity = 'legendary';
  }

  const monsterType = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
  const number = Math.floor(Math.random() * 1000);
  
  return {
    id: crypto.randomUUID(),
    name: `${rarity === 'legendary' ? 'Ancient ' : ''}${monsterType} #${number}`,
    image: getRandomMonsterImage(monsterType),
    rarity,
    stats: generateMonsterStats(rarity),
    equipment: {}
  };
};

export const generateOpponent = (playerMonsterRarity: Monster['rarity']): Monster => {
  const rarityChances = {
    'common': ['common', 'common', 'rare'],
    'rare': ['common', 'rare', 'rare', 'ultra rare'],
    'ultra rare': ['rare', 'rare', 'ultra rare'],
    'legendary': ['ultra rare', 'ultra rare', 'legendary']
  };

  const possibleRarities = rarityChances[playerMonsterRarity];
  const rarity = possibleRarities[Math.floor(Math.random() * possibleRarities.length)] as Monster['rarity'];
  
  const monsterType = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
  const stats = generateMonsterStats(rarity);

  const equipment: Monster['equipment'] = {};
  if (Math.random() > 0.6 && (rarity === 'legendary' || rarity === 'ultra rare')) {
    equipment.weapon = generateEquipment('weapon', rarity);
    equipment.armor = generateEquipment('armor', rarity);
  }

  return {
    id: crypto.randomUUID(),
    name: `${rarity === 'legendary' ? 'Ancient ' : ''}${monsterType}`,
    image: getRandomMonsterImage(monsterType),
    rarity,
    stats,
    equipment
  };
};