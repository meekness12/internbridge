import React from 'react';
import { 
  FileText, 
  Download, 
  ShieldCheck, 
  ChevronRight,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

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
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="label-mono text-[10px] tracking-[0.3em] font-bold text-[var(--color-gold)] uppercase mb-3 opacity-80 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
            Legal Instruments
          </div>
          <h1 className="text-5xl font-serif text-[var(--color-navy)] leading-tight">
            Binding <em className="italic text-slate-400">Contracts</em>
          </h1>
        </div>
        
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-600/10 rounded-full flex items-center justify-center text-emerald-600">
            <ShieldCheck size={20} strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-700">Compliance Status</div>
            <div className="text-sm font-bold text-emerald-800">100% Verified Account</div>
          </div>
        </div>
      </header>

      {/* Contract List */}
      <div className="grid gap-6">
        {contracts.map((doc) => (
          <div key={doc.id} className="card p-0 overflow-hidden bg-white border border-[var(--color-border)] hover:border-[var(--color-gold)] transition-all flex flex-col md:flex-row shadow-sm hover:shadow-md">
            <div className="md:w-32 bg-[var(--color-cream)] p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[var(--color-border)]">
              <FileText size={32} strokeWidth={1.5} className="text-[var(--color-forest)] mb-2" />
              <div className="label-mono text-[8px] font-bold uppercase tracking-widest text-slate-400">PDF DOC</div>
            </div>
            
            <div className="flex-1 p-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-xl text-[var(--color-navy)]">{doc.title}</h3>
                    <span className={`text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-widest border shadow-sm ${
                      doc.status === 'VERIFIED' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                      : doc.status === 'SIGNED'
                      ? 'bg-indigo-50 text-indigo-600 border-indigo-100'
                      : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-navy)] opacity-50 font-medium">Issued by {doc.company} <span className="mx-2 opacity-30">•</span> {doc.date}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <button className="h-11 px-6 bg-[var(--color-forest)] text-white text-[10px] font-black uppercase tracking-[0.15em] rounded-full flex items-center gap-2.5 hover:bg-[#1B2B24] transition-all shadow-lg shadow-[var(--color-forest)]/10">
                    <Download size={16} /> Download Copy
                  </button>
                  <button className="h-11 w-11 flex items-center justify-center bg-white border border-[var(--color-border)] text-slate-400 hover:text-[var(--color-gold)] rounded-full transition-all">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-slate-50">
                <div>
                  <div className="label-mono text-[8px] font-bold uppercase tracking-widest text-slate-400 mb-1">Document Type</div>
                  <div className="text-xs font-bold text-[var(--color-navy)] opacity-80 uppercase tracking-tighter">{doc.type}</div>
                </div>
                <div>
                  <div className="label-mono text-[8px] font-bold uppercase tracking-widest text-slate-400 mb-1">System Version</div>
                  <div className="text-xs font-bold text-[var(--color-navy)] opacity-80 uppercase tracking-tighter">{doc.version}</div>
                </div>
                <div>
                  <div className="label-mono text-[8px] font-bold uppercase tracking-widest text-slate-400 mb-1">Digital Identity</div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 uppercase tracking-tighter">
                     <ShieldCheck size={14} /> RSA-SHA256
                  </div>
                </div>
                <div className="text-right">
                  <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[var(--color-navy)] transition-colors inline-flex items-center gap-1.5">
                    View Audit Trail <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Security Notice */}
      <div className="card bg-slate-50/50 border-dashed border-2 flex items-center gap-6 p-8">
        <ShieldAlert className="text-amber-500 shrink-0" size={32} />
        <div>
          <h4 className="font-bold text-[var(--color-navy)] mb-1">Data Sovereignty & Legal Protection</h4>
          <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
            All contracts on InternBridge are cryptographically signed and stored with end-to-end encryption. Modifying these documents outside the platform portal will invalidate the verification seal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contracts;
