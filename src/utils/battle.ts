import { Monster } from '../types/game';

export const calculateBattleResult = (
  playerMonster: Monster,
  opponent: Monster
): { winner: 'player' | 'opponent' } => {
  const playerPower = calculatePower(playerMonster);
  const opponentPower = calculatePower(opponent);
  
  // Add some randomness to make battles more exciting
  const randomFactor = 0.8 + Math.random() * 0.4; // Random between 0.8 and 1.2
  
  return {
    winner: playerPower * randomFactor > opponentPower ? 'player' : 'opponent'
  };
};

const calculatePower = (monster: Monster): number => {
  const baseStats = monster.stats;
  const equipment = monster.equipment;
  
  const attack = baseStats.attack + (equipment.weapon?.stats.attack || 0);
  const defense = baseStats.defense + (equipment.armor?.stats.defense || 0);
  const health = baseStats.health + (equipment.armor?.stats.health || 0);
  const speed = baseStats.speed + (equipment.accessory?.stats.speed || 0);
  
  return attack * 1.2 + defense + health * 0.8 + speed * 0.6;
};