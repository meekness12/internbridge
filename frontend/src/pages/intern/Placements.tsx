import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Briefcase, 
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  X,
  Send,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Zap,
  ChevronRight,
  Target
} from 'lucide-react';
import internshipService from '../../api/internshipService';
import applicationService from '../../api/applicationService';
import type { InternshipDTO } from '../../api/internshipService';
import type { ApplicationDTO } from '../../api/applicationService';
import { useToast } from '../../context/ToastContext';

const Placements: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'discover' | 'applied' | 'hired' | 'rejected'>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [internships, setInternships] = useState<InternshipDTO[]>([]);
  const [myApplications, setMyApplications] = useState<ApplicationDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [applyingTo, setApplyingTo] = useState<InternshipDTO | null>(null);
  const [coverLetter, setCoverLetter] = useState('');

  const userId = localStorage.getItem('userId') || '';
  const userName = localStorage.getItem('userName') || 'Student';

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [listings, apps] = await Promise.allSettled([
        internshipService.getAllInternships(),
        applicationService.getMyApplications(userId),
      ]);
      if (listings.status === 'fulfilled') setInternships(listings.value);
      if (apps.status === 'fulfilled') setMyApplications(apps.value);
    } catch (error) {
      console.error('Failed to fetch placements:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingTo) return;
    try {
      await applicationService.applyForInternship({
        internshipId: applyingTo.id,
        studentId: userId,
        coverLetter: coverLetter,
      });
      toast('Application transmitted successfully.', 'success', 'Terminal confirmed');
      setApplyingTo(null);
      setCoverLetter('');
      fetchData();
    } catch (error) {
      toast('Failed to submit application.', 'error', 'Error');
    }
  };

  const hasApplied = (internshipId: string): boolean => {
    return myApplications.some(a => a.internshipId === internshipId);
  };

  const getFilteredData = () => {
    const query = searchQuery.toLowerCase();
    
    if (activeTab === 'discover') {
      return internships.filter(job => 
        !hasApplied(job.id) && 
        (job.title?.toLowerCase().includes(query) || job.companyName?.toLowerCase().includes(query))
      );
    }
    
    const statusMap: Record<string, string> = {
      'applied': 'PENDING',
      'hired': 'ACCEPTED', // Based on user feedback, hired matches ACCEPTED/HIRED statuses
      'rejected': 'REJECTED'
    };
    
    return myApplications.filter(app => {
      if (activeTab === 'hired') return app.status === 'ACCEPTED' || app.status === 'HIRED';
      return app.status === statusMap[activeTab];
    }).filter(app => 
      (app.internshipTitle?.toLowerCase().includes(query) || (app as any).companyName?.toLowerCase().includes(query))
    );
  };

  const filteredData = getFilteredData();

  const tabs = [
    { id: 'discover', label: 'New Jobs', count: internships.length - myApplications.length },
    { id: 'applied', label: 'Applied', count: myApplications.filter(a => a.status === 'PENDING').length },
    { id: 'hired', label: 'Hired', count: myApplications.filter(a => a.status === 'ACCEPTED' || a.status === 'HIRED').length },
    { id: 'rejected', label: 'Rejected', count: myApplications.filter(a => a.status === 'REJECTED').length },
  ];

  const renderStatusBadge = (status: string) => {
    switch (status.toUpperCase()) {
      case 'ACCEPTED':
        return (
          <span className="px-5 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-1.5 shadow-sm">
             <CheckCircle2 size={12} /> Accepted
          </span>
        );
      case 'HIRED':
        return (
          <span className="px-5 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 flex items-center gap-1.5 shadow-sm">
             <CheckCircle2 size={12} /> Hired
          </span>
        );
      case 'REJECTED':
        return (
          <span className="px-5 py-2 bg-rose-50 text-rose-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-rose-100 flex items-center gap-1.5 shadow-sm">
             <AlertCircle size={12} /> Rejected
          </span>
        );
      case 'PENDING':
      default:
        return (
          <span className="px-5 py-2 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100 flex items-center gap-1.5 shadow-sm">
             <RefreshCw size={12} className="animate-spin" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto animate-fade-in pb-20 px-4">
      {/* Centralized Feed Column */}
      <div className="max-w-2xl mx-auto space-y-10 mt-4">
        
        {/* Modern Tab Switcher */}
        <div className="bg-white rounded-3xl border border-slate-200 p-2 flex items-center shadow-sm sticky top-[100px] z-50 transition-all backdrop-blur-xl bg-white/90">
             {tabs.map((tab) => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-3.5 text-[11px] font-black uppercase tracking-widest rounded-2xl transition-all relative group ${
                    activeTab === tab.id ? 'bg-[var(--color-teal)] text-white shadow-xl shadow-teal-500/20' : 'text-slate-400 hover:bg-slate-50'
                  }`}
                >
                   {tab.label}
                   {tab.count > 0 && (
                     <span className={`absolute top-1 right-2 min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center text-[9px] font-black border transition-all ${
                       activeTab === tab.id ? 'bg-white text-[var(--color-teal)] border-white/20' : 'bg-slate-50 text-slate-500 border-slate-200 group-hover:bg-white'
                     }`}>
                        {tab.count}
                     </span>
                   )}
                </button>
             ))}
        </div>

        {/* Integrated Search */}
        <div className="relative group">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[var(--color-teal)] transition-colors" size={20} />
             <input 
               type="text" 
               placeholder={`Search in ${tabs.find(t => t.id === activeTab)?.label}...`}
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full h-16 bg-white border border-slate-200 rounded-[2rem] pl-14 pr-6 text-sm font-medium outline-none focus:ring-2 focus:ring-[var(--color-teal)]/10 focus:border-[var(--color-teal)] transition-all shadow-sm"
             />
        </div>

        <div className="flex items-center gap-4 py-2 opacity-60">
           <div className="h-px flex-1 bg-slate-200"></div>
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
              {activeTab === 'discover' ? 'Talent Hub' : 'Career Dispatch'}
           </span>
           <div className="h-px flex-1 bg-slate-200"></div>
        </div>

        {/* Feed results */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="space-y-6">
               {[1,2,3].map(i => (
                 <div key={i} className="h-64 bg-white border border-slate-100 rounded-[2.5rem] animate-pulse"></div>
               ))}
            </div>
          ) : filteredData.length > 0 ? (
             <div className="space-y-6">
                {filteredData.map((item: any, i) => (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-[2.5rem] border border-slate-100 p-10 shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:shadow-teal-500/5 transition-all group animate-fade-up relative overflow-hidden" 
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                     <div className="flex justify-between items-start">
                        <div className="flex gap-8">
                           <div className="w-16 h-16 rounded-2xl bg-[var(--color-teal-faint)] flex items-center justify-center text-[var(--color-teal)] font-bold text-2xl shadow-inner group-hover:scale-110 transition-transform">
                             {(item.companyName || item.internshipTitle)?.[0] || 'I'}{(item.companyName || item.internshipTitle)?.[1] || ''}
                           </div>
                           <div>
                              <h4 className="text-2xl font-bold text-slate-900 group-hover:text-[var(--color-teal)] transition-colors mb-2 leading-tight">
                                 {item.title || item.internshipTitle}
                              </h4>
                              <div className="flex items-center gap-2 mb-4">
                                <Briefcase size={16} className="text-slate-300" />
                                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                                  {item.companyName || 'University Partner'}
                                </span>
                              </div>
                              <div className="flex items-center gap-6 mt-4">
                                 <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                                    <MapPin size={14} /> Remote
                                 </div>
                                 <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                                    <Clock size={14} /> Full-time
                                 </div>
                              </div>
                           </div>
                        </div>
                        {activeTab === 'discover' && (
                           <button onClick={() => setApplyingTo(item)} className="p-2 text-slate-200 hover:text-[var(--color-teal)] transition-all">
                              <Zap size={24} />
                           </button>
                        )}
                     </div>

                     <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex gap-2">
                           {(item.requiredSkills || 'Institutional Alignment').split(',').slice(0, 2).map((s: string, idx: number) => (
                             <span key={idx} className="px-4 py-1.5 bg-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-400 rounded-xl border border-slate-100">
                                {s.trim()}
                             </span>
                           ))}
                        </div>
                        
                        {activeTab === 'discover' ? (
                           <button 
                             onClick={() => setApplyingTo(item)}
                             className="px-8 py-3 bg-white border-2 border-[var(--color-teal)] text-[var(--color-teal)] rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[var(--color-teal)] hover:text-white transition-all active:scale-95 shadow-lg shadow-teal-500/5"
                           >
                             Quick Apply
                           </button>
                        ) : (
                           renderStatusBadge(item.status)
                        )}
                     </div>
                  </div>
                ))}
             </div>
          ) : (
            <div className="py-20 bg-white rounded-[3rem] border border-dashed border-slate-200 text-center px-10">
                <Sparkles size={48} className="mx-auto text-slate-100 mb-6" />
                <h3 className="text-2xl font-serif font-bold text-slate-900 italic mb-2">No Active Records Found</h3>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Adjust filters or check other status tabs</p>
            </div>
          )}
        </div>
      </div>

      {/* High-Fidelity Application Modal */}
      {applyingTo && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 sm:p-12 animate-fade-in">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={() => setApplyingTo(null)}></div>
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative animate-scale-in border border-slate-200/50">
            <div className="p-10 pb-6 flex justify-between items-start">
              <div className="flex gap-6">
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-teal-faint)] flex items-center justify-center text-[var(--color-teal)] font-bold text-2xl shadow-inner">
                  {applyingTo.companyName?.[0] || 'I'}{applyingTo.companyName?.[1] || ''}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight leading-none mb-2">Apply for {applyingTo.title}</h3>
                  <p className="text-[11px] text-slate-500 font-black uppercase tracking-widest">{applyingTo.companyName} · Institutional Registry</p>
                </div>
              </div>
              <button onClick={() => setApplyingTo(null)} className="p-2 text-slate-300 hover:text-rose-500 transition-all rounded-xl hover:bg-slate-50">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleApply} className="p-10 pt-0 space-y-8">
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-300 ml-1">Personal Statement</label>
                <textarea 
                  required
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Elaborate on your motivation for this institutional role..."
                  rows={5}
                  className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 text-sm font-medium outline-none focus:ring-2 focus:ring-[var(--color-teal)]/10 focus:border-[var(--color-teal)] transition-all resize-none shadow-inner" 
                />
              </div>

              <div className="bg-[var(--color-teal-faint)] rounded-[1.5rem] p-6 border border-[var(--color-teal)]/10">
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                       <Target size={20} className="text-[var(--color-teal)]" />
                    </div>
                    <div>
                       <div className="text-[11px] font-black text-[var(--color-teal)] uppercase tracking-widest">Digital Authentication</div>
                       <p className="text-[11px] text-slate-500 font-medium mt-1">Your verified scholarship record will be transmitted instantly upon submission.</p>
                    </div>
                 </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  type="submit"
                  className="flex-1 h-14 bg-[var(--color-teal)] text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4"
                >
                  Submit Application <Send size={18} className="text-white/70" />
                </button>
                <button 
                  type="button"
                  onClick={() => setApplyingTo(null)}
                  className="px-10 h-14 bg-white border border-slate-200 text-slate-400 text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-slate-50 transition-all"
                >
                  Abort
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Placements;
