export interface Dessert {
    id: number;
    name: string;
    description?: string;
    price: string;
    stock: number;
    image_url?: string;
    is_active: boolean;
}