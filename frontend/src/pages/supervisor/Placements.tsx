import React from 'react';
import { 
  MapPin, 
  Clock, 
  Users, 
  ArrowUpRight, 
  Briefcase,
  Building,
  CheckCircle2
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';

const Placements: React.FC = () => {
  const placements = [
    { id: '1', title: 'Software Engineering', company: 'Techwave Technologies', location: 'Accra', dur: '16 Weeks', students: 4, status: 'OPEN' },
    { id: '2', title: 'Data Analytics', company: 'DataStream Solutions', location: 'Kumasi', dur: '12 Weeks', students: 2, status: 'CLOSED' },
    { id: '3', title: 'Backend Systems', company: 'CloudSphere', location: 'Accra (Remote)', dur: '16 Weeks', students: 3, status: 'OPEN' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Strategic Partnerships"
        title="Attachment"
        italicTitle="Listings"
        subtitle="Manage industry internship opportunities and active placement slots"
        eyebrowColor="text-[var(--color-navy)]"
        primaryAction={
           <button className="bg-[var(--color-navy)] text-white px-8 h-11 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-md">
             Post New Placement
           </button>
        }
        secondaryAction={
          <button className="bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 flex items-center gap-3 h-11 text-[10px] font-bold text-slate-400 hover:text-[var(--color-navy)] transition-all shadow-sm">
             <Building size={16} /> Partner Database
          </button>
        }
      />

      <div className="flex items-center gap-4 mb-2">
         <h2 className="label-mono text-[10px] tracking-[0.2em] font-bold text-[var(--color-navy)] opacity-60 uppercase">Available Opportunities</h2>
         <div className="h-[1px] w-12 bg-slate-100"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placements.map((p) => (
          <div key={p.id} className="card p-8 bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-8">
               <div className="w-12 h-12 bg-[var(--color-cream-2)] rounded-2xl flex items-center justify-center text-[var(--accent)] border border-white shadow-inner group-hover:scale-110 transition-transform">
                 <Briefcase size={22} />
               </div>
               <span className={`text-[9px] font-black px-3 py-1.5 rounded-full border tracking-widest uppercase ${
                 p.status === 'OPEN' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-[var(--background)] text-slate-400 border-[var(--border)]'
               }`}>{p.status}</span>
            </div>
            
            <h3 className="text-2xl font-serif font-bold text-[var(--color-navy)] mb-2 group-hover:text-[var(--color-gold)] transition-colors line-clamp-1">{p.title}</h3>
            <p className="text-[13px] text-slate-400 font-medium mb-10 italic">{p.company}</p>
            
            <div className="space-y-4 pt-8 border-t border-slate-50">
               <div className="flex items-center gap-4 text-[10px] font-mono font-bold text-[var(--color-navy)] opacity-60 uppercase tracking-tight">
                 <MapPin size={16} className="text-[var(--color-gold)]" /> {p.location}
               </div>
               <div className="flex items-center gap-4 text-[10px] font-mono font-bold text-[var(--color-navy)] opacity-60 uppercase tracking-tight">
                 <Clock size={16} className="text-[var(--color-gold)]" /> {p.dur}
               </div>
               <div className="flex items-center gap-4 text-[10px] font-mono font-bold text-[var(--color-navy)] opacity-60 uppercase tracking-tight">
                 <Users size={16} className="text-[var(--color-gold)]" /> {p.students} Open Slots
               </div>
            </div>

            <button className="w-full mt-10 py-4 bg-[var(--background)] group-hover:bg-[var(--color-navy)] group-hover:text-white transition-all text-[var(--color-navy)] text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 shadow-inner group-hover:shadow-lg group-hover:shadow-black/10">
               Assignment Details <ArrowUpRight size={16} />
            </button>
            
            {/* Premium Indicator */}
            <div className="absolute left-0 bottom-0 w-1 h-0 bg-[var(--color-gold)] group-hover:h-full transition-all duration-500 opacity-40"></div>
          </div>
        ))}
      </div>

      <div className="card p-12 bg-[var(--color-cream-2)] border-dashed border-2 border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-8 rounded-2xl group hover:border-[var(--color-gold)] transition-all">
         <div className="flex items-center gap-8">
            <div className="w-16 h-16 bg-[var(--surface)] rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
               <CheckCircle2 size={36} className="text-slate-200 group-hover:text-emerald-500 transition-colors" />
            </div>
            <div className="text-center md:text-left">
               <h3 className="text-2xl font-serif text-[var(--color-navy)] mb-2 uppercase tracking-tighter">Verified <em className="italic text-slate-400">Partners</em></h3>
               <p className="text-[14px] text-slate-400 max-w-sm font-medium leading-relaxed">
                 42 verified engineering and business partners in the Greater Accra Region. 
                 Access full academic compliance records.
               </p>
            </div>
         </div>
         <button className="text-[10px] font-bold text-[var(--color-navy)] uppercase tracking-[0.2em] px-10 py-4 border border-slate-300 rounded-xl hover:bg-[var(--surface)] hover:border-[var(--color-gold)] transition-all shadow-sm">
            Compliance Report
         </button>
      </div>
    </div>
  );
};

export default Placements;
