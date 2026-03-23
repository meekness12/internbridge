import React, { useState } from 'react';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Paperclip, 
  Image as ImageIcon,
  Smile,
  Check,
  CheckCheck,
  User,
  Circle
} from 'lucide-react';

const Messages: React.FC = () => {
  const [activeThread, setActiveThread] = useState(1);
  const [messageText, setMessageText] = useState('');

  const threads = [
    {
      id: 1,
      name: 'Eng. Kwame Mensah',
      role: 'SUPERVISOR',
      company: 'Techwave',
      lastMsg: 'The implementation for the filter system looks solid. Let\'s review on Monday.',
      time: '14:20',
      unread: 2,
      online: true,
      initials: 'KM'
    },
    {
      id: 2,
      name: 'Aisha Ibrahim',
      role: 'ADMIN',
      company: 'InternBridge',
      lastMsg: 'Your internship documentation has been verified. Welcome aboard!',
      time: 'Yesterday',
      unread: 0,
      online: false,
      initials: 'AI'
    },
    {
      id: 3,
      name: 'Lydia Forson',
      role: 'LECTURER',
      company: 'UG - Computer Science',
      lastMsg: 'Please remember to submit your mid-semester report by Friday.',
      time: 'Oct 12',
      unread: 0,
      online: false,
      initials: 'LF'
    }
  ];

  const currentMessages = [
    {
      id: 1,
      sender: 'KM',
      text: 'Good morning, how is the integration going?',
      time: '09:05',
      isMe: false
    },
    {
      id: 2,
      sender: 'Me',
      text: 'Morning Kwame! Just finished the Axios interceptors. The state management is now pulling real-time data from the dev server.',
      time: '09:12',
      isMe: true,
      status: 'read'
    },
    {
      id: 3,
      sender: 'Me',
      text: 'Working on the Editorial design system for the placements page next.',
      time: '09:13',
      isMe: true,
      status: 'read'
    },
    {
      id: 4,
      sender: 'KM',
      text: 'Excellent. The implementation for the filter system looks solid. Let\'s review on Monday.',
      time: '14:20',
      isMe: false
    }
  ];

  return (
    <div className="h-[calc(100vh-180px)] flex animate-fade-in overflow-hidden border border-slate-200 rounded-3xl bg-white shadow-2xl relative">
      <aside className="w-80 border-r border-slate-100 flex flex-col bg-[var(--color-cream-2)]/50 backdrop-blur-sm">
        <div className="p-8 border-b border-slate-100 bg-white/80">
          <div className="label-mono text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-navy)] mb-6 opacity-40">Correspondence</div>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[var(--color-gold)] transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search dossier..." 
              className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-5 text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)] transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {threads.map((thread) => (
            <div 
              key={thread.id}
              onClick={() => setActiveThread(thread.id)}
              className={`p-6 flex gap-5 cursor-pointer transition-all border-b border-slate-50 relative group ${
                activeThread === thread.id ? 'bg-white' : 'hover:bg-white/60'
              }`}
            >
              <div className="relative shrink-0">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg ${
                  thread.role === 'SUPERVISOR' ? 'bg-[var(--color-forest)]' : 'bg-[var(--color-navy)]'
                }`}>
                  {thread.initials}
                </div>
                {thread.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-bold text-[var(--color-navy)] truncate tracking-tight">{thread.name}</h4>
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-tighter">{thread.time}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                   <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-gold)] opacity-70">{thread.role}</span>
                   <span className="text-[9px] text-slate-300 font-bold">•</span>
                   <span className="text-[9px] font-bold text-slate-400 uppercase truncate tracking-tighter">{thread.company}</span>
                </div>
                <p className={`text-[13px] truncate leading-snug ${thread.unread > 0 ? 'text-[var(--color-navy)] font-bold' : 'text-slate-400 font-medium'}`}>
                  {thread.lastMsg}
                </p>
              </div>
              
              {thread.unread > 0 && (
                <div className="shrink-0 pt-1">
                  <div className="w-5 h-5 bg-[var(--color-gold)] text-[var(--color-navy)] text-[10px] font-black flex items-center justify-center rounded-lg shadow-lg shadow-[var(--color-gold)]/20">
                    {thread.unread}
                  </div>
                </div>
              )}
              
              {activeThread === thread.id && (
                <div className="absolute left-0 top-0 h-full w-1 bg-[var(--color-gold)]"></div>
              )}
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-white">
        <header className="h-24 px-10 flex items-center justify-between border-b border-slate-50 shrink-0 bg-white z-10">
          <div className="flex items-center gap-6">
            <div className="relative">
               <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-serif font-bold text-xl text-[var(--color-navy)] border border-slate-200 shadow-inner">KM</div>
               <Circle className="absolute -bottom-1 -right-1 w-4 h-4 text-emerald-500 fill-emerald-500 border-2 border-white rounded-full" />
            </div>
            <div className="flex flex-col">
              <h3 className="font-serif text-xl font-bold text-[var(--color-navy)] tracking-tight">Eng. Kwame Mensah</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-[0.2em] opacity-60">Operations Lead @ Techwave</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="h-11 w-11 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-[var(--color-navy)] transition-all shadow-sm"><User size={20} /></button>
            <button className="h-11 w-11 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-[var(--color-navy)] transition-all shadow-sm"><MoreVertical size={20} /></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-12 space-y-10 bg-[var(--color-cream-2)]/30">
           <div className="flex justify-center mb-4">
             <div className="label-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 px-6 py-2 bg-white border border-slate-100 rounded-full shadow-sm">Channel Secured · Trinity Term Protocol</div>
           </div>

           {currentMessages.map((msg) => (
             <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
               <div className={`flex flex-col max-w-[65%] ${msg.isMe ? 'items-end' : 'items-start'}`}>
                 <div className={`p-6 rounded-[2rem] text-[15px] leading-relaxed shadow-xl border ${
                   msg.isMe 
                   ? 'bg-[var(--color-navy)] text-white rounded-tr-none border-[var(--color-navy)] shadow-black/10' 
                   : 'bg-white border-slate-100 text-[var(--color-navy)] rounded-tl-none font-medium'
                 }`}>
                   {msg.text}
                 </div>
                 <div className="flex items-center gap-3 mt-3 px-2">
                   <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest">{msg.time}</span>
                   {msg.isMe && (
                     <span className="text-emerald-500">
                       {msg.status === 'read' ? <CheckCheck size={16} /> : <Check size={16} />}
                     </span>
                   )}
                 </div>
               </div>
             </div>
           ))}
        </div>

        <footer className="p-8 border-t border-slate-50 shrink-0 bg-white">
          <div className="bg-slate-50 rounded-[2rem] p-3 flex items-end gap-4 border border-slate-100 focus-within:border-[var(--color-gold)] focus-within:bg-white transition-all shadow-inner">
            <div className="flex mb-2 ml-4 gap-1">
               <button className="p-2.5 text-slate-400 hover:text-[var(--color-navy)] transition-all bg-white border border-slate-100 rounded-full shadow-sm"><Paperclip size={20} /></button>
               <button className="p-2.5 text-slate-400 hover:text-[var(--color-navy)] transition-all bg-white border border-slate-100 rounded-full shadow-sm"><ImageIcon size={20} /></button>
            </div>
            <textarea 
              rows={1}
              placeholder="Compose your dispatch..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none py-4 px-2 text-[15px] resize-none placeholder:text-slate-300 font-medium"
            />
            <button className="h-14 w-14 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-2xl flex items-center justify-center hover:scale-105 hover:bg-[#d4a017] transition-all shadow-xl shadow-[var(--color-gold)]/30 mb-1 mr-1">
              <Send size={22} className="ml-1" />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Messages;
