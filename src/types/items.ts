export type PotionType = 'small' | 'large' | 'mythic';

export interface Potion {
  id: string;
  type: PotionType;
  name: string;
  description: string;
  healPercentage: number;
  price: number;
  image: string;
}

export const POTION_CONFIGS: Record<PotionType, Omit<Potion, 'id'>> = {
  small: {
    type: 'small',
    name: 'Small Health Potion',
    description: 'Restores 25% of max health',
    healPercentage: 25,
    price: 1000,
    image: 'https://source.unsplash.com/100x100/?potion,red'
  },
  large: {
    type: 'large',
    name: 'Large Health Potion',
    description: 'Restores 50% of max health',
    healPercentage: 50,
    price: 2000,
    image: 'https://source.unsplash.com/100x100/?potion,purple'
  },
  mythic: {
    type: 'mythic',
    name: 'Mythic Health Potion',
    description: 'Restores 100% of max health',
    healPercentage: 100,
    price: 4000,
    image: 'https://source.unsplash.com/100x100/?potion,gold'
  }
};