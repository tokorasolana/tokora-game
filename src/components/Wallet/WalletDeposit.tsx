import React, { useState } from 'react';
import { Copy, Check, AlertTriangle, Clock, User, Wallet } from 'lucide-react';
import { RetroCard } from '../ui/RetroCard';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';

const DEPOSIT_ADDRESS = "7PXyVSSxGfrWYWYFPnjdErmV5uWBsziyfFVqSzMggs6K";

interface DepositFormProps {
  onSubmit: (address: string) => void;
  username: string;
}

const DepositForm: React.FC<DepositFormProps> = ({ onSubmit, username }) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      onSubmit(address);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-tokora-cyan/10 border border-tokora-cyan/20 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-4">
          <User className="w-5 h-5 text-tokora-cyan shrink-0" />
          <div>
            <div className="text-sm text-tokora-grey">Depositing to account:</div>
            <div className="font-bold text-tokora-cyan">{username}</div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-tokora-grey">
            Your Solana Address:
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
      </div>

      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-400">
          Please ensure this is your correct Solana address. This will be used to verify your deposit.
        </p>
      </div>

      <button
        type="submit"
        disabled={!address.trim()}
        className={cn(
          "w-full retro-button",
          !address.trim() && "opacity-50 cursor-not-allowed"
        )}
      >
        Continue
      </button>
    </form>
  );
};

interface DepositDetailsProps {
  address: string;
  onBack: () => void;
}

const DepositDetails: React.FC<DepositDetailsProps> = ({ address, onBack }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(DEPOSIT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-tokora-grey mb-2">
          Send $TOKORA to this address:
        </label>
        <div className="flex items-center gap-2">
          <code className="flex-1 bg-tokora-black/50 p-3 rounded-lg font-mono text-sm break-all">
            {DEPOSIT_ADDRESS}
          </code>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-tokora-black/30 rounded-lg transition-colors"
          >
            {copied ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5 text-tokora-grey" />
            )}
          </button>
        </div>
      </div>

      <div className="bg-tokora-cyan/10 border border-tokora-cyan/20 rounded-lg p-4">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="w-5 h-5 text-tokora-cyan shrink-0" />
          <div>
            <div className="text-sm text-tokora-grey">Deposit will be verified from:</div>
            <div className="font-mono text-sm text-tokora-cyan break-all">{address}</div>
          </div>
        </div>
      </div>

      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex gap-3">
        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <p className="text-sm text-red-400">
          Any SOL or other SPL tokens sent to this address will be lost forever. 
          Please do not make this mistake, you will not be refunded.
        </p>
      </div>

      <div className="bg-tokora-cyan/10 border border-tokora-cyan/20 rounded-lg p-4 flex gap-3">
        <Clock className="w-5 h-5 text-tokora-cyan shrink-0 mt-0.5" />
        <p className="text-sm text-tokora-cyan">
          $TOKORA can take up to 30 minutes to show on your account. 
          Especially during times of high network congestion.
        </p>
      </div>

      <button
        onClick={onBack}
        className="w-full px-4 py-2 border-2 border-tokora-cyan/30 rounded-lg
                 text-tokora-cyan hover:bg-tokora-cyan/10 transition-colors"
      >
        ← Back
      </button>
    </div>
  );
};

export const WalletDeposit: React.FC = () => {
  const { user } = useAuth();
  const [depositAddress, setDepositAddress] = useState<string | null>(null);

  if (!user) return null;

  return (
    <div className="space-y-6">
      <RetroCard hover={false} className="p-6">
        <h3 className="text-xl font-bold mb-4">Deposit $TOKORA</h3>
        
        {depositAddress ? (
          <DepositDetails
            address={depositAddress}
            onBack={() => setDepositAddress(null)}
          />
        ) : (
          <DepositForm
            username={user.username}
            onSubmit={setDepositAddress}
          />
        )}
      </RetroCard>
    </div>
  );
};