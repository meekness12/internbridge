import React from 'react';

interface TimelineItem {
  title: string;
  meta: string;
  body: string;
  color: string;
}

interface PremiumTimelineProps {
  title: string;
  subtitle: string;
  items: TimelineItem[];
  actionLabel?: string;
}

/**
 * PremiumTimeline Component
 * Vertical chronological timeline with connecting nodes and refined typography.
 */
export const PremiumTimeline: React.FC<PremiumTimelineProps> = ({ 
  title, 
  subtitle, 
  items,
  actionLabel = "Full Audit Log"
}) => {
  return (
    <div className="card bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm h-full">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between">
        <div>
          <div className="text-[13px] font-bold text-[var(--color-navy)]">{title}</div>
          <div className="text-[10px] text-slate-400 font-medium mt-1">{subtitle}</div>
        </div>
        <button className="text-[10px] font-bold text-[var(--color-gold)] uppercase tracking-widest hover:underline">{actionLabel}</button>
      </div>
      <div className="p-8">
        <div className="space-y-0 text-left">
          {items.map((item, i) => (
            <div key={i} className="flex gap-6 pb-8 relative last:pb-0">
              {i !== items.length - 1 && <div className="absolute left-[5px] top-4 w-[1px] h-full bg-slate-100"></div>}
              <div 
                className="relative z-10 w-2.5 h-2.5 rounded-full border-2 border-white mt-1.5 flex-shrink-0" 
                style={{ 
                  backgroundColor: item.color, 
                  boxShadow: `0 0 0 4px #F8F5EF` 
                }}
              ></div>
              <div>
                <div className="text-sm font-bold text-[var(--color-navy)]">{item.title}</div>
                <div className="text-[10px] font-mono font-bold text-slate-400 mt-1 uppercase tracking-wider">{item.meta}</div>
                <div className="text-[12px] text-slate-500 mt-2 leading-relaxed max-w-2xl">{item.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
