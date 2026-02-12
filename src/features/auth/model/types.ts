export interface LoginCredentials {
  login: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface AuthError {
  message: string;
}
