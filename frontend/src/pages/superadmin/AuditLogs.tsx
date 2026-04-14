import React, { useState, useEffect, useCallback } from 'react';
import { 
  Shield, 
  Search, 
  Filter, 
  Download,
  AlertCircle,
  Database,
  Terminal,
  Clock,
  RefreshCw,
  MoreHorizontal
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import systemService from '../../api/systemService';
import type { AuditLogDTO } from '../../api/systemService';
import { useToast } from '../../context/ToastContext';

/**
 * AuditLogs Component
 * High-fidelity Activity Logs for system oversight.
 */
const AuditLogs: React.FC = () => {
  const { toast } = useToast();
  const [logs, setLogs] = useState<AuditLogDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLogs = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await systemService.getAuditLogs(50);
      setLogs(data);
    } catch {
      toast('Failed to synchronize activity logs.', 'error', 'Error');
      // Mock data for dev
      setLogs([
        { id: '1', userId: 'admin-1', action: 'User Created', details: 'User alexander.s was created as a Company Admin', userName: 'Admin', timestamp: new Date(Date.now() - 120000).toISOString(), status: 'SUCCESS' },
        { id: '2', userId: 'system', action: 'Security Warning', details: 'Unrecognized login attempt from IP 192.168.1.104', userName: 'Security System', timestamp: new Date(Date.now() - 600000).toISOString(), status: 'WARNING' },
        { id: '3', userId: 'system', action: 'System Update', details: 'System capacity expanded to handle peak load', userName: 'Automation', timestamp: new Date(Date.now() - 1800000).toISOString(), status: 'SUCCESS' },
        { id: '4', userId: 'admin-1', action: 'Account Deleted', details: 'Deleted user root@example.com', userName: 'Admin', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'SUCCESS' },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const filteredLogs = logs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto animate-fade-in pb-20 px-4">
      <PremiumHeader 
        eyebrow="Global Security Registry"
        title="Operational"
        italicTitle="Ledger"
        subtitle="Forensic stream of platform interactions, security handshakes, and policy governance."
        eyebrowColor="text-[var(--color-brand)]"
        primaryAction={
          <button 
            onClick={() => fetchLogs()}
            className="h-14 px-8 bg-slate-900 text-white rounded-2xl flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all"
          >
            Refresh Logs <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="md:col-span-3 flex flex-col md:flex-row gap-6 items-center bg-white/50 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/20">
          <div className="relative group flex-1 w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[var(--color-brand)] transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Query logs by action, agent, or metadata details..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl pl-16 pr-6 text-sm font-medium outline-none focus:ring-1 focus:ring-[var(--color-brand)] focus:bg-white transition-all shadow-inner"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
             <button className="flex-1 md:flex-none h-14 px-8 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
               <Filter size={18} /> Severity
             </button>
             <button className="flex-1 md:flex-none h-14 px-8 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
               View All Logs <Terminal size={18} />
             </button>
          </div>
        </div>
        <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white flex flex-col justify-center shadow-2xl relative overflow-hidden group">
           <div className="relative z-10 flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Registry Health</span>
              <div className="text-3xl font-serif font-black italic text-[var(--color-brand)]">Optimal</div>
              <div className="mt-4 flex gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-glow"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/10"></div>
              </div>
           </div>
           <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[var(--color-brand)]/10 blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
        </div>
      </div>

      <div className="space-y-4 relative min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-md z-30 flex flex-col items-center justify-center gap-6 rounded-[3.5rem] border border-white">
             <RefreshCw size={40} className="animate-spin text-[var(--color-brand)]" />
             <span className="text-[10px] font-black tracking-[0.45em] uppercase text-slate-400">Loading Activity Logs...</span>
          </div>
        )}

        <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/20 overflow-hidden">
          <div className="bg-slate-50/50 px-10 py-6 border-b border-slate-100 flex items-center justify-between">
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                   <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Operational</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                   <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Suspicious</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                   <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Violation</span>
                </div>
             </div>
             <button className="text-[10px] font-black uppercase tracking-widest text-[var(--color-brand)] flex items-center gap-2 hover:underline">
                <Download size={14} /> Full Export (.csv)
             </button>
          </div>

          <div className="divide-y divide-slate-50">
            {filteredLogs.map((log, idx) => (
              <div key={log.id} className="p-10 hover:bg-slate-50/50 transition-all group animate-fade-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                <div className="flex flex-col md:flex-row items-start justify-between gap-8">
                  <div className="flex gap-10 min-w-0 flex-1">
                    <div className="flex flex-col items-center">
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
                         log.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-600' :
                         log.status === 'WARNING' ? 'bg-amber-50 text-amber-600' :
                         'bg-rose-50 text-rose-600'
                       }`}>
                          {log.status === 'SUCCESS' ? <Shield size={22} /> : 
                           log.status === 'WARNING' ? <AlertCircle size={22} /> : <AlertCircle size={22} />}
                       </div>
                       <div className="w-px flex-1 bg-slate-100 my-4 group-last:hidden"></div>
                    </div>
                    
                    <div className="min-w-0">
                      <div className="flex items-center gap-4 mb-2">
                         <h4 className="text-xl font-bold text-slate-900 group-hover:text-[var(--color-brand)] transition-colors">{log.action}</h4>
                         <span className="h-5 px-3 bg-slate-100 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-center">ID-{log.id}</span>
                      </div>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-2xl">{log.details}</p>
                      
                      <div className="flex items-center gap-8 mt-6">
                         <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black text-slate-200 uppercase tracking-widest">Agent Origin</span>
                            <div className="px-4 py-1.5 bg-slate-900 text-[var(--color-brand)] rounded-xl text-[10px] font-mono font-black uppercase tracking-tighter shadow-xl">
                               {log.userName}
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                            <Clock size={14} className="text-slate-200" />
                            <span className="text-[10px] font-mono font-black text-slate-300 uppercase tracking-tighter">
                               {new Date(log.timestamp).toLocaleDateString()} · {new Date(log.timestamp).toLocaleTimeString()}
                            </span>
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                     <button className="w-12 h-12 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300 hover:text-slate-900 hover:bg-white hover:shadow-xl transition-all">
                        <Database size={18} />
                     </button>
                     <button className="w-12 h-12 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300 hover:text-slate-900 hover:bg-white hover:shadow-xl transition-all">
                        <MoreHorizontal size={18} />
                     </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredLogs.length === 0 && !isLoading && (
            <div className="py-32 flex flex-col items-center justify-center opacity-30">
               <Database size={80} className="text-slate-200 mb-6" />
               <h3 className="text-2xl font-black uppercase tracking-[0.4em] text-slate-300">No Logs Found</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
