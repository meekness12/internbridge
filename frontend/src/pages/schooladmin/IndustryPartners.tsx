import React from 'react';
import { 
  MapPin, 
  ArrowUpRight, 
  Calendar, 
  Plus
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';

const IndustryPartners: React.FC = () => {
  const partners = [
    { name: 'Techwave Technologies', sector: 'Software Engineering', location: 'Accra, Ghana', interns: 24, mou: 'Active', renewal: 'Jan 2025', logo: 'LW' },
    { name: 'CloudSphere', sector: 'Cloud Infrastructure', location: 'Kumasi, Ghana', interns: 12, mou: 'Pending', renewal: 'Mar 2024', logo: 'CS' },
    { name: 'DataStream Systems', sector: 'Data Analytics', location: 'Remote', interns: 15, mou: 'Active', renewal: 'Dec 2024', logo: 'DS' },
    { name: 'EcoPower Ghana', sector: 'Renewable Energy', location: 'Tema, Ghana', interns: 8, mou: 'Review', renewal: 'Jun 2024', logo: 'EP' },
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Corporate Residency Alliances"
        title="Industry"
        italicTitle="Partners"
        subtitle="Oversight of active MoUs and student placement performance with corporate entities"
        eyebrowColor="text-emerald-700"
        primaryAction={
          <button className="h-11 px-8 bg-[var(--color-navy)] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl flex items-center gap-3 hover:bg-black transition-all shadow-lg shadow-black/10">
            <Plus size={18} /> Propose Alliance
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partners.map((p, i) => (
          <div key={i} className="card group bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--color-gold)] transition-all relative overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl">
             <div>
                <div className="flex justify-between items-start mb-8">
                   <div className="w-14 h-14 bg-[var(--background)] border border-[var(--border)] rounded-2xl flex items-center justify-center text-[var(--color-navy)] font-serif font-bold text-xl group-hover:bg-[var(--color-navy)] group-hover:text-white transition-all shadow-inner">
                      {p.logo}
                   </div>
                   <div className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] border ${
                     p.mou === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                   }`}>{p.mou} MoU</div>
                </div>
                
                <h3 className="text-xl font-bold text-[var(--color-navy)] mb-1 group-hover:text-[var(--color-gold)] transition-colors">{p.name}</h3>
                <div className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest mb-6 opacity-60">{p.sector}</div>
                
                <div className="space-y-4">
                   <div className="flex items-center gap-3 text-xs font-bold text-[var(--color-muted)]">
                      <MapPin size={14} className="text-[var(--color-gold)]" /> {p.location}
                   </div>
                   <div className="flex items-center gap-3 text-xs font-bold text-[var(--color-muted)]">
                      <Calendar size={14} className="text-[var(--color-gold)]" /> Renewal: {p.renewal}
                   </div>
                </div>
             </div>

             <div className="pt-8 mt-8 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Active Placements</div>
                  <div className="text-lg font-serif font-bold text-[var(--color-navy)]">{p.interns}</div>
                </div>
                <button className="h-10 w-10 bg-[var(--background)] border border-[var(--border)] rounded-full flex items-center justify-center text-slate-300 group-hover:bg-[var(--color-navy)] group-hover:text-white transition-all shadow-sm">
                   <ArrowUpRight size={18} />
                </button>
             </div>
          </div>
        ))}
        
        <div className="card border-2 border-dashed border-[var(--border)] rounded-2xl p-8 flex flex-col items-center justify-center gap-6 group hover:border-[var(--color-gold)] transition-all cursor-pointer bg-[#FDFCF9]/50">
           <div className="w-16 h-16 bg-[var(--surface)] border border-[var(--border)] rounded-full flex items-center justify-center text-slate-200 group-hover:text-[var(--color-gold)] group-hover:scale-110 transition-all shadow-sm">
              <Plus size={32} />
           </div>
           <div className="text-center">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-navy)] mb-2">Expansion Opportunity</div>
              <p className="text-[11px] font-medium text-slate-400 italic">"Register a new industry node for upcoming semester cycles."</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryPartners;
