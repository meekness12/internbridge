import React from 'react';

interface PremiumCardProps {
  label: string;
  value: string | number;
  trend: string;
  icon: string | React.ReactNode;
  color?: string; // e.g., 'ki-1', 'ki-2'
  kpiColor?: string; // e.g., 'kpi-1', 'kpi-2'
  alert?: boolean;
}

/**
 * PremiumCard Component
 * High-fidelity KPI card with parchment styling and indicator bars.
 */
export const PremiumCard: React.FC<PremiumCardProps> = ({ 
  label, 
  value, 
  trend, 
  icon, 
  color = 'ki-1', 
  kpiColor = 'kpi-1',
  alert = false
}) => {
  return (
    <div className={`kpi ${kpiColor} bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group`}>
      <div className={`kpi-icon ${color} w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4 bg-slate-50 border border-slate-100 transition-transform group-hover:scale-110`}>
        {icon}
      </div>
      <div className="kpi-label text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</div>
      <div className="kpi-val text-3xl font-serif font-black text-[var(--color-navy)] leading-none -tracking-tight">{value}</div>
      <div className={`kpi-delta mt-3.5 text-[10px] font-mono font-bold ${trend.includes('↑') ? 'text-emerald-700' : 'text-slate-500'}`}>
        {trend}
      </div>
      {alert && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>}
      
      {/* Premium Indicator Bar (Bottom) */}
      <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[var(--color-gold)] transition-all duration-500 group-hover:w-full"></div>
    </div>
  );
};
