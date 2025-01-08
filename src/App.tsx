import React, { useState } from 'react';
import { GameProvider } from './context/GameContext';
import { AuthProvider } from './context/AuthContext';
import { GameLayout } from './components/layout/GameLayout';
import { SignInPage } from './components/auth/SignInPage';
import { LoadingScreen } from './components/LoadingScreen';
import { useAuth } from './context/AuthContext';

const GameContent = () => {
  const { user } = useAuth();

  if (!user) {
    return <SignInPage />;
  }

  return (
    <GameProvider>
      <GameLayout />
    </GameProvider>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <AuthProvider>
      {loading ? (
        <LoadingScreen onComplete={() => setLoading(false)} />
      ) : (
        <GameContent />
      )}
    </AuthProvider>
  );
};

export default App;