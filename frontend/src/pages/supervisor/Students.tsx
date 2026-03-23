import React from 'react';
import { 
  ArrowUpRight, 
  GraduationCap,
  Mail,
  MoreVertical,
  Calendar,
  Search
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';

const Students: React.FC = () => {
  const students = [
    { id: '1', name: 'John Doe', company: 'Techwave Technologies', status: 'ACTIVE', progress: 85, avatar: 'JD', email: 'john@central.edu' },
    { id: '2', name: 'Sarah Linn', company: 'CloudSphere', status: 'ON_LEAVE', progress: 12, avatar: 'SL', email: 'sarah@central.edu' },
    { id: '3', name: 'Kevin Hart', company: 'DataStream Solutions', status: 'ACTIVE', progress: 100, avatar: 'KH', email: 'kevin@central.edu' },
    { id: '4', name: 'Aisha Ibrahim', company: 'Techwave Technologies', status: 'NEW', progress: 0, avatar: 'AI', email: 'aisha@central.edu' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Cohort Oversight"
        title="Assigned"
        italicTitle="Students"
        subtitle="Trinity Term 2024 · 18 Active Students · Central University College"
        eyebrowColor="text-[var(--color-gold)]"
        primaryAction={
           <div className="flex gap-3">
             <div className="bg-white border border-slate-200 rounded-lg px-4 flex items-center gap-3 h-11 shadow-sm">
                <Calendar size={16} className="text-[var(--color-gold)]" />
                <span className="text-[10px] font-bold text-[var(--color-navy)] uppercase tracking-widest">Sem 1, 2024</span>
             </div>
             <button className="btn btn-primary btn-sm bg-[var(--color-navy)] text-white px-6 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-md">
               Allocation List
             </button>
           </div>
        }
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
           <h2 className="label-mono text-[10px] tracking-[0.2em] font-bold text-[var(--color-navy)] opacity-60 uppercase">Enrolled Cohort</h2>
           <div className="h-[1px] w-12 bg-slate-100"></div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search student roster..." 
            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)] shadow-sm w-64"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {students.map((student) => (
          <div key={student.id} className="card p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-cream-2)] flex items-center justify-center font-bold text-[var(--color-navy)] text-lg border border-white shadow-inner">
                   {student.avatar}
                </div>
                <div>
                   <h3 className="font-bold text-lg text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors">{student.name}</h3>
                   <div className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest mt-1 opacity-70">{student.company}</div>
                </div>
              </div>
              <button className="p-2 text-slate-300 hover:text-[var(--color-navy)] hover:bg-slate-50 rounded-lg transition-all"><MoreVertical size={20} /></button>
            </div>

            <div className="space-y-6">
               <div>
                  <div className="flex justify-between text-[10px] font-mono font-bold uppercase tracking-widest mb-2.5 text-slate-400">
                    <span>Curriculum Progress</span>
                    <span className="text-[var(--color-navy)]">{student.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                    <div className="h-full bg-[var(--color-forest)] rounded-full transition-all duration-700" style={{ width: `${student.progress}%` }}></div>
                  </div>
               </div>

               <div className="pt-5 flex items-center justify-between border-t border-slate-50">
                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded border ${
                    student.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                    student.status === 'ON_LEAVE' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                    'bg-slate-50 text-slate-400 border-slate-100'
                  }`}>
                    {student.status.replace('_', ' ')}
                  </span>
                  <div className="flex gap-2">
                     <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all border border-transparent hover:border-indigo-100" title="Send Email"><Mail size={16} /></button>
                     <button className="p-2.5 text-slate-400 hover:text-[var(--color-navy)] hover:bg-slate-100 rounded-lg transition-all" title="View Profile"><ArrowUpRight size={16} /></button>
                  </div>
               </div>
            </div>
            {/* Premium Indicator */}
            <div className="absolute left-0 bottom-0 w-1 h-0 bg-[var(--color-gold)] group-hover:h-full transition-all duration-500 opacity-40"></div>
          </div>
        ))}
      </div>
      
      <div className="card p-10 flex flex-col md:flex-row items-center justify-between bg-[var(--color-navy)] text-white relative overflow-hidden group shadow-2xl rounded-2xl">
         <div className="relative z-10">
            <GraduationCap size={40} className="text-[var(--color-gold)] mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-3xl font-serif mb-3 leading-tight">Final Year <em className="italic text-slate-400">Submissions</em></h3>
            <p className="text-white/40 text-sm max-w-sm leading-relaxed mb-6 md:mb-0">Access and review terminal placement reports and technical theses submitted by your cohort members.</p>
         </div>
         <button className="relative z-10 bg-[var(--color-gold)] text-[var(--color-navy)] font-bold py-4 px-10 rounded-xl text-[10px] uppercase tracking-[0.2em] hover:translate-y-[-2px] transition-all shadow-xl shadow-black/20 group-hover:bg-[#d4a017]">
            Review Reports
         </button>
         <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/10 transition-colors"></div>
      </div>
    </div>
  );
};

export default Students;
