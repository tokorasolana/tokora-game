import { Equipment } from '../types/game';

export const EQUIPMENT_IMAGES: Record<string, string> = {
  'magic-robe': 'https://i.ibb.co/GsfdWHz/DALL-E-2025-01-04-17-41-01-A-pixel-art-depiction-of-a-magic-robe-designed-for-a-play-to-earn-game-st.webp',
  'golden-axe': 'https://i.ibb.co/SfGDyN3/DALL-E-2025-01-04-17-42-54-A-pixel-art-depiction-of-a-simple-golden-axe-designed-for-a-play-to-earn.webp',
  'chain-armor': 'https://i.ibb.co/vjjX2By/DALL-E-2025-01-04-17-49-32-A-pixel-art-depiction-of-chain-armor-designed-for-a-play-to-earn-game-sty.webp',
  'flame-amulet': 'https://i.ibb.co/gjMWCgn/DALL-E-2025-01-04-17-50-54-A-pixel-art-depiction-of-a-flame-amulet-designed-for-a-play-to-earn-game.webp',
  'dagger': 'https://i.ibb.co/hCN3p3C/DALL-E-2025-01-04-17-51-50-A-pixel-art-depiction-of-a-dagger-designed-for-a-play-to-earn-game-styled.webp',
  'ancient-ring': 'https://i.ibb.co/xsWcg1z/DALL-E-2025-01-04-17-53-18-A-pixel-art-depiction-of-an-ancient-ring-designed-for-a-play-to-earn-game.webp'
};

export const getEquipmentImage = (equipment: Equipment): string => {
  return EQUIPMENT_IMAGES[equipment.id] || '';
};