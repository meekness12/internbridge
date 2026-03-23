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
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import { PremiumCard } from '../../components/ui/PremiumCard';

const Logbook: React.FC = () => {
  const [entries] = useState([
    {
      id: 1,
      date: '2024-02-13',
      day: 'Tuesday',
      hours: 8,
      activity: 'Implemented JWT token authentication and request interceptors in React frontend. Integrated with Spring Security backend filters. Optimized role-based access control middleware.',
      status: 'APPROVED',
      supervisor: 'Eng. Kwame Mensah',
      verified: true
    },
    {
      id: 2,
      date: '2024-02-12',
      day: 'Monday',
      hours: 7.5,
      activity: 'Setup project boilerplate with Vite and Tailwind v4. Designed the core editorial design tokens and typography hierarchy. Developed initial shared component library.',
      status: 'APPROVED',
      supervisor: 'Eng. Kwame Mensah',
      verified: true
    },
    {
      id: 3,
      date: '2024-02-09',
      day: 'Friday',
      hours: 8.5,
      activity: 'Database schema design for multi-tenant identity systems. Implemented Table Inheritance for student and company profiles. Developed migration scripts for PostgreSQL.',
      status: 'PENDING',
      supervisor: 'Eng. Kwame Mensah',
      verified: false
    }
  ]);

  const stats = [
    { label: 'Weekly Capacity', value: '32.5', trend: '↑ 4.5 hrs from last week', icon: '⏱️', color: 'ki-1', kpiColor: 'kpi-1' },
    { label: 'Verification rate', value: '94%', trend: 'Elite Standing', icon: '✅', color: 'ki-2', kpiColor: 'kpi-2' },
    { label: 'Total Engagement', value: '128', trend: 'Course Total', icon: '📚', color: 'ki-3', kpiColor: 'kpi-3' },
    { label: 'Term Progress', value: '42%', trend: 'Week 7 of 16', icon: '📊', color: 'ki-5', kpiColor: 'kpi-5' },
    { label: 'Pending review', value: '3', trend: 'Logs awaiting check', icon: '📩', color: 'ki-4', kpiColor: 'kpi-4' },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Activity Protocol"
        title="Work"
        italicTitle="Logbook"
        subtitle="Trinity Term 2024 · Week 7 of 16 · Digital Engagement Record"
        eyebrowColor="text-[var(--color-gold)]"
        primaryAction={
          <button className="bg-[var(--color-navy)] text-white font-bold py-3.5 px-8 rounded-xl flex items-center gap-3 text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-black/10">
            <Plus size={18} /> New Log Entry
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <PremiumCard key={i} {...stat} />
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
             <h3 className="label-mono text-[10px] tracking-[0.2em] font-bold text-[var(--color-navy)] opacity-60 uppercase tracking-widest">Entry History</h3>
             <div className="h-[1px] w-12 bg-slate-100"></div>
          </div>
          <div className="flex gap-1">
            <button className="p-2 text-slate-400 hover:text-[var(--color-navy)] hover:bg-slate-50 rounded-lg transition-all"><Search size={16} /></button>
            <button className="p-2 text-slate-400 hover:text-[var(--color-navy)] hover:bg-slate-50 rounded-lg transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
              Sort <ChevronRight size={14} className="rotate-90" />
            </button>
          </div>
        </div>

        {entries.map((entry) => (
          <div key={entry.id} className="card p-0 overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all group relative">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-48 bg-[var(--color-cream-2)] p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">{entry.day}</div>
                <div className="text-4xl font-serif font-bold text-[var(--color-navy)] leading-none mb-1">{new Date(entry.date).getDate()}</div>
                <div className="text-[11px] font-mono font-bold text-[var(--color-navy)] opacity-40 uppercase tracking-widest">
                  {new Date(entry.date).toLocaleString('default', { month: 'short' }).toUpperCase()}
                </div>
              </div>

              <div className="flex-1 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-emerald-600 font-mono text-xs font-bold bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-tighter border border-emerald-100">
                      <Clock size={14} /> {entry.hours} Hours
                    </div>
                    <span className={`text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest border ${
                      entry.status === 'APPROVED' 
                      ? 'bg-indigo-50 text-indigo-600 border-indigo-100' 
                      : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {entry.status}
                    </span>
                  </div>
                  {entry.verified && (
                    <div className="flex items-center gap-1.5 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                      <CheckCircle2 size={16} /> Verified
                    </div>
                  )}
                </div>
                <p className="text-[var(--color-navy)] text-[15px] leading-relaxed opacity-70 mb-8 max-w-3xl italic border-l-2 border-slate-100 pl-6 py-1">
                  "{entry.activity}"
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    <FileCheck size={14} className="text-[var(--color-gold)]" /> Supervisor: <span className="text-slate-600">{entry.supervisor}</span>
                  </div>
                  <button className="text-[10px] font-bold text-[var(--color-navy)] hover:text-[var(--color-gold)] uppercase tracking-[0.2em] flex items-center gap-2 transition-all group/btn">
                    View Full Details <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
            {/* Premium Indicator */}
            <div className="absolute left-0 bottom-0 w-1 h-0 bg-[var(--color-gold)] group-hover:h-full transition-all duration-500 opacity-40"></div>
          </div>
        ))}
        
        <div className="py-16 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50 group hover:bg-white hover:border-[var(--color-gold)] transition-all">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
             <AlertCircle className="text-slate-200 group-hover:text-[var(--color-gold)] transition-colors" size={32} />
          </div>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.3em] font-mono">End of Academic Month Log Feed</p>
          <button className="mt-6 text-[10px] font-bold text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-all uppercase tracking-widest flex items-center gap-2">
            Access Historical Archives <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logbook;
