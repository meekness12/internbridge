import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  ChevronRight,
  GraduationCap,
  Building2,
  Calendar,
  MoreVertical,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import { useToast } from '../../context/ToastContext';

const StudentDirectory: React.FC = () => {
  const { toast } = useToast();
  
  const handleExport = () => {
    toast('Cohort manifest generated. Initiating secure PDF download protocol...', 'info', 'Data Export');
  };
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const students = [
    { id: 'UG-24-001', name: 'Aisha Ibrahim', department: 'Computer Science', year: 'Year 4', status: 'PLACED', company: 'Techwave Technologies', gpa: '3.8' },
    { id: 'UG-24-002', name: 'Kwame Osei', department: 'Mechanical Eng.', year: 'Year 3', status: 'PENDING', company: 'N/A', gpa: '3.5' },
    { id: 'UG-24-003', name: 'Blessing Udoh', department: 'Business Admin', year: 'Year 4', status: 'PLACED', company: 'EcoPower Ghana', gpa: '3.9' },
    { id: 'UG-24-004', name: 'Yaw Mensah', department: 'Computer Science', year: 'Year 4', status: 'REVIEW', company: 'CloudSphere', gpa: '3.2' },
    { id: 'UG-24-005', name: 'Sarah Konadu', department: 'Bio-Chemistry', year: 'Year 3', status: 'PLACED', company: 'Innovate Lab', gpa: '3.7' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Consolidated Roster"
        title="Institutional"
        italicTitle="Student Directory"
        subtitle="Global registry of all students within the academic cluster and their professional residency status"
        eyebrowColor="text-indigo-600"
        primaryAction={
          <button 
            onClick={handleExport}
            className="h-11 px-6 bg-[var(--color-navy)] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl flex items-center gap-3 hover:bg-black transition-all shadow-lg shadow-black/10"
          >
            <Download size={18} /> Export Cohort Data
          </button>
        }
      />

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border)] shadow-sm">
        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-gold)] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, student ID, or department..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 bg-[var(--background)] border border-[var(--border)] rounded-xl pl-12 pr-5 text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)] transition-all"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none h-11 px-5 flex items-center justify-center gap-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[10px] font-bold uppercase tracking-widest text-[var(--color-muted)] hover:bg-[var(--background)] transition-all">
            <Filter size={16} /> Filters
          </button>
          <div className="h-11 w-[1px] bg-slate-100 hidden md:block mx-1"></div>
          <div className="flex bg-[var(--background)] p-1 rounded-xl">
            <button className="px-4 py-1.5 bg-[var(--surface)] shadow-sm rounded-lg text-[10px] font-black uppercase text-[var(--color-navy)]">All</button>
            <button className="px-4 py-1.5 text-[10px] font-black uppercase text-slate-400 hover:text-[var(--color-muted)]">Placed</button>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border border-[var(--border)] rounded-2xl overflow-hidden bg-[var(--surface)]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[var(--background)]/50 border-b border-[var(--border)]">
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Student Identity</th>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Academic Cluster</th>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Residency Status</th>
              <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Host Institution</th>
              <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Performance</th>
              <th className="px-8 py-5 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {students.map((student) => (
              <tr key={student.id} className="group hover:bg-[var(--background)]/50 transition-colors cursor-pointer">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--color-navy)] font-bold text-xs group-hover:bg-[var(--color-navy)] group-hover:text-white transition-all shadow-inner">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[var(--color-navy)]">{student.name}</div>
                      <div className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-tighter mt-0.5">{student.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-muted)] uppercase tracking-tighter leading-none">
                      <GraduationCap size={14} className="text-indigo-400" /> {student.department}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">
                      <Calendar size={12} /> {student.year}
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2">
                    {student.status === 'PLACED' ? <CheckCircle2 size={14} className="text-emerald-500" /> : student.status === 'PENDING' ? <Clock size={14} className="text-amber-500" /> : <Clock size={14} className="text-indigo-500" />}
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                      student.status === 'PLACED' ? 'text-emerald-600' : student.status === 'PENDING' ? 'text-amber-600' : 'text-indigo-600'
                    }`}>{student.status}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-muted)] italic">
                    <Building2 size={14} className="text-slate-300" /> {student.company}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="text-sm font-serif font-black text-[var(--color-navy)]">{student.gpa}</div>
                  <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest">GPA Index</div>
                </td>
                <td className="px-8 py-6 text-right">
                  <button className="text-slate-200 hover:text-[var(--color-navy)] transition-colors"><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center py-4">
        <button className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 hover:text-[var(--color-navy)] transition-all flex items-center gap-2">
          Page 1 of 64 <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default StudentDirectory;
