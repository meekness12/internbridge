import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Home, 
  Briefcase, 
  FileText, 
  CheckSquare, 
  MessageSquare, 
  Bell, 
  BarChart2,
  ChevronDown,
  Users,
  Building,
  Globe,
  Zap,
  ShieldCheck,
  Settings,
  LayoutGrid,
  Menu
} from 'lucide-react';

import { ProfileDropdown } from './ProfileDropdown';
import authService from '../../api/authService';

const DashboardLayout: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [userProfile, setUserProfile] = React.useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
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
    { icon: <LayoutGrid size={24} />, path: '/dashboard', label: 'Home' },
    { icon: <Users size={24} />, path: '/dashboard/users', label: 'Users' },
    { icon: <Briefcase size={24} />, path: '/dashboard/companies', label: 'Partners' },
    { icon: <FileText size={24} />, path: '/dashboard/reports', label: 'Reports' },
    { icon: <CheckSquare size={24} />, path: '/dashboard/logs', label: 'Audit' },
    { icon: <MessageSquare size={24} />, path: '/dashboard/messages', label: 'Messaging' },
    { icon: <Bell size={24} />, path: '/dashboard/notifications', label: 'Notifications' },
  ] : isSchoolAdmin ? [
    { icon: <Home size={24} />, path: '/dashboard', label: 'Home' },
    { icon: <Building size={24} />, path: '/dashboard/faculties', label: 'Faculties' },
    { icon: <Users size={24} />, path: '/dashboard/students', label: 'Students' },
    { icon: <Briefcase size={24} />, path: '/dashboard/partners', label: 'Industry' },
    { icon: <CheckSquare size={24} />, path: '/dashboard/compliance', label: 'Governance' },
    { icon: <MessageSquare size={24} />, path: '/dashboard/messages', label: 'Messaging' },
    { icon: <Bell size={24} />, path: '/dashboard/notifications', label: 'Notifications' },
  ] : isLecturer ? [
    { icon: <Home size={24} />, path: '/dashboard', label: 'Home' },
    { icon: <Users size={24} />, path: '/dashboard/students', label: 'Cohort' },
    { icon: <Briefcase size={24} />, path: '/dashboard/placements', label: 'Placements' },
    { icon: <MessageSquare size={24} />, path: '/dashboard/messages', label: 'Messaging' },
    { icon: <Bell size={24} />, path: '/dashboard/notifications', label: 'Notifications' },
    { icon: <BarChart2 size={24} />, path: '/dashboard/analytics', label: 'Analytics' },
  ] : isCompany ? [
    { icon: <Home size={24} />, path: '/dashboard', label: 'Home' },
    { icon: <Users size={24} />, path: '/dashboard/applicants', label: 'Talent' },
    { icon: <Briefcase size={24} />, path: '/dashboard/interns', label: 'Interns' },
    { icon: <MessageSquare size={24} />, path: '/dashboard/messages', label: 'Messaging' },
    { icon: <Bell size={24} />, path: '/dashboard/notifications', label: 'Notifications' },
    { icon: <BarChart2 size={24} />, path: '/dashboard/analytics', label: 'Analytics' },
  ] : [
    { icon: <Home size={24} />, path: '/dashboard', label: 'Home' },
    { icon: <Briefcase size={24} />, path: '/dashboard/internships', label: 'Placements' },
    { icon: <MessageSquare size={24} />, path: '/dashboard/messages', label: 'Messaging' },
    { icon: <Bell size={24} />, path: '/dashboard/notifications', label: 'Notifications' },
    { icon: <BarChart2 size={24} />, path: '/dashboard/analytics', label: 'Performance' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-[#F4F2EE]">
      {/* LinkedIn-Style Professional Topbar (Forest Edition) */}
      <header className="h-[75px] flex items-center justify-center sticky top-0 z-[100] bg-[var(--color-forest)] border-b border-white/10 shadow-xl w-full font-sans px-4">
        <div className="max-w-[1128px] w-full flex items-center justify-between">
          
          <div className="flex items-center gap-3 flex-1 lg:flex-none">
            {/* Logo */}
            <Link to="/dashboard" className="w-10 h-10 bg-[var(--color-gold)] rounded-lg flex items-center justify-center font-serif font-black text-white text-xl shadow-lg hover:scale-105 transition-all no-underline">
              IB
            </Link>

            {/* Global Search Interface */}
            <div className="relative group ml-1 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[var(--color-gold)] transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search Nodes..." 
                className="bg-white/10 border-none rounded-md py-2.5 pl-10 pr-4 text-sm w-[280px] text-white placeholder:text-white/40 focus:w-[400px] focus:bg-white/20 focus:ring-2 focus:ring-[var(--color-gold)]/20 transition-all outline-none"
              />
            </div>
          </div>

          {/* Navigation Items (Icon over Label) */}
          <nav className="flex items-center h-full">
            <div className="flex items-center h-full lg:gap-1">
              {navItems.map((item, idx) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link 
                    key={idx} 
                    to={item.path} 
                    className={`flex flex-col items-center justify-center min-w-[90px] h-[75px] transition-all relative group no-underline ${
                      isActive ? 'text-[var(--color-gold)]' : 'text-[var(--color-gold)]/60 hover:text-[var(--color-gold)]'
                    }`}
                  >
                    <div className={`relative mb-1 group-hover:scale-110 transition-transform text-[var(--color-gold)]`}>
                      {React.cloneElement(item.icon as any, { size: 24 })}
                      {item.label === 'Notifications' && (
                        <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-rose-600 text-[10px] font-black text-white rounded-full flex items-center justify-center border-2 border-[var(--color-forest)]">3</span>
                      )}
                    </div>
                    <span className={`text-[11px] font-bold tracking-tight uppercase ${isActive ? 'text-[var(--color-gold)]' : 'text-[var(--color-gold)]/50 group-hover:text-[var(--color-gold)]'}`}>
                      {item.label}
                    </span>
                    {isActive && (
                      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[var(--color-gold)] shadow-[0_-2px_10px_rgba(184,131,26,0.6)] rounded-t-full"></div>
                    )}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-gold)]/20 scale-x-0 group-hover:scale-x-100 transition-all"></div>
                  </Link>
                );
              })}

              <div className="h-8 w-[1px] bg-white/10 mx-4 hidden lg:block"></div>

              {/* Profile Selection */}
              <div className="relative h-full">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex flex-col items-center justify-center min-w-[80px] h-[75px] transition-all group ${
                    isProfileOpen ? 'text-[var(--color-gold)]' : 'text-[var(--color-gold)]/60 hover:text-[var(--color-gold)]'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full mb-1 flex items-center justify-center text-white font-serif font-black text-[11px] shadow-lg border-2 border-[var(--color-gold)]/30 transition-transform group-hover:scale-110 ${
                    isCompany ? 'bg-amber-500' : isAdmin ? 'bg-rose-600' : isSchoolAdmin ? 'bg-indigo-600' : isLecturer ? 'bg-slate-700' : 'bg-[var(--color-forest)]'
                  }`}>
                    {userProfile?.name ? userProfile.name.split(' ').map((n: any) => n[0]).join('') : 'IB'}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className={`text-[11px] font-bold tracking-tight uppercase ${isProfileOpen ? 'text-[var(--color-gold)]' : 'text-[var(--color-gold)]/50 group-hover:text-[var(--color-gold)]'}`}>Me</span>
                    <ChevronDown size={12} className={`transition-transform text-[var(--color-gold)] ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                <ProfileDropdown 
                  isOpen={isProfileOpen} 
                  onClose={() => setIsProfileOpen(false)} 
                  user={{
                    name: userProfile?.name || (isCompany ? 'Daniel Owusu' : isAdmin ? 'Sarah Jenkins' : isSchoolAdmin ? 'Ama Kyeremeh' : isLecturer ? 'Prof. Samuel Mensah' : 'Aisha Ibrahim'),
                    role: userProfile?.role?.replace('_', ' ') || role.replace('_', ' '),
                    initials: userProfile?.name ? userProfile.name.split(' ').map((n: any) => n[0]).join('') : (isCompany ? 'DO' : isAdmin ? 'SJ' : isSchoolAdmin ? 'AK' : isLecturer ? 'SM' : 'AI'),
                    avatarColor: isCompany ? 'bg-amber-500' : isAdmin ? 'bg-rose-600' : isSchoolAdmin ? 'bg-indigo-600' : isLecturer ? 'bg-[var(--color-navy)]' : 'bg-[var(--color-forest)]'
                  }}
                />
              </div>

            </div>
          </nav>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <div className="flex flex-1 justify-center w-full min-h-screen">
        <div className="max-w-[1128px] w-full flex gap-6 pt-6 pb-20 px-4">
          
          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
