import React, { useState } from 'react';
import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { RetroCard } from '../ui/RetroCard';
import { WalletDeposit } from './WalletDeposit';
import { WalletWithdraw } from './WalletWithdraw';

export const WalletActions: React.FC = () => {
  const [activeAction, setActiveAction] = useState<'deposit' | 'withdraw' | null>(null);

  return (
    <>
      <RetroCard hover={false} className="p-8">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setActiveAction('deposit')}
            className="retro-button flex flex-col items-center gap-2 py-4"
          >
            <ArrowDownToLine className="w-6 h-6" />
            <span>Deposit</span>
          </button>

          <button
            onClick={() => setActiveAction('withdraw')}
            className="retro-button flex flex-col items-center gap-2 py-4"
          >
            <ArrowUpFromLine className="w-6 h-6" />
            <span>Withdraw</span>
          </button>
        </div>
      </RetroCard>

      {activeAction === 'deposit' && <WalletDeposit />}
      {activeAction === 'withdraw' && <WalletWithdraw />}
    </>
  );
};