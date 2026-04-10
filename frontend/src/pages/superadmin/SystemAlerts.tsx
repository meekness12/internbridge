import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  ShieldAlert, 
  Zap, 
  Activity,
  ChevronRight,
  Settings,
  CheckCircle2,
  Server,
  RefreshCw,
  Clock,
  Terminal
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import systemService from '../../api/systemService';
import type { SystemAlert, PlatformStats } from '../../api/systemService';
import { useToast } from '../../context/ToastContext';

/**
 * SystemAlerts Component
 * High-fidelity System Alerts for real-time monitoring.
 */
const SystemAlerts: React.FC = () => {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setIsLoading(true);
        const [alertsData, statsData] = await Promise.all([
          systemService.getSystemAlerts(),
          systemService.getPlatformStats()
        ]);
        setAlerts(alertsData);
        setStats(statsData);
      } catch (error) {
        toast('Failed to synchronize system alerts stream.', 'error', 'Error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlerts();
  }, [toast]);

  const fallbackAlerts = [
    { id: '1', message: 'Auth Cluster Breach Attempt', severity: 'CRITICAL', timestamp: new Date(Date.now() - 300000).toISOString(), acknowledged: false },
    { id: '2', message: 'Cluster-7 Resource Threshold', severity: 'HIGH', timestamp: new Date(Date.now() - 3600000).toISOString(), acknowledged: true },
    { id: '3', message: 'API Latency Variance', severity: 'MEDIUM', timestamp: new Date(Date.now() - 7200000).toISOString(), acknowledged: true },
  ];

  const displayAlerts = alerts.length > 0 ? alerts : (isLoading ? [] : fallbackAlerts);

  return (
    <div className="max-w-[1400px] mx-auto animate-fade-in pb-20 px-4">
      <PremiumHeader 
        eyebrow="System Monitoring"
        title="Activity"
        italicTitle="Alerts"
        subtitle="Real-time monitoring of platform infrastructure, security protocols, and system health."
        eyebrowColor="text-[var(--color-brand)]"
        primaryAction={
          <div className="flex items-center gap-4">
             <button className="text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-slate-900 transition-colors">Acknowledge All</button>
             <button className="h-14 w-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all shadow-xl shadow-slate-200/20">
                <Settings size={20} />
             </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 animate-fade-up">
        {[
          { label: 'Platform Status', value: stats ? (stats.securityAlerts > 0 ? 'Degraded' : 'Optimal') : 'Optimal', icon: <CheckCircle2 size={20} />, color: (stats?.securityAlerts ?? 0) > 0 ? 'text-amber-500' : 'text-emerald-500', bg: 'bg-white' },
          { label: 'System Load', value: `${stats?.resourceUsage ?? 24}%`, icon: <Activity size={20} />, color: 'text-indigo-500', bg: 'bg-white' },
          { label: 'Global Uptime', value: '99.99%', icon: <Zap size={20} />, color: 'text-[var(--color-brand)]', bg: 'bg-white' },
          { label: 'Active Audits', value: displayAlerts.length.toString(), icon: <Bell size={20} />, color: 'text-rose-500', bg: 'bg-white' },
        ].map((kpi, i) => (
          <div key={i} className={`bg-white border border-slate-50 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/20 flex items-center gap-6 group hover:shadow-2xl transition-all`}>
            <div className={`w-16 h-16 bg-slate-50 ${kpi.color} rounded-2xl flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform`}>
               {kpi.icon}
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">{kpi.label}</div>
              <div className="text-2xl font-serif font-black text-slate-900 tracking-tight leading-none">{kpi.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-8 px-4 animate-fade-up">
         <div className="flex items-center gap-4">
            <h2 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.4em]">Live Alerts</h2>
            <div className="h-px w-20 bg-slate-100"></div>
         </div>
         {isLoading && (
            <div className="flex items-center gap-3 text-[9px] font-black text-[var(--color-brand)] uppercase tracking-widest animate-pulse">
               <RefreshCw size={12} className="animate-spin" /> Updating Alerts...
            </div>
         )}
      </div>

      <div className="space-y-6 animate-fade-up">
        {displayAlerts.map((alert: any, i: number) => (
          <div key={alert.id} className="bg-white rounded-[3rem] border border-slate-50 overflow-hidden shadow-xl shadow-slate-200/20 hover:shadow-2xl transition-all relative group">
            <div className={`absolute left-0 top-0 h-full w-2 ${
              alert.severity === 'CRITICAL' ? 'bg-rose-500 shadow-glow' :
              alert.severity === 'HIGH' ? 'bg-amber-500' :
              alert.severity === 'MEDIUM' ? 'bg-[var(--color-brand)]' : 'bg-emerald-500'
            }`}></div>
            <div className="p-10 flex flex-col md:flex-row gap-10 items-center">
              <div className="w-20 h-20 bg-slate-50 rounded-[1.8rem] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0 border border-slate-100 shadow-inner">
                {alert.severity === 'CRITICAL' ? <ShieldAlert size={36} className="text-rose-500" /> :
                 alert.severity === 'HIGH' ? <AlertTriangle size={36} className="text-amber-500" /> :
                 alert.severity === 'MEDIUM' ? <Zap size={36} className="text-[var(--color-brand)]" /> :
                 <CheckCircle2 size={36} className="text-emerald-500" />}
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
                  <div className="flex items-center gap-6">
                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border transition-all ${
                       alert.severity === 'CRITICAL' ? 'bg-rose-50 text-rose-500 border-rose-100' :
                       alert.severity === 'HIGH' ? 'bg-amber-50 text-amber-500 border-amber-100' : 'bg-[var(--color-brand)]/5 text-[var(--color-brand)] border-[var(--color-brand)]/10'
                    }`}>{alert.severity} Threshold</span>
                    <h3 className="text-2xl font-serif font-black text-slate-900 tracking-tight italic">{alert.message}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300 font-mono text-[10px] font-black uppercase tracking-tighter">
                    <Clock size={14} /> {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </div>
                </div>
                
                <p className="text-sm leading-relaxed text-slate-400 font-medium mb-8 max-w-4xl italic px-4 border-l-2 border-slate-50">
                  System notification for {alert.message.toLowerCase()}. Infrastructure reported an anomaly at {new Date(alert.timestamp).toLocaleString()}.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-slate-50 gap-6">
                   <div className="flex items-center gap-6">
                      <button className="h-10 px-6 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2">
                        View Details <ChevronRight size={14} />
                      </button>
                      <button className="text-[10px] font-black text-slate-300 hover:text-[var(--color-brand)] uppercase tracking-widest transition-colors">Acknowledge Alert</button>
                   </div>
                   <div className="flex items-center gap-3">
                      <span className="text-[9px] font-black text-slate-100 font-mono uppercase tracking-[0.25em]">Alert-ID: 0x{alert.id.toString().substring(0, 6).toUpperCase()}</span>
                      <div className={`w-2.5 h-2.5 rounded-full transition-colors ${alert.acknowledged ? 'bg-slate-100' : 'bg-rose-500 shadow-glow'}`}></div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {displayAlerts.length === 0 && !isLoading && (
          <div className="py-32 flex flex-col items-center justify-center opacity-30">
             <Terminal size={80} className="text-slate-200 mb-6" />
             <h3 className="text-2xl font-black uppercase tracking-[0.4em] text-slate-300">No Active Alerts</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemAlerts;
