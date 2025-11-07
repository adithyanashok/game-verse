export interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  role?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthSuccessPayload {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}
