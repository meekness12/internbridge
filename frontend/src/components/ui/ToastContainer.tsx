import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  X, 
  Bell 
} from 'lucide-react';
import type { ToastType } from '../../context/ToastContext';

interface ToastItemProps {
  id: string;
  message: string;
  type: ToastType;
  title?: string;
  onClose: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ id, message, type, title, onClose }) => {
  const icons = {
    success: <CheckCircle2 className="text-emerald-500" size={20} />,
    error: <X className="text-rose-500" size={20} />,
    warning: <AlertTriangle className="text-amber-500" size={20} />,
    info: <Info className="text-indigo-500" size={20} />
  };

  const backgrounds = {
    success: 'bg-emerald-50/80 border-emerald-100',
    error: 'bg-rose-50/80 border-rose-100',
    warning: 'bg-amber-50/80 border-amber-100',
    info: 'bg-indigo-50/80 border-indigo-100'
  };

  return (
    <div className={`w-80 p-5 rounded-2xl border backdrop-blur-md shadow-2xl flex gap-4 animate-slide-in relative group transition-all hover:scale-[1.02] ${backgrounds[type]}`}>
      <div className="shrink-0 mt-0.5">
        {icons[type]}
      </div>
      <div className="flex-1">
        {title && <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--color-navy)] mb-1">{title}</div>}
        <p className="text-[12px] font-medium text-slate-700 leading-relaxed font-sans">{message}</p>
      </div>
      <button 
        onClick={() => onClose(id)}
        className="absolute top-4 right-4 text-slate-300 hover:text-[var(--color-navy)] transition-colors opacity-0 group-hover:opacity-100"
      >
        <X size={14} />
      </button>
      
      {/* Decorative Branding */}
      <div className="absolute -bottom-1 -right-1 opacity-5 group-hover:opacity-10 transition-opacity">
        <Bell size={60} />
      </div>
    </div>
  );
};

export const ToastContainer: React.FC<{ toasts: any[], removeToast: (id: string) => void }> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-4">
      {toasts.map(t => (
        <ToastItem key={t.id} {...t} onClose={removeToast} />
      ))}
    </div>
  );
};
