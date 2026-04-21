import React from 'react';
import authService from '../../api/authService';
import { Link } from 'react-router-dom';

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
 * High-fidelity "Clean Tech" profile management dropdown with editorial accents.
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
        className="fixed inset-0 z-[160] bg-transparent" 
        onClick={onClose}
      />
      
      <div className="absolute right-0 top-[65px] w-80 bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] shadow-2xl z-[170] overflow-hidden animate-fade-in origin-top-right ring-1 ring-black/5">
        
        {/* Profile Header */}
        <div className="p-8 pb-6">
          <div className="flex gap-4 items-center mb-6">
             <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-serif font-black text-2xl shadow-xl shadow-indigo-500/10">
                {user.initials}
             </div>
             <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">{user.role.replace('_', ' ')}</span>
                <span className="text-lg font-bold text-[var(--text)] truncate tracking-tight leading-tight">{user.name}</span>
             </div>
          </div>
          
          <Link 
            to="/dashboard/profile"
            onClick={onClose}
            className="block w-full py-3.5 border-2 border-[var(--accent)] text-[var(--accent)] rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[var(--accent)] hover:text-white transition-all text-center no-underline shadow-sm active:scale-95"
          >
             View Profile
          </Link>
        </div>

        {/* Account Section */}
        <div className="px-5 py-4 border-t border-slate-50">
           <h4 className="px-4 py-1.5 text-[15px] font-heading font-bold text-[var(--text)] mb-1">Account</h4>
           <div className="space-y-0.5">
              <Link 
                to="/dashboard/help"
                onClick={onClose}
                className="w-full h-11 flex items-center px-4 hover:bg-[var(--background)] rounded-xl transition-all group no-underline"
              >
                 <span className="text-sm font-bold text-[var(--color-muted)] group-hover:text-[var(--text)]">Help</span>
              </Link>
              <button className="w-full h-11 flex items-center px-4 hover:bg-[var(--background)] rounded-xl transition-all group">
                 <span className="text-sm font-bold text-[var(--color-muted)] group-hover:text-[var(--text)]">Language</span>
              </button>
           </div>
        </div>

        {/* Sign Out Action */}
        <div className="p-3">
           <button 
             onClick={() => authService.logout()}
             className="w-full h-14 flex items-center px-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] hover:bg-rose-50 hover:text-rose-500 rounded-2xl transition-all"
           >
             Sign Out
           </button>
        </div>
      </div>
    </>
  );
};
