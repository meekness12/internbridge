import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  MoreHorizontal,
  Circle
} from 'lucide-react';
import notificationService from '../../api/notificationService';
import type { NotificationDTO } from '../../api/notificationService';
import { useToast } from '../../context/ToastContext';

const Notifications: React.FC = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<NotificationDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const userId = localStorage.getItem('userId') || '';

  const fetchNotifications = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const data = filter === 'unread' 
        ? await notificationService.getUnreadNotifications(userId)
        : await notificationService.getMyNotifications(userId);
      setNotifications(data);
    } catch {
      console.error('Failed to load notifications');
    } finally {
      setIsLoading(false);
    }
  }, [userId, filter]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch {
      toast('Failed to acknowledge notification.', 'error');
    }
  };

  const getRelativeTime = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 1) return 'now';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d`;
    const weeks = Math.floor(days / 7);
    return `${weeks}w`;
  };

  const parseMessage = (msg: string) => {
    // Basic bolding for common keywords to simulate Facebook style
    const keywords = ['Hired', 'Congratulations', 'Approved', 'Rejected', 'Deadline', 'New', 'Required', 'Verified'];
    let parsed = msg;
    keywords.forEach(word => {
      const reg = new RegExp(`(${word})`, 'gi');
      parsed = parsed.replace(reg, '<strong>$1</strong>');
    });
    return <span dangerouslySetInnerHTML={{ __html: parsed }} />;
  };

  const getIcon = (msg: string) => {
    const lower = msg.toLowerCase();
    if (lower.includes('hired') || lower.includes('congratulations') || lower.includes('approved')) return <CheckCircle2 size={16} className="text-white" />;
    if (lower.includes('urgent') || lower.includes('deadline') || lower.includes('rejected')) return <AlertCircle size={16} className="text-white" />;
    return <Bell size={16} className="text-white" />;
  };

  const getBgColor = (msg: string) => {
    const lower = msg.toLowerCase();
    if (lower.includes('hired') || lower.includes('approved')) return 'bg-emerald-500';
    if (lower.includes('urgent') || lower.includes('deadline') || lower.includes('rejected')) return 'bg-rose-500';
    return 'bg-[var(--color-brand)]';
  };

  const unreadNotifications = notifications.filter(n => !n.isRead);
  const readNotifications = notifications.filter(n => n.isRead);

  return (
    <div className="max-w-[680px] mx-auto animate-fade-in pb-20 mt-4 px-4 font-sans">
      
      {/* Header (FB Style) */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 font-sans tracking-tight">Notifications</h1>
        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Pill Filters */}
      <div className="flex gap-2 mb-8">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === 'all' ? 'bg-[var(--color-teal-faint)] text-[var(--color-brand)]' : 'hover:bg-slate-100 text-slate-600'}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filter === 'unread' ? 'bg-[var(--color-teal-faint)] text-[var(--color-brand)]' : 'hover:bg-slate-100 text-slate-600'}`}
        >
          Unread
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-4 p-4 items-center animate-pulse">
              <div className="w-14 h-14 rounded-full bg-slate-100"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                <div className="h-3 bg-slate-50 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          
          {unreadNotifications.length > 0 && (
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 px-2 mb-3">New</h3>
              {unreadNotifications.map(note => (
                <div 
                  key={note.id}
                  onClick={() => handleMarkAsRead(note.id)}
                  className="flex gap-4 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-all group relative items-center"
                >
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-[var(--color-brand)] font-bold text-lg overflow-hidden border border-slate-50">
                       {note.message[0] || 'N'}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-7 h-7 rounded-full ${getBgColor(note.message)} flex items-center justify-center border-2 border-white shadow-sm`}>
                      {getIcon(note.message)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] text-slate-800 leading-tight">
                      {parseMessage(note.message)}
                    </p>
                    <span className="text-xs font-bold text-[var(--color-brand)] mt-1 block">
                      {getRelativeTime(note.createdAt)}
                    </span>
                  </div>

                  <div className="shrink-0 ml-2">
                    <Circle size={12} fill="var(--color-teal)" className="text-[var(--color-brand)]" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {readNotifications.length > 0 && (
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 px-2 mb-3">Earlier</h3>
              {readNotifications.map(note => (
                <div 
                  key={note.id}
                  className="flex gap-4 p-3 rounded-xl hover:bg-slate-100 cursor-pointer transition-all group items-center"
                >
                  <div className="relative shrink-0 opacity-80">
                    <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-lg overflow-hidden border border-slate-50">
                       {note.message[0] || 'N'}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-slate-400 flex items-center justify-center border-2 border-white shadow-sm">
                      {getIcon(note.message)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] text-slate-500 leading-tight">
                      {parseMessage(note.message)}
                    </p>
                    <span className="text-xs font-medium text-slate-400 mt-1 block">
                      {getRelativeTime(note.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {notifications.length === 0 && (
            <div className="text-center py-20">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="text-slate-200" size={32} />
               </div>
               <p className="text-slate-400 font-medium">No notifications yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
