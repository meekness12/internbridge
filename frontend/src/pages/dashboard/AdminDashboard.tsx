import React, { useState } from 'react';

/**
 * Admin Dashboard Component (System Administration)
 * Features: Stats Row (4 cards), Recent Platform Activity Table.
 */
const AdminDashboard: React.FC = () => {
  const [stats] = useState({
    totalStudents: 1240,
    totalCompanies: 85,
    activePlacements: 412,
    systemAlerts: 2,
  });

  const [auditLogs] = useState([
    { id: '1', user: 'Admin_Sarah', action: 'Approved New Company: CloudSphere', time: '10m ago', status: 'SUCCESS' },
    { id: '2', user: 'System', action: 'Automatic Backup Completed', time: '1h ago', status: 'SUCCESS' },
    { id: '3', user: 'Lecturer_Smith', action: 'Grade Override: John Doe', time: '3h ago', status: 'WARNING' },
    { id: '4', user: 'Student_Alex', action: 'Failed Login Attempt (3x)', time: '5h ago', status: 'CAUTION' },
  ]);

  return (
    <div className="space-y-10 animate-fade-in font-sans">
      <header>
        <h1 className="text-3xl font-heading font-black text-slate-800 dark:text-white uppercase tracking-tighter">
          System <span className="text-red-600 dark:text-red-500">Administration</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Oversee platform health, user activity, and system logs.</p>
      </header>

      {/* Stats Row - 4 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Students', value: stats.totalStudents, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
          { label: 'Total Companies', value: stats.totalCompanies, icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
          { label: 'Active Placements', value: stats.activePlacements, icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
          { label: 'System Alerts', value: stats.systemAlerts, icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/40 border border-white/60 dark:bg-[#111A3A]/40 dark:border-white/10 backdrop-blur-xl shadow-xl rounded-2xl p-6 transition-all hover:shadow-red-500/10 hover:border-red-500/20">
            <div className="flex flex-col gap-4">
              <div className={`p-3 w-fit rounded-xl ${stat.label === 'System Alerts' ? 'bg-red-500/10 text-red-500' : 'bg-slate-500/10 text-slate-600 dark:text-slate-400'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                <h3 className="text-3xl font-heading font-black text-slate-800 dark:text-white mt-1">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Section: Recent Platform Activity */}
      <section className="bg-white/40 border border-white/60 dark:bg-[#111A3A]/40 dark:border-white/10 backdrop-blur-xl shadow-xl rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-white/10">
          <h2 className="text-xl font-heading font-bold flex items-center gap-3">
            <span className="w-1.5 h-6 bg-red-600 rounded-full"></span>
            Recent Platform Activity
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans">
            <thead>
              <tr className="bg-slate-500/5 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest border-b border-white/5">
                <th className="px-8 py-5">User</th>
                <th className="px-8 py-5">Action</th>
                <th className="px-8 py-5">Time</th>
                <th className="px-8 py-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/10 dark:hover:bg-white/5 transition-colors">
                  <td className="px-8 py-6 font-bold">{log.user}</td>
                  <td className="px-8 py-6 text-sm opacity-80">{log.action}</td>
                  <td className="px-8 py-6 text-xs font-semibold opacity-50">{log.time}</td>
                  <td className="px-8 py-6 text-right">
                    <span className={`text-[9px] font-black px-2.5 py-1 rounded-md border ${
                      log.status === 'SUCCESS' ? 'border-green-500/40 text-green-500 bg-green-500/5' :
                      log.status === 'WARNING' ? 'border-yellow-500/40 text-yellow-500 bg-yellow-500/5' :
                      'border-red-500/40 text-red-500 bg-red-500/5'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-slate-500/5 text-center">
            <button className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-blue-500 transition-colors">
                View All System Logs →
            </button>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
