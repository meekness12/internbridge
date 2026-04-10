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
  ArrowUpRight,
  FileText,
  Loader2,
  Clock,
  ArrowRight
} from 'lucide-react';
import internshipService from '../../api/internshipService';
import applicationService from '../../api/applicationService';
import placementService from '../../api/placementService';
import notificationService from '../../api/notificationService';
import type { NotificationDTO } from '../../api/notificationService';
import type { InternshipDTO } from '../../api/internshipService';
import type { ApplicationDTO } from '../../api/applicationService';
import type { PlacementDTO } from '../../api/placementService';
import { useToast } from '../../context/ToastContext';
import { Link } from 'react-router-dom';

/**
 * CompanyDashboard Component
 * High-fidelity recruitment command center with 4-card status grid and recent signal feeds.
 */
const CompanyDashboard: React.FC = () => {
  const { toast } = useToast();
  const [internships, setInternships] = useState<InternshipDTO[]>([]);
  const [applications, setApplications] = useState<ApplicationDTO[]>([]);
  const [placements, setPlacements] = useState<PlacementDTO[]>([]);
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPostModal, setShowPostModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newRole, setNewRole] = useState({ title: '', description: '', requiredSkills: '', deadline: '' });

  const userId = localStorage.getItem('userId') || '';
  const userName = localStorage.getItem('userName') || 'Corporate Partner';

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [listings, places, alerts] = await Promise.allSettled([
        internshipService.getInternshipsByCompany(userId),
        placementService.getPlacementsByCompany(userId),
        notificationService.getMyNotifications(userId)
      ]);

      if (listings.status === 'fulfilled') {
        setInternships(listings.value);
        // Fetch applications for all internships
        const allApps: ApplicationDTO[] = [];
        for (const listing of listings.value) {
          try {
            const apps = await applicationService.getApplicationsByInternship(listing.id);
            allApps.push(...apps);
          } catch { /* silent */ }
        }
        // Sort applications by date
        allApps.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setApplications(allApps);
      }
      
      if (places.status === 'fulfilled') setPlacements(places.value);
      if (alerts.status === 'fulfilled') {
        const sortedAlerts = alerts.value.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setNotifications(sortedAlerts);
      }
    } catch (error) {
      console.error('Dashboard synchronization failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handlePostRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDistanceToNow = (dateString: string) => {
    const now = new Date();
    const then = new Date(dateString);
    const diffInMs = now.getTime() - then.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 60) return `${diffInMins}m`;
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${diffInDays}d`;
  };

  return (
    <div className="max-w-[1280px] mx-auto animate-fade-in pb-20 mt-6 px-6">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-12 gap-6 sm:gap-0">
         <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-2">
               <div className="h-[1px] w-8 bg-[var(--color-brand)] opacity-30"></div>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-brand)]">Corporate Identity Hub</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-slate-900 leading-tight">Command <em className="italic text-slate-400 font-normal">Center</em></h1>
         </div>
         <button 
           onClick={() => setShowPostModal(true)}
           className="h-12 sm:h-14 w-full sm:w-auto px-6 sm:px-10 bg-slate-900 text-white rounded-2xl text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-black/20 hover:bg-[var(--color-brand)] transition-all flex items-center justify-center sm:justify-start gap-3 hover:scale-[1.02] active:scale-[0.98]"
         >
            <Plus size={18} /> New Posting
         </button>
      </div>

      {/* KPI Status Grid (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
         {[
           { label: 'Talent signals', value: applications.length, sub: 'Total Apps', icon: <Target size={18} />, color: 'var(--color-teal)' },
           { label: 'Managed', value: placements.length, sub: 'Workforce', icon: <Users size={18} />, color: '#6366f1' },
           { label: 'Capacity', value: internships.length, sub: 'Openings', icon: <Briefcase size={18} />, color: '#f59e0b' },
           { label: 'Signals', value: notifications.filter(n => !n.isRead).length, sub: 'Unread Alerts', icon: <Bell size={18} />, color: '#ef4444' }
         ].map((stat, i) => (
           <div key={i} className="bg-white rounded-[1.8rem] sm:rounded-[2.5rem] p-4 sm:p-8 border border-slate-100 shadow-xl shadow-slate-200/20 group hover:border-slate-200 transition-all">
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                 <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: stat.color }}>
                    {stat.icon}
                 </div>
                 <div className="hidden sm:flex items-center gap-1 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                    <TrendingUp size={12} /> Live
                 </div>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-[8px] sm:text-[10px] font-black text-slate-300 uppercase tracking-[0.25em] truncate">{stat.label}</div>
              <div className="mt-4 text-[9px] sm:text-[11px] text-slate-400 font-medium truncate">{stat.sub}</div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         
         {/* Recent Signals (Alerts) Feed */}
         <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-4">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">Recent Signals</h3>
                  <div className="h-px w-12 bg-slate-100"></div>
               </div>
               <Link to="/dashboard/notifications" className="text-[10px] font-black text-[var(--color-brand)] uppercase tracking-widest hover:underline">View All Alerts</Link>
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-100 p-8 shadow-2xl shadow-slate-200/20">
               {isLoading ? (
                  <div className="space-y-6">
                     {[1,2,3].map(i => <div key={i} className="h-20 bg-slate-50 rounded-[1.5rem] animate-pulse"></div>)}
                  </div>
               ) : (
                  <div className="space-y-4">
                     {notifications.slice(0, 5).map((noti) => (
                        <div key={noti.id} className="flex gap-6 p-4 rounded-[1.5rem] hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                           <div className="w-12 h-12 rounded-2xl bg-slate-100 shrink-0 flex items-center justify-center text-slate-400 group-hover:text-[var(--color-brand)] transition-colors">
                              <Zap size={20} />
                           </div>
                           <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-1">
                                 <p className="text-sm font-bold text-slate-800 leading-tight group-hover:text-slate-900">{noti.message}</p>
                                 <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest shrink-0 ml-4">{formatDistanceToNow(noti.createdAt)}</span>
                              </div>
                              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.1em]">System Dispatch • Authenticated</p>
                           </div>
                        </div>
                     ))}
                     {notifications.length === 0 && (
                        <div className="text-center py-10 opacity-40">
                           <Bell size={40} className="mx-auto mb-4" />
                           <p className="text-xs font-black uppercase tracking-widest">No signals detected</p>
                        </div>
                     )}
                  </div>
               )}
            </div>
         </div>

         {/* Recent Talent (Applicants) Row */}
         <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between px-2">
               <div className="flex items-center gap-4">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">New Talent</h3>
                  <div className="h-px w-12 bg-slate-100"></div>
               </div>
               <Link to="/dashboard/applicants" className="text-[10px] font-black text-[var(--color-brand)] uppercase tracking-widest hover:underline">Recruitment Hub</Link>
            </div>

            <div className="bg-white rounded-[3rem] border border-slate-100 p-8 shadow-2xl shadow-slate-200/20">
               {isLoading ? (
                  <div className="space-y-6">
                     {[1,2,3].map(i => <div key={i} className="h-24 bg-slate-50 rounded-[2rem] animate-pulse"></div>)}
                  </div>
               ) : (
                  <div className="space-y-6">
                     {applications.slice(0, 5).map((app) => (
                        <div key={app.id} className="flex items-center justify-between group">
                           <div className="flex items-center gap-5 min-w-0">
                              <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-[var(--color-brand)] font-black text-lg shadow-sm group-hover:bg-[var(--color-brand)] group-hover:text-white transition-all overflow-hidden shrink-0">
                                 {app.studentName.charAt(0)}
                              </div>
                              <div className="min-w-0">
                                 <h4 className="text-sm font-black text-slate-900 tracking-tight truncate leading-tight group-hover:text-[var(--color-brand)] transition-colors">{app.studentName}</h4>
                                 <div className="flex items-center gap-3 mt-1.5 min-w-0">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">{app.internshipTitle}</span>
                                    <div className="w-1 h-1 bg-slate-200 rounded-full shrink-0"></div>
                                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest shrink-0">{app.status}</span>
                                 </div>
                              </div>
                           </div>
                           <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 hover:bg-[var(--color-brand)] hover:text-white transition-all group-hover:scale-110 active:scale-95 shadow-sm ml-4">
                              <ArrowRight size={18} />
                           </button>
                        </div>
                     ))}
                     {applications.length === 0 && (
                        <div className="text-center py-10 opacity-40">
                           <Users size={40} className="mx-auto mb-4" />
                           <p className="text-xs font-black uppercase tracking-widest">Pipeline Empty</p>
                        </div>
                     )}
                  </div>
               )}
            </div>

            <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand)]/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
               <Star size={32} className="text-amber-500 mb-6 group-hover:rotate-12 transition-transform" />
               <h4 className="text-xl font-serif font-bold italic mb-2 leading-tight">Elite <span className="font-normal text-slate-400">Branding</span></h4>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-8 leading-relaxed">Your corporate standing is synchronized at <span className="text-white">Premium Tier 1</span>.</p>
               <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-brand)] w-[95%] shadow-glow"></div>
               </div>
            </div>
         </div>

      </div>

      {/* Synchronized Modal: New Posting */}
      {showPostModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xl animate-fade-in">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] animate-scale-in border border-white">
            <div className="p-8 relative">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                     <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[var(--color-brand)]">System Directive</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 italic leading-tight">Initiate <span className="font-normal text-slate-400">Search</span></h3>
                </div>
                <button onClick={() => setShowPostModal(false)} className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handlePostRole} className="space-y-8">
                <div className="space-y-5">
                   <div className="relative">
                      <label className="absolute -top-2 left-5 px-2 bg-white text-[9px] font-black uppercase tracking-widest text-slate-400">Position Excellence</label>
                      <input 
                        required 
                        type="text" 
                        value={newRole.title} 
                        onChange={(e) => setNewRole({...newRole, title: e.target.value})} 
                        placeholder="e.g. Fintech Operations Analyst" 
                        className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-5 text-sm font-bold outline-none focus:ring-4 focus:ring-[var(--color-brand)]/5 focus:border-[var(--color-brand)] focus:bg-white transition-all shadow-inner" 
                      />
                   </div>
                   
                   <div className="relative">
                      <label className="absolute -top-2 left-5 px-2 bg-white text-[9px] font-black uppercase tracking-widest text-slate-400">Institutional Requirements</label>
                      <textarea 
                        required 
                        value={newRole.description} 
                        onChange={(e) => setNewRole({...newRole, description: e.target.value})} 
                        placeholder="Define the scope of this deployment..." 
                        rows={3} 
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl p-5 text-sm font-medium outline-none focus:ring-4 focus:ring-[var(--color-brand)]/5 focus:border-[var(--color-brand)] focus:bg-white transition-all resize-none shadow-inner" 
                      />
                   </div>
                   
                   <div className="grid grid-cols-2 gap-5">
                      <div className="relative">
                         <label className="absolute -top-2 left-5 px-2 bg-white text-[9px] font-black uppercase tracking-widest text-slate-400">Skill Density</label>
                         <input required type="text" value={newRole.requiredSkills} onChange={(e) => setNewRole({...newRole, requiredSkills: e.target.value})} placeholder="SQL, React" className="w-full h-11 bg-slate-50 border border-slate-100 rounded-lg px-5 text-xs font-mono font-bold uppercase outline-none focus:ring-4 focus:ring-[var(--color-brand)]/5 focus:border-[var(--color-brand)] transition-all shadow-inner" />
                      </div>
                      <div className="relative">
                         <label className="absolute -top-2 left-5 px-2 bg-white text-[9px] font-black uppercase tracking-widest text-slate-400">Sync Deadline</label>
                         <input required type="date" value={newRole.deadline} onChange={(e) => setNewRole({...newRole, deadline: e.target.value})} className="w-full h-11 bg-slate-50 border border-slate-100 rounded-lg px-5 text-xs font-mono font-bold outline-none focus:ring-4 focus:ring-[var(--color-brand)]/5 focus:border-[var(--color-brand)] transition-all shadow-inner" />
                      </div>
                   </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-14 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] hover:bg-[var(--color-brand)] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 size={18} className="animate-spin text-[var(--color-brand)]" /> : <Zap size={16} className="text-[var(--color-brand)]" fill="currentColor" />} 
                  {isSubmitting ? 'Transmitting Signal...' : 'Broadcast Deployment'}
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
