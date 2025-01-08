import React, { createContext, useContext, useState, useEffect } from 'react';
import { Equipment } from '../types/game';

interface ShopState {
  soldItems: Set<string>;
  nextResetTime: Date;
}

interface ShopContextType {
  isSoldOut: (itemId: string) => boolean;
  markAsSold: (itemId: string) => void;
  timeUntilReset: string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
};

const SHOP_STATE_KEY = 'tokora_shop_state';

const getNextResetTime = () => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
};

const loadPersistedState = (): ShopState => {
  try {
    const savedState = localStorage.getItem(SHOP_STATE_KEY);
    if (savedState) {
      const parsed = JSON.parse(savedState);
      return {
        soldItems: new Set(parsed.soldItems),
        nextResetTime: new Date(parsed.nextResetTime)
      };
    }
  } catch (error) {
    console.error('Error loading shop state:', error);
  }
  
  return {
    soldItems: new Set<string>(),
    nextResetTime: getNextResetTime()
  };
};

const formatTimeRemaining = (ms: number): string => {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shopState, setShopState] = useState<ShopState>(loadPersistedState);
  const [timeUntilReset, setTimeUntilReset] = useState('');

  // Persist state changes
  useEffect(() => {
    try {
      localStorage.setItem(SHOP_STATE_KEY, JSON.stringify({
        soldItems: Array.from(shopState.soldItems),
        nextResetTime: shopState.nextResetTime.toISOString()
      }));
    } catch (error) {
      console.error('Error saving shop state:', error);
    }
  }, [shopState]);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const timeDiff = shopState.nextResetTime.getTime() - now.getTime();
      
      if (timeDiff <= 0) {
        setShopState({
          soldItems: new Set<string>(),
          nextResetTime: getNextResetTime()
        });
      } else {
        setTimeUntilReset(formatTimeRemaining(timeDiff));
      }
    };

    const timer = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(timer);
  }, [shopState.nextResetTime]);

  const isSoldOut = (itemId: string): boolean => {
    return shopState.soldItems.has(itemId);
  };

  const markAsSold = (itemId: string) => {
    setShopState(prev => ({
      ...prev,
      soldItems: new Set([...prev.soldItems, itemId])
    }));
  };

  return (
    <ShopContext.Provider value={{ isSoldOut, markAsSold, timeUntilReset }}>
      {children}
    </ShopContext.Provider>
  );
};