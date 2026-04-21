import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Briefcase,
  Star,
  TrendingUp,
  MoreHorizontal,
  Users,
  ShieldCheck,
  Calendar,
  ExternalLink,
  Globe
} from 'lucide-react';
import placementService from '../../api/placementService';
import type { PlacementDTO } from '../../api/placementService';

/**
 * Interns Component
 * High-fidelity Intern Management for Company Admins.
 * Focused on tracking active cohort progression and outcomes.
 */
const Interns: React.FC = () => {
  const [placements, setPlacements] = useState<PlacementDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const userId = localStorage.getItem('userId') || '';

  useEffect(() => {
    const fetchInterns = async () => {
      setIsLoading(true);
      try {
        const data = await placementService.getPlacementsByCompany(userId);
        setPlacements(data);
      } catch (error) {
        console.error('Intern fetch failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInterns();
  }, [userId]);

  const filtered = placements.filter(p =>
    p.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.internshipTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getProgressPercent = (start: string, end: string): number => {
    if (!start || !end) return 0;
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    const now = Date.now();
    if (now >= e) return 100;
    if (now <= s) return 0;
    return Math.round(((now - s) / (e - s)) * 100);
  };

  return (
    <div className="max-w-[1240px] mx-auto animate-fade-in pb-20 mt-6 px-4">
      
      {/* High-Density Header Section */}
      <div className="flex flex-col mb-10 px-2">
         <div className="flex items-center gap-3 mb-3">
            <div className="h-[2px] w-6 bg-[var(--accent)] rounded-full"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--accent)]">Intern Management</span>
         </div>
         <div className="flex justify-between items-end">
            <div>
               <h1 className="text-3xl font-black text-[var(--text)] tracking-tight mb-1">Active Cohort</h1>
               <p className="text-[11px] font-bold text-slate-400">Track real-time progression and engagement across your active placements.</p>
            </div>
            <div className="text-right pb-1">
               <div className="px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-[var(--accent)]">
                     <Users size={16} />
                  </div>
                  <span className="text-[10px] font-black text-[var(--text)] uppercase tracking-widest">{placements.length} Active Placements</span>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
         <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-3">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Current Assignments</h2>
                  <div className="h-px w-12 bg-slate-100"></div>
               </div>
               <div className="relative group">
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[var(--accent)] transition-colors" />
                  <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter interns..."
                    className="h-9 pl-10 pr-4 bg-[var(--background)] border-none rounded-lg text-[9px] font-bold uppercase tracking-widest outline-none focus:bg-[var(--surface)] focus:ring-2 focus:ring-[var(--accent)]/10 transition-all w-48 shadow-sm"
                  />
               </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                 {[1,2,3].map(i => <div key={i} className="h-16 bg-[var(--surface)] border border-slate-50 rounded-2xl animate-pulse"></div>)}
              </div>
            ) : filtered.length > 0 ? (
              <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-fox overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-[var(--background)]/50 border-b border-slate-50">
                      <th className="px-6 py-4 text-[9px] uppercase tracking-[0.15em] text-slate-400 font-black">Intern Name</th>
                      <th className="px-6 py-4 text-[9px] uppercase tracking-[0.15em] text-slate-400 font-black">Assigned Role</th>
                      <th className="px-6 py-4 text-[9px] uppercase tracking-[0.15em] text-slate-400 font-black">Program Depth</th>
                      <th className="px-6 py-4 text-[9px] uppercase tracking-[0.15em] text-slate-400 font-black text-right">Settings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filtered.map((intern) => {
                      const progress = getProgressPercent(intern.startDate, intern.endDate);
                      return (
                      <tr key={intern.id} className="group hover:bg-[var(--background)]/30 transition-all">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center font-black text-white text-xs shadow-lg transition-all group-hover:scale-105">
                              {intern.studentName?.substring(0, 1) || '?'}
                            </div>
                            <div>
                              <div className="font-bold text-[14px] text-[var(--text)] leading-tight mb-0.5">{intern.studentName}</div>
                              <div className="flex items-center gap-1.5 text-[8px] font-black text-slate-300 uppercase tracking-widest">
                                <ShieldCheck size={10} className="text-emerald-500" /> Active Placement
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[var(--background)] border border-[var(--border)] rounded-lg">
                              <Briefcase size={10} className="text-[var(--accent)]" />
                              <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-muted)]">{intern.internshipTitle?.substring(0, 15)}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="w-32">
                            <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                              <span>Progression</span>
                              <span className="text-[var(--accent)]">{progress}%</span>
                            </div>
                            <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[var(--accent)] rounded-full shadow-glow transition-all duration-1000" 
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                             <button className="w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-slate-300 hover:text-[var(--accent)] hover:border-[var(--accent)] flex items-center justify-center transition-all shadow-sm">
                                <ExternalLink size={14} />
                             </button>
                             <button className="w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-slate-300 hover:text-[var(--text)] flex items-center justify-center transition-all shadow-sm">
                                <MoreHorizontal size={14} />
                             </button>
                           </div>
                        </td>
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-24 flex flex-col items-center justify-center border border-dashed border-[var(--border)] rounded-2xl bg-[var(--background)]/30">
                <Users size={48} className="text-slate-100 mb-6" />
                <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Registry Inactive</p>
                <p className="text-[10px] text-slate-400 font-medium tracking-tight">Post roles and hire candidates to populate your cohort.</p>
              </div>
            )}
         </div>

         <div className="lg:col-span-4 space-y-8">
            <section className="space-y-4">
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Performance Index</h3>
               <div className="bg-[#1F1F2D] rounded-2xl p-6 text-white shadow-fox relative overflow-hidden group">
                  <div className="flex justify-between items-start mb-8">
                     <Star size={24} className="text-amber-400" />
                     <div className="px-2 py-1 bg-[var(--surface)]/10 rounded text-[8px] font-black uppercase tracking-widest text-white/60">Active Monitoring</div>
                  </div>
                  
                  <h4 className="text-lg font-black leading-tight mb-2">Retention Status</h4>
                  <p className="text-[9px] text-white/40 font-medium mb-6">Real-time organizational placement health.</p>
                  
                  <div className="flex items-baseline gap-3">
                     <span className="text-4xl font-black tracking-tight text-white">{placements.length}</span>
                     <div className="text-[9px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                        <TrendingUp size={12} /> Optimal
                     </div>
                  </div>
                  
                  <button className="w-full mt-8 py-3 bg-[var(--accent)] text-white rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20 hover:scale-[1.02] transition-all">
                     View Analytics
                  </button>
               </div>
            </section>

            <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-6 shadow-sm">
               <h3 className="text-[9px] font-black uppercase tracking-widest text-slate-300 mb-6 px-1">Program Insights</h3>
               <div className="space-y-4">
                  {[
                    { label: 'Network Reach', value: 'GLOBAL GH', icon: <Globe size={12} /> },
                    { label: 'Account Tier', value: 'TIER 1', icon: <ShieldCheck size={12} /> },
                    { label: 'Active Period', value: 'Q2 2026', icon: <Calendar size={12} /> }
                  ].map((sig, i) => (
                     <div key={i} className="flex justify-between items-center group cursor-default">
                        <div className="flex items-center gap-3">
                           <div className="w-7 h-7 rounded-lg bg-[var(--background)] flex items-center justify-center text-slate-300 group-hover:text-[var(--accent)] transition-colors">
                              {sig.icon}
                           </div>
                           <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-muted)]">{sig.label}</span>
                        </div>
                        <span className="text-[9px] font-black text-[var(--text)]">{sig.value}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

      </div>
    </div>
  );
};

export default Interns;
