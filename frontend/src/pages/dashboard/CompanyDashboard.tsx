import React, { useState } from 'react';

/**
 * Company Dashboard Component (AOS Ltd Portal)
 * Features: Stats Row, Action Required: Applicants, Active Interns.
 */
const CompanyDashboard: React.FC = () => {
  const [stats] = useState({
    openPositions: 3,
    pendingApplicants: 12,
    logbooksAwaiting: 5,
  });

  const [applicants] = useState([
    { id: '1', name: 'Liam Carter', role: 'Frontend Intern' },
    { id: '2', name: 'Sophia Chen', role: 'UI/UX Designer' },
    { id: '3', name: 'Marcus Wright', role: 'Backend Intern' },
  ]);

  const [activeInterns] = useState([
    { id: '101', name: 'Emily Davis', role: 'Fullstack Intern' },
    { id: '102', name: 'Noah Wilson', role: 'DevOps Intern' },
    { id: '103', name: 'Olivia Brown', role: 'Mobile Intern' },
  ]);

  const handleAction = (action: string, id: string) => {
    alert(`Processing ${action} for ID: ${id}...`);
  };

  return (
    <div className="space-y-10 animate-fade-in font-sans">
      <header>
        <h1 className="text-3xl font-heading font-black text-slate-800 dark:text-white">
          <span className="text-blue-600 dark:text-blue-400">AOS Ltd</span> Portal
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your internships and evaluate candidates.</p>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Open Positions', value: stats.openPositions, icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z' },
          { label: 'Pending Applicants', value: stats.pendingApplicants, icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
          { label: 'Logbooks Awaiting Signature', value: stats.logbooksAwaiting, icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/40 border border-white/60 dark:bg-[#111A3A]/40 dark:border-white/10 backdrop-blur-xl shadow-xl rounded-2xl p-6 transition-all hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                <h3 className="text-2xl font-heading font-black text-slate-800 dark:text-white leading-none">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Section A: Action Required: Applicants */}
        <div className="bg-white/40 border border-white/60 dark:bg-[#111A3A]/40 dark:border-white/10 backdrop-blur-xl shadow-xl rounded-2xl p-6 transition-all">
          <h2 className="text-xl font-heading font-bold mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Action Required: Applicants
            </div>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  <th className="px-4 py-2">Candidate</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2 text-right">Decision</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((app) => (
                  <tr key={app.id} className="bg-white/20 dark:bg-white/5 group hover:bg-white/60 dark:hover:bg-white/10 transition-colors">
                    <td className="px-4 py-4 rounded-l-xl font-bold">{app.name}</td>
                    <td className="px-4 py-4 text-sm opacity-80">{app.role}</td>
                    <td className="px-4 py-4 rounded-r-xl text-right">
                      <div className="flex items-center justify-end gap-3 translate-x-1 group-hover:translate-x-0 transition-transform">
                        <button
                          onClick={() => handleAction('Approve', app.id)}
                          className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase bg-green-500/10 text-green-600 hover:bg-green-600 hover:text-white transition-all shadow-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction('Reject', app.id)}
                          className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase bg-red-500/10 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section B: Active Interns */}
        <div className="bg-white/40 border border-white/60 dark:bg-[#111A3A]/40 dark:border-white/10 backdrop-blur-xl shadow-xl rounded-2xl p-6 transition-all">
          <h2 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Active Interns
          </h2>
          <div className="space-y-4">
            {activeInterns.map((intern) => (
              <div key={intern.id} className="flex items-center justify-between p-5 bg-white/20 dark:bg-white/5 rounded-2xl border border-white/20 dark:border-white/5 group hover:border-blue-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg">
                    {intern.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-white">{intern.name}</h4>
                    <p className="text-xs opacity-60 font-semibold">{intern.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAction('View Logbooks', intern.id)}
                  className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tight border border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition-all shadow-md group-hover:shadow-blue-500/20"
                >
                  View Logbooks
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
