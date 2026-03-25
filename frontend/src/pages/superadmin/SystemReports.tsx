import React from 'react';
import { 
  FileBox, 
  Download, 
  TrendingUp, 
  Users, 
  ChevronRight,
  Printer,
  Share2,
  Plus
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';

const SystemReports: React.FC = () => {
  const reports = [
    { title: 'Placement Analytics Q1', id: 'REP-2024-001', type: 'Analytical', date: 'Feb 12, 2024', size: '4.2MB', format: 'PDF' },
    { title: 'Institutional Compliance Audit', id: 'REP-2024-002', type: 'Governance', date: 'Feb 10, 2024', size: '1.8MB', format: 'PDF' },
    { title: 'Corporate Residency Performance', id: 'REP-2024-003', type: 'Strategic', date: 'Feb 05, 2024', size: '2.5MB', format: 'XLSX' },
    { title: 'Student Learning Outcome Aggregate', id: 'REP-2024-004', type: 'Academic', date: 'Jan 28, 2024', size: '3.1MB', format: 'PDF' },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Intelligence Repository"
        title="System"
        italicTitle="Reports"
        subtitle="Centralized intelligence hub for platform performance and academic oversight"
        eyebrowColor="text-[var(--color-navy)]"
        primaryAction={
          <button className="h-11 px-8 bg-[var(--color-navy)] text-white text-[10px] font-bold uppercase tracking-[0.15em] rounded-xl flex items-center gap-3 hover:bg-black transition-all shadow-lg shadow-black/10">
            <Plus size={18} /> New Report
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Downloads', value: '1,420', icon: <Download className="text-indigo-600" />, color: 'bg-indigo-50' },
          { label: 'Active Subscribers', value: '84', icon: <Users className="text-emerald-600" />, color: 'bg-emerald-50' },
          { label: 'Platform Velocity', value: '+14.2%', icon: <TrendingUp className="text-amber-600" />, color: 'bg-amber-50' },
        ].map((kpi, i) => (
          <div key={i} className="card p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all">
            <div className={`w-14 h-14 ${kpi.color} rounded-2xl flex items-center justify-center mb-6 shadow-inner`}>
              {React.cloneElement(kpi.icon as React.ReactElement<any>, { size: 24 })}
            </div>
            <div className="label-mono text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2">{kpi.label}</div>
            <div className="text-3xl font-serif font-bold text-[var(--color-navy)] tracking-tight">{kpi.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
           <div className="flex items-center justify-between mb-4 px-2">
             <h3 className="label-mono text-[11px] font-black uppercase tracking-[0.2em] text-[var(--color-navy)]">Recent Intelligence Cycle</h3>
             <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[var(--color-navy)] transition-colors">Archive</button>
           </div>
           
           <div className="space-y-4">
             {reports.map((report) => (
               <div key={report.id} className="card group bg-white border border-slate-200 rounded-2xl p-8 hover:border-[var(--color-gold)] transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-sm hover:shadow-md">
                 <div className="flex items-center gap-6">
                   <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-[var(--color-navy)] group-hover:text-white transition-all shadow-inner">
                     <FileBox size={28} />
                   </div>
                   <div>
                     <div className="flex items-center gap-4 mb-1">
                       <h4 className="text-lg font-bold text-[var(--color-navy)] tracking-tight">{report.title}</h4>
                       <span className="text-[9px] px-2.5 py-1 bg-slate-50 border border-slate-100 rounded font-black uppercase tracking-widest text-slate-400">{report.type}</span>
                     </div>
                     <p className="text-[12px] text-slate-400 font-mono font-bold uppercase tracking-tight opacity-60">ID: {report.id} <span className="mx-2">•</span> {report.date}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 self-end md:self-center">
                   <div className="text-right mr-4 hidden md:block">
                     <div className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-1">Architecture</div>
                     <div className="text-xs font-mono font-bold text-[var(--color-navy)] opacity-70">{report.format} · {report.size}</div>
                   </div>
                   <button className="h-12 px-6 bg-[var(--color-navy)] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-black/10">
                     <Download size={18} /> Download
                   </button>
                   <button className="h-12 w-12 flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:text-[var(--color-navy)] rounded-xl transition-all shadow-sm">
                     <Share2 size={20} />
                   </button>
                 </div>
               </div>
             ))}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="card p-10 bg-[var(--color-navy)] text-white border-none rounded-3xl shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="font-serif text-2xl mb-8 leading-tight">Insight <em className="italic text-[var(--color-gold)] opacity-70">Generator</em></h3>
                <p className="text-white/40 text-[13px] leading-relaxed mb-10 italic">"Synthesize platform activity data into granular academic performance reports."</p>
                
                <div className="space-y-6 mb-12">
                   {['Placement Efficiency', 'Skill Gap Delta', 'Institution Compliance', 'Corporate ROI Index'].map((item, i) => (
                     <div key={i} className="flex items-center gap-4 group/item cursor-pointer">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] opacity-40 group-hover/item:opacity-100 transition-all"></div>
                        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-white/60 group-hover/item:text-white transition-colors">{item}</span>
                        <ChevronRight size={14} className="ml-auto text-white/20 group-hover/item:text-[var(--color-gold)] group-hover/item:translate-x-1 transition-all" />
                     </div>
                   ))}
                </div>
                
                <button className="w-full py-4 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:bg-[#d4a017] shadow-xl shadow-[var(--color-gold)]/20">Initialize Sync</button>
              </div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
           </div>

           <div className="card p-10 bg-[var(--color-cream-2)] border-dashed border-2 border-slate-200 rounded-3xl group">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6">Automation Core</h4>
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                 <div className="text-[12px] font-bold text-[var(--color-navy)] uppercase tracking-tight">Crawler Activity: High</div>
              </div>
              <p className="text-[12px] text-slate-400 font-medium leading-relaxed italic opacity-80 mb-8">
                Automated monthly platform health reports were compiled and delivered to the Executive Cluster at 04:00 UTC.
              </p>
              <div className="flex gap-4">
                 <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[var(--color-navy)] transition-all shadow-sm"><Printer size={18} /></button>
                 <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[var(--color-navy)] transition-all shadow-sm"><Share2 size={18} /></button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SystemReports;
