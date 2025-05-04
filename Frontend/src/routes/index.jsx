import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../pages/Login/Login';
import Register from '../pages/Login/Register';
import UserDashboard from '../pages/UserDashboard';
import AdminDashboard from '../pages/AdminDashboard';

const AppRoutes = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const ProtectedRoute = ({ children, adminOnly }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (adminOnly && role !== 'admin') {
      return <Navigate to="/user-dashboard" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/user-dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
