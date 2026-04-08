import React, { useState } from 'react';
import { 
  Users, 
  Download,
  Calendar,
  LayoutDashboard,
  Building,
  ArrowUpRight,
  ShieldCheck,
  Search,
  BookOpen,
  PieChart,
  Shield,
  Globe,
  Lock,
  ChevronRight,
  Target,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SupervisorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const userName = localStorage.getItem('userName') || 'Prof. Kwesi Mensah';

  const stats = [
    { label: 'Assigned Cohort', value: '18', icon: <Users size={16} /> },
    { label: 'Pending Reviews', value: '7', icon: <Clock size={16} /> },
    { label: 'Completion Rate', value: '92%', icon: <Target size={16} /> },
  ];

  const quickActions = [
    { label: 'Academic Reports', sub: 'Term summaries', icon: '📊', color: 'bg-emerald-light text-emerald' },
    { label: 'Audit Schedule', sub: 'Next: Monday', icon: '📅', color: 'bg-gold-light text-gold' }
  ];

  return (
    <div className="max-w-[1128px] mx-auto animate-fade-in pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Faculty Snap */}
        <div className="lg:col-span-3 space-y-4 sticky top-[100px] h-fit">
           <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="h-14 bg-[var(--color-forest)] w-full"></div>
              <div className="px-4 pb-4 -mt-7 text-center">
                 <div className="w-16 h-16 rounded-full border-4 border-white bg-[var(--color-gold)] mx-auto flex items-center justify-center text-white font-serif font-black text-xl shadow-md mb-3">
                    {userName.split(' ').map(n => n[0]).join('')}
                 </div>
                 <h3 className="text-base font-bold text-slate-900 tracking-tight">{userName}</h3>
                 <p className="text-xs text-slate-500 font-medium mb-4">Senior Supervisor · Faculty of CS</p>
                 <div className="pt-4 border-t border-slate-100 flex flex-col items-start gap-4">
                    <div className="flex justify-between w-full text-[11px] font-bold">
                       <span className="text-slate-500">Active Students</span>
                       <span className="text-[var(--color-forest)]">18</span>
                    </div>
                    <div className="flex justify-between w-full text-[11px] font-bold">
                       <span className="text-slate-500">Reviews Completed</span>
                       <span className="text-[var(--color-forest)]">124</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4 px-1">Supervision Metrics</h4>
              {stats.map((s, i) => (
                <div key={i} className="flex items-center gap-3 py-2 px-1 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group border-b border-slate-50 last:border-0">
                   <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[var(--color-forest)] transition-colors">
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

        {/* Middle Column: Student Roster Feed */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[var(--color-forest)]" size={18} />
                <input 
                  type="text" 
                  placeholder="Filter student cohort by name or industry..." 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-full text-sm outline-none focus:ring-1 focus:ring-[var(--color-forest)] transition-all transition-all"
                />
             </div>
          </div>

          <div className="flex items-center gap-2 py-2">
             <div className="h-px flex-1 bg-slate-200"></div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Direct Supervision Feed</span>
             <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          <div className="space-y-4">
             {[
               { id: '1', name: 'John Doe', company: 'AOS Ltd', progress: 85, status: 'On Track', industry: 'FinTech' },
               { id: '2', name: 'Sarah Linn', company: 'CloudSphere', progress: 12, status: 'Critical', industry: 'DevOps' },
               { id: '3', name: 'Kevin Hart', company: 'DataStream', progress: 100, status: 'Completed', industry: 'Data Science' },
             ].map((s, i) => (
               <div key={s.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all group animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flex justify-between items-start mb-6">
                     <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-lg bg-[var(--color-forest)] flex items-center justify-center text-white font-serif font-black text-xl shadow-lg group-hover:scale-105 transition-transform">
                          {s.name.charAt(0)}
                        </div>
                        <div>
                           <h4 className="text-base font-bold text-slate-900 group-hover:text-[var(--color-forest)] transition-colors leading-tight">{s.name}</h4>
                           <p className="text-sm text-slate-600 font-medium">{s.company}</p>
                           <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                                s.status === 'On Track' ? 'bg-emerald-50 text-emerald-600' : s.status === 'Critical' ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-500'
                              }`}>
                                {s.status}
                              </span>
                              <span className="text-slate-300">•</span>
                              <span className="uppercase tracking-widest text-[9px] font-bold">{s.industry}</span>
                           </div>
                        </div>
                     </div>
                     <button className="p-2 text-slate-300 hover:text-[var(--color-gold)] transition-colors">
                        <ArrowUpRight size={20} />
                     </button>
                  </div>

                  <div className="space-y-3 p-4 bg-slate-50 rounded-xl">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mastery Progression</span>
                        <span className="text-xs font-black text-[var(--color-forest)]">{s.progress}%</span>
                     </div>
                     <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${s.status === 'Critical' ? 'bg-rose-500' : 'bg-[var(--color-forest)]'}`} 
                          style={{ width: `${s.progress}%` }}
                        ></div>
                     </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 mt-2 border-t border-slate-50">
                     <div className="text-[11px] text-slate-500 font-medium">Last logbook review: 2 days ago</div>
                     <button className="px-5 py-2 bg-white border-2 border-[var(--color-forest)] text-[var(--color-forest)] rounded-full text-xs font-black uppercase tracking-widest hover:bg-[var(--color-forest)] hover:text-white transition-all shadow-sm">
                        Review Logs
                     </button>
                  </div>
               </div>
             ))}
          </div>
        </div>

        {/* Right Column: Administration */}
        <div className="lg:col-span-3 space-y-4 sticky top-[100px] h-fit">
           <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-6 px-1">Management Hub</h4>
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
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4 px-1">Audit Stream</h4>
              <div className="space-y-4">
                 {[
                   { t: 'John Doe: Mid-term Audit', d: 'Due tomorrow', c: 'border-rose-200' },
                   { t: 'Sarah Linn: Site Visit', d: 'Scheduled Oct 12', c: 'border-gold-200' },
                 ].map((a, i) => (
                   <div key={i} className={`p-3 rounded-lg border-l-4 ${a.c} bg-slate-50`}>
                      <div className="text-[11px] font-bold text-slate-800 leading-tight">{a.t}</div>
                      <div className="text-[9px] text-slate-500 mt-1 font-black uppercase">{a.d}</div>
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

export default SupervisorDashboard;
