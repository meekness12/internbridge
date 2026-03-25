import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  ArrowUpRight,
  MapPin,
  Globe,
  FileCheck
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';

const CompanyPartners: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const companies = [
    { id: 1, name: 'Techwave Technologies', industry: 'Software Engineering', location: 'Accra, Ghana', status: 'VERIFIED', interns: 12, rating: '4.8', logo: 'LW' },
    { id: 2, name: 'CloudSphere', industry: 'Cloud Infrastructure', location: 'Kumasi, Ghana', status: 'PENDING', interns: 0, rating: 'N/A', logo: 'CS' },
    { id: 3, name: 'DataStream Systems', industry: 'Data Analytics', location: 'Remote', status: 'VERIFIED', interns: 5, rating: '4.5', logo: 'DS' },
    { id: 4, name: 'EcoPower Ghana', industry: 'Renewable Energy', location: 'Tema, Ghana', status: 'SUSPENDED', interns: 2, rating: '3.2', logo: 'EP' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Corporate Alliances"
        title="Institutional"
        italicTitle="Partners"
        subtitle="Oversight of verified industry partners and corporate residency programs"
        eyebrowColor="text-[var(--color-gold)]"
        primaryAction={
          <button className="h-11 px-6 bg-[var(--color-navy)] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl flex items-center gap-3 hover:bg-black transition-all shadow-lg shadow-black/10">
            <Plus size={18} /> New Partnership
          </button>
        }
      />

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--color-gold)] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search partners by name or sector..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 bg-white border border-slate-200 rounded-xl pl-12 pr-5 text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)] transition-all shadow-sm"
          />
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
           {['All', 'Verified', 'Pending', 'Suspended'].map((status, i) => (
             <button key={i} className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${i === 0 ? 'bg-[var(--color-navy)] text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}>
               {status}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {companies.map((company) => (
          <div key={company.id} className="card group bg-white border border-slate-200 rounded-2xl p-8 hover:border-[var(--color-gold)] transition-all relative overflow-hidden flex flex-col justify-between h-full shadow-sm hover:shadow-md">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-[var(--color-cream-2)] rounded-2xl flex items-center justify-center text-[var(--color-navy)] font-serif font-bold text-2xl border border-slate-100 group-hover:border-[var(--color-gold)] transition-all">
                  {company.logo}
                </div>
                <div className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                  company.status === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                  company.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                  'bg-rose-50 text-rose-600 border-rose-100'
                }`}>
                  {company.status}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-[var(--color-navy)] mb-1 group-hover:text-[var(--color-gold)] transition-colors flex items-center gap-2">
                  {company.name}
                  {company.status === 'VERIFIED' && <FileCheck size={16} className="text-emerald-500" />}
                </h3>
                <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest opacity-60 mb-6">{company.industry}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                     <MapPin size={14} className="text-[var(--color-gold)] opacity-40" /> {company.location}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                     <Globe size={14} className="text-[var(--color-gold)] opacity-40" /> www.{company.name.toLowerCase().replace(' ', '')}.com
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
              <div className="flex gap-8">
                <div>
                  <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Active Interns</div>
                  <div className="text-lg font-serif font-bold text-[var(--color-navy)]">{company.interns}</div>
                </div>
                <div>
                  <div className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Residency Rating</div>
                  <div className="text-lg font-serif font-bold text-[var(--color-navy)]">{company.rating}</div>
                </div>
              </div>
              <button className="h-10 w-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[var(--color-navy)] group-hover:text-white transition-all shadow-sm">
                <ArrowUpRight size={18} />
              </button>
            </div>
            {/* Premium Progress Bar (Visual) */}
            <div className="absolute bottom-0 left-0 h-1 bg-[var(--color-gold)] transition-all duration-500 opacity-20 w-0 group-hover:w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyPartners;
