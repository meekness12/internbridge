import React from 'react';

interface ActionItem {
  label: string;
  sub: string;
  icon: string | React.ReactNode;
  color: string; // Tailwind class for background/text
}

interface PremiumActionGridProps {
  title: string;
  items: ActionItem[];
}

/**
 * PremiumActionGrid Component
 * 2x2 grid for common user actions with icons and refined hover states.
 */
export const PremiumActionGrid: React.FC<PremiumActionGridProps> = ({ title, items }) => {
  return (
    <div className="card bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
      <div className="text-[13px] font-bold text-[var(--color-navy)] mb-6">{title}</div>
      <div className="grid grid-cols-2 gap-3">
        {items.map((a, i) => (
          <button key={i} className="flex items-center gap-3 p-4 bg-[var(--background)] border border-[var(--border)] rounded-xl hover:border-[var(--color-navy)] hover:bg-[var(--surface)] transition-all text-left group">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition-transform group-hover:scale-110 ${a.color}`}>
              {a.icon}
            </div>
            <div>
              <div className="text-[11px] font-black text-[var(--color-navy)] uppercase tracking-tight">{a.label}</div>
              <div className="text-[9px] text-slate-300 font-bold whitespace-nowrap">{a.sub}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
