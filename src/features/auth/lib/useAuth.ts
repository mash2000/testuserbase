import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';
import { authApi } from './../../api/authApi';
import { LoginCredentials } from '../model/types';

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Мутация для логина с использованием TanStack Query
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (token) => {
      // Сохраняем токен в localStorage
      localStorage.setItem('auth_token', token);
      
      // Показываем успешное уведомление
      notification.success({
        message: 'Успешная авторизация',
        description: 'Добро пожаловать в систему!',
        placement: 'topRight',
        duration: 3,
      });
      
      // Перенаправляем на страницу пользователей
      navigate('/users', { replace: true });
    },
    onError: (error: Error) => {
      // Показываем ошибку через notification
      notification.error({
        message: 'Ошибка авторизации',
        description: error.message || 'Произошла ошибка при входе в систему',
        placement: 'topRight',
        duration: 5,
      });
    },
  });

  // Функция выхода
  const logout = () => {
    localStorage.removeItem('auth_token');
    queryClient.clear(); // Очищаем кэш запросов
    navigate('/login', { replace: true });
    
    notification.info({
      message: 'Выход из системы',
      description: 'Вы успешно вышли из аккаунта',
      placement: 'topRight',
      duration: 3,
    });
  };

  // Проверка авторизации
  const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('auth_token');
  };

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    logout,
    isAuthenticated,
  };
};