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
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import { PremiumCard } from '../../components/ui/PremiumCard';

const Analytics: React.FC = () => {
  const stats = [
    { label: 'Logged Hours', value: '128', trend: '+12% Velocity', icon: '⏱️', color: 'ki-1', kpiColor: 'kpi-1' },
    { label: 'Audit Compliance', value: '98%', trend: 'Elite Standing', icon: '✅', color: 'ki-2', kpiColor: 'kpi-2' },
    { label: 'System Skill-set', value: '14', trend: '+4 Nodes unlocked', icon: '🎯', color: 'ki-3', kpiColor: 'kpi-3' },
    { label: 'Weekly Velocity', value: '38', trend: 'Average Daily High', icon: '📈', color: 'ki-5', kpiColor: 'kpi-5' },
    { label: 'Academic Standing', value: 'A+', trend: 'Top 5% Cohort', icon: '🎓', color: 'ki-4', kpiColor: 'kpi-4' },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Performance Metrics"
        title="Analytical"
        italicTitle="Insight"
        subtitle="Trinity Term 2024 · Quantitative Skill Assessment · Verified Records"
        eyebrowColor="text-[var(--color-navy)]"
        primaryAction={
           <div className="flex items-center gap-4 px-8 h-11 bg-[var(--color-navy)] text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-black/10">
              <Award size={18} className="text-[var(--color-gold)]" /> Scholar Profile Verified
           </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <PremiumCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 card p-10 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all group">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h3 className="font-serif text-3xl text-[var(--color-navy)] tracking-tight">Activity <em className="italic text-slate-400">Dispersion</em></h3>
              <p className="text-[11px] text-slate-400 font-mono font-bold uppercase tracking-widest mt-2">Time Distribution Across Term</p>
            </div>
            <div className="flex bg-slate-50 p-1.5 rounded-xl border border-slate-100">
              <button className="px-4 py-2 bg-white text-[var(--color-navy)] shadow-sm rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all">Daily</button>
              <button className="px-4 py-2 text-slate-400 hover:text-[var(--color-navy)] rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all">Weekly</button>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-6 px-4 pb-4 border-b border-l border-slate-50 rounded-bl-2xl">
             {[35, 42, 38, 55, 48, 72, 45, 64].map((h, i) => (
               <div key={i} className="flex-1 group relative h-full flex flex-col justify-end">
                  <div 
                    className="w-full bg-[var(--color-navy)] opacity-5 group-hover:opacity-100 transition-all rounded-t-lg shadow-black/10"
                    style={{ height: `${h}%` }}
                  ></div>
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[var(--color-gold)] text-[var(--color-navy)] font-mono font-bold text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg shadow-[var(--color-gold)]/20 scale-90 group-hover:scale-100">
                    {h}h
                  </div>
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-mono text-[9px] font-bold text-slate-300 uppercase tracking-tighter transition-colors group-hover:text-[var(--color-navy)]">Wk 0{i+1}</div>
               </div>
             ))}
          </div>
          <div className="mt-16 flex justify-between items-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-emerald-500"><TrendingUp size={20} /></div>
                <div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Seasonal Trend</div>
                   <div className="text-sm font-bold text-[var(--color-navy)]">Peak engagement recorded in Week 6</div>
                </div>
             </div>
             <button className="text-[10px] font-bold text-[var(--color-navy)] uppercase tracking-[0.2em] hover:text-[var(--color-gold)] transition-colors">Audit Full Term <ChevronRight size={14} className="inline ml-1" /></button>
          </div>
        </div>

        <div className="lg:col-span-5 card p-10 bg-[var(--color-navy)] text-white border-none shadow-2xl rounded-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="font-serif text-3xl mb-12 tracking-tight">Skill <em className="italic text-[var(--color-gold)] opacity-70">Inventory</em></h3>
            
            <div className="space-y-8">
              {[
                { label: 'Backend (Java/Spring)', val: 85, color: '#B8831A' },
                { label: 'Frontend (React/Vite)', val: 72, color: '#B8831A' },
                { label: 'UI Architectures', val: 94, color: '#B8831A' },
                { label: 'System Optimization', val: 45, color: '#B8831A' }
              ].map((skill, idx) => (
                <div key={idx} className="group/skill">
                  <div className="flex justify-between items-center mb-3">
                     <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] opacity-50 group-hover/skill:opacity-100 transition-opacity">{skill.label}</span>
                     <span className="text-[10px] font-mono font-black text-[var(--color-gold)]">{skill.val}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                    <div 
                      className="h-full bg-[var(--color-gold)] rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(184,131,26,0.3)]"
                      style={{ width: `${skill.val}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-colors">
               <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-2xl flex items-center justify-center shadow-xl shadow-black/20 group-hover:scale-110 transition-transform">
                    <BarChart2 size={28} />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono font-black text-white/30 uppercase tracking-[0.3em] mb-2">Growth Vector</p>
                    <p className="text-[15px] font-serif font-medium leading-relaxed opacity-90">Your project velocity has increased by <span className="text-[var(--color-gold)]">14.2%</span> during this terminal cycle.</p>
                  </div>
               </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/10 transition-all"></div>
          <div className="absolute bottom-4 right-8 text-[9px] font-mono opacity-20 uppercase tracking-[0.4em]">Proprietary Assessment Logic</div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
