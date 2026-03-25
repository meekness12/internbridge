import React from 'react';
import { 
  Bell, 
  AlertTriangle, 
  ShieldAlert, 
  Zap, 
  Activity,
  ChevronRight,
  Settings,
  CheckCircle2,
  Server
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';

const SystemAlerts: React.FC = () => {
  const alerts = [
    { title: 'Incomplete Security Handshake', cluster: 'Production-01', type: 'CRITICAL', time: '12m ago', desc: 'Node-auth-2 reported 3 consecutive verification failures during protocol sync. Immediate audit recommended.', icon: <ShieldAlert className="text-rose-500" />, severity: 'border-l-rose-500' },
    { title: 'Database Threshold Breach', cluster: 'DB-Secondary', type: 'WARNING', time: '2h ago', desc: 'Storage consumption reached 92% on primary replica. Auto-expansion triggered but requires verification.', icon: <AlertTriangle className="text-amber-500" />, severity: 'border-l-amber-500' },
    { title: 'New Corporate Identity Proposal', cluster: 'Gov-API', type: 'SECURITY', time: '5h ago', desc: 'A new company "Innovate Lab" submitted a verification request with high-risk industry profile (MedTech).', icon: <Zap className="text-[var(--color-gold)]" />, severity: 'border-l-[var(--color-gold)]' },
    { title: 'Routine Snapshot Verification', cluster: 'Storage-Global', type: 'SYSTEM', time: 'Yesterday', desc: 'Daily backup cycle successfully verified and moved to deep-archive storage (AWS Glacier).', icon: <CheckCircle2 className="text-emerald-500" />, severity: 'border-l-emerald-500' },
    { title: 'Identity Migration Cycle', cluster: 'Core-Schema', type: 'SYSTEM', time: 'Yesterday', desc: 'Successfully migrated 1,200 legacy user profiles to the new Joined Inheritance structure.', icon: <Activity className="text-indigo-500" />, severity: 'border-l-indigo-500' },
  ];

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
          { label: 'Platform Status', value: 'Stable', icon: <CheckCircle2 />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'System Load', value: '42%', icon: <Activity />, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Latency Delta', value: '8ms', icon: <Zap />, color: 'text-[var(--color-gold)]', bg: 'bg-amber-50' },
          { label: 'Pending Audits', value: '14', icon: <Bell />, color: 'text-rose-500', bg: 'bg-rose-50' },
        ].map((kpi, i) => (
          <div key={i} className="card p-6 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center gap-5">
            <div className={`w-12 h-12 ${kpi.bg} ${kpi.color} rounded-xl flex items-center justify-center shadow-inner`}>
               {React.cloneElement(kpi.icon as React.ReactElement<any>, { size: 24 })}
            </div>
            <div>
              <div className="label-mono text-[9px] font-black uppercase tracking-widest text-slate-300 mb-0.5">{kpi.label}</div>
              <div className="text-2xl font-serif font-bold text-[var(--color-navy)]">{kpi.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-4 px-2">
           <h2 className="label-mono text-[10px] tracking-[0.2em] font-black text-[var(--color-navy)] opacity-60 uppercase">Sentinel Stream</h2>
           <div className="h-[1px] w-12 bg-slate-100"></div>
        </div>

        {alerts.map((alert, i) => (
          <div key={i} className="card group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all relative">
            <div className={`absolute left-0 top-0 h-full w-1.5 ${alert.severity}`}></div>
            <div className="p-8 flex gap-8">
              <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                {React.cloneElement(alert.icon as React.ReactElement<any>, { size: 28 })}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-gold)]">{alert.type}</span>
                    <h3 className="text-xl font-serif font-bold text-[var(--color-navy)] tracking-tight">{alert.title}</h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest">{alert.time}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                   <Server size={12} className="text-slate-300" />
                   <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tight">{alert.cluster}</span>
                </div>
                <p className="text-[14px] leading-relaxed text-slate-500 italic font-medium mb-6 max-w-3xl">
                  "{alert.desc}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                   <button className="text-[10px] font-black text-[var(--color-navy)] opacity-0 group-hover:opacity-100 transition-all uppercase tracking-[0.2em] flex items-center gap-2 group/btn">
                     Initialize Diagnostic <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                   </button>
                   <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Protocol ID: 0x2A-{i+1}42</span>
                      <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-[var(--color-gold)] transition-colors"></div>
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
