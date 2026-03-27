import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Download,
  RefreshCw,
  LayoutDashboard,
  ShieldCheck,
  Server
} from 'lucide-react';
import { PremiumCard } from '../../components/ui/PremiumCard';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import { PremiumTimeline } from '../../components/ui/PremiumTimeline';
import { PremiumActionGrid } from '../../components/ui/PremiumActionGrid';
import systemService from '../../api/systemService';
import userService from '../../api/userService';
import type { UserDTO } from '../../api/userService';
import type { PlatformStats, AuditLogDTO, InfrastructureMetric } from '../../api/systemService';
import { useToast } from '../../context/ToastContext';
import { Search, Filter, ShieldAlert, Cpu, ExternalLink, ShieldCheck as ShieldCheckIcon, ShieldAlert as ShieldAlertIcon } from 'lucide-react';

const SuperAdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogDTO[]>([]);
  const [metrics, setMetrics] = useState<InfrastructureMetric[]>([]);
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [statsData, logsData, metricsData, usersData, alertsData] = await Promise.all([
          systemService.getPlatformStats().catch(() => null),
          systemService.getAuditLogs(10).catch(() => []),
          systemService.getInfrastructureMetrics().catch(() => []),
          userService.getUsers().catch(() => []),
          systemService.getSystemAlerts().catch(() => [])
        ]);
        
        setStats(statsData);
        setAuditLogs(logsData);
        setMetrics(metricsData);
        setUsers(usersData);
        setAlerts(alertsData);
      } catch (error) {
        toast('Failed to synchronize system data across clusters', 'error', 'Network Error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const displayStats = [
    { label: 'Platform Users', value: stats !== null ? stats.totalUsers.toLocaleString() : '---', trend: stats?.userTrend || 'Synchronizing...', icon: '👤', color: 'ki-1', kpiColor: 'kpi-1' },
    { label: 'Partnerships', value: stats !== null ? stats.totalPartners.toLocaleString() : '---', trend: stats?.partnerTrend || 'Synchronizing...', icon: '🤝', color: 'ki-2', kpiColor: 'kpi-2' },
    { label: 'System Uptime', value: stats?.systemUptime || '---', trend: 'Operational', icon: '⚡', color: 'ki-4', kpiColor: 'kpi-4' },
    { label: 'Security Alerts', value: stats !== null ? stats.securityAlerts.toString() : '0', trend: 'Critical: 0', icon: '🛡️', color: 'ki-3', kpiColor: 'ki-3', alert: (stats?.securityAlerts || 0) > 0 },
    { label: 'Resources', value: stats !== null ? `${stats.resourceUsage}%` : '0%', trend: 'Optimized', icon: '💿', color: 'ki-5', kpiColor: 'kpi-5' },
  ];

  const timelineItems = auditLogs.length > 0 ? auditLogs.map(log => ({
    title: log.action,
    meta: `${new Date(log.timestamp).toLocaleTimeString()} · User: ${log.userName}`,
    body: log.details,
    color: log.status === 'SUCCESS' ? '#15803d' : log.status === 'WARNING' ? 'var(--color-gold)' : 'red'
  })) : [
    { title: 'Automatic Database Snapshot Success', meta: '12 minutes ago · Region: West-Europe', body: 'Full backup of relational schema completed. Storage verified: 4.2TB.', color: 'var(--color-navy)' },
    { title: 'Update Deployment: Authentication v2.1', meta: '2 hours ago · Cluster: Production', body: 'New security patch for JWT rotation successfully deployed across all nodes.', color: 'red' },
    { title: 'New Partner Instance Onboarding', meta: '5 hours ago · Region: US-East', body: 'Techwave Technologies instance provisioned and configured with RBAC settings.', color: 'var(--color-gold)' },
    { title: 'System Heartbeat: All Systems Green', meta: 'Yesterday · Global Instance', body: 'Daily system health check passed. 0 hardware failures detected in primary datacenter.', color: '#15803d' }
  ];

  const quickActions = [
    { label: 'Settings', sub: 'Global config', icon: '⚙️', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Backups', sub: 'Database cloud', icon: '💾', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Security', sub: 'Threat audit', icon: '🔒', color: 'bg-red-50 text-red-600' },
    { label: 'Reports', sub: 'Volume stats', icon: '📊', color: 'bg-blue-50 text-blue-600' }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="System Infrastructure"
        title="Platform"
        italicTitle="Oversight"
        subtitle="Tuesday, 13 February 2024 · Global Cluster Instance"
        eyebrowColor="text-red-600"
        primaryAction={
          <button className="btn btn-primary btn-sm bg-red-600 text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            Critical Alerts <span className="bg-white/20 px-2 py-0.5 rounded-full text-[9px] font-black">2</span>
          </button>
        }
        secondaryAction={
          <button className="btn btn-gold btn-sm bg-[var(--color-gold)] text-[var(--color-navy)] px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            <RefreshCw size={16} /> Deploy Update
          </button>
        }
        additionalActions={
          <button className="btn btn-ghost btn-sm border border-slate-200 bg-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            <Download size={14} /> System Logs
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {displayStats.map((stat, i) => (
          <PremiumCard key={i} {...stat} />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 p-1 bg-[#FDFCF9] border border-slate-200 rounded-xl w-fit shadow-sm">
          {[
            { id: 'overview', label: 'System Health', icon: <LayoutDashboard size={14} /> },
            { id: 'users', label: 'User Directory', icon: <Users size={14} /> },
            { id: 'security', label: 'Security', icon: <ShieldCheck size={14} />, badge: (stats?.securityAlerts ?? 0) > 0 ? (stats?.securityAlerts ?? 0).toString() : null },
            { id: 'infrastructure', label: 'Cluster', icon: <Server size={14} /> },
          ].map((tab: { id: string; label: string; icon: React.ReactNode; badge?: string | null }) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-[var(--color-navy)] text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              {tab.icon} {tab.label} {tab.badge && <span className={`px-1.5 py-0.5 rounded text-[10px] ${activeTab === tab.id ? 'bg-white/20' : 'bg-red-50 text-red-600'}`}>{tab.badge}</span>}
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[var(--color-gold)] uppercase tracking-[0.2em] animate-pulse">
            <RefreshCw size={12} className="animate-spin" /> Localizing Repository...
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {activeTab === 'overview' && (
          <>
            <div className="lg:col-span-8 xl:col-span-4 card bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-bold text-[var(--color-navy)]">Cluster Resource Load</div>
                  <div className="text-[10px] text-slate-400 font-medium">CPU & Memory metrics · Last 24h</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-[9px] font-black uppercase tracking-widest">Stable</span>
              </div>
              <div className="p-8 flex-1">
                <div className="h-40 flex items-end gap-3 mb-8">
                  {(metrics.length > 0 ? metrics : [
                    { timestamp: '00h', cpuLoad: 15, memoryUsage: 20 }, { timestamp: '04h', cpuLoad: 12, memoryUsage: 18 }, { timestamp: '08h', cpuLoad: 45, memoryUsage: 30 },
                    { timestamp: '12h', cpuLoad: 82, memoryUsage: 12 }, { timestamp: '16h', cpuLoad: 65, memoryUsage: 25 },
                    { timestamp: '20h', cpuLoad: 40, memoryUsage: 20 }, { timestamp: '24h', cpuLoad: 25, memoryUsage: 15 },
                  ]).map((hour: any, i: number) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-3">
                      <div className={`w-full flex flex-col-reverse rounded-sm overflow-hidden h-32`}>
                        <div style={{ height: `${hour.cpuLoad}%` }} className={hour.cpuLoad > 80 ? 'bg-red-600' : 'bg-[var(--color-navy)]'}></div>
                        <div style={{ height: `${hour.memoryUsage}%` }} className={hour.cpuLoad > 80 ? 'bg-red-100' : 'bg-slate-100'}></div>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-slate-300 uppercase">{hour.timestamp.includes(':') ? new Date(hour.timestamp).getHours() + 'h' : hour.timestamp}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 pt-4 border-t border-slate-50">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                     <div className="w-2.5 h-2.5 bg-red-600 rounded-sm"></div> CPU Load
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                     <div className="w-2.5 h-2.5 bg-slate-100 rounded-sm"></div> Memory
                   </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 xl:col-span-4 card bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
               <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <div><div className="text-[13px] font-bold text-[var(--color-navy)]">Recent Audit Trail</div></div>
                <button className="text-[10px] font-bold text-red-600 uppercase tracking-widest hover:underline">Full Log</button>
              </div>
              <div className="divide-y divide-slate-50 flex-1 overflow-auto max-h-[400px]">
                {auditLogs.length > 0 ? auditLogs.map((l, i) => (
                  <div key={i} className="p-5 flex items-center gap-4 hover:bg-slate-50 cursor-pointer transition-all">
                     <div className="w-10 h-10 bg-[var(--color-navy)] text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-sm">{l.userName.charAt(0)}</div>
                     <div className="flex-1 min-w-0">
                       <div className="flex items-center justify-between mb-0.5">
                         <span className="text-[9px] font-mono font-bold text-slate-300 uppercase">{l.id.substring(0, 8)}</span>
                         <span className={`text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border ${
                           l.status === 'WARNING' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                           l.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                           l.status === 'FAILED' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                         }`}>{l.status}</span>
                       </div>
                       <div className="text-sm font-bold text-[var(--color-navy)] truncate">{l.action}</div>
                       <div className="text-[9px] text-slate-400 mt-0.5 flex items-center gap-2">
                         <span className="font-bold">{l.userName}</span> • {new Date(l.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </div>
                     </div>
                  </div>
                )) : (
                  <div className="p-10 text-center flex flex-col items-center gap-4">
                     <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl text-slate-300">
                        <ShieldCheck size={24} />
                     </div>
                     <span className="text-xs font-bold text-slate-400 italic">No recent system activity detected</span>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-8 xl:col-span-4 space-y-6">
               <PremiumActionGrid title="System Management" items={quickActions} />
               <div className="card bg-red-950 text-white border-0 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6">
                       <div className="h-4 w-1 bg-red-600 rounded-full"></div>
                       <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-[0.2em]">Security Protocol</span>
                    </div>
                    <h3 className="text-2xl font-serif mb-4 leading-tight">System Integrity <em className="italic text-slate-400">Stable</em></h3>
                    <p className="text-white/40 text-[11px] leading-relaxed mb-6">No active threats detected. Backup scheduled in 14 minutes.</p>
                    <button className="w-full py-3 bg-red-600 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-red-700">Run Diagnostic Scan</button>
                  </div>
               </div>
            </div>
            
            <div className="lg:col-span-12">
               <PremiumTimeline 
                 title="Operational Timeline"
                 subtitle="Global cluster events · Last 24 hours"
                 items={timelineItems}
               />
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <div className="lg:col-span-12 space-y-6">
             <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="relative group w-full md:w-96">
                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-gold)] transition-colors" size={16} />
                   <input type="text" placeholder="Search identities..." className="w-full h-11 bg-white border border-slate-200 rounded-xl pl-12 pr-5 text-xs outline-none shadow-sm focus:ring-1 focus:ring-[var(--color-gold)]" />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                   <button 
                     onClick={() => window.location.href = '/dashboard/users'}
                     className="flex-1 md:flex-none h-11 px-6 bg-[var(--color-navy)] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-lg border border-black/10 hover:bg-black transition-all flex items-center justify-center gap-2"
                   >
                     Advanced Management <ExternalLink size={14} />
                   </button>
                   <button className="h-11 px-5 border border-slate-200 bg-white rounded-xl hover:bg-slate-50 transition-colors"><Filter size={16} className="text-slate-400" /></button>
                </div>
             </div>
             <div className="card bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                   <thead className="bg-[#F8FAFC] border-b border-slate-100">
                      <tr>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Identity</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Role</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {users.length > 0 ? users.slice(0, 8).map((user) => (
                        <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[var(--color-navy)] font-bold text-[10px] group-hover:bg-[var(--color-gold)] transition-all">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                   <div className="text-xs font-bold text-[var(--color-navy)]">{user.name}</div>
                                   <div className="text-[10px] text-slate-400 font-mono font-bold tracking-tighter opacity-60">{user.email}</div>
                                </div>
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest border ${
                               user.role === 'SUPER_ADMIN' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                               user.role === 'COMPANY_ADMIN' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                               user.role === 'SCHOOL_ADMIN' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                               'bg-indigo-50 text-indigo-600 border-indigo-100'
                             }`}>
                               {user.role.replace('_', ' ')}
                             </span>
                          </td>
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-2">
                               {user.status === 'ACTIVE' || user.status === 'VERIFIED' ? 
                                 <ShieldCheckIcon size={12} className="text-emerald-500" /> : 
                                 <ShieldAlertIcon size={12} className="text-amber-500" />
                               }
                               <span className={`text-[9px] font-black uppercase tracking-widest ${
                                 user.status === 'ACTIVE' || user.status === 'VERIFIED' ? 'text-emerald-600' : 'text-amber-600'
                               }`}>{user.status}</span>
                             </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={4} className="px-8 py-20 text-center">
                             <div className="flex flex-col items-center gap-3 opacity-20">
                                <Users size={48} />
                                <span className="text-xs font-bold italic">No identities localized in this cluster</span>
                             </div>
                          </td>
                        </tr>
                      )}
                   </tbody>
                </table>
                <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
                   <button 
                     onClick={() => window.location.href = '/dashboard/users'}
                     className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-[var(--color-navy)] transition-colors"
                   >
                     View Global Identity Registry ({users.length})
                   </button>
                </div>
             </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card bg-white border border-slate-200 rounded-2xl p-8">
               <div className="flex items-center justify-between mb-8">
                  <h4 className="text-sm font-black uppercase tracking-widest text-[var(--color-navy)] flex items-center gap-3">
                     <ShieldAlert className="text-red-500" /> Active Security Alerts
                  </h4>
                  <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-black">HIGH PRIORITY</span>
               </div>
               <div className="space-y-4">
                  {(alerts.length > 0 ? alerts : [
                    { label: 'Brute Force Attempt Detected', level: 'Level 2', origin: 'IP: 192.168.1.104', status: 'Blocked' },
                    { label: 'Incomplete Handshake: Port 5433', level: 'Level 1', origin: 'Node: Cluster-West', status: 'Warning' }
                  ]).map((a: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-red-200 transition-all">
                       <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${a.status === 'Blocked' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                          <div>
                             <div className="text-[11px] font-black text-[var(--color-navy)]">{a.label}</div>
                             <div className="text-[9px] font-mono font-medium text-slate-400 uppercase tracking-tighter">{a.origin}</div>
                          </div>
                       </div>
                       <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{a.status}</div>
                    </div>
                  ))}
               </div>
            </div>
            <div className="card bg-[var(--color-navy)] text-white/40 border-0 rounded-2xl p-8 font-mono text-[10px]">
               <div className="text-white font-bold mb-4 uppercase tracking-[0.4em]">Firewall Logs</div>
               <div className="space-y-2 opacity-60">
                  <div>[TCP/SSH] BLOCK 22 {"<-"} 10.2.1.44</div>
                  <div>[HTTPS] ALLOW 443 {"<-"} WAN</div>
                  <div>[VPN] CONNECTED identity:ib-alpha</div>
                  <div>[AUTH] ROTATED keys:prod-v2</div>
                  <div>[INFO] PULSE sync:success</div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'infrastructure' && (
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <div className="lg:col-span-2 card bg-white border border-slate-200 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <h4 className="text-sm font-black uppercase tracking-widest text-[var(--color-navy)] flex items-center gap-3">
                     <Cpu className="text-indigo-500" /> Node Computational Awareness
                  </h4>
                </div>
                <div className="h-64 flex items-end gap-6 px-10 border-b border-l border-slate-50">
                   {(metrics.length > 0 ? metrics : [15, 45, 82, 30, 65, 40, 25]).map((m, i) => (
                     <div key={i} className="flex-1 group relative">
                        <div className="w-full bg-slate-100 rounded-t-lg group-hover:bg-indigo-100 transition-all" style={{ height: `${(m as any).cpuLoad || (m as number)}%` }}></div>
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[9px] font-mono font-black opacity-0 group-hover:opacity-100 italic">CPU {(m as any).cpuLoad || (m as number)}%</div>
                     </div>
                   ))}
                </div>
             </div>
             <div className="card p-8 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-6">Internal Subnets</div>
                <div className="space-y-6">
                   {[
                     { label: 'Primary PostgreSQL', status: 'Healthy', load: '12%' },
                     { label: 'API Gateway', status: 'Nominal', load: '4%' },
                     { label: 'Cache (Redis)', status: 'Warm', load: '22%' },
                     { label: 'Media Store (S3)', status: 'Active', load: '1%' }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between">
                        <div>
                           <div className="text-xs font-bold text-[var(--color-navy)]">{item.label}</div>
                           <div className="text-[9px] font-mono text-slate-400">{item.status}</div>
                        </div>
                        <div className="text-[10px] font-black text-emerald-600">{item.load}</div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
