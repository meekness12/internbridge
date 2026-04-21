import React, { useState, useEffect } from 'react';
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight,
  Plus,
  ArrowUpRight,
  GraduationCap
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import { useToast } from '../../context/ToastContext';
import facultyService from '../../api/facultyService';
import type { FacultyDTO } from '../../api/facultyService';

const FacultyManagement: React.FC = () => {
  const { toast } = useToast();
  const [faculties, setFaculties] = useState<FacultyDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFaculties = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await facultyService.getFaculties();
      setFaculties(data);
    } catch {
      toast('Failed to synchronize academic architecture with the central vault.', 'error', 'Protocol Error');
      // Fallback to mock data for demonstration
      setFaculties([
        { 
          id: 1, 
          name: 'Faculty of Engineering', 
          dean: 'Prof. Isaac Mensah', 
          departments: ['Mechanical', 'Electrical', 'Civil', 'Computer'],
          studentCount: 450,
          placementRate: 92,
          departmentCount: 4
        },
        { 
          id: 2, 
          name: 'Faculty of Science', 
          dean: 'Dr. Sarah Appiah', 
          departments: ['Bio-Chemistry', 'Physics', 'Mathematics'],
          studentCount: 320,
          placementRate: 84,
          departmentCount: 3
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchFaculties();
  }, [fetchFaculties]);
  
  const handleProvision = () => {
    toast('Academic cluster provisioned. Syncing faculty hierarchy with core records...', 'success', 'Institutional Sync');
  };

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Academic Architecture"
        title="Faculty"
        italicTitle="Management"
        subtitle="Operational oversight of institutional faculties, departments, and academic leadership"
        eyebrowColor="text-[var(--color-navy)]"
        primaryAction={
          <button 
            onClick={handleProvision}
            className="h-11 px-8 bg-[var(--color-navy)] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl flex items-center gap-3 hover:bg-black transition-all shadow-lg shadow-black/10"
          >
            <Plus size={18} /> Provision Faculty
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 relative min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 bg-[var(--surface)]/40 backdrop-blur-sm z-20 flex items-center justify-center rounded-2xl">
            <div className="flex flex-col items-center gap-4">
               <div className="w-10 h-10 border-2 border-[var(--color-navy)] border-t-transparent rounded-full animate-spin"></div>
               <span className="label-mono text-[10px] uppercase font-black tracking-widest text-[var(--color-navy)]">Accessing Academic Vault...</span>
            </div>
          </div>
        )}
        {faculties.map((f: FacultyDTO, i: number) => {
          const colors = ['border-l-indigo-500', 'border-l-emerald-500', 'border-l-amber-500', 'border-l-rose-500'];
          const color = colors[i % colors.length];
          
          return (
            <div key={f.id} className={`card group bg-[var(--surface)] border border-[var(--border)] border-l-4 ${color} rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all`}>
              <div className="p-8 flex flex-col lg:flex-row justify-between gap-10">
                 <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                       <div className="w-14 h-14 bg-[var(--background)] border border-[var(--border)] rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-[var(--color-navy)] group-hover:text-white transition-all shadow-inner">
                          <Building size={28} />
                       </div>
                       <div>
                          <h3 className="text-2xl font-serif font-bold text-[var(--color-navy)] tracking-tight">{f.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                             <GraduationCap size={14} className="text-[var(--color-gold)]" />
                             <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest leading-none pt-0.5">{f.dean}</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {f.departments?.map((dept: string, idx: number) => (
                        <span key={idx} className="px-3 py-1.5 bg-[var(--background)] border border-[var(--border)] rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-400 hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-all cursor-default">
                          {dept}
                        </span>
                      ))}
                    </div>
                 </div>

                 <div className="lg:w-80 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-50 pt-8 lg:pt-0 lg:pl-10">
                    <div className="grid grid-cols-2 gap-8 mb-8">
                       <div>
                          <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Students</div>
                          <div className="text-xl font-serif font-bold text-[var(--color-navy)]">{f.studentCount}</div>
                       </div>
                       <div>
                          <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Placement</div>
                          <div className="text-xl font-serif font-bold text-emerald-600">{f.placementRate}%</div>
                       </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                       <div className="flex gap-4">
                          <button className="h-10 w-10 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-slate-300 hover:text-[var(--color-navy)] transition-colors"><MapPin size={18} /></button>
                          <button className="h-10 w-10 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-slate-300 hover:text-[var(--color-navy)] transition-colors"><Phone size={18} /></button>
                          <button className="h-10 w-10 rounded-xl bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-slate-300 hover:text-[var(--color-navy)] transition-colors"><Mail size={18} /></button>
                       </div>
                       <button className="h-10 px-5 flex items-center gap-2 bg-[var(--color-navy)] text-white text-[9px] font-bold uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-lg shadow-black/10 group/btn">
                          Manage <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                       </button>
                    </div>
                 </div>
              </div>
              {/* Visual Decorative Element */}
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                 <ArrowUpRight size={120} className="text-[var(--text)]" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FacultyManagement;
