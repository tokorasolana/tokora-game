import React, { useState, useEffect } from 'react';
import { Gamepad } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [showContent, setShowContent] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    // Show content after a brief delay
    const showTimer = setTimeout(() => setShowContent(true), 500);
    
    // Progress animation
    const startTime = Date.now();
    const duration = 10000; // 10 seconds for progress
    
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(progressInterval);
        setLoadingComplete(true);
      }
    }, 50);

    return () => {
      clearTimeout(showTimer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-tokora-black z-50 flex items-center justify-center">
      <div className="absolute inset-0">
        {/* Animated grid background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            animation: 'pattern-slide 20s linear infinite'
          }}
        />
        
        {/* Radial gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(8, 8, 16, 0.8) 70%)'
          }}
        />
      </div>

      <div className="container max-w-4xl mx-auto px-6 relative">
        <div className={`text-center transition-all duration-1000 delay-200
          ${showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}
        >
          {/* Logo */}
          <div className="mb-8 flex items-center justify-center">
            <div className="w-20 h-20 bg-tokora-cyan/10 rounded-2xl flex items-center justify-center">
              <Gamepad className="w-12 h-12 text-tokora-cyan" />
            </div>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h1 className="retro-text text-4xl md:text-5xl mb-4">
              Welcome to Tokora
            </h1>
          </div>

          {/* Main text */}
          <div className="space-y-6 text-lg text-tokora-grey max-w-3xl mx-auto mb-12">
            <p className="animate-fade-in-1">
              Tamer, you've entered a realm of legendary battles and rare monsters. 
              Train your allies—Dragons, Wolves, Giants, Bears, and Serpents—and compete 
              to earn $TOKORA, the lifeblood of our world.
            </p>

            <p className="animate-fade-in-2">
              Only 999 of each monster species exist. Once they're claimed, you'll need 
              to trade with fellow Tamers in the marketplace to acquire them. Every $TOKORA 
              transaction burns tokens, reducing supply and increasing rarity.
            </p>

            <p className="animate-fade-in-3">
              Will you rise to become a champion, amass $TOKORA, and forge your legacy? 
              The fate of Tokora awaits.
            </p>
          </div>

          {/* Loading Bar */}
          <div className="max-w-md mx-auto">
            <div className="h-2 bg-tokora-black/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-tokora-cyan via-tokora-blue to-tokora-purple transition-all duration-300 ease-out"
                style={{ 
                  width: `${progress}%`,
                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)'
                }}
              />
            </div>
            <div className="mt-2 text-sm text-tokora-grey mb-6">
              {loadingComplete ? 'Loading Complete!' : `Loading Tokora... ${Math.round(progress)}%`}
            </div>

            {/* Continue Button */}
            {loadingComplete && (
              <button
                onClick={onComplete}
                className="retro-button px-8 py-3 animate-fade-in-1"
              >
                Enter Tokora
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};