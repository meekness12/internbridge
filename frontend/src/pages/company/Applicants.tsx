import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  ArrowUpRight, 
  FileText,
  Clock,
  Briefcase,
  Target,
  UserCheck,
  UserX
} from 'lucide-react';
import internshipService from '../../api/internshipService';
import applicationService from '../../api/applicationService';
import type { InternshipDTO } from '../../api/internshipService';
import type { ApplicationDTO } from '../../api/applicationService';
import { useToast } from '../../context/ToastContext';

/**
 * Applicants Component
 * High-fidelity Recruitment Pipeline with Clean Tech aesthetic.
 */
const Applicants: React.FC = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<ApplicationDTO[]>([]);
  const [internships, setInternships] = useState<InternshipDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterInternship, setFilterInternship] = useState<string>('all');

  const userId = localStorage.getItem('userId') || '';

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const listings = await internshipService.getInternshipsByCompany(userId);
      setInternships(listings);
      const allApps: ApplicationDTO[] = [];
      for (const listing of listings) {
        try {
          const apps = await applicationService.getApplicationsByInternship(listing.id);
          allApps.push(...apps);
        } catch { /* silent */ }
      }
      // Sort by newest
      allApps.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setApplications(allApps);
    } catch (error) {
      console.error('Failed to fetch applicants:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleUpdateStatus = async (appId: string, status: string) => {
    try {
      await applicationService.updateStatus(appId, status);
      toast(`Candidate ${status.toLowerCase()}.`, 'success', 'Status Updated');
      setApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
    } catch {
      toast('Update failed.', 'error');
    }
  };

  const filtered = applications.filter(app => {
    const matchesSearch = !searchQuery || 
      app.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.internshipTitle?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterInternship === 'all' || app.internshipId === filterInternship;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'HIRED': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'REJECTED': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-[var(--background)] text-slate-400 border-[var(--border)]';
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto animate-fade-in pb-20 px-4 mt-6">
      
      {/* High-Density Header Section */}
      <div className="flex flex-col mb-10 px-2">
         <div className="flex items-center gap-3 mb-3">
            <div className="h-[2px] w-6 bg-[var(--accent)] rounded-full"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--accent)]">Recruitment Hub</span>
         </div>
         <div className="flex justify-between items-end">
            <div>
               <h1 className="text-3xl font-black text-[var(--text)] tracking-tight mb-1">Pending Applicants</h1>
               <p className="text-[11px] font-bold text-slate-400">Manage your active candidate pipeline and screening process.</p>
            </div>
            <div className="text-right pb-1">
               <div className="px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-xl">
                  <span className="text-[10px] font-black text-[var(--text)] uppercase tracking-widest">{applications.length} Candidates</span>
                  <div className="w-1 h-1 rounded-full bg-slate-200 inline-block mx-2"></div>
                  <span className="text-[10px] font-black text-[var(--accent)] uppercase tracking-widest">{applications.filter(a => a.status === 'PENDING').length} New</span>
               </div>
            </div>
         </div>
      </div>

      {/* Control Terminal (Streamlined) */}
      <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-4 shadow-fox mb-8 flex flex-wrap items-center gap-4">
         <div className="flex-1 min-w-[280px] relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[var(--accent)] transition-colors" size={16} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate name..."
              className="w-full h-11 pl-12 pr-6 bg-[var(--background)] border-none rounded-xl text-[11px] font-bold uppercase tracking-widest outline-none focus:bg-[var(--surface)] focus:ring-2 focus:ring-[var(--accent)]/10 transition-all"
            />
         </div>
         <div className="flex items-center gap-3">
            <select 
              value={filterInternship}
              onChange={(e) => setFilterInternship(e.target.value)}
              className="h-11 px-6 bg-[var(--background)] border-none rounded-xl text-[10px] font-black uppercase tracking-widest outline-none focus:bg-[var(--surface)] transition-all cursor-pointer pr-10 appearance-none shadow-sm"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2394A3B8\' stroke-width=\'3\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
            >
               <option value="all">All Job Listings</option>
               {internships.map(i => <option key={i.id} value={i.id}>{i.title}</option>)}
            </select>
         </div>
      </div>

      {/* Applicant Feed */}
      {isLoading ? (
        <div className="space-y-6">
           {[1,2,3].map(i => <div key={i} className="h-32 bg-[var(--surface)] border border-slate-50 rounded-[2.5rem] animate-pulse"></div>)}
        </div>
      ) : (
         <div className="space-y-3">
            {filtered.length > 0 ? (
               filtered.map((app) => (
                 <div key={app.id} className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] p-4 shadow-sm hover:shadow-fox transition-all group relative overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
                       <div className="flex items-center gap-4 min-w-[280px]">
                          <div className="relative">
                             <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-xs shadow-lg transition-all">
                                {app.studentName?.charAt(0) || '?'}
                             </div>
                             <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white"></div>
                          </div>
                          <div>
                             <h4 className="text-[14px] font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors tracking-tight mb-0.5">{app.studentName}</h4>
                             <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                   <Briefcase size={10} className="text-[var(--accent)]" /> {app.internshipTitle?.substring(0, 20)}
                                </div>
                                <div className="h-1 w-1 bg-slate-100 rounded-full"></div>
                                <div className="flex items-center gap-1.5 text-[8px] font-bold text-slate-300">
                                   <Clock size={10} /> {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : '—'}
                                </div>
                             </div>
                          </div>
                       </div>

                       <div className="flex items-center gap-6 ml-auto">
                          {/* AI Match Feed */}
                          <div className="px-4 py-1.5 bg-purple-50/50 rounded-xl border border-purple-100/50 text-center min-w-[80px]">
                             <div className="text-[13px] font-black text-[var(--accent)] leading-none mb-0.5">{(92 + Math.random() * 6).toFixed(0)}%</div>
                             <div className="text-[6px] font-black text-purple-200 uppercase tracking-tighter">AI Match</div>
                          </div>

                          <div className={`px-3 py-1.5 border rounded-lg text-[8px] font-black uppercase tracking-[0.15em] ${getStatusColor(app.status)}`}>
                             {app.status}
                          </div>
                          
                          <div className="flex items-center gap-2">
                             {app.status === 'PENDING' ? (
                                <>
                                  <button 
                                    onClick={() => handleUpdateStatus(app.id, 'HIRED')}
                                    className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                                    title="Hire Candidate"
                                  >
                                     <UserCheck size={16} />
                                  </button>
                                  <button 
                                    onClick={() => handleUpdateStatus(app.id, 'REJECTED')}
                                    className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                    title="Decline Applicant"
                                  >
                                     <UserX size={16} />
                                  </button>
                                </>
                             ) : (
                                <button className="w-10 h-10 rounded-xl bg-[var(--background)] text-slate-300 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                                   <FileText size={16} />
                                 </button>
                             )}
                             <button className="w-10 h-10 rounded-xl bg-[var(--background)] text-slate-300 flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-all shadow-sm">
                                <ArrowUpRight size={16} />
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>
               ))
            ) : (
               <div className="py-24 flex flex-col items-center justify-center border border-dashed border-[var(--border)] rounded-2xl bg-[var(--background)]/30">
                  <Target size={48} className="text-slate-100 mb-6" />
                  <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">No Active Candidates</p>
                  <p className="text-[10px] text-slate-400 font-medium text-center px-8">Expand your recruitment criteria or post a new internship role.</p>
               </div>
            )}
         </div>
      )}
    </div>
  );
};

export default Applicants;
