import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import InternDashboard from './pages/intern/InternDashboard';
import InternPlacements from './pages/intern/Placements';
import InternLogbook from './pages/intern/Logbook';
import InternContracts from './pages/intern/Contracts';
import InternMessages from './pages/intern/Messages';
import InternNotifications from './pages/intern/Notifications';
import InternAnalytics from './pages/intern/Analytics';

import CompanyDashboard from './pages/company/CompanyDashboard';
import CompanyApplicants from './pages/company/Applicants';
import CompanyInterns from './pages/company/Interns';
import CompanyLogbookReview from './pages/company/LogbookReview';

import SupervisorDashboard from './pages/supervisor/SupervisorDashboard';
import SupervisorStudents from './pages/supervisor/Students';
import SupervisorLogbookGrading from './pages/supervisor/LogbookGrading';
import SupervisorPlacements from './pages/supervisor/Placements';

import SuperAdminDashboard from './pages/superadmin/SuperAdminDashboard';
import SchoolAdminDashboard from './pages/schooladmin/SchoolAdminDashboard';

/**
 * Component to redirect users based on their role after login
 */
const RoleRedirect: React.FC = () => {
  const role = localStorage.getItem('role');
  
  switch (role) {
    case 'SUPER_ADMIN':
      return <Navigate to="/dashboard/admin" replace />;
    case 'COMPANY_ADMIN':
      return <Navigate to="/dashboard/company" replace />;
    case 'SUPERVISOR':
      return <Navigate to="/dashboard/lecturer" replace />;
    case 'SCHOOL_ADMIN':
      return <Navigate to="/dashboard/school" replace />;
    case 'INTERN':
    default:
      return <Navigate to="/dashboard/intern" replace />;
  }
};

/**
 * Shared Logbook path router
 */
const LogbookRouter: React.FC = () => {
  const role = localStorage.getItem('role');
  switch (role) {
    case 'COMPANY_ADMIN': return <CompanyLogbookReview />;
    case 'SUPERVISOR': return <SupervisorLogbookGrading />;
    case 'INTERN':
    default: return <InternLogbook />;
  }
};

/**
 * Shared Placements/Internships path router
 */
const PlacementsRouter: React.FC = () => {
  const role = localStorage.getItem('role');
  switch (role) {
    case 'SUPERVISOR': return <SupervisorPlacements />;
    case 'INTERN':
    default: return <InternPlacements />;
  }
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Role-specific index redirects */}
          <Route index element={<RoleRedirect />} />
          
          {/* Intern Specific Supplemental Pages */}
          <Route path="intern" element={<ProtectedRoute allowedRoles={['INTERN']}><InternDashboard /></ProtectedRoute>} />
          <Route path="internships" element={<ProtectedRoute allowedRoles={['INTERN']}><PlacementsRouter /></ProtectedRoute>} />
          <Route path="contracts" element={<ProtectedRoute allowedRoles={['INTERN', 'COMPANY_ADMIN']}><InternContracts /></ProtectedRoute>} />
          
          {/* Shared Supplemental Pages (Role-based internal routing) */}
          <Route path="logbook" element={<ProtectedRoute allowedRoles={['INTERN', 'COMPANY_ADMIN', 'SUPERVISOR']}><LogbookRouter /></ProtectedRoute>} />
          <Route path="messages" element={<ProtectedRoute allowedRoles={['INTERN', 'COMPANY_ADMIN', 'SUPERVISOR']}><InternMessages /></ProtectedRoute>} />
          <Route path="notifications" element={<ProtectedRoute allowedRoles={['INTERN', 'COMPANY_ADMIN', 'SUPERVISOR', 'SUPER_ADMIN']}><InternNotifications /></ProtectedRoute>} />
          <Route path="analytics" element={<ProtectedRoute allowedRoles={['INTERN', 'COMPANY_ADMIN', 'SUPERVISOR', 'SUPER_ADMIN']}><InternAnalytics /></ProtectedRoute>} />

          {/* Role Specific Main Dashboards */}
          <Route path="company" element={<ProtectedRoute allowedRoles={['COMPANY_ADMIN']}><CompanyDashboard /></ProtectedRoute>} />
          <Route path="applicants" element={<ProtectedRoute allowedRoles={['COMPANY_ADMIN']}><CompanyApplicants /></ProtectedRoute>} />
          <Route path="interns" element={<ProtectedRoute allowedRoles={['COMPANY_ADMIN']}><CompanyInterns /></ProtectedRoute>} />

          <Route path="lecturer" element={<ProtectedRoute allowedRoles={['SUPERVISOR']}><SupervisorDashboard /></ProtectedRoute>} />
          <Route path="students" element={<ProtectedRoute allowedRoles={['SUPERVISOR']}><SupervisorStudents /></ProtectedRoute>} />
          <Route path="placements" element={<ProtectedRoute allowedRoles={['SUPERVISOR']}><PlacementsRouter /></ProtectedRoute>} />

          <Route path="admin" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN']}><SuperAdminDashboard /></ProtectedRoute>} />
          <Route path="school" element={<ProtectedRoute allowedRoles={['SCHOOL_ADMIN']}><SchoolAdminDashboard /></ProtectedRoute>} />
        </Route>

        {/* Global Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
