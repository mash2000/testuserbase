import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { userApi } from '../api/userApi';
import { CreateUserDto, UpdateUserDto } from './../../../entities/model/types';

export const useUserMutations = () => {
  const queryClient = useQueryClient();

  // Создание пользователя
  const createUserMutation = useMutation({
    mutationFn: (data: CreateUserDto) => userApi.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      notification.success({
        message: 'Успешно',
        description: 'Пользователь успешно создан',
        placement: 'topRight',
      });
    },
    onError: (error: any) => {
      notification.error({
        message: 'Ошибка',
        description: error.message || 'Не удалось создать пользователя',
        placement: 'topRight',
      });
    },
  });

  // Обновление пользователя
  const updateUserMutation = useMutation({
    mutationFn: (data: UpdateUserDto) => userApi.updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      notification.success({
        message: 'Успешно',
        description: 'Данные пользователя обновлены',
        placement: 'topRight',
      });
    },
    onError: (error: any) => {
      notification.error({
        message: 'Ошибка',
        description: error.message || 'Не удалось обновить пользователя',
        placement: 'topRight',
      });
    },
  });

  // Удаление пользователя
  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => userApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      notification.success({
        message: 'Успешно',
        description: 'Пользователь удален',
        placement: 'topRight',
      });
    },
    onError: (error: any) => {
      notification.error({
        message: 'Ошибка',
        description: error.message || 'Не удалось удалить пользователя',
        placement: 'topRight',
      });
    },
  });

  return {
    createUser: createUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
    isCreating: createUserMutation.isPending,
    isUpdating: updateUserMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
  };
};