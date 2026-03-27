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
  RefreshCw
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import systemService from '../../api/systemService';
import type { SystemAlert, PlatformStats } from '../../api/systemService';
import { useToast } from '../../context/ToastContext';

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
        toast('Failed to synchronize sentinel surveillance stream', 'error', 'Surveillance Error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlerts();
  }, [toast]);

  const fallbackAlerts = [
    { id: '1', message: 'Incomplete Security Handshake', severity: 'CRITICAL', timestamp: new Date().toISOString(), acknowledged: false },
    { id: '2', message: 'Database Threshold Breach', severity: 'HIGH', timestamp: new Date().toISOString(), acknowledged: true },
  ];

  const displayAlerts = alerts.length > 0 ? alerts : (isLoading ? [] : fallbackAlerts);

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Platform Sentinel"
        title="Operational"
        italicTitle="Alerts"
        subtitle="Real-time surveillance of platform infrastructure, security protocols, and system health"
        eyebrowColor="text-rose-600"
        primaryAction={
          <div className="flex items-center gap-4">
             <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[var(--color-navy)] transition-colors">Acknowledge All</button>
             <button className="h-11 w-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-[var(--color-navy)] transition-all shadow-sm">
                <Settings size={20} />
             </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Platform Status', value: stats ? (stats.securityAlerts > 0 ? 'Degraded' : 'Stable') : '---', icon: <CheckCircle2 />, color: (stats?.securityAlerts ?? 0) > 0 ? 'text-amber-500' : 'text-emerald-500', bg: (stats?.securityAlerts ?? 0) > 0 ? 'bg-amber-50' : 'bg-emerald-50' },
          { label: 'System Load', value: `${stats?.resourceUsage ?? 0}%`, icon: <Activity />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Global Uptime', value: stats?.systemUptime ?? '---', icon: <Zap />, color: 'text-[var(--color-gold)]', bg: 'bg-amber-50' },
          { label: 'Pending Audits', value: displayAlerts.length.toString(), icon: <Bell />, color: 'text-rose-500', bg: 'bg-rose-50' },
        ].map((kpi, i) => (
          <div key={i} className="card p-6 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center gap-5">
            <div className={`w-12 h-12 ${kpi.bg} ${kpi.color} rounded-xl flex items-center justify-center shadow-inner`}>
               {React.cloneElement(kpi.icon as React.ReactElement<any>, { size: 24 })}
            </div>
            <div>
              <div className="label-mono text-[9px] font-black uppercase tracking-widest text-slate-300 mb-0.5">{kpi.label}</div>
              <div className="text-2xl font-serif font-bold text-[var(--color-navy)] whitespace-nowrap">{kpi.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4 px-2">
           <div className="flex items-center gap-4">
              <h2 className="label-mono text-[10px] tracking-[0.2em] font-black text-[var(--color-navy)] opacity-60 uppercase">Sentinel Stream</h2>
              <div className="h-[1px] w-12 bg-slate-100"></div>
           </div>
           {isLoading && (
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[var(--color-gold)] uppercase tracking-widest animate-pulse">
                 <RefreshCw size={12} className="animate-spin" /> Live Syncing...
              </div>
           )}
        </div>

        {displayAlerts.map((alert: any, i: number) => (
          <div key={alert.id} className="card group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all relative">
            <div className={`absolute left-0 top-0 h-full w-1.5 ${
              alert.severity === 'CRITICAL' ? 'bg-rose-500' :
              alert.severity === 'HIGH' ? 'bg-amber-500' :
              alert.severity === 'MEDIUM' ? 'bg-[var(--color-gold)]' : 'bg-emerald-500'
            }`}></div>
            <div className="p-8 flex gap-8">
              <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner shrink-0">
                {alert.severity === 'CRITICAL' ? <ShieldAlert size={28} className="text-rose-500" /> :
                 alert.severity === 'HIGH' ? <AlertTriangle size={28} className="text-amber-500" /> :
                 alert.severity === 'MEDIUM' ? <Zap size={28} className="text-[var(--color-gold)]" /> :
                 <CheckCircle2 size={28} className="text-emerald-500" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${
                       alert.severity === 'CRITICAL' ? 'text-rose-500' :
                       alert.severity === 'HIGH' ? 'text-amber-500' : 'text-[var(--color-gold)]'
                    }`}>{alert.severity}</span>
                    <h3 className="text-xl font-serif font-bold text-[var(--color-navy)] tracking-tight">{alert.message}</h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest">
                    {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                   <Server size={12} className="text-slate-300" />
                   <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tight">System Infrastructure Hub</span>
                </div>
                <p className="text-[14px] leading-relaxed text-slate-500 italic font-medium mb-6 max-w-3xl">
                  "Formal system notification regarding {alert.message.toLowerCase()}. Infrastructure cluster reported anomaly at {new Date(alert.timestamp).toLocaleString()}."
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                   <button className="text-[10px] font-black text-[var(--color-navy)] opacity-0 group-hover:opacity-100 transition-all uppercase tracking-[0.2em] flex items-center gap-2 group/btn">
                     Initialize Diagnostic <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                   </button>
                   <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Protocol ID: 0x2A-{alert.id.substring ? alert.id.substring(0, 4) : i}</span>
                      <div className={`w-2 h-2 rounded-full transition-colors ${alert.acknowledged ? 'bg-slate-200' : 'bg-red-500 animate-pulse'}`}></div>
                   </div>
                </div>
              </div>
            </div>
            {/* Background Texture Effect */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-slate-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemAlerts;
