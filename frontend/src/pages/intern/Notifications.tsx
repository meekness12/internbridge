import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase, 
  FileText,
  MessageSquare,
  Zap,
  RefreshCw,
  Trash2,
  Check,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { PremiumHeader } from '../../components/ui/PremiumHeader';
import notificationService from '../../api/notificationService';
import type { NotificationDTO } from '../../api/notificationService';
import { useToast } from '../../context/ToastContext';

const Notifications: React.FC = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const userId = localStorage.getItem('userId') || '';

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const data = filter === 'unread' 
        ? await notificationService.getUnreadNotifications(userId)
        : await notificationService.getMyNotifications(userId);
      setNotifications(data);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [userId, filter]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
      toast('Notification acknowledged.', 'success', 'Read');
    } catch (error) {
      toast('Failed to mark as read.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await notificationService.deleteNotification(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
      toast('Notification dismissed.', 'success', 'Removed');
    } catch (error) {
      toast('Failed to delete notification.', 'error');
    }
  };

  const handleAcknowledgeAll = async () => {
    const unread = notifications.filter(n => !n.isRead);
    try {
      await Promise.all(unread.map(n => notificationService.markAsRead(n.id)));
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      toast(`${unread.length} notifications acknowledged.`, 'success', 'All Read');
    } catch (error) {
      toast('Failed to acknowledge all.', 'error');
    }
  };

  const getNotificationStyle = (msg: string) => {
    const lower = msg.toLowerCase();
    if (lower.includes('urgent') || lower.includes('deadline') || lower.includes('required')) {
      return { icon: <AlertCircle className="text-rose-500" size={24} />, color: 'border-l-rose-500', type: 'EXECUTIVE URGENT', bg: 'bg-rose-50/30' };
    }
    if (lower.includes('approved') || lower.includes('verified') || lower.includes('accepted')) {
      return { icon: <CheckCircle2 className="text-emerald-500" size={24} />, color: 'border-l-emerald-500', type: 'QUALITY VERIFICATION', bg: 'bg-emerald-50/30' };
    }
    if (lower.includes('internship') || lower.includes('placement') || lower.includes('opportunity')) {
      return { icon: <Briefcase className="text-[var(--color-gold)]" size={24} />, color: 'border-l-[var(--color-gold)]', type: 'OPPORTUNITY DISPATCH', bg: 'bg-amber-50/30' };
    }
    if (lower.includes('message') || lower.includes('dispatch') || lower.includes('contact')) {
      return { icon: <MessageSquare className="text-indigo-500" size={24} />, color: 'border-l-indigo-500', type: 'SECURE PROMPT', bg: 'bg-indigo-50/30' };
    }
    if (lower.includes('contract') || lower.includes('document') || lower.includes('compliance')) {
      return { icon: <FileText className="text-slate-400" size={24} />, color: 'border-l-slate-300', type: 'COMPLIANCE AUDIT', bg: 'bg-slate-50/30' };
    }
    return { icon: <Bell className="text-[var(--color-navy)]" size={24} />, color: 'border-l-[var(--color-navy)]', type: 'SYSTEM BROADCAST', bg: 'bg-white' };
  };

  const formatTime = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Synchronized Just Now';
    if (hours < 24) return `${hours} Hours Elapsed`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} Days Prior`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-[1200px] mx-auto space-y-12 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Intelligence Terminal"
        title="Dispatch"
        italicTitle="Stream"
        subtitle={`${notifications.length} Transmission Records · ${unreadCount} Pending Acknowledgement`}
        eyebrowColor="text-[var(--color-gold)]"
        primaryAction={
           <div className="flex items-center gap-10">
             <button 
               onClick={handleAcknowledgeAll}
               disabled={unreadCount === 0}
               className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-[var(--color-navy)] transition-colors disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-3"
             >
               Clear Ledger <ShieldCheck size={16} />
             </button>
             <div className="flex items-center gap-1 p-1 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-black/5">
                {[
                  { id: 'all', label: 'All Dispatches' },
                  { id: 'unread', label: 'Pending Only' }
                ].map((t) => (
                  <button 
                    key={t.id}
                    onClick={() => setFilter(t.id as any)}
                    className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === t.id ? 'bg-[var(--color-navy)] text-white shadow-xl' : 'text-slate-400 hover:text-[var(--color-navy)]'}`}
                  >
                    {t.label} {t.id === 'unread' && unreadCount > 0 && <span className="ml-2 bg-[var(--color-gold)] text-[var(--color-navy)] px-2 py-0.5 rounded-lg text-[9px]">{unreadCount}</span>}
                  </button>
                ))}
             </div>
           </div>
        }
      />

      {isLoading && (
        <div className="flex flex-col items-center justify-center p-24 gap-6 bg-white/40 border border-white/60 rounded-[3rem] animate-pulse">
          <RefreshCw size={32} className="animate-spin text-[var(--color-gold)]" />
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Decoding Ingress...</span>
        </div>
      )}

      <div className="space-y-6">
        <div className="flex items-center gap-6 mb-8 px-4 font-serif italic text-slate-300 text-lg">
           Today's Alerts
           <div className="h-[1px] flex-1 bg-slate-50"></div>
        </div>

        {notifications.length > 0 ? notifications.map((note, idx) => {
          const style = getNotificationStyle(note.message);
          return (
          <div 
            key={note.id} 
            className={`card group cursor-pointer transition-all hover:translate-x-1 border border-slate-100 rounded-[2.5rem] overflow-hidden relative animate-fade-up ${
              !note.isRead ? 'bg-white shadow-2xl shadow-black/[0.04]' : 'bg-slate-50/40 opacity-70'
            }`}
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <div className={`absolute left-0 top-0 h-full w-2 ${style.color}`}></div>
            <div className="p-10 flex gap-10">
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-2xl border transition-all duration-500 group-hover:rotate-3 ${
                !note.isRead ? 'bg-white border-white' : 'bg-slate-100 border-slate-200'
              }`}>
                {style.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--color-gold)]">{style.type}</span>
                  </div>
                  <span className="text-[11px] font-mono font-black text-slate-200 uppercase tracking-[0.2em]">{formatTime(note.createdAt)}</span>
                </div>
                <h4 className={`text-2xl font-serif leading-tight mb-8 max-w-4xl italic font-bold ${!note.isRead ? 'text-[var(--color-navy)]' : 'text-slate-400'}`}>
                  "{note.message}"
                </h4>
                <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                   <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                     {!note.isRead && (
                       <button 
                         onClick={(e) => { e.stopPropagation(); handleMarkAsRead(note.id); }}
                         className="h-11 px-6 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                       >
                         <Check size={16} /> Acknowledge
                       </button>
                     )}
                     <button 
                       onClick={(e) => { e.stopPropagation(); handleDelete(note.id); }}
                       className="h-11 px-6 bg-slate-50 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-rose-50 hover:text-rose-600 transition-all shadow-sm"
                     >
                       <Trash2 size={16} /> Dismiss Dispatch
                     </button>
                   </div>
                   {!note.isRead ? (
                     <div className="flex items-center gap-4 text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] font-mono">
                        <Zap size={16} fill="currentColor" className="animate-pulse" /> Finalized Signal
                     </div>
                   ) : (
                     <div className="flex items-center gap-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] font-mono">
                        Archive Record
                     </div>
                   )}
                </div>
              </div>
            </div>
            
            {/* Soft decorative blur for unread notes */}
            {!note.isRead && (
               <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--color-gold)]/5 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2 group-hover:bg-[var(--color-gold)]/10 transition-all pointer-events-none"></div>
            )}
            
            {/* Background pattern for unread */}
            {!note.isRead && (
               <div className="absolute bottom-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                  <ShieldCheck size={80} className="text-[var(--color-navy)]" />
               </div>
            )}
          </div>
          );
        }) : !isLoading && (
          <div className="py-32 flex flex-col items-center justify-center border-4 border-dashed border-slate-50 rounded-[4rem] bg-white/40 backdrop-blur-sm">
            <div className="w-24 h-24 bg-white border border-slate-50 rounded-[2rem] shadow-2xl flex items-center justify-center text-slate-200 mb-8 animate-bounce">
               <Bell size={48} />
            </div>
            <h3 className="text-3xl font-serif text-slate-300 font-bold italic mb-4">Silence Protocol</h3>
            <p className="text-[11px] text-slate-300 font-bold uppercase tracking-[0.4em]">No inbound dispatches detected in current terminal cycle.</p>
          </div>
        )}
        
        {notifications.length > 0 && (
          <div className="flex justify-center pt-20">
             <button className="flex flex-col items-center gap-4 group">
                <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-200 group-hover:text-[var(--color-gold)] transition-colors">Vertical Log Synchronized</div>
                <div className="h-20 w-[1px] bg-slate-50 group-hover:bg-[var(--color-gold)] transition-colors"></div>
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
