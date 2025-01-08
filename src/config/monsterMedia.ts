import { MonsterType } from '../types/game';

export const DRAGON_IMAGES = [
  'https://i.ibb.co/qyp8yzC/DALL-E-2025-01-04-16-30-57-A-pixel-art-depiction-of-a-Tokora-dragon-designed-for-a-play-to-earn-game.webp',
  'https://i.ibb.co/wMy5v0b/DALL-E-2025-01-04-16-31-28-A-pixel-art-depiction-of-a-Tokora-dragon-for-a-play-to-earn-game-with-the.webp',
  'https://i.ibb.co/DpRKtwt/DALL-E-2025-01-04-16-31-31-A-pixel-art-depiction-of-a-Tokora-dragon-designed-for-a-play-to-earn-game.webp',
  'https://i.ibb.co/3FjTjZp/DALL-E-2025-01-04-16-31-33-A-pixel-art-depiction-of-a-Tokora-dragon-designed-for-a-play-to-earn-game.webp',
  'https://i.ibb.co/sWPSvqZ/DALL-E-2025-01-03-22-32-53-A-pixel-art-depiction-of-a-dragon-character-designed-for-a-play-to-earn-g.webp'
];

export const WOLF_IMAGES = [
  'https://i.ibb.co/0rmnB2Q/DALL-E-2025-01-04-16-40-29-A-pixel-art-depiction-of-a-Tokora-wolf-character-designed-for-a-play-to-e.webp',
  'https://i.ibb.co/3WQwPJN/DALL-E-2025-01-04-16-38-37-A-pixel-art-depiction-of-a-Tokora-wolf-character-designed-for-a-play-to-e.webp',
  'https://i.ibb.co/bXChTJQ/DALL-E-2025-01-04-16-38-02-A-pixel-art-depiction-of-a-Tokora-wolf-character-designed-for-a-play-to-e.webp',
  'https://i.ibb.co/h2g48zH/DALL-E-2025-01-04-16-41-32-A-pixel-art-depiction-of-a-Tokora-wolf-character-designed-for-a-play-to-e.webp',
  'https://i.ibb.co/DpvVDkw/DALL-E-2025-01-04-16-41-27-A-pixel-art-depiction-of-a-Tokora-wolf-character-designed-for-a-play-to-e.webp'
];

export const BEAR_IMAGES = [
  'https://i.ibb.co/hgrw1ZQ/DALL-E-2025-01-04-16-45-12-A-pixel-art-depiction-of-a-Tokora-bear-character-designed-for-a-play-to-e.webp',
  'https://i.ibb.co/YNWxRJW/DALL-E-2025-01-04-16-45-15-A-pixel-art-depiction-of-a-Tokora-bear-character-designed-for-a-play-to-e.webp',
  'https://i.ibb.co/h8tFhz5/DALL-E-2025-01-04-16-45-18-A-pixel-art-depiction-of-a-Tokora-bear-character-designed-for-a-play-to-e.webp',
  'https://i.ibb.co/tZJyNFq/DALL-E-2025-01-04-16-45-25-A-pixel-art-depiction-of-a-Tokora-bear-character-designed-for-a-play-to-e.webp',
  'https://i.ibb.co/8P6zV2T/DALL-E-2025-01-04-16-45-31-A-pixel-art-depiction-of-a-Tokora-bear-character-designed-for-a-play-to-e.webp'
];

export const GIANT_IMAGES = [
  'https://i.ibb.co/BwHqbRh/DALL-E-2025-01-04-16-55-57-A-pixel-art-depiction-of-a-Tokora-giant-character-designed-for-a-play-to.webp',
  'https://i.ibb.co/1TtnmYB/DALL-E-2025-01-04-16-55-59-A-pixel-art-depiction-of-a-Tokora-giant-character-designed-for-a-play-to.webp',
  'https://i.ibb.co/B36BsNF/DALL-E-2025-01-04-16-56-01-A-pixel-art-depiction-of-a-Tokora-giant-character-designed-for-a-play-to.webp',
  'https://i.ibb.co/mT1JqvW/DALL-E-2025-01-04-16-56-04-A-pixel-art-depiction-of-a-Tokora-giant-character-designed-for-a-play-to.webp',
  'https://i.ibb.co/TKSbR5y/DALL-E-2025-01-04-16-56-19-A-pixel-art-depiction-of-a-Tokora-giant-character-designed-for-a-play-to.webp'
];

export const SERPENT_IMAGES = [
  'https://i.ibb.co/BVb6rTX/DALL-E-2025-01-04-17-01-47-A-pixel-art-depiction-of-a-Tokora-serpent-character-designed-for-a-play-t.webp',
  'https://i.ibb.co/h7Qt4kK/DALL-E-2025-01-04-17-01-53-A-pixel-art-depiction-of-a-Tokora-serpent-character-designed-for-a-play-t.webp',
  'https://i.ibb.co/zxC6rjX/DALL-E-2025-01-04-17-01-55-A-pixel-art-depiction-of-a-Tokora-serpent-character-designed-for-a-play-t.webp',
  'https://i.ibb.co/80HFC5N/DALL-E-2025-01-04-17-01-56-A-pixel-art-depiction-of-a-Tokora-serpent-character-designed-for-a-play-t.webp',
  'https://i.ibb.co/kDsjchz/DALL-E-2025-01-04-17-01-59-A-pixel-art-depiction-of-a-Tokora-serpent-character-designed-for-a-play-t.webp'
];

export const MONSTER_IMAGES: Record<MonsterType, string[]> = {
  Dragon: DRAGON_IMAGES,
  Wolf: WOLF_IMAGES,
  Bear: BEAR_IMAGES,
  Serpent: SERPENT_IMAGES,
  Giant: GIANT_IMAGES
};

export const getRandomMonsterImage = (type: MonsterType): string => {
  const images = MONSTER_IMAGES[type];
  return images[Math.floor(Math.random() * images.length)];
};