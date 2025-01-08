import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface WithdrawSuccessProps {
  onClose: () => void;
}

export const WithdrawSuccess: React.FC<WithdrawSuccessProps> = ({ onClose }) => {
  return (
    <div className="py-12 text-center">
      <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
      <h4 className="text-lg font-bold mb-2">Withdrawal Submitted</h4>
      <p className="text-sm text-tokora-grey mb-6">
        Please allow up to 30 minutes before your $TOKORA has been received
      </p>
      <button onClick={onClose} className="retro-button">
        Close
      </button>
    </div>
  );
};