import React from 'react';
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase, 
  FileText,
  ChevronRight,
  MessageSquare
} from 'lucide-react';

const Notifications: React.FC = () => {
  const announcements = [
    {
      id: 1,
      type: 'URGENT',
      icon: <AlertCircle className="text-rose-500" size={20} />,
      title: 'Mid-Semester Presentation Schedule',
      desc: 'The presentation slots for the Computer Science department have been released. Please confirm your attendance by Monday.',
      time: '2h ago',
      read: false
    },
    {
      id: 2,
      type: 'SYSTEM',
      icon: <CheckCircle2 className="text-emerald-500" size={20} />,
      title: 'Logbook Verified',
      desc: 'Eng. Kwame Mensah has verified your activity report for Week 6.',
      time: '5h ago',
      read: false
    },
    {
      id: 3,
      type: 'PLACEMENT',
      icon: <Briefcase className="text-[var(--color-gold)]" size={20} />,
      title: 'New Opportunity: CloudSphere',
      desc: 'CloudSphere just posted a new UX/UI Design Internship that matches your skill profile.',
      time: 'Yesterday',
      read: true
    },
    {
      id: 4,
      type: 'MESSAGE',
      icon: <MessageSquare className="text-indigo-500" size={20} />,
      title: 'New Message from Supervisor',
      desc: 'You have a new message regarding your task "Axios Interceptors".',
      time: 'Yesterday',
      read: true
    },
    {
      id: 5,
      type: 'LEGAL',
      icon: <FileText className="text-slate-400" size={20} />,
      title: 'Contract Draft Updated',
      desc: 'A new version (v0.9) of your housing addendum is available for review.',
      time: '2 days ago',
      read: true
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-fade-in pb-20">
      {/* Header */}
      <header className="flex items-end justify-between border-b border-[var(--color-border)] pb-8">
        <div>
          <div className="label-mono text-[10px] tracking-[0.3em] font-bold text-[var(--color-gold)] uppercase mb-3 opacity-80 flex items-center gap-3">
            <span className="w-6 h-[1px] bg-[var(--color-gold)] opacity-40"></span>
            Dispatch Center
          </div>
          <h1 className="text-5xl font-serif text-[var(--color-navy)] leading-tight">
            System <em className="italic text-slate-400">Updates</em>
          </h1>
        </div>
        
        <div className="flex items-center gap-6">
          <button className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[var(--color-navy)] transition-colors">Mark all as read</button>
          <div className="h-10 w-10 bg-white border border-[var(--color-border)] rounded-full flex items-center justify-center text-[var(--color-navy)] shadow-sm">
             <Bell size={20} />
          </div>
        </div>
      </header>

      {/* Notification Stream */}
      <div className="space-y-4">
        {announcements.map((note) => (
          <div 
            key={note.id} 
            className={`card group cursor-pointer transition-all hover:shadow-md border-l-4 ${
              !note.read ? 'bg-white border-l-[var(--color-forest)]' : 'bg-slate-50/50 border-l-transparent border-[var(--color-border)] grayscale-[0.3]'
            }`}
          >
            <div className="p-6 flex gap-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                !note.read ? 'bg-white border border-slate-100' : 'bg-slate-100 border border-slate-200'
              }`}>
                {note.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-gold)]">{note.type}</span>
                    <h3 className={`text-lg transition-colors font-bold ${!note.read ? 'text-[var(--color-navy)]' : 'text-slate-500'}`}>
                      {note.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest">{note.time}</span>
                </div>
                <p className={`text-sm leading-relaxed mb-4 max-w-2xl ${!note.read ? 'text-[var(--color-navy)] opacity-70' : 'text-slate-400'}`}>
                  {note.desc}
                </p>
                <div className="flex items-center justify-between">
                   <button className="text-[10px] font-bold text-[var(--color-forest)] opacity-0 group-hover:opacity-100 transition-all uppercase tracking-widest flex items-center gap-2">
                     Protocol Details <ChevronRight size={14} />
                   </button>
                   {!note.read && (
                     <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/20"></div>
                   )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Load More Button */}
        <div className="flex justify-center pt-8">
          <button className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 hover:text-[var(--color-navy)] transition-all flex items-center gap-4">
             <span className="w-20 h-[1px] bg-slate-200"></span>
             Archive Synchronized
             <span className="w-20 h-[1px] bg-slate-200"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
