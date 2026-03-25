import React from 'react';
import { 
  User, 
  Globe, 
  LogOut, 
  Shield, 
  ChevronRight,
  Settings
} from 'lucide-react';
import authService from '../../api/authService';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    role: string;
    initials: string;
    avatarColor: string;
  };
}

/**
 * ProfileDropdown Component
 * Premium, high-fidelity profile management dropdown with institutional styling.
 */
export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ 
  isOpen, 
  onClose,
  user
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop for closing */}
      <div 
        className="fixed inset-0 z-[60] bg-transparent" 
        onClick={onClose}
      />
      
      <div className="absolute right-0 top-full mt-4 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl z-[70] overflow-hidden animate-fade-up origin-top-right">
        {/* Executive Header Section */}
        <div className="p-8 bg-[var(--color-navy)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <Shield size={120} className="rotate-12 text-white" />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${user.avatarColor} text-white font-serif font-black text-2xl shadow-2xl border-4 border-white/10 mb-4 transition-transform hover:scale-105`}>
              {user.initials}
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-serif font-black text-white leading-tight tracking-tight">{user.name}</span>
              <div className="flex items-center gap-2 mt-2">
                 <div className="h-1.5 w-1.5 bg-[var(--color-gold)] rounded-full animate-pulse"></div>
                 <span className="text-[10px] font-mono font-black text-[var(--color-gold)] uppercase tracking-[0.2em] opacity-90">{user.role}</span>
              </div>
            </div>
          </div>
          {/* Subtle Bottom Glow */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent opacity-40"></div>
        </div>

        {/* Menu Items */}
        <div className="p-4 bg-white">
          <div className="space-y-1">
            <button className="w-full flex items-center justify-between p-3.5 hover:bg-[var(--color-parchment)] rounded-xl group transition-all border border-transparent hover:border-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-400 group-hover:text-[var(--color-navy)] group-hover:bg-white group-hover:border-[var(--color-gold)] group-hover:shadow-sm transition-all">
                   <User size={18} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-black text-slate-700 group-hover:text-[var(--color-navy)]">Professional Profile</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Edit Credentials</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-[var(--color-gold)] group-hover:translate-x-0.5 transition-all" />
            </button>

            <button className="w-full flex items-center justify-between p-3.5 hover:bg-[var(--color-parchment)] rounded-xl group transition-all border border-transparent hover:border-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-400 group-hover:text-[var(--color-navy)] group-hover:bg-white group-hover:border-[var(--color-gold)] group-hover:shadow-sm transition-all">
                   <Globe size={18} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-black text-slate-700 group-hover:text-[var(--color-navy)]">Localization</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">English (UK) • Multi-lingual</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-[var(--color-gold)] group-hover:translate-x-0.5 transition-all" />
            </button>

            <button className="w-full flex items-center justify-between p-3.5 hover:bg-[var(--color-parchment)] rounded-xl group transition-all border border-transparent hover:border-slate-100">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-400 group-hover:text-[var(--color-navy)] group-hover:bg-white group-hover:border-[var(--color-gold)] group-hover:shadow-sm transition-all">
                   <Settings size={18} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-black text-slate-700 group-hover:text-[var(--color-navy)]">System Settings</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Interface Configurations</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-[var(--color-gold)] group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>

          <div className="h-px bg-slate-100 my-4 mx-2 opacity-60" />

          <button 
            onClick={() => authService.logout()}
            className="w-full flex items-center gap-4 p-3.5 hover:bg-rose-50 rounded-xl group transition-all border border-transparent hover:border-rose-100"
          >
            <div className="p-2.5 bg-white rounded-xl border border-slate-100 text-slate-400 group-hover:text-rose-600 group-hover:border-rose-200 group-hover:shadow-sm transition-all">
               <LogOut size={18} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-black text-slate-700 group-hover:text-rose-700">Institutional Logout</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5 group-hover:text-rose-400">Secure Session Exit</span>
            </div>
          </button>
        </div>

        {/* Footer/Version */}
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
           <span className="text-[8px] font-mono font-black text-slate-300 uppercase tracking-[0.2em]">v2.4.0 High-Fidelity</span>
           <span className="text-[8px] font-mono font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div> 
             Active Security
           </span>
        </div>
      </div>
    </>
  );
};
