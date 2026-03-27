import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  Briefcase, 
  ChevronRight, 
  Filter,
  ArrowUpRight,
  RefreshCw,
  CheckCircle2,
  Send,
  X
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import internshipService from '../../api/internshipService';
import applicationService from '../../api/applicationService';
import type { InternshipDTO } from '../../api/internshipService';
import type { ApplicationDTO } from '../../api/applicationService';
import { useToast } from '../../context/ToastContext';

const Placements: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [internships, setInternships] = useState<InternshipDTO[]>([]);
  const [myApplications, setMyApplications] = useState<ApplicationDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [applyingTo, setApplyingTo] = useState<InternshipDTO | null>(null);
  const [coverLetter, setCoverLetter] = useState('');

  const userId = localStorage.getItem('userId') || '';

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
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      fetchData();
      return;
    }
    setIsLoading(true);
    try {
      const results = await internshipService.searchInternships(searchQuery);
      setInternships(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingTo) return;
    try {
      await applicationService.applyForInternship({
        internshipId: applyingTo.id,
        studentId: userId,
        coverLetter: coverLetter,
      });
      toast('Application submitted successfully!', 'success', 'Applied');
      setApplyingTo(null);
      setCoverLetter('');
      fetchData();
    } catch (error) {
      toast('Failed to submit application. You may have already applied.', 'error', 'Error');
    }
  };

  const hasApplied = (internshipId: string): ApplicationDTO | undefined => {
    return myApplications.find(a => a.internshipId === internshipId);
  };

  const filtered = internships.filter(job =>
    job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.requiredSkills?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Opportunity Marketplace"
        title="Explore"
        italicTitle="Career"
        titleSuffix="Openings"
        subtitle={`${internships.length} Active Placements · Verified Partners`}
        eyebrowColor="text-[var(--color-navy)]"
        primaryAction={
           <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="relative group w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-gold)] transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by role or company..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full h-11 bg-white border border-slate-200 rounded-xl pl-12 pr-5 text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)] transition-all shadow-sm"
                />
             </div>
             <button 
               onClick={handleSearch}
               className="h-11 w-11 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[var(--color-navy)] hover:bg-slate-50 transition-all shadow-sm"
             >
               <Filter size={18} />
             </button>
           </div>
        }
      />

      <div className="flex flex-wrap gap-4">
        {['All Categories', 'Engineering', 'Design', 'Marketing', 'Data Science', 'Business'].map((cat, i) => (
          <button key={i} className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
            i === 0 ? 'bg-[var(--color-navy)] text-white border-[var(--color-navy)] shadow-md' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-400'
          }`}>{cat}</button>
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center p-12 gap-4">
          <RefreshCw size={20} className="animate-spin text-[var(--color-gold)]" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading opportunities...</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filtered.length > 0 ? filtered.map((job) => {
          const existing = hasApplied(job.id);
          return (
          <div key={job.id} className="card group hover:border-[var(--color-gold)] transition-all cursor-pointer overflow-hidden p-10 flex flex-col h-full bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md relative">
            <div className="flex justify-between items-start mb-8">
              <div className="flex gap-6">
                <div className="w-16 h-16 bg-[var(--color-navy)] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shrink-0 shadow-lg group-hover:bg-black transition-colors">
                  {job.companyName?.substring(0, 2).toUpperCase() || 'IB'}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-2xl text-[var(--color-navy)] tracking-tight">{job.title}</h3>
                    {job.status === 'OPEN' && (
                      <span className="bg-emerald-50 text-emerald-600 text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest border border-emerald-100">Open</span>
                    )}
                  </div>
                  <p className="text-[13px] text-slate-400 font-mono font-bold uppercase tracking-widest leading-none">{job.companyName}</p>
                </div>
              </div>
              <ArrowUpRight className="text-slate-200 group-hover:text-[var(--color-gold)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={28} />
            </div>

            {job.description && (
              <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">{job.description}</p>
            )}

            <div className="grid grid-cols-3 gap-6 mb-10 pt-8 border-t border-slate-50">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-30 text-slate-400">Skills</span>
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[var(--color-navy)] uppercase tracking-tight">
                  {job.requiredSkills?.split(',')[0] || 'General'}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-30 text-slate-400">Deadline</span>
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[var(--color-navy)] uppercase tracking-tight">
                  {job.deadline || 'Open'}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-30 text-slate-400">Status</span>
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[var(--color-navy)] uppercase tracking-tight">
                  {job.status}
                </div>
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between pt-8 border-t border-slate-50">
              <div className="flex gap-2">
                {job.requiredSkills?.split(',').slice(0, 2).map((skill, i) => (
                  <span key={i} className="text-[9px] px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg font-black uppercase tracking-widest text-slate-400">{skill.trim()}</span>
                ))}
              </div>
              {existing ? (
                <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-2 uppercase tracking-[0.2em]">
                  <CheckCircle2 size={16} /> Applied · {existing.status}
                </span>
              ) : (
                <button 
                  onClick={() => setApplyingTo(job)}
                  className="text-[10px] font-bold text-white bg-[var(--color-navy)] hover:bg-black px-6 py-3 rounded-xl flex items-center gap-2 uppercase tracking-[0.2em] transition-all shadow-lg shadow-black/10"
                >
                  <Send size={14} /> Apply Now
                </button>
              )}
            </div>
            
            {/* Premium Indicator */}
            <div className="absolute left-0 bottom-0 w-1 h-0 bg-[var(--color-gold)] group-hover:h-full transition-all duration-500 opacity-40"></div>
          </div>
          );
        }) : !isLoading && (
          <div className="col-span-2 p-20 text-center card bg-slate-50 border-dashed border-2 border-slate-200 rounded-3xl flex flex-col items-center gap-4">
            <Briefcase size={48} className="text-slate-200" />
            <div className="text-sm font-bold text-slate-400 italic">No internship listings found</div>
            <p className="text-xs text-slate-400">Check back later or adjust your search criteria.</p>
          </div>
        )}
      </div>

      {/* Apply Modal */}
      {applyingTo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[var(--color-navy)]/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl animate-scale-in relative border border-white/20">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-navy)] via-[var(--color-gold)] to-[var(--color-navy)]"></div>
            
            <div className="p-10 pt-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-1 bg-[var(--color-gold)] rounded-full"></div>
                    <span className="text-[10px] font-mono font-black text-[var(--color-gold)] uppercase tracking-[0.3em]">Application</span>
                  </div>
                  <h3 className="text-2xl font-serif text-[var(--color-navy)]">Apply to <em className="italic">{applyingTo.title}</em></h3>
                  <p className="text-xs text-slate-400 mt-1">{applyingTo.companyName}</p>
                </div>
                <button onClick={() => setApplyingTo(null)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleApply} className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Cover Letter / Motivation</label>
                  <textarea 
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Tell the company why you're a great fit for this role..."
                    rows={5}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm outline-none focus:ring-1 focus:ring-[var(--color-gold)] transition-all resize-none" 
                  />
                </div>

                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2">Position Details</div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div><span className="text-slate-400">Skills:</span> <span className="font-bold text-[var(--color-navy)]">{applyingTo.requiredSkills || 'General'}</span></div>
                    <div><span className="text-slate-400">Deadline:</span> <span className="font-bold text-[var(--color-navy)]">{applyingTo.deadline || 'Open'}</span></div>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="submit"
                    className="flex-1 h-14 bg-[var(--color-navy)] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-[var(--color-navy)]/10 flex items-center justify-center gap-3 hover:bg-black transition-all"
                  >
                    <Send size={18} /> Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Placements;
