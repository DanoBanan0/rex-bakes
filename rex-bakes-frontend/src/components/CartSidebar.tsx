import { useCart } from '../context/CartContext';
import api from '../services/api';
import { useState } from 'react';

export default function CartSidebar() {
    const { isCartOpen, closeCart, items, removeFromCart, total, clearCart } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCheckout = async () => {
        setIsProcessing(true);
        try {
            const payload = { items: items.map(item => ({ dessert_id: item.id, quantity: item.quantity })) };
            const response = await api.post('/orders', payload);
            if (response.data.status === 'success') {
                clearCart();
                window.location.href = response.data.whatsapp_url;
            }
        } catch (error) {
            alert("Error al procesar pedido");
        } finally {
            setIsProcessing(false);
        }
    };

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex justify-end font-sans">
            {/* Fondo oscuro al hacer click cierra */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity" onClick={closeCart}></div>

            {/* Panel Lateral Blanco */}
            <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300">

                {/* Cabecera Elegante */}
                <div className="p-6 flex justify-between items-center border-b border-gray-100">
                    <h2 className="font-serif text-3xl font-bold text-elegant-black">Tu Pedido</h2>
                    <button onClick={closeCart} className="text-gray-400 hover:text-black text-3xl">&times;</button>
                </div>

                {/* Lista de Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {items.length === 0 ? (
                        <div className="text-center text-gray-400 mt-20">
                            <span className="text-5xl block mb-4 opacity-50">🛍️</span>
                            <p>Tu cesta está vacía</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center">
                                <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                                    {item.image_url ? (
                                        <img src={item.image_url} className="w-full h-full object-cover" />
                                    ) : <div className="w-full h-full bg-pistachio/20"></div>}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-elegant-black text-lg leading-tight">{item.name}</h3>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {item.quantity} x ${Number(item.price).toFixed(2)}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-lg">${(Number(item.price) * item.quantity).toFixed(2)}</div>
                                    <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-400 hover:text-red-600 underline mt-1">
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer del Carrito */}
                {items.length > 0 && (
                    <div className="p-8 bg-elegant-gray border-t border-gray-100">
                        <div className="flex justify-between mb-6 text-xl font-bold text-elegant-black font-serif">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className="w-full bg-elegant-black text-white py-4 rounded-lg font-bold hover:bg-gray-800 transition shadow-lg tracking-wide"
                        >
                            {isProcessing ? 'Procesando...' : 'Finalizar Compra'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}