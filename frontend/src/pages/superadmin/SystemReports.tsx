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
  FileText
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import reportService from '../../api/reportService';
import type { ReportResponse, ReportType } from '../../api/reportService';
import systemService from '../../api/systemService';
import { useToast } from '../../context/ToastContext';

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
      toast('Intelligence synthesis initiated successfully.', 'success', 'Report Engine');
      setIsModalOpen(false);
      setNewReport({ title: '', type: 'ANALYTICAL' });
      fetchReports();
    } catch (error) {
      toast('Report generation failed. System resources may be constrained.', 'error', 'Sync Error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to purge this intelligence record?')) return;
    try {
      await reportService.deleteReport(id);
      toast('Report record purged from metadata cluster.', 'success', 'Cleanup');
      fetchReports();
    } catch (error) {
      toast('Failed to delete report record.', 'error');
    }
  };

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Intelligence Repository"
        title="System"
        italicTitle="Reports"
        subtitle="Centralized intelligence hub for platform performance and academic oversight"
        eyebrowColor="text-[var(--color-navy)]"
        primaryAction={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="h-11 px-8 bg-[var(--color-navy)] text-white text-[10px] font-bold uppercase tracking-[0.15em] rounded-xl flex items-center gap-3 hover:bg-black transition-all shadow-lg shadow-black/10"
          >
            <Plus size={18} /> New Report
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Platform Reports', value: reports.length.toString(), icon: <FileText className="text-indigo-600" />, color: 'bg-indigo-50' },
          { label: 'Active Clusters', value: stats?.totalPartners?.toString() || '---', icon: <Users className="text-emerald-600" />, color: 'bg-emerald-50' },
          { label: 'Platform Load', value: `${stats?.resourceUsage || 0}%`, icon: <TrendingUp className="text-amber-600" />, color: 'bg-amber-50' },
        ].map((kpi, i) => (
          <div key={i} className="card p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-all">
            <div className={`w-14 h-14 ${kpi.color} rounded-2xl flex items-center justify-center mb-6 shadow-inner`}>
              {React.cloneElement(kpi.icon as React.ReactElement<any>, { size: 24 })}
            </div>
            <div className="label-mono text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2">{kpi.label}</div>
            <div className="text-3xl font-serif font-bold text-[var(--color-navy)] tracking-tight">{kpi.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
           <div className="flex items-center justify-between mb-4 px-2">
             <div className="flex items-center gap-3">
               <h3 className="label-mono text-[11px] font-black uppercase tracking-[0.2em] text-[var(--color-navy)]">Recent Intelligence Cycle</h3>
               {isLoading && <RefreshCw size={14} className="animate-spin text-[var(--color-gold)]" />}
             </div>
             <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[var(--color-navy)] transition-colors">Archive</button>
           </div>
           
           <div className="space-y-4">
             {reports.length > 0 ? reports.map((report) => (
               <div key={report.id} className="card group bg-white border border-slate-200 rounded-2xl p-8 hover:border-[var(--color-gold)] transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-sm hover:shadow-md">
                 <div className="flex items-center gap-6">
                   <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all shadow-inner border ${
                     report.status === 'READY' ? 'bg-slate-50 border-slate-100 text-slate-300 group-hover:bg-[var(--color-navy)] group-hover:text-white' : 
                     report.status === 'GENERATING' ? 'bg-amber-50 border-amber-100 text-amber-500 animate-pulse' :
                     'bg-red-50 border-red-100 text-red-500'
                   }`}>
                     {report.status === 'GENERATING' ? <RefreshCw size={28} className="animate-spin" /> : <FileBox size={28} />}
                   </div>
                   <div>
                     <div className="flex items-center gap-4 mb-1">
                       <h4 className="text-lg font-bold text-[var(--color-navy)] tracking-tight">{report.title}</h4>
                       <span className={`text-[9px] px-2.5 py-1 rounded font-black uppercase tracking-widest border ${
                         report.type === 'ANALYTICAL' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                         report.type === 'GOVERNANCE' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                         'bg-slate-50 text-slate-400 border-slate-100'
                       }`}>{report.type}</span>
                     </div>
                     <p className="text-[11px] text-slate-400 font-mono font-bold uppercase tracking-tight opacity-60">
                       Generated By: <span className="text-[var(--color-navy)]">{report.generatedBy}</span> <span className="mx-2">•</span> {report.date}
                     </p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 self-end md:self-center">
                   <div className="text-right mr-4 hidden md:block">
                     <div className="text-[10px] font-black uppercase text-slate-300 tracking-widest mb-1">Architecture</div>
                     <div className="text-xs font-mono font-bold text-[var(--color-navy)] opacity-70">{report.format} · {report.size}</div>
                   </div>
                   {report.status === 'READY' && (
                     <button className="h-12 px-6 bg-[var(--color-navy)] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-black/10">
                       <Download size={18} /> Download
                     </button>
                   )}
                   <button 
                     onClick={() => handleDelete(report.id)}
                     className="h-12 w-12 flex items-center justify-center bg-white border border-slate-200 text-slate-300 hover:text-red-500 rounded-xl transition-all shadow-sm"
                   >
                     <X size={20} />
                   </button>
                 </div>
               </div>
             )) : !isLoading && (
               <div className="p-20 text-center card bg-slate-50 border-dashed border-2 border-slate-200 rounded-3xl flex flex-col items-center gap-4">
                  <FileText size={48} className="text-slate-200" />
                  <div className="text-sm font-bold text-slate-400 italic">No intelligence reports localized in this instance</div>
                  <button onClick={() => setIsModalOpen(true)} className="text-[10px] font-black uppercase text-[var(--color-gold)] tracking-widest hover:underline">Manual Synthesis</button>
               </div>
             )}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
            <div className="card p-10 bg-[var(--color-navy)] text-white border-none rounded-3xl shadow-2xl relative overflow-hidden group">
               <div className="relative z-10">
                 <h3 className="font-serif text-2xl mb-8 leading-tight">Insight <em className="italic text-[var(--color-gold)] opacity-70">Generator</em></h3>
                 <p className="text-white/40 text-[13px] leading-relaxed mb-10 italic">"Synthesize platform activity data into granular academic performance reports."</p>
                 
                 <div className="space-y-6 mb-12">
                    {['Placement Efficiency', 'Skill Gap Delta', 'Institution Compliance', 'Corporate ROI Index'].map((item, i) => (
                      <div key={i} className="flex items-center gap-4 group/item cursor-pointer">
                         <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] opacity-40 group-hover/item:opacity-100 transition-all"></div>
                         <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-white/60 group-hover/item:text-white transition-colors">{item}</span>
                         <ChevronRight size={14} className="ml-auto text-white/20 group-hover/item:text-[var(--color-gold)] group-hover/item:translate-x-1 transition-all" />
                      </div>
                    ))}
                 </div>
                 
                 <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-4 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:bg-[#d4a017] shadow-xl shadow-[var(--color-gold)]/20"
                 >
                    Initialize Sync
                 </button>
               </div>
               <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            <div className="card p-10 bg-[var(--color-cream-2)] border-dashed border-2 border-slate-200 rounded-3xl group">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 mb-6">Automation Core</h4>
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  <div className="text-[12px] font-bold text-[var(--color-navy)] uppercase tracking-tight">Crawler Activity: High</div>
               </div>
               <p className="text-[12px] text-slate-400 font-medium leading-relaxed italic opacity-80 mb-8">
                 Automated monthly platform health reports were compiled and delivered to the Executive Cluster at 04:00 UTC.
               </p>
               <div className="flex gap-4">
                  <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[var(--color-navy)] transition-all shadow-sm"><Printer size={18} /></button>
                  <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-[var(--color-navy)] transition-all shadow-sm"><Share2 size={18} /></button>
               </div>
            </div>
        </div>
      </div>

      {/* Synthesis Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[var(--color-navy)]/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl animate-scale-in relative border border-white/20">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-navy)] via-[var(--color-gold)] to-[var(--color-navy)]"></div>
            
            <div className="p-10 pt-12">
              <div className="flex items-center justify-between mb-10">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-1 bg-[var(--color-gold)] rounded-full"></div>
                    <span className="text-[10px] font-mono font-black text-[var(--color-gold)] uppercase tracking-[0.3em]">Intelligence Synth</span>
                  </div>
                  <h3 className="text-3xl font-serif text-[var(--color-navy)] italic">New Report</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleGenerate} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Report Title</label>
                  <input 
                    required
                    type="text" 
                    value={newReport.title}
                    onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                    placeholder="e.g. Q1 Placement Velocity Audit" 
                    className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm outline-none focus:ring-1 focus:ring-[var(--color-gold)] transition-all" 
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Intelligence Objective</label>
                  <select 
                    value={newReport.type}
                    onChange={(e) => setNewReport({...newReport, type: e.target.value as ReportType})}
                    className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-sm outline-none focus:ring-1 focus:ring-[var(--color-gold)] appearance-none"
                  >
                    <option value="ANALYTICAL">Analytical Insight (Trends & Load)</option>
                    <option value="GOVERNANCE">Governance Audit (RBAC & Compliance)</option>
                    <option value="STRATEGIC">Strategic Impact (ROI & Partnerships)</option>
                    <option value="ACADEMIC">Academic Outcome (Grading & Learning)</option>
                    <option value="PLACEMENT">Placement Metrics (Funnel Efficiency)</option>
                  </select>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl flex items-start gap-4 border border-slate-100">
                  <AlertCircle size={20} className="text-[var(--color-gold)] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-400 italic leading-relaxed">
                    Initializing this synthesis will aggregate high-volume platform metadata. Processing time may vary based on cluster load.
                  </p>
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="flex-1 h-14 bg-[var(--color-navy)] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-[var(--color-navy)]/10 flex items-center justify-center gap-3 hover:bg-black transition-all"
                  >
                    {isLoading ? <RefreshCw className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
                    {isLoading ? 'Synthesizing...' : 'Generate Intelligence'}
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

export default SystemReports;
