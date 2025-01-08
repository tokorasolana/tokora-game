import { Monster } from '../types/game';

export const calculateDamage = (
  attacker: Monster, 
  defender: Monster, 
  isMagic: boolean = false
): number => {
  const attackStat = attacker.stats.attack + 
    (attacker.equipment.weapon?.stats.attack || 0);
  
  const defenseStat = defender.stats.defense + 
    (defender.equipment.armor?.stats.defense || 0);

  // Reduced base damage for longer battles
  const baseDamage = Math.max(1, Math.floor((attackStat - defenseStat / 3) * 0.5)); // Reduced from 0.8
  
  if (isMagic) {
    // Magic multiplier reduced from 1.8x to 1.4x
    return Math.floor(baseDamage * 1.4);
  }
  
  // Reduced variance range from 0.3 to 0.2 for more consistent damage
  const variance = Math.random() * 0.2 - 0.1; // -10% to +10%
  return Math.max(1, Math.floor(baseDamage * (1 + variance)));
};