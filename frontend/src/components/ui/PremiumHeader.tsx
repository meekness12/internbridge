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
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-14">
      <div className="max-w-2xl">
        <div className={`ph-eyebrow flex items-center gap-2 text-[9px] sm:text-[10px] font-mono font-bold ${eyebrowColor} tracking-[0.3em] uppercase mb-3`}>
          <span className={`w-6 h-[1px] bg-current opacity-30`}></span>
          {eyebrow}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[var(--color-navy)] leading-[1.15] tracking-tight">
          {title} {italicTitle && <em className="italic text-slate-400 font-normal">{italicTitle}</em>}
        </h1>
        <p className="text-[11px] sm:text-xs text-slate-400 mt-4 font-medium uppercase tracking-widest leading-relaxed">
          {subtitle}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {additionalActions}
        {secondaryAction}
        {primaryAction}
      </div>
    </div>
  );
};
