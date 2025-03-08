export interface User {
    id: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface SignupRequest {
    username: string;
    password: string;
    confirmPassword: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface ErrorResponse {
    message: string;
}