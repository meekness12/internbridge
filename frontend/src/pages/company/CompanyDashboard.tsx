import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Briefcase, 
  Search, 
  Plus,
  LayoutDashboard,
  CheckCircle2,
  Bell,
  RefreshCw,
  X,
  Send
} from 'lucide-react';
import { PremiumCard } from '../../components/ui/PremiumCard';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import { PremiumTimeline } from '../../components/ui/PremiumTimeline';
import { PremiumActionGrid } from '../../components/ui/PremiumActionGrid';
import internshipService from '../../api/internshipService';
import applicationService from '../../api/applicationService';
import placementService from '../../api/placementService';
import type { InternshipDTO } from '../../api/internshipService';
import type { ApplicationDTO } from '../../api/applicationService';
import type { PlacementDTO } from '../../api/placementService';
import { useToast } from '../../context/ToastContext';

const CompanyDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [internships, setInternships] = useState<InternshipDTO[]>([]);
  const [applications, setApplications] = useState<ApplicationDTO[]>([]);
  const [placements, setPlacements] = useState<PlacementDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPostModal, setShowPostModal] = useState(false);
  const [newRole, setNewRole] = useState({ title: '', description: '', requiredSkills: '', deadline: '' });

  const userId = localStorage.getItem('userId') || '';
  const userName = localStorage.getItem('userName') || 'Company';
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [listings, places] = await Promise.allSettled([
        internshipService.getInternshipsByCompany(userId),
        placementService.getPlacementsByCompany(userId),
      ]);

      if (listings.status === 'fulfilled') {
        setInternships(listings.value);
        // Fetch applications for each internship
        const allApps: ApplicationDTO[] = [];
        for (const listing of listings.value) {
          try {
            const apps = await applicationService.getApplicationsByInternship(listing.id);
            allApps.push(...apps);
          } catch { /* silent */ }
        }
        setApplications(allApps);
      }
      if (places.status === 'fulfilled') setPlacements(places.value);
    } catch (error) {
      console.error('Dashboard load failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const handlePostRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await internshipService.createInternship({
        ...newRole,
        companyId: userId,
      });
      toast('New role posted successfully!', 'success', 'Published');
      setShowPostModal(false);
      setNewRole({ title: '', description: '', requiredSkills: '', deadline: '' });
      // Refresh all data to update counters and lists
      fetchData();
    } catch (error) {
      toast('Failed to post role.', 'error');
    }
  };

  const pendingApps = applications.filter(a => a.status === 'PENDING' || a.status === 'NEW').length;

  const stats = [
    { label: 'Active Interns', value: placements.length.toString(), trend: placements.length > 0 ? `At ${placements[0].companyName}` : 'None yet', icon: '👤', color: 'ki-1', kpiColor: 'kpi-1' },
    { label: 'New Applicants', value: applications.length.toString(), trend: `${pendingApps} need review`, icon: '📩', color: 'ki-2', kpiColor: 'kpi-2' },
    { label: 'Verified Tasks', value: '—', trend: 'Logbook reviews', icon: '✅', color: 'ki-3', kpiColor: 'kpi-3' },
    { label: 'Company Rating', value: '4.9', trend: 'Partner status', icon: '⭐', color: 'ki-4', kpiColor: 'kpi-4' },
    { label: 'Open Roles', value: internships.length.toString(), trend: internships.length > 0 ? `${internships.filter(i => i.status === 'OPEN').length} active` : 'Post your first', icon: '💼', color: 'ki-5', kpiColor: 'kpi-5' },
  ];

  const timelineItems = [
    ...applications.slice(0, 2).map(app => ({
      title: `${app.studentName} applied for ${app.internshipTitle}`,
      meta: `${app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'Recently'} · ${app.status}`,
      body: app.coverLetter || 'Application received — awaiting review.',
      color: app.status === 'ACCEPTED' ? '#15803d' : 'var(--color-gold)',
    })),
    ...placements.slice(0, 2).map(p => ({
      title: `${p.studentName} placed in ${p.internshipTitle}`,
      meta: `${p.startDate} to ${p.endDate} · ${p.status}`,
      body: `Active placement contract.`,
      color: 'var(--color-navy)',
    })),
  ];
  
  if (timelineItems.length === 0) {
    timelineItems.push({
      title: 'Welcome to InternBridge',
      meta: 'Corporate Dashboard',
      body: 'Post internship roles and manage your talent pipeline.',
      color: 'var(--color-gold)',
    });
  }

  const quickActions = [
    { label: 'Post Role', sub: 'New placement', icon: '➕', color: 'bg-indigo-50 text-indigo-600', onClick: () => setShowPostModal(true) },
    { label: 'Verify Logs', sub: `Review pending`, icon: '📄', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Review Apps', sub: `${pendingApps} new`, icon: '👤', color: 'bg-amber-50 text-amber-600' },
    { label: 'Feedback', sub: 'Student reviews', icon: '💬', color: 'bg-blue-50 text-blue-600' }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Corporate Administration"
        title={userName.split(' ')[0]}
        italicTitle="Dashboard"
        subtitle={`${dateStr} · Premium Partner`}
        eyebrowColor="text-[var(--color-gold)]"
        primaryAction={
          <button onClick={() => setShowPostModal(true)} className="btn btn-primary btn-sm bg-[var(--color-navy)] text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            Post New Role <Plus size={16} />
          </button>
        }
        secondaryAction={
          <a href="/company/logbook-review" className="btn btn-gold btn-sm bg-[var(--color-gold)] text-[var(--color-navy)] px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 no-underline">
            Verification Queue <span className="bg-white/20 px-2 py-0.5 rounded-full text-[9px] font-black">{pendingApps}</span>
          </a>
        }
        additionalActions={
          <a href="/company/applicants" className="btn btn-ghost btn-sm border border-slate-200 bg-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 no-underline text-slate-600">
            <Search size={16} /> Review Apps
          </a>
        }
      />

      {isLoading && (
        <div className="flex items-center justify-center p-8 gap-4">
          <RefreshCw size={20} className="animate-spin text-[var(--color-gold)]" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Synchronizing...</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <PremiumCard key={i} {...stat} />
        ))}
      </div>

      <div className="flex items-center gap-1 p-1 bg-[#FDFCF9] border border-slate-200 rounded-xl w-fit shadow-sm">
        {[
          { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={14} /> },
          { id: 'interns', label: 'My Interns', icon: <Users size={14} />, badge: placements.length.toString() },
          { id: 'applicants', label: 'Applicants', icon: <Briefcase size={14} />, badge: applications.length.toString() },
          { id: 'logs', label: 'Logbooks', icon: <CheckCircle2 size={14} /> },
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
              <div className="text-[13px] font-bold text-[var(--color-navy)]">Internship Listings</div>
              <div className="text-[10px] text-slate-400 font-medium">{internships.length} active roles</div>
            </div>
            <Bell size={14} className="text-slate-200" />
          </div>
          <div className="p-6 flex-1">
            {internships.length > 0 ? (
              <div className="space-y-4">
                {internships.slice(0, 5).map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all group">
                    <div>
                      <div className="font-bold text-sm text-[var(--color-navy)]">{job.title}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{job.status} · {job.deadline || 'Open'}</div>
                    </div>
                    <span className={`text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest border ${
                      job.status === 'OPEN' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                    }`}>{job.status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Briefcase size={32} className="text-slate-200 mx-auto mb-4" />
                <p className="text-xs text-slate-400 font-bold">No listings yet</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-8 xl:col-span-4 card bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
           <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <div><div className="text-[13px] font-bold text-[var(--color-navy)]">Recent Applications</div></div>
            <span className="text-[10px] font-mono font-bold text-slate-400">{applications.length} total</span>
          </div>
          <div className="p-6 space-y-4">
            {applications.length > 0 ? applications.slice(0, 4).map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center font-bold text-[10px] text-[var(--color-navy)]">
                    {app.studentName?.substring(0, 2).toUpperCase() || '??'}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[var(--color-navy)]">{app.studentName}</div>
                    <div className="text-[10px] text-slate-400">{app.internshipTitle}</div>
                  </div>
                </div>
                <span className={`text-[9px] px-2 py-1 rounded font-black uppercase tracking-widest ${
                  app.status === 'PENDING' ? 'bg-amber-50 text-amber-600' : app.status === 'ACCEPTED' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                }`}>{app.status}</span>
              </div>
            )) : (
              <div className="text-center py-8">
                <Users size={32} className="text-slate-200 mx-auto mb-4" />
                <p className="text-xs text-slate-400 font-bold">No applications received yet</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-8 xl:col-span-4 space-y-6">
           <PremiumActionGrid title="Quick Actions" items={quickActions} />
           <div className="card bg-[var(--color-gold)] text-[var(--color-navy)] border-0 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 text-center">
                 <h3 className="text-2xl font-serif mb-4 leading-tight">Need More <br /><em className="font-normal italic opacity-60">Talent?</em></h3>
                 <p className="text-[var(--color-navy)]/60 text-[11px] leading-relaxed mb-6">Reach top-tier students from regional universities.</p>
                 <button onClick={() => setShowPostModal(true)} className="w-full bg-[var(--color-navy)] text-white py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-black/10">Post New Role Now</button>
              </div>
           </div>
        </div>

        <div className="lg:col-span-12">
            <PremiumTimeline 
              title="Recent Activity"
              subtitle="Applications · Placements · Updates"
              items={timelineItems}
            />
        </div>
      </div>

      {/* Post New Role Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[var(--color-navy)]/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl animate-scale-in relative border border-white/20">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-navy)] via-[var(--color-gold)] to-[var(--color-navy)]"></div>
            <div className="p-10 pt-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-1 bg-[var(--color-gold)] rounded-full"></div>
                    <span className="text-[10px] font-mono font-black text-[var(--color-gold)] uppercase tracking-[0.3em]">New Listing</span>
                  </div>
                  <h3 className="text-2xl font-serif text-[var(--color-navy)]">Post <em className="italic">Internship Role</em></h3>
                </div>
                <button onClick={() => setShowPostModal(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handlePostRole} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Role Title</label>
                  <input required type="text" value={newRole.title} onChange={(e) => setNewRole({...newRole, title: e.target.value})} placeholder="e.g. Software Engineering Intern" className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-5 text-sm outline-none focus:ring-1 focus:ring-[var(--color-gold)]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Description</label>
                  <textarea required value={newRole.description} onChange={(e) => setNewRole({...newRole, description: e.target.value})} placeholder="Describe the role, responsibilities, and expectations..." rows={3} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-5 text-sm outline-none focus:ring-1 focus:ring-[var(--color-gold)] resize-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Required Skills</label>
                    <input required type="text" value={newRole.requiredSkills} onChange={(e) => setNewRole({...newRole, requiredSkills: e.target.value})} placeholder="Java, React, SQL" className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-5 text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Application Deadline</label>
                    <input required type="date" value={newRole.deadline} onChange={(e) => setNewRole({...newRole, deadline: e.target.value})} className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-5 text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)] font-mono" />
                  </div>
                </div>
                <div className="pt-4">
                  <button type="submit" className="w-full h-14 bg-[var(--color-navy)] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl flex items-center justify-center gap-3 hover:bg-black transition-all">
                    <Send size={18} /> Publish Listing
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
