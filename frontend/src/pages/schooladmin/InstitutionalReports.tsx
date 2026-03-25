import React from 'react';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  Users, 
  Award, 
  Filter, 
  PieChart,
  Share2
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';

const InstitutionalReports: React.FC = () => {
  const reports = [
    { title: 'Faculty Performance Matrix', id: 'FAC-2024-Q1', date: 'Feb 2024', status: 'Finalized', format: 'PDF', size: '2.4MB' },
    { title: 'Student Residency ROI', id: 'ROI-2024-SEM2', date: 'Jan 2024', status: 'Review', format: 'XLSX', size: '1.8MB' },
    { title: 'Institutional Compliance Digest', id: 'CMP-2024-ANL', date: 'Dec 2023', status: 'Archived', format: 'PDF', size: '4.2MB' },
    { title: 'Department Placement Velocity', id: 'VEL-2024-Q1', date: 'Feb 2024', status: 'Live', format: 'DASH', size: 'N/A' },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Academic Intelligence"
        title="Institutional"
        italicTitle="Reports"
        subtitle="Analytical synthesis of faculty performance, student outcomes, and institutional placement velocity"
        eyebrowColor="text-indigo-700"
        primaryAction={
          <button className="h-11 px-8 bg-[var(--color-navy)] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl flex items-center gap-3 hover:bg-black transition-all shadow-lg shadow-black/10">
            Generate Sync Report
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Active Cohort', val: '2,480', icon: <Users className="text-indigo-600" />, bg: 'bg-indigo-50' },
           { label: 'Graduation Link', val: '94%', icon: <Award className="text-emerald-600" />, bg: 'bg-emerald-50' },
           { label: 'Growth Index', val: '+12.4%', icon: <TrendingUp className="text-amber-600" />, bg: 'bg-amber-50' },
           { label: 'Data Quality', val: '98.8%', icon: <PieChart className="text-rose-600" />, bg: 'bg-rose-50' },
         ].map((m, i) => (
           <div key={i} className="card p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <div className={`w-14 h-14 ${m.bg} rounded-2xl flex items-center justify-center mb-6 shadow-inner`}>
                {React.cloneElement(m.icon as React.ReactElement<any>, { size: 24 })}
              </div>
              <div className="label-mono text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2">{m.label}</div>
              <div className="text-3xl font-serif font-bold text-[var(--color-navy)]">{m.val}</div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between mb-4 px-2">
               <h3 className="label-mono text-[11px] font-black uppercase tracking-[0.25em] text-[var(--color-navy)]">Operational Intelligence Library</h3>
               <button className="h-10 w-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-[var(--color-navy)] transition-colors shadow-sm">
                  <Filter size={18} />
               </button>
            </div>
            
            <div className="space-y-4">
               {reports.map((r) => (
                 <div key={r.id} className="card group bg-white border border-slate-200 rounded-2xl p-8 hover:border-[var(--color-gold)] transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-sm hover:shadow-md relative overflow-hidden">
                    <div className="flex items-center gap-6">
                       <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-[var(--color-navy)] group-hover:text-white transition-all shadow-inner">
                          <FileText size={28} />
                       </div>
                       <div>
                          <div className="flex items-center gap-4 mb-1">
                             <h4 className="text-lg font-bold text-[var(--color-navy)] tracking-tight">{r.title}</h4>
                             <span className={`text-[8px] px-2 py-0.5 rounded border font-black uppercase tracking-widest ${
                               r.status === 'Finalized' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                               r.status === 'Review' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                             }`}>{r.status}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono font-bold uppercase tracking-widest opacity-60 italic">{r.id} <span className="mx-2 font-sans opacity-20">•</span> {r.date}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 self-end md:self-center">
                       <div className="text-right mr-4 hidden xl:block">
                          <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Manifest</div>
                          <div className="text-[11px] font-mono font-bold text-slate-400">{r.format} · {r.size}</div>
                       </div>
                       <button className="h-12 px-6 bg-[var(--color-navy)] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-black/10">
                          <Download size={18} /> Download
                       </button>
                       <button className="h-12 w-12 flex items-center justify-center bg-white border border-slate-200 text-slate-300 hover:text-[var(--color-navy)] rounded-xl transition-all shadow-sm">
                          <Share2 size={20} />
                       </button>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="lg:col-span-4 space-y-6">
            <div className="card p-10 bg-[var(--color-navy)] text-white border-none rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-between h-full group">
               <div className="relative z-10">
                  <div className="flex justify-between items-start mb-10">
                     <h3 className="font-serif text-3xl tracking-tight leading-tight">Insight <br /><em className="italic text-[var(--color-gold)] opacity-70">Synthesizer</em></h3>
                     <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-[var(--color-gold)] group-hover:scale-110 transition-transform"><PieChart size={24} /></div>
                  </div>
                  
                  <div className="space-y-4 mb-10">
                     {[
                       { label: 'Academic Performance', val: 84 },
                       { label: 'Placement ROI', val: 92 },
                       { label: 'Industry Satisfaction', val: 78 }
                     ].map((s, i) => (
                       <div key={i}>
                          <div className="flex justify-between items-center mb-1.5 px-1">
                             <span className="text-[10px] font-mono font-bold uppercase text-white/40 group-hover:text-white transition-colors">{s.label}</span>
                             <span className="text-[10px] font-mono font-black text-[var(--color-gold)]">{s.val}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                             <div className="h-full bg-[var(--color-gold)] transition-all duration-1000" style={{ width: `${s.val}%` }}></div>
                          </div>
                       </div>
                     ))}
                  </div>
                  
                  <button className="w-full py-4 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:bg-[#d4a017] shadow-xl shadow-[var(--color-gold)]/20">Initialize Analytical Sync</button>
               </div>
               
               <div className="pt-10 mt-10 border-t border-white/5 flex items-center justify-between relative z-10">
                  <span className="text-[9px] font-mono font-black uppercase tracking-[0.4em] text-white/20">Operational Cycle v4.2</span>
                  <div className="flex gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20"></div>
                  </div>
               </div>

               {/* Design Grain */}
               <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>
               <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-1000"></div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default InstitutionalReports;
