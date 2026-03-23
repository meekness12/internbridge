import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  Briefcase, 
  ChevronRight, 
  Filter,
  ArrowUpRight
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';

const Placements: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const internships = [
    {
      id: 1,
      title: 'Senior Frontend Intern',
      company: 'Techwave Technologies',
      location: 'Accra, Ghana',
      duration: '16 Weeks',
      stipend: 'GHS 1,200',
      category: 'Engineering',
      logo: 'TW',
      active: true
    },
    {
      id: 2,
      title: 'UX/UI Design Intern',
      company: 'CloudSphere',
      location: 'Kumasi, Ghana',
      duration: '12 Weeks',
      stipend: 'GHS 1,500',
      category: 'Design',
      logo: 'CS',
      active: true
    },
    {
      id: 3,
      title: 'Backend Developer (Java)',
      company: 'DataStream Systems',
      location: 'Remote',
      duration: '24 Weeks',
      stipend: 'GHS 2,000',
      category: 'Engineering',
      logo: 'DS',
      active: false
    }
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Opportunity Marketplace"
        title="Explore"
        italicTitle="Career"
        titleSuffix="Openings"
        subtitle="Trinity Term 2024 · 42 Active Placements · Verified Partners"
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
                  className="w-full h-11 bg-white border border-slate-200 rounded-xl pl-12 pr-5 text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)] transition-all shadow-sm"
                />
             </div>
             <button className="h-11 w-11 flex items-center justify-center bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[var(--color-navy)] hover:bg-slate-50 transition-all shadow-sm">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {internships.map((job) => (
          <div key={job.id} className="card group hover:border-[var(--color-gold)] transition-all cursor-pointer overflow-hidden p-10 flex flex-col h-full bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md relative">
            <div className="flex justify-between items-start mb-8">
              <div className="flex gap-6">
                <div className="w-16 h-16 bg-[var(--color-navy)] rounded-2xl flex items-center justify-center text-white font-bold text-2xl shrink-0 shadow-lg group-hover:bg-black transition-colors">
                  {job.logo}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-2xl text-[var(--color-navy)] tracking-tight">{job.title}</h3>
                    {job.active && (
                      <span className="bg-emerald-50 text-emerald-600 text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest border border-emerald-100">Actively Hiring</span>
                    )}
                  </div>
                  <p className="text-[13px] text-slate-400 font-mono font-bold uppercase tracking-widest leading-none">{job.company}</p>
                </div>
              </div>
              <ArrowUpRight className="text-slate-200 group-hover:text-[var(--color-gold)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={28} />
            </div>

            <div className="grid grid-cols-3 gap-6 mb-10 pt-8 border-t border-slate-50">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-30 text-slate-400">Location</span>
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[var(--color-navy)] uppercase tracking-tight">
                  {job.location}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-30 text-slate-400">Duration</span>
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[var(--color-navy)] uppercase tracking-tight">
                  {job.duration}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-bold uppercase tracking-widest opacity-30 text-slate-400">Stipend</span>
                <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[var(--color-navy)] uppercase tracking-tight">
                  {job.stipend}
                </div>
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between pt-8 border-t border-slate-50">
              <div className="flex gap-2">
                <span className="text-[9px] px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg font-black uppercase tracking-widest text-slate-400">Hybrid</span>
                <span className="text-[9px] px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg font-black uppercase tracking-widest text-slate-400">Engineering</span>
              </div>
              <button className="text-[10px] font-bold text-[var(--color-navy)] hover:text-[var(--color-gold)] flex items-center gap-2 uppercase tracking-[0.2em] transition-all group/btn">
                Project Dossier <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Premium Indicator */}
            <div className="absolute left-0 bottom-0 w-1 h-0 bg-[var(--color-gold)] group-hover:h-full transition-all duration-500 opacity-40"></div>
          </div>
        ))}
      </div>

      <div className="editorial-banner p-14 text-white relative overflow-hidden rounded-3xl group cursor-pointer shadow-2xl bg-[var(--color-navy)]">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-yellow-400/5 rounded-full blur-[140px] -mr-40"></div>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className="max-w-2xl">
            <div className="label-mono-accent text-[10px] tracking-[0.4em] mb-8 opacity-40 uppercase font-black">Strategic Residency • Top Tier Partners</div>
            <h2 className="text-6xl font-serif font-medium leading-[1.1] mb-8">
              Global Residency <br /> Program at <em className="italic text-[var(--color-gold)]">Microsoft</em>
            </h2>
            <p className="text-lg opacity-60 font-sans leading-relaxed mb-10 italic">
              "Join a select cohort of 20 engineering students for a fully-funded technical residency in the Nairobi Innovation Hub."
            </p>
            <div className="flex gap-10 text-[11px] font-mono tracking-[0.2em] font-bold opacity-80 uppercase border-t border-white/10 pt-8">
              <span className="flex items-center gap-4"><Clock size={20} className="text-[var(--color-gold)]" /> 24 Months Engagement</span>
              <span className="flex items-center gap-4"><MapPin size={20} className="text-[var(--color-gold)]" /> Nairobi, Kenya</span>
            </div>
          </div>
          <button className="bg-[var(--color-gold)] text-black font-black h-28 w-28 lg:h-36 lg:w-36 rounded-full flex items-center justify-center flex-col text-[11px] uppercase tracking-widest hover:scale-110 hover:bg-[#d4a017] transition-all shadow-3xl shadow-black/40 active:scale-95 leading-none">
            Apply <br /> Now
          </button>
        </div>
        <div className="absolute bottom-4 right-8 text-[10px] font-mono opacity-20 uppercase tracking-[0.5em]">Reserved Selection</div>
      </div>
    </div>
  );
};

export default Placements;
