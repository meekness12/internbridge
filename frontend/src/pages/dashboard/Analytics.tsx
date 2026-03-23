import React from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Target, 
  Clock, 
  CheckCircle2, 
  Award,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

const Analytics: React.FC = () => {
  return (
    <div className="space-y-10 animate-fade-in pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="label-mono text-[10px] tracking-[0.3em] font-bold text-[var(--color-gold)] uppercase mb-3 opacity-80 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
            Performance Metrics
          </div>
          <h1 className="text-5xl font-serif text-[var(--color-navy)] leading-tight">
            Analytical <em className="italic text-slate-400">Insight</em>
          </h1>
        </div>

        <div className="flex items-center gap-4 px-6 py-3 bg-[var(--color-forest)] text-white rounded-full text-xs font-bold uppercase tracking-widest">
           <Award size={18} className="text-[var(--color-gold)]" /> Verified Scholar Profile
        </div>
      </header>

      {/* Top Level KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Logged Hours', value: '128', unit: 'Hrs', trend: '+12%', icon: <Clock /> },
          { label: 'Audit Compliance', value: '98', unit: '%', trend: '+2%', icon: <CheckCircle2 /> },
          { label: 'System Skill-set', value: '14', unit: 'Pts', trend: '+4', icon: <Target /> },
          { label: 'Weekly Velocity', value: '38', unit: 'Avg', trend: '-5%', icon: <TrendingUp />, down: true },
        ].map((kpi, i) => (
          <div key={i} className="card p-6 bg-white border border-[var(--color-border)] flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className="text-[var(--color-forest)] text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                {React.cloneElement(kpi.icon as React.ReactElement<{ size: number }>, { size: 18 })}
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${kpi.down ? 'text-rose-500' : 'text-emerald-500'} font-mono`}>
                {kpi.down ? <ChevronDown size={14} /> : <ChevronUp size={14} />} {kpi.trend}
              </div>
            </div>
            <div>
              <div className="label-mono text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2">{kpi.label}</div>
              <div className="text-3xl font-serif font-bold text-[var(--color-navy)]">{kpi.value} <span className="text-sm opacity-40 font-sans">{kpi.unit}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytical Charts Mockup (Academic Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Hour Distribution */}
        <div className="card p-8 bg-white border border-[var(--color-border)]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <h3 className="font-serif text-2xl text-[var(--color-navy)]">Activity <em className="italic opacity-40">Dispersion</em></h3>
            <div className="flex gap-2">
              <span className="text-[9px] px-2.5 py-1 bg-slate-100 rounded-md font-bold uppercase tracking-widest">Daily</span>
              <span className="text-[9px] px-2.5 py-1 bg-[var(--color-navy)] text-white rounded-md font-bold uppercase tracking-widest">Weekly</span>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-4 px-4 pb-4 border-b border-l border-slate-100 rounded-bl-xl">
             {[35, 42, 38, 55, 48, 62, 45, 58].map((h, i) => (
               <div key={i} className="flex-1 group relative">
                  <div 
                    className="w-full bg-[var(--color-forest)] opacity-10 group-hover:opacity-100 transition-all rounded-t-sm"
                    style={{ height: `${h}%` }}
                  ></div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--color-navy)] text-white font-mono text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h}h
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[8px] font-bold text-slate-300 uppercase tracking-tighter">Wk {i+1}</div>
               </div>
             ))}
          </div>
        </div>

        {/* Skill Matrix */}
        <div className="card p-8 bg-[var(--color-navy)] text-white border-none shadow-xl">
          <h3 className="font-serif text-2xl mb-10">Skill <em className="italic text-[var(--color-gold)] opacity-70">Inventory</em></h3>
          
          <div className="space-y-6">
            {[
              { label: 'Backend (Java/Spring)', val: 85 },
              { label: 'Frontend (React/Vite)', val: 72 },
              { label: 'UI Architectures', val: 94 },
              { label: 'DevOps & Logging', val: 45 }
            ].map((skill, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2.5">
                   <span className="text-[10px] font-mono font-black uppercase tracking-[0.15em] opacity-60">{skill.label}</span>
                   <span className="text-[10px] font-mono font-bold text-[var(--color-gold)]">{skill.val}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--color-gold)] rounded-full shadow-[0_0_15px_rgba(255,215,0,0.3)] transition-all duration-1000"
                    style={{ width: `${skill.val}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-white/5 rounded-xl border border-white/10">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--color-gold)]/10 rounded-full flex items-center justify-center text-[var(--color-gold)]">
                  <BarChart2 size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest mb-1">Growth Index</p>
                  <p className="text-sm font-bold opacity-90 leading-tight">Your project velocity has increased by 14% this month.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
