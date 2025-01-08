import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { WithdrawData } from './WalletWithdraw';

interface WithdrawConfirmationProps {
  data: WithdrawData;
  onConfirm: () => void;
  onCancel: () => void;
}

export const WithdrawConfirmation: React.FC<WithdrawConfirmationProps> = ({
  data,
  onConfirm,
  onCancel
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-tokora-cyan/10 border border-tokora-cyan/20 rounded-lg p-4">
        <h4 className="font-bold mb-4">Please confirm your withdrawal:</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-tokora-grey">Amount:</span>
            <span className="font-bold">{data.amount} $TOKORA</span>
          </div>
          <div className="flex justify-between">
            <span className="text-tokora-grey">To Address:</span>
            <span className="font-mono">{data.address}</span>
          </div>
        </div>
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-400">
          Please verify all details carefully. Withdrawals cannot be reversed once confirmed.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onConfirm}
          className="flex-1 retro-button bg-tokora-green hover:bg-green-600"
        >
          Confirm Withdrawal
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
  );
};