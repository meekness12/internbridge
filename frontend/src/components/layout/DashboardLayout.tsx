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
  ChevronDown
} from 'lucide-react';

const DashboardLayout: React.FC = () => {
  const location = useLocation();

  const sidebarItems = [
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

          {/* Search Bar */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
            <input 
              type="text" 
              placeholder="Search placements, students, compani" 
              className="bg-[#1B2B24] border-none rounded-full py-2 pl-10 pr-4 text-sm w-[360px] placeholder:text-white/40 focus:ring-1 focus:ring-[var(--color-gold)] transition-all outline-none"
            />
          </div>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-5 text-white/80">
            <Link to="/dashboard" className="hover:text-white transition-colors relative">
               <Home size={20} className={`${location.pathname === '/dashboard' ? 'fill-[var(--color-gold)] text-[var(--color-gold)]' : ''}`} />
               {location.pathname === '/dashboard' && (
                 <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--color-gold)] rounded-full"></div>
               )}
            </Link>
            <Link to="/dashboard/internships" className="hover:text-white transition-colors relative">
              <Briefcase size={20} />
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">1</span>
            </Link>
            <Link to="/dashboard/logbook" className="hover:text-white transition-colors"><FileText size={20} /></Link>
            <Link to="/dashboard/contracts" className="hover:text-white transition-colors"><CheckSquare size={20} /></Link>
            <Link to="/dashboard/messages" className="hover:text-white transition-colors"><MessageSquare size={20} /></Link>
            <Link to="/dashboard/notifications" className="hover:text-white transition-colors"><Bell size={20} /></Link>
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-3 bg-[#1B2B24] border border-white/10 rounded-full py-1.5 pl-4 pr-1.5 cursor-pointer hover:bg-[#25392F] transition-all">
            <div className="flex flex-col items-end leading-tight mr-1">
              <span className="text-sm font-bold text-white">Aisha Ibrahim</span>
              <span className="text-[10px] text-white/60 font-medium font-mono uppercase tracking-widest">Intern <span className="mx-1 opacity-40">•</span> Week 7/16</span>
            </div>
            <div className="w-8 h-8 bg-[var(--color-gold)] rounded-full flex items-center justify-center text-black font-bold text-xs border border-white/20">
              AI
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
