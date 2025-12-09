import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Dessert, CartItem } from '../types';

interface CartContextType {
    items: CartItem[];
    addToCart: (dessert: Dessert, quantity?: number) => void;
    removeFromCart: (dessertId: number) => void;
    clearCart: () => void;
    total: number;
    count: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    // Iniciamos buscando si hay algo guardado en el navegador
    const [items, setItems] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Cada vez que 'items' cambie, actualizamos el localStorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (dessert: Dessert, quantity: number = 1) => {
        setItems(currentItems => {
            // Verificamos si ya está en el carrito
            const existingItem = currentItems.find(item => item.id === dessert.id);

            if (existingItem) {
                // Si ya existe, le sumamos la cantidad
                return currentItems.map(item =>
                    item.id === dessert.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            // Si no existe, lo agregamos nuevo
            return [...currentItems, { ...dessert, quantity }];
        });
    };

    const removeFromCart = (dessertId: number) => {
        setItems(currentItems => currentItems.filter(item => item.id !== dessertId));
    };

    const clearCart = () => {
        setItems([]);
    };

    // Cálculos automáticos
    const total = items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            clearCart,
            total,
            count
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
    return context;
};