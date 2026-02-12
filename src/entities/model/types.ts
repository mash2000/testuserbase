export interface User {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}

export interface CreateUserDto {
  name: string;
  avatar: string;
  createdAt: string;
}

export interface UpdateUserDto {
  id: string;
  name: string;
  avatar: string;
}