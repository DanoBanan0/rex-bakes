import api from "./api";
import type { LoginCredentials, RegisterData, AuthResponse, User } from "../types";

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/login", credentials);
    return response.data;
};
export const register = async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/register", data);
    return response.data;
};
export const logout = async (): Promise<void> => {
    await api.post("/logout");
};
export const getUser = async (): Promise<User> => {
    const response = await api.get<User>("/me");
    return response.data;
};