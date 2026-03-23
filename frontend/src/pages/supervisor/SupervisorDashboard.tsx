import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Download,
  Calendar,
  LayoutDashboard,
  Building
} from 'lucide-react';
import { PremiumCard } from '../../components/ui/PremiumCard';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import { PremiumTimeline } from '../../components/ui/PremiumTimeline';
import { PremiumActionGrid } from '../../components/ui/PremiumActionGrid';

const SupervisorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Assigned Cohort', value: '18', trend: '↑ 4 New this term', icon: '🎓', color: 'ki-1', kpiColor: 'kpi-1' },
    { label: 'Evaluations Pending', value: '7', trend: 'Due by Friday', icon: '📋', color: 'ki-2', kpiColor: 'kpi-2' },
    { label: 'Active Placements', value: '12', trend: '↑ 15% from last month', icon: '💼', color: 'ki-3', kpiColor: 'kpi-3' },
    { label: 'Archive Records', value: '42', trend: '2023-24 Academic Year', icon: '📚', color: 'ki-4', kpiColor: 'kpi-4' },
    { label: 'Engagement Rate', value: '92%', trend: '↑ 4% vs last cycle', icon: '✅', color: 'ki-5', kpiColor: 'kpi-5' },
  ];

  const timelineItems = [
    { title: 'Marcus Wright submitted Week 8 logbook', meta: '5 minutes ago · TechWave Attaché', body: 'Tasks: Spring Boot integration, entity mapping — awaiting evaluation.', color: 'var(--color-navy)' },
    { title: 'Dr. Asante approved James Nkrumah request', meta: '2 hours ago · Academic Admin', body: 'Placement shift from IT to DevOps department at DataStream approved.', color: 'var(--color-gold)' },
    { title: 'New logbook entry from Aisha Ibrahim', meta: '4 hours ago · Techwave Technologies', body: 'Daily log 49: JWT Implementation. Attendance verified by industry supervisor.', color: 'var(--color-indigo)' },
    { title: 'Placement Contract INT-2024-00849 finalized', meta: 'Yesterday · System', body: 'Final academic sign-off received for Kwame Mensah. Term officially started.', color: '#15803d' }
  ];

  const quickActions = [
    { label: 'Grade Log', sub: '7 pending', icon: '📝', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Schedule', sub: 'Cohort sync', icon: '🗓️', color: 'bg-gold-light text-[var(--color-gold)]' },
    { label: 'Student Chat', sub: '3 messages', icon: '💬', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Reports', sub: 'Term summaries', icon: '📊', color: 'bg-blue-50 text-blue-600' }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Faculty Administration"
        title="Supervision"
        italicTitle="Portal"
        subtitle="Tuesday, 13 February 2024 · Trinity Term 2024"
        eyebrowColor="text-[var(--color-gold)]"
        primaryAction={
          <button className="btn btn-primary btn-sm bg-[var(--color-navy)] text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            Grading Queue <span className="bg-white/20 px-2 py-0.5 rounded-full text-[9px] font-black">7</span>
          </button>
        }
        secondaryAction={
          <button className="btn btn-gold btn-sm bg-[var(--color-gold)] text-[var(--color-navy)] px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            <Calendar size={16} /> Schedule Session
          </button>
        }
        additionalActions={
          <button className="btn btn-ghost btn-sm border border-slate-200 bg-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            <Download size={14} /> Export Archive
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
          { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={14} /> },
          { id: 'students', label: 'My Students', icon: <Users size={14} /> },
          { id: 'grading', label: 'Evaluation', icon: <BookOpen size={14} />, badge: '7' },
          { id: 'placements', label: 'Placements', icon: <Building size={14} /> },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)} 
            className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-[var(--color-navy)] text-white shadow-md' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            {tab.icon} {tab.label} {tab.badge && <span className={`px-1.5 py-0.5 rounded text-[10px] ${activeTab === tab.id ? 'bg-white/20' : 'bg-rose-50 text-rose-600'}`}>{tab.badge}</span>}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 xl:col-span-4 card bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <div>
              <div className="text-[13px] font-bold text-[var(--color-navy)]">Student Submission Activity</div>
              <div className="text-[10px] text-slate-400 font-medium">Average logs per week · Cohort 2024</div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest">A+ Rating</span>
          </div>
          <div className="p-8 flex-1">
            <div className="h-40 flex items-end gap-3 mb-8">
              {[
                { label: 'W1', h1: 40, h2: 30 }, { label: 'W2', h1: 55, h2: 25 }, { label: 'W3', h1: 65, h2: 20 },
                { label: 'W4', h1: 75, h2: 15 }, { label: 'W5', h1: 45, h2: 40, special: true },
                { label: 'W6', h1: 20, h2: 10, dim: true }, { label: 'W7', h1: 0, h2: 0, dim: true },
              ].map((week, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                  <div className={`w-full flex flex-col-reverse rounded-sm overflow-hidden h-32 ${week.dim ? 'opacity-20' : ''}`}>
                    <div style={{ height: `${week.h1}%` }} className={week.special ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-navy)]'}></div>
                    <div style={{ height: `${week.h2}%` }} className={week.special ? 'bg-[#FBF0DC]' : 'bg-[#D2E0D5]'}></div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-300 uppercase">{week.label}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 pt-4 border-t border-slate-50">
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                 <div className="w-2.5 h-2.5 bg-[var(--color-navy)] rounded-sm"></div> Submitted
               </div>
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                 <div className="w-2.5 h-2.5 bg-[#D2E0D5] rounded-sm"></div> Graded
               </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 xl:col-span-4 card bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
           <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <div>
              <div className="text-[13px] font-bold text-[var(--color-navy)]">Active Supervision</div>
              <div className="text-[10px] text-slate-400 font-medium">Assigned students · Semester 2</div>
            </div>
            <button className="text-[10px] font-bold text-[var(--color-gold)] uppercase tracking-widest hover:underline">Full Roster</button>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { avatar: 'JD', name: 'John Doe', company: 'AOS Ltd', status: 'Active', progress: 85 },
              { avatar: 'SL', name: 'Sarah Linn', company: 'CloudSphere', status: 'Pending', progress: 12 },
              { avatar: 'KH', name: 'Kevin Hart', company: 'DataStream', status: 'Completed', progress: 100 },
              { avatar: 'MW', name: 'Marcus Wright', company: 'TechWave', status: 'Review', progress: 64 }
            ].map((s, i) => (
              <div key={i} className="p-5 flex items-center gap-4 hover:bg-slate-50 cursor-pointer transition-all">
                 <div className="w-10 h-10 bg-slate-100 border border-white rounded-full flex items-center justify-center text-[var(--color-navy)] font-bold text-xs shadow-sm">{s.avatar}</div>
                 <div className="flex-1 min-w-0">
                   <div className="flex items-center justify-between mb-0.5">
                     <span className="text-[9px] font-mono font-bold text-slate-300 uppercase">#052-{i+100}</span>
                     <span className={`text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border ${
                       s.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                       s.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                       s.status === 'Completed' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                       'bg-slate-50 text-slate-400 border-slate-100'
                     }`}>{s.status}</span>
                   </div>
                   <div className="text-sm font-bold text-[var(--color-navy)] truncate">{s.name}</div>
                   <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--color-forest)] rounded-full" style={{ width: `${s.progress}%` }}></div>
                      </div>
                      <span className="text-[9px] font-mono text-slate-400">{s.progress}%</span>
                   </div>
                 </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 xl:col-span-4 space-y-6">
           <PremiumActionGrid title="Quick Actions" items={quickActions} />
           <div className="card bg-[var(--color-navy)] text-white border-0 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                   <div className="h-4 w-1 bg-[var(--color-gold)] rounded-full"></div>
                   <span className="text-[10px] font-mono font-bold text-[var(--color-gold)] uppercase tracking-[0.2em]">Governance Insight</span>
                </div>
                <h3 className="text-2xl font-serif mb-4 leading-tight">Cohort Performance <em className="italic text-slate-400">High</em></h3>
                <p className="text-white/40 text-[11px] leading-relaxed mb-6">Logbook engagement is up 15%. Recommended to schedule mid-term reviews.</p>
                <button className="w-full py-3 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all">Open Advanced Analytics</button>
              </div>
           </div>
        </div>

        <div className="lg:col-span-12">
           <PremiumTimeline 
             title="Supervision Activity"
             subtitle="Audit log · Last 48 hours"
             items={timelineItems}
           />
        </div>
      </div>
    </div>
  );
};

export default SupervisorDashboard;
