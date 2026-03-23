import React from 'react';
import { 
  CheckCircle2, 
  BookOpen, 
  ChevronRight,
  MessageCircle,
  Clock,
  Settings
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';

const LogbookGrading: React.FC = () => {
  const ungradedLogs = [
    { id: '1', student: 'John Doe', week: 12, company: 'Techwave', date: '2024-03-22', status: 'COMPANY_APPROVED' },
    { id: '2', student: 'Marcus Wright', week: 11, company: 'DataStream', date: '2024-03-21', status: 'COMPANY_APPROVED' },
    { id: '3', student: 'Sarah Linn', week: 8, company: 'CloudSphere', date: '2024-03-18', status: 'COMPANY_APPROVED' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Academic Assessment"
        title="Logbook"
        italicTitle="Grading"
        subtitle="Evaluation required for 7 pending submissions in the active cohort"
        eyebrowColor="text-[var(--color-navy)]"
        primaryAction={
           <div className="bg-white border border-slate-200 rounded-lg px-6 flex items-center gap-3 h-11 shadow-sm">
             <Clock size={16} className="text-[var(--color-gold)]" />
             <span className="text-[10px] font-bold text-[var(--color-navy)] uppercase tracking-widest">7 Pending Grade</span>
           </div>
        }
        secondaryAction={
          <button className="p-2.5 border border-slate-200 rounded-lg bg-white text-slate-400 hover:text-[var(--color-navy)] hover:bg-slate-50 transition-all shadow-sm">
            <Settings size={18} />
          </button>
        }
      />

      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-2">
           <h2 className="label-mono text-[10px] tracking-[0.2em] font-bold text-[var(--color-navy)] opacity-60 uppercase">Evaluation Queue</h2>
           <div className="h-[1px] w-12 bg-slate-100"></div>
        </div>

        {ungradedLogs.map((log) => (
          <div key={log.id} className="card p-6 flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
             <div className="flex items-center gap-8 flex-1">
                <div className="w-16 h-16 bg-[var(--color-cream-2)] rounded-2xl flex flex-col items-center justify-center border border-white shadow-inner group-hover:scale-105 transition-transform">
                   <div className="text-[10px] font-black text-slate-300 uppercase tracking-tighter mb-0.5">Week</div>
                   <div className="text-2xl font-serif font-bold text-[var(--color-navy)] leading-none">{log.week}</div>
                </div>
                <div>
                  <div className="font-bold text-lg text-[var(--color-navy)] mb-1 group-hover:text-[var(--color-gold)] transition-colors">{log.student}</div>
                  <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.15em] opacity-80">
                     <span className="text-[var(--color-gold)]">{log.company}</span>
                     <span className="opacity-30">•</span>
                     <span>{log.date}</span>
                  </div>
                </div>
             </div>

             <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 text-[9px] font-black text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full uppercase tracking-tighter border border-emerald-100">
                   <CheckCircle2 size={14} /> {log.status}
                </div>
                <button className="bg-[var(--color-navy)] text-white text-[10px] font-bold py-3.5 px-8 rounded-xl uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-black/10 group-hover:translate-x-1">
                   Assess Entry <ChevronRight size={16} />
                </button>
             </div>
             {/* Premium Indicator */}
             <div className="absolute left-0 bottom-0 w-1 h-0 bg-[var(--color-gold)] group-hover:h-full transition-all duration-500 opacity-40"></div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
         <div className="lg:col-span-7 card p-10 bg-[var(--color-cream-2)] border-none shadow-sm rounded-2xl relative overflow-hidden group">
            <BookOpen className="text-[var(--color-gold)] mb-8 group-hover:scale-110 transition-transform" size={40} />
            <h4 className="text-3xl font-serif text-[var(--color-navy)] mb-6 leading-tight">Grading <br /> <em className="italic text-slate-400">Guidelines</em></h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
               {[
                 { title: 'Technical Depth', body: 'Verify complexity of tasks and code quality.' },
                 { title: 'Industry Alignment', body: 'Cross-reference with company supervisor feedback.' },
                 { title: 'Engagement ROI', body: 'Evidence of core skills acquisition and growth.' },
                 { title: 'Volume Met', body: 'Ensure 40+ hours per week active engagement.' }
               ].map((rule, idx) => (
                 <div key={idx} className="flex flex-col gap-2">
                    <div className="text-[10px] font-mono font-bold text-[var(--color-navy)] uppercase tracking-widest flex items-center gap-2">
                       <div className="w-1.5 h-1.5 bg-[var(--color-gold)] rounded-full"></div> {rule.title}
                    </div>
                    <p className="text-[13px] text-slate-500 leading-relaxed font-medium pl-3.5 italic">{rule.body}</p>
                 </div>
               ))}
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
         </div>

         <div className="lg:col-span-5 card p-10 flex flex-col justify-between border-slate-200 shadow-sm rounded-2xl group hover:border-[var(--color-gold)] transition-all">
            <div>
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 border border-slate-100 group-hover:bg-indigo-50 transition-colors">
                 <MessageCircle className="text-slate-300 group-hover:text-indigo-600 transition-colors" size={28} />
              </div>
              <h4 className="text-2xl font-serif text-[var(--color-navy)] mb-4 leading-tight">Direct <em className="italic text-slate-400">Broadcast</em></h4>
              <p className="text-[14px] text-slate-400 leading-relaxed font-medium">Send aggregated feedback to your cohort regarding common logbook standards and technical expectations.</p>
            </div>
            <button className="mt-10 text-[10px] font-bold text-[var(--color-navy)] uppercase tracking-[0.2em] py-4 border border-slate-300 rounded-xl hover:bg-slate-50 hover:border-[var(--color-navy)] transition-all shadow-sm">
               Broadcast Advisory
            </button>
         </div>
      </div>
    </div>
  );
};

export default LogbookGrading;
