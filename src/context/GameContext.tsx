import React, { createContext, useContext, useState, useEffect } from 'react';
import { Monster, Equipment, Player } from '../types/game';
import { PotionType, POTION_CONFIGS, Potion } from '../types/items';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

interface GameContextType {
  player: Player;
  addTokens: (amount: number) => Promise<void>;
  addMonster: (monster: Monster) => Promise<void>;
  addEquipment: (equipment: Equipment) => Promise<void>;
  equipItem: (monsterId: string, equipment: Equipment) => Promise<void>;
  unequipItem: (monsterId: string, type: Equipment['type']) => Promise<void>;
  listMonsterForSale: (monsterId: string, price: number) => Promise<void>;
  cancelListing: (monsterId: string) => Promise<void>;
  buyPotion: (type: PotionType) => Promise<void>;
  usePotion: (potionId: string) => Promise<Potion | null>;
  loading: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const createStarterMonster = (): Monster => ({
  id: crypto.randomUUID(),
  name: "Starter Monster",
  image: "https://i.ibb.co/LpwPXjn/DALL-E-2025-01-04-17-12-45-A-pixel-art-depiction-of-a-Tokora-starter-monster-designed-for-a-play-to.webp",
  rarity: "common",
  stats: {
    attack: 44,
    defense: 44,
    health: 125,
    speed: 44
  },
  equipment: {}
});

const createInitialPlayerState = (userId: string, isGuest: boolean = false): Player => ({
  id: userId,
  tokens: isGuest ? 1000000 : 0, // New users start with 0 tokens, guests get 1M for testing
  monsters: [createStarterMonster()],
  inventory: [],
  listedMonsters: [],
  potions: []
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [player, setPlayer] = useState<Player>(() => 
    createInitialPlayerState(user?.id || crypto.randomUUID(), user?.isGuest)
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlayerData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      if (user.isGuest) {
        setPlayer(createInitialPlayerState(user.id, true));
        setLoading(false);
        return;
      }

      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('game_data')
          .eq('id', user.id)
          .single();

        if (profile?.game_data) {
          const gameData = profile.game_data as Player;
          if (!gameData.monsters || gameData.monsters.length === 0) {
            gameData.monsters = [createStarterMonster()];
            await supabase
              .from('profiles')
              .update({ game_data: gameData })
              .eq('id', user.id);
          }
          setPlayer(gameData);
        } else {
          const initialState = createInitialPlayerState(user.id);
          await supabase
            .from('profiles')
            .update({ game_data: initialState })
            .eq('id', user.id);
          setPlayer(initialState);
        }
      } catch (error) {
        console.error('Error loading player data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPlayerData();
  }, [user]);

  const savePlayerData = async (newPlayerState: Player) => {
    if (!user || user.isGuest) return;

    try {
      await supabase
        .from('profiles')
        .update({ game_data: newPlayerState })
        .eq('id', user.id);
    } catch (error) {
      console.error('Error saving player data:', error);
    }
  };

  const addTokens = async (amount: number) => {
    const newPlayerState = {
      ...player,
      tokens: Math.max(0, player.tokens + amount)
    };
    setPlayer(newPlayerState);
    await savePlayerData(newPlayerState);
  };

  const addMonster = async (monster: Monster) => {
    const newPlayerState = {
      ...player,
      monsters: [...player.monsters, monster]
    };
    setPlayer(newPlayerState);
    await savePlayerData(newPlayerState);
  };

  const addEquipment = async (equipment: Equipment) => {
    if (player.tokens < equipment.price) return;

    const newPlayerState = {
      ...player,
      tokens: player.tokens - equipment.price,
      inventory: [...player.inventory, equipment]
    };
    setPlayer(newPlayerState);
    await savePlayerData(newPlayerState);
  };

  const equipItem = async (monsterId: string, equipment: Equipment) => {
    const newPlayerState = {
      ...player,
      monsters: player.monsters.map(monster =>
        monster.id === monsterId
          ? { ...monster, equipment: { ...monster.equipment, [equipment.type]: equipment } }
          : monster
      ),
      inventory: player.inventory.filter(item => item.id !== equipment.id)
    };
    setPlayer(newPlayerState);
    await savePlayerData(newPlayerState);
  };

  const unequipItem = async (monsterId: string, type: Equipment['type']) => {
    const monster = player.monsters.find(m => m.id === monsterId);
    if (!monster || !monster.equipment[type]) return;

    const equipment = monster.equipment[type]!;
    const newPlayerState = {
      ...player,
      monsters: player.monsters.map(m =>
        m.id === monsterId
          ? { ...m, equipment: { ...m.equipment, [type]: undefined } }
          : m
      ),
      inventory: [...player.inventory, equipment]
    };
    setPlayer(newPlayerState);
    await savePlayerData(newPlayerState);
  };

  const listMonsterForSale = async (monsterId: string, price: number) => {
    const newPlayerState = {
      ...player,
      listedMonsters: [...player.listedMonsters, monsterId]
    };
    setPlayer(newPlayerState);
    await savePlayerData(newPlayerState);
  };

  const cancelListing = async (monsterId: string) => {
    const newPlayerState = {
      ...player,
      listedMonsters: player.listedMonsters.filter(id => id !== monsterId)
    };
    setPlayer(newPlayerState);
    await savePlayerData(newPlayerState);
  };

  const buyPotion = async (type: PotionType) => {
    const potionConfig = POTION_CONFIGS[type];
    if (player.tokens < potionConfig.price) return;

    const potion: Potion = {
      id: crypto.randomUUID(),
      ...potionConfig
    };

    const newPlayerState = {
      ...player,
      tokens: player.tokens - potionConfig.price,
      potions: [...player.potions, potion]
    };
    setPlayer(newPlayerState);
    await savePlayerData(newPlayerState);
  };

  const usePotion = async (potionId: string): Promise<Potion | null> => {
    const potion = player.potions.find(p => p.id === potionId);
    if (!potion) return null;

    const newPlayerState = {
      ...player,
      potions: player.potions.filter(p => p.id !== potionId)
    };
    setPlayer(newPlayerState);
    await savePlayerData(newPlayerState);
    return potion;
  };

  return (
    <GameContext.Provider value={{
      player,
      addTokens,
      addMonster,
      addEquipment,
      equipItem,
      unequipItem,
      listMonsterForSale,
      cancelListing,
      buyPotion,
      usePotion,
      loading
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within a GameProvider');
  return context;
};