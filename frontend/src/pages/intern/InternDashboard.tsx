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
  Target,
  DollarSign,
  Calendar,
  X,
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import placementService from '../../api/placementService';
import applicationService from '../../api/applicationService';
import internshipService from '../../api/internshipService';
import type { InternshipDTO } from '../../api/internshipService';
import type { ApplicationDTO } from '../../api/applicationService';
import type { PlacementDTO } from '../../api/placementService';

const InternDashboard: React.FC = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<ApplicationDTO[]>([]);
  const [placements, setPlacements] = useState<PlacementDTO[]>([]);
  const [allInternships, setAllInternships] = useState<InternshipDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<InternshipDTO | null>(null);

  const userId = localStorage.getItem('userId') || '';
  const userName = localStorage.getItem('userName') || 'Student';

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
        if (internships.status === 'fulfilled') setAllInternships(internships.value);
      } catch (error) {
        console.error('Dashboard data load failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, [userId]);

  const handleApply = async (internshipId: string) => {
    try {
      await applicationService.applyForInternship({ 
        internshipId, 
        studentId: userId 
      });
      toast('Application transmitted successfully.', 'success', 'Terminal confirmed');
      setSelectedJob(null);
      // Refresh apps
      const apps = await applicationService.getMyApplications(userId);
      setApplications(apps);
    } catch (err) {
      toast('Transmission failed. Institutional protocol error.', 'error');
    }
  };

  const filteredInternships = allInternships
    .filter(job => !applications.some(app => app.internshipId === job.id))
    .filter(job => {
      if (filter === 'All') return true;
      // Note: Filtering logic for Remote/Hybrid/On-site would go here
      // For now we keep all since the mock data is limited
      return true; 
    })
    .filter(job => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="max-w-[1280px] mx-auto animate-fade-in pb-20 px-4">
      {/* Search & Filter Header */}
      <div className="mb-10 mt-4 max-w-2xl mx-auto">
        <div className="flex flex-col gap-6 items-center">
          <div className="relative w-full group">
             <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[var(--color-brand)] transition-colors" />
             <input 
               type="text" 
               placeholder="Search by role, company, or skill..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full h-14 pl-12 pr-6 bg-white border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[var(--color-brand)]/10 focus:border-[var(--color-brand)] transition-all shadow-sm"
             />
          </div>
          <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto no-scrollbar max-w-full">
            {['All', 'Remote', 'On-site', 'Hybrid'].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  filter === f ? 'bg-[var(--color-brand)] text-white shadow-md shadow-teal-500/20' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">
          {filteredInternships.length} internships found
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Main Internship Feed (Single Column) */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="space-y-6">
               {[1,2,3].map(i => (
                 <div key={i} className="h-64 bg-white border border-slate-100 rounded-[2rem] animate-pulse"></div>
               ))}
            </div>
          ) : (
            <div className="space-y-6">
                {filteredInternships.map((job: any, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedJob(job)}
                    className="bg-white rounded-[2rem] border border-slate-100 p-6 sm:p-8 shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:shadow-teal-500/5 transition-all group cursor-pointer animate-fade-up relative overflow-hidden" 
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                     <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="flex gap-4 sm:gap-6">
                           <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[var(--color-teal-faint)] flex items-center justify-center text-[var(--color-brand)] font-bold text-lg sm:text-xl shadow-inner group-hover:scale-110 transition-transform shrink-0">
                             {job.companyName?.[0] || 'I'}{job.companyName?.[1] || ''}
                           </div>
                           <div className="min-w-0">
                              <h4 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[var(--color-brand)] transition-colors mb-1 leading-tight truncate">{job.title}</h4>
                              <div className="flex items-center gap-2 mb-4">
                                <Briefcase size={14} className="text-slate-300" />
                                <span className="text-sm font-bold text-slate-500 truncate">{job.companyName}</span>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] sm:text-xs text-slate-400 font-medium mb-6">
                                 <div className="flex items-center gap-1.5"><MapPin size={14} /> New York, NY</div>
                                 <div className="flex items-center gap-1.5"><Clock size={14} /> 6 months</div>
                                 <div className="flex items-center gap-1.5"><DollarSign size={14} /> $2k/mo</div>
                              </div>
 
                              <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-amber-100">Hybrid</span>
                                {['Python', 'SQL'].slice(0, 2).map(skill => (
                                  <span key={skill} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-slate-100">{skill}</span>
                                ))}
                              </div>
                           </div>
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-bold text-slate-300 uppercase tracking-widest pt-1 sm:pt-2 whitespace-nowrap">
                          {i + 1} day{i === 0 ? '' : 's'} ago
                        </div>
                     </div>
                  </div>
                ))}

               {filteredInternships.length === 0 && (
                 <div className="py-20 bg-white rounded-[3rem] border border-dashed border-slate-200 text-center px-10">
                    <Sparkles size={48} className="mx-auto text-slate-100 mb-6" />
                    <h3 className="text-xl font-serif font-bold text-slate-900 italic mb-2">No Active Nodes Available</h3>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Adjust filters to explore more opportunities</p>
                 </div>
               )}
            </div>
          )}
        </div>
      </div>

      {/* Internship Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 sm:p-12 animate-fade-in">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={() => setSelectedJob(null)}></div>
           <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative animate-scale-in max-h-[90vh] flex flex-col">
              <div className="p-8 pb-4 flex justify-between items-start">
                 <div className="flex gap-6">
                    <div className="w-20 h-20 rounded-[1.5rem] bg-[var(--color-teal-faint)] flex items-center justify-center text-[var(--color-brand)] font-bold text-2xl shadow-inner">
                       {selectedJob.companyName?.[0] || 'I'}{selectedJob.companyName?.[1] || ''}
                    </div>
                    <div className="pt-1">
                       <h2 className="text-3xl font-bold text-slate-900 tracking-tight leading-none mb-2">{selectedJob.title}</h2>
                       <div className="flex items-center gap-2">
                         <Briefcase size={16} className="text-slate-300" />
                         <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{selectedJob.companyName}</span>
                       </div>
                    </div>
                 </div>
                 <button onClick={() => setSelectedJob(null)} className="p-2 rounded-xl hover:bg-slate-50 transition-colors text-slate-400">
                    <X size={24} />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto px-8 py-6 space-y-10 custom-scrollbar">
                 {/* Meta Grid */}
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: <MapPin size={16} />, label: 'San Francisco...', bg: 'bg-slate-50' },
                      { icon: <Clock size={16} />, label: '3 months', bg: 'bg-slate-50' },
                      { icon: <DollarSign size={16} />, label: '$1,500/mo', bg: 'bg-slate-50' },
                      { icon: <Calendar size={16} />, label: 'Deadline: Apr...', bg: 'bg-slate-50' },
                    ].map((m, i) => (
                      <div key={i} className={`${m.bg} p-3 rounded-2xl flex items-center gap-3 border border-slate-100/50 shadow-sm`}>
                         <div className="text-slate-400">{m.icon}</div>
                         <span className="text-[11px] font-bold text-slate-600 truncate">{m.label}</span>
                      </div>
                    ))}
                 </div>

                 {/* Skills */}
                 <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Tailwind CSS'].map(skill => (
                      <span key={skill} className="px-4 py-2 bg-slate-50 text-slate-500 rounded-xl text-[11px] font-bold uppercase tracking-widest border border-slate-100">
                        {skill}
                      </span>
                    ))}
                 </div>

                 {/* Description Section */}
                 <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-4">About the Role</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                      Join our frontend team to build modern web applications using React, TypeScript, and 
                      cutting-edge technologies. You'll work alongside senior engineers on real products used by thousands.
                    </p>
                 </div>

                 {/* Requirements */}
                 <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-4">Requirements</h4>
                    <ul className="space-y-4">
                       {[
                         'React or Vue.js experience',
                         'HTML/CSS proficiency',
                         'Git basics',
                         'Eagerness to learn'
                       ].map((req, i) => (
                         <li key={i} className="flex items-center gap-4 text-sm text-slate-600 font-medium">
                            <div className="w-2 h-2 rounded-full bg-[var(--color-brand)] opacity-60"></div>
                            {req}
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="p-8 border-t border-slate-50 bg-slate-50/50 flex gap-4">
                 <button 
                   onClick={() => handleApply(selectedJob.id)}
                   className="flex-1 h-14 bg-[var(--color-brand)] text-white text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-xl shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                 >
                   Apply Now
                 </button>
                 <button 
                   onClick={() => setSelectedJob(null)}
                   className="px-10 h-14 bg-white border border-slate-200 text-slate-500 text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
                 >
                   Close
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default InternDashboard;
