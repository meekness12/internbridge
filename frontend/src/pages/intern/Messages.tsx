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
  MessageSquare
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
  const userName = localStorage.getItem('userName') || 'Me';

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const allMessages = await messageService.getMyMessages(userId);
        setMessages(allMessages);

        // Build thread list from messages
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
              online: false,
            });
          } else {
            const existing = threadMap.get(otherId)!;
            // Update with latest message
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
      // Update thread's last message
      setThreads(prev => prev.map(t => 
        t.id === activeThreadId 
          ? { ...t, lastMsg: messageText, time: formatTime(new Date().toISOString()) }
          : t
      ));
      setMessageText('');
      toast('Message sent.', 'success');
    } catch (error) {
      toast('Failed to send message.', 'error');
    }
  };

  const handleMarkRead = async (msgId: string) => {
    try {
      await messageService.markAsRead(msgId);
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, read: true } : m));
    } catch { /* silent */ }
  };

  // Filter messages for active thread
  const threadMessages = messages.filter(m => 
    (m.senderId === activeThreadId && m.receiverId === userId) ||
    (m.senderId === userId && m.receiverId === activeThreadId)
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const activeThread = threads.find(t => t.id === activeThreadId);

  // Mark unread messages as read when viewing thread
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
    <div className="h-[calc(100vh-180px)] flex animate-fade-in overflow-hidden border border-slate-200 rounded-3xl bg-white shadow-2xl relative">
      <aside className="w-80 border-r border-slate-100 flex flex-col bg-[var(--color-cream-2)]/50 backdrop-blur-sm">
        <div className="p-8 border-b border-slate-100 bg-white/80">
          <div className="label-mono text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-navy)] mb-6 opacity-40">Correspondence</div>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[var(--color-gold)] transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search contacts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-5 text-xs outline-none focus:ring-1 focus:ring-[var(--color-gold)] transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center p-8 gap-3">
              <RefreshCw size={16} className="animate-spin text-[var(--color-gold)]" />
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Loading...</span>
            </div>
          )}
          {filteredThreads.length > 0 ? filteredThreads.map((thread) => (
            <div 
              key={thread.id}
              onClick={() => setActiveThreadId(thread.id)}
              className={`p-6 flex gap-5 cursor-pointer transition-all border-b border-slate-50 relative group ${
                activeThreadId === thread.id ? 'bg-white' : 'hover:bg-white/60'
              }`}
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg bg-[var(--color-forest)]">
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
              
              {activeThreadId === thread.id && (
                <div className="absolute left-0 top-0 h-full w-1 bg-[var(--color-gold)]"></div>
              )}
            </div>
          )) : !isLoading && (
            <div className="p-8 text-center">
              <MessageSquare size={32} className="text-slate-200 mx-auto mb-4" />
              <p className="text-xs text-slate-400 font-bold">No conversations yet</p>
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-white">
        {activeThread ? (
          <>
            <header className="h-24 px-10 flex items-center justify-between border-b border-slate-50 shrink-0 bg-white z-10">
              <div className="flex items-center gap-6">
                <div className="relative">
                   <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center font-serif font-bold text-xl text-[var(--color-navy)] border border-slate-200 shadow-inner">
                     {activeThread.initials}
                   </div>
                   {activeThread.online && (
                     <Circle className="absolute -bottom-1 -right-1 w-4 h-4 text-emerald-500 fill-emerald-500 border-2 border-white rounded-full" />
                   )}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-serif text-xl font-bold text-[var(--color-navy)] tracking-tight">{activeThread.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-[0.2em] opacity-60">
                      {threadMessages.length} messages
                    </span>
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
                 <div className="label-mono text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 px-6 py-2 bg-white border border-slate-100 rounded-full shadow-sm">Channel Secured · End-to-End Encrypted</div>
               </div>

               {threadMessages.map((msg) => {
                 const isMe = msg.senderId === userId;
                 return (
                 <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                   <div className={`flex flex-col max-w-[65%] ${isMe ? 'items-end' : 'items-start'}`}>
                     <div className={`p-6 rounded-[2rem] text-[15px] leading-relaxed shadow-xl border ${
                       isMe 
                       ? 'bg-[var(--color-navy)] text-white rounded-tr-none border-[var(--color-navy)] shadow-black/10' 
                       : 'bg-white border-slate-100 text-[var(--color-navy)] rounded-tl-none font-medium'
                     }`}>
                       {msg.content}
                     </div>
                     <div className="flex items-center gap-3 mt-3 px-2">
                       <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-widest">{formatTime(msg.timestamp)}</span>
                       {isMe && (
                         <span className="text-emerald-500">
                           {msg.read ? <CheckCheck size={16} /> : <Check size={16} />}
                         </span>
                       )}
                     </div>
                   </div>
                 </div>
                 );
               })}
               <div ref={messagesEndRef} />
            </div>

            <footer className="p-8 border-t border-slate-50 shrink-0 bg-white">
              <div className="bg-slate-50 rounded-[2rem] p-3 flex items-end gap-4 border border-slate-100 focus-within:border-[var(--color-gold)] focus-within:bg-white transition-all shadow-inner">
                <div className="flex mb-2 ml-4 gap-1">
                   <button className="p-2.5 text-slate-400 hover:text-[var(--color-navy)] transition-all bg-white border border-slate-100 rounded-full shadow-sm"><Paperclip size={20} /></button>
                   <button className="p-2.5 text-slate-400 hover:text-[var(--color-navy)] transition-all bg-white border border-slate-100 rounded-full shadow-sm"><ImageIcon size={20} /></button>
                </div>
                <textarea 
                  rows={1}
                  placeholder="Compose your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                  className="flex-1 bg-transparent border-none outline-none py-4 px-2 text-[15px] resize-none placeholder:text-slate-300 font-medium"
                />
                <button 
                  onClick={handleSend}
                  disabled={!messageText.trim()}
                  className="h-14 w-14 bg-[var(--color-gold)] text-[var(--color-navy)] rounded-2xl flex items-center justify-center hover:scale-105 hover:bg-[#d4a017] transition-all shadow-xl shadow-[var(--color-gold)]/30 mb-1 mr-1 disabled:opacity-40 disabled:hover:scale-100"
                >
                  <Send size={22} className="ml-1" />
                </button>
              </div>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <MessageSquare size={64} className="text-slate-200 mb-6" />
            <h3 className="text-xl font-serif text-slate-400 mb-2">No conversation selected</h3>
            <p className="text-xs text-slate-300 font-bold uppercase tracking-widest">Select a thread or start a new conversation</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Messages;
