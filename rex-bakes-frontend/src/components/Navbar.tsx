import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import logoImage from '../assets/rexbakes.png';

export default function Navbar() {
    const { user, logout, isAdmin } = useAuth();
    const { count } = useCart();
    const navigate = useNavigate();

    return (
        // Fondo blanco puro, sin bordes, sombra muy sutil al hacer scroll (opcional)
        <nav className="sticky top-0 z-50 bg-white py-4">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                {/* Logo: Usamos la fuente elegante para que se vea sofisticado */}
                <Link to="/" className="flex items-center gap-3 group">
                    <img src={logoImage} alt="Rex Bakes Logo" className="h-20 md:h-24 w-auto object-contain transition-transform group-hover:scale-105" />
                </Link>

                {/* Menú: Texto gris oscuro, limpio */}
                <div className="flex items-center gap-8 font-medium text-sm text-elegant-dark">
                    <Link to="/" className="hover:text-pistachio-dark transition">Menú</Link>

                    {/* Carrito Minimalista */}
                    {user && (
                        <Link to="/cart" className="relative group">
                            {/* Icono de bolsa de compra más elegante (puedes usar una librería de iconos luego) */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:text-pistachio-dark transition">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>

                            {count > 0 && (
                                <span className="absolute -top-1 -right-2 bg-pistachio text-elegant-dark text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {count}
                                </span>
                            )}
                        </Link>
                    )}

                    {isAdmin && (
                        <Link to="/admin" className="text-elegant-dark border border-elegant-dark px-3 py-1 rounded-full hover:bg-elegant-dark hover:text-white transition text-xs uppercase tracking-wider">
                            Admin
                        </Link>
                    )}

                    {user ? (
                        <button onClick={() => { logout(); navigate('/login'); }} className="hover:text-pistachio-dark transition">
                            Salir
                        </button>
                    ) : (
                        <Link to="/login" className="hover:text-pistachio-dark transition">Iniciar Sesión</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}