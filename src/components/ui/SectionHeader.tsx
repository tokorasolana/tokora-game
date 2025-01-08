import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8">
      <h2 className="retro-text text-3xl mb-2">{title}</h2>
      {subtitle && (
        <p className="text-tokora-grey">{subtitle}</p>
      )}
      <div className="h-1 bg-gradient-to-r from-tokora-cyan to-transparent mt-4" />
    </div>
  );
};