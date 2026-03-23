import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MessageSquare,
  ChevronRight,
  FileText
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';

const LogbookReview: React.FC = () => {
  const pendingLogs = [
    { id: '1', intern: 'John Doe', date: '2024-03-20', hours: 8, activity: 'Completed API integration for user registration. Implemented JWT validation and role-based access control filters.', status: 'PENDING' },
    { id: '2', intern: 'Aisha Ibrahim', date: '2024-03-20', hours: 7.5, activity: 'Redesigned the landing page with glassmorphism effects and SVG animations. Optimized asset loading for sub-100ms LCP.', status: 'PENDING' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Operational Review"
        title="Logbook"
        italicTitle="Approvals"
        subtitle="Verification required for 12 industry engagement records this week"
        eyebrowColor="text-[var(--color-navy)]"
        primaryAction={
           <div className="bg-white border border-slate-200 rounded-lg px-5 flex items-center gap-3 h-11 shadow-sm">
             <Clock size={18} className="text-[var(--color-gold)]" />
             <span className="text-[10px] font-bold text-[var(--color-navy)] uppercase tracking-widest">Pending: 12 Entries</span>
           </div>
        }
      />

      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-2">
           <h2 className="label-mono text-[10px] tracking-[0.2em] font-bold text-[var(--color-navy)] opacity-60 uppercase">Pending Verification</h2>
           <div className="h-[1px] w-12 bg-slate-100"></div>
        </div>

        {pendingLogs.map((log) => (
          <div key={log.id} className="card p-0 overflow-hidden border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all group relative">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-48 bg-[var(--color-cream-2)] p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
                <div className="text-4xl font-serif font-bold text-[var(--color-navy)] leading-none mb-1">{new Date(log.date).getDate()}</div>
                <div className="text-[10px] font-mono font-bold text-[var(--color-navy)] opacity-40 uppercase tracking-[0.2em]">
                  {new Date(log.date).toLocaleString('default', { month: 'short' }).toUpperCase()}
                </div>
              </div>

              <div className="flex-1 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-[var(--color-navy)] text-xs border border-white shadow-sm">
                      {log.intern.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[var(--color-navy)]">{log.intern}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <div className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest">
                          {log.hours} Hours Logged
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                      <CheckCircle2 size={14} /> Approve
                    </button>
                    <button className="flex items-center gap-2 bg-rose-50 text-rose-600 px-5 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-sm">
                      <XCircle size={14} /> Reject
                    </button>
                  </div>
                </div>
                <p className="text-[var(--color-navy)] text-[15px] leading-relaxed opacity-70 mb-8 max-w-3xl font-medium italic border-l-2 border-slate-100 pl-6 py-1">
                  "{log.activity}"
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <button className="text-[10px] font-bold text-slate-400 hover:text-[var(--color-navy)] uppercase tracking-[0.2em] flex items-center gap-2 transition-all">
                    <MessageSquare size={16} /> Add Feedback
                  </button>
                  <button className="text-[10px] font-bold text-[var(--color-navy)] hover:text-[var(--color-gold)] uppercase tracking-[0.2em] flex items-center gap-2 transition-all group/btn">
                    View Technical Context <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
            {/* Premium Indicator */}
            <div className="absolute left-0 bottom-0 w-1 h-0 bg-[var(--color-gold)] group-hover:h-full transition-all duration-500 opacity-40"></div>
          </div>
        ))}
      </div>

      <div className="card p-12 bg-[var(--color-cream-2)] border-dashed border-2 border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl group hover:border-[var(--color-gold)] transition-all">
         <div className="flex items-center gap-8">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
               <FileText size={32} className="text-slate-200 group-hover:text-[var(--color-gold)] transition-colors" />
            </div>
            <div className="text-center md:text-left">
               <h4 className="text-2xl font-serif text-[var(--color-navy)] mb-2">Review <em className="italic text-slate-400">Archive</em></h4>
               <p className="text-[13px] text-slate-400 max-w-md font-medium leading-relaxed">Access previous weeks' approved logs and performance history for all interns across departments.</p>
            </div>
         </div>
         <button className="text-[10px] font-bold text-[var(--color-navy)] uppercase tracking-[0.2em] px-10 py-4 border border-slate-300 rounded-xl hover:bg-white hover:border-[var(--color-gold)] transition-all shadow-sm">
            Access Historical Records
         </button>
      </div>
    </div>
  );
};

export default LogbookReview;
