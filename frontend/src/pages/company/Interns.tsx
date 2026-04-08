import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ArrowUpRight, 
  Briefcase,
  Star,
  TrendingUp,
  MoreHorizontal,
  RefreshCw,
  Users,
  ShieldCheck,
  Calendar,
  ChevronRight,
  ExternalLink,
  Globe
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import placementService from '../../api/placementService';
import type { PlacementDTO } from '../../api/placementService';

/**
 * Interns Component
 * High-fidelity Workforce Registry for Company Admins.
 * Focused on tracking active engagements and cohort progression.
 */
const Interns: React.FC = () => {
  const [placements, setPlacements] = useState<PlacementDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const userId = localStorage.getItem('userId') || '';
  const userName = localStorage.getItem('userName') || 'Institutional Partner';

  useEffect(() => {
    const fetchInterns = async () => {
      setIsLoading(true);
      try {
        const data = await placementService.getPlacementsByCompany(userId);
        setPlacements(data);
      } catch (error) {
        console.error('Workforce fetch failed:', error);
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
      
      {/* Premium Editorial Header */}
      <div className="flex flex-col mb-16">
         <div className="flex items-center gap-3 mb-2">
            <div className="h-[1px] w-8 bg-[var(--color-teal)] opacity-30"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-teal)]">Human Capital Management</span>
         </div>
         <div className="flex justify-between items-end">
            <h1 className="text-5xl font-serif font-bold text-slate-900 leading-tight">Workforce <em className="italic text-slate-400 font-normal">Registry</em></h1>
            <div className="flex items-center gap-4 bg-white border border-slate-100 rounded-2xl px-6 py-3 shadow-xl shadow-slate-200/20">
               <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-[var(--color-teal)]">
                  <Users size={20} />
               </div>
               <div>
                  <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Active Cohort</div>
                  <div className="text-sm font-black text-slate-900">{placements.length} Verified Engagements</div>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Main Workforce Grid */}
        <div className="lg:col-span-8 space-y-8">
           <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
                 <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Current Assignments</h2>
                 <div className="h-px w-16 bg-slate-50"></div>
              </div>
              <div className="relative group">
                 <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[var(--color-teal)] transition-colors" />
                 <input 
                   type="text" 
                   value={searchQuery} 
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Filter by name or role..."
                   className="h-11 pl-12 pr-6 bg-slate-50 border border-slate-50 rounded-xl text-[10px] font-bold uppercase tracking-widest outline-none focus:bg-white focus:border-[var(--color-teal)] transition-all w-64 shadow-inner"
                 />
              </div>
           </div>

           {isLoading ? (
             <div className="space-y-6">
                {[1,2,3].map(i => <div key={i} className="h-24 bg-white border border-slate-100 rounded-[2.5rem] animate-pulse"></div>)}
             </div>
           ) : filtered.length > 0 ? (
             <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/20 overflow-hidden">
               <table className="w-full text-left">
                 <thead>
                   <tr className="bg-slate-50/50 border-b border-slate-50">
                     <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">Intern Identity</th>
                     <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">Dispatch Role</th>
                     <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">Progression</th>
                     <th className="px-10 py-6 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {filtered.map((intern) => {
                     const progress = getProgressPercent(intern.startDate, intern.endDate);
                     return (
                     <tr key={intern.id} className="group hover:bg-slate-50/30 transition-all">
                       <td className="px-10 py-8">
                         <div className="flex items-center gap-5">
                           <div className="w-12 h-12 rounded-2xl bg-white border-2 border-slate-50 flex items-center justify-center font-serif font-black text-[var(--color-teal)] text-lg shadow-sm group-hover:scale-105 transition-transform">
                             {intern.studentName?.substring(0, 1) || '?'}
                           </div>
                           <div>
                             <div className="font-bold text-base text-slate-900 leading-tight mb-1">{intern.studentName}</div>
                             <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                               <ShieldCheck size={12} className="text-emerald-500" /> Verified Placement
                             </div>
                           </div>
                         </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg">
                             <Briefcase size={12} className="text-[var(--color-teal)]" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{intern.internshipTitle}</span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                         <div className="w-40">
                           <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">
                             <span>Engagement</span>
                             <span className="text-[var(--color-teal)]">{progress}%</span>
                           </div>
                           <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                             <div 
                               className="h-full bg-[var(--color-teal)] rounded-full shadow-glow transition-all duration-1000" 
                               style={{ width: `${progress}%` }}
                             ></div>
                           </div>
                         </div>
                       </td>
                       <td className="px-10 py-8 text-right">
                          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                            <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-[var(--color-teal)] hover:border-[var(--color-teal)] flex items-center justify-center transition-all shadow-sm">
                               <ExternalLink size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-300 hover:text-slate-900 flex items-center justify-center transition-all shadow-sm">
                               <MoreHorizontal size={18} />
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
             <div className="py-40 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[3.5rem] bg-slate-50/30">
               <Users size={64} className="text-slate-100 mb-8" />
               <p className="text-sm font-black text-slate-300 uppercase tracking-[0.4em] mb-2">Registry Silent</p>
               <p className="text-xs text-slate-400 font-medium tracking-tight">Post roles and accept candidates to populate your workforce.</p>
             </div>
           )}
        </div>

        {/* Sidebar Insights */}
        <div className="lg:col-span-4 space-y-10">
           <section className="space-y-6">
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 px-4">Performance Insights</h3>
              <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-teal)]/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <Star size={32} className="text-amber-500 mb-8 group-hover:rotate-12 transition-transform" />
                 <h4 className="text-2xl font-serif font-black leading-tight mb-4">Retention <br /><em className="italic text-slate-400 font-normal">Success Rate</em></h4>
                 
                 <div className="mt-12 flex items-baseline gap-4">
                    <span className="text-7xl font-serif font-black tracking-tighter text-white">{placements.length}</span>
                    <div className="pb-3 text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                       <TrendingUp size={14} /> Global Active
                    </div>
                 </div>
                 
                 <p className="text-xs text-slate-400 font-medium mt-10 leading-relaxed max-w-xs">
                    Managing {placements.length} signal points across the organization. System integrity at optimal levels.
                 </p>
                 
                 <a href="/dashboard/applicants" className="block w-full mt-10 py-4 bg-[var(--color-teal)] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-teal-500/20 hover:scale-105 active:scale-95 transition-all text-center no-underline">
                    Expand Pipeline
                 </a>
              </div>
           </section>

           <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/20">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-8 px-2">Institutional Signals</h3>
              <div className="space-y-6">
                 {[
                   { label: 'Signal Range', value: 'GH - GLOBAL', icon: <Globe size={14} /> },
                   { label: 'Security Level', value: 'TIER 1 ACCESS', icon: <ShieldCheck size={14} /> },
                   { label: 'Cohort Lock', value: 'Q2 2026', icon: <Calendar size={14} /> }
                 ].map((sig, i) => (
                    <div key={i} className="flex justify-between items-center group cursor-default">
                       <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-[var(--color-teal)] transition-colors">
                             {sig.icon}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{sig.label}</span>
                       </div>
                       <span className="text-[10px] font-bold text-slate-900">{sig.value}</span>
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
