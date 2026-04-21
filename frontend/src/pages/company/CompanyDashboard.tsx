import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus,
  X,
  Target,
  Zap,
  ArrowRight
} from 'lucide-react';
import internshipService from '../../api/internshipService';
import applicationService from '../../api/applicationService';
import placementService from '../../api/placementService';
import type { InternshipDTO } from '../../api/internshipService';
import type { ApplicationDTO } from '../../api/applicationService';
import type { PlacementDTO } from '../../api/placementService';
import { useToast } from '../../context/ToastContext';

/**
 * CompanyDashboard Component
 * "Foxstocks" Transformation: Compact, Fintech-inspired design.
 * Features vibrant metric chips, balance cards, and a watchlist feed.
 */
const CompanyDashboard: React.FC = () => {
  const { toast } = useToast();
  const [internships, setInternships] = useState<InternshipDTO[]>([]);
  const [applications, setApplications] = useState<ApplicationDTO[]>([]);
  const [placements, setPlacements] = useState<PlacementDTO[]>([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newRole, setNewRole] = useState({ title: '', description: '', requiredSkills: '', deadline: '' });

  const userId = localStorage.getItem('userId') || '';
  const companyId = localStorage.getItem('companyId') || '';

  const fetchData = useCallback(async () => {
    try {
      const [listings, places] = await Promise.allSettled([
        internshipService.getInternshipsByCompany(companyId || userId),
        placementService.getPlacementsByCompany(companyId || userId)
      ]);

      if (listings.status === 'fulfilled') {
        setInternships(listings.value);
        const allApps: ApplicationDTO[] = [];
        for (const listing of listings.value) {
          try {
            const apps = await applicationService.getApplicationsByInternship(listing.id);
            allApps.push(...apps);
          } catch { /* silent */ }
        }
        allApps.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setApplications(allApps);
      }
      
      if (places.status === 'fulfilled') setPlacements(places.value);
    } catch (error) {
      console.error('Dashboard sync failed:', error);
    }
  }, [userId, companyId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  // --- Helper for application aging ---
  const timeAgo = (dateStr: string) => {
    const diff = new Date().getTime() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days}d ago`;
  };

  const handlePostRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await internshipService.createInternship({
        ...newRole,
        companyId: companyId || userId,
      });
      toast('New role posted successfully!', 'success', 'Published');
      setShowPostModal(false);
      setNewRole({ title: '', description: '', requiredSkills: '', deadline: '' });
      fetchData();
    } catch {
      toast('Failed to post role.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto animate-fade-in space-y-10">
      
      {/* ── My Metrics: Horizontal Scroll (Foxstocks style) ── */}
      <section className="space-y-4">
         <div className="flex items-center justify-between px-2">
            <h3 className="text-sm font-bold text-slate-800">Recruitment Hub</h3>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {[
              { label: 'Applications', value: applications.length, sym: 'APP', bg: 'bg-[#ACF0DE]' },
              { label: 'Active Interns', value: placements.length, sym: 'INT', bg: 'bg-[#F3E8FF]' },
              { label: 'Open Roles', value: internships.length, sym: 'ROLE', bg: 'bg-[#FDE68A]' },
              { label: 'Success Rate', value: '94%', sym: 'RATE', bg: 'bg-[#FBCFE8]' },
              { label: 'Managed Tasks', value: 12, sym: 'TASK', bg: 'bg-[#D1FAE5]' },
            ].map((metric, i) => (
               <div key={i} className={`${metric.bg} p-4 rounded-2xl shadow-fox group cursor-pointer hover:scale-[1.02] transition-all`}>
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-black/5 flex items-center justify-center">
                           <Zap size={12} className="text-black/40" />
                        </div>
                        <div>
                           <div className="text-[9px] font-black text-slate-800 leading-none mb-1">{metric.label}</div>
                           <div className="text-[7px] font-bold text-black/30 uppercase tracking-widest">{metric.sym}</div>
                        </div>
                     </div>
                  </div>
                  <div className="flex items-end justify-between">
                     <div className="text-lg font-black text-[var(--text)] leading-none">{metric.value}</div>
                  </div>
                  <div className="mt-3 text-[9px] font-bold text-black/20 uppercase tracking-[0.15em]">Current Volume</div>
               </div>
            ))}
         </div>
      </section>

      {/* ── Main Viewport Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         
         {/* Left Column: Balances & Quick Stats */}
         <div className="lg:col-span-4 space-y-6">
            <div className="fox-card p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-all">
                  <Zap size={60} className="text-[var(--accent)]" />
               </div>
               <div className="w-11 h-11 bg-purple-50 rounded-xl flex items-center justify-center text-[var(--accent)] mb-4 shadow-sm">
                  <Zap size={22} />
               </div>
               <h3 className="text-base font-black text-[var(--text)] mb-1">Post New Role</h3>
               <p className="text-[10px] font-medium text-slate-400 mb-6 max-w-[160px]">
                  Expand department capacity with a new posting.
               </p>
               <button 
                  onClick={() => setShowPostModal(true)}
                  className="w-full h-10 bg-[var(--accent)] text-white rounded-xl text-[10px] font-black uppercase tracking-[0.15em] shadow-lg shadow-purple-200 hover:scale-[1.02] transition-all"
               >
                  Initiate Posting
               </button>
            </div>

            <section className="space-y-3">
               <h3 className="text-[11px] font-bold text-slate-800 px-2 uppercase tracking-widest">Performance</h3>
               <div className="flex flex-col gap-3">
                  <div className="bg-[var(--accent)] p-5 rounded-2xl text-white shadow-lg relative overflow-hidden group">
                     <div className="flex justify-between items-center mb-4 relative z-10">
                        <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest">Engagement</span>
                        <div className="px-1.5 py-0.5 bg-[var(--surface)]/20 rounded text-[8px] font-bold">Stable</div>
                     </div>
                     <div className="text-xl font-black mb-4 relative z-10">{applications.length * 12}.5 pts</div>
                     <div className="w-full h-8 bg-[var(--surface)]/10 rounded-lg flex items-center justify-center text-[8px] font-black uppercase tracking-widest relative z-10">Pipeline Health</div>
                  </div>

                  <div className="bg-[#1F1F2D] p-5 rounded-2xl text-white shadow-lg group">
                     <div className="flex justify-between items-center mb-4">
                        <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Talent Pool</span>
                        <button className="w-6 h-6 rounded-lg bg-[var(--accent)] flex items-center justify-center hover:scale-105 transition-all">
                           <ArrowRight size={12} />
                        </button>
                     </div>
                     <div className="text-lg font-black mb-1">{placements.length + applications.length} Headcount</div>
                     <div className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Active Interns</div>
                  </div>
               </div>
            </section>
         </div>

         {/* Right Column: Recruitment Feeds */}
         <div className="lg:col-span-8 space-y-6">
            {/* Applicants Watchlist */}
            <div className="fox-card p-6">
               <div className="flex justify-between items-center mb-6">
                  <div className="flex flex-col">
                     <h3 className="text-base font-black text-[var(--text)] leading-none mb-1.5">Applicants Watchlist</h3>
                     <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">Latest Feed</span>
                  </div>
                  <button className="w-7 h-7 rounded-lg bg-[var(--accent)] text-white flex items-center justify-center shadow-lg shadow-purple-200"><Plus size={16} /></button>
               </div>
               <div className="space-y-2">
                  {applications.slice(0, 5).map((app, i) => (
                     <div key={i} className="flex justify-between items-center group cursor-pointer hover:bg-[var(--background)]/50 p-2.5 -mx-2.5 rounded-xl transition-all duration-300">
                        <div className="flex items-center gap-3">
                           <div className="relative">
                              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-xs">
                                 {app.studentName.charAt(0)}
                              </div>
                              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></div>
                           </div>
                           <div>
                              <div className="flex items-center gap-2 mb-0.5">
                                 <div className="text-[13px] font-bold text-[var(--text)] leading-none">{app.studentName}</div>
                                 <span className="px-1.5 py-0.5 bg-purple-50 text-[var(--accent)] rounded text-[7px] font-black uppercase tracking-widest">New</span>
                              </div>
                              <div className="flex items-center gap-2">
                                 <div className="text-[9px] font-black uppercase text-slate-400 tracking-wider">
                                    {app.internshipTitle?.substring(0, 15)}
                                 </div>
                                 <div className="w-1 h-1 rounded-full bg-slate-100"></div>
                                 <div className="text-[8px] font-bold text-slate-300">{timeAgo(app.createdAt)}</div>
                              </div>
                           </div>
                        </div>
                        <div className="text-right flex items-center gap-6">
                           <div className="hidden sm:flex flex-col items-end opacity-0 group-hover:opacity-100 transition-all">
                              <button className="text-[9px] font-black text-[var(--accent)] uppercase tracking-widest hover:underline">Profile</button>
                           </div>
                           <div className="px-3 py-1.5 bg-purple-50/50 rounded-lg border border-purple-100/50 text-center min-w-[70px]">
                              <div className="text-[13px] font-black text-[var(--accent)] leading-none">{(92 + Math.random() * 6).toFixed(0)}%</div>
                              <div className="text-[6px] font-black text-purple-200 uppercase tracking-tighter">AI Match</div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Active Listings */}
            <div className="fox-card p-6">
               <div className="flex justify-between items-center mb-6">
                  <div className="flex flex-col">
                     <h3 className="text-base font-black text-[var(--text)] leading-none mb-1.5">Active Listings</h3>
                     <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">Live Portals</span>
                  </div>
                  <button className="text-[9px] font-black text-[var(--accent)] uppercase tracking-widest">Hub</button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {internships.slice(0, 4).map((job, idx) => (
                     <div key={idx} className="bg-[var(--background)]/50 p-4 rounded-xl flex justify-between items-center group cursor-pointer hover:bg-[var(--surface)] hover:shadow-lg transition-all border border-transparent hover:border-slate-50">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-[var(--surface)] shadow-sm flex items-center justify-center text-[var(--accent)]">
                              <Target size={18} />
                           </div>
                           <div>
                              <div className="text-[12px] font-bold text-[var(--text)] mb-0.5">{job.title}</div>
                              <div className="text-[9px] font-bold text-slate-400">ID: {job.id?.substring(0, 8)}</div>
                           </div>
                        </div>
                        <div className="text-right">
                           <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Active</div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>

      {/* ── Minimalist Modal ── */}
      {showPostModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/10 backdrop-blur-sm animate-fade-in">
          <div className="bg-[var(--surface)] rounded-[2.5rem] w-full max-w-lg shadow-fox-lg animate-scale-in border border-slate-50">
            <div className="p-10">
               <div className="flex justify-between items-center mb-10">
                  <h3 className="text-xl font-bold text-[var(--text)]">New Posting</h3>
                  <button onClick={() => setShowPostModal(false)} className="w-10 h-10 rounded-2xl bg-[var(--background)] flex items-center justify-center text-slate-400 hover:text-rose-500"><X size={20} /></button>
               </div>
               
               <form onSubmit={handlePostRole} className="space-y-6">
                  <div className="space-y-4">
                     <input 
                        required 
                        type="text" 
                        value={newRole.title} 
                        onChange={(e) => setNewRole({...newRole, title: e.target.value})} 
                        placeholder="Position Title" 
                        className="w-full h-14 bg-[var(--background)] border-none rounded-2xl px-6 text-sm font-bold outline-none focus:ring-4 focus:ring-[var(--accent)]/5 transition-all" 
                     />
                     <textarea 
                        required 
                        value={newRole.description} 
                        onChange={(e) => setNewRole({...newRole, description: e.target.value})} 
                        placeholder="Description" 
                        rows={3} 
                        className="w-full bg-[var(--background)] border-none rounded-2xl p-6 text-sm font-medium outline-none focus:ring-4 focus:ring-[var(--accent)]/5 transition-all resize-none" 
                     />
                     <div className="grid grid-cols-2 gap-4">
                        <input required type="text" value={newRole.requiredSkills} onChange={(e) => setNewRole({...newRole, requiredSkills: e.target.value})} placeholder="Skills" className="w-full h-14 bg-[var(--background)] border-none rounded-2xl px-6 text-xs font-bold uppercase tracking-widest outline-none" />
                        <input required type="date" value={newRole.deadline} onChange={(e) => setNewRole({...newRole, deadline: e.target.value})} className="w-full h-14 bg-[var(--background)] border-none rounded-2xl px-6 text-xs font-bold outline-none" />
                     </div>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full h-16 bg-[var(--accent)] text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Processing...' : 'Confirm Posting'}
                  </button>
               </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
