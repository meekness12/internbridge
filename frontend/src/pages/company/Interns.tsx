import React from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  Briefcase,
  Star,
  MessageSquare,
  TrendingUp,
  MoreHorizontal
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';

const Interns: React.FC = () => {
  const interns = [
    { id: '1', name: 'John Doe', dept: 'Engineering', start: 'Feb 1', progress: 85, mentor: 'Daniel Owusu', avatar: 'JD' },
    { id: '2', name: 'Zoe Mensah', dept: 'Product Design', start: 'Feb 15', progress: 42, mentor: 'Sarah Linn', avatar: 'ZM' },
    { id: '3', name: 'Marcus Wright', dept: 'Engineering', start: 'Jan 20', progress: 100, mentor: 'Daniel Owusu', avatar: 'MW' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Workforce Management"
        title="Active"
        italicTitle="Internship"
        subtitle="3 verified interns currently placed within Techwave Technologies"
        eyebrowColor="text-[var(--color-gold)]"
        primaryAction={
           <div className="bg-white border border-slate-200 rounded-lg px-4 flex items-center gap-3 h-11 shadow-sm">
             <Briefcase size={18} className="text-[var(--color-gold)]" />
             <span className="text-[10px] font-bold text-[var(--color-navy)] uppercase tracking-widest">Techwave Internal</span>
           </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <h2 className="label-mono text-[10px] tracking-[0.2em] opacity-60 text-[var(--color-navy)] uppercase font-bold">Current Intern Cohort</h2>
               <div className="h-[1px] w-12 bg-slate-100"></div>
            </div>
            <div className="flex gap-1">
              <button className="p-2 text-slate-400 hover:text-[var(--color-navy)] hover:bg-slate-50 rounded-lg transition-all"><Search size={16} /></button>
              <button className="p-2 text-slate-400 hover:text-[var(--color-navy)] hover:bg-slate-50 rounded-lg transition-all"><Filter size={16} /></button>
            </div>
          </div>

          <div className="card p-0 overflow-hidden border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[var(--color-cream)] border-b border-slate-100">
                  <th className="px-8 py-4 label-mono text-[9px] uppercase tracking-widest opacity-50 font-bold">Intern Profile</th>
                  <th className="px-8 py-4 label-mono text-[9px] uppercase tracking-widest opacity-50 font-bold">Department</th>
                  <th className="px-8 py-4 label-mono text-[9px] uppercase tracking-widest opacity-50 font-bold">Engagement</th>
                  <th className="px-8 py-4 label-mono text-[9px] uppercase tracking-widest opacity-50 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {interns.map((intern) => (
                  <tr key={intern.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-white flex items-center justify-center font-bold text-[var(--color-navy)] text-xs shadow-sm">
                          {intern.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-[var(--color-navy)]">{intern.name}</div>
                          <div className="text-[10px] opacity-40 uppercase font-black tracking-tighter">Mentor: {intern.mentor}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded border ${
                         intern.dept === 'Engineering' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                       }`}>{intern.dept}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="w-32">
                        <div className="flex justify-between text-[9px] font-mono opacity-50 mb-1.5 font-bold">
                          <span>Capacity</span>
                          <span>{intern.progress}%</span>
                        </div>
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--color-forest)] rounded-full transition-all duration-1000" style={{ width: `${intern.progress}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Message"><MessageSquare size={18} /></button>
                         <button className="p-2 text-slate-400 hover:text-[var(--color-navy)] hover:bg-slate-100 rounded-lg transition-all"><ArrowUpRight size={18} /></button>
                         <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all"><MoreHorizontal size={18} /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <section className="space-y-4">
            <h3 className="label-mono text-[10px] tracking-[0.2em] opacity-60 text-[var(--color-navy)] uppercase font-bold">Cohort Insights</h3>
            <div className="card p-8 bg-[var(--color-navy)] text-white relative overflow-hidden group shadow-xl">
               <div className="relative z-10">
                 <Star size={32} className="text-[var(--color-gold)] mb-6 group-hover:scale-110 transition-transform" />
                 <h4 className="text-2xl font-serif mb-2 leading-tight">Performance <br /> <em className="italic text-slate-400">Standard</em></h4>
                 <div className="mt-8 flex items-baseline gap-3">
                   <div className="text-6xl font-serif font-bold text-white tracking-tighter">4.8</div>
                   <div className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-[0.2em] flex items-center gap-1.5 pb-2">
                     <TrendingUp size={14} /> Excellence
                   </div>
                 </div>
                 <p className="text-xs text-white/40 mt-8 leading-relaxed font-medium">
                   Current cohort is performing 12% above last year's average ROI in technical contribution.
                 </p>
                 <button className="w-full mt-10 py-3 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-lg text-[10px] font-bold uppercase tracking-widest hover:translate-y-[-2px] transition-all shadow-lg shadow-black/20">Analyze Efficiency</button>
               </div>
               <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[var(--color-gold)]/10 to-transparent"></div>
               <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="label-mono text-[10px] tracking-[0.2em] opacity-60 text-[var(--color-navy)] uppercase font-bold">Mentorship Flow</h3>
              <span className="text-[10px] font-bold text-[var(--color-gold)] cursor-pointer hover:underline tracking-widest uppercase">Full Audit</span>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Daniel Owusu', action: 'Approved John\'s Week 12 Log', time: '45m ago', color: 'bg-emerald-50 text-emerald-600' },
                { name: 'Sarah Linn', action: 'Portfolio Review scheduled', time: '2h ago', color: 'bg-indigo-50 text-indigo-600' },
                { name: 'Aisha Ibrahim', action: 'New accomplishment shared', time: '5h ago', color: 'bg-gold-light text-[var(--color-gold)]' }
              ].map((m, i) => (
                <div key={i} className="card p-5 flex justify-between items-center transition-all hover:bg-slate-50 border border-slate-100 shadow-sm group">
                  <div className="flex gap-3 items-center">
                    <div className={`w-1.5 h-1.5 rounded-full ${m.color.split(' ')[1]}`}></div>
                    <div className="text-[11px]">
                      <div className="font-bold text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors">{m.name}</div>
                      <div className="text-slate-400 font-medium">{m.action}</div>
                    </div>
                  </div>
                  <div className="text-[9px] font-mono opacity-30 font-bold uppercase tracking-tighter">{m.time}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Interns;
