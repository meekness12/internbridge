import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Briefcase, 
  Filter,
  ArrowUpRight,
  RefreshCw,
  CheckCircle2,
  Send,
  X,
  Target,
  Sparkles,
  Zap,
  Star
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
    <div className="space-y-12 animate-fade-in pb-20 max-w-[1400px] mx-auto">
      <PremiumHeader 
        eyebrow="Marketplace Intelligence"
        title="Find your"
        italicTitle="Future"
        subtitle={`${internships.length} Verified Industry Placements · Academic Year 2024`}
        eyebrowColor="text-[var(--color-gold)]"
        primaryAction={
           <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="relative group w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-gold)] transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Query roles, techs, or partners..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full h-14 bg-white border border-slate-100 rounded-2xl pl-14 pr-6 text-sm font-medium outline-none focus:ring-1 focus:ring-[var(--color-gold)] transition-all shadow-xl shadow-black/5"
                />
             </div>
             <button 
               onClick={handleSearch}
               className="h-14 w-14 flex items-center justify-center bg-[var(--color-navy)] rounded-2xl text-white hover:bg-black transition-all shadow-xl shadow-black/10"
             >
               <Filter size={20} />
             </button>
           </div>
        }
      />

      {/* Global Stats Overlay for the search page */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-up">
         <div className="card p-8 flex items-center gap-6 group hover:translate-y-[-4px] transition-all">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:rotate-6 transition-all">
               <Zap size={28} />
            </div>
            <div>
               <div className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Response Time</div>
               <div className="text-2xl font-serif font-bold text-[var(--color-navy)]">Avg. 48 Hours</div>
            </div>
         </div>
         <div className="card p-8 flex items-center gap-6 group hover:translate-y-[-4px] transition-all">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 group-hover:rotate-6 transition-all">
               <Star size={28} fill="currentColor" />
            </div>
            <div>
               <div className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Quality Score</div>
               <div className="text-2xl font-serif font-bold text-[var(--color-navy)]">Premium Verified</div>
            </div>
         </div>
         <div className="card p-8 flex items-center gap-6 group hover:translate-y-[-4px] transition-all">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:rotate-6 transition-all">
               <Target size={28} />
            </div>
            <div>
               <div className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Match Accuracy</div>
               <div className="text-2xl font-serif font-bold text-[var(--color-navy)]">94% Fit Rate</div>
            </div>
         </div>
      </div>

      <div className="flex items-center gap-1 p-1 bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl w-fit shadow-sm">
        {['Focus Strategy', 'Engineering', 'Creative', 'Operations', 'Global Business'].map((cat, i) => (
          <button key={i} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
            i === 0 ? 'bg-[var(--color-navy)] text-white border-[var(--color-navy)] shadow-xl' : 'bg-transparent text-slate-400 border-transparent hover:text-[var(--color-navy)]'
          }`}>{cat}</button>
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center p-24 gap-6 bg-white/30 rounded-[3rem] border border-white/50 animate-pulse">
          <RefreshCw size={24} className="animate-spin text-[var(--color-gold)]" />
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Querying Talent Cloud...</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {filtered.length > 0 ? filtered.map((job, idx) => {
          const existing = hasApplied(job.id);
          return (
          <div key={job.id} className="card group hover:border-[var(--color-gold)] transition-all cursor-pointer overflow-hidden p-12 flex flex-col h-full bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-black/[0.02] hover:shadow-black/[0.08] relative animate-fade-up" style={{ animationDelay: `${idx * 0.05}s` }}>
            <div className="flex justify-between items-start mb-10">
              <div className="flex gap-8">
                <div className="w-20 h-20 bg-white border border-slate-100 rounded-3xl flex items-center justify-center text-[var(--color-navy)] font-serif font-black text-3xl shrink-0 shadow-2xl group-hover:bg-[var(--color-gold)] group-hover:text-white transition-all duration-500">
                  {job.companyName?.substring(0, 1).toUpperCase() || 'I'}
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="font-serif font-bold text-3xl text-[var(--color-navy)] tracking-tight leading-none italic">{job.title}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] text-slate-400 font-mono font-black uppercase tracking-[0.1em]">{job.companyName}</span>
                    <span className="h-1 w-1 bg-[var(--color-gold)] rounded-full"></span>
                    <span className="text-[11px] text-[var(--color-gold)] font-bold uppercase tracking-widest">{job.status}</span>
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 group-hover:text-[var(--color-gold)] group-hover:bg-[var(--color-gold-light)] transition-all">
                <ArrowUpRight size={24} />
              </div>
            </div>

            {job.description && (
              <p className="text-slate-500 text-base leading-relaxed mb-10 font-medium line-clamp-3 opacity-80 group-hover:opacity-100 transition-opacity">{job.description}</p>
            )}

            <div className="grid grid-cols-2 gap-8 mb-10 p-8 bg-slate-50/50 rounded-3xl border border-slate-100/50">
               <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Competencies</div>
                  <div className="text-xs font-bold text-[var(--color-navy)] flex items-center gap-2">
                     <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                     {job.requiredSkills?.split(',')[0] || 'Strategic Focus'}
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Application Window</div>
                  <div className="text-xs font-bold text-[var(--color-navy)] flex items-center gap-2 font-mono">
                     <div className="w-1.5 h-1.5 bg-[var(--color-gold)] rounded-full"></div>
                     {job.deadline || 'Queue Open'}
                  </div>
               </div>
            </div>

            <div className="mt-auto flex items-center justify-between">
              <div className="flex gap-2">
                {job.requiredSkills?.split(',').slice(0, 3).map((skill, i) => (
                  <span key={i} className="text-[9px] px-4 py-2 bg-white border border-slate-100 rounded-full font-black uppercase tracking-widest text-slate-400 group-hover:border-[var(--color-gold-faint)] group-hover:text-[var(--color-gold)] transition-colors">{skill.trim()}</span>
                ))}
              </div>
              {existing ? (
                <div className="flex flex-col items-end gap-1">
                   <div className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.3em]">Record Finalized</div>
                   <div className="text-[11px] font-bold text-[var(--color-navy)] flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-600" /> Applied
                   </div>
                </div>
              ) : (
                <button 
                  onClick={() => setApplyingTo(job)}
                  className="btn btn-primary px-10 py-4 h-14 rounded-2xl flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(26,48,40,0.15)] hover:scale-105 active:scale-95 transition-all"
                >
                  Apply <Send size={18} />
                </button>
              )}
            </div>
            
            <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
               <Sparkles size={60} className="text-[var(--color-gold)]" />
            </div>
          </div>
          );
        }) : !isLoading && (
          <div className="col-span-1 lg:col-span-2 p-32 text-center border-4 border-dashed border-slate-100 rounded-[4rem] flex flex-col items-center gap-6">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
               <Briefcase size={50} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-slate-300">No Opportunities Available</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Global talent marketplace is currently synchronizing.</p>
            </div>
          </div>
        )}
      </div>

      {/* Modern Modal Overlay */}
      {applyingTo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[var(--color-navy)]/90 backdrop-blur-2xl animate-fade-in">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.5)] animate-scale-in relative border border-white/20">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[var(--color-gold)] via-[var(--color-navy)] to-[var(--color-gold)]"></div>
            
            <div className="p-16">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-[1px] bg-[var(--color-gold)]"></div>
                    <span className="text-[11px] font-mono font-black text-[var(--color-gold)] uppercase tracking-[0.4em]">Academic Record</span>
                  </div>
                  <h3 className="text-4xl font-serif text-[var(--color-navy)] leading-tight">Apply to <em className="italic">{applyingTo.title}</em></h3>
                  <div className="text-[10px] font-mono font-black text-slate-300 uppercase mt-3 tracking-widest">{applyingTo.companyName} · Placement ID {applyingTo.id.substring(0,8)}</div>
                </div>
                <button onClick={() => setApplyingTo(null)} className="w-14 h-14 rounded-[1.2rem] bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleApply} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Personal Statement / Motivation</label>
                  <textarea 
                    required
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Articulate your value proposition to the industry partner..."
                    rows={6}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 text-base font-medium outline-none focus:ring-1 focus:ring-[var(--color-gold)] focus:bg-white transition-all resize-none shadow-inner" 
                  />
                </div>

                <div className="p-8 bg-slate-50/50 rounded-3xl border border-slate-100">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-6">Structural Details</div>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                       <div className="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Target Skill</div>
                       <div className="text-sm font-bold text-[var(--color-navy)] uppercase tracking-tight">{applyingTo.requiredSkills || 'Institutional Alignment'}</div>
                    </div>
                    <div>
                       <div className="text-[9px] text-slate-400 uppercase tracking-widest mb-1">Submission Cutoff</div>
                       <div className="text-sm font-bold text-[var(--color-navy)] font-mono">{applyingTo.deadline || 'Rolling Admissions'}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="submit"
                    className="w-full h-16 bg-[var(--color-navy)] text-white text-[12px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-2xl flex items-center justify-center gap-4 hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Authenticate & Submit <Send size={20} className="text-[var(--color-gold)]" />
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
