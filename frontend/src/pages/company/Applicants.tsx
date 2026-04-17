import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  ArrowUpRight, 
  FileText,
  Clock,
  Briefcase,
  Target,
  Filter,
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
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto animate-fade-in pb-20 px-4 mt-6">
      
      {/* Editorial Header Section */}
      <div className="flex flex-col mb-16 px-4">
         <div className="flex items-center gap-3 mb-2">
            <div className="h-[1px] w-8 bg-[var(--color-brand)] opacity-30"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--color-brand)]">Recruitment Pipeline</span>
         </div>
         <div className="flex justify-between items-end">
            <h1 className="text-5xl font-serif font-bold text-slate-900 leading-tight">Pending <em className="italic text-slate-400 font-normal">Applicants</em></h1>
            <div className="text-right">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
                  {applications.length} Candidates Found <br/>
                  <span className="text-[var(--color-brand)]">{applications.filter(a => a.status === 'PENDING').length} Pending review</span>
               </p>
            </div>
         </div>
      </div>

      {/* Control Terminal */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-6 shadow-2xl shadow-slate-200/20 mb-10 flex flex-wrap items-center gap-6">
         <div className="flex-1 min-w-[300px] relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[var(--color-brand)] transition-colors" size={20} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate name..."
              className="w-full h-14 pl-16 pr-6 bg-slate-50 border border-slate-50 rounded-2xl text-[11px] font-bold uppercase tracking-widest outline-none focus:bg-white focus:border-[var(--color-brand)] transition-all shadow-inner"
            />
         </div>
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300">
               <Filter size={20} />
            </div>
            <select 
              value={filterInternship}
              onChange={(e) => setFilterInternship(e.target.value)}
              className="h-14 px-6 bg-slate-50 border border-slate-50 rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none focus:bg-white focus:border-[var(--color-brand)] transition-all cursor-pointer shadow-inner pr-10"
            >
               <option value="all">All Job Listings</option>
               {internships.map(i => <option key={i.id} value={i.id}>{i.title}</option>)}
            </select>
         </div>
      </div>

      {/* Applicant Feed */}
      {isLoading ? (
        <div className="space-y-6">
           {[1,2,3].map(i => <div key={i} className="h-32 bg-white border border-slate-50 rounded-[2.5rem] animate-pulse"></div>)}
        </div>
      ) : (
        <div className="space-y-6">
           {filtered.length > 0 ? (
              filtered.map((app) => (
                <div key={app.id} className="bg-white rounded-[3rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/20 hover:shadow-2xl transition-all group relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand)]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   
                   <div className="flex flex-wrap items-center justify-between gap-8 relative z-10">
                      <div className="flex items-center gap-6 min-w-[300px]">
                         <div className="w-16 h-16 rounded-[1.5rem] bg-[var(--color-brand)]/5 flex items-center justify-center text-[var(--color-brand)] font-serif font-black text-2xl shadow-sm group-hover:bg-[var(--color-brand)] group-hover:text-white transition-all">
                            {app.studentName?.charAt(0) || '?'}
                         </div>
                         <div>
                            <h4 className="text-xl font-bold text-slate-900 group-hover:text-[var(--color-brand)] transition-colors tracking-tight">{app.studentName}</h4>
                            <div className="flex items-center gap-4 mt-2">
                               <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                  <Briefcase size={12} className="text-[var(--color-brand)]" /> {app.internshipTitle}
                               </div>
                               <div className="h-1 w-1 bg-slate-200 rounded-full"></div>
                               <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                  <Clock size={12} /> {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : '—'}
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="flex items-center gap-4 ml-auto">
                         <div className={`px-4 py-2 border rounded-xl text-[9px] font-black uppercase tracking-[0.2em] ${getStatusColor(app.status)}`}>
                            {app.status}
                         </div>
                         
                         <div className="h-8 w-[1px] bg-slate-100"></div>

                         <div className="flex items-center gap-2">
                            {app.status === 'PENDING' ? (
                               <>
                                 <button 
                                   onClick={() => handleUpdateStatus(app.id, 'HIRED')}
                                   className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                                   title="Hire Candidate"
                                 >
                                    <UserCheck size={20} />
                                 </button>
                                 <button 
                                   onClick={() => handleUpdateStatus(app.id, 'REJECTED')}
                                   className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                                   title="Decline Applicant"
                                 >
                                    <UserX size={20} />
                                 </button>
                               </>
                            ) : (
                               <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                                  <FileText size={20} />
                                </button>
                            )}
                            <button className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center hover:bg-[var(--color-brand)] hover:text-white transition-all shadow-sm">
                               <ArrowUpRight size={20} />
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
              ))
           ) : (
              <div className="py-32 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/50">
                 <Target size={64} className="text-slate-100 mb-8" />
                 <p className="text-sm font-black text-slate-300 uppercase tracking-[0.4em] italic mb-2">No Active Pipeline Activity</p>
                 <p className="text-xs text-slate-400 font-medium">Verified your active job postings are published correctly.</p>
              </div>
           )}
        </div>
      )}
    </div>
  );
};

export default Applicants;
