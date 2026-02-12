import React, { useEffect } from 'react';
import { AppProviders } from './providers/AppProviders';
import { AppRouter } from './providers/AppRouter';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';

export const App: React.FC = () => {
  // Проверка авторизации при загрузке приложения
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    // Здесь можно добавить проверку валидности токена
    if (token) {
      console.log('User is authenticated');
    }
  }, []);

  return (
    <ConfigProvider locale={ruRU}>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ConfigProvider>
  );
};