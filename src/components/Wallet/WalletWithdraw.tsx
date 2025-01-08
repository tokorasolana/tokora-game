import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { RetroCard } from '../ui/RetroCard';
import { WithdrawForm } from './WithdrawForm';
import { WithdrawConfirmation } from './WithdrawConfirmation';
import { WithdrawProcessing } from './WithdrawProcessing';
import { WithdrawSuccess } from './WithdrawSuccess';
import { useGame } from '../../context/GameContext';

export type WithdrawStep = 'form' | 'confirm' | 'processing' | 'success';

export interface WithdrawData {
  amount: number;
  address: string;
}

export const WalletWithdraw: React.FC = () => {
  const [step, setStep] = useState<WithdrawStep>('form');
  const [withdrawData, setWithdrawData] = useState<WithdrawData | null>(null);
  const { player, addTokens } = useGame();

  const handleSubmit = (data: WithdrawData) => {
    setWithdrawData(data);
    setStep('confirm');
  };

  const handleConfirm = async () => {
    if (!withdrawData) return;
    
    setStep('processing');
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 7000));
    
    // Deduct tokens from user's balance
    await addTokens(-withdrawData.amount);
    
    setStep('success');
  };

  return (
    <div className="space-y-6">
      <RetroCard hover={false} className="p-6">
        <h3 className="text-xl font-bold mb-4">Withdraw $TOKORA</h3>

        {step === 'form' && (
          <WithdrawForm 
            maxAmount={player.tokens} 
            onSubmit={handleSubmit}
          />
        )}

        {step === 'confirm' && withdrawData && (
          <WithdrawConfirmation
            data={withdrawData}
            onConfirm={handleConfirm}
            onCancel={() => setStep('form')}
          />
        )}

        {step === 'processing' && <WithdrawProcessing />}
        
        {step === 'success' && (
          <WithdrawSuccess onClose={() => setStep('form')} />
        )}

        {step === 'form' && (
          <div className="mt-4 bg-tokora-cyan/10 border border-tokora-cyan/20 rounded-lg p-4 flex gap-3">
            <Clock className="w-5 h-5 text-tokora-cyan shrink-0 mt-0.5" />
            <p className="text-sm text-tokora-cyan">
              $TOKORA can take up to 30 minutes to show in your wallet. 
              Especially during times of high network congestion.
            </p>
          </div>
        )}
      </RetroCard>
    </div>
  );
};