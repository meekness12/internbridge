import React from 'react';
import { 
  TrendingUp, 
  Award,
  Zap,
  Target,
  Sparkles,
  PieChart,
  ArrowRight
} from 'lucide-react';

const Analytics: React.FC = () => {
  const stats = [
    { label: 'Work Progress', value: '128', trend: '+12% Velocity', icon: <Zap size={20} className="text-indigo-600" /> },
    { label: 'Skills Learned', value: '14', trend: '+4 Nodes unlocked', icon: <Target size={20} className="text-emerald-600" /> },
    { label: 'Weekly Activity', value: '38', trend: 'Avg Daily High', icon: <TrendingUp size={20} className="text-rose-600" /> },
    { label: 'Performance Grade', value: 'A+', trend: 'Top 5% Cohort', icon: <Award size={20} className="text-[var(--color-gold)]" /> },
    { label: 'Engagement Score', value: '94%', trend: 'Verified Rating', icon: <Sparkles size={20} className="text-amber-500" /> },
  ];

  return (
    <div className="max-w-[1240px] mx-auto animate-fade-in pb-20 mt-6 px-4">
      
      {/* High-Density Header Section */}
      <div className="flex flex-col mb-10 px-2">
         <div className="flex items-center gap-3 mb-3">
            <div className="h-[2px] w-6 bg-amber-400 rounded-full"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Key Metrics</span>
         </div>
         <div className="flex justify-between items-end">
            <div>
               <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Performance Overview</h1>
               <p className="text-[11px] font-bold text-slate-400">Trinity Term 2024 · Verified Academic Metrics · Real-time Sync</p>
            </div>
            <div className="text-right pb-1">
               <button className="h-10 px-6 bg-slate-900 text-white rounded-xl flex items-center gap-3 hover:scale-[1.02] transition-all shadow-lg shadow-black/10">
                  <span className="text-[10px] font-black uppercase tracking-widest">Download Report</span>
                  <ArrowRight size={16} />
               </button>
            </div>
         </div>
      </div>

      {/* Analytics KPI Hub (High Density) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-fox transition-all group">
             <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mb-4 text-slate-400 group-hover:text-slate-900 transition-colors">
                {stat.icon}
             </div>
             <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">{stat.label}</div>
             <div className="text-2xl font-black text-slate-900 tracking-tight mb-1">{stat.value}</div>
             <div className="text-[9px] font-bold text-emerald-500 flex items-center gap-1">
                <TrendingUp size={10} /> {stat.trend}
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Engagement Visualization (Pro Console) */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-8 relative overflow-hidden shadow-fox">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-6 bg-slate-200"></div>
              <div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Activity Levels</h3>
                <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">Student interaction over time</p>
              </div>
            </div>
            <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
              {['Periodic', 'Cumulative', 'Forecast'].map((view, i) => (
                <button key={i} className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}>{view}</button>
              ))}
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-4 px-2 pb-2 border-b border-slate-50 relative">
             {[35, 42, 38, 55, 48, 72, 45, 64, 58, 62].map((h, i) => (
               <div key={i} className="flex-1 group relative h-full flex flex-col justify-end">
                  <div 
                    className={`w-full transition-all duration-700 rounded-t-lg shadow-sm group-hover:opacity-80 ${h > 60 ? 'bg-slate-900' : h > 45 ? 'bg-amber-400' : 'bg-slate-100'}`}
                    style={{ height: `${h}%` }}
                  ></div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black text-slate-300 uppercase tracking-tighter">W0{i+1}</div>
               </div>
             ))}
             {/* Background decorative grid lines */}
             <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-50 py-2">
                {[1,2,3].map(l => <div key={l} className="h-[1px] w-full bg-slate-50"></div>)}
             </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg"><TrendingUp size={18} /></div>
                <div>
                   <div className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Trend Analysis</div>
                   <div className="text-[13px] font-bold text-slate-900">Positive trajectory in skill acquisition.</div>
                </div>
             </div>
             <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-emerald-500 shadow-sm"><Zap size={18} /></div>
                <div>
                   <div className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Cycle Milestone</div>
                   <div className="text-[13px] font-bold text-slate-900">Peak throughput achieved.</div>
                </div>
             </div>
          </div>
        </div>

        {/* Skill Matrix (High Density Sidebar) */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-fox relative overflow-hidden group">
             <div className="relative z-10">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-6 h-[2px] bg-amber-400"></div>
                  <h3 className="text-lg font-black tracking-tight">Skill Inventory</h3>
               </div>
               
               <div className="space-y-6">
                 {[
                   { label: 'Engineering', val: 85, color: '#FBBF24' },
                   { label: 'Design', val: 72, color: '#FFFFFF' },
                   { label: 'Strategy', val: 94, color: '#FBBF24' },
                   { label: 'Cloud', val: 45, color: '#FFFFFF' }
                 ].map((skill, idx) => (
                   <div key={idx} className="group/skill">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 group-hover/skill:opacity-100 transition-opacity">{skill.label}</span>
                        <span className="text-[10px] font-black text-amber-400">{skill.val}%</span>
                     </div>
                     <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <div 
                         className="h-full rounded-full transition-all duration-[2000ms]"
                         style={{ width: `${skill.val}%`, backgroundColor: skill.color }}
                       ></div>
                     </div>
                   </div>
                 ))}
               </div>

               <div className="mt-10 p-5 bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/10 transition-all shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                     <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-amber-400 border border-white/10">
                       <PieChart size={20} />
                     </div>
                     <div>
                       <div className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Growth Rate</div>
                       <div className="text-lg font-black text-white">+14.2%</div>
                     </div>
                  </div>
                  <button className="w-full h-10 bg-amber-400 text-slate-900 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-amber-500/10">Download Audit</button>
               </div>
             </div>
           </div>

           <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                 <Sparkles size={16} className="text-amber-500" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">Success Rating</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium italic opacity-80">"Academic velocity demonstrates sustained excellence across all terminal benchmarks."</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
