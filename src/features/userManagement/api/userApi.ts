import { axiosInstance } from './../../../shared/api/axiosInstance';
import { User, CreateUserDto, UpdateUserDto } from './../../../entities/model/types';

export const userApi = {
  // Получение всех пользователей
  getUsers: async (): Promise<User[]> => {
    const response = await axiosInstance.get('/users');
    return response.data;
  },

  // Получение пользователя по ID
  getUserById: async (id: string): Promise<User> => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },

  // Создание нового пользователя
  createUser: async (data: CreateUserDto): Promise<User> => {
    const response = await axiosInstance.post('/users', {
      ...data,
      createdAt: new Date().toISOString(),
    });
    return response.data;
  },

  // Обновление пользователя
  updateUser: async ({ id, ...data }: UpdateUserDto): Promise<User> => {
    const response = await axiosInstance.put(`/users/${id}`, data);
    return response.data;
  },

  // Удаление пользователя
  deleteUser: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/users/${id}`);
  },
};