import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Download,
  RefreshCw,
  LayoutDashboard,
  ShieldCheck,
  Server,
  Search, 
  Filter, 
  ShieldAlert, 
  Cpu, 
  ExternalLink, 
  Zap,
  Lock,
  Database,
  Terminal,
  ArrowUpRight,
  Shield,
  Globe,
  Archive,
  ChevronRight
} from 'lucide-react';
import systemService from '../../api/systemService';
import userService from '../../api/userService';
import type { UserDTO } from '../../api/userService';
import type { PlatformStats, AuditLogDTO, InfrastructureMetric } from '../../api/systemService';
import { useToast } from '../../context/ToastContext';

const SuperAdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogDTO[]>([]);
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [statsData, logsData, usersData] = await Promise.all([
          systemService.getPlatformStats().catch(() => null),
          systemService.getAuditLogs(10).catch(() => []),
          userService.getUsers().catch(() => []),
        ]);
        
        setStats(statsData);
        setAuditLogs(logsData);
        setUsers(usersData);
      } catch (error) {
        toast('System synchronization failed', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  const kpis = [
    { label: 'Platform Identities', value: stats?.totalUsers.toLocaleString() || '---', icon: <Users size={16} /> },
    { label: 'System Uptime', value: '99.99%', icon: <Zap size={16} /> },
    { label: 'Cloud Resources', value: `${stats?.resourceUsage || 24}%`, icon: <Cpu size={16} /> },
  ];

  return (
    <div className="max-w-[1128px] mx-auto animate-fade-in pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: System Identity Snap */}
        <div className="lg:col-span-3 space-y-4">
           <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="h-14 bg-rose-900 w-full relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
              </div>
              <div className="px-4 pb-4 -mt-7 text-center">
                 <div className="w-16 h-16 rounded-full border-4 border-white bg-slate-900 mx-auto flex items-center justify-center text-rose-500 font-mono font-black text-xl shadow-md mb-3">
                    SYS
                 </div>
                 <h3 className="text-base font-bold text-slate-900 tracking-tight">Global Controller</h3>
                 <p className="text-xs text-slate-500 font-medium mb-4">Super Admin · Operational Tier 1</p>
                 <div className="pt-4 border-t border-slate-100 flex flex-col items-start gap-4">
                    <div className="flex justify-between w-full text-[11px] font-bold">
                       <span className="text-slate-500">Node Clusters</span>
                       <span className="text-rose-600">Active</span>
                    </div>
                    <div className="flex justify-between w-full text-[11px] font-bold">
                       <span className="text-slate-500">Security Index</span>
                       <span className="text-[var(--color-forest)]">Perfect</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm sticky top-[95px]">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4 px-1">Infrastructure Load</h4>
              {kpis.map((s, i) => (
                <div key={i} className="flex items-center gap-3 py-2 px-1 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group border-b border-slate-50 last:border-0">
                   <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-rose-600 transition-colors">
                      {s.icon}
                   </div>
                   <div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{s.label}</div>
                      <div className="text-xs font-bold text-slate-700 leading-none">{s.value}</div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Middle Column: Governance Feed */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-1 flex items-center shadow-sm">
             {['overview', 'users', 'logs'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${activeTab === tab ? 'bg-[var(--color-forest)] text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                   {tab}
                </button>
             ))}
          </div>

          <div className="flex items-center gap-2 py-2">
             <div className="h-px flex-1 bg-slate-200"></div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">System Governance Feed</span>
             <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-4">
               {/* Critical Alert Card */}
               {stats?.securityAlerts && stats.securityAlerts > 0 && (
                 <div className="bg-rose-50 border border-rose-100 rounded-xl p-6 flex items-start gap-4 animate-pulse">
                    <div className="p-3 bg-white rounded-full text-rose-600 shadow-sm"><ShieldAlert size={20} /></div>
                    <div>
                       <h4 className="text-sm font-bold text-rose-900">Security Breach Detected</h4>
                       <p className="text-xs text-rose-600 mt-1">Found {stats.securityAlerts} anomaly patterns in Cluster-7. Immediate audit recommended.</p>
                       <button className="mt-4 px-4 py-2 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg">Isolate Node</button>
                    </div>
                 </div>
               )}

               <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                     <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500">Resource Trajectory</h4>
                     <RefreshCw size={14} className={`text-slate-300 ${isLoading ? 'animate-spin' : ''}`} />
                  </div>
                  <div className="h-40 flex items-end gap-3 px-2 border-b border-slate-100 pb-2">
                     {[45, 32, 68, 85, 42, 38, 55, 90, 48, 62].map((v, i) => (
                       <div key={i} className="flex-1 rounded-t-sm group relative" style={{ height: `${v}%`, backgroundColor: v > 80 ? '#e11d48' : '#1A3028' }}>
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[8px] font-bold text-slate-900">{v}%</div>
                       </div>
                     ))}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                     <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[var(--color-forest)]"></div><span className="text-[9px] font-bold text-slate-400 uppercase">Operational</span></div>
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-600"></div><span className="text-[9px] font-bold text-slate-400 uppercase">High Load</span></div>
                     </div>
                     <span className="text-[9px] font-mono text-slate-300">Cluster 001-A</span>
                  </div>
               </div>

               {auditLogs.slice(0, 3).map((log, i) => (
                 <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all group animate-fade-up">
                    <div className="flex items-start justify-between">
                       <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[var(--color-gold)] transition-colors"><Shield size={20} /></div>
                          <div>
                             <h5 className="text-sm font-bold text-slate-900 group-hover:underline">{log.action}</h5>
                             <p className="text-xs text-slate-500 mt-1">{log.details}</p>
                             <div className="flex items-center gap-3 mt-3 text-[9px] font-black uppercase tracking-widest text-slate-400">
                                <span>{log.userName}</span>
                                <span className="text-[var(--color-forest)]">{log.status}</span>
                                <span className="font-mono">{new Date(log.timestamp).toLocaleTimeString()}</span>
                             </div>
                          </div>
                       </div>
                       <ArrowUpRight size={18} className="text-slate-200 group-hover:text-[var(--color-gold)] transition-colors" />
                    </div>
                 </div>
               ))}
            </div>
          )}

          {activeTab === 'users' && (
             <div className="space-y-4 animate-fade-up">
                {users.slice(0, 10).map((user, i) => (
                  <div key={user.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between group">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[var(--color-forest)] font-black text-xs">{user.name.charAt(0)}</div>
                        <div>
                           <div className="text-sm font-bold text-slate-900">{user.name}</div>
                           <div className="text-[10px] text-slate-500 font-medium">{user.role}</div>
                        </div>
                     </div>
                     <button className="px-4 py-1.5 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-rose-600 hover:text-rose-600 transition-all">Deactivate</button>
                  </div>
                ))}
             </div>
          )}
        </div>

        {/* Right Column: Central Controls */}
        <div className="lg:col-span-3 space-y-4">
           <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-6 px-1">Control Terminal</h4>
              <div className="space-y-3">
                 {[
                   { l: 'Global Config', s: 'System params', i: <Terminal size={16} />, c: 'bg-slate-900 text-emerald-500' },
                   { l: 'Identity Sync', s: 'LDAP / OAuth', i: <RefreshCw size={16} />, c: 'bg-indigo-50 text-indigo-600' },
                   { l: 'Security Purge', s: 'Session clear', i: <Lock size={16} />, c: 'bg-rose-50 text-rose-600' },
                 ].map((action, i) => (
                   <button key={i} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-all group border border-transparent">
                      <div className="flex items-center gap-3 text-left">
                        <div className={`w-9 h-9 ${action.c} rounded-lg flex items-center justify-center shadow-sm`}>
                          {action.i}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800">{action.l}</div>
                          <div className="text-[9px] text-slate-500 font-medium">{action.s}</div>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-[var(--color-gold)] transition-all" />
                   </button>
                 ))}
              </div>
           </div>

           <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4 px-1">Global Audit Stream</h4>
              <div className="space-y-4">
                 {[
                   { t: 'DB Backup Verified', d: '12m ago', s: 'Success' },
                   { t: 'Key Rotation Error', d: '1h ago', s: 'Warning' },
                   { t: 'API Gateway Scaling', d: '3h ago', s: 'Success' },
                 ].map((s, i) => (
                   <div key={i} className="flex gap-4 group cursor-pointer border-b border-slate-50 last:border-0 pb-3 h-auto">
                      <div className={`w-1 h-8 ${s.s === 'Success' ? 'bg-emerald-500' : 'bg-rose-500'} rounded-full shrink-0 mt-1`}></div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-slate-800 group-hover:underline truncate">{s.t}</div>
                        <div className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">{s.d}</div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="px-4 py-8 text-center text-slate-500">
              <div className="text-[9px] font-black uppercase tracking-[0.3em] font-mono leading-relaxed mb-4">
                 InternBridge © 2026<br/>Global Identity Registry
              </div>
              <div className="flex justify-center gap-4 opacity-50">
                 <Shield size={16} />
                 <Globe size={16} />
                 <Lock size={16} />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
