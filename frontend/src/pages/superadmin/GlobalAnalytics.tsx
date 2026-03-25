import React from 'react';
import { 
  Globe, 
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Users
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import { PremiumCard } from '../../components/ui/PremiumCard';

const GlobalAnalytics: React.FC = () => {
  const stats = [
    { label: 'Total Placements', value: '4,280', trend: '↑ 18.2%', icon: '📍', color: 'ki-1', kpiColor: 'kpi-1' },
    { label: 'Corporate Partners', value: '1,240', trend: '↑ 4.1%', icon: '🏢', color: 'ki-2', kpiColor: 'kpi-2' },
    { label: 'Academic Clusters', value: '85', trend: 'Stable', icon: '🏫', color: 'ki-3', kpiColor: 'kpi-3' },
    { label: 'Certification Rate', value: '94.2%', trend: '↑ 0.5%', icon: '📜', color: 'ki-5', kpiColor: 'kpi-5' },
    { label: 'System Uptime', value: '99.98%', trend: 'Nominal', icon: '⚡', color: 'ki-4', kpiColor: 'kpi-4' },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Global Intelligence"
        title="Analytical"
        italicTitle="Inventory"
        subtitle="Aggregated platform performance metrics and cross-institutional growth indices"
        eyebrowColor="text-[var(--color-navy)]"
        primaryAction={
          <div className="flex items-center gap-4 px-8 h-11 bg-[var(--color-navy)] text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg shadow-black/10">
             <Calendar size={18} className="text-[var(--color-gold)]" /> Final Quarter 2024
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <PremiumCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 card p-10 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative z-10">
            <div>
              <h3 className="font-serif text-3xl text-[var(--color-navy)] tracking-tight">Placement <em className="italic text-slate-400">Velocity</em></h3>
              <p className="text-[11px] text-slate-400 font-mono font-bold uppercase tracking-widest mt-2">Historical Engagement Trend · Global Nodes</p>
            </div>
            <div className="flex bg-slate-50 p-1.5 rounded-xl border border-slate-100 shadow-inner">
              <button className="px-6 py-2 bg-white text-[var(--color-navy)] shadow-md rounded-lg text-[10px] font-black uppercase tracking-widest">Monthly</button>
              <button className="px-6 py-2 text-slate-400 hover:text-[var(--color-navy)] rounded-lg text-[10px] font-black uppercase tracking-widest">Quarterly</button>
            </div>
          </div>
          
          <div className="h-72 flex items-end justify-between gap-6 px-4 pb-8 border-b border-l border-slate-50 rounded-bl-3xl relative z-10">
             {[45, 32, 58, 41, 62, 78, 55, 68, 82, 71, 94, 88].map((v, i) => (
               <div key={i} className="flex-1 group/bar relative h-full flex flex-col justify-end">
                  <div 
                    className="w-full bg-[var(--color-navy)] opacity-[0.03] group-hover/bar:opacity-100 transition-all rounded-t-lg shadow-black/10"
                    style={{ height: `${v}%` }}
                  ></div>
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[var(--color-gold)] text-[var(--color-navy)] font-mono font-black text-[10px] px-3 py-1.5 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-all shadow-xl shadow-[var(--color-gold)]/30 scale-90 group-hover/bar:scale-100">
                    {v}%
                  </div>
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-mono text-[9px] font-black text-slate-300 uppercase tracking-tighter group-hover/bar:text-[var(--color-navy)] transition-colors">M{i+1}</div>
               </div>
             ))}
          </div>
          
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
             {[
               { label: 'Active Sessions', val: '12.4k', trend: '+12%', icon: <Users /> },
               { label: 'Global Latency', val: '14ms', trend: '-2ms', icon: <Activity /> },
               { label: 'Data Integrity', val: '100%', trend: 'Verified', icon: <ShieldCheck /> },
             ].map((m, i) => (
               <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-center gap-4 mb-4">
                     <div className="w-10 h-10 bg-white rounded-xl border border-slate-100 flex items-center justify-center text-[var(--color-navy)] shadow-inner">
                        {React.cloneElement(m.icon as React.ReactElement<any>, { size: 20 })}
                     </div>
                     <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{m.label}</span>
                  </div>
                  <div className="flex items-end justify-between">
                     <div className="text-2xl font-serif font-bold text-[var(--color-navy)]">{m.val}</div>
                     <div className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-tighter">{m.trend}</div>
                  </div>
               </div>
             ))}
          </div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-slate-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="card p-10 bg-[var(--color-navy)] text-white border-none rounded-3xl shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                   <h3 className="font-serif text-3xl tracking-tight leading-none">Market <br /><em className="italic text-[var(--color-gold)] opacity-50">Distribution</em></h3>
                   <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[var(--color-gold)] border border-white/10 group-hover:scale-110 transition-transform"><Globe size={24} /></div>
                </div>
                
                <div className="space-y-10">
                   {[
                     { label: 'Software & Engineering', val: 42, color: 'var(--color-gold)' },
                     { label: 'Design & Creative', val: 28, color: '#f8fafc' },
                     { label: 'Finance & Business', val: 18, color: 'rgba(255,255,255,0.4)' },
                     { label: 'Others', val: 12, color: 'rgba(255,255,255,0.1)' }
                   ].map((cat, i) => (
                     <div key={i} className="group/item">
                        <div className="flex justify-between items-center mb-3">
                           <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-white/40 group-hover/item:text-white transition-opacity">{cat.label}</span>
                           <span className="text-[10px] font-mono font-black text-[var(--color-gold)]">{cat.val}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 shadow-inner">
                           <div className="h-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.1)]" style={{ width: `${cat.val}%`, backgroundColor: cat.color }}></div>
                        </div>
                     </div>
                   ))}
                </div>
                
                <div className="mt-16 pt-10 border-t border-white/5 flex items-center justify-between">
                   <div className="text-[10px] font-mono font-bold text-white/20 uppercase tracking-[0.4em]">Sector ROI Index</div>
                   <button className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center text-white/40 hover:text-[var(--color-gold)] hover:bg-white/10 transition-all border border-white/10"><ArrowUpRight size={20} /></button>
                </div>
              </div>
              {/* Circular Graphic Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full pointer-events-none opacity-20 group-hover:scale-110 transition-transform duration-1000"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-white/5 rounded-full pointer-events-none opacity-10 group-hover:scale-125 transition-transform duration-1000"></div>
           </div>

           <div className="card p-10 bg-[var(--color-cream-2)] border-dashed border-2 border-slate-200 rounded-3xl group relative overflow-hidden">
              <div className="relative z-10">
                <div className="label-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Node Awareness</div>
                <div className="space-y-6">
                   {[
                     { label: 'Europe Cluster', city: 'Frankfurt', ping: '12ms', status: 'Optimal' },
                     { label: 'West Africa', city: 'Accra', ping: '24ms', status: 'Optimal' },
                     { label: 'US-East', city: 'N. Virginia', ping: '82ms', status: 'Active' },
                   ].map((node, i) => (
                     <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm group/node hover:border-[var(--color-gold)] transition-all">
                        <div className="flex items-center gap-4">
                           <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                           <div>
                              <div className="text-[11px] font-serif font-black text-[var(--color-navy)]">{node.label}</div>
                              <div className="text-[9px] font-mono font-bold text-slate-300 uppercase tracking-tighter">{node.city}</div>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-[10px] font-mono font-bold text-[var(--color-navy)] opacity-60">{node.ping}</div>
                           <div className="text-[8px] font-black uppercase text-emerald-500 tracking-widest">{node.status}</div>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-slate-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalAnalytics;
