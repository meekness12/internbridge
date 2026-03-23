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
  User
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
    <div className="h-[calc(100vh-160px)] flex animate-fade-in overflow-hidden border border-[var(--color-border)] rounded-2xl bg-white shadow-sm">
      {/* Thread Sidebar */}
      <aside className="w-80 border-r border-[var(--color-border)] flex flex-col bg-slate-50/30">
        <div className="p-6 border-b border-[var(--color-border)] bg-white">
          <div className="label-mono text-[9px] font-black uppercase tracking-[0.2em] text-[var(--color-gold)] mb-4 opacity-80">Correspondence</div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full h-10 bg-slate-100/50 border-none rounded-full pl-10 pr-4 text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)] transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {threads.map((thread) => (
            <div 
              key={thread.id}
              onClick={() => setActiveThread(thread.id)}
              className={`p-5 flex gap-4 cursor-pointer transition-all border-b border-slate-100 ${
                activeThread === thread.id ? 'bg-white border-l-4 border-l-[var(--color-gold)]' : 'hover:bg-slate-100/50'
              }`}
            >
              <div className="relative shrink-0">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  thread.role === 'SUPERVISOR' ? 'bg-[var(--color-forest)]' : 'bg-[var(--color-navy)]'
                }`}>
                  {thread.initials}
                </div>
                {thread.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  <h4 className="text-sm font-bold text-[var(--color-navy)] truncate">{thread.name}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">{thread.time}</span>
                </div>
                <div className="flex items-center gap-1.5 mb-1">
                   <span className="text-[8px] font-black uppercase tracking-widest text-[var(--color-gold)] opacity-80">{thread.role}</span>
                   <span className="text-[8px] text-slate-300">•</span>
                   <span className="text-[8px] font-bold text-slate-400 uppercase truncate">{thread.company}</span>
                </div>
                <p className={`text-xs truncate ${thread.unread > 0 ? 'text-[var(--color-navy)] font-bold' : 'text-slate-500'}`}>
                  {thread.lastMsg}
                </p>
              </div>
              
              {thread.unread > 0 && (
                <div className="shrink-0 pt-1">
                  <div className="w-4 h-4 bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center rounded-full shadow-sm shadow-rose-500/20">
                    {thread.unread}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <header className="h-20 px-8 flex items-center justify-between border-b border-[var(--color-border)] shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <h3 className="font-bold text-[var(--color-navy)]">Eng. Kwame Mensah</h3>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active within the protocol</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="h-10 w-10 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-full text-slate-400 hover:text-[var(--color-navy)] transition-all"><User size={18} /></button>
            <button className="h-10 w-10 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-full text-slate-400 hover:text-[var(--color-navy)] transition-all"><MoreVertical size={18} /></button>
          </div>
        </header>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 bg-[var(--color-cream)]/30">
           <div className="flex justify-center">
             <div className="label-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-300 px-4 py-1.5 bg-white border border-slate-100 rounded-full shadow-sm">Protocol Initiated • Feb 10, 2024</div>
           </div>

           {currentMessages.map((msg) => (
             <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
               <div className={`flex flex-col max-w-[70%] ${msg.isMe ? 'items-end' : 'items-start'}`}>
                 <div className={`p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
                   msg.isMe 
                   ? 'bg-[var(--color-forest)] text-white rounded-tr-none' 
                   : 'bg-white border border-[var(--color-border)] text-[var(--color-navy)] rounded-tl-none'
                 }`}>
                   {msg.text}
                 </div>
                 <div className="flex items-center gap-2 mt-2 px-1">
                   <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">{msg.time}</span>
                   {msg.isMe && (
                     <span className="text-emerald-500">
                       {msg.status === 'read' ? <CheckCheck size={14} /> : <Check size={14} />}
                     </span>
                   )}
                 </div>
               </div>
             </div>
           ))}
        </div>

        {/* Message Input */}
        <footer className="p-6 border-t border-[var(--color-border)] shrink-0">
          <div className="bg-slate-50 rounded-2xl p-2 flex items-end gap-2 border border-slate-100 focus-within:border-[var(--color-gold)] transition-all">
            <div className="flex mb-2 ml-2">
               <button className="p-2 text-slate-400 hover:text-[var(--color-forest)] transition-all"><Paperclip size={20} /></button>
               <button className="p-2 text-slate-400 hover:text-[var(--color-forest)] transition-all"><ImageIcon size={20} /></button>
               <button className="p-2 text-slate-400 hover:text-[var(--color-forest)] transition-all"><Smile size={20} /></button>
            </div>
            <textarea 
              rows={1}
              placeholder="Draft your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none py-3 px-2 text-sm resize-none placeholder:text-slate-300"
            />
            <button className="h-12 w-12 bg-[var(--color-gold)] text-black rounded-xl flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-[var(--color-gold)]/20 mb-1 mr-1">
              <Send size={20} className="ml-0.5" />
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Messages;
