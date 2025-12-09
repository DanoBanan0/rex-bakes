import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api'; // Usamos nuestra instancia de axios configurada

export default function Cart() {
    const { items, removeFromCart, clearCart, total } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCheckout = async () => {
        if (items.length === 0) return;

        setIsProcessing(true);

        try {
            // 1. Preparamos los datos como los pide tu OrderController de Laravel
            // Espera: { items: [ { dessert_id: 1, quantity: 2 }, ... ] }
            const payload = {
                items: items.map(item => ({
                    dessert_id: item.id,
                    quantity: item.quantity
                }))
            };

            // 2. Enviamos la orden al backend
            const response = await api.post('/orders', payload);

            // 3. Si todo sale bien:
            if (response.data.status === 'success') {
                // Limpiamos el carrito local
                clearCart();

                // Redirigimos al usuario a WhatsApp con el link que generó Laravel
                window.location.href = response.data.whatsapp_url;
            }

        } catch (error: any) {
            console.error("Error al procesar pedido:", error);
            alert(error.response?.data?.message || "Hubo un error al procesar tu pedido.");
        } finally {
            setIsProcessing(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h2>
                <p className="text-gray-500 mb-6">¿Se te antoja algo dulce?</p>
                <Link to="/" className="bg-pink-600 text-white px-6 py-3 rounded-full font-bold hover:bg-pink-700 transition shadow-lg">
                    Ver Menú
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                🛒 Tu Pedido
            </h1>

            <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
                {/* Lista de Items */}
                <div className="divide-y divide-gray-100">
                    {items.map((item) => (
                        <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">

                            <div className="flex items-center gap-4">
                                {/* Imagen Miniatura */}
                                <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                                    {item.image_url ? (
                                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="flex items-center justify-center h-full text-xs text-gray-400">Sin foto</span>
                                    )}
                                </div>

                                {/* Info */}
                                <div>
                                    <h3 className="font-bold text-gray-800">{item.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        Cantidad: <span className="font-semibold">{item.quantity}</span> x ${Number(item.price).toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            {/* Precio y Borrar */}
                            <div className="flex flex-col items-end gap-2">
                                <span className="font-bold text-gray-800">
                                    ${(Number(item.price) * item.quantity).toFixed(2)}
                                </span>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 text-xs hover:text-red-700 hover:underline"
                                >
                                    Eliminar
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Resumen Total */}
                <div className="bg-gray-50 p-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="text-center sm:text-left">
                        <span className="text-gray-600 block text-sm">Total a Pagar</span>
                        <span className="text-3xl font-bold text-pink-600">${total.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={isProcessing}
                        className={`px-8 py-3 rounded-full font-bold text-white shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 ${isProcessing ? 'bg-gray-400 cursor-wait' : 'bg-green-600 hover:bg-green-700'
                            }`}
                    >
                        {isProcessing ? 'Procesando...' : '📱 Pedir por WhatsApp'}
                    </button>
                </div>

            </div>
        </div>
    );
}