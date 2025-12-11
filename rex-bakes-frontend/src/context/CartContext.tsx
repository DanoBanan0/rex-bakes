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
    // --- ESTO ES LO NUEVO QUE FALTABA ---
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Estado para abrir/cerrar el carrito lateral
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (dessert: Dessert, quantity: number = 1) => {
        setItems(currentItems => {
            const existingItem = currentItems.find(item => item.id === dessert.id);
            if (existingItem) {
                return currentItems.map(item =>
                    item.id === dessert.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...currentItems, { ...dessert, quantity }];
        });
        // Abrimos el carrito automáticamente al agregar algo
        setIsCartOpen(true);
    };

    const removeFromCart = (dessertId: number) => {
        setItems(currentItems => currentItems.filter(item => item.id !== dessertId));
    };

    const clearCart = () => setItems([]);

    // Funciones para controlar el Sidebar
    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const total = items.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
    const count = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{
            items, addToCart, removeFromCart, clearCart, total, count,
            isCartOpen, openCart, closeCart // <--- Exportamos las funciones nuevas
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