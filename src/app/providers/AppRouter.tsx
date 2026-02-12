import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './../../pages/LoginPage';
import { UsersPage } from './../../pages/UsersPage';
import { NotFoundPage } from './../../pages/NotFoundPage';
import { ProtectedRoute } from './../../shared/ui/ProtectedRoute/ProtectedRoute';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/" element={<Navigate to="/users" replace />} />
      </Route>
      
      {/* Явный маршрут для 404 */}
      <Route path="/404" element={<NotFoundPage />} />
      
      {/* Все неизвестные пути перенаправляем на 404 */}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};