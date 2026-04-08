import React from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  Award,
  Zap,
  Target,
  Sparkles,
  PieChart,
  ArrowRight
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import { PremiumCard } from '../../components/ui/PremiumCard';

const Analytics: React.FC = () => {
  const stats = [
    { label: 'Project Momentum', value: '128', trend: '+12% Velocity', icon: <Zap size={20} className="text-indigo-600" />, color: 'ki-1', kpiColor: 'kpi-1' },
    { label: 'Skill-set Clusters', value: '14', trend: '+4 Nodes unlocked', icon: <Target size={20} className="text-emerald-600" />, color: 'ki-3', kpiColor: 'kpi-3' },
    { label: 'Weekly Velocity', value: '38', trend: 'Avg Daily High', icon: <TrendingUp size={20} className="text-rose-600" />, color: 'ki-5', kpiColor: 'kpi-5' },
    { label: 'Academic Index', value: 'A+', trend: 'Top 5% Cohort', icon: <Award size={20} className="text-[var(--color-gold)]" />, color: 'ki-4', kpiColor: 'kpi-4' },
    { label: 'System Affinity', value: '94%', trend: 'Verified Rating', icon: <Sparkles size={20} className="text-amber-500" />, color: 'ki-2', kpiColor: 'kpi-2' },
  ];

  return (
    <div className="space-y-12 animate-fade-in pb-20 max-w-[1400px] mx-auto">
      <PremiumHeader 
        eyebrow="Quantitative Assessment"
        title="Performance"
        italicTitle="Intelligence"
        subtitle="Trinity Term 2024 · Verified Academic Metrics · Real-time Sync"
        eyebrowColor="text-[var(--color-gold)]"
        primaryAction={
           <button className="btn btn-primary px-8 py-3 rounded-xl shadow-xl shadow-black/10 hover:scale-105 transition-all text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3">
              Export Dossier <ArrowRight size={18} />
           </button>
        }
      />

      {/* Analytics KPI Hub */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 animate-fade-up">
        {stats.map((stat, i) => (
          <PremiumCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Engagement Visualization */}
        <div className="lg:col-span-12 xl:col-span-8 glass-panel glass-light p-12 relative overflow-hidden group border-[var(--color-gold-faint)]">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--color-gold-light)]/20 to-transparent pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-10 bg-[var(--color-gold)]"></div>
              <div>
                <h3 className="font-serif text-3xl text-[var(--color-navy)] tracking-tight font-bold italic">Engagement Dispersion</h3>
                <p className="text-[10px] text-slate-400 font-mono font-black uppercase tracking-[0.34em] mt-3">Platform interaction across terminal cycle</p>
              </div>
            </div>
            <div className="flex bg-white/50 p-1.5 rounded-[1.2rem] border border-slate-100 shadow-inner">
              {['Periodic', 'Cumulative', 'Forecast'].map((view, i) => (
                <button key={i} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-[var(--color-navy)] text-white shadow-xl' : 'text-slate-400 hover:text-[var(--color-navy)]'}`}>{view}</button>
              ))}
            </div>
          </div>
          
          <div className="h-80 flex items-end justify-between gap-6 px-4 pb-4 border-b border-slate-100 rounded-bl-3xl relative overflow-hidden">
             {[35, 42, 38, 55, 48, 72, 45, 64, 58, 62].map((h, i) => (
               <div key={i} className="flex-1 group relative h-full flex flex-col justify-end">
                  <div 
                    className={`w-full transition-all duration-1000 rounded-t-2xl shadow-xl group-hover:scale-x-110 ${h > 60 ? 'bg-[var(--color-navy)]' : h > 45 ? 'bg-[var(--color-gold)]' : 'bg-slate-200'}`}
                    style={{ height: `${h}%` }}
                  >
                     <div className="h-full w-full bg-gradient-to-t from-black/20 to-transparent opacity-40"></div>
                  </div>
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[var(--color-navy)] text-white font-mono font-bold text-[10px] px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-2xl scale-90 group-hover:scale-100 z-10 border border-white/10">
                    {h}%
                  </div>
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-mono text-[9px] font-black text-slate-300 uppercase tracking-tighter transition-colors group-hover:text-[var(--color-gold)]">W0{i+1}</div>
               </div>
             ))}
             {/* Background decorative grid lines */}
             <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 py-2">
                {[1,2,3,4].map(l => <div key={l} className="h-[1px] w-full bg-slate-100"></div>)}
             </div>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/40 p-10 rounded-[2.5rem] border border-white/60 shadow-xl shadow-black/[0.02]">
             <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-[var(--color-navy)] rounded-3xl flex items-center justify-center shadow-2xl text-[var(--color-gold)]"><TrendingUp size={28} /></div>
                <div>
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Trend Analysis</div>
                   <div className="text-base font-bold text-[var(--color-navy)]">Positive upward trajectory in skill acquisition.</div>
                </div>
             </div>
             <div className="flex items-center gap-6 border-l border-slate-100 pl-10">
                <div className="w-16 h-16 bg-white border border-slate-100 rounded-3xl flex items-center justify-center shadow-xl text-emerald-500"><Zap size={28} /></div>
                <div>
                   <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Cycle Milestone</div>
                   <div className="text-base font-bold text-[var(--color-navy)]">Peak administrative throughput achieved.</div>
                </div>
             </div>
          </div>
        </div>

        {/* Skill Matrix */}
        <div className="lg:col-span-12 xl:col-span-4 card p-12 bg-[var(--color-navy)] text-white border-0 shadow-2xl rounded-[3rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(184,131,26,0.1),transparent)] pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-12">
               <div className="w-10 h-[1.5px] bg-[var(--color-gold)]"></div>
               <h3 className="font-serif text-3xl tracking-tight font-bold italic">Skill Inventory</h3>
            </div>
            
            <div className="space-y-10">
              {[
                { label: 'Engineering Architecture', val: 85, color: 'var(--color-gold)' },
                { label: 'Computational Design', val: 72, color: '#FDFCF9' },
                { label: 'Corporate Strategy', val: 94, color: 'var(--color-gold)' },
                { label: 'Cloud Infrastructure', val: 45, color: '#FDFCF9' }
              ].map((skill, idx) => (
                <div key={idx} className="group/skill animate-fade-up" style={{ animationDelay: `${idx * 0.1 + 0.5}s` }}>
                  <div className="flex justify-between items-center mb-4">
                     <span className="text-[11px] font-mono font-black uppercase tracking-[0.25em] opacity-40 group-hover/skill:opacity-100 transition-opacity">{skill.label}</span>
                     <span className="text-[11px] font-mono font-black text-[var(--color-gold)]">{skill.val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
                    <div 
                      className="h-full rounded-full transition-all duration-[2000ms] shadow-[0_0_20px_rgba(184,131,26,0.4)]"
                      style={{ width: `${skill.val}%`, backgroundColor: skill.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 p-10 bg-white/5 rounded-[2rem] border border-white/10 group-hover:bg-white/10 transition-all duration-500 shadow-2xl">
               <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-white/5 rounded-[1.2rem] flex items-center justify-center text-[var(--color-gold)] border border-white/10">
                      <PieChart size={28} />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono font-black text-white/30 uppercase tracking-[0.3em] mb-1">Growth Quotient</div>
                      <div className="text-2xl font-serif font-bold italic">+14.2%</div>
                    </div>
                  </div>
                  <p className="text-[15px] font-sans font-medium leading-relaxed opacity-60 italic">"Academic velocity demonstrates sustained excellence across all terminal benchmarks."</p>
                  <button className="w-full h-14 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/30">Download Full Audit</button>
               </div>
            </div>
          </div>
          <div className="absolute bottom-6 right-10 text-[8px] font-mono opacity-10 uppercase tracking-[0.5em] font-black">Trinity Assessment v4.2</div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
