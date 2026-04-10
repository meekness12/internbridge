import React, { useState, useEffect } from 'react';
import { 
  FileBox, 
  Download, 
  TrendingUp, 
  Users, 
  ChevronRight,
  Printer,
  Share2,
  Plus,
  RefreshCw,
  X,
  ShieldCheck,
  AlertCircle,
  FileText,
  Clock,
  Database,
  ArrowUpRight
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import reportService from '../../api/reportService';
import type { ReportResponse, ReportType } from '../../api/reportService';
import systemService from '../../api/systemService';
import { useToast } from '../../context/ToastContext';

/**
 * SystemReports Component
 * High-fidelity System Reports for platform-wide analysis and oversight.
 */
const SystemReports: React.FC = () => {
  const { toast } = useToast();
  const [reports, setReports] = useState<ReportResponse[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReport, setNewReport] = useState({ title: '', type: 'ANALYTICAL' as ReportType });

  const fetchReports = async () => {
    try {
      const data = await reportService.getAllReports();
      setReports(data);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await systemService.getPlatformStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      await Promise.all([fetchReports(), fetchStats()]);
      setIsLoading(false);
    };
    initialize();
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await reportService.generateReport(newReport);
      toast('Report generation initiated successfully.', 'success', 'Report Engine');
      setIsModalOpen(false);
      setNewReport({ title: '', type: 'ANALYTICAL' });
      fetchReports();
    } catch (error) {
      toast('Report generation failed.', 'error', 'Sync Error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await reportService.deleteReport(id);
      toast('Report record deleted from the system.', 'success', 'Cleanup');
      fetchReports();
    } catch (error) {
      toast('Failed to delete report record.', 'error');
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto animate-fade-in pb-20 px-4">
      <PremiumHeader 
        eyebrow="Reports Repository"
        title="System"
        italicTitle="Reports"
        subtitle="Centralized reporting hub for platform performance, academic oversight, and strategic metrics."
        eyebrowColor="text-[var(--color-brand)]"
        primaryAction={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="h-14 px-10 bg-slate-900 text-white rounded-2xl flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.25em] shadow-2xl hover:bg-black transition-all"
          >
            Generate New Report <Plus size={20} className="text-[var(--color-brand)]" />
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fade-up">
        {[
          { label: 'Platform Reports', value: reports.length.toString(), icon: <FileText size={24} />, color: 'bg-white' },
          { label: 'Total Partners', value: stats?.totalPartners?.toString() || '85', icon: <Users size={24} />, color: 'bg-white' },
          { label: 'System Load', value: `${stats?.resourceUsage || 24}%`, icon: <TrendingUp size={24} />, color: 'bg-white' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white border border-slate-50 p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/20 flex flex-col group hover:shadow-2xl transition-all">
            <div className={`w-14 h-14 bg-slate-50 text-[var(--color-brand)] rounded-2xl flex items-center justify-center mb-10 shadow-inner group-hover:scale-110 transition-transform`}>
              {kpi.icon}
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 mb-2">{kpi.label}</div>
            <div className="text-4xl font-serif font-black text-slate-900 tracking-tight leading-none">{kpi.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6 animate-fade-up delay-1">
           <div className="flex items-center justify-between mb-8 px-4">
              <div className="flex items-center gap-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900">Recent Reporting Cycle</h3>
                <div className="h-px w-20 bg-slate-100"></div>
              </div>
              {isLoading && <RefreshCw size={14} className="animate-spin text-[var(--color-brand)]" />}
              <button className="text-[9px] font-black text-slate-300 hover:text-slate-900 uppercase tracking-widest transition-colors">Archive Access</button>
           </div>
           
           <div className="space-y-4">
             {reports.length > 0 ? reports.map((report, idx) => (
               <div key={report.id} className="bg-white rounded-[2.5rem] border border-slate-50 p-8 flex flex-col md:flex-row md:items-center justify-between gap-10 hover:shadow-2xl hover:shadow-slate-200/30 transition-all group animate-fade-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                 <div className="flex items-center gap-8">
                   <div className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center transition-all shadow-inner border group-hover:scale-105 duration-500 ${
                     report.status === 'READY' ? 'bg-slate-50 border-slate-100 text-[var(--color-brand)] group-hover:bg-slate-900 group-hover:text-[var(--color-brand)]' : 
                     report.status === 'GENERATING' ? 'bg-amber-50 border-amber-100 text-amber-500 animate-pulse' :
                     'bg-rose-50 border-rose-100 text-rose-500'
                   }`}>
                     {report.status === 'GENERATING' ? <RefreshCw size={32} className="animate-spin" /> : <FileBox size={32} />}
                   </div>
                   <div>
                     <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                       <h4 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-[var(--color-brand)] transition-colors">{report.title}</h4>
                       <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${
                         report.type === 'ANALYTICAL' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                         report.type === 'GOVERNANCE' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                         'bg-slate-50 text-slate-400 border-slate-100 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-800'
                       }`}>{report.type}</span>
                     </div>
                     <div className="flex items-center gap-4 text-[10px] font-mono font-black text-slate-200 uppercase tracking-tighter">
                        <span className="text-slate-400 group-hover:text-slate-900 transition-colors">By: {report.generatedBy}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-100"></div>
                        <span className="flex items-center gap-2"><Clock size={12} /> {report.date}</span>
                     </div>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 self-end md:self-center">
                    <div className="text-right mr-6 hidden md:block">
                        <div className="text-[9px] font-black uppercase text-slate-100 tracking-widest mb-1 group-hover:text-slate-200 transition-colors">Report Format</div>
                        <div className="text-[10px] font-mono font-black text-slate-300 uppercase tracking-tighter">{report.format} · <span className="text-slate-100 group-hover:text-[var(--color-brand)] transition-colors">{report.size}</span></div>
                    </div>
                    {report.status === 'READY' && (
                      <button className="h-14 px-8 bg-slate-900 text-white rounded-2xl flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all">
                        <Download size={20} className="text-[var(--color-brand)]" /> Download
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(report.id)}
                      className="w-14 h-14 rounded-2xl bg-white border border-slate-100 text-slate-200 hover:text-rose-600 hover:bg-rose-50 transition-all shadow-sm"
                      title="Purge Record"
                    >
                      <X size={24} />
                    </button>
                 </div>
               </div>
             )) : !isLoading && (
               <div className="py-40 flex flex-col items-center justify-center opacity-30">
                  <Database size={80} className="text-slate-200 mb-6" />
                  <h3 className="text-2xl font-black uppercase tracking-[0.4em] text-slate-300">Registry Empty</h3>
               </div>
             )}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-8 animate-fade-up delay-2">
            <div className="bg-slate-900 text-white rounded-[3.5rem] p-12 shadow-2xl relative overflow-hidden group">
               <div className="relative z-10">
                 <h3 className="font-serif text-3xl mb-8 leading-tight italic">Insight <span className="text-[var(--color-brand)] not-italic opacity-40">Generator</span></h3>
                 <p className="text-white/40 text-[13px] leading-relaxed mb-12 italic border-l border-white/10 pl-6">"Synthesize platform activity metadata into granular institutional performance reports."</p>
                 
                 <div className="space-y-6 mb-16">
                    {['Placement Efficiency', 'Skill Gap Delta', 'Institution Compliance', 'Corporate ROI Index'].map((item, i) => (
                      <div key={i} className="flex items-center gap-6 group/item cursor-pointer">
                         <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] opacity-40 group-hover/item:opacity-100 transition-all shadow-glow"></div>
                         <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-white/40 group-hover/item:text-white transition-colors">{item}</span>
                         <ArrowUpRight size={16} className="ml-auto text-white/10 group-hover/item:text-[var(--color-brand)] group-hover/item:translate-x-1 group-hover/item:-translate-y-1 transition-all" />
                      </div>
                    ))}
                 </div>
                 
                 <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full h-16 bg-[var(--color-brand)] text-slate-900 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:bg-teal-400 shadow-xl shadow-teal-500/20"
                 >
                    Initialize Synthesis
                 </button>
               </div>
               <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">
                  <FileBox size={200} className="text-[var(--color-brand)]" />
               </div>
            </div>

            <div className="bg-white border-2 border-dashed border-slate-100 rounded-[3rem] p-12 group relative overflow-hidden">
               <div className="relative z-10">
                 <div className="flex items-center justify-between mb-10">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Automation Hub</h4>
                   <RefreshCw size={18} className="text-slate-100 group-hover:text-[var(--color-brand)] group-hover:animate-spin-slow transition-all" />
                 </div>
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-glow"></div>
                    <div className="text-[11px] font-black text-slate-900 uppercase tracking-widest">Sentinel Core: Optimal</div>
                 </div>
                 <p className="text-sm text-slate-400 font-medium leading-relaxed italic opacity-80 mb-10">
                   Automated monthly infrastructure health reports were successfully compiled and localized at 04:00 UTC.
                 </p>
                 <div className="flex gap-4">
                    <button className="h-12 px-6 bg-slate-50 border border-slate-100 rounded-xl text-slate-200 hover:text-slate-900 hover:bg-white transition-all"><Printer size={20} /></button>
                    <button className="h-12 px-6 bg-slate-50 border border-slate-100 rounded-xl text-slate-200 hover:text-slate-900 hover:bg-white transition-all"><Share2 size={20} /></button>
                 </div>
               </div>
            </div>
        </div>
      </div>

      {/* Synthesis Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-2xl animate-fade-in">
          <div className="bg-white rounded-[3.5rem] w-full max-w-xl overflow-hidden shadow-[0_60px_150px_rgba(13,148,136,0.3)] animate-scale-in relative border border-slate-100">
            <div className="absolute top-0 left-0 w-full h-[6px] bg-[var(--color-brand)]"></div>
            
            <div className="p-16">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h3 className="text-3xl font-serif font-black text-slate-900 italic leading-none">Report <span className="text-slate-400 not-italic">Generation</span></h3>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-2">Create New Platform Report</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 hover:bg-rose-50 hover:text-rose-600 transition-all">
                  <X size={28} />
                </button>
              </div>

              <form onSubmit={handleGenerate} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Report Manifest Title</label>
                  <input 
                    required
                    type="text" 
                    value={newReport.title}
                    onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                    placeholder="e.g. Q1 Placement Velocity Audit" 
                    className="w-full h-16 bg-slate-50/50 border border-slate-100 rounded-2xl px-6 text-sm font-medium outline-none focus:ring-1 focus:ring-[var(--color-brand)] focus:bg-white transition-all shadow-inner" 
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-300 ml-1">Intelligence Objective</label>
                  <div className="relative">
                    <select 
                      value={newReport.type}
                      onChange={(e) => setNewReport({...newReport, type: e.target.value as ReportType})}
                      className="w-full h-16 bg-slate-50/50 border border-slate-100 rounded-2xl px-6 text-[10px] font-black uppercase tracking-widest outline-none focus:ring-1 focus:ring-[var(--color-brand)] focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      <option value="ANALYTICAL">Analytical Report (Trends & Load)</option>
                      <option value="GOVERNANCE">Governance Report (Compliance)</option>
                      <option value="STRATEGIC">Strategic Report (Impact)</option>
                      <option value="ACADEMIC">Academic Report (Grading)</option>
                      <option value="PLACEMENT">Placement Report (Efficiency)</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-20"><ChevronRight size={20} className="rotate-90" /></div>
                  </div>
                </div>

                <div className="p-8 bg-slate-50/50 rounded-[2rem] flex items-start gap-5 border border-slate-100 shadow-inner">
                  <AlertCircle size={24} className="text-[var(--color-brand)] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-400 italic leading-relaxed font-medium">
                    Generating this report will aggregate platform data. Processing time may vary based on system load.
                  </p>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-16 bg-slate-900 text-white rounded-[1.8rem] text-[11px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-black transition-all flex items-center justify-center gap-4 mt-4 disabled:opacity-50"
                >
                  {isLoading ? <RefreshCw className="animate-spin text-[var(--color-teal)]" size={24} /> : <ShieldCheck size={24} className="text-[var(--color-teal)]" />}
                  {isLoading ? 'Generating...' : 'Generate Report'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SystemReports;
