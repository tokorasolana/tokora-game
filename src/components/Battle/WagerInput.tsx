import React from 'react';
import { Coins } from 'lucide-react';

interface WagerInputProps {
  maxAmount: number;
  value: number;
  onChange: (value: number) => void;
}

export const WagerInput: React.FC<WagerInputProps> = ({
  maxAmount,
  value,
  onChange
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    onChange(Math.min(newValue, maxAmount));
  };

  const setPercentage = (percentage: number) => {
    onChange(Math.floor((maxAmount * percentage) / 100));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <label className="block text-sm text-tokora-grey">
          Enter wager amount:
        </label>
        <div className="relative">
          <input
            type="number"
            value={value || ''}
            onChange={handleInputChange}
            min={0}
            max={maxAmount}
            className="w-full bg-tokora-black/50 border border-tokora-cyan/30 rounded-lg px-4 py-2
                     focus:outline-none focus:border-tokora-cyan text-white"
            placeholder="Enter amount..."
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-tokora-grey">
            <Coins className="w-4 h-4" />
            <span className="text-sm">$TOKORA</span>
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm text-tokora-grey mb-2">Quick select:</div>
        <div className="grid grid-cols-2 gap-2">
          {[10, 25, 50, 100].map(percentage => (
            <button
              key={percentage}
              onClick={() => setPercentage(percentage)}
              disabled={maxAmount === 0}
              className={`px-4 py-2 rounded-lg text-sm font-medium
                ${maxAmount > 0
                  ? 'bg-tokora-cyan/20 hover:bg-tokora-cyan/30 text-tokora-cyan'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
            >
              {percentage}%
            </button>
          ))}
        </div>
      </div>

      <div className="text-sm text-tokora-grey">
        Available balance: {maxAmount} $TOKORA
      </div>
    </div>
  );
};