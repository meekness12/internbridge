import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  Search, 
  Plus,
  LayoutDashboard,
  CheckCircle2,
  Bell,
  Download
} from 'lucide-react';
import { PremiumCard } from '../../components/ui/PremiumCard';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import { PremiumTimeline } from '../../components/ui/PremiumTimeline';
import { PremiumActionGrid } from '../../components/ui/PremiumActionGrid';

const CompanyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Active Interns', value: '12', trend: '↑ 2 from last month', icon: '👤', color: 'ki-1', kpiColor: 'kpi-1' },
    { label: 'New Applicants', value: '34', trend: '12 need review today', icon: '📩', color: 'ki-2', kpiColor: 'kpi-2' },
    { label: 'Verified Tasks', value: '840', trend: '↑ 15% overall velocity', icon: '✅', color: 'ki-3', kpiColor: 'kpi-3' },
    { label: 'Company Rating', value: '4.9', trend: 'Top 5% of partners', icon: '⭐', color: 'ki-4', kpiColor: 'kpi-4' },
    { label: 'Open Roles', value: '4', trend: '2 expires this week', icon: '💼', color: 'ki-5', kpiColor: 'kpi-5' },
  ];

  const timelineItems = [
    { title: 'John Doe submitted Week 12 logbook', meta: '2 hours ago · Backend Engineering', body: 'Tasks: AWS S3 integration, Unit testing — awaiting verification.', color: 'var(--color-navy)' },
    { title: 'Sarah Linn application received', meta: '5 hours ago · UI/UX Design', body: 'Candidate for Summer 2024 placement. Portfolio score: 9.4/10.', color: 'var(--color-gold)' },
    { title: 'Tech meeting scheduled with interns', meta: 'Yesterday · Admin', body: 'Quarterly review and mentorship session. Attendance mandatory.', color: 'var(--color-indigo)' },
    { title: 'Placement finalized for Kevin Hart', meta: '2 days ago · System', body: 'Contract signed by institutional head. Term starts next Monday.', color: '#15803d' }
  ];

  const quickActions = [
    { label: 'Post Role', sub: 'New placement', icon: '➕', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Verify Logs', sub: '8 pending', icon: '📄', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Review Apps', sub: '12 new', icon: '👤', color: 'bg-amber-50 text-amber-600' },
    { label: 'Feedback', sub: 'Student reviews', icon: '💬', color: 'bg-blue-50 text-blue-600' }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Corporate Administration"
        title="Techwave"
        italicTitle="Technologies"
        subtitle="Tuesday, 13 February 2024 · Premium Partner Since 2022"
        eyebrowColor="text-[var(--color-gold)]"
        primaryAction={
          <button className="btn btn-primary btn-sm bg-[var(--color-navy)] text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            Post New Role <Plus size={16} />
          </button>
        }
        secondaryAction={
          <button className="btn btn-gold btn-sm bg-[var(--color-gold)] text-[var(--color-navy)] px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            Verification Queue <span className="bg-white/20 px-2 py-0.5 rounded-full text-[9px] font-black">8</span>
          </button>
        }
        additionalActions={
          <button className="btn btn-ghost btn-sm border border-slate-200 bg-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            <Search size={16} /> Search Interns
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
          { id: 'interns', label: 'My Interns', icon: <Users size={14} />, badge: '12' },
          { id: 'applicants', label: 'Applicants', icon: <Briefcase size={14} />, badge: '34' },
          { id: 'logs', label: 'Logbooks', icon: <CheckCircle2 size={14} />, badge: '8' },
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
              <div className="text-[13px] font-bold text-[var(--color-navy)]">Weekly Task Verification</div>
              <div className="text-[10px] text-slate-400 font-medium">Verified vs. Pending tasks</div>
            </div>
            <Bell size={14} className="text-slate-200" />
          </div>
          <div className="p-8 flex-1">
            <div className="h-40 flex items-end gap-3 mb-8">
              {[
                { label: 'Mon', h1: 40, h2: 20 }, { label: 'Tue', h1: 60, h2: 12 }, { label: 'Wed', h1: 45, h2: 35 },
                { label: 'Thu', h1: 85, h2: 20, special: true }, { label: 'Fri', h1: 30, h2: 40 },
                { label: 'Sat', h1: 15, h2: 10, dim: true }, { label: 'Sun', h1: 0, h2: 0, dim: true }
              ].map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                  <div className={`w-full flex flex-col-reverse rounded-sm overflow-hidden h-32 ${day.dim ? 'opacity-20' : ''}`}>
                    <div style={{ height: `${day.h1}%` }} className={day.special ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-forest)]'}></div>
                    <div style={{ height: `${day.h2}%` }} className={day.special ? 'bg-[#FBF0DC]' : 'bg-[#EAF0EC]'}></div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-300 uppercase">{day.label}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-1.5 pt-4 border-t border-slate-50">
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 mr-2"><div className="w-2 h-2 bg-[var(--color-forest)] rounded-full"></div> Verified</div>
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 mr-2"><div className="w-2 h-2 bg-[#EAF0EC] rounded-full"></div> Pending</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 xl:col-span-4 card bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
           <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <div><div className="text-[13px] font-bold text-[var(--color-navy)]">Department Breakdown</div></div>
            <span className="text-[10px] font-mono font-bold text-slate-300">Cohort 2024</span>
          </div>
          <div className="p-6 space-y-5">
            {[
              { label: 'Backend Eng.', value: '45%', color: 'bg-[var(--color-navy)]' },
              { label: 'UI/UX Design', value: '30%', color: 'bg-[var(--color-gold)]' },
              { label: 'DevOps', value: '15%', color: 'bg-[#D2E0D5]' },
              { label: 'Data Science', value: '10%', color: 'bg-slate-100' }
            ].map((d, i) => (
              <div key={i}>
                <div className="flex justify-between text-[11px] font-bold mb-1.5 text-slate-600">
                  <span>{d.label}</span>
                  <span>{d.value}</span>
                </div>
                <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                  <div className={`h-full ${d.color} rounded-full`} style={{ width: d.value }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 xl:col-span-4 space-y-6">
           <PremiumActionGrid title="Quick Actions" items={quickActions} />
           <div className="card bg-[var(--color-gold)] text-[var(--color-navy)] border-0 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 text-center">
                 <h3 className="text-2xl font-serif mb-4 leading-tight">Need More <br /><em className="font-normal italic opacity-60">Talent?</em></h3>
                 <p className="text-[var(--color-navy)]/60 text-[11px] leading-relaxed mb-6">Reach over 2,000 top-tier students from 15 regional universities.</p>
                 <button className="w-full bg-[var(--color-navy)] text-white py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-black/10">Post New Role Now</button>
              </div>
           </div>
        </div>

        <div className="lg:col-span-12">
            <PremiumTimeline 
              title="Recent Activity"
              subtitle="Industry context · Logbook summaries"
              items={timelineItems}
            />
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
