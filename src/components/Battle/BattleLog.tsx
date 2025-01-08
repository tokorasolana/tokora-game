import React, { useEffect, useRef } from 'react';

interface BattleLogProps {
  messages: string[];
}

export const BattleLog: React.FC<BattleLogProps> = ({ messages }) => {
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={logRef}
      className="bg-gray-800 rounded-lg p-4 h-32 overflow-y-auto text-sm space-y-1"
    >
      {messages.map((message, index) => (
        <div key={index} className="text-gray-300">
          {message}
        </div>
      ))}
    </div>
  );
};