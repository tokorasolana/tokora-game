import React from 'react';
import { cn } from '../../utils/cn';

interface RetroCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const RetroCard: React.FC<RetroCardProps> = ({
  children,
  className,
  onClick,
  hover = true
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'retro-card',
        hover && 'hover:scale-[1.02] transition-transform cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
};