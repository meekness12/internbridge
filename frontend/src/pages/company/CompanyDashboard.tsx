import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Briefcase, 
  Search, 
  Plus,
  LayoutDashboard,
  Bell,
  RefreshCw,
  X,
  Send,
  TrendingUp,
  Target,
  Zap,
  Star,
  Shield,
  Globe,
  Lock,
  ChevronRight,
  MapPin,
  ArrowUpRight
} from 'lucide-react';
import internshipService from '../../api/internshipService';
import applicationService from '../../api/applicationService';
import placementService from '../../api/placementService';
import type { InternshipDTO } from '../../api/internshipService';
import type { ApplicationDTO } from '../../api/applicationService';
import type { PlacementDTO } from '../../api/placementService';
import { useToast } from '../../context/ToastContext';

const CompanyDashboard: React.FC = () => {
  const { toast } = useToast();
  const [internships, setInternships] = useState<InternshipDTO[]>([]);
  const [applications, setApplications] = useState<ApplicationDTO[]>([]);
  const [placements, setPlacements] = useState<PlacementDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPostModal, setShowPostModal] = useState(false);
  const [newRole, setNewRole] = useState({ title: '', description: '', requiredSkills: '', deadline: '' });

  const userId = localStorage.getItem('userId') || '';
  const userName = localStorage.getItem('userName') || 'Corporate Partner';

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [listings, places] = await Promise.allSettled([
        internshipService.getInternshipsByCompany(userId),
        placementService.getPlacementsByCompany(userId),
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
        setApplications(allApps);
      }
      if (places.status === 'fulfilled') setPlacements(places.value);
    } catch (error) {
      console.error('Dashboard load failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handlePostRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await internshipService.createInternship({
        ...newRole,
        companyId: userId,
      });
      toast('New role posted successfully!', 'success', 'Published');
      setShowPostModal(false);
      setNewRole({ title: '', description: '', requiredSkills: '', deadline: '' });
      fetchData();
    } catch (error) {
      toast('Failed to post role.', 'error');
    }
  };

  const pendingApps = applications.filter(a => a.status === 'PENDING' || a.status === 'NEW').length;

  const stats = [
    { label: 'Talent Pipeline', value: applications.length.toString(), icon: <Target size={16} /> },
    { label: 'Active Placements', value: placements.length.toString(), icon: <Users size={16} /> },
    { label: 'Rating', value: '4.9', icon: <Star size={16} /> },
  ];

  return (
    <div className="max-w-[1128px] mx-auto animate-fade-in pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Corporate Snap */}
        <div className="lg:col-span-3 space-y-4">
           <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="h-14 bg-[var(--color-forest)] w-full"></div>
              <div className="px-4 pb-4 -mt-7 text-center">
                 <div className="w-16 h-16 rounded-full border-4 border-white bg-amber-500 mx-auto flex items-center justify-center text-white font-serif font-black text-xl shadow-md mb-3">
                    {userName.split(' ').map(n => n[0]).join('')}
                 </div>
                 <h3 className="text-base font-bold text-slate-900 tracking-tight">{userName}</h3>
                 <p className="text-xs text-slate-500 font-medium mb-4">Institutional Partner · Corporate</p>
                 <div className="pt-4 border-t border-slate-100 flex flex-col items-start gap-4">
                    <div className="flex justify-between w-full text-[11px] font-bold">
                       <span className="text-slate-500">Pipeline Size</span>
                       <span className="text-[var(--color-forest)]">{applications.length}</span>
                    </div>
                    <div className="flex justify-between w-full text-[11px] font-bold">
                       <span className="text-slate-500">Postings</span>
                       <span className="text-[var(--color-forest)]">{internships.length}</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm sticky top-[95px]">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4 px-1">Pipeline Health</h4>
              {stats.map((s, i) => (
                <div key={i} className="flex items-center gap-3 py-2 px-1 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group border-b border-slate-50 last:border-0">
                   <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[var(--color-forest)] transition-colors">
                      {s.icon}
                   </div>
                   <div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{s.label}</div>
                      <div className="text-xs font-bold text-slate-700 leading-none">{s.value}</div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Middle Column: Recruitment Feed */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                   <Briefcase size={24} />
                </div>
                <button 
                  onClick={() => setShowPostModal(true)}
                  className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-500 text-left px-6 py-3 rounded-full text-sm font-medium transition-all shadow-inner"
                >
                   Publish a new internship role...
                </button>
             </div>
          </div>

          <div className="flex items-center gap-2 py-2">
             <div className="h-px flex-1 bg-slate-200"></div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Active Postings & Talent Flow</span>
             <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          {isLoading ? (
             <div className="space-y-4">
               {[1,2,3].map(i => <div key={i} className="h-40 bg-white border border-slate-200 rounded-xl animate-pulse"></div>)}
             </div>
          ) : (
            <div className="space-y-4">
               {internships.length > 0 ? (
                 internships.map((job, i) => (
                   <div key={job.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all group animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                      <div className="flex justify-between items-start mb-4">
                         <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[var(--color-forest)] flex items-center justify-center text-white font-serif font-black text-xl shadow-lg group-hover:scale-105 transition-transform">
                              {job.title.charAt(0)}
                            </div>
                            <div>
                               <h4 className="text-base font-bold text-slate-900 group-hover:text-[var(--color-forest)] transition-colors leading-tight">{job.title}</h4>
                               <p className="text-xs text-slate-500 font-medium mt-1">Status: <span className="text-[var(--color-gold)] font-bold">{job.status}</span></p>
                               <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-2 font-mono uppercase tracking-tighter">
                                  <span>{job.deadline || 'Perpetual Listing'}</span>
                                  <span className="h-1 w-1 bg-slate-200 rounded-full"></span>
                                  <span>{job.requiredSkills || 'General Entry'}</span>
                               </div>
                            </div>
                         </div>
                         <button className="p-2 text-slate-300 hover:text-[var(--color-gold)] transition-colors">
                            <ArrowUpRight size={20} />
                         </button>
                      </div>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                         <div className="flex -space-x-2">
                            {[1,2,3].map(j => <div key={j} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-400">?</div>)}
                            <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center text-[8px] font-bold text-slate-500">+8</div>
                         </div>
                         <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{applications.filter(a => a.internshipId === job.id).length} Applicants</span>
                            <button className="px-5 py-2 bg-white border-2 border-[var(--color-forest)] text-[var(--color-forest)] rounded-full text-xs font-black uppercase tracking-widest hover:bg-[var(--color-forest)] hover:text-white transition-all shadow-sm">
                               Review Talent
                            </button>
                         </div>
                      </div>
                   </div>
                 ))
               ) : (
                 <div className="p-20 bg-white rounded-xl border-2 border-dashed border-slate-200 text-center">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">No Active Listings Found</p>
                    <button onClick={() => setShowPostModal(true)} className="mt-4 text-[var(--color-gold)] font-black uppercase text-xs hover:underline tracking-widest">Post Role Now</button>
                 </div>
               )}
            </div>
          )}
        </div>

        {/* Right Column: Recruitment Hub */}
        <div className="lg:col-span-3 space-y-4">
           {/* Modal-style Quick Stats */}
           <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-gold)]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-6 px-1">Engagement Metrics</h4>
              <div className="space-y-6">
                <div>
                   <div className="flex justify-between items-center mb-2 px-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pipeline Efficiency</span>
                      <span className="text-[10px] font-mono font-bold text-indigo-600">82%</span>
                   </div>
                   <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 w-[82%] rounded-full"></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between items-center mb-2 px-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Brand Standing</span>
                      <span className="text-[10px] font-mono font-bold text-emerald-600">Premium</span>
                   </div>
                   <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[95%] rounded-full"></div>
                   </div>
                </div>
              </div>
           </div>

           <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-6 px-1 flex items-center justify-between">
                Recruitment Stream <ArrowUpRight size={14} />
              </h4>
              <div className="space-y-5">
                 {applications.slice(0, 4).map((app, i) => (
                   <div key={app.id} className="cursor-pointer group flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center text-[var(--color-forest)] font-bold text-[10px] shrink-0">{app.studentName.charAt(0)}</div>
                      <div className="min-w-0">
                         <h5 className="text-[12px] font-bold text-slate-800 leading-tight group-hover:text-[var(--color-forest)] transition-all truncate">{app.studentName}</h5>
                         <span className="text-[9px] text-slate-500 font-medium">Applied for {app.internshipTitle}</span>
                      </div>
                   </div>
                 ))}
                 {applications.length === 0 && (
                   <p className="text-[10px] text-slate-400 italic">No recent applicants.</p>
                 )}
              </div>
           </div>

           <div className="px-4 py-8 text-center text-slate-500">
              <div className="text-[9px] font-black uppercase tracking-[0.3em] font-mono leading-relaxed mb-4">
                 InternBridge © 2026<br/>Global Identity Registry
              </div>
              <div className="flex justify-center gap-4 opacity-50">
                 <Shield size={16} />
                 <Globe size={16} />
                 <Lock size={16} />
              </div>
           </div>
        </div>
      </div>

      {/* Modal Overlay: Post Role */}
      {showPostModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[var(--color-forest)]/90 backdrop-blur-xl animate-fade-in">
          <div className="bg-white rounded-[2rem] w-full max-w-xl overflow-hidden shadow-2xl animate-scale-in border border-white/20">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[var(--color-gold)] via-[var(--color-forest)] to-[var(--color-gold)]"></div>
            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-serif text-slate-900 italic font-bold">Initiate Talent Search</h3>
                  <p className="text-[11px] text-slate-500 font-medium uppercase tracking-widest mt-1">System Directive: Post Role</p>
                </div>
                <button onClick={() => setShowPostModal(false)} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handlePostRole} className="space-y-6">
                <div>
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 block">Position Excellence</label>
                   <input required type="text" value={newRole.title} onChange={(e) => setNewRole({...newRole, title: e.target.value})} placeholder="e.g. Fintech Operations Analyst" className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium outline-none focus:ring-1 focus:ring-[var(--color-forest)] focus:bg-white transition-all shadow-inner" />
                </div>
                <div>
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 block">Institutional Requirements</label>
                   <textarea required value={newRole.description} onChange={(e) => setNewRole({...newRole, description: e.target.value})} placeholder="Define tasks and expected outcomes..." rows={3} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-medium outline-none focus:ring-1 focus:ring-[var(--color-forest)] focus:bg-white transition-all resize-none shadow-inner" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 block">Skill Density</label>
                    <input required type="text" value={newRole.requiredSkills} onChange={(e) => setNewRole({...newRole, requiredSkills: e.target.value})} placeholder="e.g. SQL, Python" className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-mono outline-none focus:ring-1 focus:ring-[var(--color-forest)] transition-all shadow-inner" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 mb-2 block">Closing Date</label>
                    <input required type="date" value={newRole.deadline} onChange={(e) => setNewRole({...newRole, deadline: e.target.value})} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-xs font-mono outline-none focus:ring-1 focus:ring-[var(--color-forest)] transition-all shadow-inner" />
                  </div>
                </div>
                <button type="submit" className="w-full h-14 bg-[var(--color-forest)] text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-xl shadow-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4">
                  <Zap size={18} className="text-[var(--color-gold)]" fill="currentColor" /> Publish Role
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
