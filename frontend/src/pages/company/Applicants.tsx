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
              <tr key={app.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-[var(--color-navy)] text-xs border border-white">
                      {app.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[var(--color-navy)]">{app.name}</div>
                      <div className="text-[10px] opacity-40 uppercase font-black tracking-tighter">{app.university}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-[13px] text-slate-600 font-medium">{app.role}</td>
                <td className="px-8 py-6">
                   <div className="flex items-center gap-2">
                     <span className="text-xs font-mono font-bold text-emerald-600">{app.score}</span>
                     <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500" style={{ width: app.score }}></div>
                     </div>
                   </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest border ${
                    app.status === 'NEW' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                    app.status === 'INTERVIEWED' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                    'bg-slate-50 text-slate-600 border-slate-100'
                  }`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-100" title="Approve"><CheckCircle2 size={18} /></button>
                    <button className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100" title="Reject"><XCircle size={18} /></button>
                    <button className="p-2 text-slate-400 hover:text-[var(--color-navy)] hover:bg-slate-100 rounded-lg transition-colors"><ArrowUpRight size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-4 border-t border-slate-50 bg-slate-50/50 flex justify-center">
           <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[var(--color-gold)] transition-colors">Load More Applicants (12 remaining)</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card p-8 bg-[var(--color-navy)] text-white relative overflow-hidden group">
          <div className="relative z-10">
            <Clock size={24} className="text-[var(--color-gold)] mb-6" />
            <h3 className="text-2xl font-serif mb-2 text-white leading-tight">Interaction <em className="italic text-slate-400">Queue</em></h3>
            <p className="text-white/40 text-[11px] mb-8 font-medium uppercase tracking-[0.2em]">3 candidates scheduled tomorrow</p>
            <button className="btn btn-gold btn-sm bg-[var(--color-gold)] text-[var(--color-navy)] px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-[10px] transition-all hover:translate-y-[-2px] shadow-lg shadow-black/20">
              Manage Interviews
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/10 transition-colors"></div>
        </div>
        
        <div className="card p-8 flex flex-col justify-between border-dashed border-2 border-slate-200 bg-[var(--color-cream-2)] shadow-none group hover:border-[var(--color-gold)] transition-all">
          <div>
            <Briefcase size={24} className="text-slate-300 mb-6 group-hover:text-[var(--color-gold)] transition-colors" />
            <h3 className="text-2xl font-serif mb-2 text-[var(--color-navy)] leading-tight">Opening <em className="italic text-slate-400">Inventory</em></h3>
            <p className="text-slate-400 text-[13px] leading-relaxed">You have 4 active internship listings receiving applications. High engagement detected in <strong>UI/UX</strong> roles.</p>
          </div>
          <button className="mt-8 text-[10px] font-bold text-[var(--color-navy)] uppercase tracking-[0.2em] flex items-center gap-2 hover:text-[var(--color-gold)] transition-all">
            Post New Position <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Applicants;
