import axios from "./axiosConfig";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from "./types/Auth.types";

export const login = (data: LoginRequest): Promise<LoginResponse> =>
  axios.post("/auth/login", data).then((res) => res.data);

export const register = (data: RegisterRequest): Promise<User> =>
  axios.post("/auth/register", data).then((res) => res.data);

export const refreshToken = (): Promise<{ token: string }> =>
  axios.post("/auth/refresh").then((res) => res.data);
