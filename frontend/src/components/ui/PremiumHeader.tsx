import React from 'react';

interface PremiumHeaderProps {
  eyebrow: string;
  title: string;
  italicTitle?: string;
  subtitle: string;
  eyebrowColor?: string;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  additionalActions?: React.ReactNode;
}

/**
 * PremiumHeader Component
 * Editorial-style header with eyebrow line, serif typography, and dual actions.
 */
export const PremiumHeader: React.FC<PremiumHeaderProps> = ({
  eyebrow,
  title,
  italicTitle,
  subtitle,
  eyebrowColor = 'text-[var(--color-navy)]',
  primaryAction,
  secondaryAction,
  additionalActions
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
      <div>
        <div className={`ph-eyebrow flex items-center gap-2 text-[10px] font-mono font-bold ${eyebrowColor} tracking-widest uppercase mb-2`}>
          <span className={`w-4 h-[1px] bg-current opacity-30`}></span>
          {eyebrow}
        </div>
        <h1 className="text-5xl font-serif text-[var(--color-navy)] leading-tight">
          {title} {italicTitle && <em className="italic text-slate-400 font-normal">{italicTitle}</em>}
        </h1>
        <p className="text-xs text-slate-400 mt-2 font-medium">
          {subtitle}
        </p>
      </div>
      <div className="flex gap-2.5 items-start">
        {additionalActions}
        {secondaryAction}
        {primaryAction}
      </div>
    </div>
  );
};
