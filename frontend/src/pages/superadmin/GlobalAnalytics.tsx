import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  Users,
  RefreshCw,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import { PremiumCard } from '../../components/ui/PremiumCard';
import systemService from '../../api/systemService';
import type { AnalyticsResponse } from '../../api/systemService';
import { useToast } from '../../context/ToastContext';

/**
 * GlobalAnalytics Component
 * High-fidelity "Analytical Inventory" for platform-wide performance tracking.
 * Features trajectory visualization and sector distribution metrics.
 */
const GlobalAnalytics: React.FC = () => {
  const { toast } = useToast();
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        const analytics = await systemService.getAnalytics();
        setData(analytics);
      } catch (error) {
        toast('Failed to synchronize analytical indices.', 'error', 'Protocol Protocol');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, [toast]);

  const stats = [
    { label: 'Total Placements', value: data?.totalPlacements.toLocaleString() || '4,280', trend: '↑ 18.2%', icon: '📍', color: 'ki-1', kpiColor: 'kpi-1' },
    { label: 'Corporate Partners', value: '1,240', trend: '↑ 4.1%', icon: '🏢', color: 'ki-2', kpiColor: 'kpi-2' },
    { label: 'Academic Clusters', value: '85', trend: 'Stable', icon: '🏫', color: 'ki-3', kpiColor: 'kpi-3' },
    { label: 'Certification Rate', value: `${data?.certificationRate || 94.2}%`, trend: '↑ 0.5%', icon: '📜', color: 'ki-5', kpiColor: 'kpi-5' },
    { label: 'System Uptime', value: '99.99%', trend: 'Nominal', icon: '⚡', color: 'ki-4', kpiColor: 'kpi-4' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto animate-fade-in pb-20 px-4">
      <PremiumHeader 
        eyebrow="Global Intelligence"
        title="Analytical"
        italicTitle="Inventory"
        subtitle="Aggregated platform performance metrics and cross-institutional growth indices."
        eyebrowColor="text-[var(--color-brand)]"
        primaryAction={
          <div className="flex items-center gap-4 px-8 h-14 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl">
             <Calendar size={20} className="text-[var(--color-brand)]" /> Final Quarter 2024
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12 animate-fade-up">
        {stats.map((stat, i) => (
          <div key={i} className="hover:scale-[1.02] transition-transform duration-500">
             <PremiumCard {...stat} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[3.5rem] p-12 shadow-2xl shadow-slate-200/20 group overflow-hidden relative animate-fade-up delay-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 relative z-10">
            <div>
              <h3 className="font-serif text-4xl text-slate-900 tracking-tight italic">Placement <span className="text-slate-400 not-italic">Velocity</span></h3>
              <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em] mt-3">Historical Engagement Trend · Global Nodes</p>
            </div>
            <div className="flex bg-slate-50 p-2 rounded-2xl border border-slate-100 shadow-inner">
              <button className="px-8 py-3 bg-white text-slate-900 shadow-xl rounded-xl text-[10px] font-black uppercase tracking-widest">Monthly</button>
              <button className="px-8 py-3 text-slate-400 hover:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors">Quarterly</button>
            </div>
          </div>
          
          <div className="h-80 flex items-end justify-between gap-4 px-4 pb-10 border-b-2 border-slate-50 relative z-10">
             {(data?.placementVelocity || [45, 32, 58, 41, 62, 78, 55, 68, 82, 71, 94, 88].map((v, i) => ({ month: `M${i+1}`, rate: v }))).map((v, i) => (
               <div key={i} className="flex-1 group/bar relative h-full flex flex-col justify-end">
                  <div 
                    className="w-full bg-[var(--color-brand)] opacity-5 group-hover/bar:opacity-100 transition-all duration-700 rounded-t-xl shadow-glow"
                    style={{ height: `${v.rate}%` }}
                  ></div>
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-mono font-black text-[10px] px-4 py-2 rounded-xl opacity-0 group-hover/bar:opacity-100 transition-all shadow-2xl scale-90 group-hover/bar:scale-100 border border-[var(--color-brand)]/20">
                    {v.rate}%
                  </div>
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 font-mono text-[10px] font-black text-slate-200 uppercase tracking-tighter group-hover/bar:text-[var(--color-brand)] transition-colors">{v.month}</div>
               </div>
             ))}
          </div>
          
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
             {[
               { label: 'Active Sessions', val: '12.4k', trend: '+12%', icon: <Users size={20} /> },
               { label: 'Global Latency', val: '14ms', trend: '-2ms', icon: <Activity size={20} /> },
               { label: 'Data Integrity', val: '100%', trend: 'Verified', icon: <ShieldCheck size={20} /> },
             ].map((m, i) => (
               <div key={i} className="p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all group/stat cursor-pointer">
                  <div className="flex items-center gap-5 mb-6">
                     <div className="w-14 h-14 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 group-hover/stat:bg-slate-900 group-hover/stat:text-[var(--color-brand)] shadow-inner transition-all">
                        {m.icon}
                     </div>
                     <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest">{m.label}</span>
                  </div>
                  <div className="flex items-end justify-between">
                     <div className="text-3xl font-serif font-black text-slate-900">{m.val}</div>
                     <div className="text-[10px] font-mono font-black text-emerald-500 uppercase tracking-tighter">{m.trend}</div>
                  </div>
               </div>
             ))}
          </div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[var(--color-brand)]/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        </div>

        <div className="lg:col-span-4 space-y-10 animate-fade-up delay-2">
           <div className="bg-slate-900 text-white rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-16">
                   <h3 className="font-serif text-4xl tracking-tight leading-none italic">Market <br /><span className="text-[var(--color-brand)] not-italic opacity-40">Distribution</span></h3>
                   <div className="w-16 h-16 bg-white/5 rounded-[1.5rem] flex items-center justify-center text-[var(--color-brand)] border border-white/10 group-hover:rotate-12 transition-transform"><Globe size={32} /></div>
                </div>
                
                <div className="space-y-12">
                   {(data?.sectorDistribution || [
                     { sector: 'Software & Engineering', percentage: 42, color: 'var(--color-teal)' },
                     { sector: 'Design & Creative', percentage: 28, color: '#f8fafc' },
                     { sector: 'Finance & Business', percentage: 18, color: 'rgba(255,255,255,0.4)' },
                     { sector: 'Others', percentage: 12, color: 'rgba(255,255,255,0.1)' }
                   ]).map((cat, i) => (
                     <div key={i} className="group/item">
                        <div className="flex justify-between items-center mb-4">
                           <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/30 group-hover/item:text-white transition-opacity">{cat.sector}</span>
                           <span className="text-[10px] font-mono font-black text-[var(--color-brand)]">{cat.percentage}%</span>
                        </div>
                        <div className="h-[6px] w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                           <div className="h-full transition-all duration-1000 shadow-[0_0_20px_rgba(13,148,136,0.3)]" style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}></div>
                        </div>
                     </div>
                   ))}
                </div>
                
                <div className="mt-20 pt-12 border-t border-white/5 flex items-center justify-between">
                   <div className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em]">Sector ROI Index</div>
                   <button className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/20 hover:text-[var(--color-brand)] hover:bg-white/10 transition-all border border-white/10 shadow-2xl shadow-black"><BarChart3 size={24} /></button>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-white/5 rounded-full pointer-events-none opacity-20 group-hover:scale-110 transition-transform duration-1000"></div>
           </div>

           <div className="bg-white rounded-[3.5rem] p-12 border-2 border-dashed border-slate-100 group relative overflow-hidden shadow-xl shadow-slate-200/20">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-10">
                   <div className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300">Node Awareness</div>
                   <TrendingUp size={20} className="text-slate-100 group-hover:text-[var(--color-brand)] transition-colors" />
                </div>
                <div className="space-y-6">
                   {(data?.nodeAwareness || [
                     { label: 'Europe Cluster', city: 'Frankfurt', ping: '12ms', status: 'Optimal' },
                     { label: 'West Africa', city: 'Accra', ping: '24ms', status: 'Optimal' },
                     { label: 'US-East', city: 'N. Virginia', ping: '82ms', status: 'Active' },
                   ]).map((node, i) => (
                     <div key={i} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[2rem] border border-slate-50 shadow-sm group/node hover:bg-white hover:border-[var(--color-brand)] transition-all cursor-pointer">
                        <div className="flex items-center gap-6">
                           <div className={`w-2.5 h-2.5 rounded-full shadow-glow ${node.status === 'Optimal' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                           <div>
                              <div className="text-sm font-bold text-slate-800 tracking-tight">{node.label}</div>
                              <div className="text-[9px] font-black text-slate-200 uppercase tracking-widest mt-0.5">{node.city}</div>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-[11px] font-mono font-black text-slate-400">{node.ping}</div>
                           <div className={`text-[8px] font-black uppercase tracking-[0.2em] mt-1 ${node.status === 'Optimal' ? 'text-emerald-500' : 'text-amber-500'}`}>{node.status}</div>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-slate-50 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalAnalytics;
