import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase, 
  FileText,
  ChevronRight,
  MessageSquare,
  Zap,
  RefreshCw,
  Trash2,
  Check
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
      return { icon: <AlertCircle className="text-rose-500" size={20} />, color: 'border-l-rose-500', type: 'URGENT' };
    }
    if (lower.includes('approved') || lower.includes('verified') || lower.includes('accepted')) {
      return { icon: <CheckCircle2 className="text-emerald-500" size={20} />, color: 'border-l-emerald-500', type: 'VERIFICATION' };
    }
    if (lower.includes('internship') || lower.includes('placement') || lower.includes('opportunity')) {
      return { icon: <Briefcase className="text-[var(--color-gold)]" size={20} />, color: 'border-l-[var(--color-gold)]', type: 'OPPORTUNITY' };
    }
    if (lower.includes('message') || lower.includes('dispatch') || lower.includes('contact')) {
      return { icon: <MessageSquare className="text-indigo-500" size={20} />, color: 'border-l-indigo-500', type: 'MESSAGE' };
    }
    if (lower.includes('contract') || lower.includes('document') || lower.includes('compliance')) {
      return { icon: <FileText className="text-slate-400" size={20} />, color: 'border-l-slate-300', type: 'COMPLIANCE' };
    }
    return { icon: <Bell className="text-[var(--color-navy)]" size={20} />, color: 'border-l-[var(--color-navy)]', type: 'SYSTEM' };
  };

  const formatTime = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-fade-in pb-20">
      <PremiumHeader 
        eyebrow="Dispatch Center"
        title="System"
        italicTitle="Updates"
        subtitle={`${notifications.length} notifications · ${unreadCount} unread`}
        eyebrowColor="text-[var(--color-gold)]"
        primaryAction={
           <div className="flex items-center gap-6">
             <button 
               onClick={handleAcknowledgeAll}
               disabled={unreadCount === 0}
               className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[var(--color-navy)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
             >
               Acknowledge All
             </button>
             <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-xl shadow-sm">
               <button 
                 onClick={() => setFilter('all')}
                 className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-[var(--color-navy)] text-white' : 'text-slate-400'}`}
               >All</button>
               <button 
                 onClick={() => setFilter('unread')}
                 className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${filter === 'unread' ? 'bg-[var(--color-navy)] text-white' : 'text-slate-400'}`}
               >
                 Unread {unreadCount > 0 && <span className="ml-1 bg-rose-500 text-white px-1.5 py-0.5 rounded text-[9px]">{unreadCount}</span>}
               </button>
             </div>
           </div>
        }
      />

      {isLoading && (
        <div className="flex items-center justify-center p-12 gap-4">
          <RefreshCw size={20} className="animate-spin text-[var(--color-gold)]" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading notifications...</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-4">
           <h2 className="label-mono text-[10px] tracking-[0.2em] font-bold text-[var(--color-navy)] opacity-60 uppercase">Incoming Dossier</h2>
           <div className="h-[1px] w-12 bg-slate-100"></div>
        </div>

        {notifications.length > 0 ? notifications.map((note) => {
          const style = getNotificationStyle(note.message);
          return (
          <div 
            key={note.id} 
            className={`card group cursor-pointer transition-all hover:shadow-xl border border-slate-200 rounded-2xl overflow-hidden relative ${
              !note.isRead ? 'bg-white' : 'bg-slate-50/50'
            }`}
          >
            <div className={`absolute left-0 top-0 h-full w-1 ${style.color}`}></div>
            <div className="p-8 flex gap-8">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner border group-hover:scale-110 transition-transform ${
                !note.isRead ? 'bg-white border-white' : 'bg-slate-100 border-slate-200'
              }`}>
                {style.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[var(--color-gold)]">{style.type}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-[0.2em]">{formatTime(note.createdAt)}</span>
                </div>
                <p className={`text-[15px] leading-relaxed mb-6 max-w-3xl italic font-medium ${!note.isRead ? 'text-[var(--color-navy)] opacity-80' : 'text-slate-400'}`}>
                  "{note.message}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                   <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                     {!note.isRead && (
                       <button 
                         onClick={() => handleMarkAsRead(note.id)}
                         className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em] flex items-center gap-2 hover:text-emerald-700 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-all"
                       >
                         <Check size={14} /> Mark Read
                       </button>
                     )}
                     <button 
                       onClick={() => handleDelete(note.id)}
                       className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 hover:text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-all"
                     >
                       <Trash2 size={14} /> Dismiss
                     </button>
                   </div>
                   {!note.isRead && (
                     <div className="flex items-center gap-2 text-[9px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                       <Zap size={12} fill="currentColor" /> New
                     </div>
                   )}
                </div>
              </div>
            </div>
            {!note.isRead && (
               <div className="absolute right-0 top-0 w-16 h-16 bg-[var(--color-gold)]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            )}
          </div>
          );
        }) : !isLoading && (
          <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
            <Bell size={48} className="text-slate-200 mb-6" />
            <p className="text-sm font-bold text-slate-400 italic mb-2">All clear — no notifications</p>
            <p className="text-xs text-slate-300">System dispatches will appear here when they arrive.</p>
          </div>
        )}
        
        {notifications.length > 0 && (
          <div className="flex justify-center pt-12">
            <button className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300 hover:text-[var(--color-navy)] transition-all flex items-center gap-8 group">
               <span className="w-24 h-[1px] bg-slate-100 group-hover:w-32 transition-all"></span>
               Archive Synchronized
               <span className="w-24 h-[1px] bg-slate-100 group-hover:w-32 transition-all"></span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
