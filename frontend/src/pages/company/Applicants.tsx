import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ArrowUpRight, 
  CheckCircle2, 
  XCircle,
  FileText,
  Clock,
  Briefcase,
  RefreshCw
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import internshipService from '../../api/internshipService';
import applicationService from '../../api/applicationService';
import type { InternshipDTO } from '../../api/internshipService';
import type { ApplicationDTO } from '../../api/applicationService';
import { useToast } from '../../context/ToastContext';

const Applicants: React.FC = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<ApplicationDTO[]>([]);
  const [internships, setInternships] = useState<InternshipDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterInternship, setFilterInternship] = useState<string>('all');

  const userId = localStorage.getItem('userId') || '';

  const fetchData = async () => {
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
      setApplications(allApps);
    } catch (error) {
      console.error('Failed to fetch applicants:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleUpdateStatus = async (appId: string, status: string) => {
    try {
      await applicationService.updateStatus(appId, status);
      toast(`Application ${status.toLowerCase()}.`, 'success', status);
      setApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
    } catch (error) {
      toast('Failed to update status.', 'error');
    }
  };

  const filtered = applications.filter(app => {
    const matchesSearch = !searchQuery || 
      app.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.internshipTitle?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterInternship === 'all' || app.internshipId === filterInternship;
    return matchesSearch && matchesFilter;
  });

  const pendingCount = applications.filter(a => a.status === 'PENDING').length;

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Talent Acquisition"
        title="Incoming"
        italicTitle="Applicants"
        subtitle={`${applications.length} total applications · ${pendingCount} pending review`}
        eyebrowColor="text-[var(--color-navy)]"
        primaryAction={
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)] shadow-sm transition-all"
            />
          </div>
        }
        secondaryAction={
          <select 
            value={filterInternship}
            onChange={(e) => setFilterInternship(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-lg bg-white text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)] shadow-sm"
          >
            <option value="all">All Roles</option>
            {internships.map(i => (
              <option key={i.id} value={i.id}>{i.title}</option>
            ))}
          </select>
        }
      />

      {isLoading && (
        <div className="flex items-center justify-center p-12 gap-4">
          <RefreshCw size={20} className="animate-spin text-[var(--color-gold)]" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading applicants...</span>
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="card p-0 overflow-hidden border border-slate-200 shadow-sm transition-all">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[var(--color-cream)] border-b border-slate-100">
                <th className="px-8 py-4 label-mono text-[9px] uppercase tracking-widest opacity-50 font-bold">Candidate Identity</th>
                <th className="px-8 py-4 label-mono text-[9px] uppercase tracking-widest opacity-50 font-bold">Target Position</th>
                <th className="px-8 py-4 label-mono text-[9px] uppercase tracking-widest opacity-50 font-bold">Applied</th>
                <th className="px-8 py-4 label-mono text-[9px] uppercase tracking-widest opacity-50 font-bold">Process Status</th>
                <th className="px-8 py-4 label-mono text-[9px] uppercase tracking-widest opacity-50 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((app) => (
                <tr key={app.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[var(--color-parchment)] rounded-xl flex items-center justify-center font-bold text-[var(--color-navy)] text-xs border border-[var(--color-border)] shadow-inner group-hover:bg-white transition-all">
                        {app.studentName?.substring(0, 2).toUpperCase() || '??'}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[var(--color-navy)]">{app.studentName || 'Unknown'}</div>
                        <div className="text-[11px] opacity-60 uppercase font-black tracking-tighter text-slate-500">
                          {app.coverLetter ? 'Cover letter attached' : 'No cover letter'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-[13px] text-slate-700 font-bold">{app.internshipTitle}</td>
                  <td className="px-8 py-6 text-[11px] text-slate-400 font-mono font-bold uppercase tracking-widest">
                    {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[9px] px-3 py-1.5 rounded-lg font-black uppercase tracking-[0.15em] border ${
                      app.status === 'PENDING' ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm' :
                      app.status === 'HIRED' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                      (app.status === 'ACCEPTED' || app.status === 'APPROVED') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      app.status === 'REJECTED' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                      'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {app.status === 'PENDING' && (
                        <>
                          <button 
                            onClick={() => handleUpdateStatus(app.id, 'HIRED')}
                            className="p-2.5 text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all border border-transparent hover:border-emerald-100" title="Hire Applicant"
                          >
                            <CheckCircle2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(app.id, 'REJECTED')}
                            className="p-2.5 text-rose-700 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-100" title="Reject"
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                      <button className="p-2.5 text-slate-400 hover:text-[var(--color-navy)] hover:bg-slate-100 rounded-xl transition-all"><ArrowUpRight size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : !isLoading && (
        <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
          <Briefcase size={48} className="text-slate-200 mb-6" />
          <p className="text-sm font-bold text-slate-400 italic mb-2">No applications received</p>
          <p className="text-xs text-slate-300">Post internship roles to start receiving applications.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card p-10 bg-[var(--color-forest)] text-white relative overflow-hidden group shadow-xl">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
               <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 text-[var(--color-gold)]">
                  <Clock size={24} />
               </div>
               <div className="h-[1px] w-12 bg-[var(--color-gold)] opacity-40"></div>
            </div>
            <h3 className="text-3xl font-serif mb-3 text-white leading-tight">Review <em className="italic text-[var(--color-gold)]">Queue</em></h3>
            <p className="text-white/60 text-[10px] mb-10 font-black uppercase tracking-[0.3em] flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-[var(--status-success)] rounded-full animate-pulse"></span>
               {pendingCount} candidates pending review
            </p>
            <a href="/company/applicants" className="block w-full bg-[var(--color-gold)] text-[var(--color-forest)] py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:translate-y-[-2px] hover:shadow-2xl text-center no-underline">
              Review All Applications
            </a>
          </div>
          <div className="absolute -bottom-10 -right-10 opacity-[0.03] rotate-12 scale-150">
             <Briefcase size={280} />
          </div>
        </div>
        
        <div className="card p-10 flex flex-col justify-between border-slate-200 bg-white shadow-xl relative overflow-hidden group hover:border-[var(--color-gold)] transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <FileText size={160} className="rotate-12" />
          </div>
          <div className="relative z-10">
            <div className="p-3 w-fit bg-[var(--color-parchment)] rounded-2xl border border-[var(--color-border)] text-slate-400 mb-8 group-hover:text-[var(--color-gold)] group-hover:border-[var(--color-gold)] transition-all">
               <Briefcase size={24} />
            </div>
            <h3 className="text-3xl font-serif mb-3 text-[var(--color-navy)] leading-tight">Opening <em className="italic text-slate-400">Inventory</em></h3>
            <p className="text-slate-500 text-[13px] leading-relaxed max-w-sm">You have <strong className="text-[var(--color-navy)]">{internships.length} internship listing(s)</strong> receiving applications.</p>
          </div>
          <a href="/company/dashboard" className="relative z-10 mt-10 text-[10px] font-black text-[var(--color-navy)] uppercase tracking-[0.3em] flex items-center gap-3 group/btn hover:text-[var(--color-gold)] transition-all no-underline">
            Go to Dashboard <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Applicants;
