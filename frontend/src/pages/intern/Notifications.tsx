import React from 'react';
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase, 
  FileText,
  ChevronRight,
  MessageSquare,
  Zap
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';

const Notifications: React.FC = () => {
  const announcements = [
    {
      id: 1,
      type: 'URGENT',
      icon: <AlertCircle className="text-rose-500" size={20} />,
      title: 'Mid-Semester Presentation Schedule',
      desc: 'The presentation slots for the Computer Science department have been released. Please confirm your attendance by Monday at 17:00 UTC.',
      time: '2h ago',
      read: false,
      color: 'border-l-rose-500'
    },
    {
      id: 2,
      type: 'VERIFICATION',
      icon: <CheckCircle2 className="text-emerald-500" size={20} />,
      title: 'Logbook Entry Authorized',
      desc: 'Eng. Kwame Mensah has verified your activity report for Week 6 (32.5 Hours total).',
      time: '5h ago',
      read: false,
      color: 'border-l-emerald-500'
    },
    {
      id: 3,
      type: 'OPPORTUNITY',
      icon: <Briefcase className="text-[var(--color-gold)]" size={20} />,
      title: 'Matching Placement Found',
      desc: 'CloudSphere just posted a new UX/UI Design Internship that matches 94% of your skills profile.',
      time: 'Yesterday',
      read: true,
      color: 'border-l-[var(--color-gold)]'
    },
    {
      id: 4,
      type: 'MESSAGE',
      icon: <MessageSquare className="text-indigo-500" size={20} />,
      title: 'Direct Dispatch from Supervisor',
      desc: 'You have a new message regarding your recent task "Axios Interceptors" in the repository.',
      time: 'Yesterday',
      read: true,
      color: 'border-l-indigo-500'
    },
    {
      id: 5,
      type: 'COMPLIANCE',
      icon: <FileText className="text-slate-400" size={20} />,
      title: 'Contract Provision Updated',
      desc: 'A new version (v0.9) of your housing and relocation addendum is available for digital signature.',
      time: '2 days ago',
      read: true,
      color: 'border-l-slate-300'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Dispatch Center"
        title="System"
        italicTitle="Updates"
        subtitle="Trinity Term 2024 · Active Surveillance · Centralized Feed"
        eyebrowColor="text-[var(--color-gold)]"
        primaryAction={
           <div className="flex items-center gap-6">
             <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[var(--color-navy)] transition-colors">Acknowledge All</button>
             <div className="h-11 w-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-[var(--color-navy)] shadow-sm group hover:scale-105 transition-transform">
                <Bell size={20} className="group-hover:text-[var(--color-gold)] transition-colors" />
             </div>
           </div>
        }
      />

      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-4">
           <h2 className="label-mono text-[10px] tracking-[0.2em] font-bold text-[var(--color-navy)] opacity-60 uppercase">Incoming Dossier</h2>
           <div className="h-[1px] w-12 bg-slate-100"></div>
        </div>

        {announcements.map((note) => (
          <div 
            key={note.id} 
            className={`card group cursor-pointer transition-all hover:shadow-xl border border-slate-200 rounded-2xl overflow-hidden relative ${
              !note.read ? 'bg-white' : 'bg-slate-50/50 grayscale-[0.5]'
            }`}
          >
            <div className={`absolute left-0 top-0 h-full w-1 ${note.color}`}></div>
            <div className="p-8 flex gap-8">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner border group-hover:scale-110 transition-transform ${
                !note.read ? 'bg-white border-white' : 'bg-slate-100 border-slate-200'
              }`}>
                {note.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-gold)]">{note.type}</span>
                    <h3 className={`text-xl font-serif font-bold transition-colors tracking-tight ${!note.read ? 'text-[var(--color-navy)]' : 'text-slate-500'}`}>
                      {note.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-[0.2em]">{note.time}</span>
                </div>
                <p className={`text-[15px] leading-relaxed mb-6 max-w-3xl italic font-medium ${!note.read ? 'text-[var(--color-navy)] opacity-60' : 'text-slate-400'}`}>
                  "{note.desc}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                   <button className="text-[10px] font-bold text-[var(--color-navy)] opacity-0 group-hover:opacity-100 transition-all uppercase tracking-[0.2em] flex items-center gap-2 group/btn">
                     Detailed Protocol <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                   </button>
                   {!note.read && (
                     <div className="flex items-center gap-2 text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                       <Zap size={12} fill="currentColor" /> Priority
                     </div>
                   )}
                </div>
              </div>
            </div>
            {/* Premium Indicator (secondary) */}
            {!note.read && (
               <div className="absolute right-0 top-0 w-16 h-16 bg-[var(--color-gold)]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            )}
          </div>
        ))}
        
        <div className="flex justify-center pt-12">
          <button className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300 hover:text-[var(--color-navy)] transition-all flex items-center gap-8 group">
             <span className="w-24 h-[1px] bg-slate-100 group-hover:w-32 transition-all"></span>
             Archive Synchronized
             <span className="w-24 h-[1px] bg-slate-100 group-hover:w-32 transition-all"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
