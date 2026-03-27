import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ArrowUpRight, 
  Briefcase,
  Star,
  MessageSquare,
  TrendingUp,
  MoreHorizontal,
  RefreshCw,
  Users
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import placementService from '../../api/placementService';
import type { PlacementDTO } from '../../api/placementService';

const Interns: React.FC = () => {
  const [placements, setPlacements] = useState<PlacementDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const userId = localStorage.getItem('userId') || '';
  const userName = localStorage.getItem('userName') || 'Company';

  useEffect(() => {
    const fetchInterns = async () => {
      setIsLoading(true);
      try {
        const data = await placementService.getPlacementsByCompany(userId);
        setPlacements(data);
      } catch (error) {
        console.error('Failed to fetch interns:', error);
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
    <div className="space-y-8 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Workforce Management"
        title="Active"
        italicTitle="Internship"
        subtitle={`${placements.length} verified intern(s) currently placed`}
        eyebrowColor="text-[var(--color-gold)]"
        primaryAction={
           <div className="bg-white border border-slate-200 rounded-lg px-4 flex items-center gap-3 h-11 shadow-sm">
             <Briefcase size={18} className="text-[var(--color-gold)]" />
             <span className="text-[10px] font-bold text-[var(--color-navy)] uppercase tracking-widest">{userName}</span>
           </div>
        }
      />

      {isLoading && (
        <div className="flex items-center justify-center p-12 gap-4">
          <RefreshCw size={20} className="animate-spin text-[var(--color-gold)]" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading interns...</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <h2 className="label-mono text-[10px] tracking-[0.2em] opacity-60 text-[var(--color-navy)] uppercase font-bold">Current Intern Cohort</h2>
               <div className="h-[1px] w-12 bg-slate-100"></div>
            </div>
            <div className="flex gap-1">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search interns..."
                  className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] outline-none focus:ring-1 focus:ring-[var(--color-gold)] shadow-sm w-48"
                />
              </div>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="card p-0 overflow-hidden border border-slate-200 shadow-sm transition-all hover:shadow-md">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[var(--color-cream)] border-b border-slate-100">
                    <th className="px-8 py-4 label-mono text-[9px] uppercase tracking-widest opacity-50 font-bold">Intern Profile</th>
                    <th className="px-8 py-4 label-mono text-[9px] uppercase tracking-widest opacity-50 font-bold">Role</th>
                    <th className="px-8 py-4 label-mono text-[9px] uppercase tracking-widest opacity-50 font-bold">Engagement</th>
                    <th className="px-8 py-4 label-mono text-[9px] uppercase tracking-widest opacity-50 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filtered.map((intern) => {
                    const progress = getProgressPercent(intern.startDate, intern.endDate);
                    return (
                    <tr key={intern.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-100 border border-white flex items-center justify-center font-bold text-[var(--color-navy)] text-xs shadow-sm">
                            {intern.studentName?.substring(0, 2).toUpperCase() || '??'}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-[var(--color-navy)]">{intern.studentName}</div>
                            <div className="text-[10px] opacity-40 uppercase font-black tracking-tighter">
                              {intern.startDate} — {intern.endDate}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <span className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border bg-indigo-50 text-indigo-600 border-indigo-100">
                           {intern.internshipTitle}
                         </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="w-32">
                          <div className="flex justify-between text-[9px] font-mono opacity-50 mb-1.5 font-bold">
                            <span>Progress</span>
                            <span>{progress}%</span>
                          </div>
                          <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[var(--color-forest)] rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                         <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Message"><MessageSquare size={18} /></button>
                           <button className="p-2 text-slate-400 hover:text-[var(--color-navy)] hover:bg-slate-100 rounded-lg transition-all"><ArrowUpRight size={18} /></button>
                           <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all"><MoreHorizontal size={18} /></button>
                         </div>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : !isLoading && (
            <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
              <Users size={48} className="text-slate-200 mb-6" />
              <p className="text-sm font-bold text-slate-400 italic mb-2">No active interns</p>
              <p className="text-xs text-slate-300">Accept applications to start placing interns.</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
          <section className="space-y-4">
            <h3 className="label-mono text-[10px] tracking-[0.2em] opacity-60 text-[var(--color-navy)] uppercase font-bold">Cohort Insights</h3>
            <div className="card p-8 bg-[var(--color-navy)] text-white relative overflow-hidden group shadow-xl">
               <div className="relative z-10">
                 <Star size={32} className="text-[var(--color-gold)] mb-6 group-hover:scale-110 transition-transform" />
                 <h4 className="text-2xl font-serif mb-2 leading-tight">Performance <br /> <em className="italic text-slate-400">Standard</em></h4>
                 <div className="mt-8 flex items-baseline gap-3">
                   <div className="text-6xl font-serif font-bold text-white tracking-tighter">{placements.length}</div>
                   <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-[0.2em] flex items-center gap-1.5 pb-2">
                     <TrendingUp size={14} /> Active
                   </div>
                 </div>
                 <p className="text-xs text-white/40 mt-8 leading-relaxed font-medium">
                   {placements.length > 0 ? `Currently managing ${placements.length} intern(s) across your organization.` : 'No active interns yet. Start by reviewing applications.'}
                 </p>
                 <a href="/company/applicants" className="block w-full mt-10 py-3 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-lg text-[10px] font-bold uppercase tracking-widest hover:translate-y-[-2px] transition-all shadow-lg shadow-black/20 text-center no-underline">Review Applications</a>
               </div>
               <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[var(--color-gold)]/10 to-transparent"></div>
               <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Interns;
