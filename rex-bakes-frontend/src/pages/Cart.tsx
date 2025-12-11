import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';

export default function Cart() {
    const { items, removeFromCart, clearCart, total } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCheckout = async () => {
        if (items.length === 0) return;
        setIsProcessing(true);

        try {
            const payload = {
                items: items.map(item => ({
                    dessert_id: item.id,
                    quantity: item.quantity
                }))
            };

            const response = await api.post('/orders', payload);

            if (response.data.status === 'success') {
                clearCart();
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
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 bg-white">
                <span className="text-6xl mb-6 opacity-20">🛍️</span>
                <h2 className="font-serif text-3xl font-bold text-elegant-black mb-3">Tu cesta está vacía</h2>
                <p className="text-gray-400 mb-8 font-light">¿Se te antoja algo dulce hoy?</p>
                <Link to="/" className="bg-elegant-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg transform hover:-translate-y-1">
                    Volver al Menú
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-16 bg-white min-h-screen">

            {/* Título Elegante */}
            <div className="text-center mb-12">
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-elegant-black mb-2">
                    Tu Pedido
                </h1>
                <p className="text-gray-400 text-sm tracking-widest uppercase">Resumen de compra</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">

                {/* Lista de Items */}
                <div className="flex-1">
                    <div className="space-y-8">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-6 items-center border-b border-gray-100 pb-6 last:border-0">

                                {/* Imagen Estilo Pistacho */}
                                <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                                    {item.image_url ? (
                                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="flex items-center justify-center h-full text-xs text-gray-300">Sin foto</span>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-serif text-xl font-bold text-elegant-black">{item.name}</h3>
                                        <span className="font-bold text-lg text-elegant-black">
                                            ${(Number(item.price) * item.quantity).toFixed(2)}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-500 mb-3">
                                        Precio unitario: ${Number(item.price).toFixed(2)}
                                    </p>

                                    <div className="flex justify-between items-center">
                                        <span className="bg-gray-100 text-elegant-black text-xs font-bold px-3 py-1 rounded-full">
                                            Cantidad: {item.quantity}
                                        </span>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-red-400 text-xs hover:text-red-600 underline transition"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resumen Total (Tarjeta Lateral) */}
                <div className="lg:w-1/3">
                    <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 sticky top-24">
                        <h3 className="font-serif text-2xl font-bold text-elegant-black mb-6">Resumen</h3>

                        <div className="flex justify-between items-center mb-4 text-gray-500">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-8 text-gray-500">
                            <span>Envío</span>
                            <span className="text-xs">(Se coordina en WhatsApp)</span>
                        </div>

                        <div className="flex justify-between items-center mb-8 pt-6 border-t border-gray-200">
                            <span className="font-bold text-xl text-elegant-black">Total</span>
                            <span className="font-serif text-3xl font-bold text-elegant-black">${total.toFixed(2)}</span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform hover:scale-[1.02] flex justify-center items-center gap-2 ${isProcessing ? 'bg-gray-400 cursor-wait' : 'bg-elegant-black hover:bg-gray-800'
                                }`}
                        >
                            {isProcessing ? (
                                'Procesando...'
                            ) : (
                                <>
                                    <span>Finalizar en WhatsApp</span>
                                    {/* Icono de WhatsApp simple */}
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z" />
                                    </svg>
                                </>
                            )}
                        </button>

                        <p className="text-center text-xs text-gray-400 mt-4">
                            Al hacer clic, se abrirá un chat con nuestro equipo para confirmar entrega y pago.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}