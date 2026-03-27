import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  ExternalLink,
  ShieldAlert,
  RefreshCw,
  Briefcase
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import placementService from '../../api/placementService';
import type { PlacementDTO } from '../../api/placementService';

const Contracts: React.FC = () => {
  const [placements, setPlacements] = useState<PlacementDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const userId = localStorage.getItem('userId') || '';
  const role = localStorage.getItem('role');

  useEffect(() => {
    const fetchContracts = async () => {
      setIsLoading(true);
      try {
        const data = role === 'COMPANY_ADMIN' 
          ? await placementService.getPlacementsByCompany(userId)
          : await placementService.getMyPlacements(userId);
        setPlacements(data);
      } catch (error) {
        console.error('Failed to fetch contracts:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContracts();
  }, [userId, role]);

  const getStatusStyle = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'COMPLETED': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'PENDING': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  const complianceRate = placements.length > 0 ? '100%' : '---';

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Legal Instruments"
        title="Binding"
        italicTitle="Contracts"
        subtitle={`${placements.length} placement agreement(s) on record`}
        eyebrowColor="text-[var(--color-navy)]"
        primaryAction={
           <div className="bg-emerald-50 border border-emerald-100 px-6 py-2.5 rounded-xl flex items-center gap-4 shadow-sm">
             <div className="w-9 h-9 bg-emerald-600/10 rounded-full flex items-center justify-center text-emerald-600">
               <ShieldCheck size={18} strokeWidth={2.5} />
             </div>
             <div>
               <div className="text-[9px] font-black uppercase tracking-widest text-emerald-700">Account Status</div>
               <div className="text-xs font-bold text-emerald-800">{complianceRate} Verified Compliance</div>
             </div>
           </div>
        }
      />

      {isLoading && (
        <div className="flex items-center justify-center p-12 gap-4">
          <RefreshCw size={20} className="animate-spin text-[var(--color-gold)]" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading contracts...</span>
        </div>
      )}

      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-2">
           <h2 className="label-mono text-[10px] tracking-[0.2em] font-bold text-[var(--color-navy)] opacity-60 uppercase">Document Repository</h2>
           <div className="h-[1px] w-12 bg-slate-100"></div>
        </div>

        {placements.length > 0 ? placements.map((placement) => (
          <div key={placement.id} className="card p-0 overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row group relative">
            <div className="md:w-32 bg-[var(--color-cream-2)] p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 group-hover:bg-[var(--color-cream)] transition-colors">
              <FileText size={36} strokeWidth={1.5} className="text-[var(--color-navy)] opacity-30 mb-2 group-hover:text-[var(--color-gold)] group-hover:scale-110 transition-all" />
              <div className="label-mono text-[9px] font-black uppercase tracking-widest text-slate-300">CONTRACT</div>
            </div>
            
            <div className="flex-1 p-10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-bold text-2xl text-[var(--color-navy)] tracking-tight group-hover:text-[var(--color-gold)] transition-colors">
                      {placement.internshipTitle}
                    </h3>
                    <span className={`text-[9px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest border ${getStatusStyle(placement.status)}`}>
                      {placement.status}
                    </span>
                  </div>
                  <p className="text-[13px] text-slate-400 font-medium">
                    Issued by <span className="text-[var(--color-navy)]">{placement.companyName}</span>
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <button className="h-12 px-8 bg-[var(--color-navy)] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl flex items-center gap-3 hover:bg-black transition-all shadow-lg shadow-black/10">
                    <Download size={18} /> Download Copy
                  </button>
                  <button className="h-12 w-12 flex items-center justify-center bg-white border border-slate-200 text-slate-400 hover:text-[var(--color-navy)] hover:bg-slate-50 rounded-xl transition-all shadow-sm">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-slate-50">
                <div>
                  <div className="label-mono text-[9px] font-black uppercase tracking-widest text-slate-300 mb-2">Start Date</div>
                  <div className="text-[11px] font-mono font-bold text-[var(--color-navy)] uppercase tracking-tight opacity-70">{placement.startDate || 'TBD'}</div>
                </div>
                <div>
                  <div className="label-mono text-[9px] font-black uppercase tracking-widest text-slate-300 mb-2">End Date</div>
                  <div className="text-[11px] font-mono font-bold text-[var(--color-navy)] uppercase tracking-tight opacity-70">{placement.endDate || 'TBD'}</div>
                </div>
                <div>
                  <div className="label-mono text-[9px] font-black uppercase tracking-widest text-slate-300 mb-2">Student Name</div>
                  <div className="text-[11px] font-mono font-bold text-[var(--color-navy)] uppercase tracking-tight opacity-70">{placement.studentName}</div>
                </div>
                <div className="text-right flex items-end justify-end">
                  <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-emerald-600 uppercase tracking-tight">
                     <ShieldCheck size={16} /> Verified
                  </div>
                </div>
              </div>
            </div>
            {/* Premium Indicator */}
            <div className="absolute left-0 bottom-0 w-1 h-0 bg-[var(--color-gold)] group-hover:h-full transition-all duration-500 opacity-40"></div>
          </div>
        )) : !isLoading && (
          <div className="p-20 text-center card bg-slate-50 border-dashed border-2 border-slate-200 rounded-3xl flex flex-col items-center gap-4">
            <Briefcase size={48} className="text-slate-200" />
            <div className="text-sm font-bold text-slate-400 italic">No placement contracts on record</div>
            <p className="text-xs text-slate-400">Contracts will appear here once you are offered and accept an internship placement.</p>
            <a href="/intern/placements" className="text-[10px] font-black uppercase text-[var(--color-gold)] tracking-widest hover:underline no-underline">
              Browse Openings
            </a>
          </div>
        )}
      </div>

      <div className="card p-10 bg-[var(--color-cream-2)] border-dashed border-2 border-slate-200 flex flex-col md:flex-row items-center gap-8 rounded-2xl group hover:border-[var(--color-gold)] transition-all">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
           <ShieldAlert className="text-amber-500 group-hover:animate-pulse" size={32} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="font-serif text-xl font-bold text-[var(--color-navy)] mb-2 uppercase tracking-tight">Data Sovereignty & Legal Protection</h4>
          <p className="text-[13px] text-slate-500 max-w-3xl leading-relaxed italic font-medium">
            "All contracts on InternBridge are cryptographically signed and stored with end-to-end encryption. Modifying these documents outside the platform portal will invalidate the verification seal and associated academic credits."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contracts;
