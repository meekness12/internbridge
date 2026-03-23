import React from 'react';
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  ChevronRight,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';

const Contracts: React.FC = () => {
  const contracts = [
    {
      id: 1,
      title: 'Full-time Internship Agreement',
      company: 'Techwave Technologies Ltd.',
      date: 'Feb 10, 2024',
      status: 'VERIFIED',
      type: 'Employment Contract',
      version: 'v2.1 Final'
    },
    {
      id: 2,
      title: 'Intellectual Property & NDA',
      company: 'Techwave Technologies Ltd.',
      date: 'Feb 10, 2024',
      status: 'SIGNED',
      type: 'Legal Disclosure',
      version: 'v1.0'
    },
    {
      id: 3,
      title: 'Relocation & Housing Addendum',
      company: 'Techwave Technologies Ltd.',
      date: 'Feb 12, 2024',
      status: 'DRAFT',
      type: 'Supplemental',
      version: 'v0.9'
    }
  ];

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Legal Instruments"
        title="Binding"
        italicTitle="Contracts"
        subtitle="Secure digital repository for academic and professional agreements"
        eyebrowColor="text-[var(--color-navy)]"
        primaryAction={
           <div className="bg-emerald-50 border border-emerald-100 px-6 py-2.5 rounded-xl flex items-center gap-4 shadow-sm">
             <div className="w-9 h-9 bg-emerald-600/10 rounded-full flex items-center justify-center text-emerald-600">
               <ShieldCheck size={18} strokeWidth={2.5} />
             </div>
             <div>
               <div className="text-[9px] font-black uppercase tracking-widest text-emerald-700">Account Status</div>
               <div className="text-xs font-bold text-emerald-800">100% Verified Compliance</div>
             </div>
           </div>
        }
      />

      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-2">
           <h2 className="label-mono text-[10px] tracking-[0.2em] font-bold text-[var(--color-navy)] opacity-60 uppercase">Document Repository</h2>
           <div className="h-[1px] w-12 bg-slate-100"></div>
        </div>

        {contracts.map((doc) => (
          <div key={doc.id} className="card p-0 overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row group relative">
            <div className="md:w-32 bg-[var(--color-cream-2)] p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 group-hover:bg-[var(--color-cream)] transition-colors">
              <FileText size={36} strokeWidth={1.5} className="text-[var(--color-navy)] opacity-30 mb-2 group-hover:text-[var(--color-gold)] group-hover:scale-110 transition-all" />
              <div className="label-mono text-[9px] font-black uppercase tracking-widest text-slate-300">PDF DOC</div>
            </div>
            
            <div className="flex-1 p-10">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-bold text-2xl text-[var(--color-navy)] tracking-tight group-hover:text-[var(--color-gold)] transition-colors">{doc.title}</h3>
                    <span className={`text-[9px] px-3 py-1.5 rounded-full font-black uppercase tracking-widest border ${
                      doc.status === 'VERIFIED' 
                      ? 'bg-indigo-50 text-indigo-600 border-indigo-100' 
                      : doc.status === 'SIGNED'
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                  <p className="text-[13px] text-slate-400 font-medium">Issued by <span className="text-[var(--color-navy)]">{doc.company}</span> <span className="mx-3 opacity-20">•</span> {doc.date}</p>
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
                  <div className="label-mono text-[9px] font-black uppercase tracking-widest text-slate-300 mb-2">Document Category</div>
                  <div className="text-[11px] font-mono font-bold text-[var(--color-navy)] uppercase tracking-tight opacity-70">{doc.type}</div>
                </div>
                <div>
                  <div className="label-mono text-[9px] font-black uppercase tracking-widest text-slate-300 mb-2">Build Revision</div>
                  <div className="text-[11px] font-mono font-bold text-[var(--color-navy)] uppercase tracking-tight opacity-70">{doc.version}</div>
                </div>
                <div>
                  <div className="label-mono text-[9px] font-black uppercase tracking-widest text-slate-300 mb-2">Cryptographic Hash</div>
                  <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-emerald-600 uppercase tracking-tight">
                     <ShieldCheck size={16} /> RSA-SHA256
                  </div>
                </div>
                <div className="text-right flex items-end justify-end">
                  <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[var(--color-navy)] transition-colors inline-flex items-center gap-2 group/btn">
                    View Audit Trail <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
            {/* Premium Indicator */}
            <div className="absolute left-0 bottom-0 w-1 h-0 bg-[var(--color-gold)] group-hover:h-full transition-all duration-500 opacity-40"></div>
          </div>
        ))}
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
