import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';
import InternDashboard from './pages/dashboard/InternDashboard';
import Placements from './pages/dashboard/Placements';
import Logbook from './pages/dashboard/Logbook';
import Contracts from './pages/dashboard/Contracts';
import Messages from './pages/dashboard/Messages';
import Notifications from './pages/dashboard/Notifications';
import Analytics from './pages/dashboard/Analytics';
import CompanyDashboard from './pages/dashboard/CompanyDashboard';
import LecturerDashboard from './pages/dashboard/LecturerDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

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
          {/* Role-specific index redirects (could be improved further with logic) */}
          <Route index element={<Navigate to="intern" replace />} />
          
          <Route path="intern" element={<ProtectedRoute allowedRoles={['STUDENT']}><InternDashboard /></ProtectedRoute>} />
          
          {/* Intern Specific Supplemental Pages */}
          <Route path="internships" element={<ProtectedRoute allowedRoles={['STUDENT']}><Placements /></ProtectedRoute>} />
          <Route path="logbook" element={<ProtectedRoute allowedRoles={['STUDENT']}><Logbook /></ProtectedRoute>} />
          <Route path="contracts" element={<ProtectedRoute allowedRoles={['STUDENT']}><Contracts /></ProtectedRoute>} />
          <Route path="messages" element={<ProtectedRoute allowedRoles={['STUDENT']}><Messages /></ProtectedRoute>} />
          <Route path="notifications" element={<ProtectedRoute allowedRoles={['STUDENT']}><Notifications /></ProtectedRoute>} />
          <Route path="analytics" element={<ProtectedRoute allowedRoles={['STUDENT']}><Analytics /></ProtectedRoute>} />

          <Route path="company" element={<ProtectedRoute allowedRoles={['COMPANY']}><CompanyDashboard /></ProtectedRoute>} />
          <Route path="lecturer" element={<ProtectedRoute allowedRoles={['LECTURER']}><LecturerDashboard /></ProtectedRoute>} />
          <Route path="admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
        </Route>

        {/* Global Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
