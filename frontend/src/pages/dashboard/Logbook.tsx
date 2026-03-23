import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  Plus, 
  FileCheck, 
  ChevronRight,
  Search,
  AlertCircle
} from 'lucide-react';

const Logbook: React.FC = () => {
  const [entries] = useState([
    {
      id: 1,
      date: '2024-02-13',
      day: 'Tuesday',
      hours: 8,
      activity: 'Implemented JWT token authentication and request interceptors in React frontend. Integrated with Spring Security backend filters.',
      status: 'APPROVED',
      supervisor: 'Eng. Kwame Mensah',
      verified: true
    },
    {
      id: 2,
      date: '2024-02-12',
      day: 'Monday',
      hours: 7.5,
      activity: 'Setup project boilerplate with Vite and Tailwind v4. Designed the core editorial design tokens and typography hierarchy.',
      status: 'APPROVED',
      supervisor: 'Eng. Kwame Mensah',
      verified: true
    },
    {
      id: 3,
      date: '2024-02-09',
      day: 'Friday',
      hours: 8.5,
      activity: 'Database schema design for multi-tenant identity systems. Implemented Table Inheritance for student and company profiles.',
      status: 'PENDING',
      supervisor: 'Eng. Kwame Mensah',
      verified: false
    }
  ]);

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="label-mono text-[10px] tracking-[0.3em] font-bold text-[var(--color-gold)] uppercase mb-3 opacity-80 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
            Activity Protocol
          </div>
          <h1 className="text-5xl font-serif text-[var(--color-navy)] leading-tight">
            Work <em className="italic text-slate-400">Logbook</em>
          </h1>
        </div>

        <button className="bg-[var(--color-forest)] text-white font-bold py-3.5 px-8 rounded-full flex items-center gap-3 text-xs uppercase tracking-widest hover:bg-[#1B2B24] transition-all shadow-lg shadow-[var(--color-forest)]/10">
          <Plus size={18} /> New Entry
        </button>
      </header>

      {/* Week Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-8 flex flex-col justify-center border-l-4 border-l-[var(--color-gold)]">
          <div className="label-mono text-[9px] uppercase tracking-[0.2em] opacity-50 mb-4 font-bold">This Week Total</div>
          <div className="text-4xl font-serif font-bold text-[var(--color-navy)]">32.5 <span className="text-lg opacity-40 font-sans">HRS</span></div>
        </div>
        <div className="card p-8 flex flex-col justify-center">
          <div className="label-mono text-[9px] uppercase tracking-[0.2em] opacity-50 mb-4 font-bold">Verification Rate</div>
          <div className="text-4xl font-serif font-bold text-[var(--color-navy)]">94.2 <span className="text-lg opacity-40 font-sans">%</span></div>
        </div>
        <div className="card p-8 flex flex-col justify-center">
          <div className="label-mono text-[9px] uppercase tracking-[0.2em] opacity-50 mb-4 font-bold">Total Plasmement Progress</div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full mt-2 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-[var(--color-forest)] rounded-full" style={{ width: '42%' }}></div>
          </div>
          <div className="mt-4 text-xs font-bold text-[var(--color-navy)] opacity-60 uppercase tracking-widest">Week 7 of 16</div>
        </div>
      </div>

      {/* Log Feed */}
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="label-mono text-[10px] tracking-[0.2em] opacity-50 uppercase font-black">Recent Logs</h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-[var(--color-forest)] transition-colors">
              <Search size={14} /> Search
            </div>
            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-[var(--color-forest)] transition-colors">
              Sort by Date <ChevronRight size={14} className="rotate-90" />
            </div>
          </div>
        </div>

        {entries.map((entry) => (
          <div key={entry.id} className="card p-0 overflow-hidden bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all">
            <div className="flex flex-col lg:flex-row">
              {/* Left Date Side */}
              <div className="lg:w-48 bg-[var(--color-cream)] p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-[var(--color-border)]">
                <div className="label-mono text-[8px] opacity-40 uppercase font-bold tracking-widest mb-1">{entry.day}</div>
                <div className="text-2xl font-serif font-bold text-[var(--color-navy)]">{new Date(entry.date).getDate()}</div>
                <div className="text-[10px] font-bold text-[var(--color-navy)] opacity-60 uppercase tracking-widest">
                  {new Date(entry.date).toLocaleString('default', { month: 'short' }).toUpperCase()}
                </div>
              </div>

              {/* Activity Side */}
              <div className="flex-1 p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[var(--color-forest)] font-mono text-xs font-bold">
                      <Clock size={16} /> {entry.hours} Hours
                    </div>
                    <span className={`text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest border ${
                      entry.status === 'APPROVED' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                      : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {entry.status}
                    </span>
                  </div>
                  {entry.verified && (
                    <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">
                      <CheckCircle2 size={16} /> Supervisor Verified
                    </div>
                  )}
                </div>
                <p className="text-[var(--color-navy)] text-[15px] leading-relaxed opacity-80 mb-6">
                  {entry.activity}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                    <FileCheck size={14} /> Assigned to: <strong className="text-slate-600 uppercase tracking-tighter">{entry.supervisor}</strong>
                  </div>
                  <button className="text-[10px] font-bold text-[var(--color-forest)] uppercase tracking-widest opacity-60 hover:opacity-100 flex items-center gap-2 transition-all">
                    Entry Details <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Empty State / History Suggestion */}
        <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-border)] rounded-2xl bg-slate-50/50">
          <AlertCircle className="text-slate-300 mb-4" size={40} />
          <p className="text-sm text-slate-400 font-medium uppercase tracking-widest font-mono">End of Current Month Log Feed</p>
          <button className="mt-4 text-xs font-bold text-[var(--color-forest)] hover:underline decoration-[var(--color-gold)] decoration-2 underline-offset-4 uppercase tracking-widest">View Archives</button>
        </div>
      </div>
    </div>
  );
};

export default Logbook;
