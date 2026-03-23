import React from 'react';
import { 
  Users,
  Clock,
  Check,
  TrendingUp,
  MapPin,
  Calendar,
  Briefcase,
  Search,
  Plus
} from 'lucide-react';
import { PremiumCard } from '../../components/ui/PremiumCard';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import { PremiumTimeline } from '../../components/ui/PremiumTimeline';

const InternDashboard: React.FC = () => {
  const stats = [
    { label: 'Active Applications', value: '4', trend: '↑ 2 this week', icon: '📩', color: 'ki-1', kpiColor: 'kpi-1' },
    { label: 'Hours Logged', value: '128', trend: 'Week 7 of 16', icon: '⏱️', color: 'ki-2', kpiColor: 'kpi-2' },
    { label: 'Milestones', value: '12', trend: '↑ 3 new badges', icon: '🏆', color: 'ki-4', kpiColor: 'kpi-4' },
    { label: 'Placements', value: '1', trend: 'Techwave Technologies', icon: '💼', color: 'ki-3', kpiColor: 'kpi-3' },
    { label: 'Compliance', value: '98%', trend: 'Elite Standing', icon: '✅', color: 'ki-5', kpiColor: 'kpi-5' },
  ];

  const timelineItems = [
    { title: 'Logbook Entry Approved (Week 6)', meta: '2 hours ago · Prof. Samuel Mensah', body: 'Your documentation on JWT Implementation was verified. "Excellent technical depth."', color: 'var(--color-navy)' },
    { title: 'New Opportunity: CloudSphere', meta: '5 hours ago · Matches your skills', body: 'Backend Engineering Intern – Java / Spring. 4 miles from your location.', color: 'var(--color-gold)' },
    { title: 'Contract Signed: Techwave Technologies', meta: 'Yesterday · System', body: 'Placement officially active. Term: Feb 2024 — May 2024.', color: 'var(--color-indigo)' },
    { title: 'Milestone Reached: 100 Hours Logged', meta: '2 days ago · Achievement', body: 'You have surpassed 100 hours of industry engagement. Badge awarded.', color: '#15803d' }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Student Dashboard"
        title="Good morning,"
        italicTitle="Aisha"
        subtitle={`Tuesday, 13 February 2024 · Week 7 of 16 · Trinity Term`}
        eyebrowColor="text-[var(--color-gold)]"
        primaryAction={
          <button className="btn btn-primary btn-sm bg-[var(--color-navy)] text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            Log Today's Tasks <Plus size={16} />
          </button>
        }
        secondaryAction={
          <button className="btn btn-gold btn-sm bg-[var(--color-gold)] text-[var(--color-navy)] px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            My Portfolio <span className="bg-white/20 px-2 py-0.5 rounded-full text-[9px] font-black">12</span>
          </button>
        }
      />

      <div className="flex flex-wrap gap-3">
        {['All Activity', 'Placements', 'Logbooks', 'Contracts', 'Milestones'].map((tab, i) => (
          <button key={i} className={`filter-chip ${i === 0 ? 'active' : ''}`}>{tab}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <PremiumCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interaction Center */}
        <div className="lg:col-span-8 space-y-6">
           <div className="card p-6 flex items-center gap-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
             <div className="w-12 h-12 bg-[var(--color-forest)] rounded-full flex items-center justify-center text-[var(--color-gold)] font-bold shrink-0 shadow-inner">AI</div>
             <div className="flex-1 relative">
               <input 
                 type="text" 
                 placeholder="Log today's tasks, share a milestone..." 
                 className="w-full bg-slate-50 border-none rounded-full py-3 px-6 text-sm placeholder:text-slate-400 focus:ring-1 focus:ring-[var(--color-gold)] transition-all outline-none"
               />
               <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                  <button className="p-1.5 hover:bg-slate-200 rounded-full transition-colors text-slate-400"><Calendar size={14} /></button>
                  <button className="p-1.5 hover:bg-slate-200 rounded-full transition-colors text-slate-400"><MapPin size={14} /></button>
               </div>
             </div>
           </div>

           <div className="card p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">TW</div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-lg text-[var(--color-navy)]">Techwave Technologies</h3>
                    <span className="badge badge-forest text-[9px] py-1 px-2.5 font-bold flex items-center gap-1.5 rounded-full">
                      <span className="w-1.5 h-1.5 bg-[var(--color-gold)] rounded-full"></span> Actively Hiring
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">Engineering Company · 2h ago</p>
                </div>
              </div>
              <button className="btn btn-ghost btn-sm border border-slate-200 px-4 py-2 rounded-full text-[10px] font-bold uppercase flex items-center gap-2 tracking-widest hover:bg-slate-50">
                <Check size={14} className="text-emerald-600" /> Following
              </button>
            </div>
            <p className="text-slate-600 leading-relaxed mb-8 max-w-2xl">
              We're opening <strong className="text-[var(--color-navy)] font-bold">4 internship positions</strong> for the upcoming semester. Our interns ship real production code from week one.
            </p>
            <div className="editorial-banner p-10 text-white rounded-2xl relative overflow-hidden group border border-white/5 shadow-2xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl group-hover:bg-yellow-400/10 transition-colors"></div>
               <div className="label-mono-accent text-[9px] tracking-[0.3em] mb-4 opacity-50 uppercase font-bold text-[var(--color-gold)]">BACKEND ENGINEERING • INTERNSHIP</div>
               <h2 className="text-4xl font-serif mb-2 leading-tight">Software Engineering <br /> Intern — Java / Spring</h2>
               <p className="text-lg opacity-60 font-sans mb-10 tracking-tight">Techwave Technologies Ltd.</p>
               <div className="flex flex-wrap gap-8 text-[10px] font-mono tracking-[0.1em] font-bold opacity-90 uppercase">
                 <div className="flex items-center gap-2.5"><MapPin size={16} className="text-[var(--color-gold)]" /> Accra, Ghana</div>
                 <div className="flex items-center gap-2.5"><Clock size={16} className="text-[var(--color-gold)]" /> 16 weeks</div>
                 <div className="flex items-center gap-2.5"><Users size={16} className="text-[var(--color-gold)]" /> 4 openings</div>
               </div>
            </div>
           </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <PremiumTimeline 
             title="My Progress Feed"
             subtitle="Activity log · Last 48 hours"
             items={timelineItems}
           />

           <div className="card bg-[var(--color-navy)] text-white border-0 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                   <div className="h-4 w-1 bg-[var(--color-gold)] rounded-full"></div>
                   <span className="text-[10px] font-mono font-bold text-[var(--color-gold)] uppercase tracking-[0.2em]">Next Milestone</span>
                </div>
                <h3 className="text-2xl font-serif mb-4 leading-tight">Technical Review <em className="italic text-slate-400">Week 8</em></h3>
                <p className="text-white/40 text-[11px] leading-relaxed mb-6">Ensure all logbook entries for Weeks 1-7 are verified before your supervision sync.</p>
                <button className="w-full py-3 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all">Prepare Submission</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default InternDashboard;
