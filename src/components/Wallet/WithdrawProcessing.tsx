import React from 'react';
import { Loader2 } from 'lucide-react';

export const WithdrawProcessing: React.FC = () => {
  return (
    <div className="py-12 text-center">
      <Loader2 className="w-12 h-12 text-tokora-cyan animate-spin mx-auto mb-4" />
      <h4 className="text-lg font-bold mb-2">Processing Withdrawal</h4>
      <p className="text-sm text-tokora-grey">
        Please wait while we process your withdrawal...
      </p>
    </div>
  );
};