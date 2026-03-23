import React, { useState } from 'react';

/**
 * Lecturer Dashboard Component (Academic Supervision Portal)
 * Features: Stats Row, Notifications List, Student Roster Table.
 */
const LecturerDashboard: React.FC = () => {
  const [stats] = useState({
    assignedStudents: 18,
    logbooksToGrade: 7,
    completedPlacements: 42,
  });

  const [notifications] = useState([
    { id: '1', message: 'AOS Ltd has approved John Doe\'s logbook (Week 12).', time: '2h ago' },
    { id: '2', message: 'New placement request from CloudSphere for Sarah Linn.', time: '5h ago' },
    { id: '3', message: 'Marcus Wright has submitted a new logbook entry.', time: '1d ago' },
  ]);

  const [students] = useState([
    { id: '1', name: 'John Doe', company: 'AOS Ltd', status: 'ACTIVE', grade: '-' },
    { id: '2', name: 'Sarah Linn', company: 'CloudSphere', status: 'PENDING', grade: '-' },
    { id: '3', name: 'Kevin Hart', company: 'DataStream', status: 'COMPLETED', grade: 'A' },
  ]);

  return (
    <div className="space-y-10 animate-fade-in font-sans">
       <header>
        <h1 className="text-3xl font-heading font-black text-slate-800 dark:text-white">
          Academic Supervision <span className="text-purple-600 dark:text-purple-400">Portal</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Monitor student progress and evaluate performance.</p>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Assigned Students', value: stats.assignedStudents, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
          { label: 'Logbooks to Grade', value: stats.logbooksToGrade, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
          { label: 'Completed Placements', value: stats.completedPlacements, icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/40 border border-white/60 dark:bg-[#111A3A]/40 dark:border-white/10 backdrop-blur-xl shadow-xl rounded-2xl p-6 transition-all hover:scale-[1.05] hover:bg-white/50">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-2xl font-heading font-black text-slate-800 dark:text-white capitalize">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

       <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Section A: Notifications */}
        <div className="bg-white/40 border border-white/60 dark:bg-[#111A3A]/40 dark:border-white/10 backdrop-blur-xl shadow-xl rounded-2xl p-6 transition-all opacity-95">
           <h2 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            Notifications
          </h2>
          <div className="space-y-4">
            {notifications.map((note) => (
              <div key={note.id} className="p-4 rounded-xl bg-white/20 dark:bg-white/5 border-l-4 border-purple-500 hover:bg-white/40 dark:hover:bg-white/10 transition-colors cursor-pointer">
                <p className="text-sm font-semibold">{note.message}</p>
                <p className="text-[10px] mt-1 opacity-50 uppercase font-black tracking-widest">{note.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section B: Student Roster */}
        <div className="bg-white/40 border border-white/60 dark:bg-[#111A3A]/40 dark:border-white/10 backdrop-blur-xl shadow-xl rounded-2xl p-6 transition-all">
          <h2 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Student Roster
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-4 py-2">Student</th>
                  <th className="px-4 py-2">Company</th>
                  <th className="px-4 py-2 text-right">Grade</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="bg-white/20 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-colors">
                    <td className="px-4 py-4 rounded-l-xl font-bold">{student.name}</td>
                    <td className="px-4 py-4 text-sm opacity-80">{student.company}</td>
                    <td className="px-4 py-4 rounded-r-xl text-right">
                       <span className={`text-[10px] font-black px-3 py-1 rounded-md border ${
                         student.grade !== '-' ? 'border-green-500 text-green-500' : 'border-slate-500/50 opacity-40'
                       }`}>
                         {student.grade}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;
