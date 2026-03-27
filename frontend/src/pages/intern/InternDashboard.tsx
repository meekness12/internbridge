import React, { useState, useEffect } from 'react';
import { 
  Users,
  Clock,
  Check,
  TrendingUp,
  MapPin,
  Calendar,
  Briefcase,
  Plus,
  RefreshCw
} from 'lucide-react';
import { PremiumCard } from '../../components/ui/PremiumCard';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import { PremiumTimeline } from '../../components/ui/PremiumTimeline';
import internshipService from '../../api/internshipService';
import applicationService from '../../api/applicationService';
import placementService from '../../api/placementService';
import logbookService from '../../api/logbookService';
import type { InternshipDTO } from '../../api/internshipService';
import type { ApplicationDTO } from '../../api/applicationService';
import type { PlacementDTO } from '../../api/placementService';
import type { LogbookDTO } from '../../api/logbookService';

const InternDashboard: React.FC = () => {
  const [applications, setApplications] = useState<ApplicationDTO[]>([]);
  const [placements, setPlacements] = useState<PlacementDTO[]>([]);
  const [logbooks, setLogbooks] = useState<LogbookDTO[]>([]);
  const [featuredInternship, setFeaturedInternship] = useState<InternshipDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const userId = localStorage.getItem('userId') || '';
  const userName = localStorage.getItem('userName') || 'Student';
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = today.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  const hour = today.getHours();
  const greeting = hour < 12 ? 'Good morning,' : hour < 17 ? 'Good afternoon,' : 'Good evening,';

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      try {
        const [apps, places, internships] = await Promise.allSettled([
          applicationService.getMyApplications(userId),
          placementService.getMyPlacements(userId),
          internshipService.getAllInternships(),
        ]);

        if (apps.status === 'fulfilled') setApplications(apps.value);
        if (places.status === 'fulfilled') {
          setPlacements(places.value);
          // Fetch logbooks for the first active placement
          if (places.value.length > 0) {
            try {
              const logs = await logbookService.getLogbooksByPlacement(places.value[0].id);
              setLogbooks(logs);
            } catch { /* no logs yet */ }
          }
        }
        if (internships.status === 'fulfilled' && internships.value.length > 0) {
          setFeaturedInternship(internships.value[0]);
        }
      } catch (error) {
        console.error('Dashboard data load failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, [userId]);

  const totalHours = logbooks.reduce((sum, l) => sum + (l.hoursWorked || 0), 0);
  const approvedLogs = logbooks.filter(l => l.companyStatus === 'APPROVED' || l.lecturerStatus === 'APPROVED').length;
  const verificationRate = logbooks.length > 0 ? Math.round((approvedLogs / logbooks.length) * 100) : 0;

  const stats = [
    { label: 'Active Applications', value: applications.length.toString(), trend: applications.length > 0 ? `${applications.filter(a => a.status === 'PENDING').length} pending` : 'No applications yet', icon: '📩', color: 'ki-1', kpiColor: 'kpi-1' },
    { label: 'Hours Logged', value: totalHours.toFixed(0), trend: `${logbooks.length} entries total`, icon: '⏱️', color: 'ki-2', kpiColor: 'kpi-2' },
    { label: 'Verification', value: `${verificationRate}%`, trend: verificationRate >= 90 ? 'Elite Standing' : 'In Progress', icon: '✅', color: 'ki-4', kpiColor: 'kpi-4' },
    { label: 'Placements', value: placements.length.toString(), trend: placements.length > 0 ? placements[0].companyName : 'No placement yet', icon: '💼', color: 'ki-3', kpiColor: 'kpi-3' },
    { label: 'Compliance', value: placements.length > 0 ? '98%' : '---', trend: placements.length > 0 ? 'Active' : 'Awaiting', icon: '🏆', color: 'ki-5', kpiColor: 'kpi-5' },
  ];

  const timelineItems = [
    ...applications.slice(0, 2).map(app => ({
      title: `Application: ${app.internshipTitle}`,
      meta: `Status: ${app.status} · ${app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'Recently'}`,
      body: app.coverLetter || 'Application submitted for review.',
      color: app.status === 'ACCEPTED' ? '#15803d' : app.status === 'REJECTED' ? '#dc2626' : 'var(--color-gold)',
    })),
    ...placements.slice(0, 1).map(p => ({
      title: `Placement: ${p.internshipTitle}`,
      meta: `${p.companyName} · ${p.startDate} to ${p.endDate}`,
      body: `Placement status: ${p.status}.`,
      color: 'var(--color-navy)',
    })),
    ...logbooks.slice(0, 1).map(l => ({
      title: `Logbook Entry: ${l.recordDate}`,
      meta: `${l.hoursWorked} hours · Company: ${l.companyStatus || 'PENDING'}`,
      body: l.tasksCompleted || 'Tasks documented.',
      color: 'var(--color-indigo)',
    })),
  ];

  // Add a placeholder if no real data yet
  if (timelineItems.length === 0) {
    timelineItems.push({
      title: 'Welcome to InternBridge',
      meta: 'Getting Started',
      body: 'Explore available placements and apply for your first internship opportunity.',
      color: 'var(--color-gold)',
    });
  }

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Student Dashboard"
        title={greeting}
        italicTitle={userName.split(' ')[0]}
        subtitle={`${dayName}, ${dateStr}`}
        eyebrowColor="text-[var(--color-gold)]"
        primaryAction={
          <a href="/intern/logbook" className="btn btn-primary btn-sm bg-[var(--color-navy)] text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 no-underline">
            Log Today's Tasks <Plus size={16} />
          </a>
        }
        secondaryAction={
          <a href="/intern/placements" className="btn btn-gold btn-sm bg-[var(--color-gold)] text-[var(--color-navy)] px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 no-underline">
            Browse Openings <span className="bg-white/20 px-2 py-0.5 rounded-full text-[9px] font-black">{applications.length}</span>
          </a>
        }
      />

      <div className="flex flex-wrap gap-3">
        {['All Activity', 'Placements', 'Logbooks', 'Contracts', 'Applications'].map((tab, i) => (
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
           {isLoading && (
             <div className="card p-8 flex items-center justify-center gap-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
               <RefreshCw size={20} className="animate-spin text-[var(--color-gold)]" />
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Synchronizing your data...</span>
             </div>
           )}

           {featuredInternship && (
             <div className="card p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {featuredInternship.companyName?.substring(0, 2).toUpperCase() || 'IB'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-bold text-lg text-[var(--color-navy)]">{featuredInternship.companyName}</h3>
                      <span className="badge badge-forest text-[9px] py-1 px-2.5 font-bold flex items-center gap-1.5 rounded-full">
                        <span className="w-1.5 h-1.5 bg-[var(--color-gold)] rounded-full"></span> {featuredInternship.status || 'Open'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium">Deadline: {featuredInternship.deadline || 'Open'}</p>
                  </div>
                </div>
                <a href="/intern/placements" className="btn btn-ghost btn-sm border border-slate-200 px-4 py-2 rounded-full text-[10px] font-bold uppercase flex items-center gap-2 tracking-widest hover:bg-slate-50 no-underline text-slate-600">
                  <Check size={14} className="text-emerald-600" /> View All
                </a>
              </div>
              <p className="text-slate-600 leading-relaxed mb-8 max-w-2xl">
                {featuredInternship.description || 'Explore this exciting internship opportunity.'}
              </p>
              <div className="editorial-banner p-10 text-white rounded-2xl relative overflow-hidden group border border-white/5 shadow-2xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl group-hover:bg-yellow-400/10 transition-colors"></div>
                 <div className="label-mono-accent text-[9px] tracking-[0.3em] mb-4 opacity-50 uppercase font-bold text-[var(--color-gold)]">
                   {featuredInternship.requiredSkills || 'INTERNSHIP'}
                 </div>
                 <h2 className="text-4xl font-serif mb-2 leading-tight">{featuredInternship.title}</h2>
                 <p className="text-lg opacity-60 font-sans mb-10 tracking-tight">{featuredInternship.companyName}</p>
                 <div className="flex flex-wrap gap-8 text-[10px] font-mono tracking-[0.1em] font-bold opacity-90 uppercase">
                   <div className="flex items-center gap-2.5"><MapPin size={16} className="text-[var(--color-gold)]" /> Open Position</div>
                   <div className="flex items-center gap-2.5"><Clock size={16} className="text-[var(--color-gold)]" /> {featuredInternship.deadline || 'Ongoing'}</div>
                   <div className="flex items-center gap-2.5"><Users size={16} className="text-[var(--color-gold)]" /> {featuredInternship.status}</div>
                 </div>
              </div>
             </div>
           )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
           <PremiumTimeline 
             title="My Progress Feed"
             subtitle="Recent activity"
             items={timelineItems}
           />

           <div className="card bg-[var(--color-navy)] text-white border-0 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                   <div className="h-4 w-1 bg-[var(--color-gold)] rounded-full"></div>
                   <span className="text-[10px] font-mono font-bold text-[var(--color-gold)] uppercase tracking-[0.2em]">Quick Stats</span>
                </div>
                <h3 className="text-2xl font-serif mb-4 leading-tight">
                  {placements.length > 0 ? (
                    <>{placements[0].companyName} <em className="italic text-slate-400">Placement</em></>
                  ) : (
                    <>Find Your <em className="italic text-slate-400">First Role</em></>
                  )}
                </h3>
                <p className="text-white/40 text-[11px] leading-relaxed mb-6">
                  {placements.length > 0 
                    ? `Active from ${placements[0].startDate} to ${placements[0].endDate}. Keep logging your progress.`
                    : 'Browse available internships and apply to start your professional journey.'
                  }
                </p>
                <a href={placements.length > 0 ? '/intern/logbook' : '/intern/placements'} 
                   className="block w-full py-3 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all text-center no-underline">
                  {placements.length > 0 ? 'Open Logbook' : 'Browse Openings'}
                </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default InternDashboard;
