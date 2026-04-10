import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Bell, 
  Sun, 
  Grid, 
  TrendingUp, 
  TrendingDown, 
  Building2, 
  Briefcase, 
  Database,
  MoreVertical,
  CheckCircle2,
  Clock,
  ChevronDown,
  ShieldAlert
} from 'lucide-react';
import systemService from '../../api/systemService';
import userService from '../../api/userService';
import type { UserDTO } from '../../api/userService';
import type { PlatformStats, AuditLogDTO, AnalyticsResponse } from '../../api/systemService';
import { useToast } from '../../context/ToastContext';

/**
 * SuperAdminDashboard Component - Modern HRM Redesign
 * Overhauled with real-time data synchronization.
 */
const SuperAdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogDTO[]>([]);
  const [users, setUsers] = useState<UserDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [roleDistribution, setRoleDistribution] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [statsData, logsData, analyticsData, usersData] = await Promise.all([
          systemService.getPlatformStats().catch(() => null),
          systemService.getAuditLogs(10).catch(() => []),
          systemService.getAnalytics().catch(() => null),
          userService.getUsers().catch(() => []),
        ]);
        
        setStats(statsData);
        setAuditLogs(logsData);
        setAnalytics(analyticsData);
        setUsers(usersData);

        // Real-time role distribution calculation
        const counts = usersData.reduce((acc: Record<string, number>, user: UserDTO) => {
          acc[user.role] = (acc[user.role] || 0) + 1;
          return acc;
        }, {});
        setRoleDistribution(counts);

      } catch (error) {
        toast('Data synchronization failed', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  // Derived Values
  const totalUserCount = users.length || 0;
  const placementRate = totalUserCount > 0 ? Math.round(((analytics?.totalPlacements || 0) / totalUserCount) * 100) : 0;
  const alertCount = auditLogs.filter(log => log.status !== 'SUCCESS').length;

  // Mock Sparkline logic based on real Placement Velocity if available
  const Sparkline = ({ color, data }: { color: string, data?: number[] }) => {
    const points = data && data.length > 0 ? data : [20, 5, 18, 10];
    const path = `M0 ${30 - points[0]} Q 25 ${30 - points[1]}, 50 ${30 - points[2]} T 100 ${30 - points[3]}`;
    return (
      <svg viewBox="0 0 100 30" className="w-16 h-8 opacity-40">
        <path 
          d={path} 
          fill="none" 
          stroke={color} 
          strokeWidth="3" 
          strokeLinecap="round" 
        />
      </svg>
    );
  };

  const kpis = [
    { 
      label: 'Partnerships', 
      value: stats?.totalPartners.toLocaleString() || '0', 
      bgColor: 'bg-hrm-peach', 
      iconColor: 'text-orange-500', 
      trend: stats?.partnerTrend || 'Steady', 
      trendUp: true 
    },
    { 
      label: 'Platform Users', 
      value: totalUserCount.toLocaleString() || '0', 
      bgColor: 'bg-hrm-sky', 
      iconColor: 'text-sky-500', 
      trend: stats?.userTrend || 'Growth', 
      trendUp: true 
    },
    { 
      label: 'Total Placements', 
      value: analytics?.totalPlacements.toLocaleString() || '0', 
      bgColor: 'bg-hrm-rose', 
      iconColor: 'text-rose-500', 
      trend: analytics?.placementTrend || 'Active', 
      trendUp: true 
    },
    { 
      label: 'System Alerts', 
      value: alertCount.toString(), 
      bgColor: 'bg-hrm-lavender', 
      iconColor: 'text-indigo-500', 
      trend: 'Critical', 
      trendUp: false 
    },
  ];

  return (
    <div className="max-w-full animate-fade-in pb-20">
      
      <div className="px-4 sm:px-6 space-y-8 sm:space-y-10 mt-4 sm:mt-6">
        
        {/* 2. Greetings Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-tight">
            Good Morning, <span className="text-[var(--color-brand)]">Admin!</span> 👋
          </h2>
          <button className="h-12 w-full sm:w-auto px-6 bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center sm:justify-start gap-3 shadow-xl hover:bg-black transition-all">
            System Overview <ChevronDown size={16} className="text-slate-400" />
          </button>
        </div>

        {/* 3. KPI Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {kpis.map((kpi, i) => (
            <div key={i} className={`${kpi.bgColor} p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] shadow-hrm border border-white/50 flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-500`}>
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white flex items-center justify-center ${kpi.iconColor} shadow-sm group-hover:rotate-6 transition-transform`}>
                  {i === 0 ? <Building2 size={20} className="sm:w-6 sm:h-6" /> : i === 1 ? <Users size={20} className="sm:w-6 sm:h-6" /> : i === 2 ? <Briefcase size={20} className="sm:w-6 sm:h-6" /> : <ShieldAlert size={20} className="sm:w-6 sm:h-6" />}
                </div>
                <div className="hidden sm:flex flex-col items-end">
                   <Sparkline color={kpi.iconColor.includes('orange') ? '#F97316' : kpi.iconColor.includes('emerald') ? '#10B981' : kpi.iconColor.includes('rose') ? '#F43F5E' : '#6366F1'} />
                   <div className={`flex items-center gap-1 text-[10px] font-black mt-2 ${kpi.trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {kpi.trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {kpi.trend}
                   </div>
                </div>
              </div>
              <div>
                <div className="text-[9px] sm:text-xs font-black uppercase tracking-widest text-slate-400/80 mb-1">{kpi.label}</div>
                <div className="text-xl sm:text-3xl font-black text-slate-800 tracking-tight">{kpi.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Middle Grid: Summary | Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Real Summary Column */}
          <div className="lg:col-span-6 bg-white rounded-[2.5rem] p-10 shadow-hrm border border-slate-50">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900 tracking-tight">Platform Statistics</h3>
               <button className="text-slate-300 hover:text-slate-900 transition-colors"><MoreVertical size={20} /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Corporate Partners', value: stats?.totalPartners.toString() || '0', color: 'bg-amber-50 text-amber-500', icon: <Building2 size={16} /> },
                { label: 'Active Students', value: (roleDistribution['INTERN'] || 0).toString(), color: 'bg-sky-50 text-sky-500', icon: <Users size={16} /> },
                { label: 'Academic Auditors', value: (roleDistribution['SUPERVISOR'] || 0).toString(), color: 'bg-rose-50 text-rose-500', icon: <Briefcase size={16} /> },
                { label: 'Institutional Admins', value: (roleDistribution['SCHOOL_ADMIN'] || 0).toString(), color: 'bg-indigo-50 text-indigo-500', icon: <Database size={16} /> },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-slate-50/50 hover:bg-slate-50 transition-colors group">
                   <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                        {item.icon}
                      </div>
                      <span className="text-sm font-bold text-slate-600 tracking-tight">{item.label}</span>
                   </div>
                   <span className="text-lg font-black text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 p-6 bg-[var(--color-brand)]/5 rounded-3xl border border-[var(--color-brand)]/10 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <TrendingUp className="text-[var(--color-brand)]" size={24} />
                  <div>
                    <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Placement Velocity</div>
                    <div className="text-sm font-bold text-slate-900">Optimal Growth Pattern Detected</div>
                  </div>
               </div>
               <div className="text-2xl font-black text-[var(--color-brand)]">{placementRate}%</div>
            </div>
          </div>

          {/* Real Population Distribution */}
          <div className="lg:col-span-6 bg-white rounded-[2.5rem] p-10 shadow-hrm border border-slate-50">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900 tracking-tight">Population Distribution</h3>
               <div className="px-3 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase flex items-center gap-2">
                  Live Registry <ChevronDown size={12} />
               </div>
            </div>
            
            <div className="relative h-64 flex items-center justify-center mb-10">
               <svg className="w-56 h-56 -rotate-90">
                 <circle cx="112" cy="112" r="90" fill="none" stroke="#F1F5F9" strokeWidth="14" />
                 <circle 
                   cx="112" cy="112" r="90" 
                   fill="none" 
                   stroke="#0D9488" 
                   strokeWidth="14" 
                   strokeDasharray="565" 
                   strokeDashoffset={565 - (565 * (roleDistribution['INTERN'] || 0) / (totalUserCount || 1))} 
                   strokeLinecap="round"
                   className="transition-all duration-1000 ease-out"
                 />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em]">Intern %</span>
                  <span className="text-5xl font-black text-slate-900 tracking-tighter">
                    {totalUserCount > 0 ? Math.round((roleDistribution['INTERN'] || 0) / totalUserCount * 100) : 0}%
                  </span>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               {[
                 { label: 'Interns', val: roleDistribution['INTERN'] || 0, color: 'bg-[var(--color-teal)]' },
                 { label: 'Companies', val: roleDistribution['COMPANY_ADMIN'] || 0, color: 'bg-amber-400' },
                 { label: 'Academic', val: roleDistribution['SUPERVISOR'] || 0, color: 'bg-sky-400' },
                 { label: 'Admin', val: roleDistribution['SUPER_ADMIN'] || 0, color: 'bg-slate-900' },
               ].map((l, i) => (
                 <div key={i} className="flex items-center justify-between p-3 border border-slate-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                       <div className={`w-3 h-3 rounded-full ${l.color} shadow-sm`}></div>
                       <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{l.label}</span>
                    </div>
                    <span className="text-xs font-black text-slate-900">{l.val}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* 5. Real Data Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Real Audit Tasks Table */}
          <div className="bg-white rounded-[2.5rem] p-10 shadow-hrm border border-slate-50">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900 tracking-tight">System Audit Log</h3>
               <div className="px-4 py-1.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase flex items-center gap-2 shadow-lg">
                  Recent <ChevronDown size={14} />
               </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-[10px] font-black uppercase tracking-widest text-slate-300 border-b border-slate-50">
                    <th className="text-left pb-4">Activity</th>
                    <th className="text-left pb-4">Timestamp</th>
                    <th className="text-left pb-4">Outcome</th>
                    <th className="text-right pb-4">Operator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {auditLogs.slice(0, 5).map((log, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-5">
                         <div className="flex items-center gap-3 text-sm font-bold text-slate-900 tracking-tight group-hover:text-[var(--color-teal)] transition-colors">
                            <input type="checkbox" checked={log.status === 'SUCCESS'} readOnly className="w-4 h-4 rounded border-slate-300 text-[var(--color-teal)] focus:ring-0" />
                            {log.action}
                         </div>
                      </td>
                      <td className="py-5 text-sm text-slate-400 font-medium">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-5">
                         <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                           log.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                         }`}>
                           {log.status === 'SUCCESS' ? 'Verified' : 'Flagged'}
                         </span>
                      </td>
                      <td className="py-5 text-right">
                         <div className="w-8 h-8 rounded-full bg-slate-100 ml-auto flex items-center justify-center text-[10px] font-black text-slate-400 border border-white shadow-sm">
                            {log.userName[0]}
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Real Verification Queue Table */}
          <div className="bg-white rounded-[2.5rem] p-10 shadow-hrm border border-slate-50">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-bold text-slate-900 tracking-tight">Active Verifications</h3>
               <div className="px-4 py-1.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase flex items-center gap-2 shadow-lg">
                  Global <ChevronDown size={14} />
               </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-[10px] font-black uppercase tracking-widest text-slate-300 border-b border-slate-50">
                    <th className="text-left pb-4">Identity</th>
                    <th className="text-left pb-4">Permission Role</th>
                    <th className="text-left pb-4">Cert Status</th>
                    <th className="text-right pb-4">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {users.slice(0, 5).map((user, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-5">
                         <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">
                               {user.name[0]}
                            </div>
                            <span className="text-sm font-bold text-slate-900 tracking-tight">{user.name}</span>
                         </div>
                      </td>
                      <td className="py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">{user.role.replace('_', ' ')}</td>
                      <td className="py-5">
                         <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                           user.status === 'ACTIVE' || user.status === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                         }`}>
                           {user.status === 'ACTIVE' || user.status === 'VERIFIED' ? 'Certified' : 'Pending'}
                         </span>
                      </td>
                      <td className="py-5 text-right">
                         <button className="text-slate-200 hover:text-[var(--color-teal)] transition-colors"><TrendingUp size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SuperAdminDashboard;
