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
    <div className="space-y-10 animate-fade-in">
      {/* Header & Search */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex-1">
          <div className="label-mono text-[10px] tracking-[0.3em] font-bold text-[var(--color-gold)] uppercase mb-3 opacity-80 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
            Opportunity Marketplace
          </div>
          <h1 className="text-5xl font-serif text-[var(--color-navy)] leading-tight">
            Explore <em className="italic">Career</em> Openings
          </h1>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative group flex-1 md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-forest)] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by role or company..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 bg-white border border-[var(--color-border)] rounded-full pl-11 pr-5 text-sm outline-none focus:ring-1 focus:ring-[var(--color-forest)] transition-all"
            />
          </div>
          <button className="h-12 w-12 flex items-center justify-center bg-white border border-[var(--color-border)] rounded-full text-[var(--color-forest)] hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={20} />
          </button>
        </div>
      </header>

      {/* Filter Chips */}
      <div className="flex flex-wrap gap-3">
        {['All Categories', 'Engineering', 'Design', 'Marketing', 'Data Science', 'Business'].map((cat, i) => (
          <button key={i} className={`filter-chip ${i === 0 ? 'active' : ''}`}>{cat}</button>
        ))}
      </div>

      {/* Internship Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {internships.map((job) => (
          <div key={job.id} className="card group hover:border-[var(--color-gold)] transition-all cursor-pointer overflow-hidden p-8 flex flex-col h-full bg-white">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4">
                <div className="w-14 h-14 bg-[var(--color-forest)] rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg group-hover:bg-[#1B2B24] transition-colors">
                  {job.logo}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-xl text-[var(--color-navy)]">{job.title}</h3>
                    {job.active && (
                      <span className="bg-emerald-50 text-emerald-600 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border border-emerald-100">Actively Hiring</span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--color-navy)] opacity-50 font-medium">{job.company}</p>
                </div>
              </div>
              <ArrowUpRight className="text-slate-300 group-hover:text-[var(--color-gold)] transition-colors" size={24} />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex items-center gap-2 text-xs text-[var(--color-navy)] opacity-60 font-medium font-mono uppercase tracking-tight">
                <MapPin size={14} className="text-[var(--color-gold)]" /> {job.location}
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--color-navy)] opacity-60 font-medium font-mono uppercase tracking-tight">
                <Clock size={14} className="text-[var(--color-gold)]" /> {job.duration}
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--color-navy)] opacity-60 font-medium font-mono uppercase tracking-tight">
                <Briefcase size={14} className="text-[var(--color-gold)]" /> {job.stipend}
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100">
              <div className="flex gap-1.5">
                <span className="text-[9px] px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-md font-bold uppercase tracking-widest text-slate-500">Full-time</span>
                <span className="text-[9px] px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-md font-bold uppercase tracking-widest text-slate-500">Degree Req.</span>
              </div>
              <button className="text-[10px] font-bold text-[var(--color-forest)] flex items-center gap-1 uppercase tracking-widest group-hover:gap-2 transition-all">
                Project Details <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Banner */}
      <div className="editorial-banner p-12 text-white relative overflow-hidden rounded-2xl group cursor-pointer">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-yellow-400/10 rounded-full blur-[120px] -mr-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="max-w-xl">
            <div className="label-mono-accent text-[9px] tracking-[0.4em] mb-6 opacity-50 uppercase font-bold">Priority Placement • Engineering</div>
            <h2 className="text-5xl font-serif font-medium leading-tight mb-6">
              Global Residency <br /> Program at <em className="italic text-[var(--color-gold)]">Microsoft</em>
            </h2>
            <p className="text-lg opacity-70 font-sans leading-relaxed mb-10">
              Join a select cohort of 20 students for a fully-funded technical residency. Housing, travel, and competitive stipend included.
            </p>
            <div className="flex gap-8 text-[11px] font-mono tracking-widest font-bold opacity-80 uppercase">
              <span className="flex items-center gap-3"><Clock size={16} className="text-[var(--color-gold)]" /> 6 Months</span>
              <span className="flex items-center gap-3"><MapPin size={16} className="text-[var(--color-gold)]" /> Nairobi, Kenya</span>
            </div>
          </div>
          <button className="bg-[var(--color-gold)] text-black font-bold h-16 w-16 md:h-24 md:w-24 rounded-full flex items-center justify-center flex-col text-[10px] uppercase tracking-tighter hover:scale-105 transition-all shadow-2xl">
            Apply <br /> Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Placements;
