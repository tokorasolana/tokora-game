import React from 'react';
import { AlertTriangle, Coins } from 'lucide-react';

interface GuestModeWarningProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const GuestModeWarning: React.FC<GuestModeWarningProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-tokora-black/90 flex items-center justify-center p-4 z-50">
      <div className="retro-card max-w-md w-full animate-scale">
        <div className="flex items-center gap-3 mb-4 text-tokora-gold">
          <AlertTriangle className="w-6 h-6" />
          <h2 className="text-xl font-bold">Guest Mode Notice</h2>
        </div>

        <div className="space-y-4 mb-6">
          <p className="text-tokora-grey">
            Guest users will be using a display version of the game, any $TOKORA won or lost is only for display, and does not affect the real $TOKORA ecosystem.
          </p>

          <div className="bg-tokora-gold/10 border border-tokora-gold/20 rounded-lg p-4 flex items-center gap-3">
            <Coins className="w-5 h-5 text-tokora-gold shrink-0" />
            <p className="text-sm text-tokora-gold">
              You will be granted 1,000,000 fake $TOKORA to test the game
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="retro-button flex-1"
          >
            Continue as Guest
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border-2 border-tokora-cyan/30 rounded-lg
                     text-tokora-cyan hover:bg-tokora-cyan/10 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};