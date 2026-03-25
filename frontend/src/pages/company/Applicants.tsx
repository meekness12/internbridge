import React from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  CheckCircle2, 
  XCircle,
  FileText,
  Clock,
  Briefcase
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';

const Applicants: React.FC = () => {
  const applicants = [
    { id: '1', name: 'Aisha Ibrahim', university: 'Central University', role: 'Software Intern', score: '98%', status: 'NEW' },
    { id: '2', name: 'Kofi Arhin', university: 'KNUST', role: 'Backend Intern', score: '92%', status: 'REVIEWED' },
    { id: '3', name: 'Zainab Salifu', university: 'University of Ghana', role: 'Software Intern', score: '85%', status: 'INTERVIEWED' },
    { id: '4', name: 'Emmanuel Tetteh', university: 'Ashesi University', role: 'UI/UX Intern', score: '88%', status: 'NEW' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Talent Acquisition"
        title="Incoming"
        italicTitle="Applicants"
        subtitle="Review 12 pending applications for the Summer 2024 cohort"
        eyebrowColor="text-[var(--color-navy)]"
        primaryAction={
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Filter by name..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)] shadow-sm transition-all"
            />
          </div>
        }
        secondaryAction={
          <button className="p-2.5 border border-slate-200 rounded-lg bg-white text-slate-400 hover:text-[var(--color-navy)] hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={18} />
          </button>
        }
      />

      <div className="card p-0 overflow-hidden border border-slate-200 shadow-sm transition-all">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[var(--color-cream)] border-b border-slate-100">
              <th className="px-8 py-4 label-mono text-[9px] uppercase tracking-widest opacity-50 font-bold">Candidate Identity</th>
              <th className="px-8 py-4 label-mono text-[9px] uppercase tracking-widest opacity-50 font-bold">Target Position</th>
              <th className="px-8 py-4 label-mono text-[9px] uppercase tracking-widest opacity-50 font-bold">Match Score</th>
              <th className="px-8 py-4 label-mono text-[9px] uppercase tracking-widest opacity-50 font-bold">Process Status</th>
              <th className="px-8 py-4 label-mono text-[9px] uppercase tracking-widest opacity-50 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {applicants.map((app) => (
              <tr key={app.id} className="group hover:bg-slate-50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[var(--color-parchment)] rounded-xl flex items-center justify-center font-bold text-[var(--color-navy)] text-xs border border-[var(--color-border)] shadow-inner group-hover:bg-white transition-all">
                      {app.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[var(--color-navy)]">{app.name}</div>
                      <div className="text-[11px] opacity-60 uppercase font-black tracking-tighter text-slate-500">{app.university}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-[13px] text-slate-700 font-bold">{app.role}</td>
                <td className="px-8 py-6">
                   <div className="flex items-center gap-2">
                     <span className="text-xs font-mono font-bold text-emerald-700">{app.score}</span>
                     <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-600" style={{ width: app.score }}></div>
                     </div>
                   </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`text-[9px] px-3 py-1.5 rounded-lg font-black uppercase tracking-[0.15em] border ${
                    app.status === 'NEW' ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm' :
                    app.status === 'INTERVIEWED' ? 'bg-[var(--color-gold)] text-[var(--color-navy)] border-[var(--color-gold)] shadow-sm' :
                    'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2.5 text-emerald-700 hover:bg-emerald-50 rounded-xl transition-all border border-transparent hover:border-emerald-100" title="Approve"><CheckCircle2 size={18} /></button>
                    <button className="p-2.5 text-rose-700 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-100" title="Reject"><XCircle size={18} /></button>
                    <button className="p-2.5 text-slate-400 hover:text-[var(--color-navy)] hover:bg-slate-100 rounded-xl transition-all"><ArrowUpRight size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-center">
           <button className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-[var(--color-forest)] transition-colors">Load More Professionals (12 remaining)</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card p-10 bg-[var(--color-forest)] text-white relative overflow-hidden group shadow-xl">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
               <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 text-[var(--color-gold)]">
                  <Clock size={24} />
               </div>
               <div className="h-[1px] w-12 bg-[var(--color-gold)] opacity-40"></div>
            </div>
            <h3 className="text-3xl font-serif mb-3 text-white leading-tight">Interaction <em className="italic text-[var(--color-gold)]">Queue</em></h3>
            <p className="text-white/60 text-[10px] mb-10 font-black uppercase tracking-[0.3em] flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-[var(--status-success)] rounded-full animate-pulse"></span>
               3 candidates scheduled tomorrow
            </p>
            <button className="w-full bg-[var(--color-gold)] text-[var(--color-forest)] py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-[var(--color-gold)]/20 active:scale-95">
              Manage Interviews
            </button>
          </div>
          {/* Editorial Watermark */}
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
            <p className="text-slate-500 text-[13px] leading-relaxed max-w-sm">You have <strong className="text-[var(--color-navy)]">4 active internship listings</strong> receiving applications. High engagement detected in <strong className="text-[var(--color-gold)] capitalize">UI/UX Design</strong>.</p>
          </div>
          <button className="relative z-10 mt-10 text-[10px] font-black text-[var(--color-navy)] uppercase tracking-[0.3em] flex items-center gap-3 group/btn hover:text-[var(--color-gold)] transition-all">
            Post New Position <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Applicants;
