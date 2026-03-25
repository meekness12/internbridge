import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronRight,
  ShieldCheck,
  Server,
  Terminal,
  Download
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';

const AuditLogs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const logs = [
    { id: 'AUTH-12903', user: 'Admin_Sarah', action: 'Identity Validation', target: 'New Company: CloudSphere', time: '12:04:15 UTC', status: 'SUCCESS', severity: 'INFO' },
    { id: 'SEC-99201', user: 'System_Kernel', action: 'Failed Login Attempt', target: 'IP: 192.168.1.45', time: '11:58:22 UTC', status: 'REJECTED', severity: 'HIGH' },
    { id: 'DATA-00291', user: 'Auto_Agent', action: 'DB Snapshot Generated', target: 'Amazon S3: Archive-Beta', time: '11:30:00 UTC', status: 'VERIFIED', severity: 'LOW' },
    { id: 'SYS-1120', user: 'Eng_Kwame', action: 'Protocol Update', target: 'Internship Agreement v2.1', time: '10:15:44 UTC', status: 'DEPLOYED', severity: 'INFO' },
    { id: 'AUTH-12899', user: 'Daniel_O', action: 'Password Reset', target: 'User ID: 0921-X', time: '09:44:12 UTC', status: 'SUCCESS', severity: 'LOW' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Compliance & Accountability"
        title="Institutional"
        italicTitle="Audit"
        subtitle="Cryptographically verified operational logs for platform-wide governance"
        eyebrowColor="text-rose-600"
        primaryAction={
          <button className="h-11 px-6 bg-[var(--color-navy)] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl flex items-center gap-3 hover:bg-black transition-all shadow-lg shadow-black/10">
            <Download size={18} /> Export Historical Data
          </button>
        }
      />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-80 space-y-6 shrink-0">
          <div className="card p-8 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="label-mono text-[9px] font-black uppercase tracking-widest text-slate-300 mb-6">Integrity Status</div>
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-sm">
                  <ShieldCheck size={24} />
               </div>
               <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Chain Status</div>
                  <div className="text-sm font-bold text-emerald-700">Fully Validated</div>
               </div>
            </div>
            <div className="space-y-4">
               <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Verification Depth</span>
                    <span className="text-[9px] font-mono font-bold text-[var(--color-navy)]">100%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                    <div className="h-full bg-emerald-500 w-full rounded-full"></div>
                  </div>
               </div>
            </div>
          </div>

          <div className="card p-8 bg-slate-900 border-none rounded-2xl shadow-xl">
             <div className="label-mono text-[9px] font-black uppercase tracking-widest text-white/20 mb-6">Active Infrastructure</div>
             <div className="space-y-6">
                <div className="flex items-center gap-4">
                   <Server size={18} className="text-emerald-500" />
                   <div>
                      <div className="text-[10px] font-bold text-white uppercase tracking-widest">PostgreSQL Cluster</div>
                      <div className="text-[9px] font-mono text-white/40 uppercase">Operational · Node 01</div>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <Terminal size={18} className="text-[var(--color-gold)]" />
                   <div>
                      <div className="text-[10px] font-bold text-white uppercase tracking-widest">API Engine</div>
                      <div className="text-[9px] font-mono text-white/40 uppercase">v2.1.4-beta Stable</div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
           <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="relative group w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-gold)] transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Filter logs by Protocol ID, Agent, or Action..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-5 text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)] transition-all"
                />
              </div>
              <button className="h-11 px-5 flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
                <Filter size={16} /> Filters
              </button>
           </div>

           <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-50">
                {logs.map((log) => (
                  <div key={log.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <div className="flex items-start gap-5">
                       <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                         log.severity === 'HIGH' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]' :
                         log.severity === 'MEDIUM' ? 'bg-amber-500' : 'bg-emerald-500'
                       }`}></div>
                       <div>
                          <div className="flex items-center gap-3 mb-1.5">
                             <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-tighter">{log.id}</span>
                             <span className="text-sm font-bold text-[var(--color-navy)] group-hover:text-[var(--color-gold)] transition-colors">{log.action}</span>
                             <span className={`text-[8px] font-black px-1.5 py-0.5 rounded border uppercase tracking-tighter ${
                               log.status === 'REJECTED' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                               log.status === 'SUCCESS' || log.status === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                               'bg-indigo-50 text-indigo-600 border-indigo-100'
                             }`}>{log.status}</span>
                          </div>
                          <div className="text-[12px] text-slate-400 font-medium leading-none">
                             Initiated by <span className="text-[var(--color-navy)] font-bold">{log.user}</span> <span className="mx-2 opacity-30">•</span> Target: <span className="italic">{log.target}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-6 self-end md:self-center">
                       <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{log.time}</span>
                       <ChevronRight className="text-slate-200 group-hover:text-[var(--color-navy)] transition-all group-hover:translate-x-1" size={18} />
                    </div>
                  </div>
                ))}
              </div>
           </div>
           <div className="flex justify-center py-4">
              <button className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 hover:text-[var(--color-navy)] transition-all">Load Earlier Operational Cycles</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
