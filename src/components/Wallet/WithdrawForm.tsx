import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { WithdrawData } from './WalletWithdraw';

interface WithdrawFormProps {
  maxAmount: number;
  onSubmit: (data: WithdrawData) => void;
}

export const WithdrawForm: React.FC<WithdrawFormProps> = ({ maxAmount, onSubmit }) => {
  const [amount, setAmount] = useState<number>(0);
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > 0 && amount <= maxAmount && address) {
      onSubmit({ amount, address });
    }
  };

  const setPercentage = (percentage: number) => {
    setAmount(Math.floor((maxAmount * percentage) / 100));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm text-tokora-grey">
          Amount to withdraw:
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Math.min(Number(e.target.value), maxAmount))}
          className="w-full bg-tokora-black/50 border border-tokora-cyan/30 rounded-lg px-4 py-2
                   focus:outline-none focus:border-tokora-cyan text-white"
          placeholder="Enter amount..."
          min={0}
          max={maxAmount}
        />
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={() => setPercentage(50)}
            className="flex-1 px-4 py-2 bg-tokora-cyan/20 hover:bg-tokora-cyan/30 rounded-lg text-sm"
          >
            50%
          </button>
          <button
            type="button"
            onClick={() => setPercentage(100)}
            className="flex-1 px-4 py-2 bg-tokora-cyan/20 hover:bg-tokora-cyan/30 rounded-lg text-sm"
          >
            100%
          </button>
        </div>
        <div className="text-sm text-tokora-grey">
          Available: {maxAmount} $TOKORA
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm text-tokora-grey">
          Solana Address:
        </label>
        <div className="relative">
          <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-tokora-grey" />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-tokora-black/50 border border-tokora-cyan/30 rounded-lg pl-10 pr-4 py-2
                     focus:outline-none focus:border-tokora-cyan text-white font-mono"
            placeholder="Enter your Solana address..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={amount <= 0 || amount > maxAmount || !address}
        className="w-full retro-button"
      >
        Continue to Confirmation
      </button>
    </form>
  );
};