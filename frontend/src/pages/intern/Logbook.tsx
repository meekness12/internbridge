import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  Plus, 
  FileCheck, 
  ChevronRight,
  Search,
  AlertCircle,
  RefreshCw,
  X,
  Trash2,
  Send
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import { PremiumCard } from '../../components/ui/PremiumCard';
import placementService from '../../api/placementService';
import logbookService from '../../api/logbookService';
import type { PlacementDTO } from '../../api/placementService';
import type { LogbookDTO } from '../../api/logbookService';
import { useToast } from '../../context/ToastContext';

const Logbook: React.FC = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState<LogbookDTO[]>([]);
  const [placements, setPlacements] = useState<PlacementDTO[]>([]);
  const [activePlacement, setActivePlacement] = useState<PlacementDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    recordDate: new Date().toISOString().split('T')[0],
    hoursWorked: 8,
    tasksCompleted: '',
  });

  const userId = localStorage.getItem('userId') || '';

  useEffect(() => {
    const fetchPlacements = async () => {
      setIsLoading(true);
      try {
        const places = await placementService.getMyPlacements(userId);
        setPlacements(places);
        if (places.length > 0) {
          setActivePlacement(places[0]);
          const logs = await logbookService.getLogbooksByPlacement(places[0].id);
          setEntries(logs);
        }
      } catch (error) {
        console.error('Failed to fetch logbook:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlacements();
  }, [userId]);

  const handleSubmitEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePlacement) {
      toast('No active placement found. You need a placement to log tasks.', 'error', 'No Placement');
      return;
    }
    try {
      await logbookService.createLogbook({
        placementId: activePlacement.id,
        recordDate: newEntry.recordDate,
        hoursWorked: newEntry.hoursWorked,
        tasksCompleted: newEntry.tasksCompleted,
      });
      toast('Logbook entry submitted for verification!', 'success', 'Logged');
      setIsModalOpen(false);
      setNewEntry({ recordDate: new Date().toISOString().split('T')[0], hoursWorked: 8, tasksCompleted: '' });
      // Refresh entries
      const logs = await logbookService.getLogbooksByPlacement(activePlacement.id);
      setEntries(logs);
    } catch (error) {
      toast('Failed to submit logbook entry.', 'error', 'Error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this logbook entry?')) return;
    try {
      await logbookService.deleteLogbook(id);
      toast('Entry removed.', 'success', 'Deleted');
      if (activePlacement) {
        const logs = await logbookService.getLogbooksByPlacement(activePlacement.id);
        setEntries(logs);
      }
    } catch (error) {
      toast('Failed to delete entry.', 'error');
    }
  };

  const totalHours = entries.reduce((sum, e) => sum + (e.hoursWorked || 0), 0);
  const approved = entries.filter(e => e.companyStatus === 'APPROVED').length;
  const pending = entries.filter(e => e.companyStatus === 'PENDING' || !e.companyStatus).length;
  const verRate = entries.length > 0 ? Math.round((approved / entries.length) * 100) : 0;

  const stats = [
    { label: 'Weekly Capacity', value: totalHours.toFixed(1), trend: `${entries.length} entries total`, icon: '⏱️', color: 'ki-1', kpiColor: 'kpi-1' },
    { label: 'Verification Rate', value: `${verRate}%`, trend: verRate >= 90 ? 'Elite Standing' : 'In Progress', icon: '✅', color: 'ki-2', kpiColor: 'kpi-2' },
    { label: 'Total Engagement', value: totalHours.toFixed(0), trend: 'Cumulative Hours', icon: '📚', color: 'ki-3', kpiColor: 'kpi-3' },
    { label: 'Placement', value: activePlacement ? '1' : '0', trend: activePlacement?.companyName || 'None', icon: '💼', color: 'ki-5', kpiColor: 'kpi-5' },
    { label: 'Pending Review', value: pending.toString(), trend: 'Logs awaiting check', icon: '📩', color: 'ki-4', kpiColor: 'kpi-4' },
  ];

  const getDayName = (dateStr: string) => {
    try { return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long' }); }
    catch { return 'Unknown'; }
  };

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Activity Protocol"
        title="Work"
        italicTitle="Logbook"
        subtitle={activePlacement ? `${activePlacement.companyName} · Active Placement` : 'No active placement'}
        eyebrowColor="text-[var(--color-gold)]"
        primaryAction={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[var(--color-navy)] text-white font-bold py-3.5 px-8 rounded-xl flex items-center gap-3 text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-black/10"
          >
            <Plus size={18} /> New Log Entry
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <PremiumCard key={i} {...stat} />
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
             <h3 className="label-mono text-[10px] tracking-[0.2em] font-bold text-[var(--color-navy)] opacity-60 uppercase tracking-widest">Entry History</h3>
             <div className="h-[1px] w-12 bg-slate-100"></div>
             {isLoading && <RefreshCw size={14} className="animate-spin text-[var(--color-gold)]" />}
          </div>
        </div>

        {entries.length > 0 ? entries.map((entry) => (
          <div key={entry.id} className="card p-0 overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all group relative">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-48 bg-[var(--color-cream-2)] p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">{getDayName(entry.recordDate)}</div>
                <div className="text-4xl font-serif font-bold text-[var(--color-navy)] leading-none mb-1">
                  {entry.recordDate ? new Date(entry.recordDate).getDate() : '--'}
                </div>
                <div className="text-[11px] font-mono font-bold text-[var(--color-navy)] opacity-40 uppercase tracking-widest">
                  {entry.recordDate ? new Date(entry.recordDate).toLocaleString('default', { month: 'short' }).toUpperCase() : '---'}
                </div>
              </div>

              <div className="flex-1 p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-emerald-600 font-mono text-xs font-bold bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-tighter border border-emerald-100">
                      <Clock size={14} /> {entry.hoursWorked} Hours
                    </div>
                    <span className={`text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest border ${
                      entry.companyStatus === 'APPROVED' 
                      ? 'bg-indigo-50 text-indigo-600 border-indigo-100' 
                      : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {entry.companyStatus || 'PENDING'}
                    </span>
                    <span className={`text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest border ${
                      entry.lecturerStatus === 'APPROVED' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                      : 'bg-slate-50 text-slate-400 border-slate-100'
                    }`}>
                      Lecturer: {entry.lecturerStatus || 'PENDING'}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleDelete(entry.id)}
                    className="p-2 text-slate-300 hover:text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-[var(--color-navy)] text-[15px] leading-relaxed opacity-70 mb-8 max-w-3xl italic border-l-2 border-slate-100 pl-6 py-1">
                  "{entry.tasksCompleted || 'No tasks documented.'}"
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    <FileCheck size={14} className="text-[var(--color-gold)]" /> Placement: <span className="text-slate-600">{activePlacement?.companyName || 'Unknown'}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Premium Indicator */}
            <div className="absolute left-0 bottom-0 w-1 h-0 bg-[var(--color-gold)] group-hover:h-full transition-all duration-500 opacity-40"></div>
          </div>
        )) : !isLoading && (
          <div className="py-16 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50 group hover:bg-white hover:border-[var(--color-gold)] transition-all">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
               <AlertCircle className="text-slate-200 group-hover:text-[var(--color-gold)] transition-colors" size={32} />
            </div>
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.3em] font-mono">
              {activePlacement ? 'No logbook entries yet' : 'No active placement — apply for an internship first'}
            </p>
            <button 
              onClick={() => activePlacement ? setIsModalOpen(true) : window.location.href = '/intern/placements'}
              className="mt-6 text-[10px] font-bold text-[var(--color-navy)] hover:text-[var(--color-gold)] transition-all uppercase tracking-widest flex items-center gap-2"
            >
              {activePlacement ? 'Create First Entry' : 'Browse Openings'} <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* New Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[var(--color-navy)]/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl animate-scale-in relative border border-white/20">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-navy)] via-[var(--color-gold)] to-[var(--color-navy)]"></div>
            
            <div className="p-10 pt-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-1 bg-[var(--color-gold)] rounded-full"></div>
                    <span className="text-[10px] font-mono font-black text-[var(--color-gold)] uppercase tracking-[0.3em]">Activity Log</span>
                  </div>
                  <h3 className="text-2xl font-serif text-[var(--color-navy)]">New <em className="italic">Entry</em></h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmitEntry} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Date</label>
                    <input 
                      type="date" required
                      value={newEntry.recordDate}
                      onChange={(e) => setNewEntry({...newEntry, recordDate: e.target.value})}
                      className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-5 text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)] font-mono" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Hours Worked</label>
                    <input 
                      type="number" required min="0.5" max="24" step="0.5"
                      value={newEntry.hoursWorked}
                      onChange={(e) => setNewEntry({...newEntry, hoursWorked: parseFloat(e.target.value)})}
                      className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-5 text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)] font-mono" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tasks Completed</label>
                  <textarea 
                    required
                    value={newEntry.tasksCompleted}
                    onChange={(e) => setNewEntry({...newEntry, tasksCompleted: e.target.value})}
                    placeholder="Describe your tasks and learnings for the day..."
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm outline-none focus:ring-1 focus:ring-[var(--color-gold)] transition-all resize-none" 
                  />
                </div>

                {activePlacement && (
                  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2">Placement Context</div>
                    <div className="text-xs font-bold text-[var(--color-navy)]">{activePlacement.companyName} — {activePlacement.internshipTitle}</div>
                  </div>
                )}

                <div className="pt-4 flex gap-4">
                  <button 
                    type="submit"
                    className="flex-1 h-14 bg-[var(--color-navy)] text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-[var(--color-navy)]/10 flex items-center justify-center gap-3 hover:bg-black transition-all"
                  >
                    <Send size={18} /> Submit Entry
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

export default Logbook;
