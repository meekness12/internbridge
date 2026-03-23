import React, { useState } from 'react';
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

const SuperAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Platform Users', value: '1,240', trend: '↑ 12% from last month', icon: '👤', color: 'ki-1', kpiColor: 'kpi-1' },
    { label: 'Partnerships', value: '85', trend: '↑ 4 new this week', icon: '🤝', color: 'ki-2', kpiColor: 'kpi-2' },
    { label: 'System Uptime', value: '99.98%', trend: 'Operational', icon: '⚡', color: 'ki-4', kpiColor: 'kpi-4' },
    { label: 'Security Alerts', value: '2', trend: 'Critical: 0', icon: '🛡️', color: 'ki-3', kpiColor: 'kpi-3', alert: true },
    { label: 'Resources', value: '42%', trend: 'Optimized', icon: '💿', color: 'ki-5', kpiColor: 'kpi-5' },
  ];

  const timelineItems = [
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
        {stats.map((stat, i) => (
          <PremiumCard key={i} {...stat} />
        ))}
      </div>

      <div className="flex items-center gap-1 p-1 bg-[#FDFCF9] border border-slate-200 rounded-xl w-fit shadow-sm">
        {[
          { id: 'overview', label: 'System Health', icon: <LayoutDashboard size={14} /> },
          { id: 'users', label: 'User Directory', icon: <Users size={14} /> },
          { id: 'security', label: 'Security', icon: <ShieldCheck size={14} />, badge: '2' },
          { id: 'infrastructure', label: 'Cluster', icon: <Server size={14} /> },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)} 
            className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-[var(--color-navy)] text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            {tab.icon} {tab.label} {tab.badge && <span className={`px-1.5 py-0.5 rounded text-[10px] ${activeTab === tab.id ? 'bg-white/20' : 'bg-red-50 text-red-600'}`}>{tab.badge}</span>}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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
              {[
                { label: '00h', h1: 15, h2: 20 }, { label: '04h', h1: 12, h2: 18 }, { label: '08h', h1: 45, h2: 30 },
                { label: '12h', h1: 82, h2: 12 }, { label: '16h', h1: 65, h2: 25, special: true },
                { label: '20h', h1: 40, h2: 20 }, { label: '24h', h1: 25, h2: 15 },
              ].map((hour, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                  <div className={`w-full flex flex-col-reverse rounded-sm overflow-hidden h-32`}>
                    <div style={{ height: `${hour.h1}%` }} className={hour.special ? 'bg-red-600' : 'bg-[var(--color-navy)]'}></div>
                    <div style={{ height: `${hour.h2}%` }} className={hour.special ? 'bg-red-100' : 'bg-slate-100'}></div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-300 uppercase">{hour.label}</span>
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

        <div className="lg:col-span-8 xl:col-span-4 card bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
           <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <div><div className="text-[13px] font-bold text-[var(--color-navy)]">Recent Audit Trail</div></div>
            <button className="text-[10px] font-bold text-red-600 uppercase tracking-widest hover:underline">Full Log</button>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { id: 'SYS-001', user: 'Admin_Sarah', action: 'Approved Company', time: '10m ago', status: 'Success' },
              { id: 'SYS-002', user: 'Auto_Agent', action: 'Backup Completed', time: '1h ago', status: 'Success' },
              { id: 'SYS-003', user: 'Lecturer_X', action: 'Grade Override', time: '3h ago', status: 'Warning' },
              { id: 'SYS-004', user: 'Unknown', action: 'Login Failure', time: '5h ago', status: 'Failed' }
            ].map((l, i) => (
              <div key={i} className="p-5 flex items-center gap-4 hover:bg-slate-50 cursor-pointer transition-all">
                 <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-sm">{l.user.charAt(0)}</div>
                 <div className="flex-1 min-w-0">
                   <div className="flex items-center justify-between mb-0.5">
                     <span className="text-[9px] font-mono font-bold text-slate-300 uppercase">{l.id}</span>
                     <span className={`text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border ${
                       l.status === 'Warning' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                       l.status === 'Success' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                       l.status === 'Failed' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                     }`}>{l.status}</span>
                   </div>
                   <div className="text-sm font-bold text-[var(--color-navy)] truncate">{l.action}</div>
                 </div>
              </div>
            ))}
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
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
