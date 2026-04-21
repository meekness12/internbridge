import React from 'react';
import { 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Filter,
  ExternalLink
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';

const ComplianceAudits: React.FC = () => {
  const audits = [
    { id: 'AUD-991', student: 'Aisha Ibrahim', department: 'CS', type: 'Performance Verification', status: 'VERIFIED', date: '2h ago', risk: 'LOW' },
    { id: 'AUD-992', student: 'Kwame Osei', department: 'ME', type: 'MoU Compliance', status: 'PENDING', date: '4h ago', risk: 'MEDIUM' },
    { id: 'AUD-993', student: 'Sarah Konadu', department: 'BC', type: 'End of Term Assessment', status: 'FLAGGED', date: 'Yesterday', risk: 'HIGH' },
    { id: 'AUD-994', student: 'Yaw Mensah', department: 'CS', type: 'Mid-term Review', status: 'VERIFIED', date: 'Yesterday', risk: 'LOW' },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Regulatory Oversight"
        title="Compliance"
        italicTitle="Audit Queue"
        subtitle="Verification matrix for internship performance, evaluation forms, and MoUs"
        eyebrowColor="text-rose-600"
        primaryAction={
          <button className="h-11 px-8 bg-[var(--color-navy)] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl flex items-center gap-3 hover:bg-black transition-all shadow-lg shadow-black/10">
            Run Batch Verification
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
           <div className="card p-10 bg-[var(--surface)] border border-[var(--border)] rounded-3xl shadow-sm">
              <div className="label-mono text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-8">Oversight Score</div>
              <div className="flex items-center gap-6 mb-10">
                 <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-inner relative">
                    <ShieldCheck size={40} />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--surface)] rounded-full border border-[var(--border)] flex items-center justify-center shadow-sm">
                       <CheckCircle2 size={12} className="text-emerald-500" />
                    </div>
                 </div>
                 <div>
                    <div className="text-4xl font-serif font-black text-[var(--color-navy)]">94.2%</div>
                    <div className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-tighter mt-1">+1.4% Improvement</div>
                 </div>
              </div>
              <div className="space-y-6">
                 {[
                   { label: 'Reporting Accuracy', val: 98 },
                   { label: 'Evaluation Timeliness', val: 86 },
                   { label: 'Agreement Coverage', val: 100 }
                 ].map((m, i) => (
                   <div key={i}>
                      <div className="flex justify-between items-center mb-2">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.label}</span>
                         <span className="text-[10px] font-mono font-bold text-[var(--color-navy)]">{m.val}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[var(--background)] border border-[var(--border)] rounded-full overflow-hidden">
                         <div className="h-full bg-[var(--color-navy)] rounded-full transition-all duration-1000 shadow-sm" style={{ width: `${m.val}%` }}></div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="card p-8 bg-[var(--color-navy)] text-white border-0 rounded-3xl shadow-2xl relative overflow-hidden group">
              <h4 className="font-serif text-2xl mb-6 relative z-10">Historical <br /><em className="italic text-[var(--color-gold)] opacity-70">Archive</em></h4>
              <p className="text-white/40 text-[12px] leading-relaxed mb-8 relative z-10 italic">"Review past academic cycles and accreditation audits from the Institutional Knowledge Pool."</p>
              <button className="w-full py-4 bg-[var(--surface)]/10 hover:bg-[var(--surface)]/20 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all relative z-10 flex items-center justify-center gap-3">
                 <FileText size={18} className="text-[var(--color-gold)]" /> Access Archives
              </button>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--color-gold)] opacity-5 rounded-full blur-3xl pointer-events-none group-hover:opacity-10 transition-opacity"></div>
           </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
           <div className="flex items-center justify-between mb-4">
              <div className="flex bg-[var(--surface)] p-1 rounded-xl border border-[var(--border)] shadow-sm">
                 {['Pending', 'Verified', 'Flagged'].map((s, i) => (
                    <button key={i} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-[var(--color-navy)] text-white' : 'text-slate-400 hover:text-[var(--color-muted)]'}`}>
                       {s}
                    </button>
                 ))}
              </div>
              <button className="h-10 w-10 bg-[var(--surface)] border border-[var(--border)] rounded-xl flex items-center justify-center text-slate-400 hover:text-[var(--color-navy)] transition-colors shadow-sm">
                 <Filter size={20} />
              </button>
           </div>

           <div className="space-y-4">
              {audits.map((a) => (
                <div key={a.id} className="card group bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--color-gold)] transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-sm hover:shadow-xl relative overflow-hidden">
                   <div className="flex items-start gap-6">
                      <div className={`mt-1 h-3 w-3 rounded-full shrink-0 ${
                        a.risk === 'HIGH' ? 'bg-rose-500 animate-pulse' : a.risk === 'MEDIUM' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}></div>
                      <div>
                        <div className="flex items-center gap-3 mb-1.5">
                           <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-tighter">{a.id}</span>
                           <h4 className="text-lg font-bold text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors">{a.type}</h4>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                           Student: <span className="text-[var(--color-navy)]">{a.student}</span> 
                           <span className="mx-2 opacity-30">•</span> 
                           Dept: <span className="text-[var(--color-navy)] font-mono">{a.department}</span>
                        </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-6 self-end md:self-center">
                      <div className="text-right">
                         <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Status</div>
                         <div className={`text-[10px] font-bold uppercase tracking-tighter px-2.5 py-1 rounded border shadow-inner ${
                           a.status === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                           a.status === 'FLAGGED' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                           'bg-amber-50 text-amber-600 border-amber-100'
                         }`}>{a.status}</div>
                      </div>
                      <div className="h-12 w-[1px] bg-[var(--background)] hidden md:block"></div>
                      <div className="text-right hidden md:block">
                         <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Updated</div>
                         <div className="text-[11px] font-mono font-bold text-slate-400 uppercase leading-none">{a.date}</div>
                      </div>
                      <button className="h-12 w-12 bg-[var(--background)] border border-[var(--border)] rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-[var(--color-navy)] group-hover:text-white transition-all shadow-sm">
                         <ExternalLink size={20} />
                      </button>
                   </div>
                   {/* Background Decorative ID */}
                   <div className="absolute right-[-10%] bottom-[-20%] text-9xl font-black text-slate-50 pointer-events-none group-hover:text-slate-100 transition-colors uppercase select-none opacity-20">{a.department}</div>
                </div>
              ))}
           </div>
           
           <div className="flex justify-center py-6">
              <button className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 hover:text-[var(--color-navy)] transition-all">Archive Operational Log v2.4</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceAudits;
