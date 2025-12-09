export interface Dessert {
    id: number;
    name: string;
    description?: string;
    price: string;
    stock: number;
    image_url?: string;
    is_active: boolean;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: "customer" | "admin";
}
export interface AuthResponse {
    status: string;
    user: User;
    authorization: {
        token: string;
        type: string;
    };
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface CartItem extends Dessert {
    quantity: number;
}