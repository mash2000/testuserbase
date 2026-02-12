import { LoginCredentials } from './../auth/model/types';
import { axiosInstance } from './../../shared/api/axiosInstance';

// Имитация авторизации с таймаутом 2000мс
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<string> => {
    // Создаем промис с таймаутом 2000мс
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Проверяем логин и пароль
        if (credentials.login === 'admin' && credentials.password === 'admin') {
          // Генерируем случайный токен
          const token = `mock_token_${Date.now()}_${Math.random().toString(36).substring(2)}`;
          resolve(token);
        } else {
          // Возвращаем ошибку с текстом
          reject(new Error('Неверный логин или пароль'));
        }
      }, 2000); // Таймаут 2000мс
    });
  },

  logout: async (): Promise<void> => {
    return Promise.resolve();
  },

  checkAuth: (): boolean => {
    return !!localStorage.getItem('auth_token');
  }
};