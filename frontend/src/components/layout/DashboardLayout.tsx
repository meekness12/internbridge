import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Home, 
  Briefcase, 
  FileText, 
  CheckSquare, 
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
    { icon: <LayoutGrid size={24} />, path: '/dashboard', label: 'Dashboard' },
    { icon: <Users size={24} />, path: '/dashboard/users', label: 'Users' },
    { icon: <Briefcase size={24} />, path: '/dashboard/companies', label: 'Partners' },
    { icon: <FileText size={24} />, path: '/dashboard/reports', label: 'Reports' },
    { icon: <CheckSquare size={24} />, path: '/dashboard/logs', label: 'Audit Logs' },
    { icon: <Bell size={24} />, path: '/dashboard/notifications', label: 'Alerts' },
  ] : isSchoolAdmin ? [
    { icon: <Home size={24} />, path: '/dashboard', label: 'Home' },
    { icon: <Building size={24} />, path: '/dashboard/faculties', label: 'Faculties' },
    { icon: <Users size={24} />, path: '/dashboard/students', label: 'Students' },
    { icon: <Briefcase size={24} />, path: '/dashboard/partners', label: 'Industry' },
    { icon: <CheckSquare size={24} />, path: '/dashboard/compliance', label: 'Governance' },
    { icon: <Bell size={24} />, path: '/dashboard/notifications', label: 'Notifications' },
  ] : isLecturer ? [
    { icon: <Home size={24} />, path: '/dashboard', label: 'Home' },
    { icon: <Users size={24} />, path: '/dashboard/students', label: 'Cohort' },
    { icon: <Briefcase size={24} />, path: '/dashboard/placements', label: 'Placements' },
    { icon: <Bell size={24} />, path: '/dashboard/notifications', label: 'Notifications' },
    { icon: <BarChart2 size={24} />, path: '/dashboard/analytics', label: 'Analytics' },
  ] : isCompany ? [
    { icon: <Home size={24} />, path: '/dashboard', label: 'Home' },
    { icon: <Users size={24} />, path: '/dashboard/applicants', label: 'Talent' },
    { icon: <Briefcase size={24} />, path: '/dashboard/interns', label: 'Interns' },
    { icon: <Bell size={24} />, path: '/dashboard/notifications', label: 'Notifications' },
    { icon: <BarChart2 size={24} />, path: '/dashboard/analytics', label: 'Analytics' },
  ] : [
    { icon: <Home size={24} />, path: '/dashboard', label: 'Home' },
    { icon: <Briefcase size={24} />, path: '/dashboard/internships', label: 'Placements' },
    { icon: <Bell size={24} />, path: '/dashboard/notifications', label: 'Notifications' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-[var(--color-bg)]">
      {/* Modern Clean-Tech Topbar */}
      <header className="h-[80px] flex items-center justify-center sticky top-0 z-[100] bg-white border-b border-slate-200 shadow-sm w-full font-sans px-6">
        <div className="max-w-[1280px] w-full flex items-center justify-between">
          
          <div className="flex items-center gap-8 flex-1 lg:flex-none">
            {/* Logo: InternLink */}
            <Link to="/dashboard" className="flex items-center gap-2 no-underline group">
              <div className="w-10 h-10 bg-[var(--color-teal)] rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-105 transition-all">
                i
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">InternLink</span>
            </Link>
          </div>

          {/* Navigation Items (Clean Text Based) */}
          <nav className="flex items-center gap-8 h-full">
            <div className="flex items-center h-full gap-6">
              {navItems.map((item, idx) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link 
                    key={idx} 
                    to={item.path} 
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all no-underline text-sm font-bold tracking-tight ${
                      isActive 
                        ? 'bg-[var(--color-teal)] text-white shadow-md shadow-teal-500/20' 
                        : 'text-slate-500 hover:text-[var(--color-teal)] hover:bg-slate-50'
                    }`}
                  >
                    {React.cloneElement(item.icon as any, { size: 18 })}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="h-6 w-[1px] bg-slate-200 hidden lg:block"></div>

            {/* Profile Interface */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center gap-2 pl-2 pr-1 h-11 rounded-full border transition-all ${
                  isProfileOpen ? 'border-[var(--color-teal)] bg-slate-50' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-serif font-black text-[10px] shadow-lg transition-all ${
                  isCompany ? 'bg-amber-500' : isAdmin ? 'bg-[var(--color-teal)]' : isSchoolAdmin ? 'bg-indigo-600' : isLecturer ? 'bg-slate-700' : 'bg-[var(--color-teal)]'
                }`}>
                  {userProfile?.name ? userProfile.name.split(' ').map((n: any) => n[0]).join('') : (isAdmin ? 'SJ' : 'IB')}
                </div>
                <ChevronDown size={14} className={`transition-transform text-slate-400 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              <ProfileDropdown 
                isOpen={isProfileOpen} 
                onClose={() => setIsProfileOpen(false)} 
                user={{
                  name: userProfile?.name || (isCompany ? 'Daniel Owusu' : isAdmin ? 'Sarah Jenkins' : isSchoolAdmin ? 'Ama Kyeremeh' : isLecturer ? 'Prof. Samuel Mensah' : 'Aisha Ibrahim'),
                  role: userProfile?.role?.replace('_', ' ') || role.replace('_', ' '),
                  initials: userProfile?.name ? userProfile.name.split(' ').map((n: any) => n[0]).join('') : (isCompany ? 'DO' : isAdmin ? 'SJ' : isSchoolAdmin ? 'AK' : isLecturer ? 'SM' : 'AI'),
                  avatarColor: isCompany ? 'bg-amber-500' : isAdmin ? 'bg-[var(--color-teal)] shadow-glow-teal' : isSchoolAdmin ? 'bg-indigo-600' : isLecturer ? 'bg-slate-700' : 'bg-[var(--color-teal)]'
                }}
              />
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
