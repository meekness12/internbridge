import React from 'react';
import { 
  Building2, 
  Settings,
  ShieldCheck,
  ArrowUpRight,
  Target,
  Shield,
  Globe,
  Lock,
  ChevronRight
} from 'lucide-react';


const SchoolAdminDashboard: React.FC = () => {
  const institutionName = localStorage.getItem('institution') || 'Central University College';

  const stats = [
    { label: 'Total Enrollment', value: '1,280', icon: <Target size={16} /> },
    { label: 'Industry Partners', value: '42', icon: <Building2 size={16} /> },
    { label: 'Global Compliance', value: '94.2%', icon: <ShieldCheck size={16} /> },
  ];

  const quickActions = [
    { label: 'Audit Queue', sub: '14 reviews', icon: '🛡️', color: 'bg-rose-light text-rose-600' },
    { label: 'Faculty List', sub: 'Manage staff', icon: '🏢', color: 'bg-indigo-light text-indigo' },
    { label: 'Institutional Reports', sub: 'Export PDF', icon: '📄', color: 'bg-emerald-light text-emerald-600' }
  ];

  return (
    <div className="max-w-[1128px] mx-auto animate-fade-in pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Institutional Identity */}
        <div className="lg:col-span-3 space-y-4 sticky top-[100px] h-fit">
           <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="h-14 bg-[var(--color-forest)] w-full"></div>
              <div className="px-4 pb-4 -mt-7 text-center">
                 <div className="w-16 h-16 rounded-full border-4 border-white bg-indigo-600 mx-auto flex items-center justify-center text-white font-serif font-black text-xl shadow-md mb-3">
                    {institutionName.split(' ').map(n => n[0]).join('')}
                 </div>
                 <h3 className="text-base font-bold text-slate-900 tracking-tight">{institutionName}</h3>
                 <p className="text-xs text-slate-500 font-medium mb-4">Institutional Registry · Ghana</p>
                 <div className="pt-4 border-t border-slate-100 flex flex-col items-start gap-4">
                    <div className="flex justify-between w-full text-[11px] font-bold">
                       <span className="text-slate-500">Placement Rate</span>
                       <span className="text-[var(--color-forest)]">86%</span>
                    </div>
                    <div className="flex justify-between w-full text-[11px] font-bold">
                       <span className="text-slate-500">Industry Nodes</span>
                       <span className="text-[var(--color-forest)]">42</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4 px-1">Global Health</h4>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-0">
                {stats.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 px-1 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group border-b border-slate-50 lg:last:border-0">
                     <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[var(--color-forest)] transition-colors shrink-0">
                        {s.icon}
                     </div>
                     <div className="min-w-0">
                        <div className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1 truncate">{s.label}</div>
                        <div className="text-xs font-bold text-slate-700 leading-none">{s.value}</div>
                     </div>
                  </div>
                ))}
              </div>
           </div>
        </div>

        {/* Middle Column: Faculty Compliance Feed */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
             <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                   <div className="w-1.5 h-6 bg-[var(--color-gold)] rounded-full"></div>
                   <h3 className="text-base font-bold text-slate-900">Faculty Compliance Index</h3>
                </div>
                <button className="text-[10px] font-bold text-[var(--color-gold)] uppercase tracking-widest hover:underline">Full Analytics</button>
             </div>
          </div>

          <div className="flex items-center gap-2 py-2">
             <div className="h-px flex-1 bg-slate-200"></div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Governance & Oversight</span>
             <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          <div className="grid grid-cols-1 gap-4">
             {[
               { name: 'Computer Science', compliance: 92, students: 450, status: 'Stable' },
               { name: 'Mechanical Engineering', compliance: 78, students: 320, status: 'Review Required' },
               { name: 'Business Administration', compliance: 88, students: 510, status: 'Stable' },
               { name: 'Architecture', compliance: 64, students: 180, status: 'Critical' },
             ].map((f, i) => (
               <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all group animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flex justify-between items-start mb-6">
                     <div className="flex gap-4">
                        <div className={`w-12 h-12 rounded-lg ${f.compliance > 90 ? 'bg-[var(--color-forest)]' : f.compliance > 70 ? 'bg-[var(--color-gold)]' : 'bg-rose-600'} flex items-center justify-center text-white font-serif font-black text-xl shadow-lg transition-transform group-hover:scale-110`}>
                          {f.name.charAt(0)}
                        </div>
                        <div>
                           <h4 className="text-base font-bold text-slate-900 group-hover:text-[var(--color-forest)] transition-colors leading-tight">{f.name}</h4>
                           <p className="text-xs text-slate-500 font-medium mt-1">{f.students} Enrolled · <span className={f.compliance > 70 ? 'text-emerald-600' : 'text-rose-600'}>{f.status}</span></p>
                        </div>
                     </div>
                     <button className="p-2 text-slate-200 hover:text-[var(--color-gold)] transition-colors">
                        <ArrowUpRight size={20} />
                     </button>
                  </div>

                  <div className="space-y-3">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Administrative Compliance</span>
                        <span className="text-xs font-black text-slate-700">{f.compliance}%</span>
                     </div>
                     <div className="h-2 w-full bg-slate-50 rounded-full border border-slate-100 overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${f.compliance > 90 ? 'bg-[var(--color-forest)]' : f.compliance > 70 ? 'bg-[var(--color-gold)]' : 'bg-rose-500'}`} 
                          style={{ width: `${f.compliance}%` }}
                        ></div>
                     </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 mt-2 border-t border-slate-100">
                     <div className="flex items-center gap-4">
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Audit v2.1</div>
                        <div className="text-[10px] text-slate-400 font-medium">Updated 3h ago</div>
                     </div>
                     <button className="px-5 py-2 bg-white border-2 border-slate-200 text-slate-600 rounded-full text-xs font-black uppercase tracking-widest hover:border-[var(--color-forest)] hover:text-[var(--color-forest)] transition-all shadow-sm">
                        Audit Logs
                     </button>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Right Column: Coordination */}
        <div className="lg:col-span-3 space-y-4 sticky top-[100px] h-fit">
           <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-6 px-1">Coordination Center</h4>
              <div className="space-y-3">
                 {quickActions.map((action, i) => (
                   <button key={i} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                      <div className="flex items-center gap-3 text-left">
                        <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center text-xl shadow-sm`}>
                          {action.icon}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800">{action.label}</div>
                          <div className="text-[10px] text-slate-500 font-medium">{action.sub}</div>
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-[var(--color-gold)] transition-all" />
                   </button>
                 ))}
              </div>
           </div>

           <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4 px-1 flex items-center justify-between">
                Institutional Stream <Settings size={14} className="text-slate-300" />
              </h4>
              <div className="space-y-4">
                 {[
                   { t: 'Techwave MoU Signed', d: '45m ago', color: 'bg-[var(--color-forest)]' },
                   { t: 'Yearly Audit Ready', d: '3h ago', color: 'bg-[var(--color-gold)]' },
                   { t: 'Compliance Alert: CS', d: 'Yesterday', color: 'bg-rose-500' },
                 ].map((s, i) => (
                   <div key={i} className="flex gap-4 group cursor-pointer">
                      <div className={`w-1 h-10 ${s.color} rounded-full shrink-0`}></div>
                      <div>
                        <div className="text-[12px] font-bold text-slate-800 group-hover:underline">{s.t}</div>
                        <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{s.d}</div>
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

export default SchoolAdminDashboard;
