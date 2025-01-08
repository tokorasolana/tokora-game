import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MenuSectionProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  id,
  title,
  description,
  icon: Icon,
  color
}) => {
  return (
    <button
      onClick={() => window.location.hash = id}
      className="group relative w-full aspect-square"
    >
      <div className={`absolute inset-0 bg-gradient-to-br from-tokora-${color} to-tokora-cyan/50
        transform transition-all duration-300 group-hover:scale-[0.96]
        pixel-border pixel-corners`}
      >
        <div className="absolute inset-[2px] bg-tokora-black/40" />
      </div>
      
      <div className="relative h-full flex flex-col items-center justify-center p-4 text-center">
        <Icon className="w-10 h-10 mb-3 transform group-hover:scale-110 transition-transform text-tokora-cyan" />
        <h2 className="retro-text text-lg mb-1">
          {title}
        </h2>
        <p className="text-sm text-tokora-grey">
          {description}
        </p>
        
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-tokora-cyan/5 pointer-events-none" />
      </div>
    </button>
  );
};