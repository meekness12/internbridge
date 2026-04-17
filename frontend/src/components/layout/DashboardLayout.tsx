import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  FileText, 
  Bell, 
  BarChart2,
  Users,
  Building,
  LayoutGrid,
  Search,
  LogOut
} from 'lucide-react';

import { ProfileDropdown } from './ProfileDropdown';
import authService, { type UserProfile } from '../../api/authService';

/**
 * DashboardLayout Component
 * Clean Fintech Redesign (Foxstocks inspired).
 * Features a white sidebar, minimalist topbar, and soft-purple active states.
 */
const DashboardLayout: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);
  const location = useLocation();
  const role = localStorage.getItem('role') || 'INTERN'; 
  
  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (authService.isAuthenticated()) {
          const data = await authService.getMe();
          setUserProfile(data);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const isCompany = role === 'COMPANY_ADMIN';
  const isLecturer = role === 'SUPERVISOR';
  const isAdmin = role === 'SUPER_ADMIN';
  const isSchoolAdmin = role === 'SCHOOL_ADMIN';

  const navItems = isAdmin ? [
    { icon: <LayoutGrid size={20} />, path: '/dashboard', label: 'Dashboard' },
    { icon: <Users size={20} />, path: '/dashboard/users', label: 'Users' },
    { icon: <Building size={20} />, path: '/dashboard/companies', label: 'Partners' },
    { icon: <FileText size={20} />, path: '/dashboard/reports', label: 'Reports' },
  ] : isSchoolAdmin ? [
    { icon: <Home size={20} />, path: '/dashboard', label: 'Home' },
    { icon: <Building size={20} />, path: '/dashboard/faculties', label: 'Faculties' },
    { icon: <Users size={20} />, path: '/dashboard/students', label: 'Students' },
    { icon: <Briefcase size={20} />, path: '/dashboard/partners', label: 'Industry' },
  ] : isLecturer ? [
    { icon: <Home size={20} />, path: '/dashboard', label: 'Home' },
    { icon: <Users size={20} />, path: '/dashboard/students', label: 'Cohort' },
    { icon: <Briefcase size={20} />, path: '/dashboard/placements', label: 'Placements' },
    { icon: <BarChart2 size={20} />, path: '/dashboard/analytics', label: 'Analytics' },
  ] : isCompany ? [
    { icon: <Home size={20} />, path: '/dashboard', label: 'Dashboard' },
    { icon: <Users size={20} />, path: '/dashboard/applicants', label: 'Applicants' },
    { icon: <Briefcase size={20} />, path: '/dashboard/interns', label: 'Active Interns' },
    { icon: <BarChart2 size={20} />, path: '/dashboard/analytics', label: 'Analytics' },
  ] : [
    { icon: <Home size={20} />, path: '/dashboard', label: 'Home' },
    { icon: <Briefcase size={20} />, path: '/dashboard/internships', label: 'Placements' },
  ];

  return (
    <div className="min-h-screen flex bg-[#F8F9FB] font-sans text-slate-900">
      
      {/* ── Sidebar (White & Minimalist) ── */}
      <aside className="w-60 bg-white border-r border-slate-100 flex flex-col fixed inset-y-0 z-[100] hidden lg:flex">
         <div className="p-8 mb-4">
            <Link to="/dashboard" className="flex items-center gap-3 no-underline group">
               <div className="w-8 h-8 bg-[var(--color-brand)] rounded-lg flex items-center justify-center text-white font-black text-lg shadow-lg">i</div>
               <span className="text-xl font-bold tracking-tight text-slate-900">InternLink</span>
            </Link>
         </div>

         <div className="px-4 flex-1 flex flex-col gap-8">
            <div>
               <span className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 block">User Panel</span>
               <nav className="space-y-1">
                  {navItems.map((item, idx) => {
                     const isActive = location.pathname === item.path;
                     return (
                        <Link 
                           key={idx} 
                           to={item.path} 
                           className={`flex items-center gap-4 px-4 h-12 rounded-2xl transition-all no-underline text-sm font-semibold ${
                              isActive 
                                 ? 'bg-[var(--color-brand-light)] text-[var(--color-brand)]' 
                                 : 'text-slate-500 hover:bg-slate-50'
                           }`}
                        >
                           {React.cloneElement(item.icon as any, { className: isActive ? 'text-[var(--color-brand)]' : 'text-slate-400' })}
                           <span>{item.label}</span>
                        </Link>
                     );
                  })}
               </nav>
            </div>

            {/* Bottom Section Card (Foxstocks inspired) */}
            <div className="mt-auto mb-8 px-4">
               <div className="bg-[#F3FCE2] rounded-[2rem] p-6 relative overflow-hidden group">
                  <div className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center mb-4">
                     <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mb-2 leading-tight">Thoughts Time</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">Efficient talent mapping requires focus. Sync your logs daily.</p>
               </div>
            </div>
         </div>

         <div className="p-6 border-t border-slate-50">
            <button 
              onClick={() => authService.logout()}
              className="w-full flex items-center gap-4 px-4 h-12 text-slate-400 hover:text-rose-500 transition-all font-semibold text-sm"
            >
               <LogOut size={20} />
               <span>Logout</span>
            </button>
         </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col lg:pl-60">
         {/* Topbar: Clean & Minimalist */}
         <header className="h-16 flex items-center justify-between px-8 sticky top-0 z-[90] bg-[#F8F9FB]/80 backdrop-blur-md">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
               Hello {userProfile?.name?.split(' ')[0] || 'User'},
            </h2>

            <div className="flex items-center gap-8">
               <div className="relative group hidden md:block">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[var(--color-brand)] transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search for applications..."
                    className="w-80 h-11 bg-slate-200/50 border-none rounded-2xl pl-12 pr-6 text-sm font-medium outline-none focus:bg-white focus:ring-4 focus:ring-[var(--color-brand)]/5 transition-all"
                  />
               </div>
               
               <div className="flex items-center gap-4">
                  <button className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-slate-400 hover:text-slate-900 shadow-sm">
                     <Bell size={20} />
                  </button>
                  <div className="relative">
                     <button 
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="w-11 h-11 rounded-2xl bg-white overflow-hidden shadow-sm border border-slate-50 p-0.5"
                     >
                        <div className={`w-full h-full rounded-2xl flex items-center justify-center text-white font-black text-xs ${
                           isCompany ? 'bg-amber-500' : 'bg-[var(--color-brand)]'
                        }`}>
                           {userProfile?.name ? userProfile.name.split(' ').map((n: string) => n[0]).join('') : 'IB'}
                        </div>
                     </button>
                     <ProfileDropdown 
                        isOpen={isProfileOpen} 
                        onClose={() => setIsProfileOpen(false)} 
                        user={{
                           name: userProfile?.name || 'Aisha Ibrahim',
                           role: userProfile?.role?.replace('_', ' ') || role.replace('_', ' '),
                           initials: userProfile?.name ? userProfile.name.split(' ').map((n: string) => n[0]).join('') : 'AI',
                           avatarColor: isCompany ? 'bg-amber-500' : 'bg-[var(--color-brand)]'
                        }}
                     />
                  </div>
               </div>
            </div>
         </header>

         {/* Content Viewport */}
         <main className="flex-1 p-8 pb-20">
            <Outlet />
         </main>
      </div>

      {/* Mobile Nav: Simplified Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[150] bg-white border-t border-slate-100 flex items-center justify-around h-16 pb-safe px-4 shadow-lg">
         {navItems.slice(0, 4).map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
               <Link 
                  key={idx} 
                  to={item.path} 
                  className={`flex flex-col items-center justify-center gap-1 transition-all ${
                     isActive ? 'text-[var(--color-brand)]' : 'text-slate-400'
                  }`}
               >
                  {React.cloneElement(item.icon as any, { size: 20 })}
                  <span className="text-[10px] font-bold">{item.label.split(' ')[0]}</span>
               </Link>
            );
         })}
      </div>
    </div>
  );
};

export default DashboardLayout;
