import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import LandingPage from '../pages/marketing/LandingPage';
import Dashboard from '../pages/dashboard/Dashboard';
import ProjectsPage from '../pages/projects/ProjectsPage';
import TasksPage from '../pages/tasks/TasksPage';
import KanbanPage from '../pages/kanban/KanbanPage';
import ProfilePage from '../pages/profile/ProfilePage';
import BoardsPage from '../pages/organization/BoardsPage';
import ActivityPage from '../pages/organization/ActivityPage';
import SettingsPage from '../pages/organization/SettingsPage';
import BillingPage from '../pages/organization/BillingPage';
import BoardPage from '../pages/board/BoardPage';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/organization" element={<ProtectedRoute><BoardsPage /></ProtectedRoute>} />
      <Route path="/organization/activity" element={<ProtectedRoute><ActivityPage /></ProtectedRoute>} />
      <Route path="/organization/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/organization/billing" element={<ProtectedRoute><BillingPage /></ProtectedRoute>} />
      <Route path="/board/:boardId" element={<ProtectedRoute><BoardPage /></ProtectedRoute>} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><ProjectsPage /></ProtectedRoute>} />
      <Route path="/tasks" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
      <Route path="/kanban" element={<ProtectedRoute><KanbanPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
