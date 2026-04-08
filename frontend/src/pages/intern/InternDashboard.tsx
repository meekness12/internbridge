import React, { useState, useEffect } from 'react';
import { 
  Users,
  Clock,
  Check,
  Plus,
  RefreshCw,
  Search,
  ArrowUpRight,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Lock,
  MapPin,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import placementService from '../../api/placementService';
import applicationService from '../../api/applicationService';
import internshipService from '../../api/internshipService';
import type { InternshipDTO } from '../../api/internshipService';
import type { ApplicationDTO } from '../../api/applicationService';
import type { PlacementDTO } from '../../api/placementService';

const InternDashboard: React.FC = () => {
  const [applications, setApplications] = useState<ApplicationDTO[]>([]);
  const [placements, setPlacements] = useState<PlacementDTO[]>([]);
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
        if (places.status === 'fulfilled') setPlacements(places.value);
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

  const stats = [
    { label: 'Active Applications', value: applications.length.toString(), trend: applications.length > 0 ? `${applications.filter(a => a.status === 'PENDING').length} pending` : 'No applications yet', icon: <Target size={20} className="text-indigo-600" />, color: 'ki-1', kpiColor: 'kpi-1' },
    { label: 'Placements', value: placements.length.toString(), trend: placements.length > 0 ? placements[0].companyName : 'Ready to start', icon: <Zap size={20} className="text-[var(--color-gold)]" />, color: 'ki-3', kpiColor: 'kpi-3' },
    { label: 'Growth Score', value: placements.length > 0 ? '94%' : '---', trend: placements.length > 0 ? 'Consistent performance' : 'Awaiting start', icon: <Sparkles size={20} className="text-emerald-600" />, color: 'ki-5', kpiColor: 'kpi-5' },
  ];

  const hasActivePlacement = placements.length > 0;

  return (
    <div className="max-w-[1128px] mx-auto animate-fade-in pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Identity Snap */}
        <div className="lg:col-span-3 space-y-4">
           <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="h-14 bg-[var(--color-forest)] w-full"></div>
              <div className="px-4 pb-4 -mt-7 text-center">
                 <div className="w-16 h-16 rounded-full border-4 border-white bg-[var(--color-gold)] mx-auto flex items-center justify-center text-white font-serif font-black text-xl shadow-md mb-3">
                    {userName.split(' ').map(n => n[0]).join('')}
                 </div>
                 <h3 className="text-base font-bold text-slate-900 tracking-tight">{userName}</h3>
                 <p className="text-xs text-slate-500 font-medium mb-4">Student at {localStorage.getItem('institution') || 'University of Ghana'}</p>
                 <div className="pt-4 border-t border-slate-100 flex flex-col items-start gap-4">
                    <div className="flex justify-between w-full text-[11px] font-bold">
                       <span className="text-slate-500">Applications</span>
                       <span className="text-[var(--color-forest)]">{applications.length}</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm sticky top-[95px]">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4 px-1">My Performance</h4>
              {stats.map((s, i) => (
                <div key={i} className="flex items-center gap-3 py-2 px-1 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group border-b border-slate-50 last:border-0">
                   <div className="w-8 h-8 rounded bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[var(--color-forest)] transition-colors">
                      {React.cloneElement(s.icon as any, { size: 16 })}
                   </div>
                   <div>
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{s.label}</div>
                      <div className="text-xs font-bold text-slate-700 leading-none">{s.value}</div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Middle Column: The Internship Feed */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-200">
                   <Users size={24} />
                </div>
                <button className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-500 text-left px-6 py-3 rounded-full text-sm font-medium transition-all shadow-inner">
                   Ask for a recommendation...
                </button>
             </div>
          </div>

          <div className="flex items-center gap-2 py-2">
             <div className="h-px flex-1 bg-slate-200"></div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Companies seeking Interns</span>
             <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          {placements.length > 0 && (
             <div className="relative group overflow-hidden bg-[var(--color-forest)] text-white rounded-xl border border-white/10 p-6 shadow-xl animate-fade-up">
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white/10 to-transparent"></div>
                <div className="flex items-start justify-between mb-4">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-lg">🏛️</div>
                      <div>
                         <h3 className="text-lg font-bold tracking-tight">Active Placement Verified</h3>
                         <p className="text-xs text-white/70">{placements[0].companyName} • {placements[0].internshipTitle}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2 text-[var(--color-gold)] text-[10px] font-black uppercase tracking-widest border border-[var(--color-gold)]/30 px-3 py-1 rounded-full">
                      <Shield size={12} /> Compliance: Pass
                   </div>
                </div>
             </div>
          )}

          {isLoading ? (
            <div className="space-y-4">
               {[1,2,3].map(i => (
                 <div key={i} className="h-48 bg-white border border-slate-200 rounded-xl animate-pulse"></div>
               ))}
            </div>
          ) : (
            <div className="space-y-4">
               {(placements.length === 0 ? [featuredInternship, ...placements].filter(Boolean) : [featuredInternship]).map((job: any, i) => (
                 <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all group cursor-pointer animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="flex justify-between items-start mb-4">
                       <div className="flex gap-4">
                          <div className="w-12 h-12 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-[var(--color-forest)] font-serif font-black text-xl">
                            {job.companyName?.[0] || 'I'}
                          </div>
                          <div>
                             <h4 className="text-base font-bold text-slate-800 group-hover:text-[var(--color-forest)] group-hover:underline transition-colors leading-tight">{job.title}</h4>
                             <p className="text-sm text-slate-600 font-medium">{job.companyName}</p>
                             <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                                <MapPin size={12} /> Remote / Accra
                             </div>
                          </div>
                       </div>
                       <button className="text-slate-300 hover:text-[var(--color-gold)] transition-colors"><Zap size={20} /></button>
                    </div>
                    <div className="py-4 border-t border-slate-50">
                       <p className="text-[13px] text-slate-600 line-clamp-2 leading-relaxed italic">
                         "Accelerate your professional path by joining our {job.category || 'tech'} cluster. Seeking highly motivated individuals to assist with {job.title.toLowerCase()} operational excellence."
                       </p>
                    </div>
                    <div className="flex items-center justify-end pt-4">
                       <button className="px-5 py-2 bg-white border-2 border-[var(--color-forest)] text-[var(--color-forest)] rounded-full text-xs font-black uppercase tracking-widest hover:bg-[var(--color-forest)] hover:text-white transition-all shadow-sm active:scale-95">Apply</button>
                    </div>
                 </div>
               ))}
            </div>
          )}
        </div>

        {/* Right Column: Suggested & Stats */}
        <div className="lg:col-span-3 space-y-4">
           {/* Quick Stats Overlay Card */}
           <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-gold)]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-4 px-1">Growth Index</h4>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tighter">Skill Density</span>
                  <span className="text-xs font-black text-emerald-600">84%</span>
                </div>
                <div className="flex justify-between items-center px-1">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tighter">Node Activity</span>
                  <span className="text-xs font-black text-indigo-600">High</span>
                </div>
                <div className="h-[2px] w-full bg-slate-50 rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-[var(--color-forest)] w-[94%] animate-progress"></div>
                </div>
              </div>
           </div>

           <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500 mb-6 px-1 flex items-center justify-between">
                Institutional News <ArrowUpRight size={14} />
              </h4>
              <div className="space-y-5">
                 {[
                   { t: 'New Techwave Openings', m: '4 hours ago' },
                   { t: 'Governance Update v2.4', m: '12 hours ago' },
                   { t: 'Accra Tech Summit 2024', m: '1 day ago' },
                 ].map((n, i) => (
                   <div key={i} className="cursor-pointer group">
                      <h5 className="text-[13px] font-bold text-slate-800 leading-tight group-hover:text-[var(--color-forest)] group-hover:underline transition-all">{n.t}</h5>
                      <span className="text-[10px] text-slate-500 font-medium">{n.m}</span>
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

export default InternDashboard;
