import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Paperclip, 
  Image as ImageIcon,
  User,
  Circle,
  RefreshCw,
  Check,
  CheckCheck,
  MessageSquare,
  Sparkles,
  Zap,
  Phone,
  Video
} from 'lucide-react';
import messageService from '../../api/messageService';
import type { MessageDTO } from '../../api/messageService';
import { useToast } from '../../context/ToastContext';

interface Thread {
  id: string;
  name: string;
  initials: string;
  lastMsg: string;
  time: string;
  unread: number;
  online: boolean;
}

const Messages: React.FC = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<MessageDTO[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userId = localStorage.getItem('userId') || '';

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const allMessages = await messageService.getMyMessages(userId);
        setMessages(allMessages);

        const threadMap = new Map<string, Thread>();
        allMessages.forEach(msg => {
          const isMe = msg.senderId === userId;
          const otherId = isMe ? msg.receiverId : msg.senderId;
          const otherName = isMe ? msg.receiverName : msg.senderName;
          
          if (!threadMap.has(otherId)) {
            const initials = otherName 
              ? otherName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
              : '??';
            threadMap.set(otherId, {
              id: otherId,
              name: otherName || 'Unknown',
              initials,
              lastMsg: msg.content,
              time: formatTime(msg.timestamp),
              unread: !isMe && !msg.read ? 1 : 0,
              online: Math.random() > 0.5, // Simulated online status
            });
          } else {
            const existing = threadMap.get(otherId)!;
            const existingTime = new Date(existing.time).getTime() || 0;
            const msgTime = new Date(msg.timestamp).getTime() || 0;
            if (msgTime > existingTime || !existing.lastMsg) {
              existing.lastMsg = msg.content;
              existing.time = formatTime(msg.timestamp);
            }
            if (!isMe && !msg.read) existing.unread++;
          }
        });

        const threadList = Array.from(threadMap.values());
        setThreads(threadList);
        if (threadList.length > 0 && !activeThreadId) {
          setActiveThreadId(threadList[0].id);
        }
      } catch (error) {
        console.error('Failed to load messages:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeThreadId]);

  const formatTime = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleSend = async () => {
    if (!messageText.trim() || !activeThreadId) return;
    try {
      const newMsg = await messageService.sendMessage(userId, activeThreadId, messageText);
      setMessages(prev => [...prev, newMsg]);
      setThreads(prev => prev.map(t => 
        t.id === activeThreadId 
          ? { ...t, lastMsg: messageText, time: formatTime(new Date().toISOString()), unread: 0 }
          : t
      ));
      setMessageText('');
      toast('Message dispatched.', 'success');
    } catch (error) {
      toast('Failed to transmit message.', 'error');
    }
  };

  const handleMarkRead = async (msgId: string) => {
    try {
      await messageService.markAsRead(msgId);
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, read: true } : m));
    } catch { /* silent */ }
  };

  const threadMessages = messages.filter(m => 
    (m.senderId === activeThreadId && m.receiverId === userId) ||
    (m.senderId === userId && m.receiverId === activeThreadId)
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const activeThread = threads.find(t => t.id === activeThreadId);

  useEffect(() => {
    if (activeThreadId) {
      threadMessages
        .filter(m => m.senderId === activeThreadId && !m.read)
        .forEach(m => handleMarkRead(m.id));
    }
  }, [activeThreadId, threadMessages.length]);

  const filteredThreads = threads.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-180px)] flex animate-fade-in overflow-hidden border border-slate-200 rounded-[3rem] bg-white shadow-[0_50px_100px_-20px_rgba(26,48,40,0.1)] relative max-w-[1400px] mx-auto">
      {/* Sidebar: Threads */}
      <aside className="w-[380px] border-r border-slate-100 flex flex-col bg-[var(--color-cream-2)]/30 backdrop-blur-3xl">
        <div className="p-10 border-b border-slate-100/50">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-3">
                <div className="h-[1px] w-6 bg-[var(--color-gold)]"></div>
                <span className="text-[10px] font-mono font-black text-[var(--color-gold)] uppercase tracking-[0.4em]">Secure Channels</span>
             </div>
             <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-[var(--color-navy)] shadow-sm">
                <MessageSquare size={18} />
             </div>
          </div>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[var(--color-gold)] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search correspondence..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 bg-white border border-slate-200/50 rounded-2xl pl-14 pr-6 text-sm font-medium outline-none focus:ring-1 focus:ring-[var(--color-gold)] transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-6 space-y-2">
          {isLoading && (
            <div className="flex flex-col items-center justify-center p-12 gap-5 animate-pulse">
              <RefreshCw size={24} className="animate-spin text-[var(--color-gold)]" />
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">Querying Ledger...</span>
            </div>
          )}
          {filteredThreads.length > 0 ? filteredThreads.map((thread, idx) => (
            <div 
              key={thread.id}
              onClick={() => setActiveThreadId(thread.id)}
              className={`p-6 flex gap-6 cursor-pointer transition-all border-b border-slate-50/50 rounded-[2rem] relative group animate-fade-up ${
                activeThreadId === thread.id ? 'bg-white shadow-xl shadow-black/[0.03] border-white' : 'hover:bg-white/40 border-transparent'
              }`}
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white font-serif font-black text-xl shadow-2xl bg-[var(--color-forest)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
                  {thread.initials}
                </div>
                {thread.online && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full shadow-lg animate-pulse"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0 py-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-base font-bold text-[var(--color-navy)] truncate tracking-tight">{thread.name}</h4>
                  <span className="text-[10px] text-slate-300 font-mono font-black uppercase tracking-tighter ml-2">{thread.time}</span>
                </div>
                <p className={`text-[14px] truncate leading-relaxed ${thread.unread > 0 ? 'text-[var(--color-navy)] font-black' : 'text-slate-400 font-medium'}`}>
                  {thread.lastMsg}
                </p>
              </div>
              
              {thread.unread > 0 && (
                <div className="shrink-0 pt-2">
                  <div className="w-6 h-6 bg-[var(--color-gold)] text-[var(--color-navy)] text-[11px] font-black flex items-center justify-center rounded-xl shadow-lg shadow-[var(--color-gold)]/30 border border-white/20">
                    {thread.unread}
                  </div>
                </div>
              )}
              
              {activeThreadId === thread.id && (
                <div className="absolute left-6 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[var(--color-gold)] rounded-full blur-[2px] opacity-40"></div>
              )}
            </div>
          )) : !isLoading && (
            <div className="p-16 text-center">
              <Sparkles size={48} className="text-slate-100 mx-auto mb-6" />
              <p className="text-[11px] text-slate-300 font-black uppercase tracking-[0.3em]">No Active Channels</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-white relative">
        {activeThread ? (
          <>
            <header className="h-32 px-12 flex items-center justify-between border-b border-slate-50 shrink-0 bg-white/80 backdrop-blur-xl z-20">
              <div className="flex items-center gap-8">
                <div className="relative">
                   <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-center font-serif font-black text-2xl text-[var(--color-navy)] shadow-inner group-hover:bg-white transition-all">
                     {activeThread.initials}
                   </div>
                   {activeThread.online && (
                     <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full shadow-lg"></div>
                   )}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                     <h3 className="font-serif text-3xl font-bold text-[var(--color-navy)] tracking-tight leading-none italic">{activeThread.name}</h3>
                     <span className="badge badge-forest text-[8px]">Encrypted</span>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-[10px] text-slate-300 font-mono font-black uppercase tracking-[0.3em]">
                       Node ID: {activeThread.id.substring(0,6)}
                    </span>
                    <span className="h-1 w-1 bg-slate-100 rounded-full"></span>
                    <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Global Protocol</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <button className="h-14 w-14 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-xl hover:shadow-indigo-600/5 transition-all outline-none"><Phone size={24} /></button>
                <button className="h-14 w-14 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:text-[var(--color-gold)] hover:bg-white hover:shadow-xl hover:shadow-[var(--color-gold)]/5 transition-all outline-none"><Video size={24} /></button>
                <button className="h-14 w-14 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:text-[var(--color-navy)] hover:bg-white hover:shadow-xl transition-all outline-none"><MoreVertical size={24} /></button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-16 space-y-12 bg-[radial-gradient(circle_at_top_right,rgba(244,239,230,0.5),transparent)] custom-scrollbar">
               <div className="flex justify-center mb-8">
                 <div className="flex items-center gap-3 px-8 py-3 bg-white border border-slate-100/50 rounded-full shadow-2xl shadow-black/[0.02]">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] text-slate-300">Terminal Synchronized · Trinity 2024</span>
                 </div>
               </div>

               {threadMessages.map((msg, idx) => {
                 const isMe = msg.senderId === userId;
                 return (
                 <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-fade-up`} style={{ animationDelay: `${idx * 0.05}s` }}>
                   <div className={`flex flex-col max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                      {!isMe && (
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2 ml-2">{activeThread.name.split(' ')[0]}</span>
                      )}
                      <div className={`p-8 rounded-[2.5rem] text-[16px] leading-relaxed shadow-2xl border transition-all hover:scale-[1.01] ${
                        isMe 
                        ? 'bg-[var(--color-navy)] text-white rounded-tr-none border-[var(--color-navy)] shadow-black/10' 
                        : 'bg-white border-slate-100 text-[var(--color-navy)] rounded-tl-none font-medium'
                      }`}>
                        {msg.content}
                      </div>
                      <div className="flex items-center gap-4 mt-4 px-3">
                        <span className="text-[10px] font-mono font-black text-slate-200 uppercase tracking-widest">{formatTime(msg.timestamp)}</span>
                        {isMe && (
                          <div className={`flex items-center gap-1 ${msg.read ? 'text-[var(--color-gold)]' : 'text-slate-200'}`}>
                            {msg.read ? <CheckCheck size={18} /> : <Check size={18} />}
                          </div>
                        )}
                      </div>
                   </div>
                 </div>
                 );
               })}
               <div ref={messagesEndRef} />
            </div>

            <footer className="p-10 bg-white border-t border-slate-50 z-20">
              <div className="bg-slate-50/50 backdrop-blur-md rounded-[3rem] p-4 flex items-end gap-6 border border-slate-100 focus-within:border-[var(--color-gold)] focus-within:bg-white transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]">
                <div className="flex mb-2 ml-6 gap-3">
                   <button className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-[var(--color-gold)] hover:shadow-lg transition-all"><Paperclip size={24} /></button>
                   <button className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:shadow-lg transition-all"><ImageIcon size={24} /></button>
                </div>
                <textarea 
                  rows={1}
                  placeholder="Dispatch encrypted transmission..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  className="flex-1 bg-transparent border-none outline-none py-6 px-4 text-[16px] resize-none placeholder:text-slate-300 font-medium font-serif italic"
                />
                <button 
                  onClick={handleSend}
                  disabled={!messageText.trim()}
                  className="h-16 w-16 bg-[var(--color-navy)] text-white rounded-[1.8rem] flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 mb-1 mr-1 disabled:opacity-20 disabled:hover:scale-100"
                >
                  <Send size={28} className="ml-1 text-[var(--color-gold)]" fill="currentColor" />
                </button>
              </div>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center px-12 text-center bg-[radial-gradient(circle_at_center,rgba(244,239,230,0.3),transparent)]">
            <div className="w-40 h-40 bg-white border border-slate-50 rounded-[3rem] shadow-2xl flex items-center justify-center text-slate-100 mb-10 relative">
               <MessageSquare size={80} />
               <div className="absolute -top-4 -right-4 w-12 h-12 bg-[var(--color-gold)] rounded-2xl flex items-center justify-center text-[var(--color-navy)] shadow-xl animate-bounce">
                  <Zap size={24} />
               </div>
            </div>
            <h3 className="text-4xl font-serif text-[var(--color-navy)] mb-4 font-bold">Encrypted Communications</h3>
            <p className="text-base text-slate-400 font-medium max-w-sm leading-relaxed mb-10 uppercase tracking-widest text-[10px]">Select a secure terminal to begin high-fidelity academic and professional exchange.</p>
            <div className="flex gap-4">
               <button className="btn btn-primary px-10 py-4 rounded-2xl uppercase tracking-[0.2em] text-[11px] font-black">Open Global Index</button>
               <button className="btn btn-ghost px-10 py-4 rounded-2xl uppercase tracking-[0.2em] text-[11px] font-black border-slate-100 bg-white">Support Cloud</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Messages;
