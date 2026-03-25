import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
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
  Building
} from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';

const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const role = localStorage.getItem('role') || 'INTERN'; 
  const isCompany = role === 'COMPANY_ADMIN';
  const isLecturer = role === 'SUPERVISOR';
  const isAdmin = role === 'SUPER_ADMIN';
  const isSchoolAdmin = role === 'SCHOOL_ADMIN';

  const sidebarItems = isAdmin ? [
    { icon: <Home size={22} />, path: '/dashboard', label: 'Admin Console' },
    { icon: <Users size={22} />, path: '/dashboard/users', label: 'User Management' },
    { icon: <Briefcase size={22} />, path: '/dashboard/companies', label: 'Company Partners' },
    { icon: <FileText size={22} />, path: '/dashboard/reports', label: 'System Reports' },
    { icon: <CheckSquare size={22} />, path: '/dashboard/logs', label: 'Audit Logs' },
    { icon: <Bell size={22} />, path: '/dashboard/notifications', label: 'System Alerts', badge: '2' },
    { icon: <BarChart2 size={22} />, path: '/dashboard/analytics', label: 'Global Analytics' },
  ] : isSchoolAdmin ? [
    { icon: <Home size={22} />, path: '/dashboard', label: 'Academic Console' },
    { icon: <Building size={22} />, path: '/dashboard/faculties', label: 'Faculty Management' },
    { icon: <Users size={22} />, path: '/dashboard/students', label: 'Student Directory' },
    { icon: <Briefcase size={22} />, path: '/dashboard/partners', label: 'Industry Partners' },
    { icon: <CheckSquare size={22} />, path: '/dashboard/compliance', label: 'Compliance & Audits' },
    { icon: <FileText size={22} />, path: '/dashboard/reports', label: 'Academic Reports' },
    { icon: <BarChart2 size={22} />, path: '/dashboard/analytics', label: 'School Analytics' },
  ] : isLecturer ? [
    { icon: <Home size={22} />, path: '/dashboard', label: 'Supervision Home' },
    { icon: <Users size={22} />, path: '/dashboard/students', label: 'My Students', badge: '18' },
    { icon: <FileText size={22} />, path: '/dashboard/logbook', label: 'Logbook Grading', badge: '7' },
    { icon: <Briefcase size={22} />, path: '/dashboard/placements', label: 'Placements' },
    { icon: <MessageSquare size={22} />, path: '/dashboard/messages', label: 'Messages' },
    { icon: <Bell size={22} />, path: '/dashboard/notifications', label: 'Notifications', badge: '3' },
    { icon: <BarChart2 size={22} />, path: '/dashboard/analytics', label: 'Academic Analytics' },
  ] : isCompany ? [
    { icon: <Home size={22} />, path: '/dashboard', label: 'Home' },
    { icon: <Users size={22} />, path: '/dashboard/applicants', label: 'Applicants', badge: '12' },
    { icon: <Briefcase size={22} />, path: '/dashboard/interns', label: 'Interns', badge: '8' },
    { icon: <FileText size={22} />, path: '/dashboard/logbook', label: 'Logbook Review' },
    { icon: <MessageSquare size={22} />, path: '/dashboard/messages', label: 'Messages' },
    { icon: <Bell size={22} />, path: '/dashboard/notifications', label: 'Notifications', badge: '5' },
    { icon: <BarChart2 size={22} />, path: '/dashboard/analytics', label: 'Analytics' },
  ] : [
    { icon: <Home size={22} />, path: '/dashboard', label: 'Home' },
    { icon: <Briefcase size={22} />, path: '/dashboard/internships', label: 'Placements', badge: '3' },
    { icon: <FileText size={22} />, path: '/dashboard/logbook', label: 'Logbooks' },
    { icon: <CheckSquare size={22} />, path: '/dashboard/contracts', label: 'Contracts' },
    { icon: <MessageSquare size={22} />, path: '/dashboard/messages', label: 'Messages' },
    { icon: <Bell size={22} />, path: '/dashboard/notifications', label: 'Notifications', badge: '7' },
    { icon: <BarChart2 size={22} />, path: '/dashboard/analytics', label: 'Analytics' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-[var(--color-navy)]">
      {/* Top Navbar */}
      <header className="topnav h-16 flex items-center px-6 justify-between text-white sticky top-0 z-50">
        <div className="flex items-center gap-8">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--color-gold)] rounded flex items-center justify-center font-serif font-bold text-black text-xl">
              IB
            </div>
            <span className="font-serif italic text-2xl tracking-tight hidden md:block">InternBridge</span>
          </div>

          {/* Role Indicator - New from image */}
          {isCompany && (
            <div className="h-6 w-[1px] bg-white/20 hidden lg:block mx-2"></div>
          )}
          {isCompany && (
            <div className="hidden lg:flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest opacity-90">
              Techwave Technologies <span className="text-[var(--color-gold)]">•</span> Company Admin
            </div>
          )}

          {/* Search Bar */}
          <div className="relative hidden xl:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={17} />
            <input 
              type="text" 
              placeholder="Search interns, contracts, ap" 
              className="bg-[#1B2B24] border border-white/10 rounded-full py-2 pl-9 pr-4 text-xs w-[320px] placeholder:text-white/40 focus:ring-1 focus:ring-[var(--color-gold)] transition-all outline-none"
            />
          </div>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-5 text-white/80">
            {sidebarItems.slice(0, 6).map((item, idx) => (
              <Link key={idx} to={item.path} className="hover:text-white transition-colors relative">
                {React.cloneElement(item.icon as any, { 
                  size: 20, 
                  className: location.pathname === item.path ? 'fill-[var(--color-gold)] text-[var(--color-gold)]' : '' 
                })}
                {item.badge && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
                {location.pathname === item.path && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--color-gold)] rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-5 mr-2">
            <div className="relative text-white/60 hover:text-white transition-colors cursor-pointer">
              <Bell size={20} />
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--color-forest)]"></div>
            </div>
            <span className="text-[10px] font-mono font-bold text-white/60 opacity-80">(o)</span>
            <ThemeToggle />
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-3 bg-[#1B2B24] border border-white/10 rounded-full py-1.5 pl-4 pr-1.5 cursor-pointer hover:bg-[#25392F] transition-all">
            <div className="flex flex-col items-end leading-tight mr-1">
              <span className="text-sm font-bold text-white">
                {isCompany ? 'Daniel Owusu' : isAdmin ? 'Sarah Jenkins' : isSchoolAdmin ? 'Ama Kyeremeh' : isLecturer ? 'Prof. Samuel Mensah' : 'Aisha Ibrahim'}
              </span>
              <span className="text-[10px] text-white/60 font-medium font-mono uppercase tracking-widest">
                {isCompany ? 'Company Admin • CTO' : isAdmin ? 'Systems Administrator' : isSchoolAdmin ? 'Academic Registrar' : isLecturer ? 'Academic Supervisor' : 'Intern'} 
                {!isCompany && !isLecturer && !isAdmin && !isSchoolAdmin && <><span className="mx-1 opacity-40">•</span> Week 7/16</>}
              </span>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-black font-bold text-xs border border-white/20 ${
              isCompany ? 'bg-[#EAB308]' : isAdmin ? 'bg-red-500' : isSchoolAdmin ? 'bg-indigo-400' : isLecturer ? 'bg-purple-400' : 'bg-[var(--color-gold)]'
            }`}>
              {isCompany ? 'DO' : isAdmin ? 'SJ' : isSchoolAdmin ? 'AK' : isLecturer ? 'SM' : 'AI'}
            </div>
            <ChevronDown size={14} className="text-white/40 ml-0.5" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (Rail) */}
        <aside className="w-20 bg-[var(--color-cream)] border-r border-[var(--color-border)] flex flex-col items-center py-6 gap-4 shrink-0">
          {sidebarItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={idx} 
                to={item.path}
                className={`rail-item relative ${isActive ? 'active' : ''}`}
                aria-label={item.label}
              >
                {item.icon}
                {item.badge && (
                  <span className="absolute top-1 right-1 bg-red-600 text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold border border-[var(--color-cream)]">
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[var(--color-navy)] rounded-r-full"></div>
                )}
              </Link>
            );
          })}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 bg-[var(--background)] p-12 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
