import React from 'react';
import { 
  User, 
  Globe, 
  LogOut, 
  Settings,
  HelpCircle,
  FileText,
  Briefcase,
  ChevronRight
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
 * Clean, LinkedIn-inspired profile management dropdown with institutional accents.
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
        className="fixed inset-0 z-[60] bg-transparent font-sans" 
        onClick={onClose}
      />
      
      <div className="absolute right-0 top-[75px] w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-[70] overflow-hidden animate-fade-in origin-top-right">
        {/* Profile Summary Section */}
        <div className="p-4 border-b border-slate-100">
          <div className="flex gap-3 items-center mb-3">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${user.avatarColor} text-white font-serif font-black text-xl shadow-sm`}>
              {user.initials}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-base font-bold text-slate-900 truncate tracking-tight">{user.name}</span>
              <span className="text-xs text-slate-500 font-medium truncate">{user.role.replace('_', ' ')}</span>
            </div>
          </div>
          <button className="w-full py-1.5 border border-[var(--color-forest)] text-[var(--color-forest)] rounded-full text-[13px] font-black uppercase tracking-tight hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
            View Profile
          </button>
        </div>

        {/* Account Section */}
        <div className="p-2 border-b border-slate-100">
           <h4 className="px-3 py-1 text-[13px] font-bold text-slate-900">Account</h4>
           <div className="space-y-0.5">
             <button className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-slate-50 rounded transition-colors group">
               <span className="text-xs font-bold text-slate-500 group-hover:underline">Settings & Privacy</span>
             </button>
             <button className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-slate-50 rounded transition-colors group">
               <span className="text-xs font-bold text-slate-500 group-hover:underline">Help</span>
             </button>
             <button className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-slate-50 rounded transition-colors group">
               <span className="text-xs font-bold text-slate-500 group-hover:underline">Language</span>
             </button>
           </div>
        </div>

        {/* Manage Section */}
        <div className="p-2 border-b border-slate-100">
           <h4 className="px-3 py-1 text-[13px] font-bold text-slate-900">Manage</h4>
           <div className="space-y-0.5">
             <button className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-slate-50 rounded transition-colors group">
               <span className="text-xs font-bold text-slate-500 group-hover:underline">Posts & Activity</span>
             </button>
             <button className="w-full flex items-center justify-between px-3 py-1.5 hover:bg-slate-50 rounded transition-colors group">
               <span className="text-xs font-bold text-slate-500 group-hover:underline">Placements Management</span>
             </button>
           </div>
        </div>

        {/* Logout Action */}
        <div className="p-1">
          <button 
            onClick={() => authService.logout()}
            className="w-full text-left px-4 py-3 text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors hover:underline"
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};
