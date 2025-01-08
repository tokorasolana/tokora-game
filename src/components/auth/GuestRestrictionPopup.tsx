import React from 'react';
import { Lock } from 'lucide-react';

interface GuestRestrictionPopupProps {
  onClose: () => void;
}

export const GuestRestrictionPopup: React.FC<GuestRestrictionPopupProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-tokora-black/90 flex items-center justify-center p-4 z-50">
      <div className="retro-card max-w-md w-full animate-scale">
        <div className="flex items-center gap-3 mb-4 text-tokora-cyan">
          <Lock className="w-6 h-6" />
          <h2 className="text-xl font-bold">Feature Restricted</h2>
        </div>

        <p className="text-tokora-grey mb-6">
          This feature is only available for registered users. Please sign in with your account to access the wallet functionality.
        </p>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="retro-button w-full"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};