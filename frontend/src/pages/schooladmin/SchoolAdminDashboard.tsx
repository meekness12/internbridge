import React, { useState } from 'react';
import { 
  Building2, 
  Settings,
  LayoutDashboard,
  ShieldCheck,
  Building,
  Download,
  FileText
} from 'lucide-react';
import { PremiumCard } from '../../components/ui/PremiumCard';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import { PremiumTimeline } from '../../components/ui/PremiumTimeline';
import { PremiumActionGrid } from '../../components/ui/PremiumActionGrid';

const SchoolAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Students', value: '1,280', trend: '↑ 12% from last sem', icon: '🎓', color: 'ki-1', kpiColor: 'kpi-1' },
    { label: 'Partner Companies', value: '42', trend: '↑ 4 new since Jan', icon: '🏢', color: 'ki-2', kpiColor: 'kpi-2' },
    { label: 'Placement Rate', value: '86%', trend: '↑ 5% above target', icon: '📈', color: 'ki-5', kpiColor: 'kpi-5' },
    { label: 'System Reviews', value: '14', trend: '— 3 pending approval', icon: '🛡️', color: 'ki-3', kpiColor: 'kpi-3' },
    { label: 'Active Reports', value: '28', trend: 'Updated today', icon: '📄', color: 'ki-4', kpiColor: 'kpi-4' },
  ];

  const timelineItems = [
    { title: 'New MoU Signed: Techwave Technologies', meta: '45 minutes ago · Industry Partnerships', body: 'Exclusive internship placement partnership established for the Faculty of Engineering.', color: 'var(--color-navy)' },
    { title: 'Semester 2 Audit Report Generated', meta: '3 hours ago · System · Automated', body: 'Placement and logbook compliance report for all departments is ready for review.', color: 'var(--color-gold)' },
    { title: 'Faculty Access Review: Computer Science', meta: '6 hours ago · Security · Daniel Owusu', body: 'Annual review of lecturer and supervisor role permissions completed.', color: 'var(--color-indigo)' },
    { title: 'System Health: Internal Portal v2.4.2', meta: 'Yesterday · Global Admin', body: 'Academic calendar sync successful. All students and supervisors updated.', color: '#15803d' }
  ];

  const quickActions = [
    { label: 'Reports', sub: 'Semester audit', icon: '📄', color: 'bg-indigo-50 text-indigo-600' },
    { label: 'Partners', sub: 'Industry list', icon: '🏢', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Settings', sub: 'Portal access', icon: '⚙️', color: 'bg-amber-50 text-amber-600' },
    { label: 'Analytics', sub: 'Long-term trends', icon: '📊', color: 'bg-blue-50 text-blue-600' }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Institutional Oversight"
        title="School"
        italicTitle="Administration"
        subtitle="Central University College · Academic Year 2023/2024"
        eyebrowColor="text-[var(--color-navy)]"
        primaryAction={
          <button className="btn btn-primary btn-sm bg-[var(--color-navy)] text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            Audit Queue <span className="bg-white/20 px-2 py-0.5 rounded-full text-[9px] font-black">14</span>
          </button>
        }
        secondaryAction={
          <button className="btn btn-gold btn-sm bg-[var(--color-gold)] text-[var(--color-navy)] px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            <Settings size={16} /> Portal Settings
          </button>
        }
        additionalActions={
          <button className="btn btn-ghost btn-sm border border-slate-200 bg-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            <FileText size={16} /> Semester Report
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
          { id: 'overview', label: 'Analytics', icon: <LayoutDashboard size={14} /> },
          { id: 'departments', label: 'Faculties', icon: <Building size={14} /> },
          { id: 'compliance', label: 'Compliance', icon: <ShieldCheck size={14} />, badge: '14' },
          { id: 'partners', label: 'Partners', icon: <Building2 size={14} /> },
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
              <div className="text-[13px] font-bold text-[var(--color-navy)]">Faculty Placement Trends</div>
              <div className="text-[10px] text-slate-400 font-medium">Cycle comparison · All Departments</div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest">Growth +5%</span>
          </div>
          <div className="p-8 flex-1">
            <div className="h-40 flex items-end gap-3 mb-8">
              {[
                { label: 'CS', h1: 85, h2: 15 }, { label: 'ENG', h1: 72, h2: 28 }, { label: 'BUS', h1: 90, h2: 10 },
                { label: 'ART', h1: 65, h2: 35 }, { label: 'MED', h1: 95, h2: 5, special: true },
                { label: 'LAW', h1: 50, h2: 20, dim: true }, { label: 'SCI', h1: 40, h2: 30, dim: true },
              ].map((dept, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-3">
                  <div className={`w-full flex flex-col-reverse rounded-sm overflow-hidden h-32 ${dept.dim ? 'opacity-20' : ''}`}>
                    <div style={{ height: `${dept.h1}%` }} className={dept.special ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-navy)]'}></div>
                    <div style={{ height: `${dept.h2}%` }} className={dept.special ? 'bg-[#FBF0DC]' : 'bg-[#D2E0D5]'}></div>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-300 uppercase">{dept.label}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-4 pt-4 border-t border-slate-50">
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                 <div className="w-2.5 h-2.5 bg-[var(--color-navy)] rounded-sm"></div> Placed
               </div>
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                 <div className="w-2.5 h-2.5 bg-[#D2E0D5] rounded-sm"></div> Ongoing
               </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 xl:col-span-4 card bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
           <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <div><div className="text-[13px] font-bold text-[var(--color-navy)]">Faculty Oversight</div></div>
            <button className="text-[10px] font-bold text-[var(--color-gold)] uppercase tracking-widest hover:underline">Accreditation</button>
          </div>
          <div className="divide-y divide-slate-50">
            {[
              { name: 'Computer Science', students: 450, placements: '92%', status: 'Stable', color: 'emerald' },
              { name: 'Mechanical Eng.', students: 320, placements: '78%', status: 'Review', color: 'amber' },
              { name: 'Business Admin', students: 510, placements: '88%', status: 'Stable', color: 'emerald' },
              { name: 'Architecture', students: 180, placements: '64%', status: 'Alert', color: 'rose' }
            ].map((f, i) => (
              <div key={i} className="p-5 flex items-center gap-4 hover:bg-slate-50 cursor-pointer transition-all">
                 <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-xs shadow-sm">{f.name.charAt(0)}</div>
                 <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] font-mono font-bold text-slate-300 uppercase tracking-widest">{f.students} Students</span>
                      <span className={`text-[8px] font-black uppercase tracking-tighter px-1.5 py-0.5 rounded border ${
                        f.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        f.color === 'amber' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                      }`}>{f.status}</span>
                    </div>
                    <div className="text-sm font-bold text-[var(--color-navy)] truncate">{f.name}</div>
                 </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 xl:col-span-4 space-y-6">
           <PremiumActionGrid title="Coordination Center" items={quickActions} />
           <div className="card bg-[var(--color-forest)] text-white border-0 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                   <div className="h-4 w-1 bg-[var(--color-gold)] rounded-full"></div>
                   <span className="text-[10px] font-mono font-bold text-[var(--color-gold)] uppercase tracking-[0.2em]">Compliance Shield</span>
                </div>
                <h3 className="text-2xl font-serif mb-4 leading-tight">Institutional <em className="italic text-slate-400">Quality</em></h3>
                <p className="text-white/40 text-[11px] leading-relaxed mb-6">Compliance score is currently 94.2%. Maintain verification standards.</p>
                <button className="w-full py-3 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all">Initiate Audit Review</button>
              </div>
           </div>
        </div>

        <div className="lg:col-span-12">
           <PremiumTimeline 
             title="Institutional Activity"
             subtitle="Academic & Administrative events · Last 24 hours"
             items={timelineItems}
           />
        </div>
      </div>
    </div>
  );
};

export default SchoolAdminDashboard;
